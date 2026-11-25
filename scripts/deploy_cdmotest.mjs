/**
 * Deploys the built server package to cdmotest.lambda-cro.com (see docs/DEPLOY_CDMOTEST.md).
 *
 *   node scripts/build_server_package.mjs     # first: builds deploy/server-package
 *   node scripts/deploy_cdmotest.mjs [--dry]
 *
 * Uses the deploy key (~/.ssh/lambda_cdmo_deploy). Steps:
 *  1. pack deploy/server-package/app into one .tar.gz and upload it (much faster than thousands of files)
 *  2. on the server: unpack into app.next/, then copy over from the running app/ what belongs to the server:
 *     CMS content (src/data/stored*.json), admin uploads (public/uploads/) and .env.production
 *  3. swap: app/ -> app.prev/ (kept for one-step rollback), app.next/ -> app/; pm2 restarts the site
 *  4. upload .htaccess and __node_bridge.php
 *  5. check the site answers through Apache
 *
 * Rollback: ssh in and run  cd ~ && mv app app.bad && mv app.prev app && pm2 restart lambda-cdmotest
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const ROOT = process.cwd();
const DRY = process.argv.includes('--dry');
const HOST = 'anronix@68.178.172.196';
const KEY = path.join(os.homedir(), '.ssh', 'lambda_cdmo_deploy');
const PKG = path.join(ROOT, 'deploy', 'server-package');
const TAR = path.join(ROOT, 'deploy', 'app.tar.gz');
const SSH_OPTS = ['-i', KEY, '-o', 'BatchMode=yes', '-o', 'ServerAliveInterval=30'];

const step = (m) => console.log(`\n== ${m}`);
const run = (cmd, args, opts = {}) => {
  console.log(`$ ${cmd} ${args.map((a) => (/\s/.test(a) ? JSON.stringify(a) : a)).join(' ')}`);
  if (DRY) return '';
  return execFileSync(cmd, args, { stdio: opts.capture ? 'pipe' : 'inherit', encoding: 'utf-8', ...opts });
};
const ssh = (script, capture = false) => run('ssh', [...SSH_OPTS, HOST, script], { capture });

if (!fs.existsSync(path.join(PKG, 'app', 'server.js'))) {
  console.error('No deploy/server-package/app - run: node scripts/build_server_package.mjs');
  process.exit(1);
}

step('pack app');
run('tar', ['-czf', TAR, '-C', PKG, 'app']);
if (!DRY) console.log(`${(fs.statSync(TAR).size / 1048576).toFixed(1)} MB`);

step('upload');
run('scp', [...SSH_OPTS, TAR, `${HOST}:app.tar.gz`]);
run('scp', [...SSH_OPTS, path.join(PKG, '.htaccess'), path.join(PKG, '__node_bridge.php'), `${HOST}:`]);

step('unpack, keep server content, swap, restart');
ssh(`set -e
cd ~
rm -rf app.next && mkdir app.next.tmp && tar -xzf app.tar.gz -C app.next.tmp && mv app.next.tmp/app app.next && rmdir app.next.tmp
if [ -d app ]; then
  cp -p app/src/data/stored*.json app.next/src/data/ 2>/dev/null || true
  mkdir -p app.next/public/uploads && cp -rp app/public/uploads/. app.next/public/uploads/ 2>/dev/null || true
  [ -f app/.env.production ] && cp -p app/.env.production app.next/.env.production
fi
chmod 600 app.next/.env.production 2>/dev/null || true
rm -rf app.prev
[ -d app ] && mv app app.prev
mv app.next app
rm -f app.tar.gz
if pm2 describe lambda-cdmotest >/dev/null 2>&1; then pm2 restart lambda-cdmotest; else (cd app && pm2 start ecosystem.config.cjs); fi
pm2 save
`);

step('check through Apache');
const out = ssh(
  `sleep 4; H=cdmotest.lambda-cro.com; for p in / /services/cell-line-development /admin "/virtualtour/00%20MAIN%20BUILDING/index.htm"; do printf '%-45s %s\\n' "$p" "$(curl -sk --resolve $H:443:127.0.0.1 -o /dev/null -w '%{http_code}' "https://$H$p")"; done`,
  true
);
console.log(out);
if (!DRY && /\s(5\d\d|000)\s*$/m.test(out)) {
  console.error('Some pages fail. Roll back with: ssh in, cd ~ && mv app app.bad && mv app.prev app && pm2 restart lambda-cdmotest');
  process.exit(1);
}
fs.rmSync(TAR, { force: true });
step('deployed');
