'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Loader2, Monitor, RefreshCw, Smartphone, X } from 'lucide-react';
import type { CDMOPage } from '@/data/cdmoData';

interface LivePreviewPaneProps {
  /** The page as it is in the editor right now, unsaved changes included. */
  page: CDMOPage;
  /** Where the page is stored (its category/slug may be mid-edit in Page Settings). */
  storedKey: { category: string; slug: string };
  /** The page's public address, e.g. "/services/cell-line-development". */
  path: string;
  /** Distance from the top of the window to the bottom of the editor's sticky header. */
  topOffset: number;
  onClose: () => void;
}

/**
 * The real website page, rendered by the site's own layouts from the editor's unsaved copy.
 * Nothing is saved or published: the copy is held in memory on the server for 30 minutes and
 * shown only at a URL carrying its random id. Updates follow edits after a short pause.
 */
export default function LivePreviewPane({ page, storedKey, path, topOffset, onClose }: LivePreviewPaneProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef(0);
  const idRef = useRef<string | null>(null);

  // Send the current draft (debounced) and reload the frame when it is stored
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setBusy(true);
      try {
        const res = await fetch('/api/admin/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: idRef.current, page: { ...page, category: storedKey.category, slug: storedKey.slug } }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!data.success) throw new Error(data.error || 'Preview failed');
        try {
          scrollRef.current = iframeRef.current?.contentWindow?.scrollY || scrollRef.current;
        } catch {
          /* cross-origin guard: keep the last known position */
        }
        idRef.current = data.id;
        setPreviewId(data.id);
        setVersion((v) => v + 1);
        setError(null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Preview failed');
          setBusy(false);
        }
      }
    }, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [page, storedKey.category, storedKey.slug]);

  const src = previewId
    ? `${path}${path.includes('?') ? '&' : '?'}preview=true&previewId=${previewId}&v=${version}`
    : 'about:blank';

  const restoreScroll = () => {
    setBusy(false);
    const target = scrollRef.current;
    if (!target) return;
    // The page lays out over a few frames (images, animations); retry briefly
    let tries = 0;
    const tick = () => {
      try {
        iframeRef.current?.contentWindow?.scrollTo(0, target);
      } catch {
        return;
      }
      if (++tries < 8) setTimeout(tick, 120);
    };
    tick();
  };

  return (
    <aside
      style={{ top: topOffset }}
      className="fixed right-0 bottom-0 z-30 w-full lg:w-[46vw] bg-slate-200 border-l border-slate-300 flex flex-col shadow-2xl"
      aria-label="Live page preview"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : busy ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-xs font-bold text-neutral-900">Live preview</span>
          <span className="text-[11px] text-slate-500 truncate">
            {error ? error : busy ? 'Updating…' : 'Exactly as the website will show it (not saved)'}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Desktop width"
            className={`p-1.5 rounded-lg cursor-pointer ${device === 'desktop' ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Phone width"
            className={`p-1.5 rounded-lg cursor-pointer ${device === 'mobile' ? 'bg-brand-blue/10 text-brand-blue' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setVersion((v) => v + 1)}
            title="Reload preview"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          </button>
          {previewId && (
            <a href={src} target="_blank" rel="noreferrer" title="Open preview in a new tab" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button type="button" onClick={onClose} title="Close preview" className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex justify-center">
        {device === 'desktop' ? (
          // Render at a real desktop width and scale down, so the page uses its desktop layout
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              ref={iframeRef}
              src={src}
              onLoad={restoreScroll}
              title="Live page preview"
              className="absolute top-0 left-0 bg-white border-0 origin-top-left"
              style={{ width: 1440, height: `calc((100% / var(--preview-scale)))`, transform: 'scale(var(--preview-scale))' }}
            />
            <ScaleToFit width={1440} />
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={src}
            onLoad={restoreScroll}
            title="Live page preview (phone)"
            className="bg-white border-0 my-3 rounded-xl shadow-lg"
            style={{ width: 390, height: 'calc(100% - 24px)' }}
          />
        )}
      </div>
    </aside>
  );
}

/** Sets --preview-scale on the parent so a fixed-width frame fits the pane's width. */
function ScaleToFit({ width }: { width: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const update = () => host.style.setProperty('--preview-scale', String(Math.min(1, host.clientWidth / width)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, [width]);
  return <span ref={ref} hidden />;
}
