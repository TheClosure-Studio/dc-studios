"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Reveal } from "./Reveal";

export default function MemoriesRow({ memories }) {
  if (!memories || memories.length === 0) return null;

  return (
    <section className="bg-[#f9f9f9] pt-24 pb-0">
       <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black pb-12">
          <div className="w-full md:w-2/3">
             <Reveal>
               <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black uppercase tracking-wide leading-tight max-w-xl">
                 ADDING THE MEMORIES OF EVERY MOMENT
               </h2>
             </Reveal>
          </div>
          <div>
            <Reveal>
              <Link 
                href="/portfolio" 
                className="inline-block border border-black px-8 py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-300"
              >
                VIEW ALL PORTFOLIO
              </Link>
            </Reveal>
          </div>
       </div>

       <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          {memories.map((mem, idx) => (
             <div key={idx} className="w-[85vw] md:w-1/4 shrink-0 aspect-[3/4] md:aspect-auto md:h-[60vh] relative group snap-start cursor-pointer border-r border-[#f9f9f9]">
                <Image 
                  src={mem.image}
                  alt={mem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Text and Button overlay - visible on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 translate-y-4 group-hover:translate-y-0">
                   <h3 className="text-white font-serif text-2xl md:text-3xl uppercase tracking-wider mb-2 drop-shadow-md">
                     {mem.title}
                   </h3>
                   <p className="text-white/80 font-sans text-xs tracking-widest uppercase flex items-center justify-between w-full border-b border-white/30 pb-4">
                     <span>{mem.title} SESSION</span>
                     <Link href={mem.link} className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors">
                        <ArrowUp size={16} />
                     </Link>
                   </p>
                </div>
             </div>
          ))}
       </div>
    </section>
  );
}
