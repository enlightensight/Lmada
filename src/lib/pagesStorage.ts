import fs from 'fs';
import path from 'path';
import { cdmoData } from '@/data/cdmoData';
import type { CDMOPage } from '@/data/cdmoData';
import { findPageOwningAddress } from '@/lib/pageUrls';
import { getPreviewPage } from '@/lib/previewStore';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const STORAGE_FILE = path.join(DATA_DIR, 'storedPages.json');

/**
 * Initializes the storage file with default cdmoData if it doesn't already exist.
 * Also ensures newly introduced default pages (such as 'home') exist in storage.
 */
function ensureStorageFileExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORAGE_FILE)) {
      // Initialize with cdmoData, marking defaults as published
      const initialPages = cdmoData.map((p) => ({
        ...p,
        isPublished: true,
        hasUnpublishedChanges: false,
        status: 'published' as const,
        lastPublishedAt: new Date().toISOString(),
        lastSavedAt: new Date().toISOString(),
      }));
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(initialPages, null, 2), 'utf-8');
      return;
    }

    // If file exists, check if any default pages are missing and add them
    const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
    const parsed: CDMOPage[] = JSON.parse(content);
    if (Array.isArray(parsed)) {
      let changed = false;
      for (const defPage of cdmoData) {
        const foundIdx = parsed.findIndex(
          (p) =>
            p.category.toLowerCase() === defPage.category.toLowerCase() &&
            p.slug.toLowerCase() === defPage.slug.toLowerCase()
        );
        if (foundIdx === -1) {
          parsed.push({
            ...defPage,
            isPublished: true,
            hasUnpublishedChanges: false,
            status: 'published',
            lastPublishedAt: new Date().toISOString(),
            lastSavedAt: new Date().toISOString(),
          });
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
      }
    }
  } catch (error) {
    console.error('Error initializing storedPages.json:', error);
  }
}

/**
 * Reads raw page records directly from storedPages.json.
 */
function getRawStoredRecords(): CDMOPage[] {
  ensureStorageFileExists();
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading storedPages.json:', error);
  }
  return cdmoData.map((p) => ({
    ...p,
    isPublished: true,
    hasUnpublishedChanges: false,
    status: 'published',
  }));
}

/**
 * Reads all stored pages.
 * - If includeDrafts = false (default): Returns only published versions (for public site visitors).
 * - If includeDrafts = true: Returns draft-merged pages with admin metadata.
 */
export function getAllStoredPages(options: { includeDrafts?: boolean } = {}): CDMOPage[] {
  const records = getRawStoredRecords();

  if (options.includeDrafts) {
    return records.map((rec) => {
      if (rec.draftContent && Object.keys(rec.draftContent).length > 0) {
        return {
          ...rec,
          ...rec.draftContent,
          isPublished: rec.isPublished !== false,
          hasUnpublishedChanges: true,
          status: rec.isPublished === false ? 'draft' : 'modified',
          lastSavedAt: rec.lastSavedAt,
          lastPublishedAt: rec.lastPublishedAt,
          draftContent: rec.draftContent,
        } as CDMOPage;
      }
      return {
        ...rec,
        isPublished: rec.isPublished !== false,
        hasUnpublishedChanges: Boolean(rec.hasUnpublishedChanges),
        status: rec.isPublished === false ? 'draft' : (rec.hasUnpublishedChanges ? 'modified' : 'published'),
      };
    });
  }

  // Normal public website view: ONLY return published pages with published content (strip draft modifications)
  return records
    .filter((rec) => rec.isPublished !== false)
    .map((rec) => {
      // Create clean published page object without draftContent
      const published = { ...rec };
      delete published.draftContent;
      return published;
    });
}

/**
 * Finds a specific page by category and slug (case-insensitive & URL-decoded).
 * - For normal visitors: returns ONLY the published version. Returns null if unpublished.
 * - If options.previewDraft === true: merges working draft for live admin preview.
 */
export function getStoredPage(
  category: string,
  slug: string,
  options: { previewDraft?: boolean; previewId?: string } = {}
): CDMOPage | null {
  let normCat = decodeURIComponent(category || '').toLowerCase();
  let normSlug = decodeURIComponent(slug || '').toLowerCase();

  // Category normalization aliases
  if (normCat === 'development-services') {
    normCat = 'services';
  } else if (normCat === 'manufacturing-services') {
    normCat = 'manufacturing';
  } else if (
    normCat === 'analytical-characterization-testing' ||
    normCat === 'analytical-characterization-and-testing' ||
    normCat === 'analytical-characterization'
  ) {
    normCat = 'characterization';
  }

  // Slug normalization aliases
  // Overview:
  if (normCat === 'overview') {
    if (normSlug === 'about-lambda-cdmo' || normSlug === 'about-lambda' || normSlug === 'about') {
      normSlug = 'about';
    } else if (normSlug === 'leadership-team' || normSlug === 'leadership') {
      normSlug = 'leadership';
    } else if (
      normSlug === 'integrated-development-to-manufacturing' ||
      normSlug === 'integrated-development' ||
      normSlug === 'integrated-manufacturing' ||
      normSlug === 'integrated development to manufacturing' ||
      normSlug === 'integrated'
    ) {
      normSlug = 'integrated';
    } else if (normSlug === 'quality-and-compliance' || normSlug === 'quality-compliance' || normSlug === 'quality') {
      normSlug = 'quality';
    }
  }

  // Services:
  if (normCat === 'services') {
    if (normSlug === 'cell-line-development' || normSlug === 'cell-line' || normSlug === 'cell line development') {
      normSlug = 'cell-line';
    } else if (normSlug === 'process-development' || normSlug === 'process development' || normSlug === 'process') {
      normSlug = 'process';
    } else if (normSlug === 'analytical-development' || normSlug === 'analytical development' || normSlug === 'analytical') {
      normSlug = 'analytical';
    }
  }

  // Manufacturing:
  if (normCat === 'manufacturing') {
    if (normSlug === 'drug-substance-manufacturing' || normSlug === 'drug-substance' || normSlug === 'drug substance manufacturing') {
      normSlug = 'drug-substance';
    } else if (normSlug === 'drug-product-manufacturing' || normSlug === 'drug-product' || normSlug === 'drug product manufacturing') {
      normSlug = 'drug-product';
    }
  }

  // Characterization:
  if (normCat === 'characterization') {
    if (normSlug === 'analytical-testing' || normSlug === 'analytical testing') {
      normSlug = 'analytical-testing';
    } else if (normSlug === 'physicochemical-characterization' || normSlug === 'physicochemical' || normSlug === 'physicochemical characterization') {
      normSlug = 'physicochemical';
    } else if (
      normSlug === 'bioassays-immunogenicity-testing' ||
      normSlug === 'bioassays-and-immunogenicity-testing' ||
      normSlug === 'bioassays' ||
      normSlug === 'bioassays & immunogenicity testing'
    ) {
      normSlug = 'bioassays';
    } else if (normSlug === 'microbiological-testing' || normSlug === 'microbiological' || normSlug === 'microbiological testing') {
      normSlug = 'microbiological';
    }
  }

  // Modalities:
  if (normCat === 'modalities') {
    if (normSlug === 'monoclonal-antibodies' || normSlug === 'mabs' || normSlug === 'monoclonal antibodies') {
      normSlug = 'mabs';
    } else if (normSlug === 'bispecific-antibodies' || normSlug === 'bispecifics' || normSlug === 'bispecific antibodies') {
      normSlug = 'bispecifics';
    } else if (
      normSlug === 'antibody-drug-conjugates' ||
      normSlug === 'antibody-drug-conjugates-adcs' ||
      normSlug === 'adcs' ||
      normSlug === 'antibody drug conjugates'
    ) {
      normSlug = 'adcs';
    } else if (normSlug === 'proteins-peptides' || normSlug === 'proteins-and-peptides' || normSlug === 'proteins & peptides') {
      normSlug = 'proteins-peptides';
    }
  }

  // Insights:
  if (normCat === 'insights') {
    if (normSlug === 'blogs-articles' || normSlug === 'blogs-and-articles' || normSlug === 'blogs') {
      normSlug = 'blogs';
    } else if (normSlug === 'news-press' || normSlug === 'news-and-press' || normSlug === 'news') {
      normSlug = 'news';
    } else if (normSlug === 'events-webinars' || normSlug === 'events-and-webinars' || normSlug === 'events') {
      normSlug = 'events';
    }
  }

  // Editor live preview: the unsaved copy of this page, if the URL carries its previewId
  if (options.previewDraft && options.previewId) {
    const live = getPreviewPage(options.previewId);
    if (live && live.category.toLowerCase() === normCat && live.slug.toLowerCase() === normSlug) {
      return { ...live, isPublished: live.isPublished !== false, hasUnpublishedChanges: true };
    }
  }

  const records = getRawStoredRecords();

  const found = records.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (found) {
    // If previewing draft
    if (options.previewDraft) {
      if (found.draftContent && Object.keys(found.draftContent).length > 0) {
        return {
          ...found,
          ...found.draftContent,
          isPublished: found.isPublished !== false,
          hasUnpublishedChanges: true,
        };
      }
      return found;
    }

    // Normal visitor request
    // If page is draft-only and not yet published, do not expose to public
    if (found.isPublished === false) {
      return null;
    }

    // Return the pure published version (without unpublished draft edits)
    const cleanPublished = { ...found };
    delete cleanPublished.draftContent;
    return cleanPublished;
  }

  // Fallback check against static cdmoData (default pages are published by default)
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  return defaultPage ? { ...defaultPage, isPublished: true, status: 'published' } : null;
}

/**
 * Retrieves the draft page specifically for the Admin Editor.
 * Merges any existing draftContent over the base page so admin can continue working on unsaved drafts.
 */
export function getDraftPageForAdmin(category: string, slug: string): CDMOPage | null {
  const normCat = decodeURIComponent(category || '').toLowerCase();
  const normSlug = decodeURIComponent(slug || '').toLowerCase();
  const records = getRawStoredRecords();

  const found = records.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (found) {
    if (found.draftContent && Object.keys(found.draftContent).length > 0) {
      return {
        ...found,
        ...found.draftContent,
        isPublished: found.isPublished !== false,
        hasUnpublishedChanges: true,
        status: found.isPublished === false ? 'draft' : 'modified',
        lastSavedAt: found.lastSavedAt,
        lastPublishedAt: found.lastPublishedAt,
        draftContent: found.draftContent,
      };
    }
    return {
      ...found,
      isPublished: found.isPublished !== false,
      hasUnpublishedChanges: Boolean(found.hasUnpublishedChanges),
      status: found.isPublished === false ? 'draft' : 'published',
    };
  }

  // Fallback check against static cdmoData
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  return defaultPage ? { ...defaultPage, isPublished: true, status: 'published' } : null;
}

/**
 * Saves a page as a DRAFT.
 * This updates only the draftContent and marks hasUnpublishedChanges = true.
 * THE LIVE WEBSITE IS UNTOUCHED AND WILL NOT SHOW THESE CHANGES UNTIL PUBLISHED.
 */
export function saveDraftPage(updatedDraft: CDMOPage): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = updatedDraft.category.toLowerCase();
  const targetSlug = updatedDraft.slug.toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  const nowIso = new Date().toISOString();

  // Create a clean draft payload (omit nested draftContent)
  const draftPayload = { ...updatedDraft };
  delete draftPayload.draftContent;

  if (existingIdx >= 0) {
    const existing = allRecords[existingIdx];
    allRecords[existingIdx] = {
      ...existing,
      hasUnpublishedChanges: true,
      lastSavedAt: nowIso,
      status: existing.isPublished === false ? 'draft' : 'modified',
      draftContent: draftPayload,
    };
  } else {
    // Brand new custom page created in draft mode
    allRecords.push({
      ...draftPayload,
      isPublished: false,
      hasUnpublishedChanges: true,
      status: 'draft',
      createdAt: nowIso,
      lastSavedAt: nowIso,
      draftContent: draftPayload,
    });
  }

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write draft to storedPages.json:', error);
    throw new Error('Failed to persist draft changes.');
  }

  return getDraftPageForAdmin(updatedDraft.category, updatedDraft.slug) || updatedDraft;
}

/**
 * Publishes a page to the LIVE website.
 * Copies the current draft (or passed pageData) into the published top-level fields,
 * clears draftContent, marks hasUnpublishedChanges = false, and sets isPublished = true.
 */
export function publishStoredPage(category: string, slug: string, pageDataToPublish?: CDMOPage): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  const nowIso = new Date().toISOString();

  let targetContent: CDMOPage;

  if (existingIdx >= 0) {
    const existing = allRecords[existingIdx];
    const source = pageDataToPublish || existing.draftContent || existing;
    const cleanSource = { ...source };
    delete cleanSource.draftContent;

    targetContent = {
      ...existing,
      ...cleanSource,
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      lastPublishedAt: nowIso,
      lastSavedAt: nowIso,
      updatedAt: nowIso,
    };
    delete targetContent.draftContent;

    allRecords[existingIdx] = targetContent;
  } else {
    const source = pageDataToPublish || {
      slug: targetSlug,
      category: targetCat,
      title: 'New Page',
      metaTitle: 'New Page',
      metaDesc: '',
      heading: 'New Page Heading',
      description: '',
      sections: [],
    };
    const cleanSource = { ...source };
    delete cleanSource.draftContent;

    targetContent = {
      ...cleanSource,
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      createdAt: nowIso,
      lastPublishedAt: nowIso,
      lastSavedAt: nowIso,
      updatedAt: nowIso,
    };
    allRecords.push(targetContent);
  }

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to publish to storedPages.json:', error);
    throw new Error('Failed to publish page changes.');
  }

  return targetContent;
}

/**
 * Reverts any unpublished draft changes back to the currently published live version.
 */
export function revertDraftPage(category: string, slug: string): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  if (existingIdx === -1) {
    throw new Error('Page not found to revert.');
  }

  const existing = allRecords[existingIdx];
  const reverted: CDMOPage = {
    ...existing,
    hasUnpublishedChanges: false,
    status: existing.isPublished === false ? 'draft' : 'published',
  };
  delete reverted.draftContent;

  allRecords[existingIdx] = reverted;

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to revert draft in storedPages.json:', error);
    throw new Error('Failed to revert draft.');
  }

  return reverted;
}

/**
 * Unpublishes a page (takes it offline from public visitors, keeping it as draft).
 */
export function unpublishStoredPage(category: string, slug: string): CDMOPage {
  ensureStorageFileExists();
  const allRecords = getRawStoredRecords();

  const targetCat = decodeURIComponent(category).toLowerCase();
  const targetSlug = decodeURIComponent(slug).toLowerCase();

  const existingIdx = allRecords.findIndex(
    (p) =>
      p.category.toLowerCase() === targetCat &&
      p.slug.toLowerCase() === targetSlug
  );

  if (existingIdx === -1) {
    throw new Error('Page not found to unpublish.');
  }

  const existing = allRecords[existingIdx];
  allRecords[existingIdx] = {
    ...existing,
    isPublished: false,
    status: 'draft',
    hasUnpublishedChanges: true,
  };

  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to unpublish page in storedPages.json:', error);
    throw new Error('Failed to unpublish page.');
  }

  return allRecords[existingIdx];
}

/**
 * General save helper. If publish = true, publishes live. Else saves as draft.
 */
export function saveStoredPage(updatedPage: CDMOPage, options: { publish?: boolean } = {}): CDMOPage {
  if (options.publish) {
    return publishStoredPage(updatedPage.category, updatedPage.slug, updatedPage);
  }
  return saveDraftPage(updatedPage);
}

/**
 * Deletes a custom page or resets an edited page back to default cdmoData.
 */
export function deleteStoredPage(category: string, slug: string): { success: boolean; isReset: boolean } {
  ensureStorageFileExists();
  const normCat = decodeURIComponent(category).toLowerCase();
  const normSlug = decodeURIComponent(slug).toLowerCase();

  const allPages = getRawStoredRecords();
  const defaultPage = cdmoData.find(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  const existingIdx = allPages.findIndex(
    (p) =>
      p.category.toLowerCase() === normCat &&
      p.slug.toLowerCase() === normSlug
  );

  if (existingIdx === -1) {
    return { success: false, isReset: false };
  }

  if (defaultPage) {
    // Reset to default cdmoData entry (cleanly published)
    allPages[existingIdx] = {
      ...JSON.parse(JSON.stringify(defaultPage)),
      isPublished: true,
      hasUnpublishedChanges: false,
      status: 'published',
      lastPublishedAt: new Date().toISOString(),
      lastSavedAt: new Date().toISOString(),
    };
    delete (allPages[existingIdx] as any).draftContent;
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(allPages, null, 2), 'utf-8');
    return { success: true, isReset: true };
  } else {
    // Remove custom page completely
    const filtered = allPages.filter(
      (p) =>
        !(p.category.toLowerCase() === normCat && p.slug.toLowerCase() === normSlug)
    );
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return { success: true, isReset: false };
  }
}

/** True for the pages that ship with the site (they have factory defaults in cdmoData). */
export function isBuiltInPage(category: string, slug: string): boolean {
  const cat = decodeURIComponent(category || '').toLowerCase();
  const sl = decodeURIComponent(slug || '').toLowerCase();
  return cdmoData.some((p) => p.category.toLowerCase() === cat && p.slug.toLowerCase() === sl);
}

/** "category/slug" keys of every built-in page, for the admin panel. */
export function getBuiltInPageKeys(): string[] {
  return cdmoData.map((p) => `${p.category}/${p.slug}`);
}

/**
 * Moves a custom page to a new address, keeping its content, draft and publish state.
 * Built-in pages cannot be moved: their layouts and public addresses are defined in code
 * (see src/lib/pageUrls.ts).
 */
export function renameStoredPage(
  fromCategory: string,
  fromSlug: string,
  toCategory: string,
  toSlug: string
): CDMOPage {
  ensureStorageFileExists();
  const norm = (v: string) => decodeURIComponent(v || '').trim().toLowerCase();
  const from = { category: norm(fromCategory), slug: norm(fromSlug) };
  const to = { category: norm(toCategory), slug: norm(toSlug) };

  if (!to.category || !to.slug) throw new Error('The new address needs both a category and a URL slug.');
  if (isBuiltInPage(from.category, from.slug)) {
    throw new Error('The address of a built-in page cannot be changed from the admin panel.');
  }

  const allRecords = getRawStoredRecords();
  const idx = allRecords.findIndex(
    (p) => p.category.toLowerCase() === from.category && p.slug.toLowerCase() === from.slug
  );
  if (idx === -1) throw new Error('Page not found to move.');

  const taken =
    allRecords.some((p, i) => i !== idx && p.category.toLowerCase() === to.category && p.slug.toLowerCase() === to.slug) ||
    isBuiltInPage(to.category, to.slug) ||
    Boolean(findPageOwningAddress(to.category, to.slug)) ||
    to.category === to.slug;
  if (taken) throw new Error(`The address "/${to.category}/${to.slug}" is already used by another page.`);

  const moved: CDMOPage = { ...allRecords[idx], category: to.category, slug: to.slug };
  if (moved.draftContent) moved.draftContent = { ...moved.draftContent, category: to.category, slug: to.slug };
  allRecords[idx] = moved;
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(allRecords, null, 2), 'utf-8');
  return moved;
}
