import { useEffect, useRef, type ReactNode } from 'react';

export type QuizTransitionDirection = 'forward' | 'backward';

interface QuizStepTransitionProps {
  stepKey: string;
  direction: QuizTransitionDirection;
  children: ReactNode;
}

export function QuizStepTransition({ stepKey, direction, children }: QuizStepTransitionProps) {
  const hasNavigated = useRef(false);

  useEffect(() => {
    hasNavigated.current = true;
  }, []);

  const animate = hasNavigated.current;
  const className = animate
    ? `quiz-step-transition quiz-step-transition-${direction}`
    : 'quiz-step-transition';

  return (
    <div key={stepKey} className={className}>
      {children}
    </div>
  );
}
