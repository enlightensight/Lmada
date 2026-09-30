import { Metadata } from 'next';
import BlogAdminDashboard from '@/components/admin/BlogAdminDashboard';

export const metadata: Metadata = {
  title: 'Insights Content Management | Lambda CDMO Admin',
  description: 'Manage, create, and publish scientific blog articles, case studies, and insights for Lambda CDMO.',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <BlogAdminDashboard />;
}
