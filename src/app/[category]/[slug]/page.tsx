import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { cdmoData } from '@/data/cdmoData';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Enable Next.js to statically build all 20+ routes at compilation
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

// Category-specific rich data generator to populate 5+ sections on all 20+ pages dynamically
function getDynamicContent(
  category: string,
  slug: string,
  pageTitle: string,
  existingSections: any[],
  existingStats: any[],
  existingSpecs: any[]
) {
  const sections = [...existingSections];
  
  // High-fidelity biotechnology imagery from Unsplash for bento cards — unique per page
  const defaultImages = [
    "/images/benefit_accelerate.png", // DNA/Pipette
    "/images/default_analytics.png",  // Lab scan
    "/images/hero_cleanroom.png",      // Cleanroom
    "/images/default_scientist.png",  // Microbiologist
    "/images/benefit_succeed.png"      // Science analytics
  ];

  // Unique bento card images per page category+slug combination
  function getUniqueBentoImage(cat: string, pageSlug: string, idx: number) {
    // Overview pages
    if (cat === 'overview' && pageSlug === 'about') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'leadership') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'facility') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'integrated') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'overview' && pageSlug === 'quality') {
      const imgs = [
        'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
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
    // Services pages
    if (cat === 'services' && pageSlug === 'cell-line') {
      const imgs = [
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'process') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'services' && pageSlug === 'analytical') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    // Manufacturing pages
    if (cat === 'manufacturing' && pageSlug === 'drug-substance') {
      const imgs = [
        'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'manufacturing' && pageSlug === 'drug-product') {
      const imgs = [
        'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    // Characterization pages
    if (cat === 'characterization' && pageSlug === 'analytical-testing') {
      const imgs = [
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'physicochemical') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'bioassays') {
      const imgs = [
        'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'characterization' && pageSlug === 'microbiological') {
      const imgs = [
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    // Modalities pages
    if (cat === 'modalities' && pageSlug === 'mabs') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'bispecifics') {
      const imgs = [
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'adcs') {
      const imgs = [
        'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    if (cat === 'modalities' && pageSlug === 'proteins-peptides') {
      const imgs = [
        'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
      ];
      return imgs[idx % imgs.length];
    }
    // Insights pages
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
    // Fallback
    return defaultImages[idx % defaultImages.length];
  }

  // Section 2: Generate at least 3 detailed bento cards for capabilities
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

  // Section 3: Dynamic 4-step vertical timeline steps
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

  // Section 4: Asymmetric Bento Advantage Items
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
  } else {
    advantages = [
      { badge: "Throughput", title: "Automated clonal screening arrays.", desc: "Robotic screening systems evaluating hundreds of clone targets to isolate high-expressing lines." },
      { badge: "Efficiency", value: "16 Wk", desc: "Timeline from DNA sequence receipt to Research Cell Bank." },
      { badge: "Yield", value: "8.2 g/L", desc: "Expression titer achieved in fed-batch CHO cultivation." }
    ];
  }

  // Section 5: Stats Dashboard Metrics
  let stats = [...existingStats];
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

  // Section 6: Specifications Summary
  let specs = [...existingSpecs];
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

  // Retrieve page from the database
  const page = cdmoData.find((p) => p.category === category && p.slug === slug);

  if (!page) {
    notFound();
  }

  // Get dynamic generated content to ensure 5+ full-width sections are populated
  const content = getDynamicContent(
    category,
    slug,
    page.title,
    page.sections || [],
    page.stats || [],
    page.specs || []
  );

  // Retrieve other pages in the same category for recommendations
  const relatedPages = cdmoData
    .filter((p) => p.category === category && p.slug !== slug)
    .slice(0, 3);

  // The first related page acts as our "Next Project" style transition banner
  const nextPage = relatedPages[0] || null;

  return (
    <div className="bg-background text-foreground min-h-screen font-sans pb-0 select-none">
      
      {/* ==================== 1. BREADCRUMBS & HERO SECTION ==================== */}
      <div className="max-w-[1400px] mx-auto px-6 pt-10 mt-10 sm:mt-11">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/50 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="opacity-70">{category}</span>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-neutral-900 font-semibold">{page.slug}</span>
          </span>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-8 flex flex-col items-start pt-2">
            {page.badge && (
              <span className="border border-neutral-300/50 text-neutral-600 bg-neutral-50 px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider mb-4 block w-fit">
                {page.badge}
              </span>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.05]">
              {page.heading}
            </h1>
            
            <p className="text-sm sm:text-base text-muted font-normal leading-relaxed max-w-2xl mt-6">
              {page.description}
            </p>
          </div>

          {/* Right Column: Specifications Metadata Card */}
          <div className="lg:col-span-4 w-full">
            <div className="rounded-[8px] border border-neutral-200/50 bg-neutral-50/50 p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase block mb-4">
                  Service Details
                </span>
                
                <div className="flex flex-col gap-3 mb-6">
                  {content.specs.slice(0, 3).map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-baseline border-b border-neutral-200/30 pb-2 last:border-0 last:pb-0">
                      <span className="text-[9px] font-semibold text-neutral-500 uppercase tracking-wider font-mono">{spec.label}</span>
                      <span className="text-xs font-semibold text-neutral-900 text-right ml-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full bg-gradient-to-b from-brand-blue to-sky-500 hover:from-brand-blue-hover hover:to-sky-600 border border-brand-blue/20 text-white font-semibold text-xs shadow-sm hover:shadow active:scale-98 transition-all rounded-full py-3.5 px-6 uppercase tracking-wider font-mono flex items-center justify-center space-x-2"
              >
                <span>Submit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Hero Large Cover Banner */}
      {page.image && (
        <section className="max-w-[1400px] mx-auto px-6 pb-12">
          <div className="w-full aspect-[16/9] rounded-[6px] overflow-hidden border border-neutral-200/50 bg-neutral-50/30 shadow-sm group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-102"
            />
          </div>
        </section>
      )}

      {/* ==================== 2. CORE CAPABILITIES (BENTO CARDS GRID) ==================== */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
            <div className="lg:col-span-4 flex items-center space-x-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                02 / Capabilities
              </span>
              <div className="h-[1px] bg-neutral-200/50 flex-grow" />
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-serif font-medium text-neutral-900">
                Detailed service offerings and workflows
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {content.sections.map((section, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-neutral-50/50 border border-neutral-200/50 p-6 rounded-[8px] flex flex-col justify-between hover:shadow-md transition-shadow h-full group cursor-pointer">
                <div>
                  <div className="relative aspect-[4/3] rounded-[6px] bg-white border border-neutral-200/50 flex items-center justify-center overflow-hidden mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-neutral-900 mb-3">{section.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{section.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== 3. PROCESS FLOW (VERTICAL TIMELINE) ==================== */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left sticky column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                03 / Workflow
              </span>
              <div className="h-[1px] bg-neutral-200/50 flex-grow" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-900 leading-[1.15] mb-4">
              Methodical process execution
            </h2>
            <p className="text-sm text-muted font-normal leading-relaxed">
              We guide biological targets from data ingestion and parameters scaling to formal validation release dossiers.
            </p>
          </div>

          {/* Right vertical timeline steps */}
          <div className="lg:col-span-7 flex flex-col gap-12 relative border-l border-neutral-200/50 pl-6 md:pl-10 ml-2">
            {content.processSteps.map((stepObj, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                  {/* Timeline dot step placeholder */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-brand-blue z-10" />
                  
                  <span className="font-mono text-xs font-semibold text-neutral-500 tracking-wider">
                    {stepObj.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-neutral-900 mb-2">
                      {stepObj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                      {stepObj.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 4. TECHNICAL ADVANTAGE (ASYMMETRIC BENTO GRID) ==================== */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10">
            <div className="lg:col-span-4 flex items-center space-x-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                04 / Performance
              </span>
              <div className="h-[1px] bg-neutral-200/50 flex-grow" />
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl font-serif font-medium text-neutral-900">
                Key parameters shaping product quality
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* Left card: Large text focus */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <Reveal className="h-full">
              <div className="bg-neutral-50/50 border border-neutral-200/50 p-8 rounded-[8px] flex flex-col justify-between min-h-[220px] h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-brand-blue rounded-full" />
                  <span className="text-[9px] tracking-widest font-semibold text-neutral-500 uppercase font-mono">{content.advantages[0].badge}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-medium text-neutral-900 leading-snug">
                  {content.advantages[0].title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mt-4">
                  {content.advantages[0].desc}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column: 2 stacked metrics cards (1 light, 1 dark) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Reveal>
              <div className="bg-neutral-50/50 border border-neutral-200/50 p-6 rounded-[8px] flex flex-col justify-center items-center text-center">
                <span className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-1">
                  {content.advantages[1].value}
                </span>
                <span className="text-[9px] font-semibold text-neutral-500 tracking-wider uppercase font-mono mb-2">
                  {content.advantages[1].badge}
                </span>
                <p className="text-[10px] text-muted leading-relaxed">
                  {content.advantages[1].desc}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-neutral-950 text-white p-6 rounded-[8px] border border-neutral-700/50 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <span className="text-3xl md:text-4xl font-serif font-semibold text-white mb-1 relative z-10">
                  {content.advantages[2].value}
                </span>
                <span className="text-[9px] font-semibold text-neutral-400 tracking-wider uppercase font-mono mb-2 relative z-10">
                  {content.advantages[2].badge}
                </span>
                <p className="text-[10px] text-neutral-400 leading-relaxed relative z-10">
                  {content.advantages[2].desc}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================== 5. PERFORMANCE METRICS (STATS ROW) ==================== */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Index & Label */}
            <div className="lg:col-span-4 flex items-center space-x-4 lg:sticky lg:top-28 h-fit">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                05 / Impact
              </span>
              <div className="h-[1px] bg-neutral-200/50 flex-grow" />
            </div>

            {/* Right Column: Stats Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {content.stats.map((stat, idx) => (
                  <div key={idx} className="bg-neutral-50/50 border border-neutral-200/50 p-6 rounded-[8px] flex flex-col space-y-2">
                    <span className="text-4xl font-serif font-medium text-neutral-900 tracking-tight">{stat.value}</span>
                    <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-500">{stat.label}</span>
                    {stat.sublabel && <p className="text-[10px] text-muted leading-relaxed mt-1">{stat.sublabel}</p>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      {/* ==================== 6. TECHNICAL OPERATIONS SUMMARY ==================== */}
      {content.specs && content.specs.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Index & Label */}
              <div className="lg:col-span-4 flex items-center space-x-4 lg:sticky lg:top-28 h-fit">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                  06 / Specifications
                </span>
                <div className="h-[1px] bg-neutral-200/50 flex-grow" />
              </div>

              {/* Right Column: Table List */}
              <div className="lg:col-span-8">
                <div className="rounded-[8px] border border-neutral-200/50 bg-white p-6 md:p-8 shadow-sm">
                  <h3 className="text-base font-serif font-medium text-neutral-900 mb-6">Technical Operations Summary</h3>
                  <div className="flex flex-col gap-4">
                    {content.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-baseline py-3 border-b border-neutral-200/30 last:border-0">
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase font-mono tracking-wider">{spec.label}</span>
                        <span className="text-xs font-semibold text-neutral-900 text-right ml-4">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>
      )}

      {/* ==================== 7. FAQ SECTION ==================== */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 border-t border-neutral-200/50">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Index & Label */}
              <div className="lg:col-span-4 flex items-center space-x-4 lg:sticky lg:top-28 h-fit">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
                  07 / FAQ
                </span>
                <div className="h-[1px] bg-neutral-200/50 flex-grow" />
              </div>

              {/* Right Column: FAQ Accordion */}
              <div className="lg:col-span-8">
                <div className="rounded-[8px] border border-neutral-200/50 bg-white p-6 md:p-8 shadow-sm">
                  <h3 className="text-base font-serif font-medium text-neutral-900 mb-6">Frequently Asked Questions</h3>
                  <div className="flex flex-col gap-4">
                    {page.faqs.map((faq, idx) => (
                      <div key={idx} className="py-4 border-b border-neutral-200/30 last:border-0">
                        <h4 className="text-sm font-semibold text-neutral-900 mb-2">{faq.question}</h4>
                        <p className="text-xs text-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>
      )}

      {/* ==================== 8. NEXT SERVICE TRANSITION BANNER ==================== */}
      {nextPage && (
        <div className="w-full border-t border-neutral-200/50">
          <Link
            href={`/${category}/${nextPage.slug}`}
            className="block w-full bg-neutral-50/50 hover:bg-neutral-100/50 transition-colors duration-500 py-24 text-center cursor-pointer group"
          >
            <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-500 font-bold block mb-3 animate-pulse">
              Next Service
            </span>
            <h3 className="text-4xl md:text-6xl font-serif font-medium text-neutral-900 group-hover:text-neutral-600 group-hover:scale-102 transition-all duration-500 tracking-tight leading-none max-w-4xl mx-auto px-6">
              {nextPage.heading.replace(/\.$/, '')}
            </h3>
          </Link>
        </div>
      )}

    </div>
  );
}
