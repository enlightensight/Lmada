/**
 * End-to-end check of "Create New Page" in the admin panel.
 * Creates a custom page holding one section of every layout style (with text, image and
 * video content), walks it through draft -> preview -> publish -> unpublish -> delete, and
 * checks the public page at each step. storedPages.json is restored byte-for-byte afterwards.
 *
 * Usage: node scripts/cms_custom_page_e2e.mjs [--base http://localhost:3000]
 */
import fs from 'fs';
import path from 'path';

const i = process.argv.indexOf('--base');
const BASE = i >= 0 ? process.argv[i + 1] : 'http://localhost:3000';
const STORE = path.join(process.cwd(), 'src', 'data', 'storedPages.json');
const ORIGINAL = fs.readFileSync(STORE);

let passed = 0, failed = 0;
const check = (ok, label) => { ok ? passed++ : failed++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`); };
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '').toLowerCase();
const send = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

const CATEGORY = 'audit-test';
const SLUG = 'all-section-styles';
const URL = `${BASE}/${CATEGORY}/${SLUG}`;
const API = `${BASE}/api/admin/pages/${CATEGORY}/${SLUG}`;
const m = (name) => `zqc${name.replace(/[^a-z]/gi, '').toLowerCase()}zq`;

const STYLES = [
  'feature-split', 'cards-grid', 'process-steps', 'stats-metrics', 'capabilities-checklist', 'modalities-grid',
  'equipment-carousel', 'technical-specs', 'video-hero-banner', 'cta-banner', 'rich-text', 'faq-accordion',
];

const sections = STYLES.map((style) => ({
  id: `sec-${style}`,
  style,
  title: `Title ${m(style + 'title')}`,
  subtitle: `Subtitle ${style}`,
  text: `Body text ${m(style + 'text')}`,
  dark: false,
  image: `/uploads/${m(style + 'image')}.png`,
  images: [`/uploads/${m(style + 'image')}.png`],
  video: style === 'video-hero-banner' ? `/uploads/${m(style + 'video')}.mp4` : undefined,
  mediaType: style === 'video-hero-banner' ? 'video' : 'image',
  imageSide: 'right',
  buttonText: 'Contact us',
  buttonLink: '/contact',
  bullets: [`Bullet ${m(style + 'item')}`],
  cards: [{ title: `Card ${m(style + 'item')}`, description: 'Card description', image: '/images/hero_cleanroom.png', link: '/contact' }],
  steps: [{ step: '01', title: `Step ${m(style + 'item')}`, description: 'Step description' }],
  stats: [{ value: '42', label: `Stat ${m(style + 'item')}`, sublabel: 'Sublabel' }],
  specs: [{ label: `Spec ${m(style + 'item')}`, value: 'Value' }],
  faqs: [{ question: `Question ${m(style + 'item')}?`, answer: 'Answer.' }],
}));

const page = {
  category: CATEGORY,
  slug: SLUG,
  isCustom: true,
  title: `Audit custom page ${m('pagetitle')}`,
  metaTitle: `Audit meta ${m('metatitle')}`,
  metaDesc: `Audit description ${m('metadesc')}`,
  badge: `Badge ${m('badge')}`,
  heading: `Heading ${m('heading')}`,
  subtitle: `Subtitle ${m('subtitle')}`,
  description: `Description ${m('description')}`,
  image: `/uploads/${m('heroimage')}.png`,
  heroPrimaryCtaText: `Primary ${m('herocta')}`,
  heroPrimaryCtaLink: '/contact',
  sections,
  faqs: [{ question: `Page FAQ ${m('pagefaq')}?`, answer: 'Answer.' }],
  ctaTitle: `CTA ${m('ctatitle')}`,
};

try {
  // 1. create as draft
  const created = await (await fetch(`${BASE}/api/admin/pages`, send('POST', { page }))).json();
  check(created.success === true, 'create page as draft');
  check((await fetch(URL)).status === 404, 'draft page is not public (404)');
  const preview = visible(await (await fetch(`${URL}?preview=true`)).text());
  check(preview.includes(m('heading')), 'draft page visible with ?preview=true');

  // 2. publish
  const published = await (await fetch(API, send('PUT', { action: 'publish', page }))).json();
  check(published.success === true, 'publish page');
  const liveRes = await fetch(URL);
  const raw = await liveRes.text();
  const live = visible(raw);
  check(liveRes.status === 200, 'published page opens');
  for (const f of ['badge', 'heading', 'subtitle', 'description', 'heroimage', 'herocta', 'pagefaq', 'ctatitle']) {
    check(live.includes(m(f)), `page shows ${f}`);
  }
  check(raw.toLowerCase().includes(m('metatitle')), 'browser title uses the SEO meta title');
  check(raw.toLowerCase().includes(m('metadesc')), 'meta description is set');
  for (const style of STYLES) {
    check(live.includes(m(style + 'title')), `section "${style}": heading shown`);
    const bodyShown = live.includes(m(style + 'text')) || live.includes(m(style + 'item'));
    check(bodyShown, `section "${style}": content shown`);
  }
  check(live.includes(m('feature-splitimage')), 'feature-split section shows its image');
  check(live.includes(m('video-hero-bannervideo')) || live.includes(m('video-hero-bannerimage')), 'video banner section shows its media');
  check((await (await fetch(`${BASE}/api/admin/pages`)).json()).pages.some((p) => p.slug === SLUG), 'page listed in the admin dashboard');

  // 3. unpublish
  const unpublished = await (await fetch(API, send('PUT', { action: 'unpublish' }))).json();
  check(unpublished.success === true, 'unpublish page');
  check((await fetch(URL)).status === 404, 'unpublished page is no longer public (404)');

  // 4. delete
  const deleted = await (await fetch(API, { method: 'DELETE' })).json();
  check(deleted.success === true, 'delete page');
  check((await fetch(API)).status === 404, 'deleted page is gone from the admin API');
} finally {
  fs.writeFileSync(STORE, ORIGINAL);
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
