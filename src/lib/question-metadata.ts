import type { LocalizedText } from '@/types/quiz';

export type QuizPhase = 1 | 2 | 3;

export const questionSubtitles: Record<string, LocalizedText> = {
  gender: {
    en: 'Hormones have a big impact on how our skin looks and feels at every age.',
    pt: 'Hormônios têm grande impacto em como nossa pele parece e se sente em cada idade.',
    es: 'Las hormonas tienen un gran impacto en cómo se ve y se siente nuestra piel a cada edad.',
  },
  age: {
    en: 'At different ages, your skin needs different skincare products.',
    pt: 'Em diferentes idades, sua pele precisa de produtos de skincare diferentes.',
    es: 'A diferentes edades, tu piel necesita productos de skincare distintos.',
  },
  'skin-concerns': {
    en: 'KOR Labs will create a treatment skincare program based on your answers.',
    pt: 'A KOR Labs criará um programa de tratamento com base nas suas respostas.',
    es: 'KOR Labs creará un programa de tratamiento según tus respuestas.',
  },
  'skin-type': {
    en: 'Understanding your skin type helps us personalise your plan.',
    pt: 'Entender seu tipo de pele nos ajuda a personalizar seu plano.',
    es: 'Entender tu tipo de piel nos ayuda a personalizar tu plan.',
  },
  'face-areas': {
    en: 'Select all areas you would like to improve.',
    pt: 'Selecione todas as áreas que gostaria de melhorar.',
    es: 'Selecciona todas las áreas que te gustaría mejorar.',
  },
  'skin-tone': {
    en: 'This helps us personalize SPF and skincare recommendations',
    pt: 'Isso nos ajuda a personalizar recomendações de FPS e skincare',
    es: 'Esto nos ayuda a personalizar recomendaciones de FPS y skincare',
  },
  undertone: {
    en: 'This helps us understand how your skin behaves and what it needs',
    pt: 'Isso nos ajuda a entender como sua pele se comporta e o que ela precisa',
    es: 'Esto nos ayuda a entender cómo se comporta tu piel y qué necesita',
  },
  'has-routine': {
    en: 'Consistency is key to visible results.',
    pt: 'Consistência é fundamental para resultados visíveis.',
    es: 'La consistencia es clave para resultados visibles.',
  },
  'products-used': {
    en: 'Select all products you currently use.',
    pt: 'Selecione todos os produtos que você usa atualmente.',
    es: 'Selecciona todos los productos que usas actualmente.',
  },
  'sunscreen-usage': {
    en: 'Sun protection is essential for healthy skin.',
    pt: 'Proteção solar é essencial para uma pele saudável.',
    es: 'La protección solar es esencial para una piel sana.',
  },
};

export function getPhaseForSection(section: number): QuizPhase {
  if (section <= 4) return 1;
  if (section <= 8) return 2;
  return 3;
}
