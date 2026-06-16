import { likertLabels } from '@/data/quiz-steps';
import { t } from '@/lib/i18n';
import type { Locale } from '@/types/quiz';

interface LikertScaleProps {
  locale: Locale;
  value: number | undefined;
  onChange: (value: number) => void;
}

export function LikertScale({ locale, value, onChange }: LikertScaleProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-12 flex-1 items-center justify-center rounded-airbnb border text-[15px] font-semibold transition-all active:scale-95 ${
              value === n
                ? 'border-hof bg-hof text-white'
                : 'border-deco bg-white text-hof hover:bg-foggy'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-[#717171]">
        <span>{t(likertLabels.min, locale)}</span>
        <span>{t(likertLabels.max, locale)}</span>
      </div>
    </div>
  );
}
