'use client';

import Link from 'next/link';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/insights/blogs/${article.slug}`}
      className="group block w-full select-none"
    >
     <div className="relative overflow-hidden rounded-[10px] border border-neutral-200 bg-neutral-100 aspect-[16/10] shadow-sm hover:shadow-md transition-all duration-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          style={{ filter: 'contrast(1.08) brightness(0.97) saturate(1.04) hue-rotate(5deg)' }}
        />
        {/* Cold Bluish Scientific Color Grade Wash */}
        <div className="absolute inset-0 bg-[#0099e6]/14 pointer-events-none mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1b2a]/30 via-transparent to-[#00aeef]/18 pointer-events-none mix-blend-soft-light" />
      </div>
      
     <div className="mt-4 px-1">
        {/* Meta Info */}
       <div className="text-[10px] md:text-xs tracking-widest font-semibold uppercase flex items-center gap-1.5 mb-1.5">
         <span className="text-brand-blue">{article.category}</span>
         <span className="text-neutral-300">•</span>
         <span className="text-neutral-400">{article.readingTime}</span>
        </div>
        
        {/* Title */}
       <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-neutral-900 leading-snug group-hover:opacity-80 transition-opacity">
          {article.title}
        </h3>
        
        {/* Brief description */}
       <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">
          {article.subtitle}
        </p>
      </div>
    </Link>
  );
}
