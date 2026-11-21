import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/modalities/proteins',
        destination: '/modalities/proteins-peptides',
        permanent: true,
      },
      {
        source: '/modalities/biosimilars',
        destination: '/modalities/mabs',
        permanent: true,
      },
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
    ];
  },
};

export default nextConfig;
