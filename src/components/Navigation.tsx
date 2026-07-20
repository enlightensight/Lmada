'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Building2, Users, Factory, Layers, ShieldCheck, Briefcase, Settings, Search, Beaker, Package, Microscope, Scale, HeartPulse, Bug, Target, GitMerge, Syringe, Dna, BookOpen, FileText, FileDown, Newspaper, Calendar, LucideIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  description?: string;
  columns?: { title: string; links: { label: string; href: string; icon: LucideIcon }[] }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    { label: 'Home', href: '/' },
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
      label: 'Development',
      description: 'From cell line engineering to process optimization.',
      columns: [
        {
          title: 'Services',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line', icon: Dna },
            { label: 'Process Development', href: '/services/process', icon: Settings },
            { label: 'Analytical Development', href: '/services/analytical', icon: Search },
          ],
        },
      ],
    },
    {
      label: 'Manufacturing',
      description: 'cGMP drug substance and drug product manufacturing.',
      columns: [
        {
          title: 'GMP Manufacturing',
          links: [
            { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance', icon: Beaker },
            { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product', icon: Package },
          ],
        },
      ],
    },
    {
      label: 'Characterization',
      description: 'Comprehensive analytical and QC testing capabilities.',
      columns: [
        {
          title: 'Analytical Services',
          links: [
            { label: 'Analytical Testing', href: '/characterization/analytical-testing', icon: Microscope },
            { label: 'Physicochemical Analysis', href: '/characterization/physicochemical', icon: Scale },
          ],
        },
        {
          title: 'Bio & Micro',
          links: [
            { label: 'Bioassays & Immunogenicity', href: '/characterization/bioassays', icon: HeartPulse },
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
      <header className="fixed top-0 z-50 w-full bg-white border-b border-neutral-200 select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Left Logo - always visible */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/Novum_Logo.png"
              alt="Novum Pharmaceutical Research Services"
              width={1422}
              height={358}
              className="h-10 sm:h-11 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - centered */}
          <nav className="hidden xl:flex items-center justify-center flex-1 px-4">
            {navigationItems.map((item) => {
              const active = isActive(item);

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative h-full flex items-center px-4 text-[13px] font-medium tracking-wide transition-colors ${
                      active ? 'text-brand-blue' : 'text-neutral-700 hover:text-brand-navy'
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
                    className={`relative h-full flex items-center gap-1 px-4 text-[13px] font-medium tracking-wide focus:outline-none transition-colors cursor-pointer ${
                      active ? 'text-brand-blue' : 'text-neutral-700 hover:text-brand-navy'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
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
                        <div className="bg-white border border-neutral-200 shadow-2xl rounded-xl overflow-hidden min-w-[520px] max-w-[720px]">
                          <div className="p-6">
                            <div className="mb-5 pb-4 border-b border-neutral-100">
                              <span className="text-brand-blue text-xs font-semibold uppercase tracking-wider">
                                {item.label}
                              </span>
                              <p className="text-sm text-neutral-500 mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className={`grid gap-6 ${item.columns && item.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                              {item.columns?.map((column) => (
                                <div key={column.title}>
                                  <h4 className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-3">
                                    {column.title}
                                  </h4>
                                  <ul className="space-y-2">
                                    {column.links.map((link) => {
                                      const linkActive = pathname === link.href;
                                      return (
                                        <li key={link.href}>
                                      <Link
                                            href={link.href}
                                            className={`flex items-center gap-2.5 text-sm transition-colors ${
                                              linkActive
                                                ? 'text-brand-blue font-medium'
                                                : 'text-neutral-600 hover:text-brand-blue'
                                            }`}
                                          >
                                            <link.icon className="w-4 h-4 text-brand-blue flex-shrink-0" />
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

          {/* Right side - desktop: Novum logo, mobile: hamburger */}
          <div className="flex items-center">
            {/* Right Logo - desktop only */}
            <Link href="/" className="hidden xl:flex items-center shrink-0">
              <Image
                src="/images/Lambda_Logo.png"
                alt="Lambda CDMO"
                width={1197}
                height={358}
                className="h-10 sm:h-11 md:h-12 w-auto"
              />
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
