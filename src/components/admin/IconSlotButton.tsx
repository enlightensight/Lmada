'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, X } from 'lucide-react';
import type { CDMOPage } from '@/data/cdmoData';
import { getSlotIcon, slotHasIconSpot, type IconSlot } from '@/lib/autoIcons';
import { itemIconKey } from '@/components/icons/SiteIcon';
import { IconChooser } from './IconPickerPanel';

interface IconSlotButtonProps {
  page: CDMOPage;
  slot: IconSlot;
  /** Store (or clear, with null) the editor's icon choice for this item. */
  onChange: (text: string, ref: string | null) => void;
  onUploadFile: (file: File, done: (url: string) => void) => void;
  uploading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Shape of the icon holder, to match how the page draws it. */
  shape?: 'circle' | 'rounded';
  className?: string;
}

const SIZES = {
  sm: { box: 'w-8 h-8', icon: 'w-4 h-4' },
  md: { box: 'w-10 h-10', icon: 'w-5 h-5' },
  lg: { box: 'w-14 h-14', icon: 'w-7 h-7' },
};

/**
 * The icon of one point, card, step or heading, drawn exactly as the live page draws it.
 * Click it to pick another icon, upload an SVG, or go back to the automatic icon.
 * Renders nothing when the page's design shows no icon for this item.
 */
export default function IconSlotButton({
  page,
  slot,
  onChange,
  onUploadFile,
  uploading,
  size = 'md',
  shape = 'circle',
  className = '',
}: IconSlotButtonProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const text = itemIconKey(slot.text);
  const chosen = page.itemIcons?.[text];

  // Close on outside click or scroll (the panel is positioned for where the button was)
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      const target = e.target as Node | null;
      if (e.type === 'mousedown' && (panelRef.current?.contains(target as Node) || buttonRef.current?.contains(target as Node))) return;
      if (e.type === 'scroll' && panelRef.current?.contains(target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', close);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  if (!text || !slotHasIconSpot(page, slot)) return null;
  const Icon = getSlotIcon(page, slot);
  const s = SIZES[size];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-[10px]';

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const width = Math.min(560, window.innerWidth - 24);
      const left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12);
      const below = rect.bottom + 8;
      const top = below + 360 > window.innerHeight ? Math.max(12, rect.top - 368) : below;
      setPos({ top, left });
    }
    setOpen(true);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        title={chosen ? 'Icon chosen in the editor. Click to change' : 'Click to change this icon'}
        aria-label={`Change the icon of "${text}"`}
        className={`group/icon relative ${s.box} ${radius} shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
          Icon
            ? 'bg-brand-blue/10 border border-brand-blue/20 text-brand-blue hover:border-brand-orange hover:bg-brand-orange/10'
            : 'border border-dashed border-slate-300 text-slate-400 hover:border-brand-orange hover:text-brand-orange'
        } ${open ? 'ring-2 ring-brand-orange/50' : ''} ${className}`}
      >
        {React.createElement(Icon || Plus, { className: s.icon })}
        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 hidden group-hover/icon:flex items-center px-1 rounded bg-brand-orange text-white text-[8px] font-bold leading-[14px]">
          Edit
        </span>
      </button>

      {open && pos &&
        createPortal(
          <div
            ref={panelRef}
            style={{ top: pos.top, left: pos.left, width: Math.min(560, window.innerWidth - 24) }}
            className="fixed z-[70] p-3 rounded-xl bg-white border border-slate-200 shadow-2xl max-h-[360px] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-xs text-slate-600 truncate">
                Icon for <span className="font-semibold text-neutral-900">{text}</span>
              </p>
              <button type="button" onClick={() => setOpen(false)} className="p-1 rounded text-slate-500 hover:bg-slate-100 cursor-pointer" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            {!Icon && (
              <p className="mb-2 text-[11px] text-slate-500">
                This list shows icons only when every point has one; until then the page shows a plain marker.
              </p>
            )}
            <IconChooser
              value={chosen}
              onChange={(ref) => onChange(text, ref)}
              onUploadFile={onUploadFile}
              uploading={uploading}
            />
          </div>,
          document.body
        )}
    </>
  );
}
