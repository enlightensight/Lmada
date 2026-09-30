'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

interface BlogAdminLoginProps {
  onLogin: (user: any) => void;
}

export default function BlogAdminLogin({ onLogin }: BlogAdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials. Access denied.');
        setLoading(false);
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('lambda_admin_auth', 'true');
        localStorage.setItem('lambda_admin_token', data.token);
        localStorage.setItem('lambda_admin_user', JSON.stringify(data.user));
      }

      onLogin(data.user);
    } catch (err: any) {
      // Local client fallback validation if offline
      if (username === 'adminlamda' && password === 'Insight2026@Lamda') {
        const dummyUser = {
          username: 'adminlamda',
          role: 'CDMO Content Administrator',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('lambda_admin_auth', 'true');
          localStorage.setItem('lambda_admin_user', JSON.stringify(dummyUser));
        }
        onLogin(dummyUser);
      } else {
        setError('Connection error or invalid credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between select-none relative overflow-hidden px-4 py-8 sm:py-12">
      {/* Subtle ambient lighting & pattern */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-neutral-900 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl border border-slate-200 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-brand-orange" />
          <span>Return to Website</span>
        </Link>
        <div />
      </div>

      {/* Main Login Card with Website Logo */}
      <div className="relative z-10 w-full max-w-[500px] sm:max-w-[540px] mx-auto my-auto py-8">
        {/* Official Website Logo - matches card width */}
        <div className="w-full mb-8">
          <Link href="/" className="block w-full transition-transform hover:scale-[1.01] focus:outline-none">
            <Image
              src="/images/lambda_novum_logo.png"
              alt="Lambda & Novum"
              width={2991}
              height={358}
              className="w-full h-auto object-contain select-none"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-300/40">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="adminlamda"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm sm:text-base font-medium text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/15 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Case-sensitive</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm sm:text-base font-medium text-neutral-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed pt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit Encrypted Session Authorization</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Lambda CDMO & Novum PRS. All rights reserved.
      </div>
    </div>
  );
}

