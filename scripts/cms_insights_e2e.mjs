/**
 * End-to-end check of the "Insights & Articles" CMS.
 * For every insights category it creates an article through the admin API, checks it on the
 * category listing and on its own article page, edits it, then deletes it and checks it is gone.
 * src/data/storedInsights.json is restored byte-for-byte at the end.
 *
 * Usage: node scripts/cms_insights_e2e.mjs [--base http://localhost:3000]
 */
import fs from 'fs';
import path from 'path';

const i = process.argv.indexOf('--base');
const BASE = i >= 0 ? process.argv[i + 1] : 'http://localhost:3000';
// The admin API requires a signed-in session (src/lib/adminSession.ts)
import { signInAdmin } from './admin_session.mjs';
await signInAdmin(BASE);
const STORE = path.join(process.cwd(), 'src', 'data', 'storedInsights.json');
const ORIGINAL = fs.existsSync(STORE) ? fs.readFileSync(STORE) : null;
const restore = () => { if (ORIGINAL) fs.writeFileSync(STORE, ORIGINAL); };

let passed = 0, failed = 0;
const check = (ok, label) => { ok ? passed++ : failed++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`); };
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '').toLowerCase();
const json = (method, body) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

try {
  for (const category of ['blogs', 'case-studies', 'brochures', 'news', 'events']) {
    const m = `zqi${category.replace(/-/g, '')}${Date.now().toString(36)}zq`;
    const article = {
      title: `Audit article ${m}title`,
      category,
      summary: `Audit summary ${m}summary`,
      badge: `Audit ${m}badge`,
      image: `/uploads/${m}image.png`,
      author: { name: `Audit Author ${m}author`, role: `Audit role ${m}role` },
      date: 'January 1, 2030',
      tags: [`${m}tag`],
      keyTakeaways: [`Audit takeaway ${m}takeaway`],
      detailedContent: {
        subtitle: `Audit subtitle ${m}subtitle`,
        abstract: `Audit abstract ${m}abstract`,
        sections: [{ heading: `Audit heading ${m}heading`, body: [`Audit paragraph ${m}paragraph`] }],
        methodologyHighlights: [`Audit method ${m}method`],
        regulatoryImpact: `Audit impact ${m}impact`,
      },
    };

    const created = await (await fetch(`${BASE}/api/admin/insights`, json('POST', article))).json();
    check(created.success === true && Boolean(created.item?.id), `[${category}] create article`);
    const id = created.item?.id;
    const slug = created.item?.slug;
    if (!id) continue;

    const pub = await (await fetch(`${BASE}/api/insights`)).json();
    check(JSON.stringify(pub).includes(`${m}title`), `[${category}] article in public /api/insights feed`);

    const listing = visible(await (await fetch(`${BASE}/insights/${category}`)).text());
    check(listing.includes(`${m}title`), `[${category}] article shown on the category page (server-rendered)`);

    const detailRes = await fetch(`${BASE}/insights/${category}/${slug}`);
    const detail = visible(await detailRes.text());
    check(detailRes.status === 200, `[${category}] article page opens`);
    for (const field of ['title', 'badge', 'abstract', 'heading', 'paragraph', 'author', 'role', 'image', 'takeaway', 'tag', 'method', 'impact']) {
      check(detail.includes(`${m}${field}`), `[${category}] article page shows ${field}`);
    }

    const updated = await (await fetch(`${BASE}/api/admin/insights/${id}`, json('PUT', { ...created.item, title: `Audit article ${m}edited` }))).json();
    check(updated.success === true, `[${category}] edit article`);
    const detail2 = visible(await (await fetch(`${BASE}/insights/${category}/${updated.item?.slug || slug}`)).text());
    check(detail2.includes(`${m}edited`), `[${category}] edited title shows on the article page`);

    const del = await (await fetch(`${BASE}/api/admin/insights/${id}`, { method: 'DELETE' })).json();
    check(del.success === true, `[${category}] delete article`);
    const gone = await fetch(`${BASE}/insights/${category}/${updated.item?.slug || slug}`);
    check(gone.status === 404, `[${category}] deleted article page returns 404 (got ${gone.status})`);
    const listing2 = visible(await (await fetch(`${BASE}/insights/${category}`)).text());
    check(!listing2.includes(m), `[${category}] deleted article no longer on the category page`);
  }
} finally {
  restore();
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
