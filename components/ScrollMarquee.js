"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollMarquee({ line1, line2 }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Line 1 moves left as you scroll down. Line 2 moves right.
  const x1 = useTransform(scrollYProgress, [0, 1], ["18%", "-10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-12%", "16%"]);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-20 overflow-hidden"
    >
      {/* Line 1 — moves left */}
      <div className="overflow-hidden mb-2 md:mb-3">
        <motion.p
          style={{ x: x1 }}
          className="font-antic text-lg md:text-2xl lg:text-4xl xl:text-7xl text-black uppercase tracking-tight whitespace-nowrap leading-none font-bold xl:font-normal"
        >
          {line1}
        </motion.p>
      </div>

      {/* Line 2 — moves right (opposite) */}
      <div className="overflow-hidden">
        <motion.p
          style={{ x: x2 }}
          className="font-antic text-lg md:text-2xl lg:text-4xl xl:text-7xl text-black uppercase tracking-tight whitespace-nowrap leading-none font-bold xl:font-normal"
        >
          {line2}
        </motion.p>
      </div>
    </section>
  );
}
