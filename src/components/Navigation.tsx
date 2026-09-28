'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Building2, Users, Factory, Layers, ShieldCheck, Briefcase, Settings, Search, Beaker, Package, Microscope, Scale, HeartPulse, Bug, Target, GitMerge, Syringe, Dna, BookOpen, FileText, FileDown, Newspaper, Calendar, Compass, HelpCircle, MapPin, LucideIcon, ArrowRight, Check, Globe } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  headline?: string;
  description?: string;
  columns?: { title: string; links: { label: string; href: string; icon: LucideIcon; isExternal?: boolean; sublabel?: string }[] }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<'ahmedabad' | 'london'>('ahmedabad');
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    {
      label: 'Overview',
      headline: 'Biologics Development and Manufacturing. Integrated from Cell Line Engineering to Clinical Supplies.',
      description: 'Supporting biopharmaceutical companies with integrated biologics development, from Gene to GMP – cell line engineering, process development of Drug substance and Drug product, analytical characterization, GMP manufacturing, and clinical supply capabilities to accelerate the journey from molecule to market.',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Lambda CDMO', href: '/overview/about', icon: Building2 },
            { label: 'Leadership Team', href: '/overview/leadership', icon: Users },
          ],
        },
        {
          title: 'Commitment',
          links: [
            { label: 'Integrated development to manufacturing approach', href: '/overview/integrated', icon: Layers },
            { label: 'Quality and Compliance', href: '/overview/quality', icon: ShieldCheck },
            { label: 'Careers', href: '/overview/careers', icon: Briefcase },
          ],
        },
      ],
    },
    {
      label: 'Services',
      description: 'From cell line engineering to GMP manufacturing and QC testing.',
      columns: [
        {
          title: 'Development Services',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line', icon: Dna },
            { label: 'Process Development', href: '/services/process', icon: Settings },
            { label: 'Analytical Development', href: '/services/analytical', icon: Search },
          ],
        },
        {
          title: 'Manufacturing Services',
          links: [
            { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance', icon: Beaker },
            { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product', icon: Package },
          ],
        },
        {
          title: 'Analytical Characterization and Testing',
          links: [
            { label: 'Analytical Testing', href: '/characterization/analytical-testing', icon: Microscope },
            { label: 'Physicochemical Characterization', href: '/characterization/physicochemical', icon: Scale },
            { label: 'Bioassays & Immunogenicity Testing', href: '/characterization/bioassays', icon: HeartPulse },
            { label: 'Microbiological Testing', href: '/characterization/microbiological', icon: Bug },
          ],
        },
      ],
    },
    {
      label: 'Facility & Locations',
      description: 'Our global biomanufacturing campus and development innovation centers.',
      columns: [
        {
          title: 'CDMO Locations',
          links: [
            { label: 'Ahmedabad, India', href: '/facility&location/India', icon: Factory, sublabel: 'Integrated Biomanufacturing Campus' },
            { label: 'London, UK', href: '/facility&location/UK', icon: Building2, sublabel: 'European Innovation Centre' },
          ],
        },
      ],
    },
    {
      label: 'Modalities',
      headline: 'Platform Capabilities for Next-Generation Biologics',
      description: 'Lambda CDMO brings together integrated development, analytical, and manufacturing capabilities to support diverse biologic modalities from early development through clinical supply.',
      columns: [
        {
          title: 'Molecule Types',
          links: [
            { label: 'Monoclonal Antibodies', href: '/modalities/mabs', icon: Target },
            { label: 'Bispecific Antibodies', href: '/modalities/bispecifics', icon: GitMerge },
          ],
        },
        {
          title: 'Advanced Therapeutics',
          links: [
            { label: 'Antibody-Drug Conjugates (ADCs)', href: '/modalities/adcs', icon: Syringe },
            { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides', icon: Dna },
          ],
        },
      ],
    },
    {
      label: 'Insights',
      description: 'Publications, case studies, news, and FAQs.',
      columns: [
        {
          title: 'Knowledge',
          links: [
            { label: 'Blogs & Articles', href: '/insights/blogs', icon: BookOpen },
            { label: 'Case Studies', href: '/insights/case-studies', icon: FileText },
            { label: 'Brochures', href: '/insights/brochures', icon: FileDown },
          ],
        },
        {
          title: 'Media & Support',
          links: [
            { label: 'News & Press', href: '/insights/news', icon: Newspaper },
            { label: 'Events & Webinars', href: '/insights/events', icon: Calendar },
            { label: 'FAQs', href: '/insights/faqs', icon: HelpCircle },
          ],
        },
      ],
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    return item.columns?.some((col) => col.links.some((link) => pathname === link.href));
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white border-b border-neutral-200 select-none px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-[1700px] mx-auto h-16 lg:h-20 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-none ring-0 select-none cursor-pointer"
          >
            <Image
              src="/images/lambda_novum_logo.png"
              alt="Lambda & Novum"
              width={2991}
              height={358}
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[260px] sm:max-w-[320px] md:max-w-[360px] object-contain outline-none border-none select-none pointer-events-none"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation - centered */}
          <nav className="hidden xl:flex items-center justify-center flex-1 px-4">
            {navigationItems.map((item) => {
              const active = isActive(item);

              if (item.href) {
                if (item.isExternal || item.href.endsWith('.htm')) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-full flex items-center px-4 text-[17px] font-light md:font-normal tracking-tight transition-colors text-neutral-900 hover:text-brand-blue"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative h-full flex items-center px-4 text-[17px] font-light md:font-normal tracking-tight transition-colors ${
                      active ? 'text-brand-blue font-normal' : 'text-neutral-900 hover:text-brand-blue'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                    )}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`relative h-full flex items-center gap-1.5 px-4 text-[17px] font-light md:font-normal tracking-tight focus:outline-none transition-colors cursor-pointer ${active ? 'text-brand-blue font-normal' : 'text-neutral-900 hover:text-brand-blue'
                      }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-[18px] h-[18px] transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue" />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                      >
                        <div className={`bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden min-w-[560px] max-w-[980px] ${
                          item.label === 'Facility & Locations' || (item.columns && item.columns.length >= 3)
                            ? 'w-[920px]'
                            : item.label === 'Overview' || item.label === 'Modalities'
                              ? 'w-[740px]'
                              : ''
                        }`}>
                          <div className="p-6">
                            <div className="mb-5 pb-4 border-b border-neutral-100">
                              <span className="text-brand-orange text-[12px] font-semibold uppercase tracking-wider block mb-1.5">
                                {item.label}
                              </span>
                              {item.headline && (
                                <h4 className="text-[15px] sm:text-[16px] font-semibold text-neutral-900 leading-snug mb-1.5">
                                  {item.headline}
                                </h4>
                              )}
                              {item.description && (
                                <p className="text-[13.5px] sm:text-[14px] text-slate-600 font-normal leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {item.label === 'Facility & Locations' ? (
                              <div className="grid grid-cols-12 gap-8 items-stretch">
                                {/* Left column: Locations list styled EXACTLY as other nav cards */}
                                <div className="col-span-5 flex flex-col justify-between pr-2">
                                  <div>
                                    <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-900 mb-3.5">
                                      CDMO Locations
                                    </h4>
                                    <ul className="space-y-2.5">
                                      <li>
                                        <Link
                                          href="/facility&location/India"
                                          onMouseEnter={() => setHoveredLocation('ahmedabad')}
                                          className={`text-[15px] font-light md:font-normal tracking-tight flex items-center justify-between transition-colors cursor-pointer ${
                                            hoveredLocation === 'ahmedabad'
                                              ? 'text-brand-blue font-normal'
                                              : 'text-neutral-800 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <Factory className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                            <span>Ahmedabad, India</span>
                                          </div>
                                        </Link>
                                      </li>

                                      <li>
                                        <Link
                                          href="/facility&location/UK"
                                          onMouseEnter={() => setHoveredLocation('london')}
                                          className={`text-[15px] font-light md:font-normal tracking-tight flex items-center justify-between transition-colors cursor-pointer ${
                                            hoveredLocation === 'london'
                                              ? 'text-brand-blue font-normal'
                                              : 'text-neutral-800 hover:text-brand-blue'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <Building2 className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                            <span>London, UK</span>
                                          </div>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="mt-8 pt-4 border-t border-neutral-100 text-[12px] text-slate-500 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-brand-blue shrink-0" />
                                    <span>Dual-continent integrated CDMO</span>
                                  </div>
                                </div>

                                {/* Right column: Dynamic location details card */}
                                <div className="col-span-7">
                                  {hoveredLocation === 'ahmedabad' ? (
                                    <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-100/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-xs">
                                      <div>
                                        <div className="flex items-center justify-end mb-2.5">
                                          <span className="text-xs font-semibold text-neutral-600">Gujarat, India</span>
                                        </div>
                                        <h4 className="text-base font-bold text-neutral-900 mb-1.5 leading-snug">
                                          Integrated Biologics Development & Clinical GMP Suites
                                        </h4>
                                        <p className="text-[13.5px] text-slate-600 leading-relaxed mb-4 font-normal">
                                          Gene-to-clinic biologics development, comprehensive analytical characterization, and GMP manufacturing platform under a unified quality system.
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 text-[12.5px] text-slate-700 bg-white/95 rounded-xl p-3 border border-blue-100/70">
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>27,000 sqft GMP Campus</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>2x 200L (400L) Bioreactors</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Robotic Isolator Fill-Finish</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Full DS, DP & QC Labs</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-4 pt-3.5 border-t border-neutral-200/60 flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-500">US FDA, EMA & PMDA cGMP</span>
                                        <Link 
                                          href="/facility&location/India" 
                                          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1.5 group"
                                        >
                                          <span>Ahmedabad Facility</span>
                                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 border border-blue-100/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-xs">
                                      <div>
                                        <div className="flex items-center justify-end mb-2.5">
                                          <span className="text-xs font-semibold text-neutral-600">London, UK</span>
                                        </div>
                                        <h4 className="text-base font-bold text-neutral-900 mb-1.5 leading-snug">
                                          Biologics Development & Process Characterization
                                        </h4>
                                        <p className="text-[13.5px] text-slate-600 leading-relaxed mb-4 font-normal">
                                          Biologics development capabilities that will support process and analytical development for drug substance followed by process characterisation studies.
                                        </p>
                                        <div className="grid grid-cols-2 gap-2 text-[12.5px] text-slate-700 bg-white/95 rounded-xl p-3 border border-blue-100/70">
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Upstream & Downstream DoE</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Clone Screening & Analytics</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Intact Mass Spec (LC-MS)</span>
                                          </div>
                                          <div className="flex items-center gap-2 font-medium">
                                            <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                                            <span>Process Characterisation</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-4 pt-3.5 border-t border-neutral-200/60 flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-500">European Innovation Hub</span>
                                        <Link 
                                          href="/facility&location/UK" 
                                          className="text-xs font-semibold text-brand-blue hover:text-brand-blue-hover flex items-center gap-1.5 group"
                                        >
                                          <span>London Centre</span>
                                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className={`grid gap-12 ${item.columns && item.columns.length >= 3
                                ? 'grid-cols-3'
                                : item.columns && item.columns.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-1'
                                }`}>
                                {item.columns?.map((column, colIdx) => (
                                  <div key={colIdx}>
                                    <h4 className="text-[12px] font-semibold uppercase tracking-wider text-neutral-900 mb-3.5">
                                      {column.title}
                                    </h4>
                                    <ul className="space-y-2.5">
                                      {column.links.map((link) => {
                                        const isLinkActive = pathname === link.href;
                                        return (
                                          <li key={link.href}>
                                            {link.isExternal || link.href.endsWith('.htm') || link.href.startsWith('http') ? (
                                              <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-[15px] font-light md:font-normal tracking-tight flex items-center gap-2.5 transition-colors ${isLinkActive
                                                  ? 'text-brand-blue font-normal'
                                                  : 'text-neutral-800 hover:text-brand-blue'
                                                  }`}
                                              >
                                                <link.icon className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                                {link.label}
                                              </a>
                                            ) : (
                                              <Link
                                                href={link.href}
                                                className={`text-[15px] font-light md:font-normal tracking-tight flex items-center gap-2.5 transition-colors ${isLinkActive
                                                  ? 'text-brand-blue font-normal'
                                                  : 'text-neutral-800 hover:text-brand-blue'
                                                  }`}
                                              >
                                                <link.icon className="w-[18px] h-[18px] text-brand-blue flex-shrink-0" />
                                                {link.label}
                                              </Link>
                                            )}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side - desktop CTAs, mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Virtual Tour CTA */}
            <a
              href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center justify-center px-5 py-2 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-[15px] font-light md:font-normal tracking-tight transition-all shadow-sm"
            >
              Virtual Tour
            </a>

            {/* Desktop Contact CTA */}
            <Link
              href="/contact"
              className="hidden xl:inline-flex items-center justify-center px-5 py-2 rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white text-[15px] font-light md:font-normal tracking-tight transition-all"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex xl:hidden items-center justify-center text-neutral-700 hover:text-brand-navy active:scale-95 cursor-pointer transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
