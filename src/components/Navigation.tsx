'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Building2, Users, Factory, Layers, ShieldCheck, Briefcase, Settings, Search, Beaker, Package, Microscope, Scale, HeartPulse, Bug, Target, GitMerge, Syringe, Dna, BookOpen, FileText, FileDown, Newspaper, Calendar, Compass, LucideIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  isExternal?: boolean;
  description?: string;
  columns?: { title: string; links: { label: string; href: string; icon: LucideIcon }[] }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    {
      label: 'Overview',
      description: 'Who we are, our leadership, and our integrated approach.',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Lambda CDMO', href: '/overview/about', icon: Building2 },
            { label: 'Leadership Team', href: '/overview/leadership', icon: Users },
            { label: 'Facility & Infrastructure', href: '/overview/facility', icon: Factory },
          ],
        },
        {
          title: 'Commitment',
          links: [
            { label: 'Integrated Development', href: '/overview/integrated', icon: Layers },
            { label: 'Quality & Regulatory', href: '/overview/quality', icon: ShieldCheck },
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
          title: 'Development',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line', icon: Dna },
            { label: 'Process Development', href: '/services/process', icon: Settings },
            { label: 'Analytical Development', href: '/services/analytical', icon: Search },
          ],
        },
        {
          title: 'Manufacturing',
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
      label: 'Modalities',
      description: 'Platform capabilities for diverse biologic molecules.',
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
            { label: 'Antibody-Drug Conjugates', href: '/modalities/adcs', icon: Syringe },
            { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides', icon: Dna },
          ],
        },
      ],
    },
    {
      label: 'Insights',
      description: 'Publications, case studies, and upcoming events.',
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
          title: 'Media',
          links: [
            { label: 'News & Press', href: '/insights/news', icon: Newspaper },
            { label: 'Events & Webinars', href: '/insights/events', icon: Calendar },
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

          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/lambda_novum_logo.png"
              alt="Lambda & Novum"
              width={2991}
              height={358}
              className="h-10 sm:h-11 md:h-12 w-auto max-w-[260px] sm:max-w-[320px] md:max-w-[360px] object-contain"
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
                        <div className={`bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden min-w-[560px] max-w-[980px] ${item.columns && item.columns.length >= 3 ? 'w-[920px]' : ''
                          }`}>
                          <div className="p-6">
                            <div className="mb-5 pb-4 border-b border-neutral-100">
                              <span className="text-brand-orange text-[12px] font-semibold uppercase tracking-wider">
                                {item.label}
                              </span>
                              <p className="text-[15px] text-slate-500 font-normal leading-relaxed mt-1">
                                {item.description}
                              </p>
                            </div>
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
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
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
