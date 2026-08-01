import {
  Dna,
  Atom,
  Filter,
  FlaskConical,
  ShieldCheck,
  GitMerge,
  Sprout,
  Factory,
  Syringe,
  TestTubes,
  Microscope,
  Beaker,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a process-step title to a relevant scientific icon.
 * Used by workflow sections across all page layouts so each step
 * carries a topic-appropriate icon instead of a plain number.
 */
export function getStepIcon(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes('codon') || t.includes('gene') || t.includes('sequence')) return Dna;
  if (t.includes('cell line') || t.includes('cell bank')) return Atom;
  if (t.includes('seed') || t.includes('expansion')) return Sprout;
  if (t.includes('bioprocess') || t.includes('upstream')) return FlaskConical;
  if (t.includes('purif') || t.includes('downstream')) return Filter;
  if (t.includes('transfer')) return GitMerge;
  if (t.includes('cleanroom') || t.includes('production') || t.includes('manufactur') || t.includes('gmp')) return Factory;
  if (t.includes('fill') || t.includes('aseptic')) return Syringe;
  if (t.includes('scaffold') || t.includes('sop')) return TestTubes;
  if (t.includes('assessment') || t.includes('requirement') || t.includes('review')) return Dna;
  if (t.includes('feasibility') || t.includes('media') || t.includes('screen')) return FlaskConical;
  if (t.includes('valid')) return ShieldCheck;
  if (t.includes('analysis') || t.includes('analytical') || t.includes('execution') || t.includes('method')) return Microscope;
  if (t.includes('release') || t.includes('dossier') || t.includes('package') || t.includes('qa')) return ShieldCheck;
  return Beaker;
}
