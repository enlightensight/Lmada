/**
 * Converts the large images the site uses to WebP and points every reference at the new file.
 *
 *   node scripts/convert_images_webp.mjs [--min-mb 1] [--dry]
 *
 * - Images: PNG/JPEG under public/ (not git-ignored folders such as the virtual tour, not public/uploads) of at
 *   least --min-mb, that some source or CMS file references. Each becomes <same name>.webp next to it
 *   (quality 82, transparency kept, wider than 2560 px scaled down).
 * - References are rewritten in every git-tracked text file under src/ plus the CMS data
 *   (src/data/storedPages.json, storedInsights.json, cdmoData.ts...), in plain and URL-encoded form, so the admin
 *   panel shows the WebP file the page really uses.
 * - The original is deleted, unless the committed version of a file we do not rewrite in git still names it
 *   (src/app/globals.css is kept out of commits): then it stays so builds from the repository keep working.
 * - Writes deploy/webp-map.json ({ "/images/a.png": "/images/a.webp" }) for patching CMS data on a server
 *   (see docs/DEPLOY_CDMOTEST.md).
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import sharp from 'sharp';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const MIN_BYTES = Number(arg('--min-mb', '1')) * 1048576;
const DRY = process.argv.includes('--dry');
const MAX_WIDTH = 2560;
const QUALITY = 82;
// Files whose committed version may differ from the working copy and are not committed by us: an image they still
// name in git keeps its original file.
const NOT_COMMITTED = ['src/app/globals.css'];

const toPosix = (p) => p.split(path.sep).join('/');
const ignored = execSync('git ls-files -o -i --exclude-standard --directory public', { encoding: 'utf-8' })
  .split(/\r?\n/).map((s) => s.trim().replace(/\/$/, '')).filter(Boolean);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = toPosix(path.join(d, e.name));
  if (ignored.some((i) => p === i || p.startsWith(`${i}/`))) return [];
  return e.isDirectory() ? walk(p) : [p];
});

const textFiles = [...new Set([
  ...execSync('git ls-files src', { encoding: 'utf-8' }).split('\n'),
  'src/data/storedPages.json',
  'src/data/storedInsights.json',
])].filter((f) => f && /\.(tsx?|jsx?|json|css)$/.test(f) && fs.existsSync(f));
const texts = new Map(textFiles.map((f) => [f, fs.readFileSync(f, 'utf-8')]));

// The ways a path can be written in code and CMS data
const forms = (rel) => {
  const byPart = rel.split('/').map(encodeURIComponent).join('/');
  return [...new Set([rel, encodeURI(rel), rel.replace(/ /g, '%20'), byPart])];
};
const toWebp = (p) => p.replace(/\.(png|jpe?g)$/i, '.webp');

const candidates = walk('public')
  .filter((p) => /\.(png|jpe?g)$/i.test(p) && !p.startsWith('public/uploads/') && fs.statSync(p).size >= MIN_BYTES)
  .map((p) => p.slice('public'.length))
  .filter((rel) => [...texts.values()].some((t) => forms(rel).some((f) => t.includes(f))));

const headTexts = new Map(NOT_COMMITTED.map((f) => {
  try { return [f, execSync(`git show HEAD:${f}`, { encoding: 'utf-8' })]; } catch { return [f, '']; }
}));

let before = 0;
let after = 0;
const map = {};
const kept = [];
for (const rel of candidates) {
  const src = `public${rel}`;
  const dest = `public${toWebp(rel)}`;
  if (fs.existsSync(dest)) {
    console.log(`skip (a .webp of that name exists): ${rel}`);
    continue;
  }
  const size = fs.statSync(src).size;
  let out = size;
  if (!DRY) {
    const img = sharp(src, { limitInputPixels: false });
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
      .toFile(dest);
    out = fs.statSync(dest).size;
  }
  before += size;
  after += out;
  map[rel] = toWebp(rel);
  console.log(`${(size / 1048576).toFixed(1).padStart(5)} MB -> ${(out / 1048576).toFixed(2).padStart(5)} MB  ${rel}`);
}

// Rewrite references (longest paths first, so one path never rewrites part of another)
const pairs = Object.entries(map)
  .flatMap(([from, to]) => forms(from).map((f, i) => [f, forms(to)[i]]))
  .sort((a, b) => b[0].length - a[0].length);
let changedFiles = 0;
let replacements = 0;
for (const [file, text] of texts) {
  let next = text;
  for (const [from, to] of pairs) {
    const n = next.split(from).length - 1;
    if (n) {
      next = next.split(from).join(to);
      replacements += n;
    }
  }
  if (next !== text) {
    changedFiles++;
    if (!DRY) fs.writeFileSync(file, next);
  }
}

// Remove originals nothing else needs
for (const rel of Object.keys(map)) {
  const neededByHead = [...headTexts.values()].some((t) => forms(rel).some((f) => t.includes(f)));
  if (neededByHead) kept.push(rel);
  else if (!DRY) fs.rmSync(`public${rel}`);
}

if (!DRY) {
  fs.mkdirSync('deploy', { recursive: true });
  fs.writeFileSync('deploy/webp-map.json', `${JSON.stringify(map, null, 2)}\n`);
}
console.log(`\n${Object.keys(map).length} images: ${(before / 1048576).toFixed(0)} MB -> ${(after / 1048576).toFixed(0)} MB`);
console.log(`${replacements} references rewritten in ${changedFiles} files`);
if (kept.length) console.log(`originals kept (still named by the committed ${NOT_COMMITTED.join(', ')}): ${kept.join(', ')}`);
if (DRY) console.log('(dry run: nothing written)');
