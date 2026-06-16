import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { quizSteps } from '@/lib/flatten-steps';
import { buildPlan, buildProfile } from '@/lib/quiz-engine';
import { getInitialStepIndex, updateQuizStepUrl } from '@/lib/quiz-url';
import { detectLocaleFromBrowser } from '@/lib/i18n';
import { clearQuizStorage, QUIZ_STORAGE_KEY } from '@/lib/quiz-storage';
import type { EnvironmentData, QuizState } from '@/types/quiz';

const baseState = {
  locale: detectLocaleFromBrowser(),
  localeManual: false,
  currentStepIndex: getInitialStepIndex(),
  answers: {} as QuizState['answers'],
  environment: null as EnvironmentData | null,
  faceImage: null as string | null,
  profile: null,
  plan: null,
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...baseState,

      setLocale: (locale, manual = false) =>
        set((state) => ({
          locale,
          localeManual: manual ? true : state.localeManual,
        })),

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
        clearQuizStorage();
        const { locale, localeManual } = get();
        set({ ...baseState, locale, localeManual, currentStepIndex: 0, faceImage: null });
        updateQuizStepUrl(0);
      },
    }),
    {
      name: QUIZ_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
        localeManual: state.localeManual,
        answers: state.answers,
        environment: state.environment,
        profile: state.profile,
        plan: state.plan,
      }),
    },
  ),
);

export { quizSteps } from '@/lib/flatten-steps';
