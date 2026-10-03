import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Content & Website Pages Management | Lambda CDMO Admin',
  description: 'Manage, create, and publish website pages, hero sections, and scientific insights for Lambda CDMO.',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
