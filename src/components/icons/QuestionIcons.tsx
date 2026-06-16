import type { ReactNode } from 'react';

const iconClass = 'text-gold';

export function QuestionIcon({ id }: { id: string }) {
  const icons: Record<string, ReactNode> = {
    female: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 14v7M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    male: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10l6-6M16 4h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    'non-binary': (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7V3M9 4.5h6M16 16l4 4M18 18h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    acne: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 14c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    redness: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 4c3 4 3 12 0 16-3-4-3-12 0-16z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    pores: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
    dullness: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    wrinkles: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 10c3 2 13 2 16 0M4 14c3 2 13 2 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    pigmentation: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <ellipse cx="12" cy="12" rx="7" ry="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    dry: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3c-4 6-6 9-6 12a6 6 0 1012 0c0-3-2-6-6-12z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    oily: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v4M8 7h8M7 11h10l-1 10H8L7 11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    sunscreen: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    cleanser: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 4h6v3a3 3 0 01-6 0V4zM8 20h8l1-10H7l1 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    serum: (
      <svg className={iconClass} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M10 3h4l1 5H9l1-5zM9 8h6v12H9V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center">
      {icons[id] ?? (
        <svg className={iconClass} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </span>
  );
}
