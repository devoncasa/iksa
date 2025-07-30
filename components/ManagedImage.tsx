import React, { useEffect, useState, useRef } from 'react';
import { useImageRegistry } from '../hooks/useImageRegistry';

interface ManagedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  pageName: string;
  sectionTitle: string;
  priority?: boolean;
}

export const ManagedImage: React.FC<ManagedImageProps> = ({ src, alt, pageName, sectionTitle, priority = false, ...props }) => {
  const { registerImage, isImageRegistered } = useImageRegistry();
  const [aspectRatio, setAspectRatio] = useState('N/A');
  const [showInfo, setShowInfo] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [displaySrc, setDisplaySrc] = useState<string | undefined>();

  useEffect(() => {
    if (typeof src === 'string') {
      setDisplaySrc(src);
      return;
    }
    
    if (src instanceof Blob) {
      const objectUrl = URL.createObjectURL(src);
      setDisplaySrc(objectUrl);
      
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setDisplaySrc(undefined);
  }, [src]);

  useEffect(() => {
    if (displaySrc && alt && !isImageRegistered(displaySrc)) {
        const img = new Image();
        img.src = displaySrc;
        const calculateAndRegister = () => {
            const ar = (img.naturalWidth / img.naturalHeight);
            const arString = `${img.naturalWidth}x${img.naturalHeight} (${ar.toFixed(2)}:1)`;
            setAspectRatio(arString);
            registerImage({
                src: displaySrc,
                alt: alt,
                pageName: pageName,
                sectionTitle: sectionTitle,
                aspectRatio: ar.toFixed(2),
            });
        };
        img.onload = calculateAndRegister;
        img.onerror = () => {
            setAspectRatio('Load Error');
            if (!isImageRegistered(displaySrc)) {
                registerImage({
                    src: displaySrc,
                    alt: `${alt} (LOAD ERROR)`,
                    pageName,
                    sectionTitle,
                    aspectRatio: 'Error',
                });
            }
        };
    }
  }, [displaySrc, alt, pageName, sectionTitle, registerImage, isImageRegistered]);

  const handleLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      if (naturalWidth > 0 && naturalHeight > 0) {
        const ar = (naturalWidth / naturalHeight);
        setAspectRatio(`${naturalWidth}x${naturalHeight} (${ar.toFixed(2)}:1)`);
      }
    }
  };

  const getFileName = (url: string | undefined) => {
    if (!url) return 'unknown';
    if (url.startsWith('blob:')) {
      return 'blob-image';
    }
    try {
      const path = new URL(url).pathname;
      return path.substring(path.lastIndexOf('/') + 1);
    } catch {
      return url.substring(url.lastIndexOf('/') + 1);
    }
  };

  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    ...props,
    src: displaySrc,
    alt: alt || '',
    onLoad: handleLoad,
  };

  if (priority) {
    (imgProps as any).fetchpriority = 'high';
    imgProps.loading = 'eager';
  } else {
    imgProps.loading = 'lazy';
  }

  return (
    <div 
        className="relative" 
        onMouseEnter={() => setShowInfo(true)} 
        onMouseLeave={() => setShowInfo(false)}
        // The parent container should have the necessary layout classes
    >
      <img ref={imgRef} {...imgProps} />
      {showInfo && (
        <div 
            className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] p-1 z-10 pointer-events-none" 
            style={{ userSelect: 'text', lineHeight: '1.2' }}
        >
          <p className="whitespace-nowrap overflow-hidden text-ellipsis font-mono">{getFileName(displaySrc)}</p>
          <p className="font-mono">{aspectRatio}</p>
        </div>
      )}
    </div>
  );
};