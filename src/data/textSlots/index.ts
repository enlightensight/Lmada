import type { PageTextSlot } from '@/lib/pageText';
import { OVERVIEW_TEXT_SLOTS } from './overview';
import { SERVICES_TEXT_SLOTS } from './services';
import { HUBS_TEXT_SLOTS } from './hubs';
import { MISC_TEXT_SLOTS } from './misc';

/** Every editable "additional page content" slot on the site. */
export const ALL_TEXT_SLOTS: PageTextSlot[] = [
  ...OVERVIEW_TEXT_SLOTS,
  ...SERVICES_TEXT_SLOTS,
  ...HUBS_TEXT_SLOTS,
  ...MISC_TEXT_SLOTS,
];
