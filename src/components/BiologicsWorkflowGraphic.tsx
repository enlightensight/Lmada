'use client';

import { withBase } from '@/lib/basePath';
import React from 'react';
import { motion } from 'framer-motion';

interface BiologicsWorkflowGraphicProps {
  /** Image to show; comes from the CMS section's image field. */
  src?: string;
  alt?: string;
}

export default function BiologicsWorkflowGraphic({
  src = '/images/Biologics CDMO Cell Line to Clinical Supply - High res.png',
  alt = 'Integrated Biologics Development and Manufacturing Workflow',
}: BiologicsWorkflowGraphicProps = {}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex items-center justify-center select-none"
    >
      <div className="w-full max-w-[760px] flex items-center justify-center">
        <img
          src={withBase(src)}
          alt={alt}
          className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.015]"
          loading="eager"
        />
      </div>
    </motion.div>
  );
}
