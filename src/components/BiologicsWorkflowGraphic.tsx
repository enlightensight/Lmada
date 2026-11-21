'use client';

import React from 'react';
import { 
  Dna, 
  FlaskConical, 
  Microscope, 
  PackageCheck, 
  Users
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'orange';
  position: 'top' | 'bottom';
}

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Cell Line Development',
    icon: Dna,
    color: 'blue',
    position: 'top',
  },
  {
    id: 2,
    title: 'Upstream & Downstream Process Development',
    icon: FlaskConical,
    color: 'orange',
    position: 'bottom',
  },
  {
    id: 3,
    title: 'Analytical Characterization & Testing',
    icon: Microscope,
    color: 'blue',
    position: 'top',
  },
  {
    id: 4,
    title: 'Drug Substance & Drug Product Manufacturing',
    icon: PackageCheck,
    color: 'orange',
    position: 'bottom',
  },
  {
    id: 5,
    title: 'Clinical Development',
    icon: Users,
    color: 'blue',
    position: 'top',
  },
];

export default function BiologicsWorkflowGraphic() {
  return (
    <div className="w-full bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-shadow">
      {/* DESKTOP / TABLET HORIZONTAL PIPELINE VIEW */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 gap-2 relative items-center">
          
          {/* TOP ROW: Speech Bubbles for Steps 1, 3, 5 */}
          {STEPS.map((step) => {
            if (step.position === 'top') {
              return (
                <div key={`top-${step.id}`} className="flex flex-col items-center mb-3">
                  <div className="w-full min-h-[72px] bg-[#e1f5fe]/70 border border-[#b3e5fc] rounded-xl p-2.5 sm:p-3 text-center flex items-center justify-center shadow-xs transition-all duration-300 hover:shadow-md hover:bg-[#e1f5fe] relative group">
                    <span className="text-[12px] sm:text-[13px] font-bold text-neutral-800 leading-snug">
                      {step.title}
                    </span>
                    {/* Downward triangle pointer */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-[#b3e5fc]" />
                    <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[7px] border-t-[#e1f5fe]" />
                  </div>
                </div>
              );
            }
            return <div key={`top-empty-${step.id}`} className="min-h-[72px]" />;
          })}

          {/* MIDDLE ROW: Connecting Path with Circular Nodes */}
          {/* Connecting track line */}
          <div className="col-span-5 relative py-4 flex items-center justify-between">
            {/* Background dashed road / track */}
            <div className="absolute inset-x-8 h-2.5 bg-neutral-100 rounded-full border border-neutral-200 overflow-hidden">
              <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#f58634_0,#f58634_8px,transparent_8px,transparent_16px)] opacity-50" />
            </div>

            {/* Nodes */}
            <div className="w-full grid grid-cols-5 gap-2 relative z-10">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isBlue = step.color === 'blue';
                return (
                  <div key={`node-${step.id}`} className="flex items-center justify-center">
                    <div 
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 ${
                        isBlue 
                          ? 'bg-gradient-to-br from-[#00b4d8] to-[#0096c7] text-white ring-4 ring-[#e1f5fe]' 
                          : 'bg-gradient-to-br from-[#f58634] to-[#e67322] text-white ring-4 ring-[#fff3e0]'
                      }`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM ROW: Speech Bubbles for Steps 2, 4 */}
          {STEPS.map((step) => {
            if (step.position === 'bottom') {
              return (
                <div key={`bottom-${step.id}`} className="flex flex-col items-center mt-3">
                  <div className="w-full min-h-[72px] bg-[#fff3e0]/70 border border-[#ffe0b2] rounded-xl p-2.5 sm:p-3 text-center flex items-center justify-center shadow-xs transition-all duration-300 hover:shadow-md hover:bg-[#fff3e0] relative group">
                    {/* Upward triangle pointer */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-[#ffe0b2]" />
                    <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[7px] border-b-[#fff3e0]" />
                    <span className="text-[12px] sm:text-[13px] font-bold text-neutral-800 leading-snug">
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            }
            return <div key={`bottom-empty-${step.id}`} className="min-h-[72px]" />;
          })}

        </div>
      </div>

      {/* MOBILE VERTICAL TIMELINE VIEW */}
      <div className="block md:hidden">
        <div className="relative pl-6 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-8 before:w-1 before:bg-gradient-to-b before:from-brand-blue before:via-brand-orange before:to-brand-blue">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isBlue = step.color === 'blue';
            return (
              <div key={`mob-${step.id}`} className="relative flex items-center gap-4">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md z-10 ${
                    isBlue 
                      ? 'bg-gradient-to-br from-[#00b4d8] to-[#0096c7] text-white ring-4 ring-[#e1f5fe]' 
                      : 'bg-gradient-to-br from-[#f58634] to-[#e67322] text-white ring-4 ring-[#fff3e0]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div 
                  className={`flex-1 p-3 rounded-xl border shadow-xs ${
                    isBlue 
                      ? 'bg-[#e1f5fe]/60 border-[#b3e5fc]' 
                      : 'bg-[#fff3e0]/60 border-[#ffe0b2]'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider block text-slate-500 mb-0.5">
                    Step {step.id}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                    {step.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
