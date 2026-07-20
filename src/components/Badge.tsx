import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-brand-teal/15 bg-brand-teal-light text-brand-teal shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}
