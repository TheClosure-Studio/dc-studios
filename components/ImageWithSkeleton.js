"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * A wrapper for next/image that shows a skeleton loading state
 * until the image is fully loaded.
 */
export default function ImageWithSkeleton({ 
  src, 
  alt = "", 
  className = "", 
  containerClassName = "",
  fill = false,
  width,
  height,
  priority = false,
  quality = 75,
  sizes,
  loading = "lazy",
  skeletonClassName = "bg-neutral-100 animate-skeleton"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If there's an error, we fallback to a verified local asset
  const fallback = "/adele-morris-mDiFpFl_jTs-unsplash.jpg";
  const displaySrc = hasError ? fallback : src;

  return (
    <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
      {/* Skeleton dynamic loader */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 z-10 animate-pulse ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}
      
      <Image
        src={displaySrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? undefined : loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
             setHasError(true);
             // Also mark as loaded so skeleton disappears for fallback
             setIsLoaded(true);
          }
        }}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
