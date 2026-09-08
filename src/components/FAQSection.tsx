'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import AccordionItem from '@/components/AccordionItem';

export interface FAQItem {
  id?: string | number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  faqs,
  title = 'Common Questions',
  subtitle = 'Answers to questions about process, tech transfers, timelines, and facility validations.',
}: FAQSectionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const [firstWord, ...remainingWords] = title.split(' ');

  return (
    <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 w-full border-t border-neutral-100">
      <div className="w-full max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                <span className="text-black">{firstWord}</span>
                {remainingWords.length > 0 ? ` ${remainingWords.join(' ')}` : ''}
              </h2>
              <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed mb-6">
                {subtitle}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
              >
                <span className="w-8 h-0.5 bg-brand-yellow group-hover:w-12 transition-all duration-300" />
                Still have questions? Talk to us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="glass-card rounded-[10px] px-6 md:px-8 py-4 shadow-sm">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={faq.id || idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIdx === idx}
                    onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
