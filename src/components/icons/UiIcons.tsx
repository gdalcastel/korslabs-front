import type { ReactNode } from 'react';

const accent = '#5B54FF';

export type UiIconName =
  | 'location'
  | 'sun'
  | 'humidity'
  | 'pollution'
  | 'camera'
  | 'lock'
  | 'sunrise'
  | 'moon'
  | 'sparkles';

export function UiIcon({ name, size = 24 }: { name: UiIconName; size?: number }) {
  const icons: Record<UiIconName, ReactNode> = {
    location: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
        <circle cx="12" cy="11" r="2.25" stroke={accent} strokeWidth="1.75" />
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke={accent} strokeWidth="1.75" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    humidity: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3c-3.5 5-5.5 8-5.5 11a5.5 5.5 0 1011 0c0-3-2-6-5.5-11z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    pollution: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 15h3v2H4v-2zM9 13h3v4H9v-4zM14 11h3v6h-3v-6zM19 14h1v3h-1v-3z" fill={accent} opacity="0.45" />
        <path d="M3 17h18" stroke={accent} strokeWidth="1.75" strokeLinecap="round" opacity="0.35" />
        <path d="M6 10c1.5-2 3-2 4.5 0M11 9c1.5-2 3-2 4.5 0M16 8c1.5-2 3-2 4.5 0" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 8h3l2-2h6l2 2h3v10H4V8z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
        <circle cx="12" cy="13" r="3.25" stroke={accent} strokeWidth="1.75" />
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="6" y="11" width="12" height="9" rx="2" stroke={accent} strokeWidth="1.75" />
        <path d="M8 11V8a4 4 0 118 0v3" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    sunrise: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 16h16M12 6V4M7.8 8.8L6.4 7.4M16.2 8.8l1.4-1.4M12 10a3 3 0 100 6 3 3 0 000-6z" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M20 14.5A7.5 7.5 0 019.5 4 6.5 6.5 0 1020 14.5z" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3l1.2 4.2L17.5 8.5 13.2 9.7 12 14l-1.2-4.3L6.5 8.5l4.3-1.3L12 3zM18 15l.7 2.3L21 18l-2.3.7L18 21l-.7-2.3L15 18l2.3-.7L18 15z" stroke={accent} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };

  return <>{icons[name]}</>;
}

interface IconBadgeProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function IconBadge({ children, size = 'md' }: IconBadgeProps) {
  const sizes = {
    sm: 'h-9 w-9 rounded-xl',
    md: 'h-11 w-11 rounded-[14px]',
    lg: 'h-16 w-16 rounded-[20px]',
  };

  return (
    <span className={`icon-badge inline-flex shrink-0 items-center justify-center border border-white shadow-[0_4px_16px_rgba(91,84,255,0.1)] ${sizes[size]}`}>
      {children}
    </span>
  );
}
