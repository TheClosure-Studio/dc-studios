"use client";

import { Reveal } from "./Reveal";
import { useState } from "react";
import Image from "next/image";

export default function ServiceContactForm({ videoUrl, fallbackImage }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sessionDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 1000);
  };

  return (
    <section className="bg-neutral-50 py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch border border-neutral-200 bg-white">
        
        {/* Left Side: Video/Image */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-auto flex-1">
          {videoUrl && videoUrl.includes("youtube") ? (
             <iframe 
               src={videoUrl}
               className="absolute inset-0 w-full h-full object-cover"
               allowFullScreen
               title="Service Video"
             />
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src={fallbackImage}
                alt="Service Video Fallback"
                fill
                className="object-cover"
              />
              {/* Play button overlay mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/40 transition">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex-1 flex flex-col justify-center">
          <Reveal>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center">Inquire</h3>
            <h2 className="font-serif text-3xl md:text-5xl text-black text-center mb-12">Start a Conversation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full">
              <div>
                <input 
                  type="text" 
                  placeholder="name" 
                  required
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors font-display"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="phone number" 
                  required
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors font-display"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input 
                    type="email" 
                    placeholder="email" 
                    required
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors font-display"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="session date / EDD" 
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors font-display"
                    value={formData.sessionDate}
                    onChange={(e) => setFormData({...formData, sessionDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <textarea 
                  placeholder="message" 
                  rows="3"
                  className="w-full bg-transparent border-b border-neutral-300 py-3 text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:border-black transition-colors font-display resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <div className="pt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full border border-black text-black hover:bg-black hover:text-white transition-colors duration-300 py-4 uppercase tracking-[0.2em] text-sm font-semibold flex justify-center items-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
