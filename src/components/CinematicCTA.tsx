'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
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
  /** Second line of the heading (renders in muted/italic) */
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
    <section className="relative w-full overflow-hidden" style={{ background: '#010101' }}>
      {/* ── Video Background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
        src="/cta-bg-video.mp4"
      />

      {/* ── Gradient overlays for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 py-24 sm:py-32 md:py-40 min-h-[520px] md:min-h-[600px]">
        {/* Heading */}
        <h2 className="font-serif font-normal text-white leading-[1.08] tracking-tight mb-6 sm:mb-8
                        text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">
            <StaggeredFade text={headingLine1} />
          </span>
          <span className="block text-white/50 italic mt-1">
            <StaggeredFade text={headingLine2} />
          </span>
        </h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-white/60 font-light leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mb-8 sm:mb-10
                     text-sm sm:text-base md:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA — liquid glass */}
          <Link
            href={ctaHref}
            className="liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase text-xs sm:text-sm font-light inline-flex items-center gap-2.5 group"
            style={{ letterSpacing: '0.18em' }}
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary */}
          {secondaryLabel && (
            <Link
              href={secondaryHref ?? '#'}
              className="rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/60 uppercase text-xs sm:text-sm font-light border border-white/10 hover:border-white/25 hover:text-white/90 transition-all duration-300 inline-flex items-center gap-2"
              style={{ letterSpacing: '0.18em' }}
            >
              {secondaryLabel}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
