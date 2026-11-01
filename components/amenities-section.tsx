"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users, Sparkles, Phone, Award } from "lucide-react"
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"

const amenities = [
  { icon: Award,    title: "Grand Clubhouse",    description: "Multi-level community lifestyle hub with luxury banquet and indoor lounge.", category: "lifestyle" },
  { emoji: "🏊",    title: "Swimming Pool",      description: "Olympic-length pool with separate dedicated shallow children's splash pool.", category: "wellness"  },
  { emoji: "🏏",    title: "Box Cricket Turf",   description: "Floodlit artificial turf designed for competitive and leisure cricket matches.", category: "sports"    },
  { emoji: "⚽",    title: "Football Sports Turf",description: "Professional turf ground for football, soccer drills, and outdoor games.",    category: "sports"    },
  { icon: Dumbbell, title: "Modern Gymnasium",   description: "Equipped with state-of-the-art cardio machines and strength training weights.",category: "wellness"  },
  { emoji: "👶",    title: "Crèche / Day Care",  description: "Safe and supervised modern day-care facility for working township parents.",   category: "lifestyle" },
  { icon: Trees,    title: "Central Green Lawns",description: "Expansive manicured floral parks, shaded gazebo pavilions, and gardens.",    category: "wellness"  },
  { emoji: "🛝",    title: "Kids' Play Wonderland",description: "Modern adventure play equipment with rubberized safety flooring.",         category: "lifestyle" },
  { emoji: "🧓",    title: "Senior Citizen Plaza",description: "Quiet relaxation seating, reflexology walking tracks, and morning yoga lawns.", category: "wellness"  },
  { icon: Zap,      title: "Underground Cabling", description: "Zero overhead wires with modern subterranean electrical conduit and LED lights.", category: "infrastructure" },
  { emoji: "🛣️",    title: "Cement Concrete Roads",description: "Heavy-duty 9m, 12m, and 18m wide internal paved avenues with tree margins.",category: "infrastructure" },
  { icon: Shield,   title: "24/7 Gated Security", description: "Grand entrance archway with boom barriers, CCTV surveillance, and guards.",category: "infrastructure" },
]

const categories = [
  { key: "all",            label: "All 30+ Amenities" },
  { key: "sports",         label: "Sports & Turfs"    },
  { key: "wellness",       label: "Wellness & Pool"   },
  { key: "lifestyle",      label: "Club & Family"     },
  { key: "infrastructure", label: "Infrastructure"    },
]

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState("all")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filteredAmenities = useMemo(() => {
    if (activeTab === "all") return amenities
    return amenities.filter((a) => a.category === activeTab)
  }, [activeTab])

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="amenities-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            RESORT LIVING EVERY DAY
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2 sm:mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Over 30+ Curated <span className="text-[#30534A]">Lifestyle</span> <span className="text-[#C9862b]">Amenities</span>
          </h2>

          <p className="text-xs sm:text-base text-[#555] leading-relaxed">
            Elevating everyday plotted living with clubhouse infrastructure,
            sports turfs, Olympic pool, and childcare conveniences.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 sm:flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveTab(c.key)}
              className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  activeTab === c.key
                    ? "linear-gradient(135deg, #30534A, #213c35)"
                    : "rgba(48,83,74,0.06)",
                color: activeTab === c.key ? "#ffffff" : "#30534A",
                border: activeTab === c.key ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                boxShadow: activeTab === c.key ? "0 4px 15px rgba(48,83,74,0.25)" : "none",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Amenities Cards Grid: 2 Cards per Row on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-16">
          {filteredAmenities.map((item, index) => {
            const Icon = (item as any).icon
            return (
              <div
                key={item.title}
                className="group p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#30534A]/12 shadow-xs sm:shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  transitionDelay: isVisible ? `${index * 30}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div>
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mb-2.5 sm:mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[#30534A]/8 border border-[#30534A]/15">
                    {(item as any).emoji ? (
                      <span className="text-xl sm:text-2xl">{item.emoji}</span>
                    ) : (
                      <Icon size={20} className="text-[#C9862b]" />
                    )}
                  </div>

                  <h3
                    className="text-xs sm:text-lg font-bold text-[#0d0d0d] mb-1 sm:mb-2 group-hover:text-[#30534A] transition-colors leading-snug line-clamp-1 sm:line-clamp-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-sm text-[#666] leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#30534A]/8 flex items-center justify-between text-[9px] sm:text-[11px]">
                  <span className="text-[#30534A] font-semibold uppercase tracking-wider text-[8px] sm:text-[10px] truncate">
                    Township Ready
                  </span>
                  <span className="text-[#C9862b] font-bold whitespace-nowrap">100% Ready</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}