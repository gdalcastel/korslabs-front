import { useCallback, useEffect, useRef, useState } from 'react';
import { UiIcon } from '@/components/icons/UiIcons';
import { useFaceDetector } from '@/hooks/useFaceDetector';
import {
  FACE_OVAL,
  getPrimaryValidationHint,
  measureBrightness,
  measureSharpness,
  validateFaceCapture,
  type FaceValidationIssue,
} from '@/lib/face-validation';
import type { Locale } from '@/types/quiz';

interface FaceCaptureCameraProps {
  locale: Locale;
  onCapture: (dataUrl: string) => void;
}

type CameraState = 'loading' | 'active' | 'denied' | 'unsupported';

const HINTS: Record<FaceValidationIssue, Record<Locale, string>> = {
  'no-face': {
    pt: 'Posicione seu rosto dentro do oval',
    es: 'Coloca tu rostro dentro del óvalo',
    en: 'Position your face inside the oval',
  },
  'multiple-faces': {
    pt: 'Apenas uma pessoa deve aparecer na foto',
    es: 'Solo una persona debe aparecer en la foto',
    en: 'Only one person should appear in the photo',
  },
  'face-off-center': {
    pt: 'Centralize seu rosto no oval',
    es: 'Centra tu rostro en el óvalo',
    en: 'Center your face in the oval',
  },
  'face-too-small': {
    pt: 'Aproxime-se um pouco mais da câmera',
    es: 'Acércate un poco más a la cámara',
    en: 'Move a little closer to the camera',
  },
  'face-too-large': {
    pt: 'Afaste-se um pouco da câmera',
    es: 'Aléjate un poco de la cámara',
    en: 'Move a little back from the camera',
  },
  'too-dark': {
    pt: 'Ambiente escuro — procure uma luz melhor',
    es: 'Ambiente oscuro — busca mejor luz',
    en: 'Too dark — find better lighting',
  },
  'too-bright': {
    pt: 'Luz forte demais — evite contraluz',
    es: 'Demasiada luz — evita contraluz',
    en: 'Too bright — avoid backlight',
  },
  blurry: {
    pt: 'Mantenha o celular firme para evitar distorção',
    es: 'Mantén el móvil firme para evitar distorsión',
    en: 'Hold your phone steady to avoid blur',
  },
};

const UI: Record<string, Record<Locale, string>> = {
  loadingCamera: {
    pt: 'Abrindo câmera...',
    es: 'Abriendo cámara...',
    en: 'Opening camera...',
  },
  loadingDetector: {
    pt: 'Preparando verificação facial...',
    es: 'Preparando verificación facial...',
    en: 'Preparing face verification...',
  },
  instruction: {
    pt: 'Encaixe seu rosto no oval e mantenha boa iluminação',
    es: 'Encaja tu rostro en el óvalo y mantén buena iluminación',
    en: 'Fit your face in the oval and keep good lighting',
  },
  ready: {
    pt: 'Perfeito! Toque para capturar',
    es: '¡Perfecto! Toca para capturar',
    en: 'Perfect! Tap to capture',
  },
  capture: {
    pt: 'Tirar selfie',
    es: 'Tomar selfie',
    en: 'Take selfie',
  },
  denied: {
    pt: 'Permita o acesso à câmera para continuar',
    es: 'Permite el acceso a la cámara para continuar',
    en: 'Allow camera access to continue',
  },
  unsupported: {
    pt: 'Seu navegador não suporta captura pela câmera',
    es: 'Tu navegador no admite captura por cámara',
    en: 'Your browser does not support camera capture',
  },
  retry: {
    pt: 'Tentar novamente',
    es: 'Intentar de nuevo',
    en: 'Try again',
  },
  private: {
    pt: 'Sua imagem é privada e segura',
    es: 'Tu imagen es privada y segura',
    en: 'Your image is private and secure',
  },
};

function FaceOvalOverlay({ ready }: { ready: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <defs>
          <mask id="face-oval-mask">
            <rect width="100" height="100" fill="white" />
            <ellipse
              cx={FACE_OVAL.cx * 100}
              cy={FACE_OVAL.cy * 100}
              rx={FACE_OVAL.rx * 100}
              ry={FACE_OVAL.ry * 100}
              fill="black"
            />
          </mask>
        </defs>
        <rect width="100" height="100" fill="rgba(0,0,0,0.55)" mask="url(#face-oval-mask)" />
        <ellipse
          cx={FACE_OVAL.cx * 100}
          cy={FACE_OVAL.cy * 100}
          rx={FACE_OVAL.rx * 100}
          ry={FACE_OVAL.ry * 100}
          fill="none"
          stroke={ready ? '#5B54FF' : 'rgba(255,255,255,0.85)'}
          strokeWidth="0.6"
          strokeDasharray={ready ? '0' : '2 1.5'}
        />
      </svg>
    </div>
  );
}

export function FaceCaptureCamera({ locale, onCapture }: FaceCaptureCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastCheckRef = useRef(0);

  const { ready: detectorReady, error: detectorError, detectFaces } = useFaceDetector();
  const [cameraState, setCameraState] = useState<CameraState>('loading');
  const [hint, setHint] = useState<FaceValidationIssue | 'ready' | null>(null);
  const [canCapture, setCanCapture] = useState(false);

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    stopCamera();
    setCameraState('loading');

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;
      await video.play();
      setCameraState('active');
    } catch {
      setCameraState('denied');
    }
  }, [stopCamera]);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (cameraState !== 'active' || !detectorReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const tick = (timestamp: number) => {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (timestamp - lastCheckRef.current >= 280) {
        lastCheckRef.current = timestamp;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0);
        ctx.restore();

        const faces = detectFaces(video, timestamp);
        const brightness = measureBrightness(ctx, canvas.width, canvas.height);
        const sharpness = measureSharpness(ctx, canvas.width, canvas.height);
        const result = validateFaceCapture(faces, canvas.width, canvas.height, brightness, sharpness);

        if (result.valid) {
          setHint('ready');
          setCanCapture(true);
        } else {
          setHint(getPrimaryValidationHint(result.issues));
          setCanCapture(false);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [cameraState, detectorReady, detectFaces]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !canCapture) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.restore();

    const faces = detectFaces(video, performance.now());
    const brightness = measureBrightness(ctx, canvas.width, canvas.height);
    const sharpness = measureSharpness(ctx, canvas.width, canvas.height);
    const result = validateFaceCapture(faces, canvas.width, canvas.height, brightness, sharpness);

    if (!result.valid) {
      setHint(getPrimaryValidationHint(result.issues));
      setCanCapture(false);
      return;
    }

    stopCamera();
    onCapture(canvas.toDataURL('image/jpeg', 0.92));
  };

  if (cameraState === 'denied' || cameraState === 'unsupported' || detectorError) {
    const message =
      cameraState === 'unsupported' || detectorError
        ? UI.unsupported[locale]
        : UI.denied[locale];

    return (
      <div className="space-y-4 rounded-airbnb-lg border border-deco bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <p className="text-[15px] font-medium text-hof">{message}</p>
        {cameraState === 'denied' && (
          <button
            type="button"
            onClick={startCamera}
            className="rounded-pill bg-quiz-accent px-6 py-3 text-sm font-semibold text-white"
          >
            {UI.retry[locale]}
          </button>
        )}
      </div>
    );
  }

  const hintText =
    hint === 'ready'
      ? UI.ready[locale]
      : hint
        ? HINTS[hint][locale]
        : UI.instruction[locale];

  const isLoading = cameraState === 'loading' || !detectorReady;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-airbnb-lg bg-black shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className="aspect-[3/4] w-full scale-x-[-1] object-cover"
        />

        <FaceOvalOverlay ready={canCapture} />

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
            <p className="mt-4 px-6 text-center text-sm font-medium text-white">
              {cameraState === 'loading' ? UI.loadingCamera[locale] : UI.loadingDetector[locale]}
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-10">
          <p
            className={`text-center text-sm font-medium ${canCapture ? 'text-[#9BF0E1]' : 'text-white'}`}
          >
            {hintText}
          </p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden />

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleCapture}
          disabled={!canCapture}
          aria-label={UI.capture[locale]}
          className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-airbnb transition enabled:active:scale-95 disabled:opacity-40"
        >
          <span
            className={`h-14 w-14 rounded-full ${canCapture ? 'bg-white' : 'bg-white/50'}`}
          />
        </button>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-[#717171]">
          <UiIcon name="lock" size={14} />
          {UI.private[locale]}
        </p>
      </div>
    </div>
  );
}
