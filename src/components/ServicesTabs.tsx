'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Activity, Search } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Dna;
  mockup: 'cellLine' | 'process' | 'analytical';
}

const services: ServiceItem[] = [
  {
    id: 'cell-line',
    title: 'Cell Line Engineering',
    description: 'Engineering monoclonal antibodies (mAbs), bispecifics, and bi-functional scaffolds. High genetic stability and optimal expression yields.',
    icon: Dna,
    mockup: 'cellLine',
  },
  {
    id: 'process',
    title: 'Bioprocess Scaling',
    description: 'Upstream process optimization and downstream chromatography purification. Transfer from pilot batch to clinical GMP quantities.',
    icon: Activity,
    mockup: 'process',
  },
  {
    id: 'analytical',
    title: 'Analytical Validation',
    description: 'Physicochemical characterization, structure confirmations, cell-based bioassays, and sterility testing for batch release.',
    icon: Search,
    mockup: 'analytical',
  },
];

export default function ServicesTabs() {
  const [activeId, setActiveId] = useState<string>('cell-line');

  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center select-none">
      {/* Left Column: Vertical tabs list */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {services.map((service) => {
          const isActive = service.id === activeId;
          const Icon = service.icon;

          return (
            <button
              key={service.id}
              onClick={() => setActiveId(service.id)}
              className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white border-brand-blue/30 shadow-md translate-x-1'
                  : 'bg-transparent border-transparent hover:bg-brand-blue-light/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? 'bg-brand-blue text-white' : 'bg-brand-blue-light text-brand-blue'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-medium text-neutral-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Column: Dynamic high-fidelity CSS mockup */}
      <div className="lg:col-span-7 aspect-[4/3] rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-6 md:p-12 relative min-h-[300px]">
        {/* Abstract background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeService.mockup === 'cellLine' && <CellLineMockup />}
            {activeService.mockup === 'process' && <ProcessMockup />}
            {activeService.mockup === 'analytical' && <AnalyticalMockup />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CellLineMockup() {
  return (
    <div className="w-full max-w-sm bg-neutral-950 rounded-2xl shadow-xl border border-neutral-850 p-5 flex flex-col gap-4 text-white font-mono text-[10px] sm:text-xs">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
        <span className="text-neutral-500">Clone Screening System</span>
        <span className="text-green-400 font-semibold">Titer: 6.8 g/L</span>
      </div>
      
      {/* Gene Vector Graphic */}
      <div className="border border-neutral-800 rounded-xl p-3 bg-neutral-900/60 flex flex-col gap-2">
        <div className="text-[9px] text-neutral-500">TRANSFECTION VECTOR MAP</div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-16 h-16 rounded-full border-4 border-dashed border-neutral-700 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-neutral-500 flex items-center justify-center font-bold text-[8px] text-neutral-400">
              pCMV
            </div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500" />
            <div className="absolute bottom-1 left-0 w-2 h-2 rounded-full bg-neutral-400" />
          </div>
        </div>
        <div className="flex justify-between text-[9px] text-neutral-400 border-t border-neutral-800/80 pt-2 mt-1">
          <span>Promoter: CMV</span>
          <span>Marker: Glutamine Syn</span>
        </div>
      </div>

      {/* Screened clones list */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center bg-neutral-900 p-2 rounded-lg border border-neutral-850">
          <span className="text-neutral-400">Clone #204 (Selected)</span>
          <span className="text-green-400">98.6% Stability</span>
        </div>
        <div className="flex justify-between items-center bg-neutral-900/40 p-2 rounded-lg border border-neutral-900/60 text-neutral-500">
          <span>Clone #188</span>
          <span>84.2% Stability</span>
        </div>
      </div>
    </div>
  );
}

function ProcessMockup() {
  return (
    <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-md p-6 flex flex-col gap-4 font-mono text-[10px] sm:text-xs">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-2.5">
        <span className="font-semibold text-neutral-800">Bioprocess Operations</span>
        <span className="text-neutral-400 uppercase tracking-widest text-[9px]">Unit Ops</span>
      </div>

      {/* Flow Steps Graphic */}
      <div className="grid grid-cols-3 gap-3 relative py-2">
        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-150 flex flex-col justify-between h-24">
          <span className="text-neutral-400 font-semibold text-[8px]">01 / UPSTREAM</span>
          <div className="h-6 w-full bg-neutral-200 rounded-lg flex items-center justify-center font-bold text-[9px] text-neutral-600">500L SUB</div>
          <span className="text-neutral-400 text-[8px] text-right">Bioreactor</span>
        </div>
        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-150 flex flex-col justify-between h-24">
          <span className="text-neutral-400 font-semibold text-[8px]">02 / RECOVERY</span>
          <div className="h-6 w-full bg-neutral-200 rounded-lg flex items-center justify-center font-bold text-[9px] text-neutral-600">Clarify</div>
          <span className="text-neutral-400 text-[8px] text-right">Filtration</span>
        </div>
        <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-150 flex flex-col justify-between h-24">
          <span className="text-neutral-400 font-semibold text-[8px]">03 / DOWNSTREAM</span>
          <div className="h-6 w-full bg-neutral-900 text-white rounded-lg flex items-center justify-center font-bold text-[9px]">Chrom. A</div>
          <span className="text-neutral-400 text-[8px] text-right">Purity &gt;99%</span>
        </div>
      </div>

      <div className="text-[9px] text-neutral-400 border-t border-neutral-100 pt-2 flex justify-between">
        <span>Upstream: Fed-Batch / Perfusion</span>
        <span>Downstream: Multi-Column Aseptic Chromatography</span>
      </div>
    </div>
  );
}

function AnalyticalMockup() {
  return (
    <div className="w-60 bg-neutral-950 rounded-2xl shadow-xl border border-neutral-850 p-4 flex flex-col gap-3 text-white font-mono text-[9px] sm:text-xs">
      <div className="flex justify-between items-center border-b border-neutral-900 pb-1.5">
        <div>
          <span className="text-[7px] text-neutral-500 uppercase font-semibold">Quality Control</span>
          <h4 className="text-[10px] font-serif font-medium">HPLC Purity</h4>
        </div>
        <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[8px]">QC</div>
      </div>

      {/* HPLC Peak Graph */}
      <div className="h-20 bg-neutral-900 rounded-lg border border-neutral-850 p-2 flex flex-col justify-between relative overflow-hidden">
        <div className="flex justify-between text-[7px] text-neutral-500">
          <span>Retention Profile</span>
          <span className="text-green-400 font-semibold">Single Peak</span>
        </div>
        
        {/* SVG Drawing of Peak Curve */}
        <svg viewBox="0 0 100 40" className="w-full h-10 mt-1" preserveAspectRatio="none">
          <path
            d="M0,38 L35,38 L45,38 L50,4 L55,38 L65,38 L100,38"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <line x1="0" y1="38" x2="100" y2="38" stroke="#333" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Purity Specifications Table */}
      <div className="flex flex-col gap-1.5">
        <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-between">
          <span className="text-[8px] text-neutral-400">SEC Purity (Monomer)</span>
          <span className="text-[8px] text-green-400 font-semibold">&gt; 99.2%</span>
        </div>
        <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-between">
          <span className="text-[8px] text-neutral-400">Host Cell Proteins</span>
          <span className="text-[8px] text-green-400 font-semibold">&lt; 10 ppm</span>
        </div>
      </div>
    </div>
  );
}
