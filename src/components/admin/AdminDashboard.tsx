'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  BookOpen,
  RefreshCw,
  ExternalLink,
  Plus,
  LogOut,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import PageAdminDashboard from './PageAdminDashboard';
import BlogAdminDashboard from './BlogAdminDashboard';
import BlogAdminLogin from './BlogAdminLogin';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeMasterTab, setActiveMasterTab] = useState<'pages' | 'insights'>('pages');

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

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
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

  return (
    <div className="min-h-screen bg-slate-100 text-neutral-900 pb-20">
      {/* 1. MASTER TOP BRANDED HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 select-none px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3.5 shadow-2xs">
        <div className="w-full max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center shrink-0 cursor-pointer"
            >
              <Image
                src="/images/lambda_novum_logo.png"
                alt="Lambda & Novum CDMO"
                width={2991}
                height={358}
                className="h-9 sm:h-10 md:h-11 w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[340px] object-contain select-none"
                priority
                unoptimized
              />
            </Link>

            {/* Master Navigation Switcher Tabs */}
            <div className="hidden sm:flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setActiveMasterTab('pages')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeMasterTab === 'pages'
                    ? 'bg-white text-brand-navy shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-neutral-900'
                }`}
              >
                <Globe className="w-4 h-4 text-brand-blue" />
                <span>Website Pages</span>
              </button>

              <button
                onClick={() => setActiveMasterTab('insights')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeMasterTab === 'insights'
                    ? 'bg-white text-brand-navy shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-neutral-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-brand-orange" />
                <span>Insights & Articles</span>
              </button>
            </div>
          </div>

          {/* Right Session Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* User Session Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs border border-slate-200 font-semibold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentUser?.username || 'adminlamda'}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="p-2.5 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-blue" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2.5 px-3 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200/80"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Tab Switcher */}
        <div className="sm:hidden flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 mt-3 w-full">
          <button
            onClick={() => setActiveMasterTab('pages')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
              activeMasterTab === 'pages'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-600'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-brand-blue" />
            <span>Website Pages</span>
          </button>
          <button
            onClick={() => setActiveMasterTab('insights')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
              activeMasterTab === 'insights'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
            <span>Articles</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN ACTIVE TAB CONTENT */}
      <main className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-6">
        <div className="w-full max-w-[1700px] mx-auto">
          {activeMasterTab === 'pages' ? (
            <PageAdminDashboard />
          ) : (
            <BlogAdminDashboard hideHeader={true} />
          )}
        </div>
      </main>
    </div>
  );
}
