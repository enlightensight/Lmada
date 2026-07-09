'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, motion as framerMotion } from 'framer-motion';
import { ArrowRight, Check, ArrowUpRight, Shield, Database, Cpu, Award } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import ServicesTabs from '@/components/ServicesTabs';
import AccordionItem from '@/components/AccordionItem';
import { faqs } from '@/data/faqs';
import CinematicCTA from '@/components/CinematicCTA';
import Parallax3DCard from '@/components/Parallax3DCard';
import ScrollZigzagLine from '@/components/ScrollZigzagLine';
import { HeroSection } from '@/components/ui/hero-section-5';

export default function Home() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Client partner logos/texts
  const clients = ['Biotech Innovators', 'Therapeutics Labs', 'BioPharma Global', 'GeneScaffolds', 'OncoMabs Inc.', 'Estonia BioLink'];

  // Modalities List
  const modalities = [
    {
      title: 'Monoclonal Antibodies',
      slug: 'mabs',
      desc: 'Process science and GMP production for IgG1, IgG2, and IgG4 antibody classes.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Bispecific Antibodies',
      slug: 'bispecifics',
      desc: 'Solving mispairing and chain assembly challenges with tailored downstream recovery.',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Antibody-Drug Conjugates',
      slug: 'adcs',
      desc: 'DAR ratio mapping and high-resolution payload distribution analysis validation.',
      image: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Proteins & Peptides',
      slug: 'proteins-peptides',
      desc: 'Custom Upstream expressions and analytical profiling of novel recombinant formats.',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="relative overflow-hidden pb-20 select-none">
      {/* Scroll-linked Winding Vector Line Background */}
      <ScrollZigzagLine />
      
      {/* 0. NEW HERO SECTION */}
      <HeroSection />
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-8 pb-24 md:pt-12 md:pb-32 max-w-[1400px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[580px] shadow-sm">
          {/* Background grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Left Column: Copy details */}
          <div className="lg:col-span-7 relative z-10 flex flex-col justify-center">
            <div className="mb-4">
              <Badge>Contract Development & Manufacturing Organization</Badge>
            </div>
            {/* Title / Heading */}
            <framerMotion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
              className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.05]"
            >
              Integrated Solutions for Biologics Development
              <framerMotion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block text-brand-blue font-normal mt-2 text-xl sm:text-2xl lg:text-3xl"
              >
                Accelerating Clinical FIH Trials
              </framerMotion.span>
            </framerMotion.h1>

            {/* Sub/Body text */}
            <framerMotion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
              className="text-sm sm:text-base text-muted font-normal mt-6 max-w-xl leading-relaxed"
            >
              Serving as a dedicated global partner for biologics drug development, cGMP manufacturing, and IND-enabling clinical trial batches.
            </framerMotion.p>

            {/* Action CTAs */}
            <framerMotion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Button href="/services/cell-line" variant="primary">
                Explore Services
              </Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </framerMotion.div>

            {/* Metrics Row */}
            <framerMotion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 border-t border-neutral-200/80 mt-12 pt-8"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">20k</div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-400 uppercase mt-1">Sqft GMP Facility</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">FIH</div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-400 uppercase mt-1">First In Human Ready</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900">Global</div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-400 uppercase mt-1">IND Regulations Support</div>
              </div>
            </framerMotion.div>
          </div>

          {/* Right Column: Large portrait image */}
          <div className="lg:col-span-5 relative h-full w-full flex items-center justify-center">
            <framerMotion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-200"
            >
              <img
                src="/images/hero_cleanroom.png"
                alt="Lambda Laboratory cleanroom"
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Floating Capacity Card */}
              <framerMotion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-4 left-4 right-4 bg-neutral-955/90 backdrop-blur-md border border-white/10 p-4 rounded-xl text-white shadow-xl flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-semibold tracking-widest text-neutral-400 uppercase font-mono">Available slots</span>
                  </div>
                  <h4 className="text-xs font-serif font-medium">GMP Batch Capacity</h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1 max-w-[200px]">Booking for Q2/Q3 2026 clinic trials.</p>
                </div>
                <Link
                  href="/contact"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </framerMotion.div>
            </framerMotion.div>
          </div>
        </div>

        {/* Logo Cloud ribbon */}
        <framerMotion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 overflow-hidden py-4 border-b border-neutral-200/50"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:justify-between px-4">
            {clients.map((client) => (
              <span
                key={client}
                className="font-serif text-sm font-semibold tracking-tight text-neutral-400 select-none hover:text-brand-orange transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </framerMotion.div>
      </section>

      {/* 2. BENEFITS SECTION (THE THREE PILLARS) */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeader
            badge="The Pillars of Engagement"
            title="Accelerate, Simplify, and Succeed"
            description="Our flexible capacity and equipment trains, combined with our agile, collaborative approach, accelerate clinical timelines and reduce technical risks."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Benefit Card 1 (Left: Animates Leftward from center) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          >
            <FeatureCard>
              <div className="relative aspect-[4/3] rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/benefit_accelerate.png"
                  alt="Biotechnology Cell Culture"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-neutral-900 mb-2">Accelerate</h3>
                <p className="text-sm text-muted leading-relaxed">Advance your biologics project from gene concept to clinical trials with our streamlined process science and vector workflows.</p>
              </div>
            </FeatureCard>
          </motion.div>

          {/* Benefit Card 2 (Center: Animates Upward) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          >
            <FeatureCard>
              <div className="relative aspect-[4/3] rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero_cleanroom.png"
                  alt="Bioprocessing Facility"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-neutral-900 mb-2">Simplify</h3>
                <p className="text-sm text-muted leading-relaxed">Simplifying complex tech transfers and cell line processes to enhance yield efficiency and reduce operational client overheads.</p>
              </div>
            </FeatureCard>
          </motion.div>

          {/* Benefit Card 3 (Right: Animates Rightward from center) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
          >
            <FeatureCard>
              <div className="relative aspect-[4/3] rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/benefit_succeed.png"
                  alt="Quality Assurance lab"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium text-neutral-900 mb-2">Succeed</h3>
                <p className="text-sm text-muted leading-relaxed">Achieve your development goals with our tailored analytical methodologies and expert regulatory filing support.</p>
              </div>
            </FeatureCard>
          </motion.div>
        </div>
      </section>

      {/* 3. SELECTED MODALITIES (Replaces Selected Work) */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeader
            badge="Biologics Modalities"
            title="Biotherapeutic pipelines with clarity"
            description="Proven platform methods and process sciences optimized for lead molecule formats."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mt-10">
          {modalities.map((modal, idx) => (
            <motion.div
              key={modal.slug}
              initial={{ opacity: 0, x: idx % 2 === 0 ? 80 : -80, y: 32 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1], delay: idx * 0.05 }}
              className="w-full h-full"
            >
              <Parallax3DCard className="w-full h-full">
                <Link href={`/modalities/${modal.slug}`} className="group block select-none cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={modal.image}
                      alt={modal.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="flex items-center justify-between mt-4 px-1">
                    <div>
                      <h3 className="text-xl font-serif font-medium text-neutral-900 transition-colors group-hover:text-brand-orange">
                        {modal.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 font-sans">{modal.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-800 bg-white group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </Parallax3DCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE ME SECTION (WHY CHOOSE LAMBDA) */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-baseline mb-12 border-b border-neutral-200 pb-10">
            <div className="lg:col-span-5">
              <Badge className="mb-4">Why choose Lambda</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.15]">
                Process sciences shaped around lasting quality
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
                We bring together advanced technology, global GMP compliance, and an agile, scientific team to accelerate early-phase clinical batches.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
          {/* Asymmetrical Bento Grid */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Card 1 (Top Left): Drops down first */}
            <motion.div
              initial={{ opacity: 0, y: -64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
            >
              <FeatureCard className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-brand-blue rounded-full" />
                  <span className="text-[10px] tracking-widest font-semibold text-neutral-400 uppercase font-mono">Expertise</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-medium text-neutral-900 leading-snug">
                  Co-development focus aligned with accelerated IND timelines.
                </h3>
              </FeatureCard>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {/* Card 2 (Middle Left): Drops down second */}
              <motion.div
                initial={{ opacity: 0, y: -64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.25 }}
              >
                <FeatureCard className="text-center flex flex-col justify-center items-center py-8">
                  <span className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-1">100%</span>
                  <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase font-mono">IP & Data Integrity</span>
                </FeatureCard>
              </motion.div>

              {/* Card 3 (Middle Right): Drops down third */}
              <motion.div
                initial={{ opacity: 0, y: -64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.4 }}
              >
                <FeatureCard className="text-center flex flex-col justify-center items-center py-8">
                  <span className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-1">20k</span>
                  <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase font-mono">Sqft CDMO Facility</span>
                </FeatureCard>
              </motion.div>
            </div>
            
            {/* Card 4 (Bottom Left): Drops down last in the left column */}
            <motion.div
              initial={{ opacity: 0, y: -64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.55 }}
            >
              <FeatureCard className="flex flex-row items-center gap-3 py-5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-neutral-800 tracking-wider uppercase font-mono">Booking batch runs for mid-2026</span>
              </FeatureCard>
            </motion.div>
          </div>

          {/* Card 5 (Right Column): Drops down in parallel after first card */}
          <div className="md:col-span-5 h-full">
            <motion.div
              initial={{ opacity: 0, y: -64 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }}
              className="h-full"
            >
              <FeatureCard variant="dark" className="h-full flex flex-col justify-between min-h-[340px]">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1 text-white opacity-80">
                    <Shield className="w-5 h-5" />
                    <Database className="w-5 h-5" />
                    <Cpu className="w-5 h-5" />
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-white leading-tight">
                    We help developers, biotechnology startups, and clinical teams turn therapeutic targets into high-purity biological drug substances.
                  </h3>
                </div>
                <div className="border-t border-white/10 pt-6 mt-8 flex justify-between items-center">
                  <div>
                    <span className="text-3xl font-serif font-semibold text-white">GMP</span>
                    <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase ml-2 font-mono">Regulatory standards</span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase font-mono">Tallinn cleanrooms</span>
                </div>
              </FeatureCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto">
        <Reveal>
          <SectionHeader
            badge="Technical Offerings"
            title="End-to-end development pathways"
            description="Focused biologics service workflows from cell culture sciences to GMP batch release."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <ServicesTabs />
          </div>
        </Reveal>
      </section>

      {/* 6. PROCESS SECTION */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto border-t border-neutral-100 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left sticky column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <Badge className="mb-4">Development Flow</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.15] mb-4">
              How the process flows with clarity
            </h2>
            <p className="text-sm sm:text-base text-muted font-normal leading-relaxed">
              A collaborative and structured workflow moving biologic products safely from tech evaluation to clinical drug product delivery.
            </p>
          </div>

          {/* Right vertical timeline steps */}
          <div className="lg:col-span-7 flex flex-col gap-12 relative border-l border-neutral-200/80 pl-6 md:pl-10 ml-2">
            {[
              {
                step: '01',
                title: 'Discovery & Tech Transfer',
                text: 'We review existing expression protocols or gene targets under NDA, defining the parameters for process scaling.',
              },
              {
                step: '02',
                title: 'Cell Line Engineering',
                text: 'Developing high-yield clonal systems (CHO-K1) with high genetic stability and titer productivity.',
              },
              {
                step: '03',
                title: 'Upstream Optimization',
                text: 'Refining perfusion or fed-batch feeds and cultivation criteria to maximize active protein titers.',
              },
              {
                step: '04',
                title: 'Downstream Purification',
                text: 'Formulating multi-step chromatography lines to remove host cell contaminants and achieve >99% purity.',
              },
              {
                step: '05',
                title: 'Analytical Characterization',
                text: 'Performing physicochemical structure confirmations, ELISA, bioassays, and sterility validation panels.',
              },
              {
                step: '06',
                title: 'cGMP Sterile Fill & Release',
                text: 'Aseptic vial filling inside Grade A environments, with complete quality dossiers to support IND filings.',
              },
            ].map((stepObj, idx) => (
              <motion.div
                key={stepObj.step}
                initial={{ opacity: 0, y: 192 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30, delay: idx * 0.05 }}
                className="relative flex flex-col md:flex-row gap-4 md:gap-8 items-start"
              >
                {/* Timeline dot step placeholder */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-neutral-900 z-10 flex items-center justify-center" />
                
                <span className="font-mono text-xs font-semibold text-neutral-400 tracking-wider">
                  {stepObj.step}
                </span>
                <div>
                  <h3 className="text-xl font-serif font-medium text-neutral-900 mb-2">
                    {stepObj.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted leading-relaxed font-normal">
                    {stepObj.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FEATURES SECTION (CDMO EXPERTISE) */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto border-t border-neutral-100">
        <Reveal>
          <SectionHeader
            badge="Expertise"
            title="Design support with clear direction"
            description="Our scientific leadership operates under key frameworks to expedite client programs to the clinical market safely."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {[
            { title: 'Quality Focus', text: 'Rigorous compliance standards satisfying US FDA and EU EMA regulations.' },
            { title: 'Robust IP Protection', text: 'Partitioned systems ensuring absolute confidentiality for molecular vectors.' },
            { title: 'Continuous Improvement', text: 'Process intensification to reduce manufacturing and materials costs.' },
            { title: 'Data Integrity', text: 'GAMP 5 electronic tracking logs ensuring trace compliance.' },
            { title: 'Phase-Specific Design', text: 'Accelerating early-stage runs to achieve First-in-Human clinical data.' },
            { title: 'Project Management', text: 'Proactive and transparent milestones reporting with direct scientific contacts.' },
            { title: 'Problem Solving', text: 'Rapid risk assessments to resolve upstream/downstream bottlenecks.' },
          ].map((feat, idx) => (
            <Reveal key={feat.title} delay={idx * 0.05}>
              <FeatureCard className="h-full flex flex-col justify-between py-6">
                <div>
                  <h4 className="font-serif font-medium text-lg text-neutral-900 mb-2">{feat.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{feat.text}</p>
                </div>
              </FeatureCard>
            </Reveal>
          ))}

          {/* Featured Dark Bento - Speed */}
          <Reveal delay={0.35} className="md:col-span-1">
            <FeatureCard variant="dark" className="h-full min-h-[160px]">
              <div>
                <h4 className="font-serif font-medium text-lg text-white mb-2 font-mono">Speed</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Accelerated timelines from DNA-to-RCB and rapid tech transfers to launch clinical batches without delay.
                </p>
              </div>
            </FeatureCard>
          </Reveal>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto border-t border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-baseline mb-12">
            <div className="lg:col-span-5">
              <Badge className="mb-4">Case Feedbacks</Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900 leading-[1.15]">
                What partners say
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
                Feedback from biotechnology directors and product founders who transitioned their biological programs to Lambda CDMO.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 items-stretch">
          {/* Left Column: Large dark testimonial card with glow */}
          <Reveal className="h-full">
            <FeatureCard variant="dark" className="h-full min-h-[360px] justify-between flex flex-col">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal text-white">
                &ldquo;Lambda&apos;s collaborative team took our complex bispecific target molecule and established a high-yield cell culture process. We initiated cGMP manufacturing within 14 weeks, accelerating our clinical trial filing.&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">Dr. Ethan Brooks</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Biotech Director @ GeneScaffolds</p>
                </div>
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-mono">Featured</span>
              </div>
            </FeatureCard>
          </Reveal>

          {/* Middle Column: Stacked white card and trusted strip */}
          <div className="flex flex-col gap-6 h-full justify-between">
            <Reveal className="flex-grow">
              <FeatureCard className="h-full justify-between flex flex-col min-h-[220px]">
                <p className="text-sm sm:text-base leading-relaxed mb-6 font-normal text-neutral-800">
                  &ldquo;Rigorous data integrity and secure network segmentations gave us total peace of mind regarding our monoclonal antibody sequences. Their analytical verification was flawless.&rdquo;
                </p>
                <div className="border-t border-neutral-100 pt-4">
                  <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Dr. Maya Chen</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Lead Scientist @ Aura AI Therapeutics</p>
                </div>
              </FeatureCard>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-sm flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-neutral-400 tracking-wider uppercase select-none font-mono">
                <span>Accredits:</span>
                <span>GMP</span>
                <span>•</span>
                <span>FDA Ready</span>
                <span>•</span>
                <span>EMA Compliant</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Card with dark CTA button on top */}
          <div className="flex flex-col gap-6 h-full justify-between">
            <Reveal>
              <div className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-4">
                <h4 className="text-sm font-serif font-medium text-neutral-900">Ready to start?</h4>
                <Button href="/contact" variant="primary" className="w-full text-xs py-2 px-4 rounded-lg">
                  Submit Tech Request
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex-grow">
              <FeatureCard className="h-full justify-between flex flex-col min-h-[220px]">
                <p className="text-sm sm:text-base leading-relaxed mb-6 font-normal text-neutral-800">
                  &ldquo;Their single-use bioreactor trains allowed us to scale up our biosimilar product from pilot batch to clinical quantities under a single, unified technology transfer.&rdquo;
                </p>
                <div className="border-t border-neutral-100 pt-4">
                  <h4 className="text-sm font-semibold tracking-wide text-neutral-900">Dr. Liam Carter</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Clinical Manufacturing Lead @ OncoMabs Inc.</p>
                </div>
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. SERVICE INQUIRIES (Replaces Pricing Packages) */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto border-t border-neutral-100">
        <Reveal>
          <SectionHeader
            badge="Clinical Packaging"
            title="Service packages with defined outcomes"
            description="Technical options for early-phase biological development and aseptic manufacturing."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
          {/* Clinical Pilot Program */}
          <Reveal>
            <div className="p-8 rounded-3xl border border-neutral-200 bg-white shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
              <div>
                <span className="text-xs font-semibold text-neutral-400 tracking-widest uppercase font-mono">Option 01</span>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mt-2 mb-3">Clinical Pilot Program</h3>
                <p className="text-sm text-muted leading-relaxed mb-6 font-normal">
                  Focused cell culture scaling and pilot purification runs to characterize yield dynamics and target specifications.
                </p>
                <div className="text-3xl font-serif font-bold text-neutral-900 mb-8">Pilot scale <span className="text-xs font-sans font-semibold text-neutral-400 uppercase tracking-wider">Batches</span></div>
                
                {/* Features list */}
                <ul className="flex flex-col gap-4 border-t border-neutral-100 pt-6">
                  {['Cell line verification', 'Upstream process adaptation', 'Downstream column profiling', 'Physicochemical characterization', 'Technology transfer report'].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                      <Check className="w-4 h-4 text-neutral-900" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button href="/contact" variant="secondary" className="w-full">
                  Request Pilot Quote
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Full IND Enablement */}
          <Reveal delay={0.1}>
            <div className="p-8 rounded-3xl dark-glass-card text-white flex flex-col justify-between h-full shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 radial-glow opacity-80 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-neutral-500 tracking-widest uppercase font-mono">Option 02</span>
                <h3 className="text-2xl font-serif font-medium text-white mt-2 mb-3">Full IND Enablement</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                  A complete development package from gene synthesis, cell line engineering, cGMP substance runs, to aseptic DP fills.
                </p>
                <div className="text-3xl font-serif font-bold text-white mb-8">Clinical cGMP <span className="text-xs font-sans font-semibold text-neutral-500 uppercase tracking-wider">Quantities</span></div>
                
                {/* Features list */}
                <ul className="flex flex-col gap-4 border-t border-white/10 pt-6">
                  {['Host CHO clonal cell line engineering', 'Upstream & downstream scaling', 'GMP drug substance production', 'Aseptic drug product filling', 'Validation and regulatory dossier'].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-neutral-200 font-medium">
                      <Check className="w-4 h-4 text-white" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 relative z-10">
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white hover:bg-neutral-100 text-black font-semibold text-sm border border-white shadow-md active:scale-98 transition-all duration-300 cursor-pointer"
                >
                  Contact CDMO Expert
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. FAQs */}
      <section className="px-6 py-12 md:py-20 max-w-[1400px] mx-auto border-t border-neutral-100">
        <Reveal>
          <SectionHeader
            title="Explore our FAQs"
            description="Answers to questions about process, tech transfers, timelines, and facility validations."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-3xl mx-auto mt-10">
            {faqs.map((faq) => (
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
      </section>

      {/* CINEMATIC CTA SECTION */}
      <CinematicCTA
        headingLine1="ACCELERATE YOUR"
        headingLine2="BIOLOGICS PATHWAY"
        subtitle="From cell line engineering to GMP drug product release — partner with Lambda to bring your biotherapeutics to First in Human clinical trials faster."
        ctaLabel="Start a Project"
        ctaHref="/contact"
        secondaryLabel="Explore Services"
        secondaryHref="/services/cell-line"
      />

    </div>
  );
}
