import Link from 'next/link';
import Image from 'next/image';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Overview',
      links: [
        { name: 'About Lambda', href: '/overview/about' },
        { name: 'Leadership', href: '/overview/leadership' },
        { name: 'Facility', href: '/overview/facility' },
        { name: 'Integrated Development', href: '/overview/integrated' },
        { name: 'Careers', href: '/overview/careers' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Cell Line', href: '/services/cell-line' },
        { name: 'Process Dev', href: '/services/process' },
        { name: 'Analytical', href: '/services/analytical' },
        { name: 'Drug Substance', href: '/manufacturing/drug-substance' },
        { name: 'Drug Product', href: '/manufacturing/drug-product' },
      ],
    },
    {
      title: 'Characterization',
      links: [
        { name: 'Analytical Testing', href: '/characterization/analytical-testing' },
        { name: 'Physicochemical', href: '/characterization/physicochemical' },
        { name: 'Bioassays', href: '/characterization/bioassays' },
        { name: 'Microbiological', href: '/characterization/microbiological' },
      ],
    },
    {
      title: 'Modalities',
      links: [
        { name: 'Monoclonal Antibodies', href: '/modalities/mabs' },
        { name: 'Bispecifics', href: '/modalities/bispecifics' },
        { name: 'ADCs', href: '/modalities/adcs' },
        { name: 'Proteins & Peptides', href: '/modalities/proteins-peptides' },
      ],
    },
  ];

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200 select-none">
      <div className="w-full px-6 py-16 md:py-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
          
          {/* Left: Branding */}
          <div className="lg:shrink-0">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/images/Lambda & Novum Logo.png"
                alt="Lambda CDMO"
                width={2991}
                height={358}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6 lg:max-w-sm">
              Lambda CDMO is an integrated biologics solutions provider, accelerating therapeutic programs from cell line engineering to GMP drug product release.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-teal hover:border-brand-teal transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-teal hover:border-brand-teal transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:info@lambdacdmo.com" aria-label="Email" className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-brand-teal hover:border-brand-teal transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-500 hover:text-brand-blue transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <MapPin className="w-4 h-4 text-brand-teal" />
                <span>Ahmedabad, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Phone className="w-4 h-4 text-brand-teal" />
                <span>+91 79 0000 0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Mail className="w-4 h-4 text-brand-teal" />
                <span>info@lambdacdmo.com</span>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[10px] border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-medium text-xs uppercase tracking-wider shadow-sm hover:shadow active:scale-98 transition-all"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {currentYear} Lambda CDMO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/overview/quality" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Quality & Regulatory
            </Link>
            <Link href="/insights/blogs" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
