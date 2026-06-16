import { useState } from 'react';
import { FaceCaptureCamera } from '@/components/face/FaceCaptureCamera';
import { FaceScanAnimation } from '@/components/face/FaceScanAnimation';
import type { Locale } from '@/types/quiz';

interface FaceScanStepProps {
  locale: Locale;
  faceImage: string | null;
  onImage: (dataUrl: string) => void;
  onComplete: () => void;
}

const SKIN_ANALYSIS_MS = 3500;

export function FaceScanStep({ locale, faceImage, onImage, onComplete }: FaceScanStepProps) {
  const [analysing, setAnalysing] = useState(false);

  const handleCapture = (dataUrl: string) => {
    onImage(dataUrl);
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      onComplete();
    }, SKIN_ANALYSIS_MS);
  };

  return (
    <div className="face-scan-step face-scan-step--immersive">
      {!faceImage && !analysing && <FaceCaptureCamera locale={locale} onCapture={handleCapture} />}

      {faceImage && analysing && (
        <div className="face-capture-fullscreen">
          <FaceScanAnimation imageSrc={faceImage} locale={locale} variant="skin" />
        </div>
      )}
    </div>
  );
}
