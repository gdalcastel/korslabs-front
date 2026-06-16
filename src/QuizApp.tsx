import { useCallback, useMemo } from 'react';
import { useQuizStepUrl } from '@/hooks/useQuizStepUrl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { QuizLayout } from '@/components/QuizLayout';
import { EnvironmentStep } from '@/components/steps/EnvironmentStep';
import { FaceScanStep } from '@/components/steps/FaceScanStep';
import { FitComparisonStep } from '@/components/steps/FitComparisonStep';
import { InfoStep } from '@/components/steps/InfoStep';
import { ProfileSummaryStep } from '@/components/steps/ProfileSummaryStep';
import { QuestionStep, isQuestionStepComplete } from '@/components/steps/QuestionStep';
import { ResultsStep } from '@/components/steps/ResultsStep';
import { WelcomeStep } from '@/components/steps/WelcomeStep';
import { getPhaseProgress } from '@/lib/flatten-steps';
import { t } from '@/lib/i18n';
import { quizSteps, useQuizStore } from '@/store/quiz-store';

export function QuizApp() {
  const {
    locale,
    currentStepIndex,
    answers,
    environment,
    faceImage,
    profile,
    plan,
    setLocale,
    setAnswer,
    nextStep,
    prevStep,
    goToStep,
    setEnvironment,
    setFaceImage,
    computeResults,
    reset,
  } = useQuizStore();

  useQuizStepUrl(currentStepIndex, goToStep);

  const step = quizSteps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const { phase, phaseProgress } = getPhaseProgress(quizSteps, currentStepIndex);

  const canContinue = useMemo(() => {
    switch (step.kind) {
      case 'welcome':
      case 'info':
      case 'environment':
      case 'fit-comparison':
      case 'profile-summary':
        return true;
      case 'question':
        return isQuestionStepComplete(step, answers);
      case 'face-scan':
        return Boolean(answers['face-scan-complete']);
      case 'results':
        return false;
      default:
        return true;
    }
  }, [step, answers]);

  const needsContinueButton = useMemo(() => {
    if (step.kind === 'welcome') return true;
    if (step.kind === 'info' || step.kind === 'environment' || step.kind === 'fit-comparison' || step.kind === 'profile-summary') {
      return true;
    }
    if (step.kind === 'question') {
      return step.question?.type === 'multi';
    }
    return false;
  }, [step]);

  const handleNext = useCallback(() => {
    if (step.kind === 'face-scan') return;
    nextStep();
  }, [step.kind, nextStep]);

  const handleAutoAdvance = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const handleFaceComplete = useCallback(() => {
    setAnswer('face-scan-complete', 1);
    computeResults();
    setTimeout(() => nextStep(), 400);
  }, [setAnswer, computeResults, nextStep]);

  const layoutVariant =
    step.kind === 'welcome' ? 'welcome' : step.kind === 'results' ? 'results' : 'quiz';

  const showFooter = step.kind !== 'results' && step.kind !== 'face-scan' && needsContinueButton;

  const renderStep = () => {
    switch (step.kind) {
      case 'welcome':
        return <WelcomeStep step={step} locale={locale} />;
      case 'info':
        return step.info ? <InfoStep info={step.info} locale={locale} /> : null;
      case 'question':
        return (
          <QuestionStep
            step={step}
            locale={locale}
            answers={answers}
            onAnswer={setAnswer}
            onAutoAdvance={needsContinueButton ? undefined : handleAutoAdvance}
          />
        );
      case 'environment':
        return (
          <EnvironmentStep
            step={step}
            locale={locale}
            environment={environment}
            onDetect={setEnvironment}
          />
        );
      case 'fit-comparison':
        return <FitComparisonStep step={step} locale={locale} answers={answers} />;
      case 'profile-summary':
        return <ProfileSummaryStep step={step} locale={locale} answers={answers} />;
      case 'face-scan':
        return (
          <FaceScanStep
            step={step}
            locale={locale}
            faceImage={faceImage}
            onImage={setFaceImage}
            onComplete={handleFaceComplete}
          />
        );
      case 'results':
        return profile && plan ? (
          <ResultsStep
            step={step}
            locale={locale}
            profile={profile}
            plan={plan}
            onRestart={reset}
          />
        ) : null;
      default:
        return null;
    }
  };

  const ctaLabel = step.cta
    ? t(step.cta, locale)
    : locale === 'pt'
      ? 'Continuar'
      : locale === 'es'
        ? 'Continuar'
        : 'Continue';

  return (
    <QuizLayout
      variant={layoutVariant}
      showBack={!isFirst && step.kind !== 'results' && step.kind !== 'welcome'}
      onBack={prevStep}
      phase={phase}
      phaseProgress={phaseProgress}
      showProgress={step.kind !== 'welcome' && step.kind !== 'results'}
      headerExtra={<LocaleSwitcher locale={locale} onChange={setLocale} compact />}
      footer={
        showFooter ? (
          <div className="btn-primary-wrap">
            <button
              type="button"
              className="btn-primary"
              disabled={!canContinue}
              onClick={handleNext}
            >
              {ctaLabel}
            </button>
          </div>
        ) : undefined
      }
    >
      {renderStep()}
    </QuizLayout>
  );
}
