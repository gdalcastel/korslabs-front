import { buildProfile } from '@/lib/quiz-engine';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface ProfileSummaryStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
}

function LifestyleScoreRing({ score }: { score: number }) {
  const size = 168;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(201, 169, 98, 0.15)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#lifestyle-score-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="lifestyle-score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A962" />
            <stop offset="100%" stopColor="#A8883A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[44px] font-bold leading-none tracking-tight text-hof">{score}</span>
        <span className="mt-1 text-sm font-medium text-[#717171]">/ 100</span>
      </div>
    </div>
  );
}

export function ProfileSummaryStep({ step, locale, answers }: ProfileSummaryStepProps) {
  const profile = buildProfile(answers);

  const lifestyleLabel =
    locale === 'pt'
      ? 'Pontuação de estilo de vida'
      : locale === 'es'
        ? 'Puntuación de estilo de vida'
        : 'Lifestyle score';

  const skinTypeLabel =
    locale === 'pt' ? 'Tipo de pele' : locale === 'es' ? 'Tipo de piel' : 'Skin type';

  return (
    <div className="mx-auto w-full max-w-[520px] space-y-8 pb-2">
      <header className="space-y-3 text-center">
        <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>
        <p className="quiz-subtitle mt-0">{step.subtitle && t(step.subtitle, locale)}</p>
      </header>

      <div className="overflow-hidden rounded-airbnb-lg border border-gold/25 bg-gradient-to-br from-gold/10 via-white to-gold/5 px-5 py-8 shadow-[0_4px_24px_rgba(201,169,98,0.12)]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {lifestyleLabel}
        </p>
        <div className="mt-6">
          <LifestyleScoreRing score={profile.lifestyleScore} />
        </div>
      </div>

      <div className="overflow-hidden rounded-airbnb-lg border border-gold/25 bg-white p-5 shadow-[0_4px_24px_rgba(201,169,98,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{skinTypeLabel}</p>
        <p className="mt-3 text-xl font-semibold text-hof">{t(profile.skinTypeLabel, locale)}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5c5c5c]">{t(profile.interpretation, locale)}</p>
      </div>
    </div>
  );
}
