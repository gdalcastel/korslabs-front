import { quizSteps } from '@/data/quiz-steps';
import { t } from '@/lib/i18n';
import type { Locale, LocalizedText, QuizAnswers } from '@/types/quiz';

export interface ProfileDisplayRow {
  label: LocalizedText;
  value: string;
}

const rowDefinitions: Array<{ questionId: string; label: LocalizedText }> = [
  {
    questionId: 'sleep',
    label: { en: 'Sleep', pt: 'Sono', es: 'Sueño' },
  },
  {
    questionId: 'stress',
    label: { en: 'Stress', pt: 'Estresse', es: 'Estrés' },
  },
  {
    questionId: 'water-intake',
    label: { en: 'Water intake', pt: 'Consumo de água', es: 'Consumo de agua' },
  },
  {
    questionId: 'has-routine',
    label: {
      en: 'Daily skincare routine',
      pt: 'Rotina diária de skincare',
      es: 'Rutina diaria de skincare',
    },
  },
  {
    questionId: 'hydration',
    label: {
      en: 'Skin well moisturized',
      pt: 'Pele bem hidratada',
      es: 'Piel bien hidratada',
    },
  },
  {
    questionId: 'sunscreen-usage',
    label: {
      en: 'Sunscreen outdoors',
      pt: 'Protetor solar ao ar livre',
      es: 'Protector solar al aire libre',
    },
  },
];

function findOptionLabel(questionId: string, optionId: string, locale: Locale): string | null {
  for (const step of quizSteps) {
    const questions = step.questions ?? (step.question ? [step.question] : []);
    for (const question of questions) {
      if (question.id !== questionId) continue;
      const option = question.options.find((item) => item.id === optionId);
      if (option) return t(option.label, locale);
    }
  }
  return null;
}

export function getProfileDisplayRows(answers: QuizAnswers, locale: Locale): ProfileDisplayRow[] {
  return rowDefinitions
    .map(({ questionId, label }) => {
      const raw = answers[questionId];
      if (typeof raw !== 'string' || !raw) return null;
      const value = findOptionLabel(questionId, raw, locale);
      if (!value) return null;
      return { label, value };
    })
    .filter((row): row is ProfileDisplayRow => row !== null);
}

export type ProfileStatusZone = 'low' | 'mid' | 'high';

export function getProfileStatusZone(score: number): ProfileStatusZone {
  if (score < 40) return 'low';
  if (score < 70) return 'mid';
  return 'high';
}

export function getStatusCardTheme(skinTypeEn: string): {
  background: string;
  iconStroke: string;
} {
  if (skinTypeEn.includes('Balanced')) {
    return { background: '#B8E986', iconStroke: '#7CB342' };
  }
  if (skinTypeEn.includes('Stressed')) {
    return { background: '#FFD180', iconStroke: '#FF9800' };
  }
  if (skinTypeEn.includes('Reactive')) {
    return { background: '#FFE082', iconStroke: '#FFC107' };
  }
  return { background: '#FFED50', iconStroke: '#FFED50' };
}
