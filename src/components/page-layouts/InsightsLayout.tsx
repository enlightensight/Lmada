import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Download, FileText, Newspaper } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface InsightsLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const SLUG_META: Record<string, { icon: typeof FileText; label: string; featuredImageLeft: boolean }> = {
  blogs: { icon: FileText, label: 'Editorial', featuredImageLeft: true },
  'case-studies': { icon: BookOpen, label: 'Case Study', featuredImageLeft: false },
  brochures: { icon: Download, label: 'Resource', featuredImageLeft: true },
  news: { icon: Newspaper, label: 'Press', featuredImageLeft: false },
  events: { icon: Calendar, label: 'Event', featuredImageLeft: true },
};

export default function InsightsLayout({ page, content }: InsightsLayoutProps) {
  const meta = SLUG_META[page.slug] ?? { icon: FileText, label: 'Insights', featuredImageLeft: true };
  const SlugIcon = meta.icon;

  const [featured, ...rest] = content.sections;

  return (
    <>
      {/* HERO — masthead style */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-yellow" />
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-10">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                  <SlugIcon className="w-5 h-5 text-black" />
                </div>
                {page.badge && (
                  <span className="inline-block px-3 py-1.5 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-black/5 text-black border border-black/20">
                    {page.badge}
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.05]">
                {page.heading}
              </h1>
              <p className="text-[17px] text-neutral-600 leading-relaxed border-l-2 border-brand-yellow pl-5 mt-6 max-w-xl">
                {page.description}
              </p>
            </div>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                <img
                  src={page.image || '/images/hero_cleanroom.png'}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED STORY — large magazine card, image side varies per slug */}
      {featured && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-black">Featured</span> Story
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="group relative glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-neutral-100 ${meta.featuredImageLeft ? '' : 'lg:order-2'}`}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className={`p-8 md:p-12 flex flex-col justify-center ${meta.featuredImageLeft ? '' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
                        {meta.label}
                      </span>
                      <span className="h-px flex-1 bg-neutral-200" />
                      <SlugIcon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5 group-hover:text-brand-blue transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-[17px] text-neutral-600 leading-relaxed mb-8">
                      {featured.text}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                      <span className="w-8 h-0.5 bg-brand-yellow group-hover:w-12 transition-all duration-300" />
                      Read the full story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* MORE STORIES — smaller content cards */}
      {rest.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-black">More</span> From This Desk
                </h2>
              </div>
            </Reveal>

            <div className={`grid grid-cols-1 gap-6 md:gap-8 ${rest.length > 1 ? 'sm:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
              {rest.map((section, idx) => (
                <Reveal key={idx} delay={idx * 0.08}>
                  <article className="group relative h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-3">
                        {meta.label}
                      </span>
                      <h3 className="text-xl font-semibold text-black leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-[15px] text-neutral-600 leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TOPICS / ACCESS INDEX */}
      {content.specs && content.specs.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <Reveal>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                    <span className="text-black">Index</span> of Topics
                  </h2>
                  <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed">
                    A quick reference for what this section covers and how to access it.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <Reveal delay={0.1}>
                  <div className="border border-neutral-200 bg-white rounded-[10px] shadow-sm p-6 md:p-10">
                    <div className="flex flex-col">
                      {content.specs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-4 border-b border-neutral-100 last:border-0"
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-black">
                            <span className="w-2 h-2 rounded-[2px] bg-brand-yellow flex-shrink-0" />
                            {spec.label}
                          </span>
                          <span className="text-sm text-neutral-600 text-left sm:text-right pl-5 sm:pl-0">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SUBSCRIBE / CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex w-14 h-14 rounded-[10px] bg-brand-yellow items-center justify-center mb-8">
              <SlugIcon className="w-7 h-7 text-black" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              <span className="text-white">Stay</span> Informed on Lambda CDMO
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
              Connect with our team for the latest updates, event invitations, and scientific insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                Contact us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/insights/blogs"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                Browse insights
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
