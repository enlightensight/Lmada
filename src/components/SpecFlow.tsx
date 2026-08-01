'use client';

import { motion } from 'framer-motion';
import {
  ChevronRight,
  Dna,
  FlaskConical,
  TestTubes,
  Atom,
  Beaker,
  Microscope,
  Factory,
  Package,
  ShieldCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react';

const FLOW_ICONS: LucideIcon[] = [
  Dna,
  FlaskConical,
  TestTubes,
  Atom,
  Beaker,
  Microscope,
  Factory,
  Package,
  ShieldCheck,
  Globe,
];

interface SpecFlowProps {
  specs: { label: string; value: string }[];
}

/**
 * Biological workflow strip — scientific icon nodes joined by chevrons,
 * like CDMO process diagrams. Icons use the brand blue.
 */
export default function SpecFlow({ specs }: SpecFlowProps) {
  return (
    <div className="border border-neutral-200 bg-white rounded-[10px] shadow-sm px-4 py-8 md:px-8 md:py-10 overflow-x-auto">
      <div className="flex items-start justify-center min-w-max mx-auto">
        {specs.map((spec, idx) => {
          const Icon = FLOW_ICONS[idx % FLOW_ICONS.length];
          const isLast = idx === specs.length - 1;
          return (
            <div key={idx} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.12, ease: 'easeOut' }}
                className="flex flex-col items-center text-center w-32 sm:w-36 md:w-44 flex-shrink-0"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-3">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-brand-blue" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow mb-1.5">
                  {spec.label}
                </span>
                <span className="text-sm md:text-base font-semibold text-black leading-snug">
                  {spec.value}
                </span>
              </motion.div>
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.12 + 0.1, ease: 'easeOut' }}
                  className="pt-5 md:pt-6 px-1 flex-shrink-0"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
