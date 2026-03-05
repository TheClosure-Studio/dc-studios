"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

export default function PortfolioGridButton({ images, slug }) {
  if (!images || images.length === 0) return null;
  
  // Use first 6 images to match 2x3 grid perfectly
  const displayImages = images.slice(0, 6);

  return (
    <section className="bg-white">
       {/* Button Area Top */}
       <div className="py-20 flex justify-center border-b border-t border-neutral-200">
         <Reveal>
            <Link 
              href={`/gallery/${slug}`}
              className="inline-block border border-black px-12 py-5 text-xs font-bold tracking-[0.2em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
               VIEW FULL PORTFOLIO
            </Link>
         </Reveal>
       </div>

       {/* Grid Area */}
       <div className="w-full">
         <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
           {displayImages.map((img, idx) => (
              <Reveal key={idx}>
                 <Link href={`/gallery/${slug}`} className="block relative aspect-square md:aspect-[4/3] w-full overflow-hidden group">
                    <Image 
                      src={img} 
                      alt="Portfolio Gallery"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                 </Link>
              </Reveal>
           ))}
         </div>
       </div>
    </section>
  );
}
