/**
 * Renames image paths in CMS data files after images were converted (scripts/convert_images_webp.mjs), so a
 * server's own content points at the new files:
 *
 *   node apply_image_map.mjs webp-map.json storedPages.json [storedInsights.json ...]
 *
 * The map is { "/images/a.png": "/images/a.webp" }. Plain and URL-encoded forms are replaced; running it again
 * changes nothing. Used by scripts/deploy_cdmotest.mjs on the server.
 */
import fs from 'fs';

const [mapFile, ...files] = process.argv.slice(2);
const map = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));
const forms = (p) => {
  const byPart = p.split('/').map(encodeURIComponent).join('/');
  return [p, encodeURI(p), p.replace(/ /g, '%20'), byPart];
};
const pairs = Object.entries(map)
  .flatMap(([from, to]) => forms(from).map((f, i) => [f, forms(to)[i]]))
  .filter(([from, to]) => from !== to)
  .sort((a, b) => b[0].length - a[0].length);

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf-8');
  let next = text;
  let n = 0;
  for (const [from, to] of pairs) {
    const parts = next.split(from);
    if (parts.length > 1) {
      n += parts.length - 1;
      next = parts.join(to);
    }
  }
  if (next !== text) {
    JSON.parse(next); // never write a broken data file
    fs.writeFileSync(file, next);
  }
  console.log(`${file}: ${n} image paths updated`);
}
