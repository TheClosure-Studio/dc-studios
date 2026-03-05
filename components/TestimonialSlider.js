"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Reveal } from "./Reveal";

export default function TestimonialSlider({ testimonials, staticImages }) {
  const scrollContainerRef = useRef(null);
  
  if (!testimonials || testimonials.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use the first two static images if available, otherwise fallback to whatever we have
  const img1 = staticImages && staticImages.length > 0 ? staticImages[0] : testimonials[0].image;
  const img2 = staticImages && staticImages.length > 1 ? staticImages[1] : (testimonials[1]?.image || img1);

  return (
    <section className="bg-[#f2f2f1] relative py-32 px-6 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full relative h-full flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Staggered Static Images */}
        <div className="hidden xl:flex w-full xl:w-[45%] relative h-[800px] items-center">
           {/* Image 1 (Higher, Left) */}
           <div className="absolute left-0 top-0 w-3/5 aspect-[3/4] z-10 shadow-xl overflow-hidden">
             <Image src={img1} alt="Portfolio 1" fill className="object-cover" />
           </div>
           
           {/* Image 2 (Lower, Right) */}
           <div className="absolute right-0 bottom-12 w-[60%] aspect-[4/5] z-20 shadow-2xl overflow-hidden">
             <Image src={img2} alt="Portfolio 2" fill className="object-cover" />
           </div>
        </div>

        {/* Right Side: Slider & Heading */}
        <div className="w-full xl:w-1/2 flex flex-col xl:pl-16 relative z-30">
           <Reveal>
             <h2 className="font-antic tracking-[0.4em] text-sm md:text-base text-black uppercase font-bold mb-16 text-center xl:text-left">
               TESTIMONIALS
             </h2>
           </Reveal>

           {/* The Scrollable white card area */}
           <div className="relative w-full shadow-2xl bg-white max-w-xl mx-auto xl:mx-0">
             
             {/* Native Horizontal Scroll Container for cards */}
             <div 
               ref={scrollContainerRef}
               className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
             >
               {testimonials.map((t, idx) => (
                 <div key={idx} className="w-full shrink-0 snap-start p-12 lg:p-16 flex flex-col justify-center min-h-[400px]">
                   <p className="font-serif italic text-lg lg:text-xl text-[#333] leading-loose mb-12">
                     "{t.text}"
                   </p>
                   
                   <div className="flex items-center gap-6 mt-auto">
                    
                      <div>
                         <h4 className="text-xs tracking-[0.2em] text-black font-bold uppercase mb-2">
                           {t.author}
                         </h4>
                         <p className=" text-[10px] tracking-widest text-neutral-500 uppercase">
                           {t.sessionType}
                         </p>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Controls Box below the card */}
           <div className="flex justify-center xl:justify-end max-w-xl mx-auto xl:mx-0 w-full mt-10 gap-4 pr-0 xl:pr-12">
              <button 
                onClick={scrollLeft}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm text-neutral-600"
              >
                <ArrowLeft size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-sm text-neutral-600"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
           </div>
        </div>

      </div>

      {/* Back to top square button in bottom right corner matches mockup */}
      <div className="absolute bottom-12 right-6 md:right-12 z-50">
         <button 
           onClick={scrollToTop}
           className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors bg-transparent"
           aria-label="Scroll to top"
         >
           <ArrowUp size={20} strokeWidth={1.5} />
         </button>
      </div>

    </section>
  );
}
