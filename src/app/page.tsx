'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, FlaskConical, Factory, Microscope, Dna, Activity, HeartPulse, Bug, Shield, BookOpen, FileText, Globe, Users, Building2, Award, MapPin, Search, Settings, Package, Scale, Target, GitMerge, Syringe, Calendar, Newspaper, FileDown, Beaker } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-5';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import CinematicCTA from '@/components/CinematicCTA';
import { articles } from '@/data/articles';
import { faqs } from '@/data/faqs';
import AccordionItem from '@/components/AccordionItem';

export default function Home() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Scroll-linked parallax for the Integrated Partner service cards
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });
  // Single shared offset — cards move together, staying aligned in one row
  const cardsY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  const serviceCards = [
    {
      title: 'Development Services',
      icon: FlaskConical,
      image: '/images/benefit_accelerate.png',
      items: [
        { name: 'Cell Line Development', icon: Dna, href: '/services/cell-line' },
        { name: 'Process Development', icon: Activity, href: '/services/process' },
        { name: 'Analytical Development', icon: Search, href: '/services/analytical' },
      ],
      href: '/services/cell-line',
    },
    {
      title: 'Manufacturing Services',
      icon: Factory,
      image: '/images/hero_cleanroom.png',
      items: [
        { name: 'Drug Substance Manufacturing', icon: Beaker, href: '/manufacturing/drug-substance' },
        { name: 'Drug Product Manufacturing', icon: Package, href: '/manufacturing/drug-product' },
      ],
      href: '/manufacturing/drug-substance',
    },
    {
      title: 'Analytical Characterization & Testing',
      icon: Microscope,
      image: '/images/default_analytics.png',
      items: [
        { name: 'Analytical Testing', icon: Search, href: '/characterization/analytical-testing' },
        { name: 'Physicochemical Characterization', icon: Scale, href: '/characterization/physicochemical' },
        { name: 'Bioassays & Immunogenicity Testing', icon: HeartPulse, href: '/characterization/bioassays' },
        { name: 'Microbiological Testing', icon: Bug, href: '/characterization/microbiological' },
      ],
      href: '/characterization/analytical-testing',
    },
  ];

  const modalities = [
    {
      title: 'Monoclonal Antibodies',
      slug: 'mabs',
      desc: 'Platform capabilities for IgG1, IgG2, and IgG4 subclasses.',
      image: '/images/modality_mabs.png',
      icon: Target,
    },
    {
      title: 'Bispecific Antibodies',
      slug: 'bispecifics',
      desc: 'Addressing chain pairing, homodimer, and mispairing challenges.',
      image: '/images/modality_bispecifics.png',
      icon: GitMerge,
    },
    {
      title: 'Antibody-Drug Conjugates',
      slug: 'adcs',
      desc: 'Conjugation process development, DAR characterization, and GMP manufacturing.',
      image: '/images/modality_adcs.png',
      icon: Syringe,
    },
    {
      title: 'Proteins & Peptides',
      slug: 'proteins-peptides',
      desc: 'Recombinant proteins, fusion proteins, and synthetic peptides.',
      image: '/images/modality_proteins.png',
      icon: Dna,
    },
  ];

  const advantages = [
    { title: 'Integrated development, analytical, and manufacturing capabilities', icon: Check },
    { title: 'Purpose-built biologics development and manufacturing facility', icon: Building2 },
    { title: 'Unified quality management system', icon: Shield },
    { title: 'Scalable development and manufacturing approach', icon: Activity },
    { title: 'Global regulatory-focused quality framework', icon: Globe },
    { title: "Backed by Lambda's clinical research and bioanalytical capabilities", icon: Award },
  ];

  const stats = [
    { value: '20k', label: 'Sqm Facility', desc: 'Purpose-built biologics development and manufacturing campus' },
    { value: '25+', label: 'Years Legacy', desc: 'Built on Lambda Therapeutic Research expertise' },
    { value: 'End-to-End', label: 'Integration', desc: 'From cell line development to GMP clinical supply' },
    { value: 'Global', label: 'Regulatory Support', desc: 'Aligned with US, EU, Japan, and Australia expectations' },
  ];

  const locations = [
    { name: 'Toronto', x: '24.4%', y: '16.8%' },
    { name: 'London', x: '46.9%', y: '10.9%' },
    { name: 'Warsaw', x: '52.8%', y: '10.2%' },
    { name: 'Barcelona', x: '47.6%', y: '21.4%' },
    { name: 'Ahmedabad & Mehsana', x: '67.6%', y: '36.4%' },
    { name: 'Las Vegas', x: '15%', y: '25%' },
  ];

  return (
    <div className="relative overflow-hidden pb-0 select-none">
      {/* HERO */}
      <HeroSection />

      {/* AN INTEGRATED PARTNER */}
      <section className="px-6 py-12 md:py-20 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">An Integrated Partner</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15]">
              An Integrated Partner for Biologics Development and Manufacturing
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl mx-auto mt-4">
              Integrated Services Across the Biologics Development Lifecycle - From cell line development to GMP manufacturing, our multidisciplinary teams work together to support every stage of biologics development.
            </p>
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {serviceCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  style={{ y: cardsY }}
                >
                  <div className="h-full bg-white border border-neutral-200 rounded-[10px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-brand-yellow rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                      <Icon className="w-12 h-12 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-6 group-hover:text-brand-yellow transition-colors">
                      {card.title}
                    </h3>
                    <ul className="space-y-4 text-left w-full">
                      {card.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.name}>
                            <Link href={item.href} className="flex items-center gap-4 text-base text-neutral-700 hover:text-brand-yellow transition-colors group/item">
                              <div className="w-12 h-12 bg-brand-blue rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-brand-yellow transition-colors">
                                <ItemIcon className="w-6 h-6 text-white group-hover/item:text-black transition-colors" />
                              </div>
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORTING DIVERSE BIOLOGIC MODALITIES */}
      <section className="px-6 py-12 md:py-20 bg-white border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              <span className="text-brand-yellow">Therapeutic</span> Excellence
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
              Advancing vital therapies across diverse therapeutic areas
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((modal, idx) => {
              const Icon = modal.icon;
              return (
                <motion.div
                  key={modal.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link href={`/modalities/${modal.slug}`} className="group block h-full">
                    <div className="h-full p-6 rounded-[10px] flex flex-col items-center justify-center text-center transition-all duration-300 bg-brand-blue text-white hover:bg-brand-yellow hover:text-black">
                      <Icon className="w-10 h-10 mb-4 opacity-90" />
                      <h3 className="text-lg font-medium">{modal.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAMBDA CDMO ADVANTAGE GRID */}
      <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Advantage</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                <span className="text-brand-yellow">Lambda CDMO</span> Advantage
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Our integrated development and manufacturing platform is designed to support a range of biologic modalities with scientific, analytical, and manufacturing capabilities tailored to each molecule.
              </p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-brand-blue/20" />
              <div className="flex flex-col gap-8">
                {advantages.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div className="relative flex gap-6 md:gap-8 items-start">
                        <div className="relative z-10 w-14 h-14 rounded-[10px] bg-brand-yellow flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-7 h-7 text-black" />
                        </div>
                        <div className="flex-1 bg-white border border-neutral-200 rounded-[10px] p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-black leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE-BUILT FACILITY CTA */}
      <section className="relative px-6 py-12 md:py-16 bg-brand-blue overflow-hidden">
        {/* subtle white grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">Purpose-Built Facility</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.15] mb-4">
                Purpose-Built Facility for <span className="text-brand-yellow">Biologics Development</span> and Manufacturing
              </h2>
              {/* animated yellow underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="h-1 w-24 bg-brand-yellow rounded-full origin-left mb-5"
              />
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Our approximately 20,000 sqm biologics development and manufacturing facility integrates laboratories, GMP manufacturing suites, analytical laboratories, and quality systems designed to support clinical development programs.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex-shrink-0">
            <Link
              href="/overview/facility"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300"
            >
              Explore our Facility
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LAMBDA CDMO ADVANTAGE */}
      <section className="px-6 py-12 md:py-20 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm">
                <img
                  src="/images/theme-antibody.svg"
                  alt="Biosimilar development"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-6">
                  Accelerating Biosimilar Development
                </h2>
                <p className="text-base text-neutral-600 leading-relaxed mb-8">
                  Lambda holds a strong legacy in biosimilar development, covering a broad portfolio of molecules such as Adalimumab, Bevacizumab, Denosumab, Pertuzumab, Rituximab, Daratumumab, Trastuzumab, Trastuzumab Emtansine, Vedolizumab, Ranibizumab, Teriparatide, Aflibercept, Filgrastim, and Pegfilgrastim.
                </p>
                <div className="space-y-4">
                  {advantages.slice(0, 2).map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-[10px] bg-brand-blue shadow-sm">
                        <div className="w-10 h-10 bg-brand-yellow rounded-[10px] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">{item.title.split(',')[0]}</h3>
                          <p className="text-sm text-white/80">{item.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY LAMBDA */}
      <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Why Us</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Why</span> Lambda?
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                We bring together integrated capabilities and global operations to support biotech and pharmaceutical companies across clinical development and resource support needs.
              </p>
            </div>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Center spine (desktop) / left spine (mobile) */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 md:-translate-x-1/2" />

            <div className="flex flex-col gap-8 md:gap-12">
              {stats.map((stat, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <Reveal key={stat.label} delay={idx * 0.05}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Step node */}
                      <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-brand-yellow border-2 border-brand-blue flex items-center justify-center z-10">
                        <span className="text-sm md:text-base font-semibold text-black">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      {/* Card */}
                      <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}>
                        <div className="bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 md:p-8">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-2">
                            {stat.label}
                          </span>
                          <h3 className="text-xl font-semibold text-black mb-2">{stat.value}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{stat.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE-BUILT FACILITY */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <Reveal>
          <article className="group relative bg-white border border-neutral-200 rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-neutral-100">
                <img
                  src="/images/theme-facility.svg"
                  alt="Lambda CDMO facility in Ahmedabad"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-[10px] bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider">
                  Our Facility
                </span>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue">
                    Purpose-Built Facility
                  </span>
                  <span className="h-px flex-1 bg-neutral-200" />
                  <Building2 className="w-4 h-4 text-brand-blue" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5 group-hover:text-brand-blue transition-colors">
                  Purpose-built facility for biologics development and manufacturing
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed mb-8">
                  Our approximately 20,000 sqm biologics development and manufacturing facility integrates laboratories, GMP manufacturing suites, analytical laboratories, and quality systems designed to support clinical development programs.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-[10px]">
                    <div className="text-2xl font-semibold text-brand-blue">20k</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Sqm Campus</div>
                  </div>
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-[10px]">
                    <div className="text-2xl font-semibold text-brand-blue">GMP</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Manufacturing Suites</div>
                  </div>
                </div>
                <Link href="/overview/facility" className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  <span className="w-8 h-0.5 bg-brand-yellow group-hover:w-12 transition-all duration-300" />
                  Explore our Facility
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      {/* FEATURED INSIGHTS */}
      <section className="relative px-6 py-12 md:py-20 bg-white border-y border-neutral-100 overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Insights</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  Featured <span className="text-brand-yellow">Research</span> and Insights
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/insights/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300"
              >
                View all insights
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured big card */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link href="/insights/blogs" className="group relative flex flex-col h-full bg-white border border-neutral-200 rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-[10px] bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-blue mb-3">{articles[0].category}</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3 group-hover:text-brand-blue transition-colors leading-snug">
                    {articles[0].title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-6">{articles[0].subtitle}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{articles[0].date} &middot; {articles[0].readingTime}</span>
                    <span className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-300">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Two stacked horizontal cards */}
            <div className="flex flex-col gap-6">
              {articles.slice(1, 3).map((article, idx) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="flex-1"
                >
                  <Link href="/insights/blogs" className="group relative flex h-full bg-white border border-neutral-200 rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative w-2/5 overflow-hidden bg-neutral-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-blue mb-2">{article.category}</div>
                      <h3 className="text-base md:text-lg font-semibold text-black mb-2 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">{article.subtitle}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xs text-neutral-500">{article.readingTime}</span>
                        <span className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-300">
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR PRESENCE */}
      <section className="px-6 py-12 md:py-20 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Global Reach</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              <span className="text-brand-yellow">Our</span> Presence
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
              We are aggressively expanding globally and are confident in our research initiatives, propelling us toward a trajectory of excellence.
            </p>
          </div>
          <Reveal>
            <div className="relative w-full bg-white border border-neutral-200 rounded-[10px] overflow-hidden shadow-sm">
              {/* World map: blue countries, location countries in yellow */}
              <img
                src="/images/world-map.svg"
                alt="World map with Lambda locations highlighted"
                className="w-full h-auto block"
              />
              {/* Floating count badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-brand-blue text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider">{locations.length} Global Locations</span>
              </div>
              {locations.map((loc, idx) => (
                <motion.div
                  key={loc.name}
                  className="absolute z-10"
                  style={{ left: loc.x, top: loc.y }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: idx * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Location pin in a white badge — visible on both blue and yellow countries */}
                  <div className="relative -translate-x-1/2 -translate-y-1/2 w-9 h-9">
                    <span
                      className="absolute inset-0 rounded-full bg-white opacity-70 animate-ping"
                      style={{ animationDelay: `${idx * 0.3}s` }}
                    />
                    <div className="relative w-9 h-9 bg-white rounded-full border-2 border-brand-blue shadow-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-blue" strokeWidth={2.5} />
                    </div>
                  </div>
                  {/* Label in a white pill for readability over the map */}
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 bg-white/95 border border-neutral-200 rounded-md text-xs font-semibold text-black shadow-md">
                    {loc.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
          {/* Location chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {locations.map((loc, idx) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-brand-blue text-white text-sm font-medium cursor-default hover:bg-brand-yellow hover:text-black transition-colors duration-300 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-brand-yellow group-hover:bg-brand-blue transition-colors duration-300" />
                {loc.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">FAQ</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                <span className="text-brand-yellow">Common</span> Questions
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Answers to questions about process, tech transfers, timelines, and facility validations.
              </p>
              <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                <span className="w-8 h-0.5 bg-brand-yellow group-hover:w-12 transition-all duration-300" />
                Still have questions? Talk to us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <div className="bg-white border border-neutral-200 rounded-[10px] px-6 md:px-8 py-4 shadow-sm">
                {faqs.slice(0, 5).map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqId === faq.id}
                    onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CinematicCTA
        headingLine1="LET'S ADVANCE YOUR"
        headingLine2="NEXT BIOLOGICS PROGRAM"
        subtitle="Whether you're developing an innovator biologic, biosimilar, or next-generation therapeutic, our team is ready to discuss your development and manufacturing requirements."
        ctaLabel="Start a Project"
        ctaHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services/cell-line"
      />
    </div>
  );
}
