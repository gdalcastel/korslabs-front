import type { Locale } from '@/types/quiz';

export function t(text: Record<Locale, string>, locale: Locale): string {
  return text[locale] ?? text.en;
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  es: 'ES',
};

const SPANISH_COUNTRIES = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE',
]);

export function localeFromLanguageTag(tag: string): Locale | null {
  const normalized = tag.toLowerCase();
  if (normalized.startsWith('pt')) return 'pt';
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('en')) return 'en';
  return null;
}

export function localeFromCountryCode(countryCode: string): Locale {
  const code = countryCode.toUpperCase();
  if (code === 'BR' || code === 'PT') return 'pt';
  if (SPANISH_COUNTRIES.has(code)) return 'es';
  return 'en';
}

export function detectLocaleFromBrowser(): Locale {
  if (typeof navigator === 'undefined') return 'en';

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of languages) {
    const match = localeFromLanguageTag(lang);
    if (match) return match;
  }

  return 'en';
}

export async function detectLocale(): Promise<Locale> {
  if (typeof navigator !== 'undefined') {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const lang of languages) {
      const match = localeFromLanguageTag(lang);
      if (match) return match;
    }
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const geo = await res.json();
      if (geo.country_code) return localeFromCountryCode(geo.country_code);
    }
  } catch {
    // geo lookup is best-effort
  }

  return detectLocaleFromBrowser();
}
