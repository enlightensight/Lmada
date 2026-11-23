/**
 * Shared by the facility page layout and the admin icon picker.
 */
/**
 * Splits a "X includes a, b, c, and d." style paragraph into a label, list items
 * and trailing clause. Returns null when the paragraph is not list-shaped, so
 * CMS-edited copy falls back to a normal paragraph.
 */
export function parseFacilityListParagraph(para: string): { intro: string; items: string[]; outro: string } | null {
  const cap = (t: string) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
  const toItems = (list: string) =>
    list
      .split(/,\s*(?:and\s+)?/)
      .map((item) => cap(item.trim().replace(/\.$/, '')))
      .filter(Boolean);
  const commaCount = (t: string) => (t.match(/,/g) || []).length;

  const bold = para.match(/^(.*?)\*\*(.+?)\*\*(.*)$/);
  if (bold && bold[1].trim() && commaCount(bold[2]) >= 2) {
    return { intro: bold[1].trim(), items: toItems(bold[2]), outro: cap(bold[3].trim()) };
  }

  const plain = para.replace(/\*\*/g, '').match(/^(.+?\b(?:includes?|incorporates?|comprises?))\s+(.+?)\.?$/i);
  if (plain && commaCount(plain[2]) >= 2) {
    return { intro: plain[1].trim(), items: toItems(plain[2]), outro: '' };
  }
  return null;
}
