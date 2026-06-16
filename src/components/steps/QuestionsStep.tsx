import { OptionCard } from '@/components/OptionCard';
import { LikertScale } from '@/components/LikertScale';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface QuestionsStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
  onAnswer: (id: string, value: string | string[] | number) => void;
}

export function QuestionsStep({ step, locale, answers, onAnswer }: QuestionsStepProps) {
  const questions = step.questions ?? [];
  const isSwatchStep = step.id === 'skin-tone';

  return (
    <div className="space-y-8">
      {step.title && <h1 className="quiz-title">{t(step.title, locale)}</h1>}
      {step.subtitle && <p className="quiz-subtitle">{t(step.subtitle, locale)}</p>}

      {questions.map((question) => {
        const answer = answers[question.id];

        if (question.type === 'likert') {
          return (
            <div key={question.id} className="space-y-4">
              <h2 className="text-[15px] font-medium leading-snug text-hof">{t(question.title, locale)}</h2>
              <LikertScale
                locale={locale}
                value={typeof answer === 'number' ? answer : undefined}
                onChange={(v) => onAnswer(question.id, v)}
              />
            </div>
          );
        }

        if (isSwatchStep) {
          return (
            <div key={question.id}>
              <div className="grid grid-cols-3 gap-4">
                {question.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    locale={locale}
                    selected={answer === option.id}
                    onSelect={() => onAnswer(question.id, option.id)}
                    variant="swatch"
                    swatchColor={option.meta?.hex as string}
                  />
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={question.id} className="space-y-3">
            <h2 className="text-[15px] font-semibold text-hof">{t(question.title, locale)}</h2>
            <div className="space-y-2">
              {question.options.map((option) => {
                const isMulti = question.type === 'multi';
                const selected = isMulti
                  ? ((answer as string[]) ?? []).includes(option.id)
                  : answer === option.id;

                const handleSelect = () => {
                  if (isMulti) {
                    const current = ((answer as string[]) ?? []).slice();
                    const idx = current.indexOf(option.id);
                    if (idx >= 0) current.splice(idx, 1);
                    else current.push(option.id);
                    onAnswer(question.id, current);
                  } else {
                    onAnswer(question.id, option.id);
                  }
                };

                return (
                  <OptionCard
                    key={option.id}
                    option={option}
                    locale={locale}
                    selected={selected}
                    onSelect={handleSelect}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function isQuestionsStepComplete(step: QuizStep, answers: QuizAnswers): boolean {
  const questions = step.questions ?? [];
  return questions.every((q) => {
    const answer = answers[q.id];
    if (q.type === 'likert') return typeof answer === 'number';
    if (q.type === 'multi') return Array.isArray(answer) && answer.length > 0;
    return typeof answer === 'string' && answer.length > 0;
  });
}
