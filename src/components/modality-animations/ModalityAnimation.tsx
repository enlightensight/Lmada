'use client';

import React from 'react';
import MAbModalityAnimation from './MAbModalityAnimation';
import BispecificModalityAnimation from './BispecificModalityAnimation';
import ADCModalityAnimation from './ADCModalityAnimation';
import ProteinPeptideModalityAnimation from './ProteinPeptideModalityAnimation';

interface ModalityAnimationProps {
  slug: string;
}

export default function ModalityAnimation({ slug }: ModalityAnimationProps) {
  switch (slug) {
    case 'mabs':
      return <MAbModalityAnimation />;
    case 'bispecifics':
      return <BispecificModalityAnimation />;
    case 'adcs':
      return <ADCModalityAnimation />;
    case 'proteins-peptides':
      return <ProteinPeptideModalityAnimation />;
    default:
      return <MAbModalityAnimation />;
  }
}
