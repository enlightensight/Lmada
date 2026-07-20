import Badge from './Badge';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto flex flex-col items-center mb-12 md:mb-16 ${className}`}>
      {badge && (
        <Badge className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
