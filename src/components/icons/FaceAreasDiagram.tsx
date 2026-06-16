const BASE_STROKE = '#F6F5F4';
const ACTIVE_STROKE = '#222222';

type FaceAreaId = 'whole-face' | 'eyes' | 'cheeks' | 'under-nose' | 'chin';

interface FaceAreasDiagramProps {
  selected: string[];
}

function isActive(area: FaceAreaId, selected: string[]): boolean {
  return selected.includes('whole-face') || selected.includes(area);
}

function strokeFor(area: FaceAreaId, selected: string[]): string {
  return isActive(area, selected) ? ACTIVE_STROKE : BASE_STROKE;
}

function dotFillFor(area: FaceAreaId, selected: string[]): string {
  return isActive(area, selected) ? ACTIVE_STROKE : BASE_STROKE;
}

export function FaceAreasDiagram({ selected }: FaceAreasDiagramProps) {
  return (
    <svg width="190" height="476" viewBox="0 0 190 476" fill="none" className="h-auto w-full" aria-hidden>
      <path
        d="M187.5 42C156 45 161 70.5 112.5 103"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={BASE_STROKE}
      />
      <path
        d="M112 103C130.8 117 135 129.5 137 146.5C139 161.8 141.5 168 151 184.8C152.5 187.4 152.5 190.6 151 193C131.3 225.7 147 228.5 149.5 253C151.6 274.6 146 284 140.5 306.5C134.4 331.6 136 333.5 137 350.5C138.1 369.5 137 374.5 120 385C107.5 392.7 82.3 402.1 56 400.5C40 399.5 19 388.5 4 375.5"
        strokeWidth="6"
        strokeLinecap="round"
        stroke={strokeFor('whole-face', selected)}
      />
      <path
        d="M187.5 111.5C70.5 95.5 13 150.5 31.5 215"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={strokeFor('eyes', selected)}
      />
      <circle r="4" fill={dotFillFor('eyes', selected)} cx="31.5" cy="215" />
      <path
        d="M187.5 178.5C149.5 224.5 107 238.5 48.5 247"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={strokeFor('cheeks', selected)}
      />
      <circle r="4" fill={dotFillFor('cheeks', selected)} cx="48.5" cy="247" />
      <path
        d="M187.5 248C118.5 291 111 286 62.5 277"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={strokeFor('under-nose', selected)}
      />
      <circle r="4" fill={dotFillFor('under-nose', selected)} cx="62.5" cy="277" />
      <path
        d="M187.5 316C132 327 121.5 375 62 349.5"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={strokeFor('chin', selected)}
      />
      <circle r="4" fill={dotFillFor('chin', selected)} cx="62" cy="349.5" />
    </svg>
  );
}
