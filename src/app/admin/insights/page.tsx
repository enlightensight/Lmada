import { Metadata } from 'next';
import BlogAdminDashboard from '@/components/admin/BlogAdminDashboard';

// Rendered on each request: a fixed (prerendered) page is marked cacheable for a year, and the CDN in front of
// the client server (Sucuri) would keep serving an old copy after every deploy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights Content Management | Lambda CDMO Admin',
  description: 'Manage, create, and publish scientific blog articles, case studies, and insights for Lambda CDMO.',
  robots: 'noindex, nofollow',
};

export default function AdminInsightsPage() {
  return <BlogAdminDashboard />;
}
