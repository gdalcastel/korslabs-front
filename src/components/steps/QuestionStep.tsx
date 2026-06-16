import { FaceAreaCheckbox } from '@/components/FaceAreaCheckbox';
import { FaceAreasDiagram } from '@/components/icons/FaceAreasDiagram';
import { LikertScale } from '@/components/LikertScale';
import { OptionPill, SwatchRowOption } from '@/components/OptionPill';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface QuestionStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
  onAnswer: (id: string, value: string | string[] | number) => void;
  onAutoAdvance?: () => void;
}

export function QuestionStep({ step, locale, answers, onAnswer, onAutoAdvance }: QuestionStepProps) {
  const question = step.question;
  if (!question) return null;

  const answer = answers[question.id];
  const isSwatchRow = step.variant === 'swatch-row';
  const isFaceMap = step.variant === 'face-map';

  const handleSingle = (optionId: string) => {
    onAnswer(question.id, optionId);
    onAutoAdvance?.();
  };

  const handleMulti = (optionId: string) => {
    const current = ((answer as string[]) ?? []).slice();
    const idx = current.indexOf(optionId);
    if (idx >= 0) current.splice(idx, 1);
    else current.push(optionId);
    onAnswer(question.id, current);
  };

  if (question.type === 'likert') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="quiz-title">{t(question.title, locale)}</h1>
          {step.subtitle && <p className="quiz-subtitle">{t(step.subtitle, locale)}</p>}
        </div>
        <LikertScale
          locale={locale}
          value={typeof answer === 'number' ? answer : undefined}
          onChange={(v) => {
            onAnswer(question.id, v);
            setTimeout(() => onAutoAdvance?.(), 350);
          }}
        />
      </div>
    );
  }

  if (isSwatchRow) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="quiz-title">{t(question.title, locale)}</h1>
          {(step.subtitle || question.subtitle) && (
            <p className="quiz-subtitle">{t(step.subtitle ?? question.subtitle!, locale)}</p>
          )}
        </div>
        <div className="space-y-3">
          {question.options.map((option) => (
            <SwatchRowOption
              key={option.id}
              option={option}
              locale={locale}
              selected={answer === option.id}
              onSelect={() => handleSingle(option.id)}
              color={option.meta?.hex as string | undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isFaceMap) {
    const selected = ((answer as string[]) ?? []).slice();

    const handleFaceAreaToggle = (optionId: string) => {
      const current = selected.slice();
      const idx = current.indexOf(optionId);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(optionId);
      onAnswer(question.id, current);
    };

    return (
      <div className="space-y-6">
        <div>
          <h1 className="quiz-title">{t(question.title, locale)}</h1>
          {step.subtitle && <p className="quiz-subtitle">{t(step.subtitle, locale)}</p>}
        </div>

        <div className="face-areas-layout">
          <div className="face-areas-diagram">
            <FaceAreasDiagram selected={selected} />
          </div>

          <div className="face-areas-options">
            {question.options.map((option) => (
              <FaceAreaCheckbox
                key={option.id}
                option={option}
                locale={locale}
                selected={selected.includes(option.id)}
                onToggle={() => handleFaceAreaToggle(option.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isMulti = question.type === 'multi';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="quiz-title">{t(question.title, locale)}</h1>
        {step.subtitle && <p className="quiz-subtitle">{t(step.subtitle, locale)}</p>}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = isMulti
            ? ((answer as string[]) ?? []).includes(option.id)
            : answer === option.id;

          return (
            <OptionPill
              key={option.id}
              option={option}
              locale={locale}
              selected={selected}
              showRadio={isMulti}
              onSelect={() => (isMulti ? handleMulti(option.id) : handleSingle(option.id))}
            />
          );
        })}
      </div>
    </div>
  );
}

export function isQuestionStepComplete(step: QuizStep, answers: QuizAnswers): boolean {
  const question = step.question;
  if (!question) return false;

  const answer = answers[question.id];
  if (question.type === 'likert') return typeof answer === 'number';
  if (question.type === 'multi') return Array.isArray(answer) && answer.length > 0;
  return typeof answer === 'string' && answer.length > 0;
}
