import CommonCTA from '@/components/CommonCTA';
import type { CDMOPage } from '@/data/cdmoData';

interface PageCTAProps {
  page: CDMOPage;
  /** Layout-specific defaults used when the page record leaves a field empty. */
  defaults?: Partial<React.ComponentProps<typeof CommonCTA>>;
}

const isExternal = (href?: string) => Boolean(href && /^https?:\/\//i.test(href));

/**
 * The closing call-to-action banner of a page, driven by the page's CMS record
 * ("Footer Conversion CTA Banner" card in the admin panel: ctaTitle, ctaSubtitle,
 * primaryCta, secondaryCta). Empty fields fall back to `defaults`, then to
 * CommonCTA's built-in copy, so pages that never set them look unchanged.
 */
export default function PageCTA({ page, defaults = {} }: PageCTAProps) {
  const primaryHref = page.primaryCta?.link || page.primaryCta?.href || defaults.primaryButtonHref;
  const secondaryHref = page.secondaryCta?.link || page.secondaryCta?.href || defaults.secondaryButtonHref;

  // Only pass what is set: undefined props let CommonCTA use its own defaults.
  const props: React.ComponentProps<typeof CommonCTA> = { ...defaults };
  if (page.ctaTitle?.trim()) props.title = page.ctaTitle;
  if (page.ctaSubtitle?.trim()) props.subtitle = page.ctaSubtitle;
  if (page.primaryCta?.text?.trim()) props.primaryButtonText = page.primaryCta.text;
  if (primaryHref) {
    props.primaryButtonHref = primaryHref;
    if (isExternal(primaryHref)) {
      props.primaryButtonTarget = '_blank';
      props.primaryButtonRel = 'noopener noreferrer';
    }
  }
  if (page.secondaryCta?.text?.trim()) props.secondaryButtonText = page.secondaryCta.text;
  if (secondaryHref) {
    props.secondaryButtonHref = secondaryHref;
    if (isExternal(secondaryHref)) {
      props.secondaryButtonTarget = '_blank';
      props.secondaryButtonRel = 'noopener noreferrer';
    }
  }

  return <CommonCTA {...props} />;
}
