"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Award, Users, Building2, CheckCircle2, TrendingUp, Shield, Sparkles, Phone, Trees, ShieldCheck } from "lucide-react"

const TARGETS = { acres: 78, plots: 524, amenities: 30, finance: 90 } as const
const DURATION = 2000
const STEPS = 50

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ acres: 0, plots: 0, amenities: 0, finance: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animatedRef = useRef(false)

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return
    animatedRef.current = true
    const interval = DURATION / STEPS
    let cur = { acres: 0, plots: 0, amenities: 0, finance: 0 }
    timerRef.current = setInterval(() => {
      cur.acres     = Math.min(cur.acres + TARGETS.acres / STEPS, TARGETS.acres)
      cur.plots     = Math.min(cur.plots + TARGETS.plots / STEPS, TARGETS.plots)
      cur.amenities = Math.min(cur.amenities + TARGETS.amenities / STEPS, TARGETS.amenities)
      cur.finance   = Math.min(cur.finance + TARGETS.finance / STEPS, TARGETS.finance)
      setCounters({
        acres: Math.floor(cur.acres),
        plots: Math.floor(cur.plots),
        amenities: Math.floor(cur.amenities),
        finance: Math.floor(cur.finance),
      })
      if (cur.acres >= TARGETS.acres && cur.plots >= TARGETS.plots && cur.amenities >= TARGETS.amenities && cur.finance >= TARGETS.finance) {
        clearInterval(timerRef.current!)
        setCounters(TARGETS)
      }
    }, interval)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setIsVisible(true); animateCounters() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [animateCounters])

  const features = useMemo(() => [
    { icon: ShieldCheck,  text: "MahaRERA: PP1190002602003" },
    { icon: Shield,       text: "NMRDA Sanctioned Layout"     },
    { icon: CheckCircle2, text: "100% Clear Legal Title & RL" },
    { icon: Building2,    text: "Bank Loan Up to 90% (SBI/HDFC)" },
    { icon: TrendingUp,   text: "High Appreciation Corridor"  },
    { icon: Trees,        text: "78-Acre Eco-Planned Enclave" },
  ], [])

  const stats = useMemo(() => [
    { value: counters.acres,     suffix: "+", label: "Acres Township",    icon: Building2  },
    { value: counters.plots,     suffix: "+", label: "Sanctioned Plots",  icon: Users      },
    { value: counters.amenities, suffix: "+", label: "Luxury Amenities",  icon: Award      },
    { value: counters.finance,   suffix: "%", label: "Bank Finance Approved", icon: TrendingUp },
  ], [counters])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center mb-10 sm:mb-16">

          {/* Left Column: Vision Story */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#C9862b]" />
              THE VISION BEHIND ANAYA 51
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Crafting Nagpur’s Most <span className="text-[#30534A]">Prestigious</span>{" "}
              <span className="text-[#C9862b]">Gated Plotted</span> Township
            </h2>

            <p className="text-xs sm:text-base text-[#444] leading-relaxed mb-3">
              <strong>Mahalaxmi Nagar 51 – Anaya</strong> is an ultra-exclusive residential plotted development situated at <strong className="text-[#30534A]">Mouza Sumthana</strong>, right on the fast-growing Samruddhi Mahamarg Expressway growth axis.
            </p>

            <p className="text-sm sm:text-base text-[#666] leading-relaxed mb-6">
              Sprawling across 78+ acres, Anaya is planned with an emphasis on open green spaces, wide concrete avenues, and active sports recreation including box cricket and football turfs, a signature clubhouse, swimming pool, and child daycare. Every plot carries 100% legal compliance with <strong>NMRDA Sanction</strong>, <strong>Clear RL Title</strong>, and <strong>MahaRERA Registration (PP1190002602003)</strong>.
            </p>

            {/* Checklist of Core Pillars: 2 Cards per Row on Mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#30534A]/4 border border-[#30534A]/10 text-[10px] sm:text-xs font-semibold text-[#203a33]"
                  >
                    <Icon size={14} className="text-[#C9862b] shrink-0" />
                    <span className="line-clamp-1">{item.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Developer Trust Badge */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#30534A]/8 to-[#C9862b]/8 border border-[#30534A]/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src="/Malaxmi-Final-Logo.-2png.png"
                  alt="Mahalaxmi Infra"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0d0d0d]">Mahalaxmi Infra</h4>
                  <p className="text-[10px] sm:text-xs text-[#666]">13+ Years Legacy • 70+ Projects Delivered</p>
                </div>
              </div>

              <a
                href="tel:+919326709970"
                className="shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#30534A] text-white text-xs font-bold hover:bg-[#203831] transition-all flex items-center gap-1.5"
              >
                <Phone size={12} className="text-[#C9862b]" />
                Inquire
              </a>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Counter Cards */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-[#30534A]/15 group">
              <img
                src="/aboutUs.webp"
                alt="Mahalaxmi Nagar 51 Anaya Community"
                className="w-full h-56 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <div className="inline-block bg-[#C9862b] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                  Direct Developer Guidance
                </div>
                <h4
                  className="text-white text-base sm:text-xl font-bold drop-shadow-md mb-0.5 sm:mb-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Direct Developer Sales Desk • Mahalaxmi Infra
                </h4>
                <p className="text-[10px] sm:text-xs text-white/80">
                  MahaRERA: PP1190002602003 • Dedicated Assistance from Site Selection to Registration
                </p>
              </div>
            </div>

            {/* Township Quantitative Counters: 4 in 1 Row on Mobile */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-[#30534A]/5 border border-[#30534A]/12 text-center"
                >
                  <div
                    className="text-base sm:text-3xl font-extrabold text-[#30534A]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-[8px] sm:text-[11px] font-bold text-[#C9862b] uppercase tracking-wider mt-0.5 truncate">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}