import { KorLogo } from '@/components/brand/KorLogo';
import { t } from '@/lib/i18n';
import type { Locale, QuizStep } from '@/types/quiz';

const features = [
  {
    key: 'assessment',
    en: 'Complete assessment of your skin',
    pt: 'Avaliação completa da sua pele',
    es: 'Evaluación completa de tu piel',
  },
  {
    key: 'needs',
    en: 'Identification of real needs',
    pt: 'Identificação de necessidades reais',
    es: 'Identificación de necesidades reales',
  },
  {
    key: 'routine',
    en: 'Personalized routine based on your skin analysis',
    pt: 'Rotina personalizada baseada na análise da sua pele',
    es: 'Rutina personalizada basada en el análisis de tu piel',
  },
  {
    key: 'science',
    en: 'Science-based recommendations',
    pt: 'Recomendações baseadas em ciência',
    es: 'Recomendaciones basadas en ciencia',
  },
  {
    key: 'tracking',
    en: 'Tracking your progress',
    pt: 'Acompanhamento da sua evolução',
    es: 'Seguimiento de tu evolución',
  },
  {
    key: 'results',
    en: 'Visible and lasting results',
    pt: 'Resultados visíveis e duradouros',
    es: 'Resultados visibles y duraderos',
  },
] as const;

interface WelcomeStepProps {
  step: QuizStep;
  locale: Locale;
}

const WELCOME_HERO_IMAGE = '/42D8559D-44B8-4264-B887-213C03A65370.PNG';

export function WelcomeStep({ step, locale }: WelcomeStepProps) {
  return (
    <div className="flex flex-1 flex-col md:items-center md:text-center">
      <div className="mb-6 flex justify-center pt-2">
        <KorLogo variant="welcome" />
      </div>

      <div className="welcome-hero-image mx-auto mb-8 w-full max-w-[360px] md:max-w-[480px] lg:max-w-[560px]">
        <img
          src={WELCOME_HERO_IMAGE}
          srcSet={`${WELCOME_HERO_IMAGE} 1536w`}
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 480px, 360px"
          alt={
            locale === 'pt'
              ? 'Análise de pele com IA — hidratação, rugas, manchas, elasticidade, textura e barreira cutânea'
              : locale === 'es'
                ? 'Análisis de piel con IA — hidratación, arrugas, manchas, elasticidad, textura y barrera cutánea'
                : 'AI-powered skin analysis — hydration, wrinkles, dark spots, elasticity, texture and skin barrier'
          }
          className="h-auto w-full object-contain"
          draggable={false}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <h1 className="quiz-title text-[28px] leading-[1.15]">{step.title && t(step.title, locale)}</h1>
      <p className="mt-6 text-[17px] font-semibold text-hof">{step.body && t(step.body, locale)}</p>
      {step.subtitle && (
        <p className="mt-3 text-[14px] leading-snug text-hof/80">{t(step.subtitle, locale)}</p>
      )}

      <ul className="mt-5 space-y-4 md:w-fit md:text-left">
        {features.map((item) => (
          <li key={item.key} className="flex items-start gap-3">
            <span className="check-badge" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[15px] leading-snug text-hof">{item[locale]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
