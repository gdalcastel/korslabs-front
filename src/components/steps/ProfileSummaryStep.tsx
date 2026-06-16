import {
  getProfileDisplayRows,
  getProfileStatusZone,
  getStatusCardTheme,
} from '@/lib/profile-summary-display';
import { buildProfile } from '@/lib/quiz-engine';
import { t } from '@/lib/i18n';
import type { Locale, QuizAnswers, QuizStep } from '@/types/quiz';

interface ProfileSummaryStepProps {
  step: QuizStep;
  locale: Locale;
  answers: QuizAnswers;
  faceImage?: string | null;
}

function ProfileFaceIcon({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 56 56" width="56" height="56" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.18 0.001C35.97-0.062 43.57 2.947 48.92 8.478 54.14 13.87 56.09 21.327 56 28.748 55.9 36.066 53.7 43.344 48.42 48.525 43.12 53.71 35.68 55.888 28.18 55.995 20.56 56.104 12.76 54.351 7.35 49.113 1.9 43.85-0.08 36.23 0 28.748 0.08 21.353 2.55 14.148 7.78 8.808 13.13 3.354 20.45 0.063 28.18 0.001Z"
        fill="white"
      />
      <path
        d="M15.116 29.127C16.736 30.697 21.007 32.905 25.136 29.172M41.704 27.721C40.014 29.12 35.685 31.251 31.893 28.58M24.416 36.743C24.942 42.823 32.965 44.755 33.642 35.936M47.921 26.938C48.976 39.134 39.267 47.792 28.288 47.939 17.31 48.085 9.829 41.68 8.188 30.417 6.548 19.155 15.875 9.037 26.244 8.129 36.613 7.221 46.866 14.742 47.921 26.938Z"
        stroke={stroke}
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

function LifestyleGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const zone = getProfileStatusZone(clamped);

  return (
    <div className="profile-gauge">
      <div className="profile-score-badge">
        <span className="profile-score-value">{clamped}</span>
        <span className="profile-score-divider">&nbsp;/&nbsp;</span>
        <span className="profile-score-max">100</span>
      </div>

      <div className="profile-gauge-track">
        <div className="profile-gauge-segment profile-gauge-segment-low" />
        <div className="profile-gauge-segment profile-gauge-segment-mid" />
        <div className="profile-gauge-segment profile-gauge-segment-high" />
        <div
          className={`profile-gauge-thumb profile-gauge-thumb-${zone}`}
          style={{ left: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export function ProfileSummaryStep({ step, locale, answers, faceImage }: ProfileSummaryStepProps) {
  const profile = buildProfile(answers);
  const rows = getProfileDisplayRows(answers, locale);
  const theme = getStatusCardTheme(profile.skinTypeLabel.en);

  return (
    <div className="profile-summary-step mx-auto w-full max-w-[520px] pb-2">
      <h1 className="quiz-title">{step.title && t(step.title, locale)}</h1>

      <div className="mt-6">
        <LifestyleGauge score={profile.lifestyleScore} />

        <div className="profile-status-wrap">
          <div className="profile-status-pointer" style={{ color: theme.background }}>
            <svg width="30" height="10" viewBox="0 0 30 10" fill="none" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 0C18.75 0 22.5 10 30 10H0C7.5 10 11.25 0 15 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="profile-status-card" style={{ backgroundColor: theme.background }}>
            <div className="profile-status-card-inner">
              <ProfileFaceIcon stroke={theme.iconStroke} />
              <div className="min-w-0 flex-1">
                <p className="profile-status-title">{t(profile.skinTypeLabel, locale)}</p>
                <p className="profile-status-body">{t(profile.interpretation, locale)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-details-grid mt-8">
        <div className="profile-details-list">
          {rows.map((row) => (
            <div key={row.label.en} className="profile-detail-row">
              <p className="profile-detail-label">{t(row.label, locale)}</p>
              <p className="profile-detail-value">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {faceImage ? (
              <img src={faceImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="profile-avatar-placeholder" aria-hidden>
                <svg viewBox="0 0 64 64" className="h-10 w-10 text-bobo">
                  <circle cx="32" cy="24" r="12" fill="currentColor" opacity="0.35" />
                  <path
                    d="M12 58c4-14 14-20 20-20s16 6 20 20"
                    fill="currentColor"
                    opacity="0.35"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
