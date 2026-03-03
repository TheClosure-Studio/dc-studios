"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Set true initially so it renders instantly during hydration preventing the content flash
  const [isLoading, setIsLoading] = useState(!isAdminRoute);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    // Listen for custom event explicitly signaled mechanically by components
    window.addEventListener('heroImagesLoaded', handleHidePreloader);

    // Fallback if the component doesn't emit the event (like navigation to Contact page)
    fallbackTimer = setTimeout(() => {
      handleHidePreloader();
    }, isInitialLoad ? 4000 : 2000);

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
          // Starts visible and fully covering the screen
          initial={{ opacity: 1, y: 0 }}
          // Exits by sliding beautifully up out of the viewport
          exit={{ 
            y: "-100vh", 
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-white"
        >
          <div className="overflow-hidden">
            <motion.div
              // Text slides up subtly while fading in to establish the brand
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif uppercase animate-shimmer"
            >
              <span className="font-sedgwick normal-case mr-4">DC Studios</span> 
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
