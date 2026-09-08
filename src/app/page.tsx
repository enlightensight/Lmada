'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, Factory, Microscope, Dna, Activity, HeartPulse, Bug, ShieldCheck, Gauge, BookOpen, FileText, Globe, Users, Building2, Search, Settings, Package, Scale, Calendar, Newspaper, FileDown, Beaker } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-5';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import IntegratedTimeline from '@/components/IntegratedTimeline';
import { articles } from '@/data/articles';
import { faqs } from '@/data/faqs';
import FAQSection from '@/components/FAQSection';
import { getStepIcon } from '@/lib/stepIcon';

export default function Home() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const serviceCards = [
    {
      title: 'Development Services',
      step: '01 — Development',
      desc: 'Cell line engineering, upstream and downstream process development, and analytical development built for scale-up and regulatory readiness.',
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
      step: '02 — Manufacturing',
      desc: 'cGMP drug substance and drug product manufacturing in purpose-built cleanroom suites, designed for clinical supply.',
      icon: Factory,
      image: '/images/CDMOblue.png',
      items: [
        { name: 'Drug Substance Manufacturing', icon: Beaker, href: '/manufacturing/drug-substance' },
        { name: 'Drug Product Manufacturing', icon: Package, href: '/manufacturing/drug-product' },
      ],
      href: '/manufacturing/drug-substance',
    },
    {
      title: 'Analytical Characterization & Testing',
      step: '03 — Characterization',
      desc: 'Orthogonal physicochemical characterization, bioassays, and QC microbiology under a unified quality system.',
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
      image: '/images/Monoclonal_Antibodies.png',
    },
    {
      title: 'Bispecific Antibodies',
      slug: 'bispecifics',
      desc: 'Addressing chain pairing, homodimer, and mispairing challenges.',
      image: '/images/Bispecific_Antibodies.png',
    },
    {
      title: 'Antibody-Drug Conjugates',
      slug: 'adcs',
      desc: 'Conjugation process development, DAR characterization, and GMP manufacturing.',
      image: '/images/Antibody-Drug_Conjugates.png',
    },
    {
      title: 'Proteins & Peptides',
      slug: 'proteins-peptides',
      desc: 'Recombinant proteins, fusion proteins, and synthetic peptides.',
      image: '/images/Proteins_%26_Peptides.png',
    },
  ];

  const advantages = [
    { title: 'Integrated development, analytical, and manufacturing capabilities', icon: Dna },
    { title: 'Purpose-built biologics development and manufacturing facility', icon: Factory },
    { title: 'Unified quality management system', icon: ShieldCheck },
    { title: 'Scalable development and manufacturing approach', icon: Gauge },
    { title: 'Global regulatory-focused quality framework', icon: Globe },
    { title: "Backed by Lambda's clinical research and bioanalytical capabilities", icon: Microscope },
  ];

  const steps = [
    { title: 'Requirement Definition', desc: 'Aligning on project scale, modality specifications, and clinical timelines.' },
    { title: 'Technical Scaffolding', desc: 'Formulating standard operating procedures and custom batch release criteria.' },
    { title: 'Execution & Analysis', desc: 'Running development, manufacturing campaigns, or characterization protocols.' },
    { title: 'QA Release Package', desc: 'Providing full technical summaries and data logs to support regulatory filings.' },
  ];

  return (
    <div className="relative overflow-hidden pb-0 select-none">
      {/* HERO */}
      <HeroSection />

      {/* INTEGRATED BIOLOGICS DEVELOPMENT, MANUFACTURING AND CLINICAL SUPPORT TIMELINE */}
      <IntegratedTimeline />

      {/* AN INTEGRATED PARTNER */}
      <section id="an-integrated-partner" className="scroll-mt-20 lg:scroll-mt-24 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15]">
              An Integrated Partner for Biologics Development and Manufacturing
            </h2>
            <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-3xl mx-auto mt-4">
              Integrated Services Across the Biologics Development Lifecycle - From cell line development to GMP manufacturing, our multidisciplinary teams work together to support every stage of biologics development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {serviceCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: 'easeOut' }}
                className="h-full"
              >
                <div className="group h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
                  {/* Photo header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/10 to-transparent" />
                  </div>
                  {/* Body */}
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <div className="min-h-[110px] md:min-h-[120px] mb-5">
                      <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-brand-blue transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[15px] text-neutral-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                    <ul className="border-t border-neutral-100 pt-1">
                      {card.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.name} className="border-b border-neutral-100 last:border-0">
                            <Link
                              href={item.href}
                              className="group/link flex items-center justify-between gap-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-brand-blue transition-colors"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/link:bg-brand-blue group-hover/link:border-brand-blue transition-colors duration-200">
                                  <ItemIcon className="w-4 h-4 text-brand-blue group-hover/link:text-white transition-colors duration-200" />
                                </div>
                                <span className="truncate group-hover/link:text-brand-blue transition-colors">{item.name}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 flex-shrink-0 text-brand-yellow group-hover/link:text-brand-blue group-hover/link:translate-x-1 transition-all" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SUPPORTING DIVERSE BIOLOGIC MODALITIES */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              <span className="text-black">Platform Capabilities for</span> Next-Generation Biologics
            </h2>
            <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-3xl mx-auto mt-4">
              Lambda CDMO is building platform capabilities to support the development and manufacture of diverse biologic modalities. Our integrated approach combines development, analytical characterization, quality systems, and GMP manufacturing to address the unique scientific and regulatory requirements of each modality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((modal, idx) => (
              <motion.div
                key={modal.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/modalities/${modal.slug}`} className="group block h-full">
                  <div className="h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      <img
                        src={modal.image}
                        alt={modal.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-black group-hover:text-brand-blue transition-colors">
                        {modal.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LAMBDA CDMO ADVANTAGE GRID */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules border-y border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                <span className="text-black">Lambda CDMO</span> Advantage
              </h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">
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
                        <div className="relative z-10 w-14 h-14 rounded-[10px] bg-white border-2 border-brand-blue flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-7 h-7 text-brand-blue" />
                        </div>
                        <div className="flex-1 glass-card rounded-[10px] p-6 shadow-sm">
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

      {/* PURPOSE-BUILT FACILITY */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 w-full">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <article className="group relative glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-neutral-100">
                  <img
                    src="/images/development.jpg"
                    alt="Lambda CDMO facility in Ahmedabad"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow">
                      Purpose-Built Facility
                    </span>
                    <span className="h-px flex-1 bg-neutral-200" />
                    <Building2 className="w-4 h-4 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5 group-hover:text-brand-blue transition-colors">
                    Purpose-built facility for biologics development and manufacturing
                  </h3>
                  <p className="text-[17px] text-neutral-600 leading-relaxed mb-8">
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
        </div>
      </section>



      {/* FEATURED INSIGHTS */}
      <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100 overflow-hidden">
        <div className="relative w-full max-w-[1700px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  Featured <span className="text-black">Research</span> and Insights
                </h2>
                <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed max-w-2xl mt-4">
                  Explore the latest perspectives from our scientists — blogs, news, and upcoming events.
                </p>
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
              <Link href="/insights/blogs" className="group relative flex flex-col h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={articles[0].image}
                    alt={articles[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-3">{articles[0].category}</div>
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
                  <Link href="/insights/blogs" className="group relative flex h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-10" />
                    <div className="relative w-2/5 overflow-hidden bg-neutral-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow mb-2">{article.category}</div>
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

      {/* FAQ */}
      <FAQSection faqs={faqs.slice(0, 5)} />

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              <span className="text-brand-blue">Ready</span> to advance your biologics program?
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-8">
              Connect with our scientific team to discuss your development and manufacturing requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                Get in touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/overview/about"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                About Lambda CDMO
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
