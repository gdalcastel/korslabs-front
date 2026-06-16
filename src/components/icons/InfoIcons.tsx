import type { ReactNode } from 'react';
import type { InfoSlide } from '@/types/quiz';

type InfoImageKey = NonNullable<InfoSlide['image']> | 'default';

const accent = '#5B54FF';

export function InfoIcon({ type }: { type: InfoImageKey }) {
  const icons: Record<InfoImageKey, ReactNode> = {
    undertone: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="12" cy="10" r="4" stroke={accent} strokeWidth="1.75" />
        <circle cx="24" cy="10" r="4" stroke={accent} strokeWidth="1.75" />
        <circle cx="18" cy="22" r="9" stroke={accent} strokeWidth="1.75" />
        <path d="M18 16v12M13 19h10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    exosomes: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="5" stroke={accent} strokeWidth="1.75" />
        <circle cx="8" cy="12" r="2.5" fill={accent} opacity="0.35" />
        <circle cx="28" cy="12" r="2.5" fill={accent} opacity="0.35" />
        <circle cx="8" cy="24" r="2.5" fill={accent} opacity="0.35" />
        <circle cx="28" cy="24" r="2.5" fill={accent} opacity="0.35" />
        <path d="M11 13l5 3M25 13l-5 3M11 23l5-3M25 23l-5-3" stroke={accent} strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    harvard: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path d="M6 26V14l12-6 12 6v12" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M14 26v-8h8v8" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M6 14l12 6 12-6" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
    science: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path d="M14 8h8l2 18H12l2-18z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M11 20h14" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="22" cy="12" r="2" fill={accent} opacity="0.4" />
        <path d="M24 10l4-4M26 8l2 2" stroke={accent} strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
    fit: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path d="M6 26l6-10 5 6 5-8 8 12" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 28h24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
    default: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="10" stroke={accent} strokeWidth="1.75" />
        <path d="M18 12v6l4 2" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[type] ?? icons.default;
}
