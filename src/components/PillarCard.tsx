import type { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  text?: string;
  accent?: 'blue' | 'orange';
}

const ACCENTS = {
  blue: {
    hover: 'hover:border-brand-blue/40',
    bar: 'from-brand-blue to-cyan-500',
    icon: 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue',
  },
  orange: {
    hover: 'hover:border-brand-orange/40',
    bar: 'from-brand-orange to-amber-500',
    icon: 'bg-brand-orange/10 border-brand-orange/20 text-brand-orange',
  },
} as const;

/**
 * Accent-bar pillar tile (icon + title + copy), matching the
 * "Quality & Regulatory Pillars" cards on the quality page.
 */
export default function PillarCard({ icon: Icon, title, text, accent = 'blue' }: PillarCardProps) {
  const a = ACCENTS[accent];
  const paragraphs = (text || '').split('\n\n').filter(Boolean);

  return (
    <div
      className={`group h-full bg-slate-50/80 border border-neutral-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl ${a.hover} transition-all duration-300 flex flex-col justify-start relative overflow-hidden`}
    >
      <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${a.bar} opacity-80`} />
      <div className="flex items-center gap-3.5 mb-6">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${a.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 text-balance">
          {title}
        </h3>
      </div>

      <div className="space-y-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
