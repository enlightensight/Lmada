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
  Sparkles
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import ModalityAnimation from '@/components/modality-animations/ModalityAnimation';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ModalityLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

function getCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('cell line') || lower.includes('expression')) return Dna;
  if (lower.includes('upstream') || lower.includes('downstream')) return FlaskConical;
  if (lower.includes('homodimer') || lower.includes('mispairing') || lower.includes('bispecific')) return GitMerge;
  if (lower.includes('conjugation') || lower.includes('dar') || lower.includes('payload') || lower.includes('adc')) return Syringe;
  if (lower.includes('purification') || lower.includes('refolding') || lower.includes('peptide')) return Filter;
  if (lower.includes('analytical') || lower.includes('characterization') || lower.includes('subclasses')) return Microscope;
  if (lower.includes('bioassay') || lower.includes('potency') || lower.includes('immunogenicity')) return Activity;
  if (lower.includes('scale-up') || lower.includes('transfer')) return TrendingUp;
  if (lower.includes('manufacturing') || lower.includes('substance') || lower.includes('product')) return Boxes;
  if (lower.includes('quality') || lower.includes('testing') || lower.includes('degradation') || lower.includes('stability')) return ShieldCheck;
  if (lower.includes('clinical')) return Sparkles;
  
  const fallbacks = [Dna, FlaskConical, Microscope, Atom, TestTubes, ShieldCheck, Activity];
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.05] mb-6">
                <span className="text-black">{firstWord}</span>{' '}
                {restWords.join(' ')}
              </h1>
              <p className="text-[17px] text-neutral-600 leading-relaxed max-w-xl mb-10">
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
                  href="/overview/facility"
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-black">Platform</span> Capabilities
                </h2>
                <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
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

      {/* FEATURED MODALITY FOCUS — SCIENTIFIC ANIMATION PLATFORM */}
      {content.sections && content.sections.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-5xl mx-auto">
            <Reveal>
              <div className="group glass-card rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200/80">
                {/* Interactive Modality Animation */}
                <div className="relative w-full overflow-hidden border-b border-neutral-200/80">
                  <ModalityAnimation slug={page.slug} />
                </div>
                <div className="p-8 sm:p-10 md:p-12 text-center max-w-3xl mx-auto">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 tracking-tight leading-snug group-hover:text-brand-blue transition-colors duration-300">
                    {content.sections[0].title}
                  </h3>
                  <p className="text-[17px] sm:text-[19px] text-neutral-600 leading-relaxed">
                    {content.sections[0].text}
                  </p>
                </div>
              </div>
            </Reveal>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              <span className="text-white">Ready</span> to Advance Your Biologics Program?
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
              Connect with our scientific team to discuss your development and manufacturing requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                Get in touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/modalities/mabs"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                Explore modalities
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
