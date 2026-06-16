import {
  getSkinInsight,
  skinInsightSectionTitle,
  skinInsightToneBadge,
  skinInsightUndertoneBadge,
} from '@/lib/skin-insight';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers } from '@/types/quiz';

interface SkinInsightStepProps {
  locale: Locale;
  answers: QuizAnswers;
}

export function SkinInsightStep({ locale, answers }: SkinInsightStepProps) {
  const insight = getSkinInsight(answers, locale);

  return (
    <div className="skin-insight-step relative flex flex-1 flex-col">
      <div className="skin-insight-decor" aria-hidden />

      <h1 className="skin-insight-title quiz-title pr-16">
        {t(insight.titlePrefix, locale)}{' '}
        <span className="text-gold">{t(insight.highlight, locale)}</span>
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="skin-insight-badge">
          <span className="skin-insight-badge-dot" style={{ backgroundColor: insight.toneHex }} />
          {t(skinInsightToneBadge, locale)}: {insight.toneLabel}
        </span>
        <span className="skin-insight-badge">
          <span className="skin-insight-badge-dot" style={{ backgroundColor: insight.undertoneHex }} />
          {t(skinInsightUndertoneBadge, locale)}: {insight.undertoneLabel}
        </span>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-hof/85">{t(insight.description, locale)}</p>

      <p className="mt-6 text-[15px] font-semibold text-hof">{t(skinInsightSectionTitle, locale)}</p>

      <ul className="mt-3 space-y-2.5">
        {insight.bullets.map((bullet) => (
          <li key={bullet.text.en} className="flex items-start gap-2.5 text-[15px] leading-snug text-hof">
            <span aria-hidden>{bullet.emoji}</span>
            <span>{t(bullet.text, locale)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[15px] leading-relaxed text-hof/85">{t(insight.footer, locale)}</p>
    </div>
  );
}
