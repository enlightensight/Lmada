import type { CDMOPage, CDMOSection } from '@/data/cdmoData';

export type EnrichedSection = CDMOSection & { image: string };

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

export interface Advantage {
  badge: string;
  title?: string;
  value?: string;
  desc: string;
}

export interface PageContent {
  sections: EnrichedSection[];
  processSteps: ProcessStep[];
  stats: NonNullable<CDMOPage['stats']>[number][];
  specs: NonNullable<CDMOPage['specs']>[number][];
  advantages: Advantage[];
}
