import { t } from '@/lib/i18n';
import type { Locale, QuizOption } from '@/types/quiz';

interface FaceAreaCheckboxProps {
  option: QuizOption;
  locale: Locale;
  selected: boolean;
  onToggle: () => void;
}

export function FaceAreaCheckbox({ option, locale, selected, onToggle }: FaceAreaCheckboxProps) {
  return (
    <label className="face-area-option">
      <span className="face-area-option-label">{t(option.label, locale)}</span>
      <span className={`face-area-checkbox ${selected ? 'face-area-checkbox-selected' : ''}`} aria-hidden>
        {selected && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6l2 2.5 4.5-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={selected}
        onChange={onToggle}
        aria-label={t(option.label, locale)}
      />
    </label>
  );
}
