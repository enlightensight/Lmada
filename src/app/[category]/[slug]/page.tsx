import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cdmoData } from '@/data/cdmoData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import OverviewLayout from '@/components/page-layouts/OverviewLayout';
import ServiceLayout from '@/components/page-layouts/ServiceLayout';
import ManufacturingLayout from '@/components/page-layouts/ManufacturingLayout';
import CharacterizationLayout from '@/components/page-layouts/CharacterizationLayout';
import ModalityLayout from '@/components/page-layouts/ModalityLayout';
import InsightsLayout from '@/components/page-layouts/InsightsLayout';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return cdmoData.map((page) => ({
    category: page.category,
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  const page = cdmoData.find((p) => p.category === category && p.slug === slug);

  if (!page) {
    return {
      title: "Page Not Found - Lambda CDMO",
    };
  }

  return {
    title: `${page.title} | Lambda CDMO`,
    description: page.metaDesc,
  };
}

function getDynamicContent(
  category: string,
  slug: string,
  pageTitle: string,
  existingSections: CDMOPage['sections'],
  existingStats: CDMOPage['stats'],
  existingSpecs: CDMOPage['specs']
) {
  const sections = [...existingSections];

  const defaultImages = [
    "/images/benefit_accelerate.png",
    "/images/default_analytics.png",
    "/images/hero_cleanroom.png",
    "/images/default_scientist.png",
    "/images/benefit_succeed.png"
  ];

  function getUniqueBentoImage(cat: string, pageSlug: string, idx: number) {
    if (cat === 'overview' && pageSlug === 'about') {
      const imgs = [
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'leadership') {
      const imgs = [
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'facility') {
      const imgs = [
        '/images/development.jpg',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'integrated') {
      const imgs = [
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'quality') {
      const imgs = [
        'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'careers') {
      const imgs = [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'cell-line') {
      const imgs = [
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'process') {
      const imgs = [
        '/images/development.jpg',
        '/images/default_scientist.jpg',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'analytical') {
      const imgs = [
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'manufacturing' && pageSlug === 'drug-substance') {
      const imgs = [
        'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
        '/images/development.jpg',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'manufacturing' && pageSlug === 'drug-product') {
      const imgs = [
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'analytical-testing') {
      const imgs = [
        '/images/default_scientist.jpg',
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'physicochemical') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'bioassays') {
      const imgs = [
        'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'microbiological') {
      const imgs = [
        '/images/default_scientist.jpg',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/development.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'mabs') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'bispecifics') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'adcs') {
      const imgs = [
        'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'proteins-peptides') {
      const imgs = [
        '/images/development.jpg',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        '/images/default_scientist.jpg',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'blogs') {
      const imgs = [
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'case-studies') {
      const imgs = [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'brochures') {
      const imgs = [
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'news') {
      const imgs = [
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'insights' && pageSlug === 'events') {
      const imgs = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    return defaultImages[idx % defaultImages.length];
  }

  if (sections.length < 3) {
    if (category === "characterization") {
      sections.push({
        title: "Orthogonal Instrumentation",
        text: "Deploying high-resolution tools including SEC-MALS, CE-SDS, and QTOF mass spectrometers to confirm higher-order molecular structures.",
      });
    } else if (category === "services") {
      sections.push({
        title: "Upstream Cultivation",
        text: "Engineering feed strategies and bioreactor parameters in scale-down modules to optimize peptide titer and product stability.",
      });
    } else if (category === "manufacturing") {
      sections.push({
        title: "Sterile Fill & Finish",
        text: "Operating fully automated vial filling and stopper lines inside aseptic Grade A isolation barriers to ensure purity.",
      });
    } else if (category === "modalities") {
      sections.push({
        title: "Process Scaling",
        text: "Optimizing downstream columns and recovery protocols to guarantee high-yield extraction for novel biologic therapeutics.",
      });
    } else {
      sections.push({
        title: "Regulatory Release Dossiers",
        text: "Compiling quality releases, certificates of analysis, and technical reports to enable global clinical trial entries.",
      });
    }
  }

  const enrichedSections = sections.map((sec, idx) => ({
    ...sec,
    image: sec.image || getUniqueBentoImage(category, slug, idx),
  }));

  let processSteps = [];
  if (category === "characterization") {
    processSteps = [
      { step: "01", title: "Target Spec Assessment", text: "We review the molecular structure, sequence files, and stability parameters under NDA." },
      { step: "02", title: "Method Feasibility & Dev", text: "Developing custom elution gradients and assay protocols on chromatographic systems." },
      { step: "03", title: "Analytical Validation", text: "Verifying accuracy, precision, and robustness according to ICH Q2(R1) regulatory guidelines." },
      { step: "04", title: "Dossier & QA Release", text: "Compiling technical release reports, chromatograms, and certificate of analysis (CoA) files." }
    ];
  } else if (category === "manufacturing") {
    processSteps = [
      { step: "01", title: "Process Transfer", text: "Transferring scale-up guidelines, media requirements, and parameters to the GMP floor." },
      { step: "02", title: "Seed Train Expansion", text: "Growing the expression cell line in steps from laboratory vials to pilot inoculations." },
      { step: "03", title: "cGMP Cleanroom Production", text: "Running single-use bioreactor systems under digital tracking of DO, pH, and cell growth." },
      { step: "04", title: "Aseptic Isolation Filling", text: "Automated filling and stopper operations in Grade A environments with full quality documentation." }
    ];
  } else if (category === "services") {
    processSteps = [
      { step: "01", title: "Codon Optimization", text: "Optimizing gene target sequence designs for high-efficiency cellular translation." },
      { step: "02", title: "Cell Line Engineering", text: "Transfecting host cell lines (CHO-K1) and screening stable clonal systems." },
      { step: "03", title: "Bioprocess Development", text: "Optimizing feed nutrients, perfusion configurations, and upstream parameters." },
      { step: "04", title: "Downstream Purification", text: "Developing chromatography runs to remove host cell proteins and DNA contaminants." }
    ];
  } else {
    processSteps = [
      { step: "01", title: "Requirement Definition", text: "Aligning on project scale, modality specifications, and clinical timelines." },
      { step: "02", title: "Technical Scaffolding", text: "Formulating standard operating procedures and custom batch release criteria." },
      { step: "03", title: "Execution & Analysis", text: "Running development, manufacturing campaigns, or characterization protocols." },
      { step: "04", title: "QA Release Package", text: "Providing full technical summaries and data logs to support regulatory filings." }
    ];
  }

  let advantages = [];
  if (category === "characterization") {
    advantages = [
      { badge: "Resolution", title: "State-of-the-art variant profiling.", desc: "We map critical quality attributes including glycosylation, oxidation, and charge isoform profiling to confirm biosimilar comparability." },
      { badge: "Precision", value: "99.8%", desc: "Sequence coverage resolved via LC-MS/MS peptide mapping." },
      { badge: "Standards", value: "ICH Q2", desc: "FDA & EMA inspection-ready validation protocols." }
    ];
  } else if (category === "manufacturing") {
    advantages = [
      { badge: "Flexibility", title: "Disposable single-use campaigns.", desc: "Preventing cross-contamination and increasing turnaround speed using state-of-the-art single-use bioreactors." },
      { badge: "Aseptic", value: "Grade A", desc: "Sterile filling under barrier isolator containment environments." },
      { badge: "Documentation", value: "CMC", desc: "Rigorous quality dossiers supporting IND filings." }
    ];
  } else if (category === "overview") {
    advantages = [
      { badge: "01", title: "Unified Quality System", desc: "Integrated biologics development and manufacturing under a unified quality system." },
      { badge: "02", title: "Scientific Expertise", desc: "Scientific expertise spanning development, manufacturing, analytical characterization, and quality control." },
      { badge: "03", title: "Phase-Aligned Strategies", desc: "Development strategies aligned to the requirements of each clinical phase." },
      { badge: "04", title: "Global GMP", desc: "GMP manufacturing designed to support global regulatory submissions." },
      { badge: "05", title: "Flexible Capacity", desc: "Flexible manufacturing capacity from pilot batches to clinical supply." },
      { badge: "06", title: "Clinical Integration", desc: "Opportunity to integrate manufacturing with Lambda's clinical research and bioanalytical capabilities." }
    ];
  } else {
    advantages = [
      { badge: "Throughput", title: "Automated clonal screening arrays.", desc: "Robotic screening systems evaluating hundreds of clone targets to isolate high-expressing lines." },
      { badge: "Efficiency", value: "16 Wk", desc: "Timeline from DNA sequence receipt to Research Cell Bank." },
      { badge: "Yield", value: "8.2 g/L", desc: "Expression titer achieved in fed-batch CHO cultivation." }
    ];
  }

  let stats = [...(existingStats || [])];
  if (stats.length === 0) {
    if (category === "characterization") {
      stats = [
        { value: "99.9%", label: "Analytical Purity", sublabel: "Resolved using high-resolution chromatography variants." },
        { value: "ICH Q2", label: "Validation Standard", sublabel: "Methods verified to satisfy international guidelines." },
        { value: "21 CFR", label: "Part 11 Compliant", sublabel: "Secure electronic data records and log tracking." },
      ];
    } else if (category === "manufacturing") {
      stats = [
        { value: "50-500L", label: "SUB Capacities", sublabel: "Single-use bioreactor trains in Grade C cleanrooms." },
        { value: "Grade A", label: "Aseptic Filling", sublabel: "Sterile filling under barrier isolator containment." },
        { value: "100%", label: "GMP Compliance", sublabel: "Quality releases mapped for US FDA and EU EMA batches." },
      ];
    } else {
      stats = [
        { value: "16 wk", label: "Gene-to-RCB Timeline", sublabel: "Rapid cell line engineering pathway." },
        { value: "3-8 g/L", label: "Expression Titers", sublabel: "High yield mAb clonal systems in CHO lines." },
        { value: "Global", label: "Service Footprint", sublabel: "Supporting IND filings across US, EU, and Asia." },
      ];
    }
  }

  let specs = [...(existingSpecs || [])];
  if (specs.length === 0) {
    if (category === "characterization") {
      specs = [
        { label: "Chromatography Platforms", value: "UPLC, SEC, IEX, HILIC" },
        { label: "Mass Spectrometry", value: "QTOF LC-MS/MS Peptide Mapping" },
        { label: "Quality System Standards", value: "cGMP, FDA/EMA Inspection Ready" },
      ];
    } else if (category === "manufacturing") {
      specs = [
        { label: "Cleanroom Zones", value: "Grade A/B filling, Grade C processing" },
        { label: "Bioreactor Types", value: "Single-use (SUB) continuous trains" },
        { label: "Batch Scale Capabilities", value: "Kilogram-scale GMP drug substance" },
      ];
    } else {
      specs = [
        { label: "Host Expression Systems", value: "CHO-K1 and CHO-S clonal lineages" },
        { label: "Standard Upstream Feed", value: "Serum-free, chemically defined media" },
        { label: "Downstream Columns", value: "Protein A/G Affinity, IEX, Hydrophobic" },
      ];
    }
  }

  return {
    sections: enrichedSections,
    processSteps,
    stats,
    specs,
    advantages,
  };
}

export default async function CDMODynamicPage({ params }: PageProps) {
  const { category, slug } = await params;

  const page = cdmoData.find((p) => p.category === category && p.slug === slug);

  if (!page) {
    notFound();
  }

  const content = getDynamicContent(
    category,
    slug,
    page.title,
    page.sections || [],
    page.stats || [],
    page.specs || []
  ) as PageContent;

  const relatedPages = cdmoData
    .filter((p) => p.category === category && p.slug !== slug)
    .slice(0, 3);

  const nextPage = relatedPages[0] || null;

  const LayoutComponent = (() => {
    switch (category) {
      case 'overview':
        return OverviewLayout;
      case 'services':
        return ServiceLayout;
      case 'manufacturing':
        return ManufacturingLayout;
      case 'characterization':
        return CharacterizationLayout;
      case 'modalities':
        return ModalityLayout;
      case 'insights':
        return InsightsLayout;
      default:
        return OverviewLayout;
    }
  })();

  return (
    <div className="bg-white text-neutral-900 min-h-screen font-sans pb-0 select-none">
      <LayoutComponent page={page} content={content} />

      {nextPage && (
        <div className="w-full border-t border-neutral-200">
          <Link
            href={`/${category}/${nextPage.slug}`}
            className="block w-full bg-white hover:bg-neutral-50 transition-colors duration-500 py-16 md:py-24 text-center cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest text-brand-blue font-bold block mb-3">
              Next: {category}
            </span>
            <h3 className="text-3xl md:text-5xl font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors duration-500 tracking-tight leading-none max-w-4xl mx-auto px-6">
              {nextPage.heading.replace(/\.$/, '')}
            </h3>
            <ArrowRight className="w-6 h-6 mx-auto mt-6 text-brand-blue group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
