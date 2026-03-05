"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ServiceFAQGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div key={index} className="border-t border-neutral-300 relative group">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-8 flex items-start justify-between text-left transition-colors hover:text-neutral-500 text-black"
              >
                <span className="font-display text-sm tracking-[0.2em] leading-loose pr-6 uppercase">
                  {item.question}
                </span>
                <span className="shrink-0 mt-1">
                  {isActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[#555] tracking-wide text-sm leading-relaxed pr-6">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {/* Bottom border to complete the grid */}
      <div className="w-full h-px bg-neutral-300 lg:col-span-3"></div>
    </div>
  );
}
