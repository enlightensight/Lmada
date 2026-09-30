'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  HelpCircle,
  Sparkles,
  Tag,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  FileText,
  Link2,
  ExternalLink,
  ChevronRight,
  Layers,
  Heading,
  Quote,
  List,
  AlertCircle,
  Copy,
  Check,
  Globe,
  Share2,
} from 'lucide-react';
import type { InsightItem, InsightDetailedSection } from '@/data/insightsData';
import { INSIGHT_TABS } from '@/data/insightsData';
import InsightDetailLayout from '@/components/page-layouts/InsightDetailLayout';

interface BlogAdminEditorProps {
  initialItem?: InsightItem | null;
  onBack: () => void;
  onSaved: (item: InsightItem) => void;
}

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'callout'
  | 'table'
  | 'image'
  | 'video'
  | 'quote'
  | 'list';

export interface EditorBlock {
  id: string;
  type: BlockType;
  headingText?: string;
  bodyText?: string;
  calloutTitle?: string;
  calloutText?: string;
  calloutMetric?: string;
  mediaUrl?: string;
  altText?: string;
  caption?: string;
  listItems?: string[];
  tableCaption?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default function BlogAdminEditor({
  initialItem,
  onBack,
  onSaved,
}: BlogAdminEditorProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Main Meta State
  const [id, setId] = useState(initialItem?.id || '');
  const [title, setTitle] = useState(initialItem?.title || '');
  const [slug, setSlug] = useState(initialItem?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialItem?.slug));
  const [category, setCategory] = useState<InsightItem['category']>(
    initialItem?.category || 'blogs'
  );
  const [badge, setBadge] = useState(initialItem?.badge || 'Cell Line Development');
  const [date, setDate] = useState(
    initialItem?.date ||
      new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
  );
  const [readTime, setReadTime] = useState(initialItem?.readTime || '8 min read');
  const [authorName, setAuthorName] = useState(
    initialItem?.author.name || 'Lambda CDMO Scientific Team'
  );
  const [authorRole, setAuthorRole] = useState(
    initialItem?.author.role || 'Cell Line Engineering Group'
  );
  const [image, setImage] = useState(
    initialItem?.image || '/images/cdn/unsplash-1614935151651-0bea6508db6b.jpg'
  );
  const [summary, setSummary] = useState(initialItem?.summary || '');
  const [subtitle, setSubtitle] = useState(initialItem?.detailedContent.subtitle || '');
  const [abstract, setAbstract] = useState(initialItem?.detailedContent.abstract || '');

  // Key Takeaways List
  const [keyTakeaways, setKeyTakeaways] = useState<string[]>(
    initialItem?.keyTakeaways || [
      'Proprietary expression vectors tailored to IgG1, IgG2, IgG4, and bispecific formats.',
      'Documented monoclonality assurance exceeding 99.9% probability via high-contrast imaging.',
    ]
  );

  // Methodology Highlights List
  const [methodologyHighlights, setMethodologyHighlights] = useState<string[]>(
    initialItem?.detailedContent.methodologyHighlights || [
      'High-contrast digital brightfield/fluorescence monoclonality verification.',
      'Codon optimization and targeted epigenetic vector expression systems.',
    ]
  );

  // Regulatory Impact
  const [regulatoryImpact, setRegulatoryImpact] = useState<string>(
    initialItem?.detailedContent.regulatoryImpact ||
      'Meets US FDA and EMA expectations for early clinical development and RCB documentation.'
  );

  // Tags
  const [tags, setTags] = useState<string[]>(
    initialItem?.tags || ['Cell Line Development', 'CHO Clones', 'Monoclonality', 'mAbs']
  );
  const [newTagInput, setNewTagInput] = useState('');

  // Dynamic Content Blocks
  const [blocks, setBlocks] = useState<EditorBlock[]>(() => {
    if (initialItem?.detailedContent.sections && initialItem.detailedContent.sections.length > 0) {
      const converted: EditorBlock[] = [];
      initialItem.detailedContent.sections.forEach((sec, idx) => {
        // Heading block
        converted.push({
          id: generateId(),
          type: 'heading',
          headingText: sec.heading,
        });

        // Paragraphs block
        if (sec.body && sec.body.length > 0) {
          converted.push({
            id: generateId(),
            type: 'paragraph',
            bodyText: sec.body.join('\n\n'),
          });
        }

        // Callout if any
        if (sec.callout) {
          converted.push({
            id: generateId(),
            type: 'callout',
            calloutTitle: sec.callout.title,
            calloutText: sec.callout.text,
            calloutMetric: sec.callout.metric,
          });
        }

        // Table if any
        if (sec.table) {
          converted.push({
            id: generateId(),
            type: 'table',
            tableCaption: sec.table.caption || '',
            tableHeaders: sec.table.headers || ['Metric / Attribute', 'Observed Value'],
            tableRows: sec.table.rows || [['Attribute 1', 'Value 1']],
          });
        }
      });
      return converted;
    }

    // Default template blocks for new article
    return [
      {
        id: generateId(),
        type: 'heading',
        headingText: '1. Platform Principles & Strategic Scaffolding',
      },
      {
        id: generateId(),
        type: 'paragraph',
        bodyText:
          'Our biologics development platform integrates molecular biology, early developability screening, and robust scale-up workflows designed to reduce timeline friction before clinical GMP manufacturing.\n\nEarly characterization under representative conditions eliminates late-phase scale-up bottlenecks and prepares programs for seamless tech transfer.',
      },
      {
        id: generateId(),
        type: 'callout',
        calloutTitle: 'Key Efficiency Metric',
        calloutText:
          'Integrated parallel workstreams compress development cycles while maintaining ICH Q6B regulatory standards.',
        calloutMetric: '16 Weeks',
      },
      {
        id: generateId(),
        type: 'heading',
        headingText: '2. High-Throughput Screening & Critical Quality Attributes',
      },
      {
        id: generateId(),
        type: 'paragraph',
        bodyText:
          'High-throughput analytical arrays screen expression titers, aggregation profiles, charge variants, and glycosylation early. This ensures the lead molecule candidates exhibit high stability and optimal manufacturability.',
      },
      {
        id: generateId(),
        type: 'table',
        tableCaption: 'Empirical Platform Benchmark Dataset',
        tableHeaders: ['Process Stage', 'Standard Industry Timeline', 'Lambda Accelerated Track', 'Quality Standard'],
        tableRows: [
          ['Vector to Stable Pool', '6-8 Weeks', '4 Weeks', 'Documented Monoclonality'],
          ['Clone Selection & Ranking', '8-10 Weeks', '6 Weeks', '>99.9% Assurance'],
          ['Research Cell Bank (RCB)', '6 Weeks', '4 Weeks', 'Full GMP-Ready Documentation'],
        ],
      },
    ];
  });

  // Hero File Upload Ref
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingHero, setUploadingHero] = useState(false);

  // Auto-slug sync
  useEffect(() => {
    if (!isSlugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManual]);

  // Handle Hero Image Upload
  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImage(data.url);
      } else {
        setErrorMessage(data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error uploading file');
    } finally {
      setUploadingHero(false);
      if (heroFileInputRef.current) heroFileInputRef.current.value = '';
    }
  };

  // Tag helper
  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const clean = newTagInput.trim().replace(/^#/, '');
    if (!tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Block Manipulation
  const addBlock = (type: BlockType) => {
    const newBlock: EditorBlock = {
      id: generateId(),
      type,
      headingText: type === 'heading' ? 'New Section Heading' : undefined,
      bodyText:
        type === 'paragraph'
          ? 'Enter descriptive scientific content here. Use **bold** for emphasized terminology.'
          : undefined,
      calloutTitle: type === 'callout' ? 'Platform Highlight' : undefined,
      calloutText:
        type === 'callout'
          ? 'Critical process parameter description and actionable guidance.'
          : undefined,
      calloutMetric: type === 'callout' ? '>99.9%' : undefined,
      tableCaption: type === 'table' ? 'Analytical Characterization Dataset' : undefined,
      tableHeaders: type === 'table' ? ['Parameter', 'Specification', 'Observed Result'] : undefined,
      tableRows:
        type === 'table'
          ? [
              ['Purity by SEC-HPLC', '≥ 95.0%', '98.4% Monomer'],
              ['Host Cell Protein (HCP)', '< 100 ppm', '< 15 ppm'],
              ['Endotoxin', '< 10 EU/mg', '< 0.5 EU/mg'],
            ]
          : undefined,
      mediaUrl:
        type === 'image'
          ? '/images/cdn/unsplash-1532094349884-543bc11b234d.jpg'
          : type === 'video'
          ? '/videos/Floating-Molecule-Video.mp4'
          : undefined,
      altText: type === 'image' ? 'Bioprocessing Cleanroom Suite' : undefined,
      caption: type === 'image' || type === 'video' ? 'Lambda CDMO Biologics Facility' : undefined,
      listItems:
        type === 'list'
          ? [
              'High-yield clonal vector design and codon optimization.',
              'Orthogonal physicochemical testing by QTOF LC-MS/MS peptide mapping.',
              'Automated robotic filling with Grade A isolation barrier technology.',
            ]
          : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, updates: Partial<EditorBlock>) => {
    setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)));
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(index, 1);
    newBlocks.splice(targetIndex, 0, moved);
    setBlocks(newBlocks);
  };

  // Convert Blocks back to InsightDetailedSection[]
  const compileSections = (): InsightDetailedSection[] => {
    const compiled: InsightDetailedSection[] = [];
    let currentSec: InsightDetailedSection = {
      heading: '1. Overview & Strategic Execution',
      body: [],
    };

    blocks.forEach((b) => {
      if (b.type === 'heading') {
        if (currentSec.body.length > 0 || currentSec.callout || currentSec.table) {
          compiled.push(currentSec);
        }
        currentSec = {
          heading: b.headingText || 'Section Heading',
          body: [],
        };
      } else if (b.type === 'paragraph') {
        if (b.bodyText) {
          const paras = b.bodyText.split('\n\n').filter((p) => p.trim().length > 0);
          currentSec.body.push(...paras);
        }
      } else if (b.type === 'callout') {
        currentSec.callout = {
          title: b.calloutTitle || 'Platform Principle',
          text: b.calloutText || '',
          metric: b.calloutMetric,
        };
      } else if (b.type === 'table') {
        if (b.tableHeaders && b.tableRows) {
          currentSec.table = {
            caption: b.tableCaption,
            headers: b.tableHeaders,
            rows: b.tableRows,
          };
        }
      } else if (b.type === 'list') {
        if (b.listItems && b.listItems.length > 0) {
          currentSec.body.push(b.listItems.map((item) => `• ${item}`).join('\n'));
        }
      } else if (b.type === 'image') {
        if (b.mediaUrl) {
          currentSec.body.push(`[Image: ${b.caption || b.altText || b.mediaUrl}]`);
        }
      }
    });

    if (currentSec.body.length > 0 || currentSec.callout || currentSec.table) {
      compiled.push(currentSec);
    }

    if (compiled.length === 0) {
      compiled.push({
        heading: '1. Scientific Discussion',
        body: [summary || 'Scientific details and data.'],
      });
    }

    return compiled;
  };

  // Construct Full InsightItem Object
  const constructInsightItem = (): InsightItem => {
    const finalSlug = slug.trim() || slugify(title);
    const finalId = id || `insight-${finalSlug}`;
    const sections = compileSections();

    return {
      id: finalId,
      slug: finalSlug,
      category,
      title: title.trim(),
      badge,
      date,
      readTime,
      author: {
        name: authorName,
        role: authorRole,
        avatar: '/images/lambda-symbol.svg',
      },
      image,
      summary: summary.trim() || subtitle.trim() || title.trim(),
      keyTakeaways: keyTakeaways.filter((t) => t.trim().length > 0),
      tags: tags.filter((t) => t.trim().length > 0),
      detailedContent: {
        subtitle: subtitle.trim() || summary.trim() || title.trim(),
        abstract: abstract.trim() || summary.trim(),
        sections,
        methodologyHighlights: methodologyHighlights.filter((m) => m.trim().length > 0),
        regulatoryImpact,
      },
    };
  };

  // Handle Save (Draft or Publish)
  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage('Please enter an article title.');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSaveSuccess(false);

    try {
      const payload = constructInsightItem();

      const res = await fetch('/api/admin/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.item) {
        setSaveSuccess(true);
        onSaved(data.item);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMessage(data.error || 'Failed to save insight article');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error occurred while saving article');
    } finally {
      setSaving(false);
    }
  };

  const previewItem = constructInsightItem();

  return (
    <div className="min-h-screen bg-slate-50 text-neutral-900 pb-20">
      {/* 1. TOP STICKY APP BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3.5">
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-slate-500 hover:text-neutral-900 hover:bg-slate-100 transition-all cursor-pointer"
              title="Back to articles list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  {initialItem ? 'Edit Article' : 'New Article'}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {category.toUpperCase()}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-neutral-900 truncate max-w-md">
                {title || 'Untitled Scientific Article'}
              </h1>
            </div>
          </div>

        {/* Action Buttons & Tabs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 hidden sm:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-slate-600 hover:text-neutral-900'
              }`}
            >
              Editor Mode
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-slate-600 hover:text-neutral-900'
              }`}
            >
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-slate-600 hover:text-neutral-900'
              }`}
            >
              SEO & Social
            </button>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : saveSuccess ? 'Published!' : 'Save & Publish'}</span>
          </button>
        </div>
        </div>
      </header>

      {/* Error & Success Messages */}
      {errorMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {saveSuccess && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Article successfully stored! It is live on the site.</span>
            </div>
            <a
              href={`/insights/${category}/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              <span>View Live Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* 2. TAB VIEWS */}
      {activeTab === 'preview' ? (
        <div className="pt-4">
          <div className="bg-white border-b border-slate-200 py-3 px-6 text-center text-xs text-slate-500 font-medium">
            ✦ This is a pixel-perfect preview of how this article will render on the live site.
          </div>
          <InsightDetailLayout item={previewItem} relatedItems={[]} />
        </div>
      ) : activeTab === 'seo' ? (
        /* SEO & SOCIAL SHARING PREVIEW PANEL */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-blue" />
              Auto SEO & Google Search Snippet Preview
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Search engines and social platforms will automatically read these metadata tags when indexing your article.
            </p>

            {/* Google SERP Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">https://www.lambdacdmo.com</span>
                <span>› insights › {category} › {slug}</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-blue-700 hover:underline cursor-pointer">
                {title ? `${title} | Lambda CDMO` : 'Article Title | Lambda CDMO'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                {summary || abstract || 'Scientific insights and bioprocess engineering from Lambda CDMO.'}
              </p>
            </div>

            {/* Social Share Card (OG Preview) */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-brand-orange" />
                LinkedIn / Twitter / Social Media Card Preview
              </h3>
              <div className="rounded-xl overflow-hidden border border-slate-200 max-w-lg bg-white shadow-sm">
                <div className="relative aspect-[1200/630] w-full bg-slate-100 overflow-hidden">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-1 bg-slate-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400">lambdacdmo.com</span>
                  <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{summary || abstract}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN ARTICLE EDITOR */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT 8 COLS: CORE CONTENT & BLOCKS */}
          <div className="lg:col-span-8 space-y-8">
            {/* ARTICLE HEADER & TITLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Accelerating Cell Line Development for Monoclonal Antibodies"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base sm:text-lg font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Hero Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g., From Vector Design to Documented Research Cell Bank on Compressed Timelines"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                />
              </div>

              {/* Summary / Meta Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Summary / Short Card Excerpt *
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief synopsis shown on the main insights cards and search results..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none"
                />
              </div>

              {/* Executive Abstract Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  Executive Abstract & Technical Scope
                </label>
                <textarea
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="In-depth scientific problem statement, therapeutic context, and technical scope..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue resize-none bg-blue-50/30"
                />
              </div>
            </div>

            {/* FEATURED HERO MEDIA (PHOTO / VIDEO) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Featured Hero Photo / Video *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={heroFileInputRef}
                    onChange={handleHeroFileUpload}
                    accept="image/*,video/mp4,video/webm"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={uploadingHero}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
                  >
                    {uploadingHero ? (
                      <div className="w-3.5 h-3.5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload File</span>
                  </button>
                </div>
              </div>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Or paste media URL: /images/... or https://..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-brand-blue"
              />

              {/* Live Preview */}
              {image && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                  {image.endsWith('.mp4') || image.endsWith('.webm') ? (
                    <video src={image} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={image} alt="Hero Media" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white font-medium">
                    Featured Media Preview
                  </div>
                </div>
              )}
            </div>

            {/* KEY QUANTITATIVE TAKEAWAYS */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  Key Quantitative Takeaways (Data Highlights)
                </label>
                <button
                  type="button"
                  onClick={() => setKeyTakeaways([...keyTakeaways, ''])}
                  className="inline-flex items-center gap-1 text-xs text-brand-orange font-semibold hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Takeaway
                </button>
              </div>

              <div className="space-y-2.5">
                {keyTakeaways.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...keyTakeaways];
                        updated[idx] = e.target.value;
                        setKeyTakeaways(updated);
                      }}
                      placeholder={`Takeaway bullet ${idx + 1}...`}
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm text-neutral-700 focus:outline-none focus:border-brand-blue"
                    />
                    <button
                      type="button"
                      onClick={() => setKeyTakeaways(keyTakeaways.filter((_, i) => i !== idx))}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC SCIENTIFIC CONTENT BLOCKS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-blue" />
                  Scientific Body Content Blocks
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  {blocks.length} block{blocks.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Render Blocks */}
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-brand-blue/40 transition-all space-y-4"
                  >
                    {/* Block Toolbar */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {block.type}
                        </span>
                        <span className="text-xs text-slate-400">Block #{index + 1}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-400 hover:text-neutral-900 disabled:opacity-30 rounded"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 'down')}
                          disabled={index === blocks.length - 1}
                          className="p-1 text-slate-400 hover:text-neutral-900 disabled:opacity-30 rounded"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="p-1 text-slate-400 hover:text-red-500 rounded ml-1"
                          title="Delete block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Block-Specific Inputs */}
                    {block.type === 'heading' && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                          Section Heading Text
                        </label>
                        <input
                          type="text"
                          value={block.headingText || ''}
                          onChange={(e) => updateBlock(block.id, { headingText: e.target.value })}
                          placeholder="e.g., 1. From Vector Design to Clone Selection"
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-base font-bold text-neutral-900 focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    )}

                    {block.type === 'paragraph' && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                          Paragraphs (Separate multiple paragraphs with double Enter)
                        </label>
                        <textarea
                          rows={4}
                          value={block.bodyText || ''}
                          onChange={(e) => updateBlock(block.id, { bodyText: e.target.value })}
                          placeholder="Scientific exposition, experimental details, protocols..."
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-neutral-800 focus:outline-none focus:border-brand-blue leading-relaxed resize-y"
                        />
                      </div>
                    )}

                    {block.type === 'callout' && (
                      <div className="space-y-3 bg-slate-900 text-white p-5 rounded-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-orange mb-1">
                              Callout Title
                            </label>
                            <input
                              type="text"
                              value={block.calloutTitle || ''}
                              onChange={(e) =>
                                updateBlock(block.id, { calloutTitle: e.target.value })
                              }
                              placeholder="e.g., Key Efficiency Metric"
                              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-brand-orange"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-brand-orange mb-1">
                              Prominent Metric Pill (Optional)
                            </label>
                            <input
                              type="text"
                              value={block.calloutMetric || ''}
                              onChange={(e) =>
                                updateBlock(block.id, { calloutMetric: e.target.value })
                              }
                              placeholder="e.g., >99.9% Assurance"
                              className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-brand-orange focus:outline-none focus:border-brand-orange"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Callout Description
                          </label>
                          <textarea
                            rows={2}
                            value={block.calloutText || ''}
                            onChange={(e) => updateBlock(block.id, { calloutText: e.target.value })}
                            placeholder="Key takeaway text displayed inside the dark gradient callout..."
                            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-brand-orange resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {block.type === 'table' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={block.tableCaption || ''}
                            onChange={(e) =>
                              updateBlock(block.id, { tableCaption: e.target.value })
                            }
                            placeholder="Table Caption / Dataset Title"
                            className="text-xs font-bold text-neutral-800 border-b border-slate-200 pb-1 focus:outline-none focus:border-brand-blue"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const headers = [...(block.tableHeaders || ['Col 1', 'Col 2']), `Col ${(block.tableHeaders?.length || 2) + 1}`];
                                const rows = (block.tableRows || [['Cell 1', 'Cell 2']]).map((r) => [...r, 'Value']);
                                updateBlock(block.id, { tableHeaders: headers, tableRows: rows });
                              }}
                              className="text-[11px] text-brand-blue font-semibold hover:underline"
                            >
                              + Add Column
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const rowLen = block.tableHeaders?.length || 2;
                                const newRow = Array(rowLen).fill('Data Value');
                                updateBlock(block.id, {
                                  tableRows: [...(block.tableRows || []), newRow],
                                });
                              }}
                              className="text-[11px] text-brand-orange font-semibold hover:underline"
                            >
                              + Add Row
                            </button>
                          </div>
                        </div>

                        {/* Interactive Table Matrix */}
                        <div className="overflow-x-auto border border-slate-200 rounded-xl">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 border-b border-slate-200">
                              <tr>
                                {(block.tableHeaders || []).map((header, hIdx) => (
                                  <th key={hIdx} className="p-2">
                                    <input
                                      type="text"
                                      value={header}
                                      onChange={(e) => {
                                        const updated = [...(block.tableHeaders || [])];
                                        updated[hIdx] = e.target.value;
                                        updateBlock(block.id, { tableHeaders: updated });
                                      }}
                                      className="w-full bg-transparent font-bold text-neutral-900 focus:outline-none"
                                    />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {(block.tableRows || []).map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-2">
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => {
                                          const updatedRows = [...(block.tableRows || [])];
                                          updatedRows[rIdx] = [...updatedRows[rIdx]];
                                          updatedRows[rIdx][cIdx] = e.target.value;
                                          updateBlock(block.id, { tableRows: updatedRows });
                                        }}
                                        className="w-full bg-transparent text-slate-700 focus:outline-none"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.mediaUrl || ''}
                          onChange={(e) => updateBlock(block.id, { mediaUrl: e.target.value })}
                          placeholder="Image URL: /images/... or https://..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-neutral-700"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                            placeholder="Image Caption"
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={block.altText || ''}
                            onChange={(e) => updateBlock(block.id, { altText: e.target.value })}
                            placeholder="Alt text"
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Block Selector Toolbar */}
              <div className="p-4 bg-white rounded-2xl border border-dashed border-slate-300 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400 mr-2">+ Insert Block:</span>
                <button
                  type="button"
                  onClick={() => addBlock('heading')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Heading className="w-3.5 h-3.5 text-brand-blue" /> Heading
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('paragraph')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" /> Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('callout')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" /> Callout Card
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('table')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <TableIcon className="w-3.5 h-3.5 text-emerald-600" /> Data Table
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('image')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-500" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('list')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <List className="w-3.5 h-3.5 text-teal-600" /> Bullet List
                </button>
              </div>
            </div>

            {/* METHODOLOGY & REGULATORY MODULES */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand-blue" />
                    Validated Methodology & Instrumentation Fleet
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setMethodologyHighlights([...methodologyHighlights, ''])
                    }
                    className="text-xs text-brand-blue font-semibold hover:underline cursor-pointer"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {methodologyHighlights.map((method, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                      <input
                        type="text"
                        value={method}
                        onChange={(e) => {
                          const updated = [...methodologyHighlights];
                          updated[idx] = e.target.value;
                          setMethodologyHighlights(updated);
                        }}
                        placeholder={`Methodology item ${idx + 1}...`}
                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setMethodologyHighlights(
                            methodologyHighlights.filter((_, i) => i !== idx)
                          )
                        }
                        className="p-1 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Impact */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Regulatory & Global Filing Significance
                </label>
                <textarea
                  rows={2}
                  value={regulatoryImpact}
                  onChange={(e) => setRegulatoryImpact(e.target.value)}
                  placeholder="Compliance standards (FDA, EMA, ICH Q2, PMDA)..."
                  className="w-full px-3.5 py-2 border border-amber-200 bg-amber-50/50 rounded-xl text-xs sm:text-sm text-amber-950 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLS: SIDEBAR METADATA & PUBLISH SETTINGS */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category & Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 pb-3">
                Publication Settings
              </h3>

              {/* Category Tab */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  Category Section *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 bg-slate-50 focus:outline-none focus:border-brand-blue"
                >
                  {INSIGHT_TABS.map((tab) => (
                    <option key={tab.slug} value={tab.slug}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Badge Tag */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  Topic Badge Pill
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g., Cell Line Development"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-neutral-900"
                />
              </div>

              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-500">URL Slug *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSlugManual(false);
                      setSlug(slugify(title));
                    }}
                    className="text-[10px] text-brand-blue font-semibold hover:underline cursor-pointer"
                  >
                    Auto-generate
                  </button>
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="accelerating-cell-line-development"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono text-neutral-800"
                />
                <p className="text-[10px] text-slate-400 mt-1 truncate">
                  /insights/{category}/{slug}
                </p>
              </div>

              {/* Read Time & Date */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="8 min read"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="November 15, 2023"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-orange" />
                Scientific Author
              </h3>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Author / Team Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Lambda CDMO Scientific Team"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  Author Role / Group
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="Cell Line Engineering Group"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-blue" />
                Indexed Tags
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag (e.g. CHO, mAbs)..."
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-400 hover:text-red-500 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
