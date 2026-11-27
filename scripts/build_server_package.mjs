/**
 * Builds the package for the client's server (Ubuntu 24.04, Apache with PHP, Node 20, pm2) into
 * deploy/server-package. The site is served at https://www.lambda-cro.com/CDMOtest (see docs/DEPLOY_CDMOTEST.md):
 *
 *   node scripts/build_server_package.mjs [--base-path /CDMOtest] [--port 3107]
 *
 * - `next build` as a self-contained app (NEXT_STANDALONE=1 -> `node server.js`, no npm needed on the server)
 *   under the sub-folder (NEXT_BASE_PATH); asset paths in the code go through withBase() (src/lib/basePath.ts),
 *   and url(/...) paths in the built CSS (fonts) are prefixed here
 * - Virtual Tour links go to <sub-folder>/virtualtour (VIRTUAL_TOUR_URL=/virtualtour); the tour files sit in that
 *   folder on the server and are served by Apache straight from disk
 * - Linux builds of native modules (sharp) replace the Windows ones
 * - CMS data (src/data/*.json) and uploads (public/uploads) are included; on later deploys the upload step keeps
 *   the server's own copies, so edits made in the server's admin are never overwritten
 * - ecosystem.config.cjs for pm2 (restarts when restart.txt changes)
 *
 * Admin credentials are not part of the package: they go in app/.env.production on the server (see deploy notes).
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const PORT = arg('--port', '3107');
const BASE_PATH = arg('--base-path', '/CDMOtest').replace(/\/+$/, '');
// The app runs from the site user's own folder (not web-served); only the public entry (.htaccess, bridge, tour)
// sits in the main site's folder, in <main site>/CDMOtest.
const SITE_DIR = '/var/www/cdmotest.lambda-cro.com';
const OUT = path.join(ROOT, 'deploy', 'server-package');
const APP = path.join(OUT, 'app');
const PUBLIC_ENTRY = path.join(OUT, 'public-entry');

const step = (msg) => console.log(`\n== ${msg}`);
const run = (cmd, env = {}) => execSync(cmd, { stdio: 'inherit', cwd: ROOT, env: { ...process.env, ...env } });
const copy = (from, to, filter) => fs.cpSync(from, to, { recursive: true, dereference: true, filter });

step(`next build (standalone, under ${BASE_PATH || '/'}, tour at ${BASE_PATH}/virtualtour)`);
run('npx next build', {
  NEXT_STANDALONE: '1',
  NEXT_BASE_PATH: BASE_PATH,
  VIRTUAL_TOUR_URL: '/virtualtour',
  NODE_ENV: 'production',
});

const standalone = path.join(ROOT, '.next', 'standalone');
if (!fs.existsSync(path.join(standalone, 'server.js'))) throw new Error('No .next/standalone/server.js - build did not produce a standalone app');

step(`assemble ${path.relative(ROOT, APP)}`);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(APP, { recursive: true });
copy(standalone, APP, (src) => !/[\\/]\.env[^\\/]*$/.test(src)); // never ship local .env files
copy(path.join(ROOT, '.next', 'static'), path.join(APP, '.next', 'static'));
if (BASE_PATH) {
  // Fonts and other url(/...) in the built CSS: Next.js leaves them unprefixed
  let fixed = 0;
  const walkCss = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walkCss(p);
      else if (e.name.endsWith('.css')) {
        const css = fs.readFileSync(p, 'utf-8');
        const out = css.replace(/url\((['"]?)\/(?!\/)/g, (m, q, off) =>
          css.startsWith(BASE_PATH.slice(1) + '/', off + m.length) ? m : `url(${q}${BASE_PATH}/`
        );
        if (out !== css) {
          fs.writeFileSync(p, out);
          fixed++;
        }
      }
    }
  };
  walkCss(path.join(APP, '.next', 'static'));
  console.log(`CSS files with url(/...) prefixed by ${BASE_PATH}: ${fixed}`);
}
// public/ minus whatever git ignores there (the virtual tour, raw panorama photos...): only what the site ships
const ignoredInPublic = execSync('git ls-files -o -i --exclude-standard --directory public', { cwd: ROOT, encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((s) => s.trim().replace(/^public\//, '').replace(/\/$/, ''))
  .filter(Boolean);
console.log(`left out of public/: ${ignoredInPublic.join(', ') || '(nothing)'}`);
copy(path.join(ROOT, 'public'), path.join(APP, 'public'), (src) => {
  const rel = path.relative(path.join(ROOT, 'public'), src).replace(/\\/g, '/');
  return !ignoredInPublic.some((ig) => rel === ig || rel.startsWith(`${ig}/`));
});
fs.mkdirSync(path.join(APP, 'src', 'data'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'src', 'data'))) {
  if (f.endsWith('.json')) fs.copyFileSync(path.join(ROOT, 'src', 'data', f), path.join(APP, 'src', 'data', f));
}
fs.mkdirSync(path.join(APP, 'public', 'uploads'), { recursive: true });

step('Linux native modules (sharp)');
const nm = path.join(APP, 'node_modules');
const sharpPkg = path.join(nm, 'sharp', 'package.json');
if (fs.existsSync(sharpPkg)) {
  const version = JSON.parse(fs.readFileSync(sharpPkg, 'utf-8')).version;
  const tmp = path.join(OUT, '.sharp-linux');
  fs.mkdirSync(tmp, { recursive: true });
  fs.writeFileSync(path.join(tmp, 'package.json'), '{"name":"sharp-linux","private":true}');
  execSync(`npm install --no-audit --no-fund --os=linux --cpu=x64 --libc=glibc sharp@${version}`, { cwd: tmp, stdio: 'inherit' });
  for (const d of fs.readdirSync(path.join(nm, '@img'))) {
    if (/win32|darwin|wasm/.test(d)) fs.rmSync(path.join(nm, '@img', d), { recursive: true, force: true });
  }
  copy(path.join(tmp, 'node_modules', 'sharp'), path.join(nm, 'sharp'));
  for (const d of fs.readdirSync(path.join(tmp, 'node_modules', '@img'))) {
    copy(path.join(tmp, 'node_modules', '@img', d), path.join(nm, '@img', d));
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`sharp ${version}: linux-x64 (glibc) binaries in place`);
} else {
  console.log('sharp is not in the standalone build; nothing to swap');
}
const nativeLeft = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(node|dll)$/.test(e.name) && /win32|windows|\.dll$/i.test(p)) nativeLeft.push(path.relative(APP, p));
  }
};
walk(nm);
if (nativeLeft.length) throw new Error(`Windows native files left in the package:\n${nativeLeft.join('\n')}`);

step('pm2 config');
fs.writeFileSync(
  path.join(APP, 'ecosystem.config.cjs'),
  `// pm2 process for cdmotest.lambda-cro.com. Start once (as the site user):  pm2 start ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: 'lambda-cdmotest',
      cwd: '${SITE_DIR}/app',
      script: 'start.cjs',
      env: { NODE_ENV: 'production', PORT: '${PORT}', HOSTNAME: '127.0.0.1' },
      // A deploy uploads a new restart.txt; pm2 then restarts the site. CMS saves never trigger a restart.
      watch: ['restart.txt'],
      watch_delay: 2000,
      max_memory_restart: '700M',
      time: true,
    },
  ],
};
`
);
fs.writeFileSync(
  path.join(APP, 'start.cjs'),
  `// Starts the site. Reads the admin sign-in settings (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET) from
// .env.production next to this file on every start, so a changed file takes effect on the next restart
// (upload a new restart.txt). The file is never committed and never served (Apache only proxies to Node).
const fs = require('fs');
const path = require('path');
try {
  const text = fs.readFileSync(path.join(__dirname, '.env.production'), 'utf-8');
  for (const line of text.split(/\\r?\\n/)) {
    const m = line.match(/^\\s*([A-Z_][A-Z0-9_]*)\\s*=\\s*(.*?)\\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\\1$/, '$2');
  }
} catch {
  console.warn('No .env.production: the site runs, but nobody can sign in to /admin until it exists.');
}
require('./server.js');
`
);
fs.writeFileSync(path.join(APP, 'restart.txt'), `${new Date().toISOString()}\n`);

// Public entry, deployed to /var/www/lambda-cro.com/CDMOtest: .htaccess routes everything except /virtualtour to
// the app through __node_bridge.php.
fs.mkdirSync(PUBLIC_ENTRY, { recursive: true });
for (const f of ['.htaccess', '__node_bridge.php']) {
  fs.copyFileSync(path.join(ROOT, 'server', 'cdmotest-subfolder', f), path.join(PUBLIC_ENTRY, f));
}
// The site user's own folder (old cdmotest.lambda-cro.com DocumentRoot): serves nothing, sends visitors to the
// new address.
fs.copyFileSync(path.join(ROOT, 'server', 'cdmotest', '.htaccess'), path.join(OUT, '.htaccess'));

const bytes = (() => {
  let total = 0;
  let files = 0;
  const w = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) w(p);
      else {
        total += fs.statSync(p).size;
        files++;
      }
    }
  };
  w(APP);
  return { total, files };
})();
step(`done: ${bytes.files} files, ${(bytes.total / 1048576).toFixed(1)} MB in ${path.relative(ROOT, APP)} (port ${PORT})`);
