import { withBase } from '@/lib/basePath';
import React from 'react';
import {
  Activity,
  Atom,
  Award,
  Beaker,
  BookOpen,
  Bug,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Cpu,
  Database,
  Dna,
  Droplets,
  Eye,
  Factory,
  FileCheck,
  FileText,
  Filter,
  FlaskConical,
  Gauge,
  GitMerge,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers,
  LineChart,
  Lock,
  Microscope,
  Package,
  PackageCheck,
  Pipette,
  Repeat,
  Rocket,
  Scale,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Snowflake,
  Sparkles,
  Syringe,
  Target,
  TestTubes,
  Thermometer,
  Timer,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import * as Drawn from '@/components/icons/CapabilityIcons';
import { getCapabilityIcon, type CapabilityIcon } from '@/components/icons/CapabilityIcons';

/**
 * Icons an editor can pick in the admin panel, and how a stored choice is turned back into an icon.
 *
 * A choice is stored as a short reference string:
 *   "draw:VialIcon"      one of the site's own drawn icons (src/components/icons/CapabilityIcons.tsx)
 *   "lucide:Factory"     one of the general-purpose line icons below
 *   "/uploads/x.svg"     an uploaded SVG or image (any site path or https URL)
 * Plain lucide names ("Factory") are accepted too, for cards saved before references existed.
 *
 * Per-item choices live on the page record as `page.itemIcons`, keyed by the item's text,
 * so they follow the item when lists are reordered. A layout asks `pickIcon(page.itemIcons, text, auto)`.
 */

export type IconComponent = CapabilityIcon | LucideIcon | React.ComponentType<{ className?: string }>;

const LUCIDE: Record<string, LucideIcon> = {
  Activity, Atom, Award, Beaker, BookOpen, Bug, Building2, Calendar, CheckCircle2, ClipboardCheck, Clock, Cpu,
  Database, Dna, Droplets, Eye, Factory, FileCheck, FileText, Filter, FlaskConical, Gauge, GitMerge, Globe,
  GraduationCap, HeartPulse, Layers, LineChart, Lock, Microscope, Package, PackageCheck, Pipette, Repeat, Rocket,
  Scale, Search, Settings, Share2, ShieldAlert, ShieldCheck, Sliders, Snowflake, Sparkles, Syringe, Target,
  TestTubes, Thermometer, Timer, TrendingUp, Truck, Users, Workflow, Zap,
};

const DRAWN: Record<string, CapabilityIcon> = Object.fromEntries(
  Object.entries(Drawn).filter(([name, value]) => /^[A-Z]\w*Icon$/.test(name) && typeof value === 'function')
) as Record<string, CapabilityIcon>;

const humanize = (name: string) =>
  name.replace(/Icon$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());

export interface IconLibraryEntry {
  ref: string;
  label: string;
  group: 'Biologics & lab (drawn for this site)' | 'General';
  Icon: IconComponent;
}

/** Everything the admin icon picker offers, drawn icons first. */
export const ICON_LIBRARY: IconLibraryEntry[] = [
  ...Object.entries(DRAWN)
    .map(([name, Icon]) => ({ ref: `draw:${name}`, label: humanize(name), group: 'Biologics & lab (drawn for this site)' as const, Icon }))
    .sort((a, b) => a.label.localeCompare(b.label)),
  ...Object.entries(LUCIDE)
    .map(([name, Icon]) => ({ ref: `lucide:${name}`, label: humanize(name), group: 'General' as const, Icon }))
    .sort((a, b) => a.label.localeCompare(b.label)),
];

export const isImageIconRef = (ref?: string | null) => Boolean(ref && /^(\/|https?:\/\/)/i.test(ref.trim()));

const imageIconCache = new Map<string, IconComponent>();

/** Renders an uploaded SVG/image as an icon; it turns black on hover like the drawn icons. */
function imageIcon(src: string): IconComponent {
  const cached = imageIconCache.get(src);
  if (cached) return cached;
  const ImageIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBase(src)}
      alt=""
      aria-hidden="true"
      className={`${className} object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover/pill:brightness-0`}
    />
  );
  imageIconCache.set(src, ImageIcon);
  return ImageIcon;
}

/** The icon a stored reference points to, or null when the reference is empty or unknown. */
export function iconFromRef(ref?: string | null): IconComponent | null {
  const value = (ref || '').trim();
  if (!value) return null;
  if (isImageIconRef(value)) return imageIcon(value);
  if (value.startsWith('draw:')) return DRAWN[value.slice(5)] || null;
  if (value.startsWith('lucide:')) return LUCIDE[value.slice(7)] || null;
  return LUCIDE[value] || DRAWN[value] || null;
}

/** Key used in `page.itemIcons` for an item. */
export const itemIconKey = (text: string) => (text || '').replace(/\s+/g, ' ').trim();

/** The editor's chosen icon for an item, falling back to the layout's automatic icon. */
export function pickIcon<T extends IconComponent | null | undefined>(
  itemIcons: Record<string, string> | undefined,
  text: string,
  auto: T
): IconComponent | T {
  return iconFromRef(itemIcons?.[itemIconKey(text)]) || auto;
}

/**
 * Icons for a whole list of points (editor choices first, then the drawn match), or null when any
 * point has none. A list is shown either fully with icons or fully without, never half and half.
 */
export function getListIcons(points: string[], itemIcons?: Record<string, string>): IconComponent[] | null {
  if (!points || points.length === 0) return null;
  const icons = points.map((text) => pickIcon(itemIcons, text, getCapabilityIcon(text)));
  return icons.every(Boolean) ? (icons as IconComponent[]) : null;
}

/** Renders a stored icon reference directly, with an optional fallback component. */
export default function SiteIcon({
  value,
  fallback,
  className,
}: {
  value?: string | null;
  fallback?: IconComponent | null;
  className?: string;
}) {
  const Icon = iconFromRef(value) || fallback;
  return Icon ? React.createElement(Icon, { className }) : null;
}
