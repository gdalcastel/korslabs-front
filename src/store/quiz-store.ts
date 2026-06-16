import { create } from 'zustand';
import { quizSteps } from '@/lib/flatten-steps';
import { buildPlan, buildProfile } from '@/lib/quiz-engine';
import { getInitialStepIndex, updateQuizStepUrl } from '@/lib/quiz-url';
import type { EnvironmentData, QuizState, Locale } from '@/types/quiz';

const initialState = {
  locale: 'pt' as Locale,
  currentStepIndex: getInitialStepIndex(),
  answers: {} as QuizState['answers'],
  environment: null as EnvironmentData | null,
  faceImage: null as string | null,
  profile: null,
  plan: null,
};

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,

  setLocale: (locale) => set({ locale }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  nextStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex < quizSteps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    if (index >= 0 && index < quizSteps.length) {
      set({ currentStepIndex: index });
    }
  },

  setEnvironment: (environment) => set({ environment }),

  setFaceImage: (faceImage) => set({ faceImage }),

  computeResults: () => {
    const { answers } = get();
    const profileData = buildProfile(answers);
    const plan = buildPlan(answers);
    set({
      profile: {
        skinTone: profileData.skinTone,
        undertone: profileData.undertone,
        confidenceScore: profileData.confidenceScore,
        skinTypeLabel: profileData.skinTypeLabel,
        lifestyleScore: profileData.lifestyleScore,
        programFit: profileData.programFit,
        ingredientsFit: profileData.ingredientsFit,
        interpretation: profileData.interpretation,
      },
      plan,
    });
  },

  reset: () => {
    set({ ...initialState, currentStepIndex: 0 });
    updateQuizStepUrl(0);
  },
}));

export { quizSteps } from '@/lib/flatten-steps';
