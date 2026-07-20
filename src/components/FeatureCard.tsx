'use client';

import { ReactNode, MouseEvent, useRef } from 'react';

interface FeatureCardProps {
  children: ReactNode;
 variant?: 'light' | 'dark';
  className?: string;
}

export default function FeatureCard({
  children,
 variant = 'light',
 className = '',
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
   if (variant !== 'dark' || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
   cardRef.current.style.setProperty('--x', `${x}px`);
  cardRef.current.style.setProperty('--y', `${y}px`);
  };

 if (variant === 'dark') {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
       className={`relative overflow-hidden   dark-glass-card p-6 md:p-8 text-white select-none ${className}`}
      >
        {/* Animated Radial Glow overlay */}
        <div className="absolute inset-0 radial-glow pointer-events-none opacity-100 transition-opacity duration-300" />
        
        {/* Content container */}
       <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
     className={`  border border-neutral-200 bg-white p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
