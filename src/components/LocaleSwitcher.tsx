import type { Locale } from '@/types/quiz';
import { localeLabels } from '@/lib/i18n';

interface LocaleSwitcherProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
  compact?: boolean;
}

export function LocaleSwitcher({ locale, onChange, compact }: LocaleSwitcherProps) {
  const locales: Locale[] = ['pt', 'en', 'es'];

  return (
    <div className={`flex gap-0.5 rounded-pill border border-deco/80 bg-white ${compact ? 'p-0.5' : 'p-1'}`}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={`rounded-pill font-semibold transition-colors ${
            compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
          } ${locale === l ? 'bg-hof text-white' : 'text-[#717171] hover:bg-foggy'}`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
