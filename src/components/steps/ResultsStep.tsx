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
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#717171]">
        <UiIcon name={icon} size={16} />
        {title}
      </h3>
      {items.map((item, i) => (
        <div key={i} className="rounded-airbnb border border-deco bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foggy text-xs font-bold text-hof">
              {i + 1}
            </span>
            <div className="min-w-0 space-y-1">
              <p className="font-semibold text-hof">{t(item.type, locale)}</p>
              <p className="text-xs text-rausch">{t(item.ingredients, locale)}</p>
              <p className="text-sm text-[#717171]">{t(item.benefits, locale)}</p>
              <p className="text-xs text-[#717171] italic">{t(item.usage, locale)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultsStep({ step, locale, profile, plan, onRestart }: ResultsStepProps) {
  const toneLabel = profile.skinTone;
  const undertoneLabel = t(undertoneLabels[profile.undertone], locale);

  return (
    <div className="space-y-6 pb-4">
      <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: locale === 'pt' ? 'Tom' : locale === 'es' ? 'Tono' : 'Tone', value: toneLabel },
          { label: locale === 'pt' ? 'Subtom' : locale === 'es' ? 'Subtono' : 'Undertone', value: undertoneLabel },
          { label: locale === 'pt' ? 'Confiança' : locale === 'es' ? 'Confianza' : 'Confidence', value: `${profile.confidenceScore}%` },
        ].map((item) => (
          <div key={item.label} className="info-card text-center py-4">
            <p className="text-[11px] font-medium uppercase text-[#717171]">{item.label}</p>
            <p className="mt-1 text-sm font-bold text-hof">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-airbnb-lg bg-gradient-to-r from-rausch/10 to-rausch-dark/10 p-4">
        <p className="text-sm font-semibold text-hof">{t(profile.skinTypeLabel, locale)}</p>
        <p className="mt-1 text-xs text-[#717171]">
          {locale === 'pt' ? 'Plano criado com base no seu perfil completo' : locale === 'es' ? 'Plan creado según tu perfil completo' : 'Plan created from your full profile'}
        </p>
      </div>

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

      <div className="space-y-3 pt-2">
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
