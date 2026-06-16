import { useEffect } from 'react';
import { IconBadge, UiIcon } from '@/components/icons/UiIcons';
import { t } from '@/lib/i18n';
import type { EnvironmentData, Locale, QuizStep } from '@/types/quiz';

interface EnvironmentStepProps {
  step: QuizStep;
  locale: Locale;
  environment: EnvironmentData | null;
  onDetect: (data: EnvironmentData) => void;
}

async function detectEnvironment(): Promise<EnvironmentData> {
  const fallback: EnvironmentData = {
    city: 'São Paulo',
    uvIndex: 7,
    humidity: 65,
    pollution: 'moderate',
  };

  try {
    const geoRes = await fetch('https://ipapi.co/json/');
    if (!geoRes.ok) return fallback;
    const geo = await geoRes.json();
    const city = geo.city || fallback.city;

    const month = new Date().getMonth();
    const isSummer = month >= 10 || month <= 2;
    const uvBase = isSummer ? 8 : 5;
    const uvIndex = Math.min(11, uvBase + Math.floor(Math.random() * 3));
    const humidity = 50 + Math.floor(Math.random() * 35);
    const pollutionLevels: EnvironmentData['pollution'][] = ['low', 'moderate', 'high'];
    const pollution = pollutionLevels[Math.floor(Math.random() * 3)];

    return { city, uvIndex, humidity, pollution };
  } catch {
    return fallback;
  }
}

const pollutionLabels = {
  low: { en: 'Low', pt: 'Baixa', es: 'Baja' },
  moderate: { en: 'Moderate', pt: 'Moderada', es: 'Moderada' },
  high: { en: 'High', pt: 'Alta', es: 'Alta' },
};

export function EnvironmentStep({ step, locale, environment, onDetect }: EnvironmentStepProps) {
  useEffect(() => {
    if (!environment) {
      detectEnvironment().then(onDetect);
    }
  }, [environment, onDetect]);

  const metrics = environment
    ? [
        {
          id: 'uv',
          icon: 'sun' as const,
          label: { en: 'UV Index', pt: 'Índice UV', es: 'Índice UV' },
          value: environment.uvIndex,
        },
        {
          id: 'humidity',
          icon: 'humidity' as const,
          label: { en: 'Humidity', pt: 'Umidade', es: 'Humedad' },
          value: `${environment.humidity}%`,
        },
        {
          id: 'pollution',
          icon: 'pollution' as const,
          label: { en: 'Pollution', pt: 'Poluição', es: 'Contaminación' },
          value: t(pollutionLabels[environment.pollution], locale),
        },
      ]
    : [];

  return (
    <div className="info-step space-y-6">
      <div>
        <h1 className="quiz-title info-step-title">{step.title && t(step.title, locale)}</h1>
        <p className="quiz-subtitle info-step-body">{step.subtitle && t(step.subtitle, locale)}</p>
      </div>

      {!environment ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-deco border-t-quiz-accent" />
          <p className="mt-4 text-sm text-[#717171]">
            {locale === 'pt' ? 'Detectando localização...' : locale === 'es' ? 'Detectando ubicación...' : 'Detecting location...'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="info-card flex items-center gap-3">
            <IconBadge size="md">
              <UiIcon name="location" size={22} />
            </IconBadge>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[#717171]">
                {locale === 'pt' ? 'Sua cidade' : locale === 'es' ? 'Tu ciudad' : 'Your city'}
              </p>
              <p className="text-lg font-semibold text-hof">{environment.city}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {metrics.map((item) => (
              <div key={item.id} className="info-card flex flex-col items-center gap-2 py-4 text-center">
                <IconBadge size="sm">
                  <UiIcon name={item.icon} size={18} />
                </IconBadge>
                <span className="text-lg font-semibold text-hof">{item.value}</span>
                <span className="text-[11px] text-[#717171]">{t(item.label, locale)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
