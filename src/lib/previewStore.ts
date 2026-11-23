import type { CDMOPage } from '@/data/cdmoData';

/**
 * Short-lived, in-memory copies of pages being edited in the admin panel, so the editor's
 * live preview can show unsaved changes without writing a draft on every keystroke.
 * Entries expire after 30 minutes; at most 200 are kept. Nothing here reaches visitors:
 * a preview is only shown for a URL carrying its random `previewId`.
 */
interface PreviewEntry {
  page: CDMOPage;
  expires: number;
}

const TTL_MS = 30 * 60 * 1000;
const MAX_ENTRIES = 200;

const store: Map<string, PreviewEntry> =
  ((globalThis as unknown as { __cmsPreviewStore?: Map<string, PreviewEntry> }).__cmsPreviewStore ??= new Map());

function prune(now = Date.now()) {
  for (const [id, entry] of store) if (entry.expires < now) store.delete(id);
  while (store.size > MAX_ENTRIES) store.delete(store.keys().next().value as string);
}

export function savePreviewPage(page: CDMOPage, id?: string): string {
  prune();
  const key = id && /^[a-z0-9]{8,40}$/i.test(id) ? id : crypto.randomUUID().replace(/-/g, '');
  store.delete(key);
  store.set(key, { page: JSON.parse(JSON.stringify(page)), expires: Date.now() + TTL_MS });
  return key;
}

export function getPreviewPage(id?: string | null): CDMOPage | null {
  if (!id) return null;
  const entry = store.get(id);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    store.delete(id);
    return null;
  }
  return entry.page;
}
