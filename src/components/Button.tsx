import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 select-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-b from-brand-blue to-sky-500 hover:from-brand-blue-hover hover:to-sky-600 text-white border border-brand-blue/20 shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:pointer-events-none',
    secondary: 'bg-brand-blue-light hover:bg-brand-blue/10 text-brand-blue border border-brand-blue/15 shadow-sm hover:shadow active:scale-98 disabled:opacity-50 disabled:pointer-events-none',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
