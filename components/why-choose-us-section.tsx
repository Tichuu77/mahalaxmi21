"use client"

import { Check, ShieldCheck, TrendingUp, Sparkles, Phone, Award, Building, Compass, Lightbulb, MapPin, Landmark } from "lucide-react"

const reasons = [
  {
    icon: Landmark,
    title: "Samruddhi Expressway Junction",
    description: "Located directly at Mouza Sumthana, touching the Samruddhi Mahamarg Corridor — Nagpur's highest appreciation investment belt.",
    stat: "7 Mins",
    statLabel: "To MIHAN SEZ",
  },
  {
    icon: Award,
    title: "100% NMRDA & MahaRERA Sanctioned",
    description: "Fully approved under MahaRERA PP1190002602003 with sanctioned RL layout. Absolute safety and clear title guarantee.",
    stat: "100%",
    statLabel: "RL Clear Title",
  },
  {
    icon: TrendingUp,
    title: "Up to 90% Bank Finance Approved",
    description: "Pre-approved by leading nationalized and private banks including SBI, HDFC, ICICI, and Bank of Baroda for smooth loan processing.",
    stat: "90%",
    statLabel: "Loan Available",
  },
  {
    icon: Compass,
    title: "Clear Title & Instant Registration",
    description: "Free of any legal encumbrances with verified RL release. Buyers receive transparent paperwork, registry support, and clear demarcation.",
    stat: "524",
    statLabel: "Sanctioned Plots",
  },
  {
    icon: Lightbulb,
    title: "Attractive Entry from ₹35.4 Lakh*",
    description: "Plot sizes from 1,130 to 5,000 sq.ft at competitive per-square-foot rates. Token booking starts from just ₹51,000.",
    stat: "₹35.4L",
    statLabel: "Starting Price",
  },
  {
    icon: ShieldCheck,
    title: "Direct Developer Booking Desk",
    description: "Direct booking with Mahalaxmi Infra — zero brokerage, guaranteed transparent pricing, and comprehensive end-to-end registry assistance.",
    stat: "13+",
    statLabel: "Years Infra Trust",
  },
]

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="why-choose-us-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#f8faf9" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            INVESTMENT HIGHLIGHTS
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2 sm:mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Why Invest in <span className="text-[#30534A]">Mahalaxmi Nagar 51</span> <span className="text-[#C9862b]">Anaya?</span>
          </h2>

          <p className="text-xs sm:text-base text-[#555] leading-relaxed">
            Plotted land along the Samruddhi Expressway corridor offers the strongest capital appreciation in Nagpur.
            Here is why Anaya is Nagpur’s standout plotted community for builders and homeowners.
          </p>
        </div>

        {/* Reasons Grid: 2 Cards per Row on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-10 sm:mb-14">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="group p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#30534A]/12 shadow-xs sm:shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-[#30534A]/8 border border-[#30534A]/15 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={18} className="text-[#C9862b]" />
                    </div>

                    <div className="text-right">
                      <span
                        className="text-base sm:text-xl font-extrabold text-[#30534A] block leading-none"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {r.stat}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-[#888] font-bold uppercase truncate block">{r.statLabel}</span>
                    </div>
                  </div>

                  <h3
                    className="text-xs sm:text-lg font-bold text-[#0d0d0d] mb-1 sm:mb-2 group-hover:text-[#30534A] transition-colors leading-snug line-clamp-1 sm:line-clamp-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {r.title}
                  </h3>

                  <p className="text-[11px] sm:text-sm text-[#666] leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {r.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#30534A]/8 flex items-center gap-1 text-[9px] sm:text-xs font-semibold text-[#30534A]">
                  <Check size={12} className="text-[#C9862b] shrink-0" />
                  <span className="truncate">Developer Verified</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}