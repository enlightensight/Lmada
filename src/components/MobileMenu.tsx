'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  X,
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
  Layers,
} from 'lucide-react';

function getIcon(label: string) {
  const name = label.toLowerCase();
  if (name.includes('about')) return <Building className="w-4 h-4" />;
  if (name.includes('leadership')) return <Users className="w-4 h-4" />;
  if (name.includes('facility')) return <Layers className="w-4 h-4" />;
  if (name.includes('integrated')) return <Cpu className="w-4 h-4" />;
  if (name.includes('quality')) return <ShieldCheck className="w-4 h-4" />;
  if (name.includes('careers')) return <Briefcase className="w-4 h-4" />;
  if (name.includes('cell line')) return <Dna className="w-4 h-4" />;
  if (name.includes('process')) return <FlaskConical className="w-4 h-4" />;
  if (name.includes('analytical development')) return <Microscope className="w-4 h-4" />;
  if (name.includes('drug substance')) return <Component className="w-4 h-4" />;
  if (name.includes('drug product')) return <Droplets className="w-4 h-4" />;
  if (name.includes('analytical testing')) return <Gauge className="w-4 h-4" />;
  if (name.includes('physicochemical')) return <Beaker className="w-4 h-4" />;
  if (name.includes('bioassays')) return <HeartPulse className="w-4 h-4" />;
  if (name.includes('microbiological')) return <Microscope className="w-4 h-4" />;
  if (name.includes('monoclonal')) return <Dna className="w-4 h-4" />;
  if (name.includes('bispecific')) return <GitMerge className="w-4 h-4" />;
  if (name.includes('antibody-drug')) return <Link2 className="w-4 h-4" />;
  if (name.includes('proteins')) return <Cpu className="w-4 h-4" />;
  if (name.includes('blogs')) return <BookOpen className="w-4 h-4" />;
  if (name.includes('case studies')) return <LineChart className="w-4 h-4" />;
  if (name.includes('brochures')) return <FileDown className="w-4 h-4" />;
  if (name.includes('news')) return <Newspaper className="w-4 h-4" />;
  if (name.includes('events')) return <Calendar className="w-4 h-4" />;
  return <Info className="w-4 h-4" />;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -16,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const linkVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0 },
};

interface MobileGroup {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  const groups: MobileGroup[] = [
    { label: 'Home', href: '/' },
    {
      label: 'Overview',
      items: [
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
      items: [
        { label: 'Cell Line Development', href: '/services/cell-line' },
        { label: 'Process Development', href: '/services/process' },
        { label: 'Analytical Development', href: '/services/analytical' },
      ],
    },
    {
      label: 'Manufacturing',
      items: [
        { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance' },
        { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product' },
      ],
    },
    {
      label: 'Characterization',
      items: [
        { label: 'Analytical Testing', href: '/characterization/analytical-testing' },
        { label: 'Physicochemical Analysis', href: '/characterization/physicochemical' },
        { label: 'Bioassays & Immunogenicity', href: '/characterization/bioassays' },
        { label: 'Microbiological Testing', href: '/characterization/microbiological' },
      ],
    },
    {
      label: 'Modalities',
      items: [
        { label: 'Monoclonal Antibodies', href: '/modalities/mabs' },
        { label: 'Bispecific Antibodies', href: '/modalities/bispecifics' },
        { label: 'Antibody-Drug Conjugates', href: '/modalities/adcs' },
        { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides' },
      ],
    },
    {
      label: 'Insights',
      items: [
        { label: 'Blogs & Articles', href: '/insights/blogs' },
        { label: 'Case Studies', href: '/insights/case-studies' },
        { label: 'Brochures', href: '/insights/brochures' },
        { label: 'News & Press', href: '/insights/news' },
        { label: 'Events & Webinars', href: '/insights/events' },
      ],
    },
  ];

  const toggleGroup = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-x-0 top-0 bg-white border-b border-neutral-200 z-40 px-6 pt-20 pb-8 flex flex-col max-h-[92vh] overflow-y-auto shadow-xl pointer-events-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-5 right-6 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Links list */}
          <nav className="flex flex-col gap-2 select-none mt-4">
            {groups.map((group) => {
              if (group.href) {
                const isActive = pathname === group.href;
                return (
                  <motion.div key={group.label} variants={linkVariants}>
                    <Link
                      href={group.href}
                      onClick={onClose}
                      className={`block py-2 text-xl font-serif font-bold transition-colors ${
                        isActive ? 'text-brand-orange' : 'text-neutral-900 hover:text-neutral-500'
                      }`}
                    >
                      {group.label}
                    </Link>
                  </motion.div>
                );
              }

              const isExpanded = openGroup === group.label;
              const hasActiveChild = group.items?.some((i) => pathname === i.href);

              return (
                <motion.div key={group.label} variants={linkVariants} className="border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full py-2 flex items-center justify-between text-xl font-serif font-bold transition-colors cursor-pointer focus:outline-none ${
                      hasActiveChild ? 'text-brand-orange' : 'text-neutral-900 hover:text-neutral-500'
                    }`}
                  >
                    <span>{group.label}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden mt-1.5"
                      >
                        <div className="flex flex-col gap-1 pb-2">
                          {group.items?.map((item) => {
                            const isSubActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                  isSubActive
                                    ? 'bg-brand-orange-light text-brand-orange'
                                    : 'text-neutral-600 hover:bg-brand-orange-light/40 hover:text-brand-orange'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg flex items-center justify-center transition-all ${
                                  isSubActive
                                    ? 'bg-white text-brand-orange shadow-sm'
                                    : 'bg-neutral-100 text-neutral-400 group-hover:bg-white group-hover:text-brand-orange'
                                }`}>
                                  {getIcon(item.label)}
                                </div>
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.div variants={linkVariants} className="mt-6 border-t border-neutral-200 pt-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-b from-brand-blue to-sky-500 hover:from-brand-blue-hover hover:to-sky-600 border border-brand-blue/20 text-white font-semibold text-xs uppercase tracking-wider shadow-md active:scale-98"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
