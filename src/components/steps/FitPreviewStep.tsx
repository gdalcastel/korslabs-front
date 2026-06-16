import { WellnessComparisonChart } from '@/components/icons/WellnessComparisonChart';
import { computeEarlyProgramFit } from '@/lib/quiz-engine';
import type { Locale, QuizAnswers } from '@/types/quiz';

interface FitPreviewStepProps {
  locale: Locale;
  answers: QuizAnswers;
}

function formatFitMessage(locale: Locale, fit: number): string {
  switch (locale) {
    case 'pt':
      return `Seu programa de tratamento tem ${fit}% de adequação com base no seu tipo de pele e preocupações`;
    case 'es':
      return `Tu programa de tratamiento tiene un ${fit}% de ajuste según tu tipo de piel y preocupaciones`;
    default:
      return `Your treatment program is a ${fit}% fit to you by knowing your skin type and concerns`;
  }
}

export function FitPreviewStep({ locale, answers }: FitPreviewStepProps) {
  const fit = computeEarlyProgramFit(answers);

  return (
    <div className="fit-preview-step flex flex-1 flex-col items-center justify-center text-center">
      <div className="fit-preview-chart mb-8 w-full max-w-[340px]">
        <WellnessComparisonChart locale={locale} />
      </div>

      <p className="fit-preview-message text-[17px] font-semibold leading-snug text-hof">
        {formatFitMessage(locale, fit)}
      </p>
    </div>
  );
}
