'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  BookOpen,
  FileText,
  Download,
  Newspaper,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Database,
  Globe,
  Settings,
  RefreshCw,
  TrendingUp,
  LogOut,
  ShieldCheck,
  User,
} from 'lucide-react';
import type { InsightItem } from '@/data/insightsData';
import { INSIGHT_TABS } from '@/data/insightsData';
import BlogAdminEditor from './BlogAdminEditor';
import BlogAdminLogin from './BlogAdminLogin';

export default function BlogAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [items, setItems] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<InsightItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check auth on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('lambda_admin_auth') === 'true';
      const storedUser = localStorage.getItem('lambda_admin_user');
      if (isAuth) {
        setIsAuthenticated(true);
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch (e) {}
        }
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Fetch all insights from storage API
  const loadInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/insights');
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch (err) {
      console.error('Failed to load insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadInsights();
    }
  }, [isAuthenticated]);

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    loadInsights();
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lambda_admin_auth');
      localStorage.removeItem('lambda_admin_token');
      localStorage.removeItem('lambda_admin_user');
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // If loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated, show Login Portal
  if (!isAuthenticated) {
    return <BlogAdminLogin onLogin={handleLogin} />;
  }

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/insights/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== id && i.slug !== id));
        setNotification({
          type: 'success',
          message: `Article "${title}" was successfully deleted.`,
        });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setNotification({
          type: 'error',
          message: data.error || 'Failed to delete article',
        });
      }
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Error occurred while deleting',
      });
    } finally {
      setDeletingId(null);
    }
  };

  // If in Editor view
  if (isCreatingNew || editingItem) {
    return (
      <BlogAdminEditor
        initialItem={editingItem}
        onBack={() => {
          setIsCreatingNew(false);
          setEditingItem(null);
        }}
        onSaved={(savedItem) => {
          loadInsights();
          setNotification({
            type: 'success',
            message: `Article "${savedItem.title}" saved and published!`,
          });
          setIsCreatingNew(false);
          setEditingItem(null);
          setTimeout(() => setNotification(null), 3000);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-neutral-900 pb-20">
      {/* 1. TOP BRANDED HEADER */}
      <header className="bg-brand-navy text-white border-b border-brand-navy-light px-6 sm:px-10 py-5 shadow-lg">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold text-lg shadow-md">
              Λ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Lambda CDMO
                </span>
                <span className="text-xs text-white/40">•</span>
                <span className="text-xs text-white/70 font-medium">
                  Insights & Blog CMS
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Content Management Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* User Session Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{currentUser?.username || 'adminlamda'}</span>
            </div>

            <button
              onClick={loadInsights}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Refresh Articles"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/insights/blogs"
              target="_blank"
              className="p-2.5 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <span>View Live Insights</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
            </Link>
            <button
              onClick={() => setIsCreatingNew(true)}
              className="p-2.5 px-5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-red-500/80 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 pt-8 space-y-8">
        {/* Notification Toast */}
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
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* 3. KPI STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Articles
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                {items.length}
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Published Live
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Categories
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                5 Sections
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Blogs, Case Studies, Brochures, News, Events
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Storage Engine
              </p>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                JSON Database
              </h3>
              <p className="text-[11px] text-brand-orange font-semibold mt-1 flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Persistent on Disk
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SEO & Social Meta
              </p>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
                Auto-Optimized
              </h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Schema.org Ready
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 4. CONTROLS BAR: CATEGORY TABS & SEARCH */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-neutral-900 hover:bg-slate-200/70'
              }`}
            >
              All Articles ({items.length})
            </button>
            {INSIGHT_TABS.map((tab) => {
              const count = items.filter((i) => i.category === tab.slug).length;
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

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, tag, badge..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* 5. ARTICLES DATA TABLE / GRID */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-500">Loading insights articles from storage...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">No articles found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {searchQuery
                    ? `No insights matched your query "${searchQuery}".`
                    : 'No articles exist in this category yet.'}
                </p>
              </div>
              <button
                onClick={() => setIsCreatingNew(true)}
                className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold shadow-xs"
              >
                Create Your First Article
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-6">Article</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Date / Read Time</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      {/* Title & Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5 max-w-md">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            {item.image?.endsWith('.mp4') && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] text-white font-bold">
                                ▶
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                              {item.badge}
                            </span>
                            <h4 className="text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-brand-blue transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                              {item.summary}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {item.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-xs font-semibold text-neutral-900">{item.author.name}</p>
                          <p className="text-[11px] text-slate-500">{item.author.role}</p>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {item.date}
                          </p>
                          <p className="text-[11px] text-brand-blue font-medium flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {item.readTime}
                          </p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live View */}
                          <Link
                            href={`/insights/${item.category}/${item.slug || item.id}`}
                            target="_blank"
                            className="p-2 rounded-lg text-slate-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                            title="View on Live Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Edit Button */}
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 rounded-lg text-slate-400 hover:text-brand-orange hover:bg-orange-50 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            disabled={deletingId === item.id}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-30"
                            title="Delete Article"
                          >
                            {deletingId === item.id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
