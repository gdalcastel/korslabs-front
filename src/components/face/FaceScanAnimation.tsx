import { useEffect, useId, useState } from 'react';
import { FACE_CONTOUR_PATH } from '@/lib/face-validation';
import type { Locale } from '@/types/quiz';

type ScanPhase = 'scanning' | 'validating' | 'analysing';

const PHASE_TEXT: Record<ScanPhase, Record<Locale, string>> = {
  scanning: {
    pt: 'Escaneando rosto...',
    es: 'Escaneando rostro...',
    en: 'Scanning face...',
  },
  validating: {
    pt: 'Validando foto...',
    es: 'Validando foto...',
    en: 'Validating photo...',
  },
  analysing: {
    pt: 'Analisando sua pele...',
    es: 'Analizando tu piel...',
    en: 'Analysing your skin...',
  },
};

const SKIN_ANALYSIS_PHRASES: Record<Locale, string[]> = {
  pt: [
    'Analisando sua pele...',
    'Identificando textura...',
    'Mapeando hidratação...',
    'Avaliando oleosidade...',
    'Preparando seu perfil...',
  ],
  es: [
    'Analizando tu piel...',
    'Identificando textura...',
    'Mapeando hidratación...',
    'Evaluando oleosidad...',
    'Preparando tu perfil...',
  ],
  en: [
    'Analysing your skin...',
    'Identifying texture...',
    'Mapping hydration...',
    'Assessing oiliness...',
    'Preparing your profile...',
  ],
};

const SKIN_PHRASE_INTERVAL_MS = 700;

interface FaceScanAnimationProps {
  imageSrc: string;
  locale: Locale;
  variant?: 'capture' | 'skin';
}

export function FaceScanAnimation({ imageSrc, locale, variant = 'capture' }: FaceScanAnimationProps) {
  const maskId = useId().replace(/:/g, '');
  const [phase, setPhase] = useState<ScanPhase>(variant === 'skin' ? 'analysing' : 'scanning');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (variant === 'skin') return;

    const timer = setTimeout(() => setPhase('validating'), 1400);
    return () => clearTimeout(timer);
  }, [variant]);

  useEffect(() => {
    if (variant !== 'skin') return;

    const phrases = SKIN_ANALYSIS_PHRASES[locale];
    const timer = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, SKIN_PHRASE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [variant, locale]);

  const statusText =
    variant === 'skin' ? SKIN_ANALYSIS_PHRASES[locale][phraseIndex] : PHASE_TEXT[phase][locale];

  return (
    <div className="face-scan-animation">
      <img src={imageSrc} alt="" className="face-capture-video" />

      <div className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <mask id={maskId}>
              <rect width="100" height="100" fill="white" />
              <path d={FACE_CONTOUR_PATH} fill="black" />
            </mask>
          </defs>
          <rect width="100" height="100" fill="rgba(0,0,0,0.45)" mask={`url(#${maskId})`} />
          <path
            d={FACE_CONTOUR_PATH}
            fill="none"
            stroke="#222222"
            strokeWidth="0.65"
            className="face-scan-contour-stroke"
          />
        </svg>
      </div>

      <div className="face-scan-line" aria-hidden />

      <div className="face-scan-animation-status">
        <div className="face-scan-spinner" aria-hidden />
        <p className="text-sm font-medium text-white">{statusText}</p>
      </div>
    </div>
  );
}
