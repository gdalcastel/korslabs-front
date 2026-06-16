import { undertoneLabels } from '@/lib/quiz-engine';
import { UiIcon, type UiIconName } from '@/components/icons/UiIcons';
import { t } from '@/lib/i18n';
import type { Locale, QuizStep, SkincarePlan, SkinProfile } from '@/types/quiz';

interface ResultsStepProps {
  step: QuizStep;
  locale: Locale;
  profile: SkinProfile;
  plan: SkincarePlan;
  onRestart: () => void;
}

function FitBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-hof">{label}</span>
        <span className="font-semibold text-gold">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-pill bg-gold/15">
        <div
          className="h-full rounded-pill bg-gradient-to-r from-gold to-gold-dark transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function RoutineSection({
  title,
  icon,
  items,
  locale,
}: {
  title: string;
  icon: UiIconName;
  items: SkincarePlan['am'];
  locale: Locale;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-gold/20 pb-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
          <UiIcon name={icon} size={16} />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-hof">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-airbnb-lg border border-gold/15 bg-white p-4 shadow-[0_2px_12px_rgba(201,169,98,0.08)]"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 space-y-1.5">
                <p className="font-semibold text-hof">{t(item.type, locale)}</p>
                <p className="text-xs font-medium text-gold-dark">{t(item.ingredients, locale)}</p>
                <p className="text-sm leading-relaxed text-[#5c5c5c]">{t(item.benefits, locale)}</p>
                <p className="text-xs italic text-[#717171]">{t(item.usage, locale)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResultsStep({ step, locale, profile, plan, onRestart }: ResultsStepProps) {
  const toneLabel = profile.skinTone;
  const undertoneLabel = t(undertoneLabels[profile.undertone], locale);

  const stats = [
    { label: locale === 'pt' ? 'Tom' : locale === 'es' ? 'Tono' : 'Tone', value: toneLabel },
    {
      label: locale === 'pt' ? 'Subtom' : locale === 'es' ? 'Subtono' : 'Undertone',
      value: undertoneLabel,
    },
    {
      label: locale === 'pt' ? 'Confiança' : locale === 'es' ? 'Confianza' : 'Confidence',
      value: `${profile.confidenceScore}%`,
    },
    {
      label: locale === 'pt' ? 'Estilo de vida' : locale === 'es' ? 'Estilo de vida' : 'Lifestyle',
      value: `${profile.lifestyleScore}/100`,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[520px] space-y-8 pb-6">
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {locale === 'pt' ? 'Seu perfil KÖR' : locale === 'es' ? 'Tu perfil KÖR' : 'Your KÖR profile'}
        </p>
        <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>
      </header>

      <div className="overflow-hidden rounded-airbnb-lg border border-gold/25 bg-gradient-to-br from-gold/10 via-white to-gold/5 p-5 shadow-[0_4px_24px_rgba(201,169,98,0.12)]">
        <p className="text-lg font-semibold text-hof">{t(profile.skinTypeLabel, locale)}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c5c5c]">{t(profile.interpretation, locale)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-airbnb-lg border border-gold/15 bg-white px-4 py-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#717171]">{item.label}</p>
            <p className="mt-1 text-base font-bold text-hof">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="info-card space-y-4 border-gold/15">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-hof">
          {locale === 'pt' ? 'Adequação do plano' : locale === 'es' ? 'Ajuste del plan' : 'Plan fit'}
        </h2>
        <FitBar
          label={locale === 'pt' ? 'Programa' : locale === 'es' ? 'Programa' : 'Program'}
          value={profile.programFit}
        />
        <FitBar
          label={locale === 'pt' ? 'Ingredientes' : locale === 'es' ? 'Ingredientes' : 'Ingredients'}
          value={profile.ingredientsFit}
        />
      </div>

      <div className="space-y-8">
        <RoutineSection
          title={locale === 'pt' ? 'Rotina AM' : locale === 'es' ? 'Rutina AM' : 'AM Routine'}
          icon="sunrise"
          items={plan.am}
          locale={locale}
        />
        <RoutineSection
          title={locale === 'pt' ? 'Rotina PM' : locale === 'es' ? 'Rutina PM' : 'PM Routine'}
          icon="moon"
          items={plan.pm}
          locale={locale}
        />
        <RoutineSection
          title={locale === 'pt' ? 'Boosters semanais' : locale === 'es' ? 'Boosters semanales' : 'Weekly boosters'}
          icon="sparkles"
          items={plan.weekly}
          locale={locale}
        />
      </div>

      <div className="space-y-3 border-t border-gold/15 pt-6">
        <div className="btn-primary-wrap">
          <button type="button" className="btn-primary">
            {locale === 'pt' ? 'Começar minha rotina' : locale === 'es' ? 'Comenzar mi rutina' : 'Start my routine'}
          </button>
        </div>
        <button type="button" className="btn-secondary">
          {locale === 'pt' ? 'Ver produtos recomendados' : locale === 'es' ? 'Ver productos recomendados' : 'View recommended products'}
        </button>
        <button type="button" onClick={onRestart} className="w-full py-3 text-sm font-medium text-[#717171] underline">
          {locale === 'pt' ? 'Refazer quiz' : locale === 'es' ? 'Repetir quiz' : 'Retake quiz'}
        </button>
      </div>
    </div>
  );
}
