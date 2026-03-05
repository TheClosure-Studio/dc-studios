"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import Image from "next/image";

export default function Preloader() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Set true initially so it renders instantly during hydration preventing the content flash
  const [isLoading, setIsLoading] = useState(!isAdminRoute);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }

    // Force scroll to top on reload so the preloader animation always happens at the top
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // We can rely on a specific custom event from the Hero/Content component to dismiss.
    // We add a fallback timer just in case an image fails to load or no event is emitted.
    let isMounted = true;
    let fallbackTimer;

    const handleHidePreloader = () => {
      if (isMounted) {
        setIsExiting(true);
        // Wait for the "Coverer" animation to complete before unmounting
        setTimeout(() => {
          setIsLoading(false);
          setIsInitialLoad(false);
        }, 1200); // Duration should match the coverer animation
      }
    };

    // Listen for custom event explicitly signaled mechanically by components
    window.addEventListener('heroImagesLoaded', handleHidePreloader);

    // Fallback if the component doesn't emit the event (like navigation to Contact page)
    fallbackTimer = setTimeout(() => {
      handleHidePreloader();
    }, isInitialLoad ? 4000 : 2500);

    return () => {
      isMounted = false;
      window.removeEventListener('heroImagesLoaded', handleHidePreloader);
      clearTimeout(fallbackTimer);
    };
  }, [pathname, isAdminRoute, isInitialLoad]);

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 }
          }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-[#02020a]"
        >
          {/* Background Starry Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/dc-bg.jpg" 
              alt="Background" 
              fill 
              priority 
              className="object-cover opacity-60"
            />
          </div>

          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center overflow-hidden z-10">
            {/* The static logo image */}
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <Image 
                src="/dc.jpeg" 
                alt="DC Studios Logo" 
                fill 
                priority 
                className="object-contain "
              />
            </div>

            {/* Revealer Curtain: Slides DOWN to reveal the logo */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="absolute inset-0 bg-[#02020a]"
            />

            {/* Shutter Coverer: Slides DOWN from top to cover the logo when exiting */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={isExiting ? { y: 0 } : { y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[#02020a] z-20"
            />
          </div>

          {/* Line Loader: Positioned slightly below the logo area */}
          <div className="absolute top-[calc(50%+120px)] md:top-[calc(50%+160px)] w-40 md:w-48 overflow-hidden h-px bg-white/10 z-10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ 
                duration: 2.5, 
                ease: "easeInOut",
                delay: 1.0 
              }}
              className="w-full h-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
