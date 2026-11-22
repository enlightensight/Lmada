import { getStoredPage } from '@/lib/pagesStorage';
import HomeClientView from '@/components/HomeClientView';

const DEFAULT_TITLE = 'Lambda CDMO - Integrated Biologics Development & GMP Manufacturing';
const DEFAULT_DESCRIPTION = 'Lambda CDMO provides end-to-end biologics development and manufacturing solutions across India and Europe, spanning cell line development, upstream & downstream bioprocessing, analytical characterization, and clinical cGMP production.';

// SEO title/description come from the home page record in the admin panel ("Page Settings & SEO").
export async function generateMetadata() {
  const home = getStoredPage('home', 'home');
  return {
    title: home?.metaTitle?.trim() || DEFAULT_TITLE,
    description: home?.metaDesc?.trim() || DEFAULT_DESCRIPTION,
  };
}

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const homePageData = getStoredPage('home', 'home', { previewDraft: isPreview });

  return (
    <>
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Home Page. Regular visitors see the live published version.</span>
        </div>
      )}
      <HomeClientView pageData={homePageData} />
    </>
  );
}
