// components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton, Box } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 400,
  priority = false,
  className,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <Box position="relative" width="100%" height={height}>
      {isLoading && !hasError && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={height}
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className={className}
          style={{
            objectFit: 'cover',
            borderRadius: '8px',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      
      {hasError && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height={height}
          bgcolor="grey.100"
          borderRadius={1}
        >
          이미지를 불러올 수 없습니다
        </Box>
      )}
    </Box>
  );
}