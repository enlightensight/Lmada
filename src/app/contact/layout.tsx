// The contact page is a client component, so its route settings live here. Rendered on each request: a fixed
// (prerendered) page is marked cacheable for a year, and the CDN in front of the client server (Sucuri) would keep
// serving an old copy after every deploy.
export const dynamic = 'force-dynamic';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
