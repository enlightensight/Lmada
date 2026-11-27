import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Rendered on each request: a fixed (prerendered) page is marked cacheable for a year, and the CDN in front of
// the client server (Sucuri) would keep serving an old copy after every deploy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Content & Website Pages Management | Lambda CDMO Admin',
  description: 'Manage, create, and publish website pages, hero sections, and scientific insights for Lambda CDMO.',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
