import type { QuizStep } from '@/types/quiz';

const L = {
  gender: {
    en: 'What gender do you identify with?',
    pt: 'Com qual gênero você se identifica?',
    es: '¿Con qué género te identificas?',
  },
  age: {
    en: 'How old are you?',
    pt: 'Quantos anos você tem?',
    es: '¿Cuántos años tienes?',
  },
  concerns: {
    en: 'What are your skin concerns?',
    pt: 'Quais são suas preocupações com a pele?',
    es: '¿Cuáles son tus preocupaciones de la piel?',
  },
  skinType: {
    en: 'How would you describe your skin type?',
    pt: 'Como você descreveria seu tipo de pele?',
    es: '¿Cómo describirías tu tipo de piel?',
  },
};

export const quizSteps: QuizStep[] = [
  {
    id: 'welcome',
    section: 1,
    kind: 'welcome',
    title: {
      en: 'Intelligent facial analysis',
      pt: 'Análise facial inteligente',
      es: 'Análisis facial inteligente',
    },
    body: {
      en: 'Discover what your skin really needs.',
      pt: 'Descubra o que sua pele realmente precisa.',
      es: 'Descubre lo que tu piel realmente necesita.',
    },
    subtitle: {
      en: 'Our technology analyzes more than 15 skin parameters to create a personalized skincare routine.',
      pt: 'Nossa tecnologia analisa mais de 15 parâmetros da sua pele para criar uma rotina personalizada de skincare.',
      es: 'Nuestra tecnología analiza más de 15 parámetros de tu piel para crear una rutina personalizada de skincare.',
    },
    cta: {
      en: 'Ok, I got it',
      pt: 'Ok, entendi',
      es: 'Ok, entendido',
    },
  },
  {
    id: 'personal-info',
    section: 2,
    kind: 'questions',
    title: {
      en: 'Tell us about your skin',
      pt: 'Conte-nos sobre sua pele',
      es: 'Cuéntanos sobre tu piel',
    },
    subtitle: {
      en: 'Hormones and genetics play a key role in how your skin behaves. Understanding your type helps us personalise your plan.',
      pt: 'Hormônios e genética desempenham um papel fundamental no comportamento da sua pele. Entender seu tipo nos ajuda a personalizar seu plano.',
      es: 'Las hormonas y la genética juegan un papel clave en cómo se comporta tu piel. Entender tu tipo nos ayuda a personalizar tu plan.',
    },
    questions: [
      {
        id: 'gender',
        type: 'single',
        title: L.gender,
        options: [
          { id: 'female', label: { en: 'Female', pt: 'Feminino', es: 'Femenino' } },
          { id: 'male', label: { en: 'Male', pt: 'Masculino', es: 'Masculino' } },
          { id: 'non-binary', label: { en: 'Non-binary', pt: 'Não-binário', es: 'No binario' } },
          { id: 'prefer-not', label: { en: 'Prefer not to say', pt: 'Prefiro não dizer', es: 'Prefiero no decir' } },
        ],
      },
      {
        id: 'age',
        type: 'single',
        title: L.age,
        options: [
          { id: '18-24', label: { en: 'Under 25', pt: 'Menos de 25', es: 'Menos de 25' } },
          { id: '25-34', label: { en: '25 – 34', pt: '25 – 34', es: '25 – 34' } },
          { id: '35-44', label: { en: '35 – 44', pt: '35 – 44', es: '35 – 44' } },
          { id: '45-54', label: { en: '45 – 60', pt: '45 – 60', es: '45 – 60' } },
          { id: '55+', label: { en: 'Over 60', pt: 'Mais de 60', es: 'Más de 60' } },
        ],
      },
      {
        id: 'skin-concerns',
        type: 'multi',
        title: L.concerns,
        options: [
          { id: 'acne', label: { en: 'Acne', pt: 'Acne', es: 'Acné' } },
          { id: 'redness', label: { en: 'Redness', pt: 'Vermelhidão', es: 'Enrojecimiento' } },
          { id: 'pigmentation', label: { en: 'Pigmentation', pt: 'Pigmentação', es: 'Pigmentación' } },
          { id: 'wrinkles', label: { en: 'Wrinkles', pt: 'Rugas', es: 'Arrugas' } },
          { id: 'dullness', label: { en: 'Dullness', pt: 'Opacidade', es: 'Opacidad' } },
          { id: 'pores', label: { en: 'Large pores', pt: 'Poros dilatados', es: 'Poros grandes' } },
        ],
      },
    ],
  },
  {
    id: 'community-trust',
    section: 2,
    kind: 'trust',
    subtitle: {
      en: "You're in good hands",
      pt: 'Você está em boas mãos',
      es: 'Estás en buenas manos',
    },
    title: {
      en: "You're not alone!",
      pt: 'Você não está sozinho(a)!',
      es: '¡No estás solo(a)!',
    },
    body: {
      en: 'KOR Labs has helped 23,428 people with similar concerns',
      pt: 'A KOR Labs já ajudou 23.428 pessoas com preocupações semelhantes',
      es: 'KOR Labs ha ayudado a 23.428 personas con preocupaciones similares',
    },
    cta: {
      en: 'Next',
      pt: 'Continuar',
      es: 'Continuar',
    },
  },
  {
    id: 'skin-profile',
    section: 2,
    kind: 'questions',
    questions: [
      {
        id: 'skin-type',
        type: 'single',
        title: L.skinType,
        options: [
          { id: 'dry', label: { en: 'Dry', pt: 'Seca', es: 'Seca' } },
          { id: 'oily', label: { en: 'Oily', pt: 'Oleosa', es: 'Grasa' } },
          { id: 'combination', label: { en: 'Combination', pt: 'Mista', es: 'Mixta' } },
          { id: 'normal', label: { en: 'Normal', pt: 'Normal', es: 'Normal' } },
          { id: 'sensitive', label: { en: 'Sensitive', pt: 'Sensível', es: 'Sensible' } },
        ],
      },
    ],
  },
  {
    id: 'early-fit-preview',
    section: 2,
    kind: 'fit-preview',
    cta: {
      en: "Let's increase the fit!",
      pt: 'Vamos aumentar a adequação!',
      es: '¡Aumentemos el ajuste!',
    },
  },
  {
    id: 'face-areas',
    section: 3,
    kind: 'questions',
    questions: [
      {
        id: 'face-areas',
        type: 'multi',
        title: {
          en: 'Where on your face would you like to improve?',
          pt: 'Onde no rosto você gostaria de melhorar?',
          es: '¿Dónde en tu rostro te gustaría mejorar?',
        },
        options: [
          { id: 'whole-face', label: { en: 'Whole face', pt: 'Rosto inteiro', es: 'Rostro completo' } },
          { id: 'eyes', label: { en: 'Eyes', pt: 'Olhos', es: 'Ojos' } },
          { id: 'cheeks', label: { en: 'Cheeks', pt: 'Bochechas', es: 'Mejillas' } },
          { id: 'under-nose', label: { en: 'Under nose', pt: 'Abaixo do nariz', es: 'Bajo la nariz' } },
          { id: 'chin', label: { en: 'Chin', pt: 'Queixo', es: 'Barbilla' } },
        ],
      },
    ],
  },
  {
    id: 'skin-tone',
    section: 3,
    kind: 'questions',
    questions: [
      {
        id: 'skin-tone',
        type: 'single',
        title: {
          en: 'What is color closest to your skin tone?',
          pt: 'Qual cor se aproxima mais do seu tom de pele?',
          es: '¿Qué color se acerca más a tu tono de piel?',
        },
        subtitle: {
          en: 'This helps us personalize SPF and skincare recommendations',
          pt: 'Isso nos ajuda a personalizar recomendações de FPS e skincare',
          es: 'Esto nos ayuda a personalizar recomendaciones de FPS y skincare',
        },
        options: [
          { id: 'very-fair', label: { en: 'Very Fair', pt: 'Muito Clara', es: 'Muy Clara' }, meta: { hex: '#F5E6D8' } },
          { id: 'fair', label: { en: 'Fair', pt: 'Clara', es: 'Clara' }, meta: { hex: '#E8C9A8' } },
          { id: 'medium', label: { en: 'Medium', pt: 'Média', es: 'Media' }, meta: { hex: '#D4A574' } },
          { id: 'brown', label: { en: 'Brown', pt: 'Morena', es: 'Morena' }, meta: { hex: '#A0622E' } },
          { id: 'deep-brown', label: { en: 'Deep Brown', pt: 'Morena Escura', es: 'Morena Oscura' }, meta: { hex: '#6B3E1F' } },
          { id: 'other', label: { en: 'Other', pt: 'Outro', es: 'Otro' } },
        ],
      },
    ],
  },
  {
    id: 'undertone',
    section: 3,
    kind: 'questions',
    questions: [
      {
        id: 'undertone',
        type: 'single',
        title: {
          en: 'What is your undertone?',
          pt: 'Qual é o seu subtom?',
          es: '¿Cuál es tu subtono?',
        },
        subtitle: {
          en: 'This helps us understand how your skin behaves and what it needs',
          pt: 'Isso nos ajuda a entender como sua pele se comporta e o que ela precisa',
          es: 'Esto nos ayuda a entender cómo se comporta tu piel y qué necesita',
        },
        options: [
          { id: 'cool', label: { en: 'Cool', pt: 'Frio', es: 'Frío' }, meta: { hex: '#F0C4BC' } },
          { id: 'neutral', label: { en: 'Neutral', pt: 'Neutro', es: 'Neutro' }, meta: { hex: '#D4B896' } },
          { id: 'warm', label: { en: 'Warm', pt: 'Quente', es: 'Cálido' }, meta: { hex: '#E8A65B' } },
          { id: 'olive', label: { en: 'Olive', pt: 'Oliva', es: 'Oliva' }, meta: { hex: '#B8A86E' } },
          { id: 'not-sure', label: { en: 'Not sure', pt: 'Não tenho certeza', es: 'No estoy seguro(a)' } },
        ],
      },
    ],
  },
  {
    id: 'skin-insight',
    section: 3,
    kind: 'skin-insight',
    cta: {
      en: 'Got it',
      pt: 'Entendi',
      es: 'Entendido',
    },
  },
  {
    id: 'routine',
    section: 4,
    kind: 'questions',
    title: {
      en: 'Your current routine',
      pt: 'Sua rotina atual',
      es: 'Tu rutina actual',
    },
    questions: [
      {
        id: 'has-routine',
        type: 'single',
        title: {
          en: 'Do you have a daily skincare routine?',
          pt: 'Você tem uma rotina diária de skincare?',
          es: '¿Tienes una rutina diaria de skincare?',
        },
        options: [
          { id: 'yes', label: { en: 'Yes', pt: 'Sim', es: 'Sí' } },
          { id: 'sometimes', label: { en: 'Sometimes', pt: 'Às vezes', es: 'A veces' } },
          { id: 'no', label: { en: 'No', pt: 'Não', es: 'No' } },
        ],
      },
      {
        id: 'products-used',
        type: 'multi',
        title: {
          en: 'Which products do you currently use?',
          pt: 'Quais produtos você usa atualmente?',
          es: '¿Qué productos usas actualmente?',
        },
        options: [
          { id: 'cleanser', label: { en: 'Cleanser', pt: 'Limpeza', es: 'Limpiador' } },
          { id: 'toner', label: { en: 'Toner', pt: 'Tônico', es: 'Tónico' } },
          { id: 'serum', label: { en: 'Serum', pt: 'Sérum', es: 'Sérum' } },
          { id: 'moisturizer', label: { en: 'Moisturizer', pt: 'Hidratante', es: 'Hidratante' } },
          { id: 'sunscreen', label: { en: 'Sunscreen', pt: 'Protetor solar', es: 'Protector solar' } },
          { id: 'eye-cream', label: { en: 'Eye cream', pt: 'Creme para olhos', es: 'Contorno de ojos' } },
        ],
      },
      {
        id: 'korean-skincare',
        type: 'single',
        title: {
          en: 'Are you open to Korean skincare?',
          pt: 'Você está aberto(a) ao skincare coreano?',
          es: '¿Estás abierto(a) al skincare coreano?',
        },
        options: [
          { id: 'very', label: { en: 'Very interested', pt: 'Muito interessado(a)', es: 'Muy interesado(a)' } },
          { id: 'somewhat', label: { en: 'Somewhat', pt: 'Um pouco', es: 'Algo' } },
          { id: 'not-sure', label: { en: 'Not sure', pt: 'Não tenho certeza', es: 'No estoy seguro(a)' } },
          { id: 'no', label: { en: 'Not interested', pt: 'Não interessado(a)', es: 'No interesado(a)' } },
        ],
      },
      {
        id: 'exosomes-awareness',
        type: 'single',
        title: {
          en: 'Are you aware of advanced ingredients like exosomes?',
          pt: 'Você conhece ingredientes avançados como exossomos?',
          es: '¿Conoces ingredientes avanzados como exosomas?',
        },
        options: [
          { id: 'yes', label: { en: 'Yes', pt: 'Sim', es: 'Sí' } },
          { id: 'heard', label: { en: 'Heard of them', pt: 'Já ouvi falar', es: 'He oído hablar' } },
          { id: 'no', label: { en: 'No', pt: 'Não', es: 'No' } },
        ],
      },
      {
        id: 'add-exosomes',
        type: 'single',
        title: {
          en: 'Would you like exosomes in your plan?',
          pt: 'Gostaria de exossomos no seu plano?',
          es: '¿Te gustaría exosomas en tu plan?',
        },
        options: [
          { id: 'yes', label: { en: 'Yes, add them', pt: 'Sim, adicionar', es: 'Sí, añadir' } },
          { id: 'maybe', label: { en: 'Maybe later', pt: 'Talvez depois', es: 'Quizás después' } },
          { id: 'no', label: { en: 'No thanks', pt: 'Não, obrigado(a)', es: 'No, gracias' } },
        ],
      },
    ],
  },
  {
    id: 'exosomes-info',
    section: 4,
    kind: 'info',
    info: {
      id: 'exosomes-info',
      type: 'info',
      title: {
        en: 'What are exosomes?',
        pt: 'O que são exossomos?',
        es: '¿Qué son los exosomas?',
      },
      body: {
        en: 'Exosomes are tiny cellular messengers that promote collagen production, support deeper skin repair and improve firmness — making them a breakthrough in advanced skincare.',
        pt: 'Exossomos são pequenos mensageiros celulares que promovem a produção de colágeno, auxiliam na reparação profunda da pele e melhoram a firmeza — uma revolução no skincare avançado.',
        es: 'Los exosomas son pequeños mensajeros celulares que promueven la producción de colágeno, ayudan en la reparación profunda de la piel y mejoran la firmeza — una revolución en el skincare avanzado.',
      },
      image: 'exosomes',
    },
  },
  {
    id: 'sunscreen',
    section: 5,
    kind: 'questions',
    title: {
      en: 'Sun protection habits',
      pt: 'Hábitos de proteção solar',
      es: 'Hábitos de protección solar',
    },
    questions: [
      {
        id: 'sunscreen-usage',
        type: 'single',
        title: {
          en: 'How often do you use sunscreen?',
          pt: 'Com que frequência você usa protetor solar?',
          es: '¿Con qué frecuencia usas protector solar?',
        },
        options: [
          { id: 'daily', label: { en: 'Every day', pt: 'Todos os dias', es: 'Todos los días' } },
          { id: 'sunny', label: { en: 'Only on sunny days', pt: 'Só em dias ensolarados', es: 'Solo en días soleados' } },
          { id: 'rarely', label: { en: 'Rarely', pt: 'Raramente', es: 'Raramente' } },
          { id: 'never', label: { en: 'Never', pt: 'Nunca', es: 'Nunca' } },
        ],
      },
    ],
  },
  {
    id: 'environment',
    section: 5,
    kind: 'environment',
    title: {
      en: 'Your environment matters',
      pt: 'Seu ambiente importa',
      es: 'Tu entorno importa',
    },
    subtitle: {
      en: 'We detect your location to tailor recommendations based on UV index, humidity and pollution levels.',
      pt: 'Detectamos sua localização para personalizar recomendações com base no índice UV, umidade e poluição.',
      es: 'Detectamos tu ubicación para personalizar recomendaciones según el índice UV, humedad y contaminación.',
    },
  },
  {
    id: 'ingredients',
    section: 6,
    kind: 'questions',
    title: {
      en: 'Ingredient preferences',
      pt: 'Preferências de ingredientes',
      es: 'Preferencias de ingredientes',
    },
    questions: [
      {
        id: 'sulfates',
        type: 'single',
        title: {
          en: 'How do you feel about sulphates?',
          pt: 'O que acha de sulfatos?',
          es: '¿Qué opinas de los sulfatos?',
        },
        options: [
          { id: 'avoid', label: { en: 'Avoid', pt: 'Evitar', es: 'Evitar' } },
          { id: 'neutral', label: { en: 'Neutral', pt: 'Neutro', es: 'Neutral' } },
          { id: 'ok', label: { en: 'Fine with them', pt: 'Tudo bem', es: 'Me parecen bien' } },
        ],
      },
      {
        id: 'antioxidants',
        type: 'single',
        title: {
          en: 'Interest in antioxidants?',
          pt: 'Interesse em antioxidantes?',
          es: '¿Interés en antioxidantes?',
        },
        options: [
          { id: 'high', label: { en: 'Very interested', pt: 'Muito interessado(a)', es: 'Muy interesado(a)' } },
          { id: 'some', label: { en: 'Somewhat', pt: 'Um pouco', es: 'Algo' } },
          { id: 'low', label: { en: 'Not interested', pt: 'Não interessado(a)', es: 'No interesado(a)' } },
        ],
      },
      {
        id: 'acids',
        type: 'single',
        title: {
          en: 'Experience with AHAs/BHAs?',
          pt: 'Experiência com AHAs/BHAs?',
          es: '¿Experiencia con AHAs/BHAs?',
        },
        options: [
          { id: 'regular', label: { en: 'Use regularly', pt: 'Uso regularmente', es: 'Uso regularmente' } },
          { id: 'tried', label: { en: 'Tried before', pt: 'Já experimentei', es: 'Ya probé' } },
          { id: 'new', label: { en: 'New to acids', pt: 'Novo para mim', es: 'Nuevo para mí' } },
        ],
      },
      {
        id: 'retinol',
        type: 'single',
        title: {
          en: 'Retinol usage?',
          pt: 'Uso de retinol?',
          es: '¿Uso de retinol?',
        },
        options: [
          { id: 'daily', label: { en: 'Daily', pt: 'Diário', es: 'Diario' } },
          { id: 'weekly', label: { en: 'Weekly', pt: 'Semanal', es: 'Semanal' } },
          { id: 'never', label: { en: 'Never used', pt: 'Nunca usei', es: 'Nunca usé' } },
        ],
      },
      {
        id: 'vitamin-c',
        type: 'single',
        title: {
          en: 'Vitamin C usage?',
          pt: 'Uso de vitamina C?',
          es: '¿Uso de vitamina C?',
        },
        options: [
          { id: 'daily', label: { en: 'Daily', pt: 'Diário', es: 'Diario' } },
          { id: 'sometimes', label: { en: 'Sometimes', pt: 'Às vezes', es: 'A veces' } },
          { id: 'never', label: { en: 'Never', pt: 'Nunca', es: 'Nunca' } },
        ],
      },
    ],
  },
  {
    id: 'fit-comparison',
    section: 6,
    kind: 'fit-comparison',
    title: {
      en: 'Program Fit vs Ingredients Fit',
      pt: 'Adequação do Programa vs Ingredientes',
      es: 'Ajuste del Programa vs Ingredientes',
    },
    subtitle: {
      en: 'See how well your current selections match the KOR Labs program.',
      pt: 'Veja o quão bem suas seleções atuais combinam com o programa KOR Labs.',
      es: 'Mira qué tan bien tus selecciones actuales coinciden con el programa KOR Labs.',
    },
  },
  {
    id: 'lifestyle',
    section: 7,
    kind: 'questions',
    title: {
      en: 'Lifestyle factors',
      pt: 'Fatores de estilo de vida',
      es: 'Factores de estilo de vida',
    },
    questions: [
      {
        id: 'daily-concerns',
        type: 'multi',
        title: {
          en: 'What concerns you most?',
          pt: 'O que mais te preocupa?',
          es: '¿Qué te preocupa más?',
        },
        options: [
          { id: 'dryness', label: { en: 'Dryness', pt: 'Ressecamento', es: 'Sequedad' } },
          { id: 'oiliness', label: { en: 'Oiliness', pt: 'Oleosidade', es: 'Grasa' } },
          { id: 'double-chin', label: { en: 'Double chin', pt: 'Papada', es: 'Papada' } },
          { id: 'dark-circles', label: { en: 'Dark circles', pt: 'Olheiras', es: 'Ojeras' } },
          { id: 'sagging', label: { en: 'Sagging', pt: 'Flacidez', es: 'Flacidez' } },
        ],
      },
      {
        id: 'hydration',
        type: 'single',
        title: {
          en: 'How hydrated does your skin feel?',
          pt: 'Quão hidratada sua pele parece?',
          es: '¿Qué tan hidratada se siente tu piel?',
        },
        options: [
          { id: 'very-dry', label: { en: 'Very dry', pt: 'Muito seca', es: 'Muy seca' } },
          { id: 'dry', label: { en: 'Dry', pt: 'Seca', es: 'Seca' } },
          { id: 'balanced', label: { en: 'Balanced', pt: 'Equilibrada', es: 'Equilibrada' } },
          { id: 'oily', label: { en: 'Oily', pt: 'Oleosa', es: 'Grasa' } },
        ],
      },
      {
        id: 'daytime-bothers',
        type: 'multi',
        title: {
          en: 'What bothers your skin during the day?',
          pt: 'O que incomoda sua pele durante o dia?',
          es: '¿Qué molesta tu piel durante el día?',
        },
        options: [
          { id: 'tightness', label: { en: 'Tightness', pt: 'Repuxamento', es: 'Tirantez' } },
          { id: 'shine', label: { en: 'Shine', pt: 'Brilho', es: 'Brillo' } },
          { id: 'itching', label: { en: 'Itching', pt: 'Coceira', es: 'Picazón' } },
          { id: 'breakouts', label: { en: 'Breakouts', pt: 'Espinhas', es: 'Brotes' } },
        ],
      },
      {
        id: 'sensitivity',
        type: 'single',
        title: {
          en: 'Is your skin sensitive?',
          pt: 'Sua pele é sensível?',
          es: '¿Tu piel es sensible?',
        },
        options: [
          { id: 'very', label: { en: 'Very sensitive', pt: 'Muito sensível', es: 'Muy sensible' } },
          { id: 'somewhat', label: { en: 'Somewhat', pt: 'Um pouco', es: 'Algo' } },
          { id: 'not', label: { en: 'Not sensitive', pt: 'Não sensível', es: 'No sensible' } },
        ],
      },
      {
        id: 'sleep',
        type: 'single',
        title: {
          en: 'How many hours do you sleep?',
          pt: 'Quantas horas você dorme?',
          es: '¿Cuántas horas duermes?',
        },
        options: [
          { id: 'less-5', label: { en: '< 5 hours', pt: '< 5 horas', es: '< 5 horas' } },
          { id: '5-6', label: { en: '5–6 hours', pt: '5–6 horas', es: '5–6 horas' } },
          { id: '7-8', label: { en: '7–8 hours', pt: '7–8 horas', es: '7–8 horas' } },
          { id: '9+', label: { en: '9+ hours', pt: '9+ horas', es: '9+' } },
        ],
      },
      {
        id: 'water-intake',
        type: 'single',
        title: {
          en: 'Daily water intake?',
          pt: 'Consumo diário de água?',
          es: '¿Consumo diario de agua?',
        },
        options: [
          { id: 'less-1l', label: { en: '< 1L', pt: '< 1L', es: '< 1L' } },
          { id: '1-2l', label: { en: '1–2L', pt: '1–2L', es: '1–2L' } },
          { id: '2-3l', label: { en: '2–3L', pt: '2–3L', es: '2–3L' } },
          { id: '3l+', label: { en: '3L+', pt: '3L+', es: '3L+' } },
        ],
      },
      {
        id: 'stress',
        type: 'single',
        title: {
          en: 'Stress level?',
          pt: 'Nível de estresse?',
          es: '¿Nivel de estrés?',
        },
        options: [
          { id: 'low', label: { en: 'Low', pt: 'Baixo', es: 'Bajo' } },
          { id: 'moderate', label: { en: 'Moderate', pt: 'Moderado', es: 'Moderado' } },
          { id: 'high', label: { en: 'High', pt: 'Alto', es: 'Alto' } },
          { id: 'very-high', label: { en: 'Very high', pt: 'Muito alto', es: 'Muy alto' } },
        ],
      },
      {
        id: 'skincare-time',
        type: 'single',
        title: {
          en: 'Time spent on skincare daily?',
          pt: 'Tempo gasto com skincare por dia?',
          es: '¿Tiempo dedicado al skincare al día?',
        },
        options: [
          { id: 'less-5', label: { en: '< 5 min', pt: '< 5 min', es: '< 5 min' } },
          { id: '5-10', label: { en: '5–10 min', pt: '5–10 min', es: '5–10 min' } },
          { id: '10-20', label: { en: '10–20 min', pt: '10–20 min', es: '10–20 min' } },
          { id: '20+', label: { en: '20+ min', pt: '20+ min', es: '20+ min' } },
        ],
      },
    ],
  },
  {
    id: 'harvard-info',
    section: 7,
    kind: 'info',
    info: {
      id: 'harvard-info',
      type: 'info',
      title: {
        en: 'Consistency matters',
        pt: 'Consistência importa',
        es: 'La consistencia importa',
      },
      body: {
        en: 'Research from Harvard Medical School shows that consistent skincare routines improve skin health by 2.2× compared with sporadic care.',
        pt: 'Pesquisas da Harvard Medical School mostram que rotinas consistentes de skincare melhoram a saúde da pele em 2,2× comparado ao cuidado esporádico.',
        es: 'Investigaciones de Harvard Medical School muestran que las rutinas consistentes de skincare mejoran la salud de la piel 2,2× comparado con el cuidado esporádico.',
      },
      highlight: {
        en: '2.2× better results with consistency',
        pt: '2,2× melhores resultados com consistência',
        es: '2,2× mejores resultados con consistencia',
      },
      image: 'harvard',
    },
  },
  {
    id: 'profile-summary',
    section: 8,
    kind: 'profile-summary',
    title: {
      en: 'Your profile is ready',
      pt: 'Seu perfil está pronto',
      es: 'Tu perfil está listo',
    },
  },
  {
    id: 'goals',
    section: 9,
    kind: 'questions',
    title: {
      en: 'Goals & motivations',
      pt: 'Objetivos e motivações',
      es: 'Objetivos y motivaciones',
    },
    questions: [
      {
        id: 'hope-improve',
        type: 'multi',
        title: {
          en: 'What do you hope KOR Labs will help improve?',
          pt: 'O que você espera que a KOR Labs ajude a melhorar?',
          es: '¿Qué esperas que KOR Labs te ayude a mejorar?',
        },
        options: [
          { id: 'knowledge', label: { en: 'Knowledge', pt: 'Conhecimento', es: 'Conocimiento' } },
          { id: 'consistency', label: { en: 'Consistency', pt: 'Consistência', es: 'Consistencia' } },
          { id: 'skin-health', label: { en: 'Skin health', pt: 'Saúde da pele', es: 'Salud de la piel' } },
          { id: 'self-care', label: { en: 'Self-care', pt: 'Autocuidado', es: 'Autocuidado' } },
          { id: 'confidence', label: { en: 'Confidence', pt: 'Confiança', es: 'Confianza' } },
        ],
      },
      {
        id: 'feel-great-skin',
        type: 'multi',
        title: {
          en: 'How would you like to feel with great skin?',
          pt: 'Como gostaria de se sentir com uma pele incrível?',
          es: '¿Cómo te gustaría sentirte con una piel increíble?',
        },
        options: [
          { id: 'makeup-free', label: { en: 'Make-up free', pt: 'Sem maquiagem', es: 'Sin maquillaje' } },
          { id: 'confident-events', label: { en: 'Confident at events', pt: 'Confiante em eventos', es: 'Seguro(a) en eventos' } },
          { id: 'attractive-photos', label: { en: 'Attractive in photos', pt: 'Atraente em fotos', es: 'Atractivo(a) en fotos' } },
          { id: 'compliments', label: { en: 'Enjoy compliments', pt: 'Receber elogios', es: 'Recibir cumplidos' } },
          { id: 'selfies', label: { en: 'Take selfies', pt: 'Tirar selfies', es: 'Tomar selfies' } },
        ],
      },
      {
        id: 'journey-feel',
        type: 'multi',
        title: {
          en: 'What do you want to feel during the journey?',
          pt: 'O que quer sentir durante a jornada?',
          es: '¿Qué quieres sentir durante el viaje?',
        },
        options: [
          { id: 'better-choices', label: { en: 'Better choices', pt: 'Melhores escolhas', es: 'Mejores decisiones' } },
          { id: 'relaxed', label: { en: 'Relaxed', pt: 'Relaxado(a)', es: 'Relajado(a)' } },
          { id: 'in-control', label: { en: 'In control', pt: 'No controle', es: 'En control' } },
          { id: 'confident', label: { en: 'Confident', pt: 'Confiante', es: 'Seguro(a)' } },
          { id: 'radiant', label: { en: 'Radiant', pt: 'Radiante', es: 'Radiante' } },
        ],
      },
      {
        id: 'achieve',
        type: 'multi',
        title: {
          en: 'What would you like to achieve?',
          pt: 'O que gostaria de alcançar?',
          es: '¿Qué te gustaría lograr?',
        },
        options: [
          { id: 'reduce-acne', label: { en: 'Reduce acne/redness', pt: 'Reduzir acne/vermelhidão', es: 'Reducir acné/enrojecimiento' } },
          { id: 'best-routine', label: { en: 'Find best routine', pt: 'Encontrar melhor rotina', es: 'Encontrar mejor rutina' } },
          { id: 'learn-ingredients', label: { en: 'Learn ingredients', pt: 'Aprender ingredientes', es: 'Aprender ingredientes' } },
          { id: 'save-money', label: { en: 'Save money', pt: 'Economizar', es: 'Ahorrar dinero' } },
          { id: 'prevent-ageing', label: { en: 'Prevent early ageing', pt: 'Prevenir envelhecimento', es: 'Prevenir envejecimiento' } },
        ],
      },
    ],
  },
  {
    id: 'purchasing',
    section: 10,
    kind: 'questions',
    title: {
      en: 'Purchasing attitudes',
      pt: 'Atitudes de compra',
      es: 'Actitudes de compra',
    },
    subtitle: {
      en: 'Rate each statement from 1 (Strongly disagree) to 5 (Strongly agree).',
      pt: 'Avalie cada afirmação de 1 (Discordo totalmente) a 5 (Concordo totalmente).',
      es: 'Califica cada afirmación del 1 (Totalmente en desacuerdo) al 5 (Totalmente de acuerdo).',
    },
    questions: [
      {
        id: 'price-conscious',
        type: 'likert',
        title: {
          en: 'I often consider the price of skincare products',
          pt: 'Frequentemente considero o preço dos produtos de skincare',
          es: 'A menudo considero el precio de los productos de skincare',
        },
        options: [],
      },
      {
        id: 'brand-loyalty',
        type: 'likert',
        title: {
          en: 'Brand loyalty matters to me',
          pt: 'Fidelidade à marca é importante para mim',
          es: 'La fidelidad a la marca me importa',
        },
        options: [],
      },
      {
        id: 'hype-purchases',
        type: 'likert',
        title: {
          en: 'Occasionally, I purchase products due to hype',
          pt: 'Ocasionalmente compro produtos por hype',
          es: 'Ocasionalmente compro productos por moda',
        },
        options: [],
      },
      {
        id: 'application-uncertainty',
        type: 'likert',
        title: {
          en: "I'm not always sure if I'm applying my skincare products correctly",
          pt: 'Nem sempre tenho certeza se aplico meus produtos corretamente',
          es: 'No siempre estoy seguro(a) de aplicar mis productos correctamente',
        },
        options: [],
      },
    ],
  },
  {
    id: 'science-info',
    section: 11,
    kind: 'info',
    info: {
      id: 'science-info',
      type: 'info',
      title: {
        en: 'Science-based care works',
        pt: 'Cuidado baseado em ciência funciona',
        es: 'El cuidado basado en ciencia funciona',
      },
      body: {
        en: 'Without a structured program, skin concerns often worsen over time. Research from Harvard and Northwestern shows that face exercises and face yoga can significantly improve skin tone and firmness.',
        pt: 'Sem um programa estruturado, as preocupações com a pele frequentemente pioram. Pesquisas de Harvard e Northwestern mostram que exercícios faciais e face yoga podem melhorar significativamente o tom e a firmeza da pele.',
        es: 'Sin un programa estructurado, las preocupaciones de la piel a menudo empeoran. Investigaciones de Harvard y Northwestern muestran que los ejercicios faciales y el face yoga pueden mejorar significativamente el tono y la firmeza de la piel.',
      },
      image: 'science',
    },
  },
  {
    id: 'face-scan',
    section: 12,
    kind: 'face-scan',
    title: {
      en: 'AI face scan',
      pt: 'Scanner facial com IA',
      es: 'Escáner facial con IA',
    },
    subtitle: {
      en: 'Take a live selfie with your camera. Fit your face in the frame with good lighting.',
      pt: 'Tire uma selfie ao vivo com a câmera. Encaixe seu rosto no quadro com boa iluminação.',
      es: 'Toma una selfie en vivo con la cámara. Encaja tu rostro en el marco con buena iluminación.',
    },
  },
  {
    id: 'results',
    section: 13,
    kind: 'results',
    title: {
      en: 'Your personalised plan',
      pt: 'Seu plano personalizado',
      es: 'Tu plan personalizado',
    },
  },
];

export const likertLabels = {
  min: {
    en: 'Strongly disagree',
    pt: 'Discordo totalmente',
    es: 'Totalmente en desacuerdo',
  },
  max: {
    en: 'Strongly agree',
    pt: 'Concordo totalmente',
    es: 'Totalmente de acuerdo',
  },
};
