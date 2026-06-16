export type FaceValidationIssue =
  | 'no-face'
  | 'multiple-faces'
  | 'face-off-center'
  | 'face-too-small'
  | 'face-too-large'
  | 'too-dark'
  | 'too-bright'
  | 'blurry';

export interface FaceValidationResult {
  valid: boolean;
  issues: FaceValidationIssue[];
  brightness: number;
  sharpness: number;
}

export interface OvalGuide {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export const FACE_OVAL: OvalGuide = {
  cx: 0.5,
  cy: 0.42,
  rx: 0.34,
  ry: 0.28,
};

/** Contorno de rosto (viewBox 0 0 100 100) alinhado ao guia de validação. */
export const FACE_CONTOUR_PATH =
  'M50 12 C64 12 76 18 82 30 C87 42 87 54 83 66 C78 78 70 88 58 93 C54 95 50 96 46 95 C34 90 26 80 21 68 C17 56 17 44 21 32 C26 20 36 12 50 12 Z';

const MIN_BRIGHTNESS = 55;
const MAX_BRIGHTNESS = 210;
const MIN_SHARPNESS = 28;

function isPointInOval(px: number, py: number, oval: OvalGuide): boolean {
  const dx = (px - oval.cx) / oval.rx;
  const dy = (py - oval.cy) / oval.ry;
  return dx * dx + dy * dy <= 1;
}

function getLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function measureBrightness(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  region?: { x: number; y: number; w: number; h: number },
): number {
  const { x, y, w, h } = region ?? { x: 0, y: 0, w: width, h: height };
  const data = ctx.getImageData(x, y, w, h).data;
  let total = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 16) {
    total += getLuminance(data[i], data[i + 1], data[i + 2]);
    count += 1;
  }

  return count > 0 ? total / count : 0;
}

export function measureSharpness(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  region?: { x: number; y: number; w: number; h: number },
): number {
  const { x, y, w, h } = region ?? { x: 0, y: 0, w: width, h: height };
  const data = ctx.getImageData(x, y, w, h).data;
  const cols = w;
  const rows = h;
  const gray: number[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const idx = (row * cols + col) * 4;
      gray.push(getLuminance(data[idx], data[idx + 1], data[idx + 2]));
    }
  }

  let laplacianSum = 0;
  let laplacianCount = 0;

  for (let row = 1; row < rows - 1; row += 2) {
    for (let col = 1; col < cols - 1; col += 2) {
      const center = gray[row * cols + col];
      const top = gray[(row - 1) * cols + col];
      const bottom = gray[(row + 1) * cols + col];
      const left = gray[row * cols + (col - 1)];
      const right = gray[row * cols + (col + 1)];
      const laplacian = Math.abs(4 * center - top - bottom - left - right);
      laplacianSum += laplacian;
      laplacianCount += 1;
    }
  }

  return laplacianCount > 0 ? laplacianSum / laplacianCount : 0;
}

export interface DetectedFaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function validateFaceCapture(
  faces: DetectedFaceBox[],
  canvasWidth: number,
  canvasHeight: number,
  brightness: number,
  sharpness: number,
  oval: OvalGuide = FACE_OVAL,
): FaceValidationResult {
  const issues: FaceValidationIssue[] = [];

  if (faces.length === 0) {
    issues.push('no-face');
  } else if (faces.length > 1) {
    issues.push('multiple-faces');
  } else {
    const face = faces[0];
    const faceCx = (face.x + face.width / 2) / canvasWidth;
    const faceCy = (face.y + face.height / 2) / canvasHeight;
    const faceWidthRatio = face.width / canvasWidth;
    const faceHeightRatio = face.height / canvasHeight;

    if (!isPointInOval(faceCx, faceCy, oval)) {
      issues.push('face-off-center');
    }
    if (faceWidthRatio < 0.22 || faceHeightRatio < 0.18) {
      issues.push('face-too-small');
    }
    if (faceWidthRatio > 0.72 || faceHeightRatio > 0.62) {
      issues.push('face-too-large');
    }
  }

  if (brightness < MIN_BRIGHTNESS) {
    issues.push('too-dark');
  }
  if (brightness > MAX_BRIGHTNESS) {
    issues.push('too-bright');
  }
  if (sharpness < MIN_SHARPNESS) {
    issues.push('blurry');
  }

  return {
    valid: issues.length === 0,
    issues,
    brightness,
    sharpness,
  };
}

/** Validação pós-captura: rosto humano único, nitidez e iluminação. */
export function validateCapturedPhoto(
  faces: DetectedFaceBox[],
  canvasWidth: number,
  canvasHeight: number,
  brightness: number,
  sharpness: number,
): FaceValidationResult {
  const issues: FaceValidationIssue[] = [];

  if (faces.length === 0) {
    issues.push('no-face');
  } else if (faces.length > 1) {
    issues.push('multiple-faces');
  } else {
    const face = faces[0];
    const faceWidthRatio = face.width / canvasWidth;
    const faceHeightRatio = face.height / canvasHeight;

    if (faceWidthRatio < 0.15 || faceHeightRatio < 0.12) {
      issues.push('face-too-small');
    }
  }

  if (brightness < MIN_BRIGHTNESS) {
    issues.push('too-dark');
  }
  if (brightness > MAX_BRIGHTNESS) {
    issues.push('too-bright');
  }
  if (sharpness < MIN_SHARPNESS) {
    issues.push('blurry');
  }

  return {
    valid: issues.length === 0,
    issues,
    brightness,
    sharpness,
  };
}

export function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export function getPrimaryValidationHint(issues: FaceValidationIssue[]): FaceValidationIssue | null {
  const priority: FaceValidationIssue[] = [
    'no-face',
    'multiple-faces',
    'face-off-center',
    'face-too-small',
    'face-too-large',
    'too-dark',
    'too-bright',
    'blurry',
  ];

  for (const issue of priority) {
    if (issues.includes(issue)) return issue;
  }
  return null;
}
