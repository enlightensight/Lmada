'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  FileText,
  Newspaper,
  X,
  Clock,
  CheckCircle2,
  Tag,
  Share2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { insightsData, INSIGHT_TABS, type InsightItem } from '@/data/insightsData';

interface InsightsLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const TAB_ICONS = {
  BookOpen,
  FileText,
  Download,
  Newspaper,
  Calendar,
};

export default function InsightsLayout({ page }: InsightsLayoutProps) {
  // Active category slug derived or selected by user
  const [userSelectedTab, setUserSelectedTab] = useState<string | null>(null);
  const activeTab = userSelectedTab ?? (INSIGHT_TABS.some((t) => t.slug === page.slug) ? page.slug : 'blogs');

  // State for interactive article reader modal
  const [selectedArticle, setSelectedArticle] = useState<InsightItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };

    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  // Switch tabs and update browser URL without full reload
  const handleTabChange = (slug: string) => {
    setUserSelectedTab(slug);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/insights/${slug}`);
    }
  };

  const currentTabConfig = INSIGHT_TABS.find((t) => t.slug === activeTab) || INSIGHT_TABS[0];
  const items = insightsData[activeTab] || [];
  const [featuredItem, ...supportingItems] = items;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      {/* TOP HEADER & BREADCRUMBS (Hero completely removed as requested) */}
      <section className="pt-24 md:pt-28 pb-6 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 bg-white border-b border-neutral-200">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-neutral-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-500 font-medium">Insights</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-brand-orange font-semibold">{currentTabConfig.label}</span>
          </div>

          {/* Title & Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/5 text-brand-navy text-[11px] font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                <span>Scientifically Proven Biologics Intelligence</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
                Lambda <span className="font-normal text-brand-navy">Insights</span>
              </h1>
              <p className="mt-2 text-base md:text-lg text-slate-600 max-w-3xl font-normal leading-relaxed">
                {currentTabConfig.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-medium tracking-wide">
                Peer-Reviewed Dossiers
              </span>
            </div>
          </div>

          {/* 5 TABS NAVIGATION BAR (matching dropdown options) */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {INSIGHT_TABS.map((tab) => {
                const IconComponent = TAB_ICONS[tab.icon as keyof typeof TAB_ICONS] || FileText;
                const isActive = activeTab === tab.slug;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.slug)}
                    className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-sm sm:text-[15px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/15 scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80 hover:text-black'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-brand-orange' : 'text-slate-500 group-hover:text-brand-blue'
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA: 1 FEATURED STORY + 4 SUPPORTING CONTENT CARDS */}
      <main className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16">
        <div className="w-full max-w-[1700px] mx-auto space-y-12">
          {/* SECTION 1: FEATURED STORY BANNER (Matching User Image 2 Design) */}
          {featuredItem && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {currentTabConfig.label}
                </h2>
                <div className="w-12 h-0.5 bg-brand-orange mx-auto mt-2" />
              </div>

              <article
                onClick={() => setSelectedArticle(featuredItem)}
                className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Accent top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-orange" />

                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Column: Image with cold blue cleanroom/analytical treatment */}
                  <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[440px] overflow-hidden bg-neutral-100">
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-md backdrop-blur-sm border border-white/50">
                        {featuredItem.badge}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Editorial metadata, title, and CTA */}
                  <div className="lg:col-span-7 p-8 sm:p-10 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-white to-neutral-50/50">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-orange">
                          EDITORIAL
                        </span>
                        <span className="h-px flex-1 bg-neutral-200" />
                        <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-brand-blue" />
                          {featuredItem.readTime}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.2] group-hover:text-brand-blue transition-colors">
                        {featuredItem.title}
                      </h3>

                      <p className="mt-4 text-base sm:text-[17px] text-slate-600 font-normal leading-relaxed line-clamp-3">
                        {featuredItem.summary}
                      </p>

                      {/* Key Takeaways snippet */}
                      <div className="mt-6 pt-5 border-t border-neutral-100 space-y-2">
                        {featuredItem.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy font-semibold text-xs">
                          {featuredItem.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 leading-none">
                            {featuredItem.author.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{featuredItem.author.role}</p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-hover transition-colors">
                        <span className="w-6 h-0.5 bg-brand-orange group-hover:w-10 transition-all duration-300" />
                        <span>Read the full story</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* SECTION 2: 4 SUPPORTING CONTENT CARDS (2x2 Grid) */}
          {supportingItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight">
                    More in {currentTabConfig.label}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Peer-reviewed methodologies and validated technical reports
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Technical Reports
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {supportingItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy shadow-md border border-white/40">
                          {item.badge}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-sm">
                          {item.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="text-brand-orange font-semibold">{item.author.name}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-light md:font-normal text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm text-slate-600 font-normal leading-relaxed line-clamp-3">
                          {item.summary}
                        </p>

                        {/* Top Key Takeaway */}
                        {item.keyTakeaways[0] && (
                          <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-100 text-xs text-slate-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                            <span className="line-clamp-2 font-medium">{item.keyTakeaways[0]}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-slate-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue group-hover:translate-x-1 transition-transform">
                          <span>Read full article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* INTERACTIVE SCIENTIFIC READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-auto flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-navy text-white">
                  {selectedArticle.badge}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-slate-500 hover:text-black hover:bg-neutral-100 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
                  title="Copy article link"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-lg text-slate-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
              {/* Article Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight leading-[1.2]">
                  {selectedArticle.title}
                </h2>
                <p className="mt-3 text-lg text-slate-600 font-normal leading-relaxed">
                  {selectedArticle.detailedContent.subtitle}
                </p>

                {/* Author Credentials */}
                <div className="mt-6 flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {selectedArticle.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {selectedArticle.author.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedArticle.author.role}</p>
                    <p className="text-[11px] text-brand-orange font-semibold uppercase tracking-wider mt-1">
                      Lambda CDMO Biologics Science & Technology
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Banner Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-200">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Executive Abstract Box */}
              <div className="p-6 rounded-xl bg-blue-50/70 border-l-4 border-brand-blue">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  Executive Abstract & Technical Scope
                </h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {selectedArticle.detailedContent.abstract}
                </p>
              </div>

              {/* Key Takeaways Highlights */}
              <div className="p-6 rounded-xl bg-neutral-50 border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
                  Key Quantitative Takeaways
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Scientific Sections */}
              <div className="space-y-8 pt-4">
                {selectedArticle.detailedContent.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 tracking-tight">
                      {section.heading}
                    </h3>

                    {section.body.map((p, pIdx) => (
                      <p key={pIdx} className="text-base text-slate-700 font-normal leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Callout Box if present */}
                    {section.callout && (
                      <div className="my-5 p-5 rounded-xl bg-gradient-to-r from-neutral-900 to-brand-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase font-bold tracking-wider text-brand-orange">
                            {section.callout.title}
                          </p>
                          <p className="text-sm text-neutral-200 mt-1 font-normal">
                            {section.callout.text}
                          </p>
                        </div>
                        {section.callout.metric && (
                          <div className="shrink-0 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-xl font-bold text-brand-orange tracking-tight">
                            {section.callout.metric}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scientific Table if present */}
                    {section.table && (
                      <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200 shadow-sm">
                        {section.table.caption && (
                          <div className="bg-neutral-100/80 px-4 py-2.5 text-xs font-bold text-neutral-800 border-b border-neutral-200">
                            {section.table.caption}
                          </div>
                        )}
                        <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                          <thead className="bg-neutral-50 text-neutral-900 uppercase font-semibold text-[11px] tracking-wider border-b border-neutral-200">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}>
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-4 py-3 ${
                                      cIdx === 0 ? 'font-semibold text-neutral-900' : 'text-slate-600'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Methodology Highlights */}
              <div className="p-6 rounded-xl bg-neutral-100/70 border border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Validated Methodology & Instrumentation
                </h4>
                <ul className="space-y-2">
                  {selectedArticle.detailedContent.methodologyHighlights.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-2" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Impact */}
              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs sm:text-sm text-amber-950">
                <span className="font-bold uppercase tracking-wider text-[11px] block mb-1 text-amber-900">
                  Regulatory & Filing Significance:
                </span>
                <p className="font-normal leading-relaxed">
                  {selectedArticle.detailedContent.regulatoryImpact}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-200">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Indexed Under:
                </span>
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-slate-700 border border-neutral-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Sticky CTA */}
            <div className="sticky bottom-0 bg-neutral-50 px-6 sm:px-8 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-600 text-center sm:text-left">
                Need to discuss experimental data, scale-up protocols, or tech transfer for your molecule?
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-black border border-neutral-300 hover:bg-white transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange-hover text-white transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <span>Connect With Our Scientists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBSCRIBE / STAY INFORMED CTA SECTION WITH BACKGROUND VIDEO */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24">
        <video
          src="/videos/Floating-Molecule-Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/65 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-orange items-center justify-center mb-6 shadow-lg shadow-brand-orange/20">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.15] mb-4">
              Partner with Lambda CDMO for <span className="font-normal text-white">Proven Scientific Execution</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Connect with our technical team in Ahmedabad to discuss cell line development, analytical characterization, single-use manufacturing, and regulatory filing support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-medium text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                Inquire With Scientific Leadership
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/30 text-white hover:bg-white hover:text-brand-navy font-medium text-sm uppercase tracking-wider transition-all"
              >
                Virtual Tour
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
