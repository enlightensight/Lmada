'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchModal from '@/components/SearchModal';

interface NavSearchBarProps {
  className?: string;
  placeholder?: string;
}

export default function NavSearchBar({
  className = '',
  placeholder = 'Search...',
}: NavSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect Mac for keyboard shortcut indicator
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }

    // Global shortcut Cmd+K or Ctrl+K or '/'
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative flex items-center justify-between gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200/90 hover:border-neutral-300 text-slate-500 hover:text-neutral-900 transition-all duration-200 cursor-pointer shadow-2xs ${className}`}
        aria-label="Search website"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors shrink-0" />
          <span className="text-[14px] font-light md:font-normal text-slate-400 group-hover:text-neutral-700 truncate select-none">
            {placeholder}
          </span>
        </div>
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-neutral-200/80 rounded-md shadow-2xs group-hover:border-neutral-300 group-hover:text-slate-600 transition-colors">
          <span>{isMac ? '⌘' : 'Ctrl'}</span>
          <span>K</span>
        </kbd>
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
