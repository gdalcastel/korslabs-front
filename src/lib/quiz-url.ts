import { quizSteps } from '@/lib/flatten-steps';

const STEP_PARAM = 'step';

export function getStepIndexFromUrl(search = window.location.search): number | null {
  const stepId = new URLSearchParams(search).get(STEP_PARAM);
  if (!stepId) return null;

  const index = quizSteps.findIndex((s) => s.id === stepId);
  return index >= 0 ? index : null;
}

export function getInitialStepIndex(): number {
  return getStepIndexFromUrl() ?? 0;
}

export function updateQuizStepUrl(stepIndex: number, replace = true): void {
  const step = quizSteps[stepIndex];
  if (!step) return;

  const url = new URL(window.location.href);
  url.searchParams.set(STEP_PARAM, step.id);

  if (replace) {
    window.history.replaceState({ stepIndex }, '', url);
  } else {
    window.history.pushState({ stepIndex }, '', url);
  }
}
