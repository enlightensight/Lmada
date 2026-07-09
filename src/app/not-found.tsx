'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Badge from '@/components/Badge';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 select-none flex-grow">
      
      {/* 404 Badge */}
      <Badge className="mb-6">404 error</Badge>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-neutral-900 leading-tight mb-4">
        Page not found
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-muted font-normal max-w-md leading-relaxed mb-8">
        We&apos;re sorry, but the page you&apos;re looking for could not be found. It may have been moved, deleted, or never existed in the first place.
      </p>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-b from-neutral-800 to-black hover:from-neutral-700 hover:to-neutral-900 border border-neutral-800 text-white font-medium text-sm shadow-md hover:shadow-lg active:scale-98 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
