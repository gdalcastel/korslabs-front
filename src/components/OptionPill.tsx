import { QuestionIcon } from '@/components/icons/QuestionIcons';
import { t } from '@/lib/i18n';
import type { Locale, QuizOption } from '@/types/quiz';

interface OptionPillProps {
  option: QuizOption;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
  showRadio?: boolean;
}

export function OptionPill({ option, locale, selected, onSelect, showRadio = true }: OptionPillProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`option-pill ${selected ? 'option-pill-selected' : ''}`}
    >
      <QuestionIcon id={option.id} />
      <span className="flex-1 text-left text-[16px] font-medium text-hof">{t(option.label, locale)}</span>
      {showRadio && (
        <span className={`option-radio ${selected ? 'option-radio-selected' : ''}`} aria-hidden>
          {selected && <span className="option-radio-dot" />}
        </span>
      )}
    </button>
  );
}

interface SwatchPillProps {
  option: QuizOption;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
  color: string;
}

export function SwatchPill({ option, locale, selected, onSelect, color }: SwatchPillProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center gap-2 rounded-2xl p-3 transition-all active:scale-[0.98] ${
        selected ? 'ring-2 ring-quiz-accent ring-offset-2' : ''
      }`}
    >
      <div className="h-16 w-16 rounded-full border border-white shadow-airbnb" style={{ backgroundColor: color }} />
      <span className="text-xs font-medium text-hof">{t(option.label, locale)}</span>
    </button>
  );
}

interface SwatchRowOptionProps {
  option: QuizOption;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
  color?: string;
}

export function SwatchRowOption({ option, locale, selected, onSelect, color }: SwatchRowOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`swatch-row-option ${selected ? 'swatch-row-option-selected' : ''} ${color ? '' : 'swatch-row-option-text-only'}`}
    >
      {color && (
        <span className="swatch-row-dot border border-black/5" style={{ backgroundColor: color }} aria-hidden />
      )}
      <span className="swatch-row-label">{t(option.label, locale)}</span>
    </button>
  );
}
