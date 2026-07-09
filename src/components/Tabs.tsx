'use client';

import { motion } from 'framer-motion';

interface TabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

export default function Tabs({
  categories,
  activeCategory,
  onChange,
  className = '',
}: TabsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-1.5 md:gap-2.5 pb-6 border-b border-neutral-100 select-none ${className}`}>
      {categories.map((category) => {
        const isActive = category === activeCategory;
        
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {/* Active background capsule indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-brand-blue rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Label */}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
