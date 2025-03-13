import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function OptimizedImage({ image, className }) {
  return (
    <LazyLoadImage
      alt={image.alt}
      effect="blur"
      src={image.large}
      placeholderSrc={image.small}
      wrapperClassName={className}
      threshold={300}
      srcSet={`
        ${image.small} 400w,
        ${image.medium} 800w,
        ${image.large} 1200w
      `}
      sizes="(max-width: 768px) 100vw,
             (max-width: 1200px) 50vw,
             33vw"
    />
  );
}

export default OptimizedImage; 