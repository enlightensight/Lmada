import Link from 'next/link';
import { 
  ArrowRight, 
  Dna, 
  Atom, 
  FlaskConical, 
  Microscope, 
  ShieldCheck, 
  Activity, 
  GitMerge, 
  Syringe, 
  Filter, 
  TrendingUp, 
  Boxes, 
  TestTubes,
  PackageCheck
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ModalityLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

function getCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('mammalian expression') || lower.includes('cell line') || lower.includes('expression system') || lower.includes('recombinant protein expression')) return Dna;
  if (lower.includes('upstream') || lower.includes('process development') || lower.includes('optimization')) return FlaskConical;
  if (lower.includes('homodimer') || lower.includes('mispairing') || lower.includes('bispecific')) return GitMerge;
  if (lower.includes('conjugation') || lower.includes('dar') || lower.includes('payload') || lower.includes('adc')) return Syringe;
  if (lower.includes('peptide') || lower.includes('synthetic')) return TestTubes;
  if (lower.includes('purification') || lower.includes('refolding')) return Filter;
  if (lower.includes('analytical') || lower.includes('characterization') || lower.includes('subclasses')) return Microscope;
  if (lower.includes('bioassay') || lower.includes('potency') || lower.includes('immunogenicity')) return Activity;
  if (lower.includes('quality') || lower.includes('stability') || lower.includes('degradation')) return ShieldCheck;
  if (lower.includes('drug product')) return PackageCheck;
  if (lower.includes('drug substance') || lower.includes('manufacturing')) return Boxes;
  if (lower.includes('scale-up') || lower.includes('transfer')) return TrendingUp;
  if (lower.includes('clinical')) return Dna;
  
  const fallbacks = [Dna, FlaskConical, Microscope, Atom, TestTubes, ShieldCheck, Activity, Boxes];
  return fallbacks[index % fallbacks.length];
}

export default function ModalityLayout({ page, content }: ModalityLayoutProps) {
  const [firstWord, ...restWords] = page.heading.split(' ');

  return (
    <>
      {/* HERO — molecule-focused: large rounded image with floating yellow stat chips */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-10">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-black">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05] mb-6">
                <span className="text-neutral-900">{firstWord}</span>{' '}
                {restWords.join(' ')}
              </h1>
              <p className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mb-10">
                {page.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
                >
                  Discuss your molecule
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/facility&location/India"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-black/40 text-black hover:bg-black hover:text-white font-medium text-sm uppercase tracking-wider transition-all"
                >
                  Explore the facility
                </Link>
              </div>
            </div>

            {page.image && (
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={page.image}
                    alt={page.title}
                    className={`w-full h-full ${page.image.endsWith('.png') ? 'object-contain p-6' : 'object-cover'}`}
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES — dedicated capability checklist grid with research symbols */}
      {page.capabilities && page.capabilities.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Platform Capabilities
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                  End-to-end scientific and manufacturing infrastructure designed to address the specific requirements of {page.title.split('—')[0].trim()}.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                const Icon = getCapabilityIcon(cap, idx);
                return (
                  <Reveal key={idx} delay={idx * 0.04} className="h-full">
                    <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                        <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors duration-300">
                          {cap}
                        </h4>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection faqs={page.faqs} />
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-[1.15] mb-6">
              <span className="text-white">Let&apos;s Advance</span> Your Next Biologics Program
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
              Whether you&apos;re developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                Get in touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                Virtual Tour
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
