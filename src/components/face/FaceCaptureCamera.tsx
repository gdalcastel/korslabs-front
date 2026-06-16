import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FaceScanAnimation } from '@/components/face/FaceScanAnimation';
import { UiIcon } from '@/components/icons/UiIcons';
import { useFaceDetector } from '@/hooks/useFaceDetector';
import {
  FACE_CONTOUR_PATH,
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
type CaptureState = 'live' | 'scanning';

const SCAN_DURATION_MS = 2800;

const HINTS: Record<FaceValidationIssue, Record<Locale, string>> = {
  'no-face': {
    pt: 'Posicione seu rosto dentro do contorno',
    es: 'Coloca tu rostro dentro del contorno',
    en: 'Position your face inside the outline',
  },
  'multiple-faces': {
    pt: 'Apenas uma pessoa deve aparecer na foto',
    es: 'Solo una persona debe aparecer en la foto',
    en: 'Only one person should appear in the photo',
  },
  'face-off-center': {
    pt: 'Centralize seu rosto no contorno',
    es: 'Centra tu rostro en el contorno',
    en: 'Center your face in the outline',
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
    pt: 'Encaixe seu rosto no contorno e toque para capturar',
    es: 'Encaja tu rostro en el contorno y toca para capturar',
    en: 'Fit your face in the outline and tap to capture',
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

function FaceContourOverlay({ ready, maskId }: { ready: boolean; maskId: string }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <mask id={maskId}>
            <rect width="100" height="100" fill="white" />
            <path d={FACE_CONTOUR_PATH} fill="black" />
          </mask>
        </defs>
        <rect width="100" height="100" fill="rgba(0,0,0,0.55)" mask={`url(#${maskId})`} />
        <path
          d={FACE_CONTOUR_PATH}
          fill="none"
          stroke={ready ? '#222222' : 'rgba(255,255,255,0.85)'}
          strokeWidth="0.55"
          strokeDasharray={ready ? '0' : '1.8 1.4'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function FaceCaptureCamera({ locale, onCapture }: FaceCaptureCameraProps) {
  const maskId = useId().replace(/:/g, '');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastCheckRef = useRef(0);
  const scanStartedAtRef = useRef<number | null>(null);

  const { ready: detectorReady, error: detectorError, detectFaces } = useFaceDetector();
  const [cameraState, setCameraState] = useState<CameraState>('loading');
  const [captureState, setCaptureState] = useState<CaptureState>('live');
  const [hint, setHint] = useState<FaceValidationIssue | 'ready' | null>(null);
  const [canCapture, setCanCapture] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
    setCaptureState('live');
    setCapturedImage(null);
    setHint(null);
    setCanCapture(false);

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
    if (cameraState !== 'active' || !detectorReady || captureState !== 'live') return;

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
  }, [cameraState, detectorReady, detectFaces, captureState]);

  useEffect(() => {
    if (captureState !== 'scanning' || !capturedImage || scanStartedAtRef.current === null) return;

    let cancelled = false;

    const finishScan = async () => {
      const elapsed = performance.now() - scanStartedAtRef.current!;
      const remaining = Math.max(0, SCAN_DURATION_MS - elapsed);
      await new Promise((resolve) => setTimeout(resolve, remaining));

      if (cancelled) return;
      onCapture(capturedImage);
    };

    void finishScan();

    return () => {
      cancelled = true;
    };
  }, [captureState, capturedImage, onCapture]);

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.restore();

    return canvas.toDataURL('image/jpeg', 0.92);
  };

  const handleCapture = () => {
    if (cameraState !== 'active' || captureState !== 'live') return;

    const dataUrl = captureFrame();
    if (!dataUrl) return;

    stopCamera();
    scanStartedAtRef.current = performance.now();
    setCapturedImage(dataUrl);
    setCaptureState('scanning');
  };

  if (cameraState === 'denied' || cameraState === 'unsupported' || detectorError) {
    const message =
      cameraState === 'unsupported' || detectorError
        ? UI.unsupported[locale]
        : UI.denied[locale];

    return (
      <div className="face-capture-fullscreen flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-4 rounded-airbnb-lg border border-white/10 bg-white/95 p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
          <p className="text-[15px] font-medium text-hof">{message}</p>
          {cameraState === 'denied' && (
            <button
              type="button"
              onClick={startCamera}
              className="rounded-pill bg-quiz-accent px-6 py-3 text-sm font-semibold text-gold"
            >
              {UI.retry[locale]}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (captureState === 'scanning' && capturedImage) {
    return (
      <div className="face-capture-fullscreen">
        <FaceScanAnimation imageSrc={capturedImage} locale={locale} />
        <canvas ref={canvasRef} className="hidden" aria-hidden />
      </div>
    );
  }

  const hintText =
    hint === 'ready'
      ? UI.ready[locale]
      : hint
        ? HINTS[hint][locale]
        : UI.instruction[locale];

  const isCameraLoading = cameraState === 'loading';
  const isDetectorLoading = cameraState === 'active' && !detectorReady;
  const canPressCapture = cameraState === 'active' && captureState === 'live';

  return (
    <div className="face-capture-fullscreen">
      <video ref={videoRef} playsInline muted autoPlay className="face-capture-video" />

      <FaceContourOverlay ready={canCapture} maskId={maskId} />

      {isCameraLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          <p className="mt-4 px-6 text-center text-sm font-medium text-white">
            {UI.loadingCamera[locale]}
          </p>
        </div>
      )}

      <div className="face-capture-overlay-bottom">
        <p
          className={`text-center text-sm font-medium ${canCapture ? 'text-[#9BF0E1]' : 'text-white'}`}
        >
          {isDetectorLoading ? UI.loadingDetector[locale] : hintText}
        </p>

        <button
          type="button"
          onClick={handleCapture}
          disabled={!canPressCapture}
          aria-label={UI.capture[locale]}
          className="relative mt-4 flex h-[72px] w-[72px] touch-manipulation items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-airbnb transition enabled:active:scale-95 disabled:opacity-40"
        >
          <span className={`h-14 w-14 rounded-full ${canCapture ? 'bg-white' : 'bg-white/80'}`} />
        </button>

        <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-white/70">
          <UiIcon name="lock" size={14} />
          {UI.private[locale]}
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden />
    </div>
  );
}
