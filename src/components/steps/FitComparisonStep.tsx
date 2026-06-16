import { buildProfile } from '@/lib/quiz-engine';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface FitComparisonStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
}

function FitBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-hof">{label}</span>
        <span className="font-semibold text-hof">{value}%</span>
      </div>
      <div className="progress-track h-2">
        <div className="h-full rounded-pill transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function FitComparisonStep({ step, locale, answers }: FitComparisonStepProps) {
  const profile = buildProfile(answers);

  return (
    <div className="space-y-6">
      <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>
      <p className="quiz-subtitle">{step.subtitle && t(step.subtitle, locale)}</p>

      <div className="info-card space-y-6">
        <FitBar
          label={locale === 'pt' ? 'Adequação do Programa' : locale === 'es' ? 'Ajuste del Programa' : 'Program Fit'}
          value={profile.programFit}
          color="#5B54FF"
        />
        <FitBar
          label={locale === 'pt' ? 'Adequação dos Ingredientes' : locale === 'es' ? 'Ajuste de Ingredientes' : 'Ingredients Fit'}
          value={profile.ingredientsFit}
          color="#222222"
        />
      </div>

      <p className="text-sm text-[#717171]">
        {profile.programFit > profile.ingredientsFit
          ? locale === 'pt'
            ? 'Seu perfil combina bem com o programa — vamos alinhar os ingredientes.'
            : locale === 'es'
              ? 'Tu perfil encaja bien con el programa — alineemos los ingredientes.'
              : 'Your profile fits the program well — let us align ingredients.'
          : locale === 'pt'
            ? 'Seus ingredientes estão alinhados — o programa vai potencializar os resultados.'
            : locale === 'es'
              ? 'Tus ingredientes están alineados — el programa potenciará los resultados.'
              : 'Your ingredients are aligned — the program will boost results.'}
      </p>
    </div>
  );
}
