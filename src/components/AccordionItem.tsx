'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0 py-4 select-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-left focus:outline-none group cursor-pointer"
      >
        <span className={`text-base md:text-lg font-semibold transition-colors ${isOpen ? 'text-brand-blue' : 'text-black group-hover:text-brand-blue'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`flex-shrink-0 ml-4 w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? 'bg-brand-yellow text-black'
              : 'bg-brand-blue text-white group-hover:bg-brand-yellow group-hover:text-black'
          }`}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: 'easeOut' },
                opacity: { duration: 0.25, delay: 0.05 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: 'easeIn' },
                opacity: { duration: 0.15 }
              }
            }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-neutral-600 pt-2 pb-4 leading-relaxed font-normal border-l-2 border-brand-yellow pl-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
