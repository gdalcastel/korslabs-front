import { WorldMapIllustration } from '@/components/icons/WorldMapIllustration';
import { t } from '@/lib/i18n';
import type { Locale, QuizStep } from '@/types/quiz';

interface TrustStepProps {
  step: QuizStep;
  locale: Locale;
}

export function TrustStep({ step, locale }: TrustStepProps) {
  return (
    <div className="trust-step flex flex-1 flex-col items-center justify-center text-center">
      {step.subtitle && (
        <p className="trust-step-eyebrow text-[15px] font-normal text-bobo">{t(step.subtitle, locale)}</p>
      )}

      <div className="trust-step-map my-8 w-full">
        <WorldMapIllustration />
      </div>

      {step.title && (
        <h1 className="trust-step-title text-[26px] font-bold leading-[1.15] tracking-tight text-hof md:text-[28px]">
          {t(step.title, locale)}
        </h1>
      )}

      {step.body && (
        <p className="trust-step-body mt-3 text-[17px] font-semibold leading-snug text-hof">{t(step.body, locale)}</p>
      )}
    </div>
  );
}
