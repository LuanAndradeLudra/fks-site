import { useState } from 'react';
import { skinImageCandidates } from '@/lib/skin-image';
import { cn } from '@/lib/utils';

type SkinImageProps = {
  name: string;
  image?: string | null;
  alt?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

const SkinImage = ({
  name,
  image,
  alt,
  className,
  loading = 'lazy',
}: SkinImageProps) => {
  const sources = skinImageCandidates({ name, image });
  const [sourceIndex, setSourceIndex] = useState(0);

  return (
    <img
      src={sources[Math.min(sourceIndex, sources.length - 1)]}
      alt={alt ?? name}
      className={cn(className)}
      loading={loading}
      referrerPolicy="no-referrer"
      decoding="async"
      onError={() => {
        setSourceIndex((current) =>
          current < sources.length - 1 ? current + 1 : current,
        );
      }}
    />
  );
};

export default SkinImage;
