'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Columns,
  LayoutGrid,
  ListOrdered,
  TrendingUp,
  Sliders,
  HelpCircle,
  MapPin,
  Target,
  FileSpreadsheet,
  Film,
  Megaphone,
  AlignLeft,
  CheckCircle2,
  Layers,
  Newspaper
} from 'lucide-react';
import type { CDMOSection } from '@/data/cdmoData';

export interface SectionLayoutOption {
  id: string;
  name: string;
  category: 'content' | 'visual' | 'data' | 'conversion';
  icon: React.ElementType;
  tag: string;
  description: string;
  bestFor: string;
  sampleData: Partial<CDMOSection>;
}

export const SECTION_LAYOUTS: SectionLayoutOption[] = [
  {
    id: 'bento-insights',
    name: 'Featured Research & Bento Insights Grid',
    category: 'visual',
    icon: Newspaper,
    tag: 'Bento Insights',
    description: 'Bento grid layout with 1 large featured article on left, 2 stacked horizontal cards on right, and top-right View All button.',
    bestFor: 'Featured research, scientific articles, latest blogs, press releases',
    sampleData: {
      style: 'bento-insights',
      title: 'Featured Research and Insights',
      subtitle: 'SCIENTIFIC PERSPECTIVES & NEWS',
      text: 'Explore the latest perspectives from our scientists — blogs, news, and upcoming events.',
      buttonText: 'View all insights',
      buttonLink: '/insights/blogs',
      dark: false,
      cards: [
        {
          title: 'Accelerating Cell Line Development for Monoclonal Antibodies',
          description: 'How automated clone screening and stable CHO platforms shorten the path from gene to high-producing cell line.',
          badge: 'CELL LINE DEVELOPMENT',
          step: 'November 15, 2023 · 8 min read',
          image: '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg',
          link: '/insights/blogs/accelerating-cell-line-development-for-mabs'
        },
        {
          title: 'From DNA to Research Cell Bank in 16 Weeks',
          description: 'A look inside the streamlined gene-to-RCB pathway that de-risks early biologics development timelines.',
          badge: 'CELL LINE DEVELOPMENT',
          step: '6 min read',
          image: '/images/default_scientist.png',
          link: '/insights/blogs/from-dna-to-research-cell-bank-in-16-weeks'
        },
        {
          title: 'Upstream Process Optimization: Feed and Perfusion Strategies',
          description: 'How feed design, perfusion configurations, and scale-down models raise titers while protecting product quality.',
          badge: 'PROCESS DEVELOPMENT',
          step: '9 min read',
          image: '/images/cdn/unsplash-1606206873764-fd15e242df52.jpg',
          link: '/insights/blogs/upstream-process-optimization-feed-and-perfusion'
        }
      ]
    }
  },
  {
    id: 'locations-map',
    name: 'CDMO Locations Map (India & Europe)',
    category: 'visual',
    icon: MapPin,
    tag: 'Global Map',
    description: 'Interactive global network map with dual facility cards for Ahmedabad (India cGMP campus) and London (UK innovation centre).',
    bestFor: 'Facility overviews, global presence, international sponsor footprint',
    sampleData: {
      style: 'locations-map',
      title: 'Global CDMO Capabilities Across India and Europe',
      subtitle: 'INTEGRATED GLOBAL NETWORK',
      text: 'Lambda CDMO operates purpose-built development and manufacturing facilities in Ahmedabad, India, and London, UK.',
      dark: false
    }
  },
  {
    id: 'feature-split',
    name: 'Feature Split (50/50 Media & Text)',
    category: 'content',
    icon: Columns,
    tag: 'Editorial',
    description: 'Side-by-side layout pairing high-res scientific imagery or cleanroom video with structured paragraphs and key checkmark capabilities.',
    bestFor: 'Platform overview, technical capability highlights, facility focus',
    sampleData: {
      style: 'feature-split',
      title: 'Advanced Bioprocess Development Platform',
      subtitle: 'SCIENTIFIC RIGOR & ROBUST SCALE-UP',
      text: 'Our multidisciplinary team optimizes upstream mammalian cell culture and downstream purification sequences to maximize yield, ensure batch consistency, and de-risk tech transfer into clinical and commercial production.',
      image: '/images/hero_cleanroom.png',
      imageSide: 'right',
      dark: false,
      bulletsTitle: 'KEY PLATFORM ATTRIBUTES',
      bullets: [
        'Automated high-throughput screening and clone selection in CHO expression lines',
        'Parameter optimization and DoE studies across benchtop and pilot scale bioreactors',
        'Multistep chromatographic impurity clearance targeting host cell proteins and DNA',
        'ICH Q2(R1) method development, qualification, and analytical dossier release'
      ],
      buttonText: 'Explore Platform Specifications',
      buttonLink: '/services'
    }
  },
  {
    id: 'cards-grid',
    name: 'Interactive Bento & Cards Grid',
    category: 'content',
    icon: LayoutGrid,
    tag: 'Bento Grid',
    description: 'Grid of 2, 3, or 4 highlight cards with custom icons, badge tags, descriptions, and direct deep-dive links.',
    bestFor: 'Service suites, departmental pillars, core competencies',
    sampleData: {
      style: 'cards-grid',
      title: 'Comprehensive Development & Manufacturing Services',
      subtitle: 'END-TO-END CAPABILITIES',
      text: 'From cell line engineering to aseptic fill-finish and global regulatory release, explore our integrated core services.',
      dark: false,
      cards: [
        {
          title: 'Cell Line Engineering',
          description: 'High-titer CHO-K1 / CHO-S clonal lineages engineered for robust growth kinetics, high specific productivity, and stability.',
          icon: 'Dna',
          badge: '01 — Gene to Clone',
          link: '/services/cell-line',
          image: '/images/celldev/CLD_Lab.png'
        },
        {
          title: 'Process Sciences & Scale-Up',
          description: 'Fed-batch and intensified perfusion process optimization with full DoE characterization for seamless scale-up.',
          icon: 'Settings',
          badge: '02 — Upstream & Downstream',
          link: '/services/process',
          image: '/images/upstream/AMBR250.png'
        },
        {
          title: 'cGMP Manufacturing Suites',
          description: 'State-of-the-art cleanroom facilities supporting Phase I–III clinical supply with single-use bioreactor trains.',
          icon: 'Factory',
          badge: '03 — GMP Production',
          link: '/manufacturing/drug-substance',
          image: '/images/down stream/AKTA Pilot.png'
        }
      ]
    }
  },
  {
    id: 'process-steps',
    name: 'Workflow & Process Timeline',
    category: 'visual',
    icon: ListOrdered,
    tag: 'Numbered Steps',
    description: 'Sequential 01–04 numbered step cards showing program progression from concept through QA lot release.',
    bestFor: 'Stage-gate workflows, project onboarding, tech transfer phases',
    sampleData: {
      style: 'process-steps',
      title: 'Structured Program Execution Workflow',
      subtitle: 'SYSTEMATIC PROJECT MILESTONES',
      text: 'A transparent, milestone-driven framework designed to deliver regulatory-compliant batches on compressed clinical timelines.',
      dark: false,
      steps: [
        { step: '01', title: 'Target Definition & NDA Scoping', description: 'Reviewing amino acid sequence files, critical quality attributes (CQAs), and clinical delivery milestones.', icon: 'Search' },
        { step: '02', title: 'Method Development & Feasibility', description: 'Developing orthogonal chromatographic gradients, bioassays, and custom culture media formulations.', icon: 'FlaskConical' },
        { step: '03', title: 'Process Engineering & Verification', description: 'Executing pilot bioreactor runs and downstream filtration campaigns under scalable GMP protocols.', icon: 'Activity' },
        { step: '04', title: 'cGMP Production & QA Release', description: 'Full batch manufacturing, sterile fill-finish, and comprehensive regulatory documentation package.', icon: 'ShieldCheck' }
      ]
    }
  },
  {
    id: 'stats-metrics',
    name: 'Key Metrics & Impact Counter Grid',
    category: 'data',
    icon: TrendingUp,
    tag: 'Metrics',
    description: 'Prominent numerical stats and milestone counters with bold numbers, primary labels, and supporting context.',
    bestFor: 'Corporate milestones, facility metrics, yield statistics, compliance figures',
    sampleData: {
      style: 'stats-metrics',
      title: 'Facility Infrastructure & Operational Scale',
      subtitle: 'PROVEN CAPACITY & TRACK RECORD',
      text: 'Demonstrated infrastructure, quality compliance, and leadership expertise supporting worldwide biopharma programs.',
      dark: false,
      stats: [
        { value: '27,000', label: 'Sqft Biomanufacturing Campus', sublabel: 'Purpose-built biologics development and GMP cleanroom suites in Ahmedabad, India.' },
        { value: '25+', label: 'Years Group Legacy', sublabel: 'Backed by Lambda Therapeutic Research international clinical and bioanalytical heritage.' },
        { value: '99.9%', label: 'Analytical Resolution', sublabel: 'High-resolution orthogonal mass spectrometry and chromatographic purity analysis.' },
        { value: '100%', label: 'Regulatory Readiness', sublabel: 'Full alignment with US FDA, EMA, PMDA, and global regulatory submission dossiers.' }
      ]
    }
  },
  {
    id: 'capabilities-checklist',
    name: 'Capabilities Checklist & Focus Areas',
    category: 'content',
    icon: Sliders,
    tag: 'Checklist',
    description: 'Two-column sticky header with a structured, high-contrast checkmark list of technical points and advantages.',
    bestFor: 'Competitive advantages, regulatory adherence, technical specifications summary',
    sampleData: {
      style: 'capabilities-checklist',
      title: 'The Lambda CDMO Strategic Advantage',
      subtitle: 'WHY SPONSORS TRUST US',
      text: 'Our integrated CDMO platform brings together process sciences, analytical sciences, and manufacturing capabilities to support a range of biologic modalities.',
      dark: false,
      bullets: [
        'Integrated biologics development, process sciences, and GMP manufacturing capabilities under a single quality system',
        'Extensive CDMO capabilities across India and Europe providing global continuity and cost-effective delivery',
        'Molecule-specific development approaches across cell line engineering, upstream cell culture, downstream purification, and formulation',
        'Advanced analytical characterization supporting method validation, structural elucidation, and comparative biosimilar assessments',
        'Scalable bioreactor and single-use technologies designed for flexible batch volumes and rapid campaign changeovers',
        'Full cGMP compliance and quality assurance systems aligned with global regulatory authorities'
      ]
    }
  },
  {
    id: 'modalities-grid',
    name: 'Modality & Molecule Cards Grid',
    category: 'visual',
    icon: Target,
    tag: 'Molecules',
    description: 'Visual cards with subtle scientific color grade overlay, tailored for therapeutic modalities like mAbs, ADCs, and bispecifics.',
    bestFor: 'Therapeutic modalities, molecule classes, target product profiles',
    sampleData: {
      style: 'modalities-grid',
      title: 'Platform Capabilities for Next-Generation Biologics',
      subtitle: 'MOLECULE-TAILORED STRATEGIES',
      text: 'Our integrated development and manufacturing platform is tailored to the specific biochemical and biophysical properties of each molecule.',
      dark: false,
      cards: [
        { title: 'Monoclonal Antibodies', description: 'Platform capabilities for IgG1, IgG2, and IgG4 subclasses with high titers and purity.', link: '/modalities/mabs', image: '/images/modalities/mAb.png' },
        { title: 'Bispecific Antibodies', description: 'Overcoming chain pairing, homodimer formation, and mispairing with tailored purification.', link: '/modalities/bispecifics', image: '/images/modalities/Bispecific_Antibody.png' },
        { title: 'Antibody-Drug Conjugates (ADCs)', description: 'Conjugation process development, drug-to-antibody ratio (DAR) optimization, and aseptic manufacturing.', link: '/modalities/adcs', image: '/images/modalities/Antibody–Drug_Conjugate.png' },
        { title: 'Proteins & Peptides', description: 'Recombinant proteins, fusion constructs, and synthetic peptides produced with high purity.', link: '/modalities/proteins-peptides', image: '/images/modalities/Proteins_and_Peptides.png' }
      ]
    }
  },
  {
    id: 'equipment-carousel',
    name: 'Equipment & Technology Showcase',
    category: 'visual',
    icon: Layers,
    tag: 'Instruments',
    description: 'Dynamic slider/showcase displaying laboratory equipment, bioreactor systems, and mass spectrometry instruments.',
    bestFor: 'Laboratory instruments, cleanroom hardware, analytical equipment lists',
    sampleData: {
      style: 'equipment-carousel',
      title: 'State-of-the-Art Analytical & Process Equipment',
      subtitle: 'CUTTING-EDGE INFRASTRUCTURE',
      text: 'Equipped with industry-standard bioreactors, chromatography skids, and high-resolution mass spectrometers for uncompromised accuracy.',
      dark: false
    }
  },
  {
    id: 'technical-specs',
    name: 'Technical Specifications Table',
    category: 'data',
    icon: FileSpreadsheet,
    tag: 'Specs Table',
    description: 'Clean, structured table displaying technical specifications, cleanroom grades, analytical tolerances, and standard operating limits.',
    bestFor: 'Regulatory limits, cleanroom classifications, formulation specs, lot release criteria',
    sampleData: {
      style: 'technical-specs',
      title: 'Key Technical & Facility Specifications',
      subtitle: 'OPERATIONAL PARAMETERS',
      text: 'Comprehensive overview of facility classifications, bioreactor capacities, and analytical instrumentation.',
      specs: [
        { label: 'Expression Host Lineages', value: 'CHO-K1, CHO-S, HEK293 suspension lineages' },
        { label: 'Bioreactor Volume Range', value: 'Benchtop 250 mL Ambr to 500 L Single-Use Bioreactors (SUB)' },
        { label: 'Cleanroom Classifications', value: 'Grade A / ISO 5 fill-finish, Grade C processing suites' },
        { label: 'Primary Analytical Platforms', value: 'Orbitrap LC-MS/MS, Biacore 8K+ SPR, Maurice cIEF, UPLC' },
        { label: 'Regulatory Compliance', value: 'US FDA, EU EMA, PMDA, and WHO cGMP guidance' }
      ]
    }
  },
  {
    id: 'faq-accordion',
    name: 'FAQ Collapsible Accordion',
    category: 'content',
    icon: HelpCircle,
    tag: 'FAQs',
    description: 'Interactive expanding accordion list for answering technical, operational, and regulatory client inquiries.',
    bestFor: 'Frequently asked questions, sponsor onboarding clarifications, regulatory policies',
    sampleData: {
      style: 'faq-accordion',
      title: 'Frequently Asked Questions',
      subtitle: 'TECHNICAL & REGULATORY CLARIFICATIONS',
      text: 'Find direct answers regarding project timelines, tech transfer procedures, analytical comparability, and quality assurance.',
      faqs: [
        { question: 'What is the standard timeline from gene sequence to Research Cell Bank (RCB)?', answer: 'Our streamlined gene-to-RCB pathway typically delivers verified stable high-titer clonal lineages in 14 to 16 weeks.' },
        { question: 'How is analytical comparability demonstrated for biosimilar programs?', answer: 'We employ orthogonal physicochemical, biophysical, and in vitro bioassays across 20+ CQAs to establish structural and functional biosimilarity against reference products.' },
        { question: 'Do you support international regulatory submissions (IND / CTA / BLA)?', answer: 'Yes. Our QA and regulatory teams compile complete Module 3 (CMC) technical dossiers aligned with US FDA, EMA, and global ICH standards.' }
      ]
    }
  },
  {
    id: 'video-hero-banner',
    name: 'Cinematic Video & Media Banner',
    category: 'visual',
    icon: Film,
    tag: 'Cinematic',
    description: 'Full-width atmospheric dark banner with ambient background video, glowing typography, and call-to-action buttons.',
    bestFor: 'Mid-page visual breaks, facility virtual tours, brand statements',
    sampleData: {
      style: 'video-hero-banner',
      title: 'Precision Science Meets Manufacturing Excellence',
      subtitle: 'DISCOVER OUR FACILITY',
      text: 'Experience our 27,000 sqft biologics campus in Ahmedabad with automated single-use cleanroom suites and advanced analytical laboratories.',
      video: '/cta-bg-video.mp4',
      buttonText: 'Schedule a Virtual Facility Tour',
      buttonLink: '/contact'
    }
  },
  {
    id: 'cta-banner',
    name: 'Conversion Call-to-Action Banner',
    category: 'conversion',
    icon: Megaphone,
    tag: 'CTA Banner',
    description: 'Eye-catching branded closing banner designed to convert visitors into technical inquiries and consultations.',
    bestFor: 'Page footer CTAs, consultation invites, RFP submissions',
    sampleData: {
      style: 'cta-banner',
      title: 'Accelerate Your Molecule from Gene to Clinic',
      subtitle: 'PARTNER WITH LAMBDA CDMO',
      text: 'Speak directly with our senior scientific leaders and bioprocess engineers to discuss molecule specifications, timelines, and custom proposals.',
      buttonText: 'Contact Our Technical Team',
      buttonLink: '/contact',
      secondaryButtonText: 'Virtual Tour',
      secondaryButtonLink: '/virtual-tour/00%20MAIN%20BUILDING/index.htm'
    }
  },
  {
    id: 'rich-text',
    name: 'Editorial Rich Text & Prose Section',
    category: 'content',
    icon: AlignLeft,
    tag: 'Article Style',
    description: 'Clean editorial reading layout with formatted paragraphs, key takeaways, and structured subheadings.',
    bestFor: 'Scientific explanations, compliance philosophy, corporate narratives',
    sampleData: {
      style: 'rich-text',
      title: 'Commitment to Scientific Rigor and Regulatory Integrity',
      subtitle: 'OUR QUALITY PHILOSOPHY',
      text: 'Every biopharmaceutical program demands an uncompromising focus on quality, process understanding, and patient safety.\n\nOur Quality Management System (QMS) operates as a unified framework spanning analytical development, process validation, cGMP manufacturing, and lot release. With automated audit trails and 21 CFR Part 11 electronic data integrity, we ensure that every milestone produces bulletproof regulatory filings for worldwide submissions.'
    }
  }
];

interface SectionLayoutGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayout: (layout: SectionLayoutOption) => void;
}

export default function SectionLayoutGalleryModal({
  isOpen,
  onClose,
  onSelectLayout
}: SectionLayoutGalleryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'visual' | 'data' | 'conversion'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const filteredLayouts = SECTION_LAYOUTS.filter((layout) => {
    const matchesCategory = selectedCategory === 'all' || layout.category === selectedCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      layout.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.bestFor.toLowerCase().includes(searchFilter.toLowerCase()) ||
      layout.tag.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                Choose a Section Layout
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any layout style from our design library to add a new section with starter content.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Layouts' },
              { id: 'content', label: 'Content & Cards' },
              { id: 'visual', label: 'Visual & Media' },
              { id: 'data', label: 'Data & Specs' },
              { id: 'conversion', label: 'CTAs & Banners' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search layout styles..."
              className="w-full pl-3 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Layout Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredLayouts.map((layout) => {
              const Icon = layout.icon;
              return (
                <div
                  key={layout.id}
                  onClick={() => onSelectLayout(layout)}
                  className="group relative bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:border-brand-blue transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {layout.tag}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-brand-blue transition-colors leading-snug mb-1.5">
                      {layout.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {layout.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-slate-400 line-clamp-1">
                      {layout.bestFor}
                    </span>
                    <span className="text-brand-orange font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Add
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>{filteredLayouts.length} layout styles available</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
