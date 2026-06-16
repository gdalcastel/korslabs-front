import { useState } from 'react';
import { FaceCaptureCamera } from '@/components/face/FaceCaptureCamera';
import { t } from '@/lib/i18n';
import type { Locale, QuizStep } from '@/types/quiz';

interface FaceScanStepProps {
  step: QuizStep;
  locale: Locale;
  faceImage: string | null;
  onImage: (dataUrl: string) => void;
  onComplete: () => void;
}

export function FaceScanStep({ step, locale, faceImage, onImage, onComplete }: FaceScanStepProps) {
  const [analysing, setAnalysing] = useState(false);

  const handleCapture = (dataUrl: string) => {
    onImage(dataUrl);
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      onComplete();
    }, 2800);
  };

  return (
    <div className="space-y-6">
      <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>
      <p className="quiz-subtitle">{step.subtitle && t(step.subtitle, locale)}</p>

      {!faceImage && !analysing && <FaceCaptureCamera locale={locale} onCapture={handleCapture} />}

      {faceImage && (
        <div className="relative overflow-hidden rounded-airbnb-lg">
          <img src={faceImage} alt="Face scan" className="aspect-[3/4] w-full object-cover" />
          {analysing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="h-16 w-16 animate-pulse rounded-full border-4 border-white/30 border-t-white" />
              <p className="mt-4 text-sm font-medium text-white">
                {locale === 'pt'
                  ? 'Analisando sua pele...'
                  : locale === 'es'
                    ? 'Analizando tu piel...'
                    : 'Analysing your skin...'}
              </p>
              <div className="absolute inset-x-8 top-1/2 h-0.5 animate-pulse bg-quiz-accent" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
