import type { ReactNode } from 'react';
import { KorLogo } from '@/components/brand/KorLogo';
import { SegmentedProgress } from '@/components/SegmentedProgress';
import type { QuizPhase } from '@/lib/question-metadata';

interface QuizLayoutProps {
  children: ReactNode;
  footer?: ReactNode;
  headerExtra?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  variant?: 'welcome' | 'quiz' | 'results';
  phase?: QuizPhase;
  phaseProgress?: number;
  showProgress?: boolean;
}

export function QuizLayout({
  children,
  footer,
  headerExtra,
  onBack,
  showBack,
  variant = 'quiz',
  phase = 1,
  phaseProgress = 0,
  showProgress = true,
}: QuizLayoutProps) {
  const isWelcome = variant === 'welcome';

  return (
    <div className="quiz-page">
      <div className="quiz-shell">
        <header className={`quiz-header ${isWelcome ? 'quiz-header-welcome' : ''}`}>
          {isWelcome && headerExtra && (
            <div className="mb-2 flex justify-end">{headerExtra}</div>
          )}

          {!isWelcome && (
            <div className="flex items-center gap-2">
              <div className="w-10 shrink-0">
                {showBack && onBack && (
                  <button type="button" onClick={onBack} aria-label="Voltar" className="back-btn">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M11 4L6 9L11 14" stroke="#222" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              {showProgress ? (
                <div className="flex min-w-0 flex-1 justify-center px-1">
                  <SegmentedProgress phase={phase} phaseProgress={phaseProgress} />
                </div>
              ) : (
                <div className="flex flex-1 justify-center">
                  <KorLogo variant="header" />
                </div>
              )}

              <div className="shrink-0">{headerExtra}</div>
            </div>
          )}

          {!isWelcome && showProgress && (
            <div className="mt-4 flex justify-center">
              <KorLogo variant="header" />
            </div>
          )}
        </header>

        <main className={`quiz-content ${footer ? 'quiz-content-with-footer' : ''}`}>{children}</main>

        {footer && <footer className="quiz-footer safe-bottom">{footer}</footer>}
      </div>
    </div>
  );
}
