interface StatCardProps {
  value: string;
  label: string;
  sublabel?: string;
  className?: string;
}

export default function StatCard({
  value,
  label,
  sublabel,
  className = '',
}: StatCardProps) {
  return (
    <div className={`p-6 md:p-8 border border-neutral-200 bg-white shadow-sm flex flex-col items-center text-center ${className}`}>
      <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-neutral-900 mb-2">
        {value}
      </span>
     <span className="text-xs md:text-sm font-semibold tracking-wider text-neutral-800 uppercase mb-1">
        {label}
      </span>
      {sublabel && (
       <span className="text-xs text-muted font-normal max-w-[200px] leading-relaxed">
          {sublabel}
        </span>
      )}
    </div>
  );
}
