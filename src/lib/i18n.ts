import type { Locale } from '@/types/quiz';

export function t(text: Record<Locale, string>, locale: Locale): string {
  return text[locale] ?? text.en;
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  es: 'ES',
};
