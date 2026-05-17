import Image from 'next/image';

type Size = 'sm' | 'md' | 'lg';
type Category = 'emotion' | 'situation' | 'company' | 'service' | 'process' | 'support' | 'ui' | 'misc';

interface MascotProps {
  pose: string;
  category: Category;
  size?: Size;
  className?: string;
  alt?: string;
}

const SIZE_PX: Record<Size, number> = { sm: 128, md: 256, lg: 512 };

export default function Mascot({
  pose,
  category,
  size = 'md',
  className,
  alt = 'VISIONC 마스코트',
}: MascotProps) {
  const src = `/mascot/${size}/${category}/cat_${pose}.png`;
  const px = SIZE_PX[size];
  return (
    <Image
      src={src}
      alt={alt}
      width={px}
      height={px}
      className={className}
      priority={size === 'lg'}
    />
  );
}
