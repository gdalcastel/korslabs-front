import { t } from '@/lib/i18n';
import type { Locale, QuizOption } from '@/types/quiz';

interface OptionCardProps {
  option: QuizOption;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
  variant?: 'default' | 'swatch';
  swatchColor?: string;
}

export function OptionCard({
  option,
  locale,
  selected,
  onSelect,
  variant = 'default',
  swatchColor,
}: OptionCardProps) {
  if (variant === 'swatch' && swatchColor) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col items-center gap-2 rounded-airbnb p-2 transition-all active:scale-95 ${
          selected ? 'ring-2 ring-hof ring-offset-2' : ''
        }`}
      >
        <div
          className="h-14 w-14 rounded-full border border-deco shadow-sm"
          style={{ backgroundColor: swatchColor }}
        />
        <span className="text-xs font-medium text-hof">{t(option.label, locale)}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`option-card ${selected ? 'option-card-selected' : ''}`}
    >
      <span className="text-[15px] font-medium text-hof">{t(option.label, locale)}</span>
      {selected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="10" fill="#222" />
          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
