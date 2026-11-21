import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
