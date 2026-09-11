'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';

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
  isExternal?: boolean;
  columns?: { title: string; links: { label: string; href: string }[] }[];
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  const groups: MobileGroup[] = [
    {
      label: 'Overview',
      columns: [
        {
          title: 'Company',
          links: [
            { label: 'About Lambda CDMO', href: '/overview/about' },
            { label: 'Leadership Team', href: '/overview/leadership' },
            { label: 'Facility & Infrastructure', href: '/overview/facility' },
          ],
        },
        {
          title: 'Commitment',
          links: [
            { label: 'Integrated Development', href: '/overview/integrated' },
            { label: 'Quality & Regulatory', href: '/overview/quality' },
            { label: 'Careers', href: '/overview/careers' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      columns: [
        {
          title: 'Development',
          links: [
            { label: 'Cell Line Development', href: '/services/cell-line' },
            { label: 'Process Development', href: '/services/process' },
            { label: 'Analytical Development', href: '/services/analytical' },
          ],
        },
        {
          title: 'Manufacturing',
          links: [
            { label: 'Drug Substance Manufacturing', href: '/manufacturing/drug-substance' },
            { label: 'Drug Product Manufacturing', href: '/manufacturing/drug-product' },
          ],
        },
        {
          title: 'Analytical Characterization and Testing',
          links: [
            { label: 'Analytical Testing', href: '/characterization/analytical-testing' },
            { label: 'Physicochemical Characterization', href: '/characterization/physicochemical' },
            { label: 'Bioassays & Immunogenicity Testing', href: '/characterization/bioassays' },
            { label: 'Microbiological Testing', href: '/characterization/microbiological' },
          ],
        },
      ],
    },
    {
      label: 'Modalities',
      columns: [
        {
          title: 'Molecule Types',
          links: [
            { label: 'Monoclonal Antibodies', href: '/modalities/mabs' },
            { label: 'Bispecific Antibodies', href: '/modalities/bispecifics' },
          ],
        },
        {
          title: 'Advanced Therapeutics',
          links: [
            { label: 'Antibody-Drug Conjugates', href: '/modalities/adcs' },
            { label: 'Proteins & Peptides', href: '/modalities/proteins-peptides' },
          ],
        },
      ],
    },
    {
      label: 'Insights',
      columns: [
        {
          title: 'Knowledge',
          links: [
            { label: 'Blogs & Articles', href: '/insights/blogs' },
            { label: 'Case Studies', href: '/insights/case-studies' },
            { label: 'Brochures', href: '/insights/brochures' },
          ],
        },
        {
          title: 'Media',
          links: [
            { label: 'News & Press', href: '/insights/news' },
            { label: 'Events & Webinars', href: '/insights/events' },
          ],
        },
      ],
    },
  ];

  const toggleGroup = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  const isActive = (group: MobileGroup) => {
    if (group.href) return pathname === group.href;
    return group.columns?.some((col) => col.links.some((link) => pathname === link.href));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-x-0 top-0 bg-white border-b border-neutral-200 z-50 px-6 pt-24 pb-10 flex flex-col max-h-[95vh] overflow-y-auto shadow-2xl pointer-events-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-5 right-6 w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Links */}
          <nav className="flex flex-col gap-2 select-none">
            {groups.map((group) => {
              if (group.href) {
                const isExternal = group.isExternal || group.href.endsWith('.htm');
                if (isExternal) {
                  return (
                    <motion.div key={group.label} variants={linkVariants}>
                      <a
                        href={group.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="py-3 text-[17px] font-light md:font-normal tracking-tight transition-colors flex items-center justify-between text-neutral-900 hover:text-brand-blue"
                      >
                        <span>{group.label}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-sm bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                          360° Tour
                        </span>
                      </a>
                    </motion.div>
                  );
                }

                const active = pathname === group.href;
                return (
                  <motion.div key={group.label} variants={linkVariants}>
                    <Link
                      href={group.href}
                      onClick={onClose}
                      className={`py-3 text-[17px] font-light md:font-normal tracking-tight transition-colors flex items-center justify-between ${
                        active ? 'text-brand-blue' : 'text-neutral-900 hover:text-brand-blue'
                      }`}
                    >
                      <span>{group.label}</span>
                    </Link>
                  </motion.div>
                );
              }

              const expanded = openGroup === group.label;
              const active = isActive(group);

              return (
                <motion.div key={group.label} variants={linkVariants} className="border-b border-neutral-100 pb-2">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={`w-full py-3 flex items-center justify-between text-[17px] font-light md:font-normal tracking-tight transition-colors cursor-pointer focus:outline-none ${
                      active ? 'text-brand-blue' : 'text-neutral-900 hover:text-brand-blue'
                    }`}
                  >
                    <span>{group.label}</span>
                    <motion.div
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden mt-2"
                      >
                        <div className={`grid gap-6 pb-4 ${group.columns && group.columns.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {group.columns?.map((column) => (
                            <div key={column.title}>
                              <h4 className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                                {column.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {column.links.map((link) => {
                                  const linkActive = pathname === link.href;
                                  return (
                                    <li key={link.href}>
                                      <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className={`block text-[15px] font-light md:font-normal tracking-tight transition-colors ${
                                          linkActive ? 'text-brand-blue font-normal' : 'text-neutral-700 hover:text-brand-blue'
                                        }`}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.div variants={linkVariants} className="mt-8 pt-6 border-t border-neutral-100 flex flex-col gap-3">
            <a
              href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold text-sm transition-all"
            >
              Virtual Tour
            </a>
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold text-sm transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
