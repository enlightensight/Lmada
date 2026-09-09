import Link from 'next/link';
import { 
  ArrowRight, 
  Quote,
  ShieldCheck, 
  Microscope, 
  Factory, 
  Dna, 
  FileCheck, 
  Sparkles,
  Users,
  Sliders,
  Filter,
  Search,
  Scale,
  Workflow,
  FlaskConical,
  Activity,
  Bug,
  ClipboardCheck,
  PackageCheck,
  Pipette,
  Lock,
  TrendingUp,
  Snowflake,
  ShieldAlert,
  Eye,
  Building2,
  Globe,
  Milestone,
  Maximize2,
  Award,
  Layers,
  Repeat,
  User
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FacilityGallery from '@/components/FacilityGallery';
import FAQSection from '@/components/FAQSection';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface OverviewLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

interface LeaderProfile {
  name: string;
  title: string;
  role: string;
  bio: string;
  image: string;
}

const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    name: 'Dr. K. Srinivas',
    title: 'Chief Scientific Officer & Head of Biologics',
    role: 'Scientific Leadership',
    bio: 'Over 25 years of global biopharmaceutical leadership across clone development, process characterization, and tech transfer for complex mAbs and novel modalities.',
    image: '/images/cdn/unsplash-1507525428034-b723cf961d3e.jpg',
  },
  {
    name: 'Dr. Priya Mehta',
    title: 'Head of Process Development & Tech Transfer',
    role: 'Bioprocess Engineering',
    bio: 'PhD in Biochemical Engineering with 18+ years optimizing upstream single-use bioreactors (Ambr to 500L) and multi-modal downstream purification trains.',
    image: '/images/cdn/unsplash-1576671081837-49000212a370.jpg',
  },
  {
    name: 'Rajesh Sharma',
    title: 'Head of cGMP Manufacturing Operations',
    role: 'Manufacturing & Operations',
    bio: '20+ years leading aseptic fill-finish and clinical drug substance campaigns with automated isolators and single-use containment systems.',
    image: '/images/cdn/unsplash-1622227922682-56c92e523e58.jpg',
  },
  {
    name: 'Dr. Vikram Anand',
    title: 'Head of Analytical Sciences & Characterization',
    role: 'Bioanalytical Sciences',
    bio: 'Specialized in high-resolution mass spectrometry, QTPP definition, intact peptide mapping, and biosimilar comparability dossiers.',
    image: '/images/cdn/unsplash-1540575467063-178a50c2df87.jpg',
  },
  {
    name: 'Ananya Deshmukh',
    title: 'Head of Quality Assurance & Regulatory Affairs',
    role: 'Quality & Regulatory',
    bio: 'Global regulatory liaison with extensive FDA, EMA, PMDA, and TGA filing audit leadership for IND, IMPD, and BLA submissions.',
    image: '/images/cdn/unsplash-1551288049-bebda4e38f71.jpg',
  },
  {
    name: 'Dr. Amit Roy',
    title: 'Head of Bioassays & Modality Sciences',
    role: 'Functional Biology',
    bio: 'Pioneer in functional cell-based potency assays, MOA elucidation, ADCC/CDC mechanics, and clinical ADA/NAb validation.',
    image: '/images/cdn/unsplash-1522071820081-009f0129c71c.jpg',
  },
];

const OVERVIEW_SLUGS = ['about', 'leadership', 'facility', 'integrated', 'quality', 'careers'];

function getOverviewCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();

  // 1. Specific Scientific & Laboratory Modalities
  if (lower.includes('cell line') || lower.includes('clone') || lower.includes('gene construct') || lower.includes('expression system')) return Dna;
  if (lower.includes('microbiolog') || lower.includes('endotoxin') || lower.includes('bioburden') || lower.includes('sterility') || lower.includes('mycoplasma')) return Bug;
  if (lower.includes('bioassay') || lower.includes('immunogen') || lower.includes('potency') || lower.includes('cell-based') || lower.includes('adcc')) return Activity;
  if (lower.includes('upstream and downstream') || lower.includes('process development') || lower.includes('workflow')) return Workflow;
  if (lower.includes('analytical development') || lower.includes('physicochemical') || lower.includes('characterization') || lower.includes('lc-ms') || lower.includes('sec-hplc')) return Microscope;
  
  // 2. Drug Substance vs Drug Product Manufacturing
  if (lower.includes('drug product') || lower.includes('fill-finish') || lower.includes('vials') || lower.includes('pfs') || lower.includes('cartridges') || lower.includes('filling line')) return PackageCheck;
  if (lower.includes('drug substance') || lower.includes('upstream production suites') || lower.includes('200l') || lower.includes('bioreactor capacity') || lower.includes('clinical gmp')) return Factory;

  // 3. Quality & Batch Release & Compliance
  if (lower.includes('batch release') || lower.includes('quality control') || lower.includes('qc batch') || lower.includes('coa release')) return ClipboardCheck;
  if (lower.includes('data integrity') || lower.includes('ip protection') || lower.includes('21 cfr')) return Lock;
  if (lower.includes('product quality') || lower.includes('quality framework') || lower.includes('integrated qms') || lower.includes('audit')) return ShieldCheck;
  if (lower.includes('continuous improvement') || lower.includes('advancement')) return TrendingUp;
  if (lower.includes('transparent') || lower.includes('project management') || lower.includes('governance')) return FileCheck;
  if (lower.includes('scientific excellence') || lower.includes('peer-reviewed') || lower.includes('awards')) return Award;
  if (lower.includes('flexible collaboration') || lower.includes('partner') || lower.includes('one roof')) return Users;

  // 4. Equipment & Facility Specifics
  if (lower.includes('ambr') || lower.includes('media/feed')) return FlaskConical;
  if (lower.includes('scale') || lower.includes('linear scale') || lower.includes('intermediate suite')) return Sliders;
  if (lower.includes('50l sus') || lower.includes('single-use')) return Layers;
  if (lower.includes('perfusion') || lower.includes('fed-batch')) return Repeat;
  if (lower.includes('liquid handling') || lower.includes('microliter') || lower.includes('resin screening')) return Pipette;
  if (lower.includes('chromatography') || lower.includes('purification') || lower.includes('column') || lower.includes('pcc')) return Filter;
  if (lower.includes('lyophil') || lower.includes('nucleation') || lower.includes('freeze')) return Snowflake;
  if (lower.includes('viral') || lower.includes('segregat') || lower.includes('grade c')) return ShieldAlert;
  if (lower.includes('visual inspection') || lower.includes('secondary packaging') || lower.includes('inspection suite')) return Eye;
  if (lower.includes('qtpp') || lower.includes('analytical sciences workflow')) return Search;
  if (lower.includes('regulatory') || lower.includes('fda') || lower.includes('ema') || lower.includes('pmda') || lower.includes('tga') || lower.includes('cmc')) return Scale;
  if (lower.includes('campus') || lower.includes('infrastructure') || lower.includes('20,000 sqm')) return Building2;
  if (lower.includes('global') || lower.includes('market')) return Globe;
  if (lower.includes('phase-aligned') || lower.includes('lifecycle')) return Milestone;
  if (lower.includes('scalable') || lower.includes('capacity')) return Maximize2;

  // Diverse Fallback Array of Real Scientific Symbols
  const distinctScientificIcons = [
    Dna,
    Workflow,
    Microscope,
    Factory,
    PackageCheck,
    Activity,
    Bug,
    ClipboardCheck,
    FlaskConical,
    Filter,
    Snowflake,
    Scale,
  ];
  return distinctScientificIcons[index % distinctScientificIcons.length];
}

function AccentHeading({ text, className = '' }: { text: string; className?: string }) {
  const [first, ...rest] = text.split(' ');
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] ${className}`}>
      <span className="text-neutral-900">{first}</span>
      {rest.length > 0 ? ` ${rest.join(' ')}` : ''}
    </h2>
  );
}

export default function OverviewLayout({ page, content }: OverviewLayoutProps) {
  const slugIndex = OVERVIEW_SLUGS.indexOf(page.slug);
  const flip = slugIndex % 2 === 1;
  const heroImage = page.image || '/images/hero_cleanroom.png';

  const narrativeSections = content.sections.filter(
    (sec) => !(page.slug === 'about' && sec.title === 'The Lambda Advantage')
  );

  const narrative = (
    <>
      {narrativeSections.map((section, idx) => {
        if (section.dark) {
          // Blue quote / highlight block
          return (
            <section key={idx} className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules">
              <div className="w-full max-w-[1700px] mx-auto">
                <Reveal>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                      <Quote className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-6">
                      <span className="text-neutral-900">{section.title.split(' ')[0]}</span>
                      {` ${section.title.split(' ').slice(1).join(' ')}`}
                    </h3>
                    <p className="text-[17px] md:text-[19px] text-slate-500 font-normal leading-relaxed">
                      {section.text}
                    </p>
                    {page.slug === 'careers' ? (
                      <div className="mt-8">
                        <a
                          href="https://careers.lambda-cro.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                        >
                          <span>Explore Career Openings</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    ) : (
                      <div className="mt-8 h-1 w-16 mx-auto bg-brand-yellow rounded-full" />
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        }

        // Editorial alternating image + text row
        const imageRight = (idx % 2 === 1) !== flip;
        return (
          <div key={idx}>
            <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
              <div className="w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <Reveal className={imageRight ? 'lg:order-2' : ''}>
                    {page.slug === 'careers' ? (
                      <a
                        href="https://careers.lambda-cro.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm group cursor-pointer"
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-5 py-2.5 rounded-[8px] bg-brand-yellow text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                            <span>Open Careers Portal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
                    ) : (
                      <div className={`relative aspect-[4/3] overflow-hidden ${section.image?.endsWith('.png') || section.image?.endsWith('.svg') || section.image?.includes('cGMP') || section.image?.includes('equipment') || section.image?.includes('CDMOblue') || section.image?.includes('Akta') || section.image?.includes('ChromXact') || section.image?.includes('Fermenters') || section.image?.includes('Spray_Dryer') || section.image?.includes('Batch_Centrifuge') || section.image?.includes('Mammalian') || section.image?.includes('gene_construct') ? 'bg-white p-3 sm:p-5' : 'bg-neutral-100'} border border-neutral-200 rounded-[10px] shadow-sm flex items-center justify-center`}>
                        <img
                          src={section.image}
                          alt={section.title}
                          className={`w-full h-full ${section.image?.endsWith('.png') || section.image?.endsWith('.svg') || section.image?.includes('cGMP') || section.image?.includes('equipment') || section.image?.includes('CDMOblue') || section.image?.includes('Akta') || section.image?.includes('ChromXact') || section.image?.includes('Fermenters') || section.image?.includes('Spray_Dryer') || section.image?.includes('Batch_Centrifuge') || section.image?.includes('Mammalian') || section.image?.includes('gene_construct') ? 'object-contain' : 'object-cover'} transition-transform duration-700 hover:scale-105`}
                        />
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={0.1} className={imageRight ? 'lg:order-1' : ''}>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5">
                        {section.title}
                      </h3>
                      <div className="h-1 w-12 bg-brand-blue rounded-full mb-5" />
                      <p className="text-[15px] md:text-[17px] text-neutral-600 leading-relaxed">
                        {section.text}
                      </p>
                      {page.slug === 'careers' && (
                        <div className="mt-7">
                          <a
                            href="https://careers.lambda-cro.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                          >
                            <span>Explore Career Openings</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
            {page.slug === 'facility' && idx === 0 && <FacilityGallery />}
          </div>
        );
      })}
    </>
  );



  return (
    <>
      {/* HERO — editorial, light with dark text */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{page.heading.split(' ')[0]}</span>
                {` ${page.heading.split(' ').slice(1).join(' ')}`}
              </h1>
              <p className="text-[17px] text-slate-500 font-normal leading-relaxed mt-6 max-w-xl">
                {page.description}
              </p>
            </div>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                <img
                  src={heroImage}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES / THE LAMBDA ADVANTAGE SECTION */}
      {page.capabilities && page.capabilities.length > 0 && page.slug !== 'facility' && (
        <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${page.slug === 'about' ? 'bg-molecules' : 'bg-neutral-50/60'} border-b border-neutral-100`}>
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                {page.slug === 'about' ? (
                  <div className="max-w-4xl mx-auto">
                    <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                      <Quote className="w-7 h-7 text-black" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-6">
                      <span className="text-neutral-900">The Lambda</span> Advantage
                    </h2>
                    <p className="text-[17px] md:text-[19px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto">
                      {page.sections?.find((s) => s.title === 'The Lambda Advantage')?.text ||
                        'Every biologic program presents unique scientific, manufacturing, and regulatory challenges. Our role is to provide integrated expertise across development and manufacturing while maintaining the flexibility needed to support evolving program requirements. Our approach combines scientific knowledge, scalable manufacturing, and quality systems designed to support global regulatory expectations.'}
                    </p>
                    <div className="mt-8 h-1 w-16 mx-auto bg-brand-yellow rounded-full" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      {page.slug === 'leadership' ? (
                        <>
                          <span className="text-black">Operational</span> Commitments
                        </>
                      ) : page.slug === 'quality' ? (
                        <>
                          <span className="text-black">Quality</span> & Regulatory Framework
                        </>
                      ) : page.slug === 'integrated' ? (
                        <>
                          <span className="text-black">Integrated</span> Services
                        </>
                      ) : (
                        <>
                          <span className="text-black">Core</span> Lifecycle Capabilities
                        </>
                      )}
                    </h2>
                    <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                      {page.slug === 'leadership'
                        ? 'Our working model is built around six core commitments to client success.'
                        : page.slug === 'quality'
                        ? 'Robust quality assurance, international compliance standards, and risk-managed processes across every program.'
                        : 'Seamless coordination across development, analytical characterization, and GMP manufacturing under one roof.'}
                    </p>
                  </>
                )}
              </div>
            </Reveal>

            {page.slug === 'about' ? (
              <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                  {page.capabilities.slice(0, 3).map((cap, idx) => {
                    const Icon = getOverviewCapabilityIcon(cap, idx);
                    return (
                      <Reveal key={idx} delay={idx * 0.04} className="h-full">
                        <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Row 2: 2 Cards Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:max-w-3xl md:mx-auto w-full">
                  {page.capabilities.slice(3, 5).map((cap, idx) => {
                    const actualIdx = idx + 3;
                    const Icon = getOverviewCapabilityIcon(cap, actualIdx);
                    return (
                      <Reveal key={actualIdx} delay={actualIdx * 0.04} className="h-full">
                        <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                            <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ) : page.slug === 'integrated' || page.slug === 'quality' || page.slug === 'leadership' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {page.capabilities.map((cap, idx) => {
                  const Icon = getOverviewCapabilityIcon(cap, idx);
                  return (
                    <Reveal key={idx} delay={idx * 0.04} className="h-full">
                      <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                          <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                            {cap}
                          </h4>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
                {page.capabilities.map((cap, idx) => {
                  const Icon = getOverviewCapabilityIcon(cap, idx);
                  return (
                    <Reveal key={idx} delay={idx * 0.04}>
                      <div className="group w-full bg-white border border-neutral-200/80 rounded-[10px] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4 sm:gap-5">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                            {cap}
                          </h4>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LEADERSHIP PROFILES GRID */}
      {page.slug === 'leadership' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  <span className="text-neutral-900">Executive</span> & Scientific Team
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                  Led by experienced biopharma executives, bioprocess engineers, bioanalytical chemists, and regulatory specialists.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LEADERSHIP_PROFILES.map((leader, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                  <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col">
                    <div className="relative py-12 px-6 bg-gradient-to-b from-neutral-50 to-neutral-100/70 border-b border-neutral-100 flex items-center justify-center overflow-hidden">
                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                      {/* Avatar Circle with User Icon */}
                      <div className="relative z-10 w-24 h-24 rounded-full bg-white border-2 border-brand-blue/30 shadow-md group-hover:border-brand-yellow group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                        <User className="w-12 h-12 text-brand-blue group-hover:text-brand-orange transition-colors duration-300" />
                      </div>

                      {/* Role Pill Badge */}
                      <div className="absolute top-4 left-4 bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[8px] shadow-xs">
                        {leader.role}
                      </div>
                    </div>
                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-black group-hover:text-brand-blue transition-colors mb-1">
                        {leader.name}
                      </h3>
                      <span className="text-xs font-semibold text-brand-yellow uppercase tracking-wider mb-4 block">
                        {leader.title}
                      </span>
                      <p className="text-[15px] text-neutral-600 leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Narrative Editorial Sections */}
      {narrative}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection faqs={page.faqs} />
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-[1.15] mb-6">
              <span className="text-white">{page.slug === 'careers' ? 'Join' : 'Ready'}</span>{' '}
              {page.slug === 'careers' ? 'our world-class team of biologics scientists' : 'to advance your biologics program?'}
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-8">
              {page.slug === 'careers'
                ? 'Discover rewarding career opportunities across biologics development, analytical characterization, and GMP manufacturing.'
                : 'Connect with our scientific team to discuss your development and manufacturing requirements.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {page.slug === 'careers' ? (
                <>
                  <a
                    href="https://careers.lambda-cro.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
                  >
                    View All Open Positions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
                  >
                    Contact HR Team
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
                  >
                    Get in touch
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    href="/overview/about"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
                  >
                    About Lambda CDMO
                  </Link>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
