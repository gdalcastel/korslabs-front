import { useEffect, useState } from 'react';
import { FACE_CONTOUR_PATH } from '@/lib/face-validation';
import type { Locale } from '@/types/quiz';

const FACE_OVERLAY_PATH = `M0 0 H100 V100 H0 Z ${FACE_CONTOUR_PATH}`;

const CAPTURE_PHRASES: Record<Locale, string[]> = {
  pt: [
    'Escaneando rosto...',
    'Mapeando contornos faciais...',
    'Verificando iluminação...',
    'Analisando nitidez...',
    'Validando sua selfie...',
  ],
  es: [
    'Escaneando rostro...',
    'Mapeando contornos faciales...',
    'Verificando iluminación...',
    'Analizando nitidez...',
    'Validando tu selfie...',
  ],
  en: [
    'Scanning face...',
    'Mapping facial contours...',
    'Checking lighting...',
    'Analysing sharpness...',
    'Validating your selfie...',
  ],
};

const SKIN_PHRASES: Record<Locale, string[]> = {
  pt: [
    'Analisando sua pele...',
    'Identificando textura...',
    'Mapeando hidratação...',
    'Avaliando oleosidade...',
    'Detectando sensibilidade...',
    'Preparando seu perfil...',
  ],
  es: [
    'Analizando tu piel...',
    'Identificando textura...',
    'Mapeando hidratación...',
    'Evaluando oleosidad...',
    'Detectando sensibilidad...',
    'Preparando tu perfil...',
  ],
  en: [
    'Analysing your skin...',
    'Identifying texture...',
    'Mapping hydration...',
    'Assessing oiliness...',
    'Detecting sensitivity...',
    'Preparing your profile...',
  ],
};

const PHRASE_INTERVAL_MS: Record<'capture' | 'skin', number> = {
  capture: 560,
  skin: 580,
};

interface FaceScanAnimationProps {
  imageSrc: string;
  locale: Locale;
  variant?: 'capture' | 'skin';
}

export function FaceScanAnimation({ imageSrc, locale, variant = 'capture' }: FaceScanAnimationProps) {
  const phrases = variant === 'skin' ? SKIN_PHRASES[locale] : CAPTURE_PHRASES[locale];
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    setPhraseIndex(0);
  }, [variant, locale]);

  useEffect(() => {
    const intervalMs = PHRASE_INTERVAL_MS[variant];
    const timer = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [variant, locale, phrases.length]);

  const statusText = phrases[phraseIndex];

  return (
    <div className="face-scan-animation">
      <img src={imageSrc} alt="" className="face-capture-video" />

      <div className="pointer-events-none absolute inset-0 z-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d={FACE_OVERLAY_PATH} fill="rgba(0,0,0,0.62)" fillRule="evenodd" />
          <path
            d={FACE_CONTOUR_PATH}
            fill="none"
            stroke="#9BF0E1"
            strokeWidth="0.65"
            className="face-scan-contour-stroke"
          />
          <path
            d={FACE_CONTOUR_PATH}
            fill="none"
            stroke="rgba(155,240,225,0.35)"
            strokeWidth="1.4"
            className="face-scan-contour-glow"
          />
        </svg>
      </div>

      <div className="face-scan-beam face-scan-beam--primary" aria-hidden />
      <div className="face-scan-beam face-scan-beam--secondary" aria-hidden />
      <div className="face-scan-shimmer" aria-hidden />

      <div className="face-scan-animation-status">
        <div className="face-scan-spinner" aria-hidden />

        <div className="face-scan-phrase-wrap" aria-live="polite">
          <p key={phraseIndex} className="face-scan-phrase">
            {statusText}
          </p>
        </div>

        <div className="face-scan-progress" aria-hidden>
          {phrases.map((_, index) => (
            <span
              key={index}
              className={`face-scan-progress-dot${index === phraseIndex ? ' face-scan-progress-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
