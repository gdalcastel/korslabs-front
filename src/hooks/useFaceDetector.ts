import { useEffect, useRef, useState } from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import type { DetectedFaceBox } from '@/lib/face-validation';

const WASM_PATH = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm';
const MODEL_PATH =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite';

let detectorPromise: Promise<FaceDetector> | null = null;

function loadDetector(): Promise<FaceDetector> {
  if (!detectorPromise) {
    detectorPromise = FilesetResolver.forVisionTasks(WASM_PATH).then((vision) =>
      FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_PATH,
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        minDetectionConfidence: 0.65,
      }),
    );
  }
  return detectorPromise;
}

export function useFaceDetector() {
  const detectorRef = useRef<FaceDetector | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadDetector()
      .then((detector) => {
        if (cancelled) return;
        detectorRef.current = detector;
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setError('face-detector-unavailable');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const detectFaces = (video: HTMLVideoElement, timestamp: number): DetectedFaceBox[] => {
    const detector = detectorRef.current;
    if (!detector || video.videoWidth === 0) return [];

    const result = detector.detectForVideo(video, timestamp);
    return result.detections.map((detection) => {
      const box = detection.boundingBox!;
      return {
        x: video.videoWidth - box.originX - box.width,
        y: box.originY,
        width: box.width,
        height: box.height,
      };
    });
  };

  return { ready, error, detectFaces };
}
