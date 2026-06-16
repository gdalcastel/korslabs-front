import {
  getSkinToneMeta,
  getUndertoneMeta,
  resolveProfileUndertone,
  toneBadgeLabel,
  undertoneBadgeLabel,
} from '@/lib/skin-tone-data';
import type { Locale, LocalizedText, QuizAnswers } from '@/types/quiz';

type ConcernKey = 'pigmentation' | 'acne' | 'redness' | 'wrinkles' | 'dullness' | 'pores';
type UndertoneKey = 'cool' | 'neutral' | 'warm';

export interface SkinInsightBullet {
  emoji: string;
  text: LocalizedText;
}

export interface SkinInsightContent {
  concernKey: ConcernKey;
  highlight: LocalizedText;
  titlePrefix: LocalizedText;
  description: LocalizedText;
  bullets: SkinInsightBullet[];
  footer: LocalizedText;
  toneLabel: string;
  undertoneLabel: string;
  toneHex: string;
  undertoneHex: string;
}

const CONCERN_PRIORITY: ConcernKey[] = ['pigmentation', 'acne', 'redness', 'wrinkles', 'dullness', 'pores'];

const concernHighlights: Record<ConcernKey, LocalizedText> = {
  pigmentation: { en: 'pigmentation', pt: 'pigmentação', es: 'pigmentación' },
  acne: { en: 'breakouts', pt: 'espinhas', es: 'brotes' },
  redness: { en: 'redness', pt: 'vermelhidão', es: 'enrojecimiento' },
  wrinkles: { en: 'early ageing', pt: 'envelhecimento precoce', es: 'envejecimiento precoz' },
  dullness: { en: 'dullness', pt: 'opacidade', es: 'opacidad' },
  pores: { en: 'visible pores', pt: 'poros visíveis', es: 'poros visibles' },
};

const titlePrefix: LocalizedText = {
  en: 'Your skin may be more susceptible to',
  pt: 'Sua pele pode ser mais suscetível a',
  es: 'Tu piel puede ser más susceptible a',
};

const undertoneDescriptions: Record<ConcernKey, Record<UndertoneKey, LocalizedText>> = {
  pigmentation: {
    warm: {
      en: 'Warm undertones are more influenced by UV exposure and can develop uneven tone.',
      pt: 'Subtons quentes são mais influenciados pela exposição ao UV e podem desenvolver tom irregular.',
      es: 'Los subtonos cálidos se ven más influenciados por la exposición UV y pueden desarrollar tono irregular.',
    },
    cool: {
      en: 'Cool undertones can show sun spots and post-inflammatory marks more visibly.',
      pt: 'Subtons frios podem exibir manchas solares e marcas pós-inflamatórias com mais visibilidade.',
      es: 'Los subtonos fríos pueden mostrar manchas solares y marcas postinflamatorias con más visibilidad.',
    },
    neutral: {
      en: 'Neutral undertones still need consistent protection to prevent uneven pigmentation.',
      pt: 'Subtons neutros ainda precisam de proteção consistente para prevenir pigmentação irregular.',
      es: 'Los subtonos neutros aún necesitan protección constante para prevenir pigmentación irregular.',
    },
  },
  acne: {
    warm: {
      en: 'Warm, oil-prone skin can trap bacteria more easily and lead to recurring breakouts.',
      pt: 'Pele quente e oleosa pode reter bactérias com mais facilidade e causar espinhas recorrentes.',
      es: 'La piel cálida y propensa a la grasa puede retener bacterias con más facilidad y causar brotes recurrentes.',
    },
    cool: {
      en: 'Cool-toned skin may react to harsh treatments with inflammation and post-acne marks.',
      pt: 'Pele de subtom frio pode reagir a tratamentos agressivos com inflamação e marcas pós-acne.',
      es: 'La piel de subtono frío puede reaccionar a tratamientos agresivos con inflamación y marcas post-acné.',
    },
    neutral: {
      en: 'Balanced undertones benefit from gentle, consistent care to keep breakouts under control.',
      pt: 'Subtons equilibrados se beneficiam de cuidados suaves e consistentes para controlar espinhas.',
      es: 'Los subtonos equilibrados se benefician de cuidados suaves y constantes para controlar brotes.',
    },
  },
  redness: {
    warm: {
      en: 'Warm skin can flush easily with heat, stress and reactive ingredients.',
      pt: 'Pele quente pode ruborizar facilmente com calor, estresse e ingredientes reativos.',
      es: 'La piel cálida puede enrojecerse fácilmente con calor, estrés e ingredientes reactivos.',
    },
    cool: {
      en: 'Cool undertones often show redness and sensitivity more prominently on the cheeks and nose.',
      pt: 'Subtons frios frequentemente exibem vermelhidão e sensibilidade nas bochechas e nariz.',
      es: 'Los subtonos fríos a menudo muestran enrojecimiento y sensibilidad en mejillas y nariz.',
    },
    neutral: {
      en: 'Even neutral skin can become reactive without barrier-supporting care.',
      pt: 'Mesmo pele neutra pode ficar reativa sem cuidados que fortaleçam a barreira.',
      es: 'Incluso la piel neutra puede volverse reactiva sin cuidados que fortalezcan la barrera.',
    },
  },
  wrinkles: {
    warm: {
      en: 'Sun exposure accelerates fine lines on warm-toned skin that lacks daily SPF.',
      pt: 'A exposição solar acelera linhas finas em pele de subtom quente sem FPS diário.',
      es: 'La exposición solar acelera las líneas finas en piel de subtono cálido sin FPS diario.',
    },
    cool: {
      en: 'Cool-toned skin may show dehydration lines earlier when the barrier is compromised.',
      pt: 'Pele de subtom frio pode exibir linhas de desidratação cedo quando a barreira está comprometida.',
      es: 'La piel de subtono frío puede mostrar líneas de deshidratación temprano cuando la barrera está comprometida.',
    },
    neutral: {
      en: 'Preventive care makes a meaningful difference before early lines become deeper.',
      pt: 'Cuidados preventivos fazem diferença significativa antes que linhas precoces se aprofundem.',
      es: 'El cuidado preventivo marca una diferencia significativa antes de que las líneas tempranas se profundicen.',
    },
  },
  dullness: {
    warm: {
      en: 'Warm skin can look tired when dead cells build up and antioxidant levels drop.',
      pt: 'Pele quente pode parecer cansada quando células mortas se acumulam e antioxidantes caem.',
      es: 'La piel cálida puede verse cansada cuando se acumulan células muertas y bajan los antioxidantes.',
    },
    cool: {
      en: 'Cool undertones may appear ashy or flat without regular exfoliation and hydration.',
      pt: 'Subtons frios podem parecer opacos sem esfoliação e hidratação regulares.',
      es: 'Los subtonos fríos pueden verse apagados sin exfoliación e hidratación regulares.',
    },
    neutral: {
      en: 'Dullness often signals that your routine needs brighter, barrier-friendly actives.',
      pt: 'Opacidade frequentemente indica que sua rotina precisa de ativos iluminadores e gentis.',
      es: 'La opacidad a menudo indica que tu rutina necesita activos iluminadores y suaves.',
    },
  },
  pores: {
    warm: {
      en: 'Warm, combination skin often produces more sebum around the T-zone, stretching pores.',
      pt: 'Pele quente mista frequentemente produz mais sebo na zona T, dilatando poros.',
      es: 'La piel cálida mixta a menudo produce más sebo en la zona T, dilatando los poros.',
    },
    cool: {
      en: 'Cool-toned skin can still show enlarged pores when oil and debris accumulate.',
      pt: 'Pele de subtom frio ainda pode exibir poros dilatados quando oleosidade e impurezas se acumulam.',
      es: 'La piel de subtono frío aún puede mostrar poros dilatados cuando se acumulan grasa e impurezas.',
    },
    neutral: {
      en: 'Consistent cleansing and targeted treatments help refine pore appearance over time.',
      pt: 'Limpeza consistente e tratamentos direcionados ajudam a refinar poros com o tempo.',
      es: 'La limpieza constante y tratamientos específicos ayudan a refinar los poros con el tiempo.',
    },
  },
};

const concernBullets: Record<ConcernKey, SkinInsightBullet[]> = {
  pigmentation: [
    {
      emoji: '🪶',
      text: {
        en: 'Pigmentation sensitivity',
        pt: 'Sensibilidade à pigmentação',
        es: 'Sensibilidad a la pigmentación',
      },
    },
    {
      emoji: '😔',
      text: { en: 'Post-acne marks', pt: 'Marcas pós-acne', es: 'Marcas post-acné' },
    },
    {
      emoji: '☀️',
      text: { en: 'UV exposure impact', pt: 'Impacto da exposição ao UV', es: 'Impacto de la exposición UV' },
    },
  ],
  acne: [
    {
      emoji: '😔',
      text: { en: 'Recurring breakouts', pt: 'Espinhas recorrentes', es: 'Brotes recurrentes' },
    },
    {
      emoji: '🧴',
      text: { en: 'Clogged pores', pt: 'Poros obstruídos', es: 'Poros obstruidos' },
    },
    {
      emoji: '⚖️',
      text: { en: 'Oil imbalance', pt: 'Desequilíbrio de oleosidade', es: 'Desequilibrio de grasa' },
    },
  ],
  redness: [
    {
      emoji: '🌡️',
      text: { en: 'Heat-triggered flushing', pt: 'Rubor provocado por calor', es: 'Enrojecimiento por calor' },
    },
    {
      emoji: '🧪',
      text: { en: 'Ingredient sensitivity', pt: 'Sensibilidade a ingredientes', es: 'Sensibilidad a ingredientes' },
    },
    {
      emoji: '🛡️',
      text: { en: 'Weakened skin barrier', pt: 'Barreira cutânea enfraquecida', es: 'Barrera cutánea debilitada' },
    },
  ],
  wrinkles: [
    {
      emoji: '☀️',
      text: { en: 'Sun-related ageing', pt: 'Envelhecimento solar', es: 'Envejecimiento solar' },
    },
    {
      emoji: '💧',
      text: { en: 'Dehydration lines', pt: 'Linhas de desidratação', es: 'Líneas de deshidratación' },
    },
    {
      emoji: '⏳',
      text: { en: 'Loss of firmness', pt: 'Perda de firmeza', es: 'Pérdida de firmeza' },
    },
  ],
  dullness: [
    {
      emoji: '😴',
      text: { en: 'Tired-looking skin', pt: 'Pele com aspecto cansado', es: 'Piel con aspecto cansado' },
    },
    {
      emoji: '✨',
      text: { en: 'Uneven radiance', pt: 'Radiância irregular', es: 'Radiancia irregular' },
    },
    {
      emoji: '🧬',
      text: { en: 'Slow cell turnover', pt: 'Renovação celular lenta', es: 'Renovación celular lenta' },
    },
  ],
  pores: [
    {
      emoji: '🔍',
      text: { en: 'Visible pore texture', pt: 'Textura de poros visível', es: 'Textura de poros visible' },
    },
    {
      emoji: '💧',
      text: { en: 'Excess sebum', pt: 'Excesso de sebo', es: 'Exceso de sebo' },
    },
    {
      emoji: '🧴',
      text: { en: 'Congestion buildup', pt: 'Acúmulo de impurezas', es: 'Acumulación de impurezas' },
    },
  ],
};

const concernFooters: Record<ConcernKey, LocalizedText> = {
  pigmentation: {
    en: "We'll personalize brightening, antioxidant and sun protection strategies to help your skin stay even and healthy.",
    pt: 'Personalizaremos estratégias de clareamento, antioxidantes e proteção solar para manter sua pele uniforme e saudável.',
    es: 'Personalizaremos estrategias de aclarado, antioxidantes y protección solar para mantener tu piel uniforme y saludable.',
  },
  acne: {
    en: "We'll build a balanced routine with clarifying and barrier-repair steps to reduce breakouts gently.",
    pt: 'Criaremos uma rotina equilibrada com passos clarificantes e reparadores da barreira para reduzir espinhas suavemente.',
    es: 'Crearemos una rutina equilibrada con pasos clarificantes y reparadores de la barrera para reducir brotes suavemente.',
  },
  redness: {
    en: "We'll focus on calming, barrier-strengthening ingredients to reduce reactivity over time.",
    pt: 'Focaremos em ingredientes calmantes e fortalecedores da barreira para reduzir a reatividade com o tempo.',
    es: 'Nos enfocaremos en ingredientes calmantes y fortalecedores de la barrera para reducir la reactividad con el tiempo.',
  },
  wrinkles: {
    en: "We'll combine hydration, antioxidants and preventive treatments to support firmer, smoother skin.",
    pt: 'Combinaremos hidratação, antioxidantes e tratamentos preventivos para apoiar uma pele mais firme e lisa.',
    es: 'Combinaremos hidratación, antioxidantes y tratamientos preventivos para apoyar una piel más firme y lisa.',
  },
  dullness: {
    en: "We'll tailor brightening and renewal steps to restore a fresh, luminous complexion.",
    pt: 'Adaptaremos passos de iluminação e renovação para restaurar uma tez fresca e luminosa.',
    es: 'Adaptaremos pasos de iluminación y renovación para restaurar una tez fresca y luminosa.',
  },
  pores: {
    en: "We'll refine your routine with pore-clearing and oil-balancing care without over-drying.",
    pt: 'Refinaremos sua rotina com cuidados desobstrutivos e equilibradores de oleosidade sem ressecar.',
    es: 'Refinaremos tu rutina con cuidados desobstructivos y equilibradores de grasa sin resecar.',
  },
};

function pickPrimaryConcern(concerns: string[]): ConcernKey {
  for (const concern of CONCERN_PRIORITY) {
    if (concerns.includes(concern)) return concern;
  }
  return 'pigmentation';
}

export function getSkinInsight(answers: QuizAnswers, locale: Locale): SkinInsightContent {
  const concerns = (answers['skin-concerns'] as string[]) ?? [];
  const concernKey = pickPrimaryConcern(concerns);
  const toneId = answers['skin-tone'] as string | undefined;
  const undertoneId = answers.undertone as string | undefined;
  const undertone = resolveProfileUndertone(undertoneId, toneId);

  const toneMeta = getSkinToneMeta(toneId);
  const undertoneMeta =
    undertoneId && undertoneId !== 'not-sure'
      ? getUndertoneMeta(undertoneId)
      : getUndertoneMeta(undertone);

  return {
    concernKey,
    highlight: concernHighlights[concernKey],
    titlePrefix,
    description: undertoneDescriptions[concernKey][undertone],
    bullets: concernBullets[concernKey],
    footer: concernFooters[concernKey],
    toneLabel: toneBadgeLabel(locale, toneId),
    undertoneLabel: undertoneBadgeLabel(locale, undertoneId, toneId),
    toneHex: 'hex' in toneMeta ? toneMeta.hex : '#D4A574',
    undertoneHex: 'hex' in undertoneMeta ? undertoneMeta.hex : '#E8A65B',
  };
}

export const skinInsightSectionTitle: LocalizedText = {
  en: 'What this means for your skin:',
  pt: 'O que isso significa para sua pele:',
  es: 'Qué significa esto para tu piel:',
};

export const skinInsightToneBadge: LocalizedText = {
  en: 'Tone',
  pt: 'Tom',
  es: 'Tono',
};

export const skinInsightUndertoneBadge: LocalizedText = {
  en: 'Undertone',
  pt: 'Subtom',
  es: 'Subtono',
};
