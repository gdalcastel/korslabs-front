import { useEffect, useState } from 'react';
import { quizSteps } from '@/lib/flatten-steps';
import { detectLocale } from '@/lib/i18n';
import { getStepIndexFromUrl } from '@/lib/quiz-url';
import { useQuizStore } from '@/store/quiz-store';

export function useQuizHydration(): boolean {
  const [hydrated, setHydrated] = useState(() => useQuizStore.persist.hasHydrated());

  useEffect(() => {
    const finishHydration = () => {
      const state = useQuizStore.getState();
      const urlIndex = getStepIndexFromUrl();

      if (urlIndex !== null && urlIndex !== state.currentStepIndex) {
        state.goToStep(urlIndex);
      }

      const step = quizSteps[useQuizStore.getState().currentStepIndex];
      const { answers, profile, plan } = useQuizStore.getState();

      if (step?.kind === 'results' && (!profile || !plan) && Object.keys(answers).length > 0) {
        state.computeResults();
      }

      if (!state.localeManual) {
        detectLocale().then((detected) => {
          const current = useQuizStore.getState();
          if (!current.localeManual && current.locale !== detected) {
            current.setLocale(detected);
          }
        });
      }

      setHydrated(true);
    };

    if (useQuizStore.persist.hasHydrated()) {
      finishHydration();
      return;
    }

    return useQuizStore.persist.onFinishHydration(finishHydration);
  }, []);

  return hydrated;
}
