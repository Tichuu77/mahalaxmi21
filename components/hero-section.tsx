"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Compass, Phone, MessageSquare, CheckCircle2, Calendar } from "lucide-react"

const TOWNSHIP_SPECS = [
  { value: "78+",  unit: "Acres",   label: "Integrated Township", desc: "Low-density master plan" },
  { value: "524",  unit: "Plots",   label: "RERA Villa Plots",    desc: "1,130 to 5,000 sq.ft"   },
  { value: "30+",  unit: "Luxury",  label: "Lifestyle Amenities", desc: "Clubhouse, Turfs, Pool" },
  { value: "90%",  unit: "Loan",    label: "Bank Finance",        desc: "SBI, HDFC, ICICI, BoB"   },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToContact  = useCallback(() => scrollTo("contact"),  [scrollTo])
  const scrollToProjects = useCallback(() => scrollTo("projects"), [scrollTo])

  return (
    <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center pt-24 sm:pt-32 lg:pt-38 pb-8 sm:pb-16 overflow-hidden bg-[#0d1c17]">
      {/* Background Hero Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpeg"
          alt="Mahalaxmi Nagar 51 Anaya Township"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 opacity-55"
          fetchPriority="high"
          decoding="sync"
          width={1440}
          height={900}
        />
      </div>

      {/* Modern Sophisticated Gradient Lighting Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, rgba(13,28,23,0.95) 0%, rgba(13,28,23,0.88) 45%, rgba(13,28,23,0.72) 75%, rgba(13,28,23,0.52) 100%)",
        }}
      />

      {/* Decorative Warm Ambient Glows */}
      <div
        className="absolute top-1/4 left-8 w-80 h-80 rounded-full pointer-events-none z-[2]"
        style={{
          background: "radial-gradient(circle, rgba(201,134,43,0.16) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-3.5 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] items-center gap-6 lg:gap-14">

          {/* LEFT COLUMN: Project Spotlight & Story */}
          <div className="flex flex-col justify-center">

            {/* Project Pill Badges */}
            <div
              className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-white shadow-xs"
                  style={{
                    background: "linear-gradient(135deg, #C9862b, #a86a1a)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Sparkles size={12} className="text-white" />
                  FLAGSHIP TOWNSHIP LAUNCH
                </span>

                <span
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-white/95"
                  style={{
                    background: "rgba(48,83,74,0.6)",
                    border: "1px solid rgba(201,134,43,0.35)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <ShieldCheck size={13} className="text-[#C9862b]" />
                  MahaRERA: PP1190002602003 • NMRDA Sanctioned
                </span>
              </div>
            </div>

            {/* Headline */}
            <div
              className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "70ms" }}
            >
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.85rem, 4.4vw, 4.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "#ffffff",
                  textShadow: "0 2px 20px rgba(0,0,0,0.8)",
                }}
                className="mb-2 sm:mb-4"
              >
                Mahalaxmi Nagar 51
                <span className="block text-[#C9862b] text-shadow-sm">
                  Anaya Township
                </span>
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.85rem, 1.05vw, 1.1rem)",
                  color: "#e2e8f0",
                  lineHeight: 1.6,
                }}
                className="max-w-2xl mb-4 sm:mb-6 text-white/90"
              >
                Nagpur's premier 78-acre low-density plotted township at{" "}
                <strong className="text-[#C9862b] font-bold">Mouza Sumthana</strong>, directly on the{" "}
                <strong className="text-white font-semibold">Samruddhi Mahamarg Corridor</strong>, just 7 minutes from MIHAN SEZ &amp; AIIMS.
              </p>
            </div>

            {/* Clean Location & Price Highlights Bar */}
            <div
              className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "140ms" }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-7">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs text-white/90 font-medium"
                  style={{
                    background: "rgba(48,83,74,0.35)",
                    border: "1px solid rgba(201,134,43,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <MapPin size={13} className="text-[#C9862b] shrink-0" />
                  <span>Mouza Sumthana • Samruddhi Corridor</span>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold text-white"
                  style={{
                    background: "linear-gradient(90deg, rgba(201,134,43,0.25) 0%, rgba(48,83,74,0.25) 100%)",
                    border: "1px solid rgba(201,134,43,0.45)",
                  }}
                >
                  <span>From</span>
                  <span className="text-[#C9862b] font-extrabold text-xs sm:text-sm">₹35.4 Lakh*</span>
                  <span className="text-white/60">|</span>
                  <span className="text-white/80">Token ₹51k</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: App-Style 2 Buttons in 1 Row on Mobile */}
            <div
              className={`grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3.5 mb-6 sm:mb-8 transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "220ms" }}
            >
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-1.5 px-3 py-3 sm:px-7 sm:py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #C9862b 0%, #b8751e 100%)",
                  boxShadow: "0 6px 20px rgba(201,134,43,0.4)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Calendar size={14} />
                <span>Book Site Visit</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="flex items-center justify-center gap-1.5 px-3 py-3 sm:px-6 sm:py-3.5 rounded-xl text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-[#C9862b] hover:text-[#C9862b] hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Compass size={14} className="text-[#C9862b]" />
                <span>View Layouts</span>
              </button>
            </div>

            {/* Clean Horizontal Specs Bar: 4 Cards in 1 Row on Mobile */}
            <div
              className={`grid grid-cols-4 gap-1 sm:gap-3 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "300ms" }}
            >
              {TOWNSHIP_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="p-1.5 sm:p-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-center sm:text-left"
                >
                  <div className="flex items-baseline justify-center sm:justify-start gap-0.5 sm:gap-1">
                    <span
                      className="text-sm sm:text-2xl font-extrabold text-[#C9862b]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {spec.value}
                    </span>
                    <span className="text-[8px] sm:text-xs text-white/70 font-semibold">{spec.unit}</span>
                  </div>
                  <div className="text-[9px] sm:text-xs font-bold text-white truncate">{spec.label}</div>
                  <div className="text-[8px] sm:text-[10px] text-white/50 truncate hidden sm:block">{spec.desc}</div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Official Highlights Card (Desktop & Tablet) */}
          <div
            className={`hidden lg:flex flex-col items-end justify-center transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "380ms" }}
          >
            <div
              className="w-full max-w-[380px] rounded-3xl overflow-hidden shadow-2xl relative"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%)",
                border: "2px solid rgba(201,134,43,0.35)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header with Mahalaxmi Infra Identity */}
              <div
                className="p-4 text-center relative border-b border-[#30534A]/10"
                style={{
                  background: "linear-gradient(135deg, rgba(48,83,74,0.08) 0%, rgba(201,134,43,0.08) 100%)",
                }}
              >
                <div className="flex items-center justify-center gap-2.5 mb-1">
                  <img
                    src="/Malaxmi-Final-Logo.-2png.png"
                    alt="Mahalaxmi Infra Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="text-left">
                    <span
                      className="block text-sm font-extrabold tracking-wider text-[#30534A] leading-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      MAHALAXMI NAGAR 51
                    </span>
                    <span className="block text-[9px] font-bold text-[#C9862b] tracking-widest uppercase">
                      OFFICIAL DIRECT BOOKING DESK
                    </span>
                  </div>
                </div>

                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#30534A]/10 text-[#30534A] text-[10px] font-bold">
                  <ShieldCheck size={11} className="text-[#C9862b]" />
                  MAHARERA REGISTERED • ZERO BROKERAGE
                </div>
              </div>

              {/* Card Body: Verified Project Specifications */}
              <div className="p-5">
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="text-[#666] font-medium">Project RERA:</span>
                    <span className="font-bold text-[#30534A]">PP1190002602003</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="text-[#666] font-medium">Layout Sanction:</span>
                    <span className="font-bold text-[#C9862b]">NMRDA Sanctioned RL</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="text-[#666] font-medium">Plot Dimensions:</span>
                    <span className="font-bold text-[#30534A]">1,130 – 5,000 Sq.Ft</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="text-[#666] font-medium">Starting Price:</span>
                    <span className="font-extrabold text-[#C9862b]">₹35.40 Lakh* Onwards</span>
                  </div>
                </div>

                {/* Direct Actions: Call & WhatsApp */}
                <div className="space-y-2">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #30534A 0%, #1e352f 100%)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <Calendar size={13} className="text-[#C9862b]" />
                    Schedule Free Site Visit with Cab
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:+919326709970"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#30534A]/25 text-[#30534A] hover:border-[#C9862b] hover:text-[#C9862b] font-bold text-xs transition-all"
                    >
                      <Phone size={12} className="text-[#C9862b]" />
                      Call Direct
                    </a>

                    <a
                      href="https://wa.me/919326709970?text=Hi%2C%20I%20am%20interested%20in%20Mahalaxmi%20Nagar%2051%20Anaya%20plots.%20Please%20share%20the%20sanctioned%20layout%20and%20price%20sheet."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#25D366]/40 text-[#1a8a43] hover:bg-[#25D366]/5 font-bold text-xs transition-all"
                    >
                      <MessageSquare size={12} className="text-[#25D366]" />
                      WhatsApp PDF
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Ribbon */}
              <div
                className="py-2 px-4 text-center text-white text-[10px] font-semibold flex items-center justify-center gap-2"
                style={{ background: "#30534A" }}
              >
                <CheckCircle2 size={12} className="text-[#C9862b]" />
                <span>Zero Brokerage • Direct Developer Agreement</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}