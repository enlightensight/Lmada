/**
 * Applies content patches to the CMS data: src/data/storedPages.json (live content)
 * and src/data/cdmoData.ts (factory defaults used by "reset page").
 *
 * Usage:  node scripts/cms_data_patch.mjs patch.json [--dry]
 *
 * patch.json is an array of operations, applied in order:
 *   { "page": "overview/quality", "op": "set",    "path": "sections[1].text", "value": "..." }
 *   { "page": "overview/quality", "op": "delete", "path": "sections[2].bullets" }
 *   { "page": "overview/quality", "op": "removeSection", "id": "sec-abc123" }
 *
 * "set" creates missing parent objects/arrays. Draft copies (draftContent) get the same change.
 * Shares the .cms-audit.lock with scripts/cms_e2e_audit.mjs so the two never interleave.
 */
import fs from 'fs';
import path from 'path';

const file = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!file) { console.error('usage: node scripts/cms_data_patch.mjs patch.json [--dry]'); process.exit(1); }
const ops = JSON.parse(fs.readFileSync(file, 'utf-8'));

const LOCK = path.join(process.cwd(), '.cms-audit.lock');
for (let waited = 0; ; waited += 2) {
  try { fs.mkdirSync(LOCK); break; } catch {
    if (waited > 600) { console.error('Could not get .cms-audit.lock'); process.exit(2); }
    await new Promise((r) => setTimeout(r, 2000));
  }
}
process.on('exit', () => { try { fs.rmdirSync(LOCK); } catch {} });

const STORE = path.join(process.cwd(), 'src', 'data', 'storedPages.json');
const DEFAULTS = path.join(process.cwd(), 'src', 'data', 'cdmoData.ts');
const MARK = 'export const cdmoData: CDMOPage[] = ';

const stored = JSON.parse(fs.readFileSync(STORE, 'utf-8'));
const defaultsSrc = fs.readFileSync(DEFAULTS, 'utf-8');
const dStart = defaultsSrc.indexOf(MARK) + MARK.length;
const dEnd = defaultsSrc.lastIndexOf('];') + 1;
const defaults = JSON.parse(defaultsSrc.slice(dStart, dEnd));

const parsePath = (p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean).map((t) => (/^\d+$/.test(t) ? Number(t) : t));

function apply(target, op) {
  if (op.op === 'removeSection') {
    if (!Array.isArray(target.sections)) return 'no sections';
    const before = target.sections.length;
    target.sections = target.sections.filter((s) => s.id !== op.id);
    return before === target.sections.length ? `section ${op.id} not found` : null;
  }
  const parts = parsePath(op.path);
  let node = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (node[k] == null) {
      if (op.op !== 'set') return `path ${op.path} not found`;
      node[k] = typeof parts[i + 1] === 'number' ? [] : {};
    }
    node = node[k];
  }
  const last = parts[parts.length - 1];
  if (op.op === 'set') { node[last] = op.value; return null; }
  if (op.op === 'delete') {
    if (!(last in node)) return `path ${op.path} not found`;
    if (Array.isArray(node)) node.splice(last, 1); else delete node[last];
    return null;
  }
  return `unknown op ${op.op}`;
}

let failures = 0;
for (const op of ops) {
  const [category, ...rest] = op.page.split('/');
  const slug = rest.join('/');
  const find = (arr) => arr.find((p) => p.category === category && p.slug === slug);
  const s = find(stored);
  const d = find(defaults);
  if (!s) { console.log(`FAIL ${op.page}: page not in storedPages.json`); failures++; continue; }
  const errStored = apply(s, op);
  if (s.draftContent && Object.keys(s.draftContent).length) apply(s.draftContent, op);
  const errDefault = d ? apply(d, op) : 'no default record';
  const label = `${op.op} ${op.page} ${op.path || op.id}`;
  if (errStored) { console.log(`FAIL ${label}: ${errStored}`); failures++; }
  else console.log(`ok   ${label}${errDefault ? `   (defaults: ${errDefault})` : ''}`);
}

if (failures) { console.log(`${failures} operation(s) failed - nothing written.`); process.exit(1); }
if (DRY) { console.log('Dry run - nothing written.'); process.exit(0); }
fs.writeFileSync(STORE, JSON.stringify(stored, null, 2), 'utf-8');
fs.writeFileSync(DEFAULTS, defaultsSrc.slice(0, dStart) + JSON.stringify(defaults, null, 2) + defaultsSrc.slice(dEnd), 'utf-8');
console.log(`Applied ${ops.length} operation(s).`);
