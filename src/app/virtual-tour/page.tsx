import { redirect } from 'next/navigation';

// Rendered on each request: a fixed (prerendered) page is marked cacheable for a year, and the CDN in front of
// the client server (Sucuri) would keep serving an old copy after every deploy.
export const dynamic = 'force-dynamic';

export default function VirtualTourPage() {
  redirect('/virtual-tour/00%20MAIN%20BUILDING/index.htm');
}
