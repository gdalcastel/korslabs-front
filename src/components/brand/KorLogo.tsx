type LogoVariant = 'full' | 'icon' | 'header' | 'welcome';

interface KorLogoProps {
  variant?: LogoVariant;
  className?: string;
}

const sizes: Record<LogoVariant, { src: string; height: number; width?: number }> = {
  full: { src: '/logo.png', height: 150 },
  welcome: { src: '/logo.png', height: 110 },
  header: { src: '/logo.png', height: 79 },
  icon: { src: '/icon.svg', height: 50, width: 50 },
};

export function KorLogo({ variant = 'full', className = '' }: KorLogoProps) {
  const config = sizes[variant];

  return (
    <img
      src={config.src}
      alt="KÖR Labs"
      height={config.height}
      width={config.width}
      className={`object-contain ${className}`}
      style={config.width ? { width: config.width, height: config.height } : { height: config.height, width: 'auto' }}
      draggable={false}
    />
  );
}
