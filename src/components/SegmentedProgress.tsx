import type { QuizPhase } from '@/lib/question-metadata';

interface SegmentedProgressProps {
  phase: QuizPhase;
  phaseProgress: number;
}

export function SegmentedProgress({ phase, phaseProgress }: SegmentedProgressProps) {
  const segments: QuizPhase[] = [1, 2, 3];

  return (
    <div className="flex w-full max-w-[220px] gap-1.5" role="progressbar" aria-valuenow={phase} aria-valuemin={1} aria-valuemax={3}>
      {segments.map((segment) => {
        const isPast = segment < phase;
        const isCurrent = segment === phase;
        const fill = isPast ? 100 : isCurrent ? Math.round(phaseProgress * 100) : 0;

        return (
          <div key={segment} className="segment-track flex-1">
            <div className="segment-fill" style={{ width: `${fill}%` }} />
          </div>
        );
      })}
    </div>
  );
}
