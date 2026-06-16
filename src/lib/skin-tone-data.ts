import type { LocalizedText } from '@/types/quiz';

export const skinToneOptions = [
  { id: 'very-fair', label: { en: 'Very Fair', pt: 'Muito Clara', es: 'Muy Clara' }, hex: '#F5E6D8' },
  { id: 'fair', label: { en: 'Fair', pt: 'Clara', es: 'Clara' }, hex: '#E8C9A8' },
  { id: 'medium', label: { en: 'Medium', pt: 'Média', es: 'Media' }, hex: '#D4A574' },
  { id: 'brown', label: { en: 'Brown', pt: 'Morena', es: 'Morena' }, hex: '#A0622E' },
  { id: 'deep-brown', label: { en: 'Deep Brown', pt: 'Morena Escura', es: 'Morena Oscura' }, hex: '#6B3E1F' },
  { id: 'other', label: { en: 'Other', pt: 'Outro', es: 'Otro' } },
] as const;

export const undertoneOptions = [
  { id: 'cool', label: { en: 'Cool', pt: 'Frio', es: 'Frío' }, hex: '#F0C4BC' },
  { id: 'neutral', label: { en: 'Neutral', pt: 'Neutro', es: 'Neutro' }, hex: '#D4B896' },
  { id: 'warm', label: { en: 'Warm', pt: 'Quente', es: 'Cálido' }, hex: '#E8A65B' },
  { id: 'olive', label: { en: 'Olive', pt: 'Oliva', es: 'Oliva' }, hex: '#B8A86E' },
  { id: 'not-sure', label: { en: 'Not sure', pt: 'Não tenho certeza', es: 'No estoy seguro(a)' } },
] as const;

export const legacyToneMap: Record<string, string> = {
  light: 'medium',
  tan: 'brown',
  deep: 'deep-brown',
};

export function getSkinToneMeta(toneId?: string) {
  const normalized = toneId ? (legacyToneMap[toneId] ?? toneId) : 'medium';
  return skinToneOptions.find((o) => o.id === normalized) ?? skinToneOptions[2];
}

export function getUndertoneMeta(undertoneId?: string) {
  return undertoneOptions.find((o) => o.id === undertoneId) ?? undertoneOptions[1];
}

export function resolveProfileUndertone(
  undertoneId?: string,
  toneId?: string,
): 'cool' | 'neutral' | 'warm' {
  if (undertoneId && undertoneId !== 'not-sure') {
    if (undertoneId === 'olive') return 'warm';
    if (undertoneId === 'cool' || undertoneId === 'neutral' || undertoneId === 'warm') {
      return undertoneId;
    }
  }

  const toneDefaults: Record<string, 'cool' | 'neutral' | 'warm'> = {
    'very-fair': 'cool',
    fair: 'cool',
    medium: 'neutral',
    brown: 'warm',
    'deep-brown': 'warm',
    other: 'neutral',
    light: 'neutral',
    tan: 'warm',
    deep: 'warm',
  };

  const key = toneId ? (legacyToneMap[toneId] ?? toneId) : 'medium';
  return toneDefaults[key] ?? 'neutral';
}

export function toneBadgeLabel(locale: keyof LocalizedText, toneId?: string): string {
  return getSkinToneMeta(toneId).label[locale];
}

export function undertoneBadgeLabel(locale: keyof LocalizedText, undertoneId?: string, toneId?: string): string {
  if (undertoneId && undertoneId !== 'not-sure') {
    return getUndertoneMeta(undertoneId).label[locale];
  }

  const inferred = resolveProfileUndertone(undefined, toneId);
  const inferredLabels: Record<'cool' | 'neutral' | 'warm', LocalizedText> = {
    cool: { en: 'Cool', pt: 'Frio', es: 'Frío' },
    neutral: { en: 'Neutral', pt: 'Neutro', es: 'Neutro' },
    warm: { en: 'Warm', pt: 'Quente', es: 'Cálido' },
  };
  return inferredLabels[inferred][locale];
}
