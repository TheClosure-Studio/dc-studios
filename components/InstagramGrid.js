"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

const instagramPhotos = [
  "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
  "/daniel-thomas-_tYNzEqehMk-unsplash.jpg",
  "/alireza-attari-SBIak0pKUIE-unsplash.jpg",
  "/vitor-monthay-R1UkYL5J1r8-unsplash.jpg",
  "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
  "/christian-bowen-I0ItPtIsVEE-unsplash.jpg",
  "/alvin-mahmudov-vKuEhorbvYI-unsplash.jpg",
  "/jeremy-mcknight-11GZVrMzfUU-unsplash.jpg",
];

export default function InstagramGrid() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <Reveal>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-10 text-center md:text-left">
            <div className="w-16 h-16 relative rounded-full overflow-hidden shrink-0">
               <Image 
                 src="/dc-image.jpg" 
                 alt="DC Studios Profile"
                 fill
                 className="object-cover"
               />
            </div>
            <div>
               <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-black">
                 <span className="italic">follow and visit</span> <span className="uppercase">DC Studios</span>
               </h3>
               <Link href="https://instagram.com/dc.dreamcapturestudio" target="_blank" className="text-neutral-500 font-display text-lg hover:text-black transition-colors">
                 @dc.dreamcapturestudio
               </Link>
            </div>
          </div>
        </Reveal>

        <div className="w-full">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-1 md:gap-2">
             {instagramPhotos.map((photo, i) => (
                <Reveal key={i}>
                  <Link href="https://instagram.com/dc.dreamcapturestudio" target="_blank" className="relative block aspect-square w-full overflow-hidden group">
                    <Image 
                      src={photo}
                      alt="Instagram Post"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase">View</span>
                    </div>
                  </Link>
                </Reveal>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
