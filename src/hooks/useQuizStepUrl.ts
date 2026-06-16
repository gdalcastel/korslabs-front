import { useEffect } from 'react';
import { getStepIndexFromUrl, updateQuizStepUrl } from '@/lib/quiz-url';

export function useQuizStepUrl(
  currentStepIndex: number,
  goToStep: (index: number) => void,
): void {
  useEffect(() => {
    updateQuizStepUrl(currentStepIndex);
  }, [currentStepIndex]);

  useEffect(() => {
    const handlePopState = () => {
      const index = getStepIndexFromUrl();
      if (index !== null && index !== currentStepIndex) {
        goToStep(index);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentStepIndex, goToStep]);
}
