"use client"

import { Phone, MessageSquare, Compass, CalendarCheck } from "lucide-react"

export function MobileAppBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#30534A]/15 shadow-[0_-6px_25px_rgba(0,0,0,0.12)] px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around">
      <a
        href="tel:+919326709970"
        className="flex flex-col items-center gap-0.5 text-[#1e342e] active:scale-95 transition-transform"
        aria-label="Call Sales Desk"
      >
        <div className="w-9 h-9 rounded-full bg-[#30534A]/8 flex items-center justify-center">
          <Phone size={17} className="text-[#C9862b]" />
        </div>
        <span className="text-[10px] font-bold tracking-tight">Call</span>
      </a>

      <a
        href="https://wa.me/919326709970?text=Hi%2C%20I%20am%20interested%20in%20Mahalaxmi%20Nagar%2051%20Anaya%20plots.%20Please%20share%20layout%20and%20pricing."
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 text-[#1e342e] active:scale-95 transition-transform"
        aria-label="WhatsApp Inquiry"
      >
        <div className="w-9 h-9 rounded-full bg-[#25D366]/12 flex items-center justify-center">
          <MessageSquare size={17} className="text-[#25D366]" />
        </div>
        <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
      </a>

      <a
        href="#projects"
        className="flex flex-col items-center gap-0.5 text-[#1e342e] active:scale-95 transition-transform"
        aria-label="View Plot Layouts"
      >
        <div className="w-9 h-9 rounded-full bg-[#30534A]/8 flex items-center justify-center">
          <Compass size={17} className="text-[#30534A]" />
        </div>
        <span className="text-[10px] font-bold tracking-tight">Layouts</span>
      </a>

      <a
        href="#contact"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-[#C9862b]/30 active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, #C9862b 0%, #b8751e 100%)",
        }}
        aria-label="Book Free Site Visit"
      >
        <CalendarCheck size={14} />
        <span>Book Visit</span>
      </a>
    </div>
  )
}
