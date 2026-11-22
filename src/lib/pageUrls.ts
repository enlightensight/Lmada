/**
 * Public web addresses of CMS pages.
 *
 * Page records keep short internal keys (category "services", slug "cell-line") because the
 * layouts and the stored content are keyed on them. Visitors, the navigation and search engines
 * use the longer public addresses below. This file is the one place that maps between the two,
 * so the admin panel always shows and opens the same address the live site uses.
 *
 * Old addresses keep working: `getStoredPage` resolves them and `next.config.ts` redirects them.
 * When a public address changes, update it here and add a redirect for the old one.
 */

type PageKey = { category: string; slug: string };

/** Category hub pages (records where slug === category). */
const HUB_PATHS: Record<string, string> = {
  services: '/development-services',
  manufacturing: '/manufacturing-services',
  characterization: '/analytical-characterization-testing',
  'facility&location': '/facility&location',
};

/** Public slug of each built-in page, keyed by its stored "category/slug". */
const PUBLIC_SLUGS: Record<string, string> = {
  'overview/about': 'about-lambda-cdmo',
  'overview/leadership': 'leadership-team',
  'overview/integrated': 'integrated-development-to-manufacturing',
  'overview/quality': 'quality-and-compliance',
  'services/cell-line': 'cell-line-development',
  'services/process': 'process-development',
  'services/analytical': 'analytical-development',
  'manufacturing/drug-substance': 'drug-substance-manufacturing',
  'manufacturing/drug-product': 'drug-product-manufacturing',
  'characterization/physicochemical': 'physicochemical-characterization',
  'characterization/bioassays': 'bioassays-immunogenicity-testing',
  'characterization/microbiological': 'microbiological-testing',
  'modalities/mabs': 'monoclonal-antibodies',
  'modalities/bispecifics': 'bispecific-antibodies',
  'modalities/adcs': 'antibody-drug-conjugates',
};

const keyOf = (page: PageKey) => `${(page.category || '').toLowerCase()}/${(page.slug || '').toLowerCase()}`;

export const isHomePage = (page: PageKey) => page.category === 'home' && (!page.slug || page.slug === 'home');
export const isHubPage = (page: PageKey) => !isHomePage(page) && page.slug === page.category;

/** The address visitors use for this page, e.g. "/services/cell-line-development". */
export function getPublicPath(page: PageKey): string {
  if (isHomePage(page)) return '/';
  if (isHubPage(page)) return HUB_PATHS[page.category.toLowerCase()] || `/${page.category}`;
  const publicSlug = PUBLIC_SLUGS[keyOf(page)] || page.slug;
  return `/${page.category}/${publicSlug}`;
}

/** The last part of the public address ("cell-line-development"); empty for home and hub pages. */
export function getPublicSlug(page: PageKey): string {
  if (isHomePage(page) || isHubPage(page)) return '';
  return PUBLIC_SLUGS[keyOf(page)] || page.slug;
}

export function getPreviewPath(page: PageKey): string {
  const path = getPublicPath(page);
  return `${path}${path.includes('?') ? '&' : '?'}preview=true`;
}

/**
 * If "/category/slug" is already the public address of a built-in page stored under a different
 * key, returns that page's key. Used to stop a new page from taking an address that is in use.
 */
export function findPageOwningAddress(category: string, slug: string): PageKey | null {
  const cat = (category || '').toLowerCase();
  const wanted = (slug || '').toLowerCase();
  for (const [key, publicSlug] of Object.entries(PUBLIC_SLUGS)) {
    const [ownerCategory, ownerSlug] = key.split('/');
    if (ownerCategory === cat && publicSlug === wanted && ownerSlug !== wanted) {
      return { category: ownerCategory, slug: ownerSlug };
    }
  }
  return null;
}
