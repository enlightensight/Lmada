/**
 * Checks that every icon on every CMS page can be replaced from the admin panel.
 *
 * For each page it gives every point, card, step and heading the admin panel lists a unique
 * uploaded-icon reference (page.itemIcons), publishes, and checks the live page shows it.
 * storedPages.json is restored byte-for-byte afterwards.
 *
 * With --usage-out it writes which items actually show an icon on each page; the admin
 * "Icons on This Page" panel uses that file to list only icons that exist on the page.
 *
 * Usage: node scripts/cms_icons_e2e.mjs [--base http://localhost:3000] [--only category/slug]
 *        node scripts/cms_icons_e2e.mjs --usage-out src/data/cmsIconUsage.json
 */
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const arg = (name, fallback) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const BASE = arg('--base', 'http://localhost:3000');
// The admin API requires a signed-in session (src/lib/adminSession.ts)
import { signInAdmin } from './admin_session.mjs';
await signInAdmin(BASE);
const ONLY = arg('--only', null);
const USAGE_OUT = arg('--usage-out', null);

const STORE = path.join(process.cwd(), 'src', 'data', 'storedPages.json');
const ORIGINAL = fs.readFileSync(STORE);
const restore = () => fs.writeFileSync(STORE, ORIGINAL);
process.on('SIGINT', () => { restore(); process.exit(130); });

const key = (t) => String(t || '').replace(/\s+/g, ' ').trim();

// Same parsing as src/lib/facilityList.ts
function facilityItems(para) {
  const cap = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
  const toItems = (list) => list.split(/,\s*(?:and\s+)?/).map((i) => cap(i.trim().replace(/\.$/, ''))).filter(Boolean);
  const commas = (t) => (t.match(/,/g) || []).length;
  const bold = para.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (bold && bold[1].trim() && commas(bold[2]) >= 2) return toItems(bold[2]);
  const plain = para.replace(/\*\*/g, '').match(/^(.+?\b(?:includes?|incorporates?|comprises?))\s+(.+?)\.?$/i);
  if (plain && commas(plain[2]) >= 2) return toItems(plain[2]);
  return [];
}

// Same items as the admin IconPickerPanel lists
function collectItems(page) {
  const items = new Set();
  const add = (list) => (list || []).forEach((t) => { const k = key(t); if (k) items.add(k); });
  add(page.capabilities); add(page.bioassayCapabilities); add(page.immunogenicityCapabilities);
  add((page.analyticalTechnologies || []).map((t) => (typeof t === 'string' ? t : t?.name)));
  add((page.applicableModalities || []).map((m) => m?.title));
  for (const sec of page.sections || []) {
    add([sec.title, sec.secondaryTitle]);
    add(sec.bullets);
    add((sec.text || '').split('\n\n').flatMap(facilityItems));
    add((sec.cards || []).flatMap((c) => [c?.title, ...(c?.items || []).map((i) => i?.name)]));
    add((sec.steps || []).map((s) => s?.title));
  }
  return [...items];
}

const liveUrl = async (p) => (await (await fetch(`${BASE}/api/admin/pages/${encodeURIComponent(p.category)}/${encodeURIComponent(p.slug)}`)).json()).publicPath;

const usage = {};
let failures = 0;
try {
  const records = JSON.parse(ORIGINAL.toString('utf-8'));
  for (const page of records) {
    const pageKey = `${page.category}/${page.slug}`;
    if (ONLY && ONLY !== pageKey) continue;
    const items = collectItems(page);
    if (!items.length) { usage[pageKey] = { shown: [], checked: [] }; continue; }
    const clone = JSON.parse(JSON.stringify(page));
    delete clone.draftContent;
    clone.itemIcons = {};
    const markers = items.map((text, i) => {
      const marker = `zqicon${String(i).padStart(3, '0')}${pageKey.replace(/[^a-z]/gi, '').slice(0, 12)}zq`;
      clone.itemIcons[text] = `/uploads/${marker}.svg`;
      return { text, marker };
    });
    const api = `${BASE}/api/admin/pages/${encodeURIComponent(page.category)}/${encodeURIComponent(page.slug)}`;
    const pub = await (await fetch(api, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'publish', page: clone }) })).json();
    if (!pub.success) { console.log(`FAIL ${pageKey}: publish failed`); failures++; restore(); continue; }
    const res = await fetch(`${BASE}${await liveUrl(page)}`);
    const html = (await res.text()).replace(/<script[\s\S]*?<\/script>/gi, '');
    const shown = markers.filter((m) => html.includes(m.marker)).map((m) => m.text);
    // shown: items that display an icon; checked: every item tested (anything newer is unknown)
    usage[pageKey] = { shown, checked: items };
    const hidden = markers.length - shown.length;
    console.log(`${res.status === 200 ? 'ok  ' : 'FAIL'} ${pageKey.padEnd(42)} icons replaceable: ${String(shown.length).padStart(3)}  (items without an icon on this page: ${hidden})`);
    if (res.status !== 200) failures++;
    restore();
  }
} finally {
  restore();
  if (USAGE_OUT && !ONLY) {
    fs.writeFileSync(USAGE_OUT, JSON.stringify(usage, null, 2) + '\n');
    console.log(`Icon usage written to ${USAGE_OUT}`);
  }
}
process.exit(failures ? 1 : 0);
