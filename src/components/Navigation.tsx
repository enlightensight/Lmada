'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  ChevronDown,
  Info,
  Users,
  Building,
  Cpu,
  ShieldCheck,
  Briefcase,
  Dna,
  FlaskConical,
  Microscope,
  Component,
  Droplets,
  Gauge,
  Beaker,
  HeartPulse,
  GitMerge,
  Link2,
  BookOpen,
  LineChart,
  FileDown,
  Newspaper,
  Calendar,
  Layers
} from 'lucide-react';
import MobileMenu from './MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

function getIcon(label: string) {
  const name = label.toLowerCase();
  
  // Overview
  if (name.includes('about')) return <Building className="w-4 h-4 text-brand-orange" />;
  if (name.includes('leadership')) return <Users className="w-4 h-4 text-brand-orange" />;
  if (name.includes('facility')) return <Layers className="w-4 h-4 text-brand-orange" />;
  if (name.includes('integrated')) return <Cpu className="w-4 h-4 text-brand-orange" />;
  if (name.includes('quality')) return <ShieldCheck className="w-4 h-4 text-brand-orange" />;
  if (name.includes('careers')) return <Briefcase className="w-4 h-4 text-brand-orange" />;
  
  // Development
  if (name.includes('cell line')) return <Dna className="w-4 h-4 text-brand-orange" />;
  if (name.includes('process')) return <FlaskConical className="w-4 h-4 text-brand-orange" />;
  if (name.includes('analytical development')) return <Microscope className="w-4 h-4 text-brand-orange" />;
  
  // Manufacturing
  if (name.includes('drug substance')) return <Component className="w-4 h-4 text-brand-orange" />;
  if (name.includes('drug product')) return <Droplets className="w-4 h-4 text-brand-orange" />;
  
  // Characterization
  if (name.includes('analytical testing')) return <Gauge className="w-4 h-4 text-brand-orange" />;
  if (name.includes('physicochemical')) return <Beaker className="w-4 h-4 text-brand-orange" />;
  if (name.includes('bioassays')) return <HeartPulse className="w-4 h-4 text-brand-orange" />;
  if (name.includes('microbiological')) return <Microscope className="w-4 h-4 text-brand-orange" />;
  
  // Modalities
  if (name.includes('monoclonal')) return <Dna className="w-4 h-4 text-brand-orange" />;
  if (name.includes('bispecific')) return <GitMerge className="w-4 h-4 text-brand-orange" />;
  if (name.includes('antibody-drug')) return <Link2 className="w-4 h-4 text-brand-orange" />;
  if (name.includes('proteins')) return <Cpu className="w-4 h-4 text-brand-orange" />;
  
  // Insights
  if (name.includes('blogs')) return <BookOpen className="w-4 h-4 text-brand-orange" />;
  if (name.includes('case studies')) return <LineChart className="w-4 h-4 text-brand-orange" />;
  if (name.includes('brochures')) return <FileDown className="w-4 h-4 text-brand-orange" />;
  if (name.includes('news')) return <Newspaper className="w-4 h-4 text-brand-orange" />;
  if (name.includes('events')) return <Calendar className="w-4 h-4 text-brand-orange" />;
  
  return <Info className="w-4 h-4 text-brand-orange" />;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Overview',
      dropdown: [
        { label: 'About Lambda CDMO', href: '/overview/about' },
        { label: 'Leadership Team', href: '/overview/leadership' },
        { label: 'Facility & Infrastructure', href: '/overview/facility' },
        { label: 'Integrated Development', href: '/overview/integrated' },
        { label: 'Quality & Regulatory', href: '/overview/quality' },
        { label: 'Careers', href: '/overview/careers' },
      ],
    },
    {
      label: 'Development',
      dropdown: [
        { label: 'Cell Line Development', href: '/services/cell-line' },
        { label: 'Process Development', href: '/services/process' },
        { label: 'Analytical Development', href: '/services/analytical' },
      ],
    },
    {
      label: 'Manufacturing',
      dropdown: [
        { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance' },
        { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product' },
      ],
    },
    {
      label: 'Characterization',
      dropdown: [
        { label: 'Analytical Testing', href: '/characterization/analytical-testing' },
        { label: 'Physicochemical Analysis', href: '/characterization/physicochemical' },
        { label: 'Bioassays & Immunogenicity', href: '/characterization/bioassays' },
        { label: 'Microbiological Testing', href: '/characterization/microbiological' },
      ],
    },
    {
      label: 'Modalities',
      dropdown: [
        { label: 'Monoclonal Antibodies', href: '/modalities/mabs' },
        { label: 'Bispecific Antibodies', href: '/modalities/bispecifics' },
        { label: 'Antibody-Drug Conjugates', href: '/modalities/adcs' },
        { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides' },
      ],
    },
    {
      label: 'Insights',
      dropdown: [
        { label: 'Blogs & Articles', href: '/insights/blogs' },
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Brochures', href: '/insights/brochures' },
        { label: 'News & Press', href: '/insights/news' },
        { label: 'Events & Webinars', href: '/insights/events' },
      ],
    },
  ];

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-white/90 border-b border-white/30 select-none">
        <div className="max-w-[1400px] mx-auto px-6 h-10 sm:h-11 flex items-center justify-between">
          
          {/* Logo / Brand Mark */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/lambda-logo.svg"
              alt="Lambda Logo"
              width={160}
              height={47}
              className="h-8 sm:h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navigationItems.map((item) => {
              if (item.href) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-brand-orange' : 'text-neutral-900 hover:text-brand-orange'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const hasActiveChild = item.dropdown?.some((child) => pathname === child.href);

              return (
                <div
                  key={item.label}
                  className="relative py-2"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider focus:outline-none transition-colors cursor-pointer ${
                      hasActiveChild ? 'text-brand-orange' : 'text-neutral-900 hover:text-brand-orange'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute left-0 mt-2 w-72 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl p-2.5 flex flex-col gap-1 z-50"
                      >
                        {item.dropdown?.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                                isSubActive
                                  ? 'bg-brand-blue/10 text-brand-blue font-semibold'
                                  : 'text-neutral-600 hover:bg-brand-blue/5 hover:text-brand-blue'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center ${
                                isSubActive
                                  ? 'bg-white text-brand-orange shadow-xs'
                                  : 'bg-neutral-50 text-neutral-400 group-hover:bg-white group-hover:text-brand-orange shadow-2xs'
                              }`}>
                                {getIcon(subItem.label)}
                              </div>
                              <span className="transition-colors duration-200">
                                {subItem.label}
                              </span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden xl:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-b from-brand-blue to-sky-500 hover:from-brand-blue-hover hover:to-sky-600 border border-brand-blue/20 text-white font-medium text-xs shadow-sm hover:shadow active:scale-98"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex xl:hidden items-center justify-center text-neutral-800 hover:text-brand-orange active:scale-95 cursor-pointer transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
