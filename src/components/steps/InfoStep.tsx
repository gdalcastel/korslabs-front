import { InfoIcon } from '@/components/icons/InfoIcons';
import { t } from '@/lib/i18n';
import type { InfoSlide, Locale } from '@/types/quiz';

interface InfoStepProps {
  info: InfoSlide;
  locale: Locale;
}

export function InfoStep({ info, locale }: InfoStepProps) {
  const iconType = info.image ?? 'default';

  return (
    <div className="info-step flex flex-1 flex-col justify-center">
      <div className="info-step-icon" aria-hidden>
        <InfoIcon type={iconType} />
      </div>

      <h1 className="quiz-title info-step-title">{t(info.title, locale)}</h1>
      <p className="quiz-subtitle info-step-body">{t(info.body, locale)}</p>

      {info.highlight && (
        <div className="info-highlight">
          <span className="info-highlight-accent" aria-hidden />
          <p className="text-[15px] font-semibold leading-relaxed text-hof">{t(info.highlight, locale)}</p>
        </div>
      )}
    </div>
  );
}
