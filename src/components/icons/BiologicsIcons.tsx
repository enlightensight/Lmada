import React from 'react';

// Petri dish / microorganisms icon
export function PetriDishIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="8" cy="9" r="1.2" fill="currentColor" />
      <circle cx="12.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11.5" r="1.2" fill="currentColor" />
      <circle cx="10" cy="14" r="1.6" fill="currentColor" />
      <circle cx="14.5" cy="15.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

// Antibody-Drug Conjugate (ADC) icon: Y-shaped antibody body with conjugated drug payloads
export function AntibodyPayloadIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 21v-8.5m0 0L6.5 6m5.5 6.5l5.5-6.5" />
      <path d="M4.5 4.5l3 3m12-3l-3 3" />
      <circle cx="4.5" cy="4.5" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="4.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Protein / peptide chain icon: connected amino acid beads on a chain
export function PeptideChainIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="5" cy="7" r="2.2" />
      <circle cx="11" cy="5.5" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="19" cy="14.5" r="2.2" />
      <circle cx="13" cy="17" r="2.2" />
      <circle cx="7" cy="15" r="2.2" />
      <path d="M7.2 6.5l1.6-.5m4.4.5l1.6 1m1.4 3.5l.5 1.5m-2 3l-1.8.8m-4.2-.8l-2-.8" />
    </svg>
  );
}
