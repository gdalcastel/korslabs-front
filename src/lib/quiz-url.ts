import { quizSteps } from '@/lib/flatten-steps';

export const QUIZ_PATH = '/quiz';
const STEP_PARAM = 's';
const LEGACY_STEP_PARAM = 'step';

function normalizeStepParam(search: string): URLSearchParams {
  const params = new URLSearchParams(search);
  const legacyStep = params.get(LEGACY_STEP_PARAM);

  if (legacyStep && !params.get(STEP_PARAM)) {
    params.set(STEP_PARAM, legacyStep);
  }

  params.delete(LEGACY_STEP_PARAM);
  return params;
}

export function isQuizPath(pathname = window.location.pathname): boolean {
  return pathname === QUIZ_PATH || pathname === `${QUIZ_PATH}/`;
}

export function syncQuizRoute(location: Pick<Location, 'pathname' | 'search'> = window.location): void {
  const params = normalizeStepParam(location.search);

  if (isQuizPath(location.pathname)) {
    if (!params.get(STEP_PARAM)) {
      params.set(STEP_PARAM, quizSteps[0]?.id ?? 'welcome');
    }

    const nextUrl = `${QUIZ_PATH}?${params.toString()}`;
    const currentUrl = `${location.pathname}${location.search}`;

    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
    return;
  }

  const stepId = params.get(STEP_PARAM) ?? quizSteps[0]?.id ?? 'welcome';
  params.set(STEP_PARAM, stepId);
  window.history.replaceState(null, '', `${QUIZ_PATH}?${params.toString()}`);
}

export function getStepIndexFromUrl(search = window.location.search): number | null {
  if (!isQuizPath()) return null;

  const stepId = normalizeStepParam(search).get(STEP_PARAM);
  if (!stepId) return null;

  const index = quizSteps.findIndex((s) => s.id === stepId);
  return index >= 0 ? index : null;
}

export function getInitialStepIndex(): number {
  syncQuizRoute();
  return getStepIndexFromUrl() ?? 0;
}

export function updateQuizStepUrl(stepIndex: number, replace = true): void {
  const step = quizSteps[stepIndex];
  if (!step) return;

  syncQuizRoute();

  const url = new URL(window.location.href);
  url.pathname = QUIZ_PATH;
  url.search = '';
  url.searchParams.set(STEP_PARAM, step.id);

  if (replace) {
    window.history.replaceState({ stepIndex }, '', url);
  } else {
    window.history.pushState({ stepIndex }, '', url);
  }
}

if (typeof window !== 'undefined') {
  syncQuizRoute();
}
