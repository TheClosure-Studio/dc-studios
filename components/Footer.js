import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white md:rounded-t-[4rem] rounded-t-3xl pt-16 pb-8 px-6 lg:mx-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-12">
          {/* Left Column: Contact Info */}
          <div className="flex flex-col space-y-6 text-sm font-display order-2 md:order-1 items-center md:items-start">
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Phone size={14} />
              </div>
              <a href="tel:+91XXXXXXXXX" className="text-neutral-300 hover:text-white transition-colors tracking-wide">
                +91 XXXXX XXXXX
              </a>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Mail size={14} />
              </div>
              <a href="mailto:[EMAIL_ADDRESS]" className="text-neutral-300 hover:text-white transition-colors tracking-wide">
                [EMAIL_ADDRESS]
              </a>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center mt-0.5 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                <MapPin size={14} />
              </div>
              <p className="text-neutral-400 leading-relaxed max-w-[200px] text-center md:text-left">
                Tirupati, Andhra Pradesh
              </p>
            </div>
          </div>

          {/* Center Column: Logo */}
          <div className="flex flex-col items-center justify-center order-1 md:order-2">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1a1a1a] shadow-2xl flex items-center justify-center bg-[#050505]">
              <Image 
                src="/dc-image.jpg" 
                alt="DC Studios" 
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: About Text */}
          <div className="flex flex-col items-center md:items-end order-3">
            <p className="text-neutral-300 text-center md:text-right max-w-sm leading-relaxed font-display text-sm md:text-base italic">
              "Let's create timeless memories through the lens of artistry. Reach out, and weave your unique story into captivating frames."
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-neutral-500 font-display gap-4">
          <p>© {new Date().getFullYear()} DC Studio Photography. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p>Developed By <span className="text-neutral-400">The Closure Studio</span></p>
            <div className="h-1 w-1 rounded-full bg-neutral-800" />
            <a href="/admin" className="hover:text-white transition-colors">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
