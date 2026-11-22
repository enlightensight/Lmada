import type { NextConfig } from "next";

// The virtual tour (about 700 MB of image tiles) is not part of this repository. It lives in its
// own repository (enlightensight/lambda-virtual-tour) and is hosted as a separate static site.
// Production builds send every /virtual-tour/... link on the site there. In local development
// (`npm run dev`) nothing is redirected, so the tour is served from public/virtual-tour as before.
// Set VIRTUAL_TOUR_URL (no trailing slash) to use a different host, e.g. after moving the tour.
const HOSTED_VIRTUAL_TOUR_URL = 'https://lambda-virtual-tour.onrender.com';
const virtualTourUrl = (
  process.env.VIRTUAL_TOUR_URL || (process.env.NODE_ENV === 'production' ? HOSTED_VIRTUAL_TOUR_URL : '')
)
  .trim()
  .replace(/\/+$/, '');
const virtualTourRedirects = virtualTourUrl
  ? [
      {
        source: '/virtual-tour',
        destination: `${virtualTourUrl}/00%20MAIN%20BUILDING/index.htm`,
        permanent: false,
      },
      {
        source: '/virtual-tour/:path*',
        destination: `${virtualTourUrl}/:path*`,
        permanent: false,
      },
    ]
  : [];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...virtualTourRedirects,

      // Primary Hub Canonical Redirects
      {
        source: '/characterization',
        destination: '/analytical-characterization-testing',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/development-services',
        permanent: true,
      },
      {
        source: '/manufacturing',
        destination: '/manufacturing-services',
        permanent: true,
      },

      // Overview Slug Redirects
      {
        source: '/overview/about',
        destination: '/overview/about-lambda-cdmo',
        permanent: true,
      },
      {
        source: '/overview/leadership',
        destination: '/overview/leadership-team',
        permanent: true,
      },
      {
        source: '/overview/quality',
        destination: '/overview/quality-and-compliance',
        permanent: true,
      },
      {
        source: '/overview/integrated',
        destination: '/overview/integrated-development-to-manufacturing',
        permanent: true,
      },

      // Services Slug Redirects
      {
        source: '/services/process',
        destination: '/services/process-development',
        permanent: true,
      },
      {
        source: '/services/analytical',
        destination: '/services/analytical-development',
        permanent: true,
      },
      {
        source: '/services/cell-line',
        destination: '/services/cell-line-development',
        permanent: true,
      },

      // Manufacturing Slug Redirects
      {
        source: '/manufacturing/drug-substance',
        destination: '/manufacturing/drug-substance-manufacturing',
        permanent: true,
      },
      {
        source: '/manufacturing/drug-product',
        destination: '/manufacturing/drug-product-manufacturing',
        permanent: true,
      },

      // Characterization Slug Redirects
      {
        source: '/characterization/physicochemical',
        destination: '/characterization/physicochemical-characterization',
        permanent: true,
      },
      {
        source: '/characterization/bioassays',
        destination: '/characterization/bioassays-immunogenicity-testing',
        permanent: true,
      },
      {
        source: '/characterization/microbiological',
        destination: '/characterization/microbiological-testing',
        permanent: true,
      },

      // Modalities Slug Redirects
      {
        source: '/modalities/mabs',
        destination: '/modalities/monoclonal-antibodies',
        permanent: true,
      },
      {
        source: '/modalities/bispecifics',
        destination: '/modalities/bispecific-antibodies',
        permanent: true,
      },
      {
        source: '/modalities/adcs',
        destination: '/modalities/antibody-drug-conjugates',
        permanent: true,
      },
      {
        source: '/modalities/proteins',
        destination: '/modalities/proteins-peptides',
        permanent: true,
      },
      {
        source: '/modalities/biosimilars',
        destination: '/modalities/monoclonal-antibodies',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
