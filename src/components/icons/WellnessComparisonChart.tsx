import type { Locale } from '@/types/quiz';

const LABELS = {
  yAxis: {
    en: 'Skin Wellness Level',
    pt: 'Nível de Bem-estar da Pele',
    es: 'Nivel de Bienestar de la Piel',
  },
  xAxis: {
    en: 'Time',
    pt: 'Tempo',
    es: 'Tiempo',
  },
  withKor: {
    en: 'With KOR Labs',
    pt: 'Com KOR Labs',
    es: 'Con KOR Labs',
  },
  average: {
    en: 'On Average',
    pt: 'Na média',
    es: 'En promedio',
  },
} as const;

interface WellnessComparisonChartProps {
  locale: Locale;
}

export function WellnessComparisonChart({ locale }: WellnessComparisonChartProps) {
  const korEnd = { x: 248, y: 42 };
  const avgEnd = { x: 248, y: 108 };
  const origin = { x: 52, y: 148 };

  return (
    <div className="wellness-chart w-full">
      <svg viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full" aria-hidden>
        <text
          x="14"
          y="95"
          transform="rotate(-90 14 95)"
          className="fill-bobo text-[9px]"
          textAnchor="middle"
        >
          {LABELS.yAxis[locale]}
        </text>

        <line x1="36" y1="24" x2="36" y2="152" stroke="#E0E0E0" strokeWidth="1" />
        <line x1="36" y1="152" x2="268" y2="152" stroke="#E0E0E0" strokeWidth="1" />
        <path d="M33 24 L36 21 L39 24" stroke="#E0E0E0" strokeWidth="1" fill="none" />
        <path d="M268 149 L271 152 L268 155" stroke="#E0E0E0" strokeWidth="1" fill="none" />

        <line x1="36" y1="152" x2={korEnd.x} y2={korEnd.y} stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="36" y1="152" x2={avgEnd.x} y2={avgEnd.y} stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 3" />
        <line x1={korEnd.x} y1={korEnd.y} x2={korEnd.x} y2="152" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 3" />
        <line x1={avgEnd.x} y1={avgEnd.y} x2={avgEnd.x} y2="152" stroke="#F0F0F0" strokeWidth="1" strokeDasharray="2 3" />

        <path
          d={`M ${origin.x} ${origin.y} C 110 140, 170 120, ${avgEnd.x} ${avgEnd.y}`}
          stroke="#B0B0B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={avgEnd.x} cy={avgEnd.y} r="5" fill="#B0B0B0" />
        <text x={avgEnd.x} y={avgEnd.y - 12} className="fill-bobo text-[10px] font-medium" textAnchor="middle">
          {LABELS.average[locale]}
        </text>

        <path
          d={`M ${origin.x} ${origin.y} C 120 130, 190 70, ${korEnd.x} ${korEnd.y}`}
          stroke="#FF6B8A"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx={korEnd.x} cy={korEnd.y} r="14" fill="#FF6B8A" opacity="0.12" className="wellness-pulse wellness-pulse-1" />
        <circle cx={korEnd.x} cy={korEnd.y} r="9" fill="#FF6B8A" opacity="0.18" className="wellness-pulse wellness-pulse-2" />
        <circle cx={korEnd.x} cy={korEnd.y} r="5" fill="#FF6B8A" />
        <text x={korEnd.x} y={korEnd.y - 16} className="fill-[#FF6B8A] text-[10px] font-semibold" textAnchor="middle">
          {LABELS.withKor[locale]}
        </text>

        <text x="152" y="172" className="fill-bobo text-[9px]" textAnchor="middle">
          {LABELS.xAxis[locale]}
        </text>
      </svg>
    </div>
  );
}
