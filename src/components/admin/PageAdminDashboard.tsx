'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Globe,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
  FileText,
  RotateCcw,
  Sparkles,
  Layout,
  Rocket,
  Clock,
  Eye
} from 'lucide-react';
import type { CDMOPage } from '@/data/cdmoData';
import PageAdminEditor from './PageAdminEditor';
import CreatePageModal from './CreatePageModal';

const CATEGORY_TABS = [
  { slug: 'all', label: 'All Pages' },
  { slug: 'home', label: 'Home Page' },
  { slug: 'overview', label: 'Overview' },
  { slug: 'services', label: 'Services' },
  { slug: 'manufacturing', label: 'Manufacturing' },
  { slug: 'characterization', label: 'Characterization' },
  { slug: 'facility&location', label: 'Facility & Location' },
  { slug: 'modalities', label: 'Modalities' },
  { slug: 'insights', label: 'Insights' }
];

interface PageAdminDashboardProps {
  onOpenCreatePageModal?: () => void;
}

export default function PageAdminDashboard() {
  const [pages, setPages] = useState<CDMOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPage, setEditingPage] = useState<CDMOPage | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [publishingKey, setPublishingKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Quick publish handler from table
  const handleQuickPublish = async (category: string, slug: string, title: string) => {
    const key = `${category}-${slug}`;
    setPublishingKey(key);
    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish' })
      });
      const data = await res.json();
      if (data.success) {
        loadPages();
        setNotification({
          type: 'success',
          message: `"${title}" has been PUBLISHED and is now live on the website!`
        });
        setTimeout(() => setNotification(null), 3500);
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'Failed to publish page.'
        });
      }
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Error occurred while publishing page.'
      });
    } finally {
      setPublishingKey(null);
    }
  };

  // Load all pages from storage API
  const loadPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      if (data.success && Array.isArray(data.pages)) {
        setPages(data.pages);
      }
    } catch (err) {
      console.error('Failed to load pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  // Handle Delete / Reset Page
  const handleDeleteOrReset = async (category: string, slug: string, title: string) => {
    const isHome = category === 'home' && slug === 'home';
    const isHub = slug === category;
    const confirmPrompt = (isHome || isHub)
      ? `Are you sure you want to reset "${title}" (${isHome ? '/' : `/${category}`}) back to factory defaults?`
      : `Are you sure you want to delete or reset "${title}" (${category}/${slug})?`;

    if (!window.confirm(confirmPrompt)) return;

    const key = `${category}-${slug}`;
    setDeletingKey(key);

    try {
      const res = await fetch(`/api/admin/pages/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        loadPages();
        setNotification({
          type: 'success',
          message: data.message || `Page "${title}" was updated.`
        });
        setTimeout(() => setNotification(null), 3500);
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'Failed to process page delete/reset.'
        });
      }
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Error occurred while resetting page'
      });
    } finally {
      setDeletingKey(null);
    }
  };

  // Handle create page callback
  const handlePageCreated = async (newPage: CDMOPage) => {
    setIsCreateModalOpen(false);
    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: newPage })
      });
      const data = await res.json();
      if (data.success) {
        setPages((prev) => [...prev, data.page || newPage]);
        setEditingPage(data.page || newPage);
        setNotification({
          type: 'success',
          message: `Created new page "${newPage.title}". Opened in editor!`
        });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'Failed to create new page.'
        });
      }
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Error creating page'
      });
    }
  };

  // If in Editor View
  if (editingPage) {
    return (
      <PageAdminEditor
        initialPage={editingPage}
        onBack={() => {
          setEditingPage(null);
          loadPages();
        }}
        onSaved={(saved) => {
          loadPages();
          setEditingPage(saved);
        }}
      />
    );
  }

  // Filter Pages
  const filteredPages = pages.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metaDesc?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Hub pages appear at the top of their category
    const aIsHub = a.slug === a.category || (a.category === 'home' && a.slug === 'home');
    const bIsHub = b.slug === b.category || (b.category === 'home' && b.slug === 'home');
    if (aIsHub && !bIsHub) return -1;
    if (!aIsHub && bIsHub) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const count =
              tab.slug === 'all'
                ? pages.length
                : pages.filter((p) => p.category.toLowerCase() === tab.slug.toLowerCase()).length;

            return (
              <button
                key={tab.slug}
                onClick={() => setSelectedCategory(tab.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === tab.slug
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-neutral-900 hover:bg-slate-200/70'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages by title, slug..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Loading website pages from storage...</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">No pages matched</h3>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery
                  ? `No website pages matched "${searchQuery}".`
                  : 'No pages found in this category.'}
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-semibold shadow-xs"
            >
              Create New Page
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Page & Title</th>
                  <th className="py-3.5 px-4">Live Route</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Sections</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((p) => {
                  const isHome = p.category === 'home' && p.slug === 'home';
                  const isHub = p.slug === p.category;
                  const livePath = isHome ? '/' : isHub ? `/${p.category}` : `/${p.category}/${p.slug}`;
                  const previewPath = `${livePath}${livePath.includes('?') ? '&' : '?'}preview=true`;
                  const key = `${p.category}-${p.slug}`;
                  const isDraftOnly = p.isPublished === false;
                  const hasUnpublished = Boolean(p.hasUnpublishedChanges);

                  return (
                    <tr key={key} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Page Title & Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5 max-w-md">
                          <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <img
                              src={p.image || '/images/hero_cleanroom.png'}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {isHome && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                  Home Page
                                </span>
                              )}
                              {isHub && !isHome && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200/60">
                                  Category Hub
                                </span>
                              )}
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                                {p.badge || p.category}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-brand-blue transition-colors">
                              {p.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                              {p.heading || p.metaDesc}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Route Path */}
                      <td className="py-4 px-4 font-mono text-xs text-slate-600">
                        <Link
                          href={livePath}
                          target="_blank"
                          className="hover:text-brand-blue flex items-center gap-1.5"
                        >
                          <span>{livePath}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-brand-blue" />
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {p.category}
                        </span>
                      </td>

                      {/* Sections Count */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-100 flex items-center gap-1.5 w-fit">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{p.sections?.length || 0} Sections</span>
                        </span>
                      </td>

                      {/* Publication Status Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isDraftOnly ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                            <Clock className="w-3 h-3 text-amber-700" />
                            <span>Draft Only</span>
                          </span>
                        ) : hasUnpublished ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span>Unpublished Edits</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* Quick Publish Button if draft changes exist */}
                          {(hasUnpublished || isDraftOnly) && (
                            <button
                              onClick={() => handleQuickPublish(p.category, p.slug, p.title)}
                              disabled={publishingKey === key}
                              className="p-1.5 px-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                              title="Publish Draft Changes to Live Website"
                            >
                              {publishingKey === key ? (
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Rocket className="w-3.5 h-3.5" />
                              )}
                              <span>Publish</span>
                            </button>
                          )}

                          {/* Preview Draft */}
                          <Link
                            href={previewPath}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors"
                            title="Preview Draft"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Edit Page */}
                          <button
                            onClick={() => setEditingPage(p)}
                            className="p-2 rounded-lg text-slate-400 hover:text-brand-orange hover:bg-orange-50 transition-colors cursor-pointer"
                            title="Edit Page in Studio"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* View Live */}
                          <Link
                            href={livePath}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                            title="View on Live Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Reset / Delete */}
                          <button
                            onClick={() => handleDeleteOrReset(p.category, p.slug, p.title)}
                            disabled={deletingKey === key}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-30"
                            title={isHome ? 'Reset Home Page to Default' : 'Delete / Reset Page'}
                          >
                            {deletingKey === key ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : isHome ? (
                              <RotateCcw className="w-4 h-4 text-slate-400 hover:text-brand-orange" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create New Page Modal */}
      <CreatePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePage={handlePageCreated}
        existingPages={pages}
      />
    </div>
  );
}
