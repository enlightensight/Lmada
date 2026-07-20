import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface FormButtonProps {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function FormButton({ children, disabled = false, loading = false }: FormButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[10px] text-sm font-semibold tracking-wide text-white bg-gradient-to-b from-brand-navy to-brand-navy-light hover:from-brand-navy-light hover:to-brand-navy border border-brand-navy/20 shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer"
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
