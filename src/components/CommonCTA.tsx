import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

interface CommonCTAProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonTarget?: string;
  primaryButtonRel?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonTarget?: string;
  secondaryButtonRel?: string;
}

export default function CommonCTA({
  title = "Let's Advance Your Next Biologics Program",
  subtitle = "Whether you're developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements.",
  primaryButtonText = "Get in touch",
  primaryButtonHref = "/contact",
  primaryButtonTarget,
  primaryButtonRel,
  secondaryButtonText = "Virtual Tour",
  secondaryButtonHref = "/virtual-tour/00%20MAIN%20BUILDING/index.htm",
  secondaryButtonTarget,
  secondaryButtonRel,
}: CommonCTAProps) {
  const isPrimaryExternal = primaryButtonHref.startsWith('http') || primaryButtonTarget === '_blank';
  const isSecondaryExternal =
    secondaryButtonHref.startsWith('http') ||
    secondaryButtonHref.includes('.htm') ||
    secondaryButtonTarget === '_blank';

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 select-none">
      <video
        src="/videos/Floating-Molecule-Video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-white leading-[1.15] mb-6">
            {title}
          </h2>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isPrimaryExternal ? (
              <a
                href={primaryButtonHref}
                target={primaryButtonTarget || "_blank"}
                rel={primaryButtonRel || "noopener noreferrer"}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            ) : (
              <Link
                href={primaryButtonHref}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            )}

            {secondaryButtonText && (
              isSecondaryExternal ? (
                <a
                  href={secondaryButtonHref}
                  target={secondaryButtonTarget || "_blank"}
                  rel={secondaryButtonRel || "noopener noreferrer"}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
                >
                  <span>{secondaryButtonText}</span>
                </a>
              ) : (
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
                >
                  <span>{secondaryButtonText}</span>
                </Link>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
