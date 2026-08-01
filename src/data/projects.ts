export interface Project {
  slug: string;
  title: string;
  category: string; // Used for filtering
  description: string;
  image: string;
  year: string;
  client: string;
  role: string;
  link: string;
}

export const projects: Project[] = [
  {
    slug: 'brandora',
    title: 'Brandora',
    category: 'Business',
    description: 'A complete brand identity and editorial design system crafted for next-generation platforms.',
    image: '/images/cdn/unsplash-1618005182384-a83a8bd57fbe.jpg',
    year: '2025',
    client: 'Brandora Inc.',
    role: 'Lead Visual Designer',
    link: 'https://brandora.com',
  },
  {
    slug: 'nivora',
    title: 'Nivora',
    category: 'AI',
    description: 'Autonomous AI scheduling assistant with a glassmorphic dashboard interface and voice triggers.',
    image: '/images/cdn/unsplash-1600585154340-be6161a56a0c.jpg',
    year: '2026',
    client: 'Nivora Labs',
    role: 'Product Designer',
    link: 'https://nivora.ai',
  },
  {
    slug: 'codify',
    title: 'Codify',
    category: 'One page',
    description: 'High-performance visual editor that compiles Figma layers directly into clean React codebases.',
    image: '/images/cdn/unsplash-1555066931-4365d14bab8c.jpg',
    year: '2025',
    client: 'Codify Co.',
    role: 'Frontend Architect & UI Designer',
    link: 'https://codify.dev',
  },
  {
    slug: 'neutra',
    title: 'Neutra',
    category: 'Portfolio',
    description: 'Minimalist editorial display template curated for modern galleries, photographers, and architects.',
    image: '/images/cdn/unsplash-1507525428034-b723cf961d3e.jpg',
    year: '2024',
    client: 'Neutra Studio',
    role: 'Digital Designer',
    link: 'https://neutra.studio',
  },
  {
    slug: 'snapkit',
    title: 'Snapkit',
    category: 'Online course',
    description: 'Interactive course platform providing bite-sized animation tutorials for UI engineers.',
    image: '/images/cdn/unsplash-1542751371-adc38448a05e.jpg',
    year: '2026',
    client: 'Snapkit Education',
    role: 'Motion Designer & Creator',
    link: 'https://snapkit.academy',
  },
  {
    slug: 'todofusion',
    title: 'TodoFusion',
    category: 'Portfolio',
    description: 'Productivity application focused on context-aware task bundling and timeline analysis.',
    image: '/images/cdn/unsplash-1484480974693-6ca0a78fb36b.jpg',
    year: '2025',
    client: 'TodoFusion App',
    role: 'Product Designer',
    link: 'https://todofusion.app',
  },
];
