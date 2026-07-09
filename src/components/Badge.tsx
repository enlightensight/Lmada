import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-brand-blue/15 bg-brand-blue-light text-brand-blue shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}
