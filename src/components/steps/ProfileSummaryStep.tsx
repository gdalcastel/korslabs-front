import { buildProfile } from '@/lib/quiz-engine';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface ProfileSummaryStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
}

export function ProfileSummaryStep({ step, locale, answers }: ProfileSummaryStepProps) {
  const profile = buildProfile(answers);

  return (
    <div className="space-y-6">
      <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>
      <p className="quiz-subtitle">{step.subtitle && t(step.subtitle, locale)}</p>

      <div className="info-card text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-[#717171]">
          {locale === 'pt' ? 'Pontuação de estilo de vida' : locale === 'es' ? 'Puntuación de estilo de vida' : 'Lifestyle score'}
        </p>
        <p className="mt-2 text-5xl font-bold text-hof">{profile.lifestyleScore}</p>
        <p className="mt-1 text-sm text-[#717171]">/ 100</p>
      </div>

      <div className="rounded-airbnb-lg border border-deco bg-white p-5 shadow-airbnb">
        <p className="text-xs font-medium uppercase tracking-wide text-rausch">
          {locale === 'pt' ? 'Tipo de pele' : locale === 'es' ? 'Tipo de piel' : 'Skin type'}
        </p>
        <p className="mt-2 text-xl font-semibold text-hof">{t(profile.skinTypeLabel, locale)}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#717171]">{t(profile.interpretation, locale)}</p>
      </div>
    </div>
  );
}
