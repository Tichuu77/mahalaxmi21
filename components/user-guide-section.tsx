"use client"

import { ChevronDown, Home, Calendar, Briefcase, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef, useCallback, memo } from "react"

const guides = [
  {
    number: "01",
    title: "Explore Properties",
    description: "Browse our extensive collection of premium residential and commercial properties in Nagpur.",
    icon: Home,
    details: [
      "Filter properties by location, price, and amenities",
      "Save your favourite properties to a wishlist",
      "Compare multiple plots side by side",
    ],
  },
  {
    number: "02",
    title: "Schedule Site Visit",
    description: "Book a personalised site visit with our expert consultants to experience the property firsthand.",
    icon: Calendar,
    details: [
      "Select your preferred date and time",
      "Our team confirms your visit within 24 hours",
      "Receive directions and consultant contact details",
    ],
  },
  {
    number: "03",
    title: "Consultation & Financing",
    description: "Get expert advice on financing options and investment benefits from our experienced team.",
    icon: Briefcase,
    details: [
      "Discuss investment strategies with our experts",
      "Explore financing and payment plan options",
      "Get personalised financial guidance",
    ],
  },
  {
    number: "04",
    title: "Complete Purchase",
    description: "Finalise your investment with our transparent, hassle-free documentation process.",
    icon: CheckCircle,
    details: [
      "Sign all required legal documents",
      "Complete payment processing securely",
      "Receive your property documentation",
    ],
  },
]

const tips = [
  { emoji: "💡", label: "Pro Tip",       text: "Visit plots at different times of day — morning light and evening atmosphere matter." },
  { emoji: "🎯", label: "Best Practice", text: "Review all legal documents carefully and ask our experts for any clarifications." },
  { emoji: "📞", label: "Support",       text: "Our team is reachable anytime — we're with you at every step of the journey." },
]

const DetailList = memo(({ details, size = "sm" }: { details: string[]; size?: "sm" | "xs" }) => (
  <ul className={size === "sm" ? "space-y-3" : "space-y-2"}>
    {details.map((d, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span
          className={`${size === "sm" ? "w-5 h-5" : "w-4 h-4"} rounded-full flex items-center justify-center shrink-0 mt-0.5`}
          style={{
            background: "rgba(201,134,43,0.1)",
            border: "1px solid rgba(201,134,43,0.25)",
            boxShadow: "0 0 6px rgba(201,134,43,0.1)",
          }}
        >
          {size === "sm"
            ? <CheckCircle size={11} style={{ color: "#C9862b" }} />
            : <span className="w-1 h-1 rounded-full" style={{ background: "#C9862b", display: "block" }} />
          }
        </span>
        <span
          className={`${size === "sm" ? "text-sm" : "text-xs"} leading-relaxed`}
          style={{ color: size === "sm" ? "#555" : "#666", fontFamily: "'Inter', sans-serif" }}
        >
          {d}
        </span>
      </li>
    ))}
  </ul>
))
DetailList.displayName = "DetailList"

const ActiveStepPanel = memo(({ guide }: { guide: typeof guides[number] }) => {
  const Icon = guide.icon
  return (
    <div
      className="rounded-2xl p-8 mb-6 relative overflow-hidden"
      style={{
        background: "rgba(48,83,74,0.04)",
        border: "1px solid rgba(201,134,43,0.25)",
        boxShadow: "0 0 0 1px rgba(201,134,43,0.08), 0 8px 32px rgba(48,83,74,0.1)",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-15%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,134,43,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="flex items-start justify-between mb-6" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)",
            boxShadow: "0 4px 16px rgba(48,83,74,0.3), 0 0 0 1px rgba(201,134,43,0.15)",
          }}
        >
          <Icon size={24} style={{ color: "#C9862b" }} />
        </div>
        <span
          className="font-bold tabular-nums"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "4rem",
            lineHeight: 1,
            color: "rgba(48,83,74,0.08)",
            textShadow: "0 0 30px rgba(201,134,43,0.15)",
          }}
        >
          {guide.number}
        </span>
      </div>

      <h3
        className="font-bold mb-2 text-[#0d0d0d]"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.4rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {guide.title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "#777", fontFamily: "'Inter', sans-serif", position: "relative", zIndex: 1 }}
      >
        {guide.description}
      </p>
      <div style={{ position: "relative", zIndex: 1 }}>
        <DetailList details={guide.details} size="sm" />
      </div>
    </div>
  )
})
ActiveStepPanel.displayName = "ActiveStepPanel"

const GuideStep = memo(({ guide, index, isOpen, onToggle }: {
  guide: typeof guides[number]
  index: number
  isOpen: boolean
  onToggle: (i: number) => void
}) => {
  const Icon = guide.icon
  const handleClick = useCallback(() => onToggle(index), [onToggle, index])
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty("--mx", `${x}%`)
    el.style.setProperty("--my", `${y}%`)
  }, [])

  return (
    <div
      className="guide-step rounded-2xl overflow-hidden transition-all duration-300"
      onMouseMove={handleMouseMove}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          border: isOpen ? "1px solid rgba(201,134,43,0.45)" : "1px solid rgba(48,83,74,0.1)",
          background: isOpen ? "#fff" : "rgba(48,83,74,0.02)",
          boxShadow: isOpen
            ? "0 0 0 1px rgba(201,134,43,0.12), 0 6px 28px rgba(48,83,74,0.12), 0 2px 8px rgba(201,134,43,0.08)"
            : "none",
          position: "relative",
          transition: "border-color 0.25s, box-shadow 0.25s",
        } as React.CSSProperties
      }
    >
      {/* Spotlight radial */}
      <div
        className="guide-spotlight"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(160px circle at var(--mx) var(--my), rgba(201,134,43,0.07) 0%, transparent 70%)",
          opacity: isOpen ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      />

      {/* Gold left edge on open */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(to bottom, #C9862b, rgba(201,134,43,0.3))",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s",
          borderRadius: "0 2px 2px 0",
          zIndex: 2,
        }}
      />

      <button
        onClick={handleClick}
        className="w-full flex items-center gap-4 text-left transition-all duration-200 active:scale-[0.99]"
        style={{ padding: "1rem 1.25rem", position: "relative", zIndex: 1 }}
      >
        <span
          className="font-bold tabular-nums shrink-0 leading-none transition-colors duration-200"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.4rem",
            color: isOpen ? "#C9862b" : "rgba(48,83,74,0.2)",
            minWidth: "36px",
            textShadow: isOpen ? "0 0 12px rgba(201,134,43,0.4)" : "none",
            transition: "color 0.2s, text-shadow 0.2s",
          }}
        >
          {guide.number}
        </span>

        <div
          className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)"
              : "rgba(48,83,74,0.08)",
            border: isOpen ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.14)",
            boxShadow: isOpen ? "0 0 14px rgba(48,83,74,0.25)" : "none",
          }}
        >
          <Icon size={16} style={{ color: isOpen ? "#C9862b" : "#30534A" }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-bold leading-tight mb-0.5 transition-colors duration-200"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.95rem",
              color: isOpen ? "#30534A" : "#0d0d0d",
            }}
          >
            {guide.title}
          </h3>
          <p className="leading-relaxed" style={{ color: "#999", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem" }}>
            {guide.description}
          </p>
        </div>

        <div
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "rgba(201,134,43,0.12)" : "rgba(48,83,74,0.06)",
            border: isOpen ? "1px solid rgba(201,134,43,0.3)" : "1px solid rgba(48,83,74,0.1)",
            boxShadow: isOpen ? "0 0 8px rgba(201,134,43,0.2)" : "none",
          }}
        >
          <ChevronDown
            size={13}
            style={{
              color: isOpen ? "#C9862b" : "rgba(48,83,74,0.35)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s, color 0.2s",
            }}
          />
        </div>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: "0.85rem 1.25rem 1.1rem 4.75rem",
            borderTop: "1px solid rgba(48,83,74,0.08)",
            background: "linear-gradient(to right, rgba(201,134,43,0.02), transparent)",
          }}
        >
          <DetailList details={guide.details} size="xs" />
        </div>
      </div>
    </div>
  )
})
GuideStep.displayName = "GuideStep"

const TipsGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
    {tips.map((tip, i) => (
      <div
        key={i}
        className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
        style={{
          background: i === 0
            ? "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)"
            : "#fff",
          border: i === 0 ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.1)",
          boxShadow: i === 0
            ? "0 4px 20px rgba(48,83,74,0.2)"
            : "0 2px 8px rgba(48,83,74,0.06)",
        }}
      >
        {/* Tip card glow orb */}
        {i === 0 && (
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,134,43,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        )}
        <div className="flex items-center gap-2.5" style={{ position: "relative", zIndex: 1 }}>
          <span className="text-xl">{tip.emoji}</span>
          <span
            className="font-bold text-xs uppercase tracking-wider"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: i === 0 ? "#C9862b" : "#30534A",
              textShadow: i === 0 ? "0 0 10px rgba(201,134,43,0.4)" : "none",
            }}
          >
            {tip.label}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: i === 0 ? "rgba(255,255,255,0.7)" : "#777",
            position: "relative",
            zIndex: 1,
          }}
        >
          {tip.text}
        </p>
      </div>
    ))}
  </div>
))
TipsGrid.displayName = "TipsGrid"

export function UserGuideSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible]         = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleToggle    = useCallback((i: number) => setExpandedIndex(prev => prev === i ? null : i), [])
  const handleStepClick = useCallback((i: number) => setExpandedIndex(i), [])

  return (
    <section ref={sectionRef} id="user-guide" className="user-guide-section relative overflow-hidden">
      <style>{`
        @keyframes headingPulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(201,134,43,0)); }
          50%       { filter: drop-shadow(0 0 16px rgba(201,134,43,0.25)); }
        }
        .guide-heading-highlight {
          animation: headingPulse 4s ease-in-out infinite;
        }
        .guide-step:hover .guide-spotlight {
          opacity: 1 !important;
        }
        .guide-count-badge {
          background: linear-gradient(135deg, rgba(201,134,43,0.15), rgba(201,134,43,0.05));
          border: 1px solid rgba(201,134,43,0.3);
          color: #C9862b;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.2em;
          padding: 3px 10px;
          border-radius: 999px;
          box-shadow: 0 0 8px rgba(201,134,43,0.12);
        }
        .guide-tips-label {
          text-shadow: 0 0 10px rgba(201,134,43,0.3);
        }
      `}</style>

      {/* Right accent stripe */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1"
        style={{
          background: "linear-gradient(to bottom, #30534A, #C9862b, #30534A)",
          boxShadow: "-2px 0 12px rgba(201,134,43,0.2)",
        }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 right-1/3 w-[450px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(48,83,74,0.07) 0%, transparent 70%)" }}
      />

      {/* Label strip */}
      <div
        className="flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase font-bold"
          style={{
            color: "#C9862b",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "0 0 12px rgba(201,134,43,0.35)",
          }}
        >
          How It Works
        </span>
        <span
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to right, rgba(201,134,43,0.3), rgba(48,83,74,0.1) 60%, transparent)",
          }}
        />
        <span className="guide-count-badge">4 Simple Steps</span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          <h2
            className="font-bold leading-tight mb-3 text-[#0d0d0d] guide-heading-highlight"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
          >
            How to{" "}
            <span
              style={{
                color: "#30534A",
                textShadow: "0 0 24px rgba(48,83,74,0.2)",
              }}
            >
              Get
            </span>{" "}
            <span
              style={{
                WebkitTextStroke: "1.5px #C9862b",
                color: "transparent",
                filter: "drop-shadow(0 0 8px rgba(201,134,43,0.25))",
              }}
            >
              Started
            </span>
          </h2>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#777", fontFamily: "'Inter', sans-serif" }}>
            Follow our simple step-by-step guide to find, visit, finance, and own your dream plot in Nagpur.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* LEFT — accordion */}
          <div
            className={`lg:pr-14 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}
          >
            {guides.map((guide, i) => (
              <GuideStep
                key={guide.number}
                guide={guide}
                index={i}
                isOpen={expandedIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(201,134,43,0.2), rgba(48,83,74,0.15), transparent)",
              width: "1px",
            }}
          />

          {/* RIGHT — active step panel */}
          <div
            className={`hidden lg:flex lg:pl-14 flex-col justify-start pt-1 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}
          >
            {expandedIndex !== null && (
              <ActiveStepPanel key={expandedIndex} guide={guides[expandedIndex]} />
            )}

            {/* Progress indicators */}
            <div className="flex items-center gap-3">
              {guides.map((g, i) => (
                <button
                  key={g.number}
                  onClick={() => handleStepClick(i)}
                  className="flex-1 h-1.5 rounded-full transition-all duration-300 active:scale-95"
                  style={{
                    background:
                      expandedIndex === i
                        ? "linear-gradient(90deg, #C9862b, #30534A)"
                        : "rgba(48,83,74,0.12)",
                    boxShadow:
                      expandedIndex === i ? "0 0 8px rgba(201,134,43,0.35)" : "none",
                  }}
                  aria-label={`Step ${g.number}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              {guides.map((g, i) => (
                <span
                  key={g.number}
                  className="text-[10px] font-bold"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: expandedIndex === i ? "#C9862b" : "rgba(48,83,74,0.25)",
                    textShadow: expandedIndex === i ? "0 0 8px rgba(201,134,43,0.35)" : "none",
                    transition: "color 0.2s, text-shadow 0.2s",
                  }}
                >
                  {g.number}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div
          className={`mt-10 sm:mt-14 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px" style={{ background: "#C9862b", boxShadow: "0 0 6px rgba(201,134,43,0.5)" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold guide-tips-label"
              style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}
            >
              Quick Tips
            </span>
          </div>
          <TipsGrid />
        </div>
      </div>
    </section>
  )
}