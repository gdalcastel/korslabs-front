import type { QuizAnswers, SkincarePlan, SkinProfile } from '@/types/quiz';
import { getSkinToneMeta, legacyToneMap, resolveProfileUndertone } from '@/lib/skin-tone-data';

const toneMap: Record<string, { label: string; undertone: 'cool' | 'neutral' | 'warm' }> = {
  'very-fair': { label: 'very-fair', undertone: 'cool' },
  fair: { label: 'fair', undertone: 'cool' },
  medium: { label: 'medium', undertone: 'neutral' },
  brown: { label: 'brown', undertone: 'warm' },
  'deep-brown': { label: 'deep-brown', undertone: 'warm' },
  other: { label: 'medium', undertone: 'neutral' },
  light: { label: 'medium', undertone: 'neutral' },
  tan: { label: 'brown', undertone: 'warm' },
  deep: { label: 'deep-brown', undertone: 'warm' },
};

const toneLabels = {
  'very-fair': { en: 'Very Fair', pt: 'Muito Clara', es: 'Muy Clara' },
  fair: { en: 'Fair', pt: 'Clara', es: 'Clara' },
  medium: { en: 'Medium', pt: 'Média', es: 'Media' },
  brown: { en: 'Brown', pt: 'Morena', es: 'Morena' },
  'deep-brown': { en: 'Deep Brown', pt: 'Morena Escura', es: 'Morena Oscura' },
  other: { en: 'Other', pt: 'Outro', es: 'Otro' },
  light: { en: 'Medium', pt: 'Média', es: 'Media' },
  tan: { en: 'Brown', pt: 'Morena', es: 'Morena' },
  deep: { en: 'Deep Brown', pt: 'Morena Escura', es: 'Morena Oscura' },
};

const undertoneLabels = {
  cool: { en: 'Cool', pt: 'Frio', es: 'Frío' },
  neutral: { en: 'Neutral', pt: 'Neutro', es: 'Neutro' },
  warm: { en: 'Warm', pt: 'Quente', es: 'Cálido' },
  olive: { en: 'Olive', pt: 'Oliva', es: 'Oliva' },
};

function scoreLifestyle(answers: QuizAnswers): number {
  let score = 50;
  const sleep = answers.sleep as string;
  const water = answers['water-intake'] as string;
  const stress = answers.stress as string;
  const routine = answers['has-routine'] as string;
  const skincareTime = answers['skincare-time'] as string;

  if (sleep === '7-8' || sleep === '9+') score += 10;
  else if (sleep === 'less-5') score -= 15;

  if (water === '2-3l' || water === '3l+') score += 10;
  else if (water === 'less-1l') score -= 10;

  if (stress === 'low') score += 10;
  else if (stress === 'very-high') score -= 15;
  else if (stress === 'high') score -= 8;

  if (routine === 'yes') score += 12;
  else if (routine === 'no') score -= 10;

  if (skincareTime === '10-20' || skincareTime === '20+') score += 8;
  else if (skincareTime === 'less-5') score -= 5;

  return Math.max(10, Math.min(95, score));
}

function computeProgramFit(answers: QuizAnswers): number {
  let fit = 40;
  if (answers['has-routine'] === 'yes') fit += 15;
  if (answers['sunscreen-usage'] === 'daily') fit += 15;
  if (answers['add-exosomes'] === 'yes') fit += 10;
  if (answers['korean-skincare'] === 'very' || answers['korean-skincare'] === 'somewhat') fit += 8;
  const goals = (answers['hope-improve'] as string[]) ?? [];
  fit += Math.min(goals.length * 3, 12);
  return Math.max(20, Math.min(98, fit));
}

function computeIngredientsFit(answers: QuizAnswers): number {
  let fit = 35;
  if (answers.antioxidants === 'high') fit += 12;
  if (answers['vitamin-c'] === 'daily') fit += 10;
  if (answers.retinol === 'daily' || answers.retinol === 'weekly') fit += 10;
  if (answers.acids === 'regular') fit += 12;
  if (answers.sulfates === 'avoid') fit += 8;
  return Math.max(15, Math.min(96, fit));
}

export function computeEarlyProgramFit(answers: QuizAnswers): number {
  let fit = 38;
  if (answers['skin-type']) fit += 5;
  if (answers.gender) fit += 2;
  if (answers.age) fit += 2;
  const concerns = (answers['skin-concerns'] as string[]) ?? [];
  fit += Math.min(concerns.length * 2, 10);
  return Math.max(35, Math.min(55, fit));
}

function getSkinTypeLabel(answers: QuizAnswers, score: number) {
  const sensitive = answers.sensitivity === 'very' || answers['skin-type'] === 'sensitive';
  const stress = answers.stress === 'high' || answers.stress === 'very-high';
  const routine = answers['has-routine'] !== 'yes';

  if (sensitive && (stress || routine)) {
    return {
      en: 'Vulnerable Skin',
      pt: 'Pele Vulnerável',
      es: 'Piel Vulnerable',
    };
  }
  if (score < 40) {
    return {
      en: 'Stressed Skin',
      pt: 'Pele Estressada',
      es: 'Piel Estresada',
    };
  }
  if (score >= 70) {
    return {
      en: 'Balanced Skin',
      pt: 'Pele Equilibrada',
      es: 'Piel Equilibrada',
    };
  }
  return {
    en: 'Reactive Skin',
    pt: 'Pele Reativa',
    es: 'Piel Reactiva',
  };
}

function getInterpretation(answers: QuizAnswers, score: number) {
  const routine = answers['has-routine'];
  const stress = answers.stress;

  if (routine !== 'yes' && (stress === 'high' || stress === 'very-high')) {
    return {
      en: 'Your skin shows signs of stress from inconsistent care.',
      pt: 'Sua pele mostra sinais de estresse por cuidados inconsistentes.',
      es: 'Tu piel muestra signos de estrés por cuidados inconsistentes.',
    };
  }
  if (score < 45) {
    return {
      en: 'Your lifestyle factors suggest your skin needs extra support.',
      pt: 'Seus fatores de estilo de vida indicam que sua pele precisa de suporte extra.',
      es: 'Tus factores de estilo de vida indican que tu piel necesita apoyo extra.',
    };
  }
  return {
    en: 'You have a solid foundation — we can optimise your routine further.',
    pt: 'Você tem uma boa base — podemos otimizar sua rotina ainda mais.',
    es: 'Tienes una buena base — podemos optimizar tu rutina aún más.',
  };
}

export function buildProfile(answers: QuizAnswers): SkinProfile {
  const rawToneKey = (answers['skin-tone'] as string) ?? 'medium';
  const toneKey = legacyToneMap[rawToneKey] ?? rawToneKey;
  const tone = toneMap[toneKey] ?? toneMap.medium;
  const undertone = resolveProfileUndertone(answers.undertone as string | undefined, rawToneKey);
  const lifestyleScore = scoreLifestyle(answers);
  const programFit = computeProgramFit(answers);
  const ingredientsFit = computeIngredientsFit(answers);
  const hasFaceScan = Boolean(answers['face-scan-complete']);
  const confidenceScore = hasFaceScan
    ? Math.min(96, 72 + Math.floor(lifestyleScore / 10))
    : Math.min(85, 58 + Math.floor(lifestyleScore / 12));

  return {
    skinTone: toneLabels[tone.label as keyof typeof toneLabels]?.en ?? getSkinToneMeta(rawToneKey).label.en,
    undertone,
    confidenceScore,
    skinTypeLabel: getSkinTypeLabel(answers, lifestyleScore),
    lifestyleScore,
    programFit,
    ingredientsFit,
    interpretation: getInterpretation(answers, lifestyleScore),
  };
}

export function buildPlan(answers: QuizAnswers): SkincarePlan {
  const skinType = (answers['skin-type'] as string) ?? 'combination';
  const wantsExosomes = answers['add-exosomes'] === 'yes';
  const sensitive = answers.sensitivity === 'very' || skinType === 'sensitive';
  const oily = skinType === 'oily';

  const cleanserType = oily
    ? { en: 'Gel Cleanser', pt: 'Gel de Limpeza', es: 'Gel Limpiador' }
    : { en: 'Cream Cleanser', pt: 'Limpeza Cremosa', es: 'Limpiador en Crema' };

  const serumIngredients = wantsExosomes
    ? {
        en: 'Vitamin C, Exosomes, Niacinamide',
        pt: 'Vitamina C, Exossomos, Niacinamida',
        es: 'Vitamina C, Exosomas, Niacinamida',
      }
    : {
        en: 'Vitamin C, Hyaluronic Acid, Niacinamide',
        pt: 'Vitamina C, Ácido Hialurônico, Niacinamida',
        es: 'Vitamina C, Ácido Hialurónico, Niacinamida',
      };

  const treatmentIngredients = sensitive
    ? {
        en: 'Centella, Panthenol, Peptides',
        pt: 'Centella, Pantenol, Peptídeos',
        es: 'Centella, Pantenol, Péptidos',
      }
    : {
        en: 'Retinol, Peptides, Bakuchiol',
        pt: 'Retinol, Peptídeos, Bakuchiol',
        es: 'Retinol, Péptidos, Bakuchiol',
      };

  return {
    am: [
      {
        type: cleanserType,
        ingredients: {
          en: 'Gentle surfactants, Glycerin',
          pt: 'Tensoativos suaves, Glicerina',
          es: 'Tensioactivos suaves, Glicerina',
        },
        benefits: {
          en: 'Removes impurities without stripping',
          pt: 'Remove impurezas sem ressecar',
          es: 'Elimina impurezas sin resecar',
        },
        usage: {
          en: 'Massage onto damp skin for 60 seconds, rinse',
          pt: 'Massageie na pele úmida por 60 segundos, enxágue',
          es: 'Masajea sobre piel húmeda 60 segundos, enjuaga',
        },
      },
      {
        type: { en: 'Brightening Serum', pt: 'Sérum Iluminador', es: 'Sérum Iluminador' },
        ingredients: serumIngredients,
        benefits: {
          en: 'Evens tone, boosts radiance, supports repair',
          pt: 'Uniformiza o tom, aumenta o brilho, auxilia na reparação',
          es: 'Unifica el tono, aumenta el brillo, apoya la reparación',
        },
        usage: {
          en: 'Apply 2–3 drops before moisturizer',
          pt: 'Aplique 2–3 gotas antes do hidratante',
          es: 'Aplica 2–3 gotas antes del hidratante',
        },
      },
      {
        type: { en: 'Broad-Spectrum SPF 50', pt: 'FPS 50 Espectro Amplo', es: 'FPS 50 Amplio Espectro' },
        ingredients: {
          en: 'Zinc Oxide, Antioxidants',
          pt: 'Óxido de Zinco, Antioxidantes',
          es: 'Óxido de Zinc, Antioxidantes',
        },
        benefits: {
          en: 'UV protection, prevents pigmentation',
          pt: 'Proteção UV, previne pigmentação',
          es: 'Protección UV, previene pigmentación',
        },
        usage: {
          en: 'Apply generously as last AM step',
          pt: 'Aplique generosamente como último passo da manhã',
          es: 'Aplica generosamente como último paso de la mañana',
        },
      },
    ],
    pm: [
      {
        type: cleanserType,
        ingredients: {
          en: 'Gentle surfactants, Ceramides',
          pt: 'Tensoativos suaves, Ceramidas',
          es: 'Tensioactivos suaves, Ceramidas',
        },
        benefits: {
          en: 'Cleanses and supports barrier',
          pt: 'Limpa e fortalece a barreira',
          es: 'Limpia y fortalece la barrera',
        },
        usage: {
          en: 'Double cleanse if wearing makeup',
          pt: 'Dupla limpeza se usar maquiagem',
          es: 'Doble limpieza si usas maquillaje',
        },
      },
      {
        type: { en: 'Treatment Serum', pt: 'Sérum de Tratamento', es: 'Sérum de Tratamiento' },
        ingredients: treatmentIngredients,
        benefits: {
          en: 'Targets fine lines, firms skin overnight',
          pt: 'Trata linhas finas, firma a pele durante a noite',
          es: 'Trata líneas finas, firma la piel durante la noche',
        },
        usage: {
          en: 'Apply after cleansing, before moisturizer',
          pt: 'Aplique após a limpeza, antes do hidratante',
          es: 'Aplica después de limpiar, antes del hidratante',
        },
      },
      {
        type: { en: 'Night Moisturizer', pt: 'Hidratante Noturno', es: 'Hidratante Nocturno' },
        ingredients: {
          en: 'Ceramides, Squalane, Shea Butter',
          pt: 'Ceramidas, Esqualano, Manteiga de Karité',
          es: 'Ceramidas, Escualano, Manteca de Karité',
        },
        benefits: {
          en: 'Locks in moisture, repairs barrier',
          pt: 'Retém hidratação, repara a barreira',
          es: 'Retiene hidratación, repara la barrera',
        },
        usage: {
          en: 'Apply evenly to face and neck',
          pt: 'Aplique uniformemente no rosto e pescoço',
          es: 'Aplica uniformemente en rostro y cuello',
        },
      },
      {
        type: { en: 'Eye Cream', pt: 'Creme para Olhos', es: 'Contorno de Ojos' },
        ingredients: {
          en: 'Caffeine, Peptides, Vitamin K',
          pt: 'Cafeína, Peptídeos, Vitamina K',
          es: 'Cafeína, Péptidos, Vitamina K',
        },
        benefits: {
          en: 'Reduces dark circles and puffiness',
          pt: 'Reduz olheiras e inchaço',
          es: 'Reduce ojeras e hinchazón',
        },
        usage: {
          en: 'Tap gently around orbital bone',
          pt: 'Toque suavemente ao redor do osso orbital',
          es: 'Toca suavemente alrededor del hueso orbital',
        },
      },
    ],
    weekly: [
      {
        type: { en: 'Exfoliant', pt: 'Esfoliante', es: 'Exfoliante' },
        ingredients: {
          en: 'AHA 5%, BHA 2%',
          pt: 'AHA 5%, BHA 2%',
          es: 'AHA 5%, BHA 2%',
        },
        benefits: {
          en: 'Refines texture, unclogs pores',
          pt: 'Refina textura, desobstrui poros',
          es: 'Refina textura, desobstruye poros',
        },
        usage: {
          en: 'Once per week, PM only',
          pt: 'Uma vez por semana, só à noite',
          es: 'Una vez por semana, solo por la noche',
        },
      },
      {
        type: { en: 'Hydrating Mask', pt: 'Máscara Hidratante', es: 'Mascarilla Hidratante' },
        ingredients: {
          en: 'Hyaluronic Acid, Aloe, Centella',
          pt: 'Ácido Hialurônico, Aloe, Centella',
          es: 'Ácido Hialurónico, Aloe, Centella',
        },
        benefits: {
          en: 'Deep hydration boost',
          pt: 'Boost de hidratação profunda',
          es: 'Impulso de hidratación profunda',
        },
        usage: {
          en: '1–2× per week for 15 minutes',
          pt: '1–2× por semana por 15 minutos',
          es: '1–2× por semana durante 15 minutos',
        },
      },
    ],
  };
}

export { toneLabels, undertoneLabels };
