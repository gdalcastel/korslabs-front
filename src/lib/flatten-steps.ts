import { quizSteps as rawQuizSteps } from '@/data/quiz-steps';
import { getPhaseForSection, questionSubtitles, type QuizPhase } from '@/lib/question-metadata';
import type { QuizQuestion, QuizStep } from '@/types/quiz';

function expandQuestionStep(step: QuizStep, question: QuizQuestion): QuizStep {
  const subtitle =
    question.subtitle ??
    questionSubtitles[question.id] ??
    (step.questions && step.questions.length === 1 ? step.subtitle : undefined);

  return {
    id: `${step.id}__${question.id}`,
    section: step.section,
    phase: getPhaseForSection(step.section),
    kind: 'question',
    title: question.title,
    subtitle,
    question,
    variant:
      step.id === 'skin-tone' || question.id === 'undertone'
        ? 'swatch-row'
        : question.id === 'face-areas'
          ? 'face-map'
          : undefined,
  };
}

export function flattenQuizSteps(steps: QuizStep[] = rawQuizSteps): QuizStep[] {
  const flattened: QuizStep[] = [];

  for (const step of steps) {
    if (step.kind === 'questions' && step.questions?.length) {
      for (const question of step.questions) {
        flattened.push(expandQuestionStep(step, question));
      }
      continue;
    }

    flattened.push({
      ...step,
      phase: getPhaseForSection(step.section),
    });
  }

  return flattened;
}

export const quizSteps = flattenQuizSteps();

export function getPhaseProgress(
  steps: QuizStep[],
  currentIndex: number,
): { phase: QuizPhase; phaseProgress: number } {
  const current = steps[currentIndex];
  if (!current?.phase) return { phase: 1, phaseProgress: 0 };

  const phase = current.phase;
  const phaseStart = steps.findIndex((s) => s.phase === phase && s.kind !== 'welcome');
  const phaseEnd = steps.reduce((last, s, i) => (s.phase === phase ? i : last), phaseStart);
  const phaseLength = phaseEnd - phaseStart + 1;
  const positionInPhase = Math.max(0, currentIndex - phaseStart);
  const phaseProgress = phaseLength > 1 ? positionInPhase / (phaseLength - 1) : 1;

  return { phase, phaseProgress: Math.min(1, phaseProgress) };
}
