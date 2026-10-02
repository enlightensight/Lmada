'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Sparkles,
  Pause,
  Play
} from 'lucide-react';
import type { EquipmentItem } from '@/data/equipmentData';

interface EquipmentCarouselProps {
  items: EquipmentItem[];
  sectionTitle?: string;
  autoPlayInterval?: number;
  className?: string;
  aspectRatio?: string;
}

export default function EquipmentCarousel({
  items,
  sectionTitle,
  autoPlayInterval = 4500,
  className = '',
  aspectRatio = 'aspect-[4/3]',
}: EquipmentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const nextSlide = useCallback(() => {
    if (items.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    if (items.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || !autoPlayEnabled || items.length <= 1 || isLightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayEnabled, autoPlayInterval, items.length, nextSlide, isLightboxOpen]);

  // Keyboard navigation when lightbox is open or focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isLightboxOpen]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <>
      <div
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-[12px] border border-neutral-200/90 shadow-md bg-white group select-none flex flex-col justify-between ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label={`${sectionTitle || 'Equipment'} Showcase Carousel`}
      >
        {/* Subtle grid texture in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none" />

        {/* Top Header Floating Badges */}
        <div className="relative z-20 flex items-center justify-between p-3 sm:p-4 pointer-events-none">
          {currentItem.tag ? (
            <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>{currentItem.tag}</span>
            </span>
          ) : (
            <span className="pointer-events-auto px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-600">
              Equipment
            </span>
          )}

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Slide Index Counter */}
            <span className="px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider shadow-xs">
              {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>

            {/* Lightbox / Zoom Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label="View full resolution image"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black border border-neutral-200 shadow-xs flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Expand full screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Slide Display Area */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-2 sm:p-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(currentItem.src)}
                alt={currentItem.title}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Nav Arrows (Only if multiple images) */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous equipment"
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
              >
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 -translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next equipment"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 backdrop-blur-md shadow-md hover:shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
              >
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 translate-x-0.5" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Slide Info Card & Dots */}
        <div className="relative z-20 bg-gradient-to-t from-slate-50 via-white/95 to-white/70 backdrop-blur-md border-t border-neutral-200/80 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-[15px] font-bold text-neutral-900 leading-snug truncate">
                {currentItem.title}
              </h4>
              {currentItem.subtitle && (
                <p className="text-xs text-neutral-600 font-normal leading-tight truncate mt-0.5">
                  {currentItem.subtitle}
                </p>
              )}
            </div>

            {/* Play/Pause Button */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => setAutoPlayEnabled((prev) => !prev)}
                aria-label={autoPlayEnabled ? 'Pause slideshow' : 'Play slideshow'}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors shrink-0 cursor-pointer"
                title={autoPlayEnabled ? 'Pause autoplay' : 'Resume autoplay'}
              >
                {autoPlayEnabled ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{autoPlayEnabled ? 'Auto' : 'Paused'}</span>
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-1 overflow-x-auto py-0.5 max-w-full">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`Jump to ${item.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? 'w-6 sm:w-7 h-2 bg-brand-blue shadow-xs shadow-brand-blue/30'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  title={item.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                <div className="min-w-0 flex-1 pr-4">
                  {currentItem.tag && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue/10 text-brand-blue mb-1">
                      {currentItem.tag}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 truncate">
                    {currentItem.title}
                  </h3>
                  {currentItem.subtitle && (
                    <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                      {currentItem.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-neutral-500 bg-neutral-200/70 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    aria-label="Close modal"
                    className="w-9 h-9 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Stage */}
              <div className="relative flex-1 w-full min-h-[300px] sm:min-h-[450px] p-6 sm:p-10 flex items-center justify-center bg-radial from-slate-50 to-neutral-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(currentItem.src)}
                  alt={currentItem.title}
                  className="max-h-[60vh] max-w-full object-contain drop-shadow-xl"
                />

                {/* Modal Navigation Arrows */}
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6 translate-x-0.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {items.length > 1 && (
                <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center gap-2 overflow-x-auto">
                  {items.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`relative w-16 h-12 rounded-lg border-2 overflow-hidden shrink-0 bg-white p-1 transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-105'
                          : 'border-neutral-200 opacity-60 hover:opacity-100'
                      }`}
                      title={thumb.title}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeURI(thumb.src)}
                        alt={thumb.title}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
