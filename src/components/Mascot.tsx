import Image from 'next/image';

type Size = 'sm' | 'md' | 'lg';
type Category = 'emotion' | 'situation' | 'company' | 'service' | 'process' | 'support' | 'ui' | 'misc';

interface MascotProps {
  pose: string;
  category: Category;
  size?: Size;
  className?: string;
  alt?: string;
  bubble?: string;
  bubbleDir?: 'left' | 'right';
}

const SIZE_PX: Record<Size, number> = { sm: 128, md: 256, lg: 512 };

export default function Mascot({
  pose,
  category,
  size = 'md',
  className,
  alt = 'VISIONC 마스코트',
  bubble,
  bubbleDir = 'right',
}: MascotProps) {
  const src = `/mascot/${size}/${category}/cat_${pose}.png`;
  const px = SIZE_PX[size];

  if (!bubble) {
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

  return (
    <div className={`relative inline-flex items-end gap-2 ${bubbleDir === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>
      <Image
        src={src}
        alt={alt}
        width={px}
        height={px}
        className={className}
        priority={size === 'lg'}
      />
      <div className={`relative mb-4 max-w-[160px] rounded-2xl bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-medium text-primary leading-snug ${
        bubbleDir === 'left'
          ? 'after:absolute after:right-[-8px] after:bottom-3 after:border-4 after:border-transparent after:border-l-primary/20'
          : 'after:absolute after:left-[-8px] after:bottom-3 after:border-4 after:border-transparent after:border-r-primary/20'
      }`}>
        {bubble}
      </div>
    </div>
  );
}
