/**
 * CMS end-to-end audit.
 *
 * For every page in the admin CMS this script:
 *   1. checks the draft -> preview -> revert -> publish workflow,
 *   2. stamps a unique marker on every text, media and link field, publishes,
 *      and checks whether each marker reaches the live page (is the field wired up?),
 *   3. adds what an editor can add on any page (a new section, a new FAQ, footer CTA copy,
 *      FAQ heading) and checks it shows up,
 *   4. stamps every "additional page content" slot (page.customText) and checks it shows up,
 *   5. lists text and media that appear on the live page but are NOT in the page's
 *      CMS record or slots (hardcoded, so not editable from the admin panel).
 *
 * It restores src/data/storedPages.json byte-for-byte when it finishes (or crashes).
 *
 *   6. probes the standard hero and section fields (tag, heading, text, bullets, image, button)
 *      and records which ones this page's design does not display. With --usage-out the result
 *      is written to a JSON file the admin editor reads to tell editors "not shown on this page".
 *
 * Usage:  node scripts/cms_e2e_audit.mjs [--base http://localhost:3000] [--only category/slug] [--out report.json]
 *         node scripts/cms_e2e_audit.mjs --usage-out src/data/cmsFieldUsage.json
 */
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const BASE = arg('--base', 'http://localhost:3000');
// The admin API requires a signed-in session (src/lib/adminSession.ts)
import { signInAdmin } from './admin_session.mjs';
await signInAdmin(BASE);
const ONLY = arg('--only', null);
const OUT = arg('--out', null);
const USAGE_OUT = arg('--usage-out', null);
const SNAPSHOT = arg('--snapshot', null); // write visible text + media of every live page, change nothing
const COMPARE = arg('--compare', null);   // diff live pages against an earlier --snapshot file

// One audit at a time: the run rewrites storedPages.json, so concurrent runs would corrupt each other's results.
const LOCK = path.join(process.cwd(), '.cms-audit.lock');
for (let waited = 0; ; waited += 2) {
  try { fs.mkdirSync(LOCK); break; } catch {
    if (waited > 600) { console.error('Could not get audit lock (.cms-audit.lock). Delete it if no audit is running.'); process.exit(2); }
    await new Promise((r) => setTimeout(r, 2000));
  }
}
const unlock = () => { try { fs.rmdirSync(LOCK); } catch {} };
process.on('exit', unlock);

const STORE = path.join(process.cwd(), 'src', 'data', 'storedPages.json');
const ORIGINAL = fs.readFileSync(STORE);
const restore = () => {
  for (let attempt = 1; ; attempt++) {
    try { fs.writeFileSync(STORE, ORIGINAL); return; } catch (err) {
      if (attempt >= 20) throw err;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250); // brief pause, then retry
    }
  }
};
process.on('SIGINT', () => { restore(); process.exit(130); });

// ---- field classification -------------------------------------------------
const SKIP_KEYS = new Set([
  'category', 'slug', 'status', 'layoutTemplate', 'lastSavedAt', 'lastPublishedAt', 'updatedAt', 'createdAt',
  'id', 'style', 'imageSide', 'heroMediaType', 'mediaType', 'icon', 'iconName', 'color', 'type',
  'isPublished', 'hasUnpublishedChanges', 'isCustom', 'dark', 'draftContent', 'draftData',
]);
const MEDIA_KEYS = new Set(['image', 'images', 'heroVideo', 'video']);
const isLinkKey = (k) => k === 'link' || k === 'href' || /Link$/.test(k);

function classify(pathParts) {
  const keys = pathParts.filter((p) => typeof p === 'string');
  const last = keys[keys.length - 1];
  if (keys.some((k) => SKIP_KEYS.has(k))) return null;
  if (MEDIA_KEYS.has(last)) return 'media';
  if (isLinkKey(last)) return 'link';
  return 'text';
}

let counter = 0;
function stamp(page, kind) {
  const clone = JSON.parse(JSON.stringify(page));
  const markers = [];
  const walk = (node, parts) => {
    if (Array.isArray(node)) {
      node.forEach((v, i) => {
        if (typeof v === 'string') maybe(node, i, v, [...parts, i]);
        else walk(v, [...parts, i]);
      });
    } else if (node && typeof node === 'object') {
      for (const k of Object.keys(node)) {
        const v = node[k];
        if (typeof v === 'string') maybe(node, k, v, [...parts, k]);
        else walk(v, [...parts, k]);
      }
    }
  };
  const maybe = (holder, key, value, parts) => {
    if (classify(parts) !== kind || !value) return;
    const m = `zqm${String(++counter).padStart(5, '0')}zq`;
    // Page titles are cut at the dash for breadcrumbs, so their marker goes in front.
    if (kind === 'text') holder[key] = parts.length === 1 && key === 'title' ? `${m} ${value}` : `${value} ${m}`;
    else if (kind === 'media') holder[key] = `/uploads/${m}${/\.(mp4|webm|mov)$/i.test(value) || parts.includes('heroVideo') || parts.includes('video') ? '.mp4' : '.png'}`;
    else holder[key] = `/${m}`;
    markers.push({ marker: m, path: parts.map((p) => (typeof p === 'number' ? `[${p}]` : `.${p}`)).join('').replace(/^\./, ''), original: value });
  };
  walk(clone, []);
  return { clone, markers };
}

// ---- http helpers -----------------------------------------------------------
// The dev server occasionally drops a connection while it recompiles; retry instead of aborting the run.
const nativeFetch = globalThis.fetch;
const fetch = async (url, init) => {
  for (let attempt = 1; ; attempt++) {
    try { return await nativeFetch(url, init); } catch (err) {
      if (attempt >= 5) throw err;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
};
const api = (p) => `${BASE}/api/admin/pages/${encodeURIComponent(p.category)}/${encodeURIComponent(p.slug)}`;
// The address the admin panel shows for a page (GET /api/admin/pages/... -> publicPath).
const publicPaths = new Map();
const liveUrl = (p) => `${BASE}${publicPaths.get(`${p.category}/${p.slug}`) || (p.category === 'home' ? '/' : p.slug === p.category ? `/${p.category}` : `/${p.category}/${p.slug}`)}`;
async function loadPublicPaths(records) {
  for (const p of records) {
    const info = await (await fetch(api(p))).json();
    if (info.publicPath) publicPaths.set(`${p.category}/${p.slug}`, info.publicPath);
  }
}
async function put(p, action, page) {
  const res = await fetch(api(p), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, page }),
  });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok && json.success, status: res.status, json };
}
async function get(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'Cache-Control': 'no-cache' } });
  return { status: res.status, url: res.url, html: await res.text() };
}

// ---- html helpers -----------------------------------------------------------
const decode = (s) =>
  s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
function splitHtml(html) {
  const headEnd = html.indexOf('</head>');
  const head = headEnd >= 0 ? html.slice(0, headEnd) : '';
  const body = headEnd >= 0 ? html.slice(headEnd) : html;
  const joined = html.replace(/"\]\)<\/script><script>self\.__next_f\.push\(\[1,"/g, '');
  return { head: stripScripts(head).toLowerCase(), visible: stripScripts(body).toLowerCase(), raw: joined.toLowerCase() };
}
const where = (parts, marker) =>
  parts.visible.includes(marker) ? 'visible' : parts.head.includes(marker) ? 'head' : parts.raw.includes(marker) ? 'payload-only' : 'missing';

const norm = (s) => decode(s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').replace(/ ([.,;:!?)])/g, '$1').trim().toLowerCase();

/** Text + media on the page body (outside header/nav/footer) that the page's CMS record does not contain. */
function findHardcoded(html, page, slots = []) {
  let body = stripScripts(html.slice(Math.max(0, html.indexOf('<body'))));
  body = body
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, '');
  const dataText = norm(JSON.stringify([page, slots.map((sl) => sl.default)]).replace(/\\n/g, ' ').replace(/\\"/g, '"'));

  const texts = new Set();
  // join inline formatting so "<strong>35,000</strong> sq ft" is one run
  const flattened = body.replace(/<\/?(strong|b|em|i|span|a|br|u|sup|sub)\b[^>]*>/gi, ' ');
  for (const chunk of flattened.split(/<[^>]+>/)) {
    const t = norm(chunk);
    if (t.length < 28) continue;
    if (dataText.includes(t)) continue;
    // tolerate partial overlap: every sentence found in data
    const sentences = t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 20);
    if (sentences.length > 1 && sentences.every((s) => dataText.includes(s))) continue;
    texts.add(decode(chunk).replace(/\s+/g, ' ').trim());
  }

  const media = new Set();
  const dataRaw = JSON.stringify([page, slots.map((sl) => sl.default)]).toLowerCase();
  const srcRe = /<(img|video|source)\b[^>]*?\s(?:src|poster)="([^"]+)"/gi;
  let m;
  while ((m = srcRe.exec(body))) {
    let src = decode(m[2]);
    const nx = src.match(/[?&]url=([^&]+)/);
    if (nx) src = decodeURIComponent(nx[1]);
    if (src.startsWith('data:')) continue;
    let plain = src;
    try { plain = decodeURI(src); } catch {}
    if (![src, plain, encodeURI(plain)].some((v) => dataRaw.includes(v.toLowerCase()))) media.add(plain);
  }
  return { texts: [...texts], media: [...media] };
}

/** Ordered visible text chunks + media sources of a page body (scripts/styles removed). */
function visibleContent(html) {
  const body = stripScripts(html.slice(Math.max(0, html.indexOf('<body')))).replace(/<svg[\s\S]*?<\/svg>/gi, ' ').replace(/<!--[\s\S]*?-->/g, '');
  const texts = body.split(/<[^>]+>/).map((c) => decode(c).replace(/\s+/g, ' ').trim()).filter((c) => c.length > 2);
  const media = [];
  const re = /<(img|video|source)\b[^>]*?\s(?:src|poster)="([^"]+)"/gi;
  let m;
  while ((m = re.exec(body))) {
    let src = decode(m[2]);
    const nx = src.match(/[?&]url=([^&]+)/);
    if (nx) src = decodeURIComponent(nx[1]);
    if (!src.startsWith('data:')) media.push(src);
  }
  return { texts, media };
}

if (SNAPSHOT || COMPARE) {
  const records = JSON.parse(ORIGINAL.toString('utf-8'));
  await loadPublicPaths(records);
  const before = COMPARE ? JSON.parse(fs.readFileSync(COMPARE, 'utf-8')) : null;
  const snap = {};
  let changedPages = 0;
  for (const page of records) {
    const key = `${page.category}/${page.slug}`;
    if (ONLY && ONLY !== key) continue;
    const res = await get(liveUrl(page));
    snap[key] = { status: res.status, ...visibleContent(res.html) };
    if (before) {
      const b = before[key];
      if (!b) { console.log(`NEW  ${key}`); continue; }
      const diff = (x, y) => { const set = new Set(y); return [...new Set(x.filter((v) => !set.has(v)))]; };
      const removedT = diff(b.texts, snap[key].texts), addedT = diff(snap[key].texts, b.texts);
      const removedM = diff(b.media, snap[key].media), addedM = diff(snap[key].media, b.media);
      const same = !removedT.length && !addedT.length && !removedM.length && !addedM.length && b.status === snap[key].status;
      if (!same) changedPages++;
      console.log(`${same ? 'same' : 'DIFF'} ${key}${b.status !== snap[key].status ? `  status ${b.status} -> ${snap[key].status}` : ''}`);
      for (const t of removedT) console.log(`     - ${t.slice(0, 160)}`);
      for (const t of addedT) console.log(`     + ${t.slice(0, 160)}`);
      for (const t of removedM) console.log(`     - [media] ${t}`);
      for (const t of addedM) console.log(`     + [media] ${t}`);
    }
  }
  if (SNAPSHOT) { fs.writeFileSync(SNAPSHOT, JSON.stringify(snap)); console.log(`Snapshot of ${Object.keys(snap).length} pages written to ${SNAPSHOT}`); }
  if (before) console.log(`${changedPages} page(s) differ from the snapshot.`);
  process.exit(0);
}

// ---- main -------------------------------------------------------------------
const report = [];
try {
  const list = await (await fetch(`${BASE}/api/admin/pages`)).json();
  if (!list.success) throw new Error('GET /api/admin/pages failed');
  // Work from the raw published records so restore comparisons are exact
  const records = JSON.parse(ORIGINAL.toString('utf-8'));
  console.log(`Admin API lists ${list.pages.length} pages; storage has ${records.length}.`);
  await loadPublicPaths(records);

  for (const page of records) {
    const key = `${page.category}/${page.slug}`;
    if (ONLY && ONLY !== key) continue;
    const r = { page: key, url: liveUrl(page), checks: {}, dead: [], payloadOnly: [], universalMissing: [], slotsMissing: [], hardcoded: null, counts: {} };
    report.push(r);
    const clean = JSON.parse(JSON.stringify(page));
    delete clean.draftContent;

    // A. baseline render
    const base = await get(r.url);
    r.finalUrl = base.url.replace(BASE, '');
    r.checks.baseline200 = base.status === 200;
    // The admin's address must be the page's real address: it opens directly, with no redirect.
    const shown = publicPaths.get(key);
    r.checks.adminAddressIsLiveAddress =
      (Boolean(shown) && decodeURI(r.finalUrl) === decodeURI(shown)) || `admin shows ${shown}, site answers at ${r.finalUrl}`;
    const slots = (await (await fetch(api(page))).json()).textSlots || [];
    r.counts.slots = slots.length;
    r.hardcoded = findHardcoded(base.html, clean, slots);

    // B. draft workflow
    const dm = `zqdraft${String(++counter).padStart(4, '0')}zq`;
    const draft = { ...clean, heading: `${clean.heading} ${dm}`, description: `${clean.description} ${dm}` };
    const saved = await put(page, 'save_draft', draft);
    r.checks.saveDraft = saved.ok || `HTTP ${saved.status} ${saved.json?.error || ''}`;
    const liveAfterDraft = splitHtml((await get(r.url)).html);
    r.checks.draftHiddenFromLive = !liveAfterDraft.raw.includes(dm);
    const sep = r.url.includes('?') ? '&' : '?';
    const previewRes = await get(`${r.url}${sep}preview=true`);
    r.checks.draftVisibleInPreview = splitHtml(previewRes.html).visible.includes(dm) || `not visible (final URL ${previewRes.url.replace(BASE, '')})`;
    const adminGet = await (await fetch(api(page))).json();
    r.checks.adminGetReturnsDraft = Boolean(adminGet.success && adminGet.page?.heading?.includes(dm));
    const reverted = await put(page, 'revert');
    const afterRevert = await (await fetch(api(page))).json();
    r.checks.revertDiscardsDraft = reverted.ok && !afterRevert.page?.heading?.includes(dm);

    // C. field wiring, one pass per kind
    for (const kind of ['text', 'media', 'link']) {
      const { clone, markers } = stamp(clean, kind);
      r.counts[kind] = markers.length;
      if (!markers.length) continue;
      const pub = await put(page, 'publish', clone);
      if (!pub.ok) { r.checks[`publish_${kind}`] = `HTTP ${pub.status} ${pub.json?.error || ''}`; continue; }
      const live = await get(r.url);
      r.checks[`publish_${kind}`] = live.status === 200 || `live page HTTP ${live.status}`;
      const parts = splitHtml(live.html);
      for (const mk of markers) {
        const w = where(parts, mk.marker);
        if (w === 'missing') r.dead.push({ kind, path: mk.path, value: String(mk.original).slice(0, 70) });
        else if (w === 'payload-only') r.payloadOnly.push({ kind, path: mk.path, value: String(mk.original).slice(0, 70) });
        else if (w === 'head') (r.headOnly ||= []).push(mk.path);
      }
      restore();
    }
    restore();

    // D. things an editor can add on ANY page from the admin panel
    {
      const mk = (label) => ({ label, marker: `zqu${String(++counter).padStart(5, '0')}zq` });
      const u = {
        newSectionTitle: mk('added section: title'), newSectionText: mk('added section: text'), newSectionBullet: mk('added section: bullet'),
        newFaqQuestion: mk('added FAQ: question'), faqTitle: mk('FAQ block title'), faqSubtitle: mk('FAQ block subtitle'),
        ctaTitle: mk('footer CTA title'), ctaSubtitle: mk('footer CTA subtitle'),
        ctaPrimary: mk('footer CTA primary button text'), ctaSecondary: mk('footer CTA secondary button text'),
      };
      const clone = JSON.parse(JSON.stringify(clean));
      clone.sections = [...(clone.sections || []), {
        id: 'sec-audit-added', style: 'feature-split', title: `Audit section ${u.newSectionTitle.marker}`, subtitle: '',
        text: `Audit text ${u.newSectionText.marker}`, bullets: [`Audit bullet ${u.newSectionBullet.marker}`], dark: false, image: '/images/hero_cleanroom.png', imageSide: 'right',
      }];
      clone.faqs = [...(clone.faqs || []), { question: `Audit question ${u.newFaqQuestion.marker}?`, answer: 'Audit answer.' }];
      clone.faqTitle = `${clone.faqTitle || 'Frequently Asked Questions'} ${u.faqTitle.marker}`;
      clone.faqSubtitle = `${clone.faqSubtitle || 'Audit subtitle'} ${u.faqSubtitle.marker}`;
      clone.ctaTitle = `${clone.ctaTitle || 'Audit CTA'} ${u.ctaTitle.marker}`;
      clone.ctaSubtitle = `${clone.ctaSubtitle || 'Audit CTA subtitle'} ${u.ctaSubtitle.marker}`;
      clone.primaryCta = { ...(clone.primaryCta || {}), text: `${clone.primaryCta?.text || 'Get in touch'} ${u.ctaPrimary.marker}` };
      clone.secondaryCta = { ...(clone.secondaryCta || {}), text: `${clone.secondaryCta?.text || 'Virtual Tour'} ${u.ctaSecondary.marker}` };
      const pub = await put(page, 'publish', clone);
      if (!pub.ok) r.checks.publish_universal = `HTTP ${pub.status} ${pub.json?.error || ''}`;
      else {
        const live = await get(r.url);
        r.checks.publish_universal = live.status === 200 || `live page HTTP ${live.status}`;
        const parts = splitHtml(live.html);
        for (const item of Object.values(u)) if (where(parts, item.marker) !== 'visible') r.universalMissing.push(item.label);
      }
      restore();
    }

    // E. "additional page content" slots (page.customText)
    if (slots.length) {
      const clone = JSON.parse(JSON.stringify(clean));
      clone.customText = { ...(clone.customText || {}) };
      const stamped = slots.map((sl) => {
        const marker = `zqs${String(++counter).padStart(5, '0')}zq`;
        const kind = sl.kind || 'text';
        clone.customText[sl.key] =
          kind === 'image' ? `/uploads/${marker}.png` : kind === 'video' ? `/uploads/${marker}.mp4` : kind === 'link' ? `/${marker}` : `${clone.customText[sl.key] || sl.default} ${marker}`;
        return { key: sl.key, marker };
      });
      const pub = await put(page, 'publish', clone);
      if (!pub.ok) r.checks.publish_slots = `HTTP ${pub.status} ${pub.json?.error || ''}`;
      else {
        const live = await get(r.url);
        r.checks.publish_slots = live.status === 200 || `live page HTTP ${live.status}`;
        const parts = splitHtml(live.html);
        for (const st of stamped) { const w = where(parts, st.marker); if (w !== 'visible') r.slotsMissing.push(`${st.key} (${w})`); }
      }
      restore();
    }

    // F. which standard fields does this page's design actually display?
    {
      const HERO_FIELDS = ['badge', 'heading', 'subtitle', 'description', 'image'];
      const SECTION_FIELDS = ['subtitle', 'title', 'text', 'bullets', 'image', 'buttonText'];
      const clone = JSON.parse(JSON.stringify(clean));
      const probes = [];
      const probe = (holder, field, where_) => {
        const marker = `zqp${String(++counter).padStart(5, '0')}zq`;
        const current = holder[field];
        if (field === 'image') holder[field] = `/uploads/${marker}.png`;
        else if (field === 'bullets') holder[field] = [...(Array.isArray(current) ? current : []), `Probe ${marker}`];
        else holder[field] = `${typeof current === 'string' && current ? current : 'Probe'} ${marker}`;
        if (field === 'buttonText' && !holder.buttonLink) holder.buttonLink = '/contact';
        probes.push({ marker, field, where: where_ });
      };
      for (const f of HERO_FIELDS) probe(clone, f, 'hero');
      (clone.sections || []).forEach((sec, i) => { for (const f of SECTION_FIELDS) probe(sec, f, sec.id || `#${i}`); });
      const pub = await put(page, 'publish', clone);
      r.usage = { hero: [], sections: {} };
      if (pub.ok) {
        const parts = splitHtml((await get(r.url)).html);
        for (const pr of probes) {
          if (where(parts, pr.marker) !== 'missing') continue;
          if (pr.where === 'hero') r.usage.hero.push(pr.field);
          else (r.usage.sections[pr.where] ||= []).push(pr.field);
        }
      } else r.checks.publish_probe = `HTTP ${pub.status} ${pub.json?.error || ''}`;
      restore();
    }

    const failed = Object.entries(r.checks).filter(([, v]) => v !== true);
    console.log(
      `${failed.length ? 'FAIL' : 'ok  '} ${key.padEnd(44)} fields t/m/l=${r.counts.text || 0}/${r.counts.media || 0}/${r.counts.link || 0}` +
      `  dead=${r.dead.length} payloadOnly=${r.payloadOnly.length} addMissing=${r.universalMissing.length} slots=${slots.length}/${r.slotsMissing.length}missing hardcodedText=${r.hardcoded.texts.length} hardcodedMedia=${r.hardcoded.media.length}` +
      (failed.length ? `\n       ${failed.map(([k, v]) => `${k}: ${v}`).join('\n       ')}` : '')
    );
  }
} finally {
  restore();
  if (/zq[a-z]+\d+zq/.test(fs.readFileSync(STORE, 'utf-8'))) console.error('WARNING: audit markers found in storedPages.json after restore - check the file.');
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  if (USAGE_OUT && !ONLY) {
    // { "category/slug": { hero: [fields not displayed], sections: { "<section id>": [fields not displayed] } } }
    const usage = {};
    for (const r of report) if (r.usage) usage[r.page] = r.usage;
    fs.writeFileSync(USAGE_OUT, JSON.stringify(usage, null, 2) + '\n');
    console.log(`Field usage map written to ${USAGE_OUT}`);
  }
}
