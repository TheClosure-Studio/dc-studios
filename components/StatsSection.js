"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";

const stats = [
  {
    value: 1400,
    suffix: "+",
    label: "Moments Captured",
    desc: "We capture the essence of every special moment with creativity and passion.",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years Of Experience",
    desc: "We have honed our skills over the years to deliver outstanding photography services.",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Satisfied Clients",
    desc: "Our clients' happiness and trust fuel our commitment to exceptional service.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    desc: "Delivering quality projects with unmatched precision and attention to detail.",
  },
];

function CountUp({ target, suffix, duration = 1800, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white overflow-hidden">

      {/* ── Decorative Header ── */}
      <div className="relative flex items-center justify-center py-16 md:py-24 px-6 border-b border-neutral-100">
        {/* Left flower */}
        <div className="absolute left-0 top-1/3 -translate-y-1/2 w-24 md:w-48 aspect-square pointer-events-none opacity-80 mix-blend-multiply">
          <Image src="/flower1.png" alt="" fill className="object-contain" />
        </div>

        {/* Right flower */}
        <div className="absolute right-0 bottom-0 -translate-y-1/2 w-24 md:w-48 aspect-square pointer-events-none opacity-80 mix-blend-multiply">
          <Image src="/flower2.png" alt="" fill className="object-contain" />
        </div>

        {/* Centre text */}
        <Reveal>
          <div className="text-center z-10">
            <p className="font-antic text-3xl md:text-5xl text-neutral-700 uppercase mb-3">
              Making Your
            </p>
            <div className="w-64 md:w-96 h-px bg-neutral-400 mx-auto mb-3" />
            <p className="font-antic text-3xl md:text-5xl text-neutral-700 uppercase">
              Special Day
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Stats Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-100 py-16 md:py-20 px-6 md:px-0">
        {stats.map((stat, idx) => (
          <Reveal key={idx}>
            <div className="flex flex-col px-3 md:px-12 py-5">
              {/* Animated number */}
              <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-black leading-none mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} start={started} />
              </span>

              {/* Gold label */}
              <span className="text-xs font-semibold tracking-widest uppercase mb-2 text-[#c9a84c]">
                {stat.label}
              </span>

              {/* Description */}
              <p className="text-neutral-500 text-sm">
                {stat.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
