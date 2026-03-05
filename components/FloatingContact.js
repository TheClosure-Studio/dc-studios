"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingContact() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-999"
    >
      {/* Smooth Flowing Background */}
      <motion.div
        animate={{
          scale: [1, 1.5],
          opacity: [0, 0.6, 0 ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-black rounded-full pointer-events-none"
      />

      <a
        href="tel:+91XXXXXXXXXX"
        className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-xl hover:bg-neutral-800 transition-colors group relative z-10"
        aria-label="Call Us"
      >
        <Phone size={22} className="group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-black text-white px-3 py-1.5 rounded text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-sans">
          Contact Us
        </span>
      </a>
    </motion.div>
  );
}
