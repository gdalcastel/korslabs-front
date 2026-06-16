export type Locale = 'en' | 'pt' | 'es';

export type LocalizedText = Record<Locale, string>;

export interface QuizOption {
  id: string;
  label: LocalizedText;
  value?: string;
  meta?: Record<string, unknown>;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multi' | 'likert';
  title: LocalizedText;
  subtitle?: LocalizedText;
  options: QuizOption[];
  required?: boolean;
}

export interface InfoSlide {
  id: string;
  type: 'info';
  title: LocalizedText;
  body: LocalizedText;
  highlight?: LocalizedText;
  image?: 'undertone' | 'exosomes' | 'harvard' | 'science' | 'fit';
}

export interface QuizStep {
  id: string;
  section: number;
  phase?: 1 | 2 | 3;
  kind: 'welcome' | 'info' | 'question' | 'questions' | 'environment' | 'fit-comparison' | 'profile-summary' | 'face-scan' | 'results';
  title?: LocalizedText;
  subtitle?: LocalizedText;
  body?: LocalizedText;
  cta?: LocalizedText;
  questions?: QuizQuestion[];
  question?: QuizQuestion;
  variant?: 'swatch';
  info?: InfoSlide;
}

export interface EnvironmentData {
  city: string;
  uvIndex: number;
  humidity: number;
  pollution: 'low' | 'moderate' | 'high';
}

export interface SkinProfile {
  skinTone: string;
  undertone: 'cool' | 'neutral' | 'warm';
  confidenceScore: number;
  skinTypeLabel: LocalizedText;
  lifestyleScore: number;
  programFit: number;
  ingredientsFit: number;
  interpretation: LocalizedText;
}

export interface RoutineProduct {
  type: LocalizedText;
  ingredients: LocalizedText;
  benefits: LocalizedText;
  usage: LocalizedText;
}

export interface SkincarePlan {
  am: RoutineProduct[];
  pm: RoutineProduct[];
  weekly: RoutineProduct[];
}

export interface QuizAnswers {
  [questionId: string]: string | string[] | number;
}

export interface QuizState {
  locale: Locale;
  currentStepIndex: number;
  answers: QuizAnswers;
  environment: EnvironmentData | null;
  faceImage: string | null;
  profile: SkinProfile | null;
  plan: SkincarePlan | null;
  setLocale: (locale: Locale) => void;
  setAnswer: (questionId: string, value: string | string[] | number) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setEnvironment: (data: EnvironmentData) => void;
  setFaceImage: (dataUrl: string | null) => void;
  computeResults: () => void;
  reset: () => void;
}
