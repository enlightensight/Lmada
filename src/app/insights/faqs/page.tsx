import type { Metadata } from 'next';
import FAQPageContent from '@/components/FAQPageContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | Lambda CDMO',
  description:
    'Comprehensive answers to client inquiries on biologics cell line engineering, upstream & downstream process development, analytical QTPP, cGMP manufacturing, and regulatory compliance across India and the UK.',
  openGraph: {
    title: 'Frequently Asked Questions (FAQs) | Lambda CDMO',
    description:
      'Explore technical questions and answers regarding Lambda CDMO’s bioprocess development, analytical characterization, and clinical GMP manufacturing capabilities.',
    url: 'https://www.lambdacdmo.com/insights/faqs',
  },
};

export default function FAQsPage() {
  return <FAQPageContent />;
}
