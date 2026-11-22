'use client';

import React, { useRef } from 'react';
import { ChevronDown, ChevronUp, FolderOpen, Plus, Trash2, Upload } from 'lucide-react';

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };

export interface GenericFieldsEditorProps {
  /** The object to edit (a section, a card, a whole page...). */
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  /** Keys that are edited elsewhere or are not content (ids, flags). */
  skipKeys?: string[];
  onUploadFile?: (file: File, onDone: (url: string) => void) => void;
  onPickPreset?: (onDone: (url: string) => void) => void;
  uploading?: boolean;
}

const ALWAYS_SKIP = ['id', 'draftContent', 'draftData'];
const MEDIA_KEY = /^(image|images|video|heroVideo|photo|avatar|poster|logo)$|(Image|Video|Photo)$/;
const LONG_KEY = /^(text|description|desc|answer|bio|abstract|summary|body|footerText|footerNote|qtppText|secondaryText)$/i;

const humanize = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());

const isMediaUrl = (v: string) => /\.(png|jpe?g|webp|gif|avif|svg|mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(v);
const isVideoUrl = (v: string) => /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(v);

/** An empty copy of an example value, used by "Add item". */
function blankLike(example: Json): Json {
  if (Array.isArray(example)) return [];
  if (example && typeof example === 'object') {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(example)) {
      if (k === 'id') continue;
      out[k] = blankLike(v);
    }
    return out;
  }
  if (typeof example === 'boolean') return false;
  if (typeof example === 'number') return 0;
  return '';
}

const inputClass =
  'w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

function StringField({
  fieldKey,
  value,
  onChange,
  onUploadFile,
  onPickPreset,
  uploading,
}: {
  fieldKey: string;
  value: string;
  onChange: (v: string) => void;
} & Pick<GenericFieldsEditorProps, 'onUploadFile' | 'onPickPreset' | 'uploading'>) {
  const fileRef = useRef<HTMLInputElement>(null);
  const media = MEDIA_KEY.test(fieldKey) || isMediaUrl(value);

  if (media) {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/photo.png or /uploads/clip.mp4"
            className={`${inputClass} flex-1 min-w-[220px] font-mono text-xs`}
          />
          {onPickPreset && (
            <button
              type="button"
              onClick={() => onPickPreset(onChange)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Choose</span>
            </button>
          )}
          {onUploadFile && (
            <>
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-orange text-white text-xs font-semibold hover:bg-brand-orange-hover disabled:opacity-60 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading…' : 'Upload'}</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadFile(file, onChange);
                  e.target.value = '';
                }}
              />
            </>
          )}
        </div>
        {value &&
          (isVideoUrl(value) ? (
            <video src={value} muted playsInline className="h-20 rounded-lg border border-slate-200 bg-slate-900" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-20 rounded-lg border border-slate-200 bg-slate-50 object-contain" />
          ))}
      </div>
    );
  }

  if (LONG_KEY.test(fieldKey) || value.length > 90 || value.includes('\n')) {
    return (
      <textarea
        rows={Math.min(8, Math.max(2, Math.ceil(value.length / 100)))}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} leading-relaxed`}
      />
    );
  }

  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

function Field({
  fieldKey,
  value,
  onChange,
  depth,
  ...media
}: {
  fieldKey: string;
  value: Json;
  onChange: (v: Json) => void;
  depth: number;
} & Pick<GenericFieldsEditorProps, 'onUploadFile' | 'onPickPreset' | 'uploading'>) {
  if (typeof value === 'boolean') {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-slate-800 cursor-pointer">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="rounded text-brand-blue" />
        <span>{value ? 'Yes' : 'No'}</span>
      </label>
    );
  }

  if (typeof value === 'number') {
    return <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={inputClass} />;
  }

  if (Array.isArray(value)) {
    const itemsAreObjects = value.some((v) => v && typeof v === 'object' && !Array.isArray(v));
    const move = (from: number, to: number) => {
      if (to < 0 || to >= value.length) return;
      const next = [...value];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      onChange(next);
    };
    const itemLabel = humanize(fieldKey).replace(/s$/, '');

    return (
      <div className="space-y-2.5">
        {value.map((item, i) => (
          <div key={i} className={itemsAreObjects ? 'rounded-xl border border-slate-200 bg-white p-3.5 space-y-3' : 'flex items-start gap-2'}>
            {itemsAreObjects && (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {itemLabel} {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer" aria-label="Move up">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 cursor-pointer" aria-label="Move down">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer" aria-label={`Remove ${itemLabel} ${i + 1}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              {item && typeof item === 'object' && !Array.isArray(item) ? (
                <ObjectFields
                  value={item as Record<string, Json>}
                  onChange={(v) => onChange(value.map((old, j) => (j === i ? v : old)))}
                  depth={depth + 1}
                  {...media}
                />
              ) : (
                <Field
                  fieldKey={fieldKey}
                  value={item}
                  onChange={(v) => onChange(value.map((old, j) => (j === i ? v : old)))}
                  depth={depth + 1}
                  {...media}
                />
              )}
            </div>
            {!itemsAreObjects && (
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="mt-1.5 p-1 rounded text-red-600 hover:bg-red-50 cursor-pointer shrink-0" aria-label={`Remove ${itemLabel} ${i + 1}`}>
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, value.length ? blankLike(value[value.length - 1]) : ''])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-400 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add {itemLabel.toLowerCase()}</span>
        </button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3.5">
        <ObjectFields value={value as Record<string, Json>} onChange={onChange} depth={depth + 1} {...media} />
      </div>
    );
  }

  return <StringField fieldKey={fieldKey} value={typeof value === 'string' ? value : ''} onChange={onChange} {...media} />;
}

function ObjectFields({
  value,
  onChange,
  depth,
  skipKeys = [],
  ...media
}: {
  value: Record<string, Json>;
  onChange: (v: Record<string, Json>) => void;
  depth: number;
  skipKeys?: string[];
} & Pick<GenericFieldsEditorProps, 'onUploadFile' | 'onPickPreset' | 'uploading'>) {
  const keys = Object.keys(value).filter((k) => !ALWAYS_SKIP.includes(k) && !skipKeys.includes(k));
  if (keys.length === 0) return <p className="text-xs text-slate-500">No editable fields.</p>;

  return (
    <div className={depth === 0 ? 'grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4' : 'space-y-3'}>
      {keys.map((k) => {
        const v = value[k];
        const wide = Array.isArray(v) || (v && typeof v === 'object') || (typeof v === 'string' && (v.length > 60 || LONG_KEY.test(k) || MEDIA_KEY.test(k)));
        return (
          <div key={k} className={`space-y-1.5 ${depth === 0 && wide ? 'md:col-span-2' : ''}`}>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">{humanize(k)}</label>
            <Field fieldKey={k} value={v} onChange={(next) => onChange({ ...value, [k]: next })} depth={depth} {...media} />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Edits every field of an object, whatever its shape: text, numbers, switches, media,
 * lists and nested groups. It is the editor's safety net, so content that has no
 * purpose-built form (location cards, process steps, card links...) is still changeable.
 */
export default function GenericFieldsEditor({ value, onChange, skipKeys, ...media }: GenericFieldsEditorProps) {
  return <ObjectFields value={(value || {}) as Record<string, Json>} onChange={onChange} depth={0} skipKeys={skipKeys} {...media} />;
}
