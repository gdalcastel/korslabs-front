import { KorLogo } from '@/components/brand/KorLogo';
import { t } from '@/lib/i18n';
import type { Locale, QuizStep } from '@/types/quiz';

const features = [
  {
    key: 'products',
    en: 'Extensive product recommendations',
    pt: 'Recomendações extensas de produtos',
    es: 'Recomendaciones extensas de productos',
  },
  {
    key: 'lifting',
    en: 'Dozens of facelifting techniques',
    pt: 'Dezenas de técnicas de lifting facial',
    es: 'Docenas de técnicas de lifting facial',
  },
  {
    key: 'scanner',
    en: 'Skin analysis by smart face scanner',
    pt: 'Análise de pele com scanner facial inteligente',
    es: 'Análisis de piel con escáner facial inteligente',
  },
  {
    key: 'derma',
    en: 'Dermatology approved skin guidance',
    pt: 'Orientação de pele aprovada por dermatologistas',
    es: 'Orientación de piel aprobada por dermatólogos',
  },
  {
    key: 'quality',
    en: 'Visibly improve your skin quality',
    pt: 'Melhore visivelmente a qualidade da sua pele',
    es: 'Mejora visiblemente la calidad de tu piel',
  },
] as const;

interface WelcomeStepProps {
  step: QuizStep;
  locale: Locale;
}

export function WelcomeStep({ step, locale }: WelcomeStepProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 flex justify-center pt-2">
        <KorLogo variant="welcome" />
      </div>

      <div className="welcome-hero-image mx-auto mb-8 w-full max-w-[360px]">
        <img
          src="/welcome-before-after.png"
          alt={
            locale === 'pt'
              ? 'Comparação de pele: Dia 0 e Dia 30'
              : locale === 'es'
                ? 'Comparación de piel: Día 0 y Día 30'
                : 'Skin comparison: Day 0 and Day 30'
          }
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </div>

      <h1 className="quiz-title text-[28px] leading-[1.15]">{step.title && t(step.title, locale)}</h1>
      <p className="mt-6 text-[17px] font-semibold text-hof">{step.body && t(step.body, locale)}</p>

      <ul className="mt-5 space-y-4">
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
