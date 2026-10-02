'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  ArrowRight, 
  Building2, 
  Microscope, 
  Factory, 
  FlaskConical, 
  Dna, 
  Syringe, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import Reveal from '@/components/Reveal';

interface LocationStat {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface LocationInfo {
  id: 'india' | 'uk';
  city: string;
  country: string;
  title: string;
  badge: string;
  tagline: string;
  categoryBadge: string;
  description: string;
  coreCapabilities: {
    icon: React.ElementType;
    text: string;
  }[];
  href: string;
  // Map positioning in percentage (relative to world-map.svg viewBox)
  xPercent: number;
  yPercent: number;
  stats: LocationStat[];
  accentColor: string;
  primaryIcon: React.ElementType;
}

const CDMO_LOCATIONS: LocationInfo[] = [
  {
    id: 'india',
    city: 'Ahmedabad',
    country: 'India',
    title: 'Ahmedabad, India',
    badge: 'Primary Biomanufacturing Campus',
    tagline: 'India HQ & cGMP Biomanufacturing',
    categoryBadge: 'India cGMP Campus',
    description: 'Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.',
    coreCapabilities: [
      {
        icon: FlaskConical,
        text: '2x 200L single-use bioreactor suites for clinical & commercial drug substance'
      },
      {
        icon: Syringe,
        text: 'Robotic barrier isolator filling line (10,000 units/batch in vials, PFS & cartridges)'
      },
      {
        icon: ShieldCheck,
        text: 'Unified quality system aligned with US FDA & EMA cGMP regulatory standards'
      }
    ],
    href: '/facility&location/India',
    xPercent: 71.4,
    yPercent: 49.7,
    stats: [
      { label: 'Campus Size', value: '27,000 sqft', icon: Building2 },
      { label: 'Bioreactors', value: '2x 200L SUBs', icon: FlaskConical },
      { label: 'Fill-Finish', value: '10k units/batch', icon: Syringe }
    ],
    accentColor: '#f58634',
    primaryIcon: Factory
  },
  {
    id: 'uk',
    city: 'London',
    country: 'UK',
    title: 'London, UK',
    badge: 'European Innovation Centre',
    tagline: 'European Innovation & Analytics Hub',
    categoryBadge: 'UK Innovation Hub',
    description: 'Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.',
    coreCapabilities: [
      {
        icon: Dna,
        text: 'High-throughput clone screening, cell line optimization & expression vector design'
      },
      {
        icon: Activity,
        text: 'High-resolution intact LC-MS spectrometry & physicochemical CQA characterization'
      },
      {
        icon: Layers,
        text: 'Seamless tech transfer protocols & scale-up recipes to Ahmedabad GMP suites'
      }
    ],
    href: '/facility&location/UK',
    xPercent: 33.9,
    yPercent: 20.1,
    stats: [
      { label: 'Platform', value: 'Process Dev', icon: Dna },
      { label: 'Mass Spec', value: 'LC-MS High-Res', icon: Microscope },
      { label: 'Scope', value: 'Characterisation', icon: Activity }
    ],
    accentColor: '#00aeef',
    primaryIcon: Microscope
  }
];

interface CDMOLocationsMapSectionProps {
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string | null;
}

export default function CDMOLocationsMapSection({
  id = 'our-cdmo-locations',
  className = '',
  title = 'Our CDMO Locations',
  subtitle = null
}: CDMOLocationsMapSectionProps = {}) {
  const [activeLocationId, setActiveLocationId] = useState<'india' | 'uk'>('india');

  return (
    <section id={id} className={`scroll-mt-20 lg:scroll-mt-24 relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-b border-neutral-100 overflow-hidden select-none ${className}`}>
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
              {title}
            </h2>
            {subtitle && (
              <div className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-3xl mx-auto mt-4 space-y-3">
                {subtitle.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </Reveal>
        </div>

        {/* 2-Column Responsive Layout: Left 1 Single Interactive Card & Right Interactive Vector Map */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-stretch">
          
          {/* Left Column: 2 Separate Location Cards (India above, UK below) */}
          <div className="xl:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {CDMO_LOCATIONS.map((loc, idx) => {
              const isIndia = loc.id === 'india';
              const isActive = activeLocationId === loc.id;
              const PrimaryIcon = loc.primaryIcon;

              return (
                <Reveal key={loc.id} delay={0.1 + idx * 0.05} className="flex-1 flex flex-col">
                  <div
                    onClick={() => setActiveLocationId(loc.id)}
                    onMouseEnter={() => setActiveLocationId(loc.id)}
                    className={`h-full rounded-2xl overflow-hidden p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between relative bg-white cursor-pointer ${
                      isActive
                        ? isIndia
                          ? 'border-brand-orange/70 shadow-lg ring-2 ring-brand-orange/20'
                          : 'border-brand-blue/70 shadow-lg ring-2 ring-brand-blue/20'
                        : 'border-slate-200/90 hover:border-slate-300 shadow-xs opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Top accent line indicator */}
                    <div
                      className={`absolute top-0 inset-x-0 h-1.5 rounded-t-2xl pointer-events-none transition-all duration-300 ${
                        isActive
                          ? isIndia
                            ? 'bg-brand-orange'
                            : 'bg-brand-blue'
                          : 'bg-slate-200'
                      }`}
                    />

                    <div>
                      {/* Top Header Location */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold mb-2.5">
                        <MapPin
                          className={`w-4 h-4 ${
                            isIndia ? 'text-brand-orange' : 'text-brand-blue'
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            isIndia ? 'text-brand-orange' : 'text-brand-blue'
                          }`}
                        >
                          {loc.country}
                        </span>
                      </div>

                      {/* Title & Primary CDMO Icon */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                          {loc.title}
                        </h3>
                        <div
                          className={`p-2 rounded-xl border transition-colors shrink-0 ${
                            isIndia
                              ? 'bg-orange-50 text-brand-orange border-orange-200 shadow-xs'
                              : 'bg-sky-50 text-brand-blue border-sky-200 shadow-xs'
                          }`}
                        >
                          <PrimaryIcon className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Description matching the map popup */}
                      <p className="text-[13.5px] sm:text-[14.5px] font-normal leading-relaxed text-slate-600 mb-4">
                        {loc.description}
                      </p>
                    </div>

                    {/* Footer Action Link */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-end mt-auto">
                      <Link
                        href={loc.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                          isIndia
                            ? 'bg-brand-orange hover:bg-brand-orange-hover text-black'
                            : 'bg-brand-blue hover:bg-brand-blue-hover text-white'
                        }`}
                      >
                        <span>{isIndia ? 'Explore Ahmedabad Facility' : 'Explore London Centre'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Interactive Vector Map Viewport */}
          <div className="xl:col-span-7 flex flex-col">
            <Reveal delay={0.15}>
              <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-slate-200/90 shadow-xl overflow-hidden flex flex-col">
                
                {/* Map Ambient Glows */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Control Bar with Quick Toggle Pills */}
                <div className="relative z-20 flex items-center justify-between p-3 sm:p-3.5 border-b border-slate-200/90 bg-white/85 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-700">
                      CDMO Global Network
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setActiveLocationId('india')}
                      onMouseEnter={() => setActiveLocationId('india')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeLocationId === 'india'
                          ? 'bg-brand-orange text-black shadow-xs'
                          : 'text-slate-600 hover:text-neutral-900 hover:bg-white/60'
                      }`}
                    >
                      <Factory className="w-3.5 h-3.5" />
                      <span>Ahmedabad, India</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLocationId('uk')}
                      onMouseEnter={() => setActiveLocationId('uk')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeLocationId === 'uk'
                          ? 'bg-brand-blue text-white shadow-xs'
                          : 'text-slate-600 hover:text-neutral-900 hover:bg-white/60'
                      }`}
                    >
                      <Microscope className="w-3.5 h-3.5" />
                      <span>London, UK</span>
                    </button>
                  </div>
                </div>

                {/* Map Graphic Viewport Container */}
                <div className="relative w-full overflow-hidden pt-2 pb-6 sm:pb-8">
                  
                  {/* Accurate World Map Graphic */}
                  <div className="relative w-full aspect-[1051/619] max-w-[1300px] mx-auto select-none scale-[1.02] sm:scale-[1.05] origin-center">
                    <img
                      src="/images/map/Orange UK and India World Map.png"
                      alt="World Map - Lambda CDMO Locations"
                      className="w-full h-full object-contain filter contrast-105"
                    />

                    {/* Geodesic Connection Arc SVG between London (33.9%, 20.1%) and Ahmedabad (71.4%, 49.7%) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                      <defs>
                        <linearGradient id="arcGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00aeef" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#f58634" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                      
                      {/* Base Flight Path Curve (curved upwards over Europe/Middle East) */}
                      <path
                        d="M 33.9% 20.1% Q 52% 10%, 71.4% 49.7%"
                        fill="none"
                        stroke="url(#arcGradientLight)"
                        strokeWidth="2.4"
                        strokeDasharray="5,4"
                        className="animate-pulse"
                      />

                      {/* Moving Light Particle Pulse along the flight path */}
                      <circle r="4" fill="#00aeef" filter="drop-shadow(0 0 5px #00aeef)">
                        <animateMotion
                          path="M 33.9% 20.1% Q 52% 10%, 71.4% 49.7%"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>

                    {/* LOCATION 1: London, UK Pin & Beacon */}
                    <div
                      style={{ left: '33.9%', top: '20.1%' }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      {/* Pulsing Radar Ring */}
                      <div className="absolute -inset-3 rounded-full bg-brand-blue/20 animate-ping pointer-events-none" />
                      <div className="absolute -inset-5 rounded-full border border-brand-blue/30 animate-pulse pointer-events-none" />
                      
                      {/* Interactive Pin Trigger Button with CDMO Microscope Icon */}
                      <button
                        type="button"
                        onClick={() => setActiveLocationId('uk')}
                        onMouseEnter={() => setActiveLocationId('uk')}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ${
                          activeLocationId === 'uk'
                            ? 'bg-brand-blue text-white scale-125 ring-4 ring-brand-blue/30'
                            : 'bg-white border-2 border-brand-blue text-brand-blue hover:scale-110'
                        }`}
                        title="London, UK - European Innovation & Analytics Hub"
                      >
                        <Microscope className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {/* Fixed Label Pill */}
                      <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-blue/40 text-[11px] font-bold text-brand-blue px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                        London, UK
                      </div>

                      {/* POPUP MODAL ANIMATION FOR LONDON - Active state */}
                      <AnimatePresence>
                        {activeLocationId === 'uk' && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="hidden xl:block absolute z-50 left-1/2 -translate-x-[20%] top-10 w-80 bg-white/95 backdrop-blur-xl border border-brand-blue/40 rounded-xl p-3.5 shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                                <Microscope className="w-4 h-4 text-brand-blue" />
                                <span>London, UK</span>
                              </h4>
                              <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-1.5 py-0.5 rounded border border-brand-blue/20">UK Innovation Hub</span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              Biologics development capabilities supporting drug substance process & analytical development and process characterisation studies.
                            </p>

                            <Link
                              href="/facility&location/UK"
                              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold transition-all shadow-sm"
                            >
                              <span>Explore London Centre</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* LOCATION 2: Ahmedabad, India Pin & Beacon */}
                    <div
                      style={{ left: '71.4%', top: '49.7%' }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      {/* Pulsing Radar Ring */}
                      <div className="absolute -inset-3 rounded-full bg-brand-orange/20 animate-ping pointer-events-none" />
                      <div className="absolute -inset-5 rounded-full border border-brand-orange/30 animate-pulse pointer-events-none" />
                      
                      {/* Interactive Pin Trigger Button with CDMO Factory Icon */}
                      <button
                        type="button"
                        onClick={() => setActiveLocationId('india')}
                        onMouseEnter={() => setActiveLocationId('india')}
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 ${
                          activeLocationId === 'india'
                            ? 'bg-brand-orange text-black scale-125 ring-4 ring-brand-orange/30'
                            : 'bg-white border-2 border-brand-orange text-brand-orange hover:scale-110'
                        }`}
                        title="Ahmedabad, India - Primary Biomanufacturing Campus"
                      >
                        <Factory className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      {/* Fixed Label Pill */}
                      <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border border-brand-orange/40 text-[11px] font-bold text-brand-orange px-2.5 py-0.5 rounded-full shadow-sm pointer-events-none">
                        Ahmedabad, India
                      </div>

                      {/* POPUP MODAL ANIMATION FOR AHMEDABAD - Active state */}
                      <AnimatePresence>
                        {activeLocationId === 'india' && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.94 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="hidden xl:block absolute z-50 left-1/2 -translate-x-[75%] top-10 w-80 bg-white/95 backdrop-blur-xl border border-brand-orange/40 rounded-xl p-3.5 shadow-2xl text-left"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                                <Factory className="w-4 h-4 text-brand-orange" />
                                <span>Ahmedabad, India</span>
                              </h4>
                              <span className="text-[10px] font-semibold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded border border-brand-orange/20">India cGMP Campus</span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed mb-3">
                              Integrated development with Process and Analytical Sciences, combined with cGMP manufacturing for both drug substance and drug product.
                            </p>

                            <Link
                              href="/facility&location/India"
                              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-black text-xs font-semibold transition-all shadow-sm"
                            >
                              <span>Explore Ahmedabad Facility</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* Bottom Status / Capability Legend Bar */}
                <div className="relative z-20 px-4 py-3 bg-white/90 border-t border-slate-200/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-orange shrink-0" />
                      <span className="font-medium text-slate-700">Ahmedabad: cGMP Manufacturing & Fill-Finish</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-blue shrink-0" />
                      <span className="font-medium text-slate-700">London: Process Development & LC-MS Characterization</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Click pins or cards to inspect facility details
                  </span>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
