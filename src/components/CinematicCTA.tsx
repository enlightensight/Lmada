'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

/* ─── Staggered character-reveal ─── */
function StaggeredFade({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Props ─── */
interface CinematicCTAProps {
  /** First line of the heading */
  headingLine1?: string;
  /** Second line of the heading (renders in yellow) */
  headingLine2?: string;
  /** Body text below the heading */
  subtitle?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Optional secondary button */
  secondaryLabel?: string;
  secondaryHref?: string;
}

const trustChips = ['Integrated Development', 'GMP Manufacturing', 'Global Quality Systems'];

export default function CinematicCTA({
  headingLine1 = 'ACCELERATE YOUR',
  headingLine2 = 'BIOLOGICS PATHWAY',
  subtitle = 'From cell line engineering to GMP drug product release — partner with Lambda to bring your biotherapeutics to clinical trials faster.',
  ctaLabel = 'Start a Project',
  ctaHref = '/contact',
  secondaryLabel = 'Explore Services',
  secondaryHref = '/services/cell-line',
}: CinematicCTAProps) {
  return (
    <section className="relative w-full overflow-hidden bg-brand-navy">
      {/* background video */}
      <video
        src="/videos/Floating-Molecule-Video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 50% navy blue overlay */}
      <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
      {/* white grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* yellow corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-brand-yellow rounded-tl-[10px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-brand-yellow rounded-br-[10px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 py-20 sm:py-28 md:py-32">
        {/* Label pill */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 rounded-[10px] bg-brand-yellow text-black text-[11px] font-bold uppercase tracking-wider mb-8"
        >
          Ready When You Are
        </motion.span>

        {/* Heading */}
        <h2 className="font-semibold text-white leading-[1.1] tracking-tight mb-6
                        text-4xl sm:text-5xl lg:text-6xl max-w-5xl">
          <span className="block">
            <StaggeredFade text={headingLine1} />
          </span>
          <span className="block text-brand-yellow mt-1">
            <StaggeredFade text={headingLine2} />
          </span>
        </h2>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
          className="h-1 w-24 bg-brand-yellow rounded-full origin-center mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white/70 leading-relaxed max-w-md md:max-w-xl mb-10
                     text-sm sm:text-base md:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12"
        >
          {/* Primary CTA */}
          <Link
            href={ctaHref}
            className="group rounded-[10px] px-8 sm:px-10 py-4 bg-brand-yellow hover:bg-brand-yellow-hover text-black uppercase text-xs sm:text-sm font-semibold inline-flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
            style={{ letterSpacing: '0.15em' }}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 text-black/60 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
          </Link>

          {/* Secondary */}
          {secondaryLabel && (
            <Link
              href={secondaryHref ?? '#'}
              className="rounded-[10px] px-8 sm:px-10 py-4 text-white uppercase text-xs sm:text-sm font-semibold border border-white/40 hover:bg-white hover:text-brand-blue transition-all duration-300 inline-flex items-center gap-2"
              style={{ letterSpacing: '0.15em' }}
            >
              {secondaryLabel}
            </Link>
          )}
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white/10 border border-white/20 text-white text-xs font-medium"
            >
              <Check className="w-3.5 h-3.5 text-brand-yellow" strokeWidth={3} />
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
