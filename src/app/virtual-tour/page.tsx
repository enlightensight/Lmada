'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Compass,
  Maximize2,
  Minimize2,
  ExternalLink,
  Building2,
  Dna,
  Microscope,
  Wrench,
  Wind,
  Factory,
  ShieldAlert,
  CheckCircle2,
  Layers,
  ArrowRight,
  RotateCw,
  Eye,
  Info,
  ChevronRight,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

interface TourZone {
  id: string;
  folderName: string;
  number: string;
  title: string;
  subtitle: string;
  classification: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  specs: { label: string; value: string }[];
}

const TOUR_ZONES: TourZone[] = [
  {
    id: 'main-building',
    folderName: '00 MAIN BUILDING',
    number: '01',
    title: 'Main Facility & Reception',
    subtitle: 'Global Administrative Campus & Client Briefing Suites',
    classification: 'Corporate Campus',
    description:
      'Step into Lambda CDMO’s global facility headquarters. Features executive briefing rooms, client collaboration suites, and centralized facility management operations.',
    icon: Building2,
    highlights: [
      'Architectural Lobby & Client Reception',
      'Executive Scientific Briefing Suites',
      'Centralized Campus Security & Access Control',
      'Regulatory Audit Conference Centers',
    ],
    specs: [
      { label: 'Footprint', value: 'Central Campus' },
      { label: 'Access Level', value: 'Visitor / Client' },
      { label: 'Amenities', value: 'VIP Suites & Audits' },
    ],
  },
  {
    id: 'development-area',
    folderName: '01 DEVELOPMENT AREA',
    number: '02',
    title: 'Biologics Development Suites',
    subtitle: 'Molecular Biology, Upstream (USP) & Downstream (DSP) Labs',
    classification: 'ISO 7 / Grade C',
    description:
      'Explore our state-of-the-art laboratory continuum spanning cell line engineering, upstream process development with high-density bioreactors, downstream chromatography purification, and formulation optimization.',
    icon: Dna,
    highlights: [
      'Cell Line Engineering & Monoclonality Proof',
      'Bench-Scale 3L–50L Bioreactor Trains',
      'ÄKTA Chromatography & Membrane TFF Systems',
      'Formulation & Buffer Preparation Suites',
    ],
    specs: [
      { label: 'Cleanliness', value: 'ISO 7 / Grade C' },
      { label: 'Scale', value: '3L – 50L Development' },
      { label: 'Operations', value: 'USP, DSP & Formulation' },
    ],
  },
  {
    id: 'qc-facility',
    folderName: '02 QC FACILITY',
    number: '03',
    title: 'Quality Control & Analytical Labs',
    subtitle: 'Comprehensive Physicochemical & Microbiology Testing',
    classification: 'ISO 7 & ISO 8',
    description:
      'Tour our rigorous Quality Control testing laboratories equipped with high-resolution UPLC/HPLC, mass spectrometry, capillary electrophoresis, bioassays, and dedicated microbiology testing suites under a unified cGMP QMS.',
    icon: Microscope,
    highlights: [
      'SEC-UPLC, CEX, & Peptide Mapping Testing',
      'Cell Culture & Potency Bioassay Lab',
      'Sterility & Endotoxin Microbiology PAL-3',
      'ICH Stability Testing & Archival Chambers',
    ],
    specs: [
      { label: 'Compliance', value: 'ICH Q2(R1) / cGMP' },
      { label: 'Analytical', value: 'UPLC, QTOF-MS, CE' },
      { label: 'Microbiology', value: 'Sterility & Bioburden' },
    ],
  },
  {
    id: 'technical-area-1',
    folderName: '03 TECHNICAL AREA 1',
    number: '04',
    title: 'Critical Process Utilities',
    subtitle: 'WFI Generation, Pure Steam & Clean Compressed Air',
    classification: 'Utility Support',
    description:
      'Examine the backbone of our pharmaceutical manufacturing plant: high-capacity Water-For-Injection (WFI) multi-effect stills, clean steam distribution, oil-free compressed air, and sanitary process gas manifolds.',
    icon: Wrench,
    highlights: [
      'Continuous Sanitary WFI Loop (85°C)',
      'Clean Process Steam (CSG) Systems',
      'High-Purity Process Nitrogen & Oxygen',
      'Continuous TOC & Conductivity Monitoring',
    ],
    specs: [
      { label: 'WFI Quality', value: 'USP / EP Compliant' },
      { label: 'Loop Temp', value: '85°C Continuous' },
      { label: 'Monitoring', value: 'Automated Real-Time' },
    ],
  },
  {
    id: 'technical-area-2',
    folderName: '04 TECHNICAL AREA 2',
    number: '05',
    title: 'Cleanroom HVAC Infrastructure',
    subtitle: 'Dedicated Air Handling Units & Pressure Cascade Banks',
    classification: 'Environmental Control',
    description:
      'View the mechanical engineering floor with dedicated AHU trains, multi-stage HEPA filtration, differential pressure cascades, and automated Building Management System (BMS) controls maintaining pristine cleanroom environments.',
    icon: Wind,
    highlights: [
      'Dedicated Single-Pass AHU Systems',
      'Terminal H14 HEPA Air Filtration (99.995%)',
      'Automated Cascade Differential Pressure',
      '24/7 Temperature & Relative Humidity Control',
    ],
    specs: [
      { label: 'HEPA Rating', value: '99.995% Efficiency' },
      { label: 'Monitoring', value: '24/7 BMS Integrated' },
      { label: 'Air Changes', value: '> 45 ACH (Grade A/B)' },
    ],
  },
  {
    id: 'manufacturing-facility',
    folderName: '05 MANUFACTURING FACILITY',
    number: '06',
    title: 'cGMP Manufacturing Facility',
    subtitle: 'Single-Use Bioreactor Suites (200L–2000L) & Fill-Finish',
    classification: 'Grade A / ISO 5 & Grade B',
    description:
      'Walk through our commercial and clinical cGMP production core: single-use bioreactors (200L, 500L, and 2,000L), automated closed-system harvest, industrial chromatography skids, and automated barrier isolator aseptic vial filling.',
    icon: Factory,
    highlights: [
      '200L, 500L & 2,000L Single-Use Bioreactors',
      'Automated Chromatography Skids & UF/DF TFF',
      'Grade A Robotic Barrier Isolator Filling',
      'Batch Release & QP Certified Operations',
    ],
    specs: [
      { label: 'Production Scale', value: 'Up to 2,000L SUB' },
      { label: 'Cleanroom Grade', value: 'Grade A Isolator' },
      { label: 'Filling Rate', value: 'High-Speed Automated' },
    ],
  },
  {
    id: 'ba-pbs-bsl2-lab',
    folderName: '06 BA- PBS BSL2 LAB',
    number: '07',
    title: 'BA-PBS BSL-2 Containment Lab',
    subtitle: 'Bioanalytical Testing & Specialized Biosafety Containment',
    classification: 'Biosafety Level 2',
    description:
      'Tour our specialized Bioanalytical and Biosafety Level 2 containment suites dedicated to cellular bioassays, viral safety verification, host cell impurity quantification, and sensitive therapeutic characterization.',
    icon: ShieldAlert,
    highlights: [
      'Certified Class II Type A2 Biosafety Cabinets',
      'Controlled-Access Interlocked Airlocks',
      'Viral Clearance & Safety Testing Suites',
      'High-Sensitivity ELISA & Binding Bioassays',
    ],
    specs: [
      { label: 'Biosafety', value: 'BSL-2 Certified' },
      { label: 'Containment', value: 'Negative Pressure Air-lock' },
      { label: 'Applications', value: 'Viral & Bioanalytical' },
    ],
  },
];

interface PanoramaPhoto {
  title: string;
  zone: string;
  description: string;
  imagePath: string;
}

const FEATURED_PANORAMAS: PanoramaPhoto[] = [
  {
    title: 'Main Campus & Entrance',
    zone: 'Corporate Campus',
    description: 'Panoramic perspective of Lambda CDMO entrance and client briefing facility.',
    imagePath: '/panorama-photos/00%20MAIN%20BUILDING/00%20MAIN%20BUILDING.jpg',
  },
  {
    title: 'Upstream Development Lab',
    zone: 'Development Suites',
    description: 'High-density bioreactor trains and automated culture optimization systems.',
    imagePath: '/panorama-photos/01%20Development%20Area/12%20B%20-%20UPSTREAM%20DEVELOPMENT%20LAB%201.jpg',
  },
  {
    title: 'Molecular Biology Suite',
    zone: 'Development Suites',
    description: 'Cell line development, cloning, and high-yield vector transfection suite.',
    imagePath: '/panorama-photos/01%20Development%20Area/04%20MOLECULAR%20BIOLOGY%201.jpg',
  },
  {
    title: 'Analytical Characterization Lab',
    zone: 'QC Facility',
    description: 'High-performance chromatographic analysis and physicochemical testing suites.',
    imagePath: '/panorama-photos/02%20QC%20FACILITY/03%20ANALYTICAL%20LAB.jpg',
  },
  {
    title: 'cGMP Bioreactor Production Suite',
    zone: 'cGMP Manufacturing',
    description: 'Single-use commercial bioreactors inside classified cleanroom environment.',
    imagePath: '/panorama-photos/05%20MANUFACTURING%20FACILITY-%20LBM/05%20CELL%20CELTURE%20PRODUCTION%20(USP%20ROOM%20-1).jpg',
  },
  {
    title: 'Compounding & Formulation Suite',
    zone: 'cGMP Manufacturing',
    description: 'Aseptic compounding vessel arrays and sterile formulation pipeline.',
    imagePath: '/panorama-photos/05%20MANUFACTURING%20FACILITY-%20LBM/24%20COMPOUNDING.jpg',
  },
];

export default function VirtualTourPage() {
  const [activeZone, setActiveZone] = useState<TourZone>(TOUR_ZONES[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PanoramaPhoto | null>(null);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    if (!viewerContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await viewerContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen request failed:', err);
    }
  };

  const tourUrl = `/virtual-tour/${encodeURIComponent(activeZone.folderName)}/index.htm`;

  return (
    <div className="relative min-h-screen bg-white">
      {/* ─── HERO HEADER ─── */}
      <section className="relative pt-8 pb-10 sm:pb-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-neutral-100 bg-radial from-brand-blue/5 via-transparent to-transparent">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-neutral-900 font-semibold">Virtual Tour</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs sm:text-sm font-semibold mb-4">
                <Compass className="w-4 h-4 text-brand-orange animate-spin-slow" />
                <span>360° IMMERSIVE FACILITY EXPERIENCE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.12]">
                Explore Lambda’s cGMP Biologics Facility
              </h1>

              <p className="text-[16px] sm:text-[18px] text-slate-600 font-normal leading-relaxed mt-4 max-w-3xl">
                Experience our integrated biologics development and manufacturing infrastructure in full 360° interactive fidelity. Navigate across 7 specialized facility zones — from molecular biology and analytical characterization to commercial-scale cGMP bioreactor cleanrooms.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-neutral-50 border border-neutral-200/80 text-neutral-700 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>7 Verified Zones</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-neutral-50 border border-neutral-200/80 text-neutral-700 text-sm font-medium">
                <Eye className="w-4 h-4 text-brand-orange" />
                <span>Full 360° Panoramic Pan & Zoom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE 360° TOUR VIEWER SECTION ─── */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-12">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Zone Selector Horizontal Navigation Tabs */}
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2.5 min-w-max">
              {TOUR_ZONES.map((zone) => {
                const IconComponent = zone.icon;
                const isActive = activeZone.id === zone.id;

                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZone(zone)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md'
                        : 'bg-white text-neutral-800 border-neutral-200/90 hover:border-brand-blue/60 hover:bg-neutral-50/80'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-brand-orange text-white'
                          : 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isActive ? 'text-brand-orange' : 'text-slate-400'
                          }`}
                        >
                          Zone {zone.number}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {zone.classification}
                        </span>
                      </div>
                      <span className="text-sm font-semibold block leading-tight mt-0.5">
                        {zone.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 360 Viewer Canvas Container */}
          <div
            ref={viewerContainerRef}
            className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-950 shadow-2xl flex flex-col"
          >
            {/* Viewer HUD Control Bar */}
            <div className="bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 z-20">
              {/* Left: Active Zone Info */}
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-sm sm:text-base font-bold tracking-tight">
                      {activeZone.title}
                    </h3>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-blue/20 text-brand-blue border border-brand-blue/30">
                      {activeZone.classification}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-normal hidden sm:block">
                    {activeZone.subtitle}
                  </p>
                </div>
              </div>

              {/* Center: Mouse Drag & Zoom Hint */}
              <div className="hidden xl:flex items-center gap-2 text-xs text-neutral-400 bg-neutral-800/70 px-3 py-1.5 rounded-full border border-neutral-700/60">
                <RotateCw className="w-3.5 h-3.5 text-brand-orange animate-spin-slow" />
                <span>Click & drag to look around 360° • Scroll to zoom • Click arrows to enter rooms</span>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  type="button"
                  title="Toggle Fullscreen"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Fullscreen</span>
                    </>
                  )}
                </button>

                {/* Standalone Window Button */}
                <a
                  href={tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open tour in new dedicated tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Standalone</span>
                </a>
              </div>
            </div>

            {/* Embedded 3DVista Interactive Virtual Tour iFrame */}
            <div className="relative w-full h-[540px] sm:h-[640px] md:h-[720px] lg:h-[780px] xl:h-[840px] bg-neutral-950">
              <iframe
                key={activeZone.id}
                src={tourUrl}
                title={`${activeZone.title} 360 Virtual Tour`}
                className="w-full h-full border-0"
                allow="accelerometer; gyroscope; magnetometer; vr; fullscreen"
                loading="eager"
              />
            </div>

            {/* Bottom Telemetry & Highlights Drawer */}
            <div className="bg-white border-t border-neutral-200/90 p-4 sm:p-6 lg:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Description Column */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs font-bold">
                      {activeZone.number}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-neutral-900">
                      About {activeZone.title}
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {activeZone.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {activeZone.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100/90 text-xs font-medium text-neutral-700"
                      >
                        <span className="text-slate-400 font-normal">{spec.label}:</span>
                        <span className="font-bold text-neutral-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Technical Highlights */}
                <div className="lg:col-span-6 lg:border-l lg:border-neutral-200/80 lg:pl-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                    Zone Capabilities & Infrastructure
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeZone.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HIGH-RESOLUTION PANORAMA PHOTO SHOWCASE ─── */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 bg-neutral-50/70 border-y border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-2 block">
                FACILITY PHOTOGRAPHY ARCHIVE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                High-Resolution 360° Panoramic Gallery
              </h2>
              <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed mt-4">
                Explore ultra-wide panoramic photographs captured across Lambda’s cGMP facility suites. Click any photograph to view in full resolution.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PANORAMAS.map((photo, pIdx) => (
              <Reveal key={pIdx} delay={pIdx * 0.06}>
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="group bg-white rounded-xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden">
                    <img
                      src={photo.imagePath}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                        {photo.zone}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-brand-blue transition-colors">
                        {photo.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-2">
                        {photo.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-brand-blue">
                      <span>Click to enlarge 360 photo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL RESOLUTION PANORAMA PHOTO MODAL ─── */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-base sm:text-lg">{selectedPhoto.title}</h3>
                <span className="text-xs text-neutral-400">{selectedPhoto.zone}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="relative w-full max-h-[75vh] overflow-auto bg-black p-2 flex items-center justify-center">
              <img
                src={selectedPhoto.imagePath}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
              <p className="text-xs text-neutral-400">{selectedPhoto.description}</p>
              <a
                href={selectedPhoto.imagePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
              >
                Open Original Image <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── FACILITY SPECIFICATIONS SUMMARY ─── */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-brand-blue block mb-1">
                100,000+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-wider block">
                Square Feet Footprint
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Integrated Biologics Campus</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-brand-orange block mb-1">
                2,000L
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-wider block">
                Max Bioreactor Scale
              </span>
              <span className="text-xs text-slate-500 mt-1 block">Single-Use (SUB) Production</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-neutral-900 block mb-1">
                Grade A
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-wider block">
                Aseptic Isolator Fill
              </span>
              <span className="text-xs text-slate-500 mt-1 block">ISO 5 Robotic Vials</span>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-emerald-600 block mb-1">
                cGMP
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 uppercase tracking-wider block">
                Global Regulatory Ready
              </span>
              <span className="text-xs text-slate-500 mt-1 block">US FDA & EMA Alignment</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHEDULE A GUIDED VIP TECHNICAL TOUR CTA ─── */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 bg-brand-navy text-white">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-2">
              TECHNICAL ON-SITE & VIRTUAL BRIEFINGS
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Schedule a Guided Technical Facility Tour
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-normal mt-2 max-w-2xl leading-relaxed">
              Connect directly with our bioprocess engineering, analytical, and quality leadership for an in-depth walkthrough tailored to your molecule's development and manufacturing requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer"
            >
              <span>Schedule VIP Site Tour</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/overview/facility"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm font-semibold tracking-wide transition-all cursor-pointer"
            >
              <span>Facility Specifications</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
