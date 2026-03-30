"use client";

import { useState, useEffect } from "react";

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
  const [fallbackSrc, setFallbackSrc] = useState(null);

  const fallbackImages = [
    "/mock/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
    "/mock/daniel-thomas-_tYNzEqehMk-unsplash.jpg",
    "/mock/janko-ferlic-ZNVGL_Pcf74-unsplash.jpg",
    "/mock/jonathan-borba-CgWTqYxHEkg-unsplash.jpg",
    "/mock/juan-encalada-SCteCA0Mf1A-unsplash.jpg",
    "/mock/klara-kulikova-o1rq5GwVorY-unsplash.jpg",
  ];

  useEffect(() => {
    if (hasError && !fallbackSrc) {
      const randomIdx = Math.floor(Math.random() * fallbackImages.length);
      setFallbackSrc(fallbackImages[randomIdx]);
    }
  }, [hasError, fallbackSrc]);

  // If there's an error, render a fallback image
  if (hasError && fallbackSrc) {
    return (
      <div className={`relative overflow-hidden w-full h-full ${containerClassName}`}>
        <Image
          src={fallbackSrc}
          alt="Fallback image"
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </div>
    );
  }

  // If no src, render a simple neutral placeholder
  if (!src) {
    return (
      <div className={`w-full h-full bg-neutral-200 flex items-center justify-center ${containerClassName}`}>
        <span className="text-neutral-400 text-xs italic">No Image</span>
      </div>
    );
  }

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
        src={src}
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
          if (!hasError) setHasError(true);
        }}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
