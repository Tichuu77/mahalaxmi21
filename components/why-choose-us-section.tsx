"use client"

import { Check, Zap, Trophy, Users, Heart, Lightbulb } from "lucide-react"
import { useEffect, useRef, useState, useCallback, memo } from "react"

const reasons = [
  { icon: Trophy,    title: "NMRDA & RERA Approved",         description: "Every Mahalaxmi Infra plot is legally approved, NMRDA sanctioned, and RERA registered — protecting your investment 100%.",             stat: "100%", statLabel: "RERA Approved" },
  { icon: Zap,       title: "Up to 90% Bank Finance",        description: "All Mahalaxmi Developer Nagpur projects are eligible for bank loans from SBI, HDFC, ICICI, and all major banks.",                      stat: "90%",  statLabel: "Finance"       },
  { icon: Users,     title: "Prime Nagpur Locations",        description: "Plots near MIHAN, AIIMS, IIM, Samruddhi Mahamarg, Wardha Road, Besa — Nagpur's fastest-growing investment zones.",                     stat: "9+",   statLabel: "Locations"     },
  { icon: Heart,     title: "Clear Title & Quick Possession",description: "Fully developed, ready-to-register plots with clear titles and zero legal complications.",                                             stat: "70+",  statLabel: "Projects"      },
  { icon: Lightbulb, title: "Transparent Pricing",           description: "Mahalaxmi Infra price list starting from ₹22 Lakh. No hidden costs, no surprise charges — what you see is what you pay.",             stat: "₹22L", statLabel: "Starting From" },
  { icon: Check,     title: "13 Years of Trust",             description: "Mahalaxmi Developer Pvt Ltd has a proven track record since 2011 — 70+ completed projects, 17,000+ satisfied families across Nagpur.", stat: "13+",  statLabel: "Years"         },
]

const trackRecord = [
  "13+ years industry experience",
  "17,000+ satisfied families",
  "70+ completed projects",
]

const support = [
  "Free site visit assistance",
  "Transparent documentation process",
  "No hidden charges, clear titles",
]

const BAR_WIDTHS = reasons.map((_, i) => `${30 + i * 12}%`)

const CheckItem = memo(({ text, gold }: { text: string; gold?: boolean }) => (
  <li className="flex items-start gap-2.5">
    <span
      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{
        background: gold ? "rgba(201,134,43,0.14)" : "rgba(48,83,74,0.10)",
        border: `1px solid ${gold ? "rgba(201,134,43,0.35)" : "rgba(48,83,74,0.28)"}`,
      }}
    >
      <Check size={9} style={{ color: gold ? "#C9862b" : "#30534A" }} />
    </span>
    {/* Explicit dark text — never relying on a CSS class */}
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        color: "#1a2e28",
        lineHeight: 1.55,
      }}
    >
      {text}
    </span>
  </li>
))
CheckItem.displayName = "CheckItem"

const DesktopReasonRow = memo(({ reason, index, isActive, onEnter, onLeave }: {
  reason: typeof reasons[number]
  index: number
  isActive: boolean
  onEnter: (i: number) => void
  onLeave: () => void
}) => {
  const Icon = reason.icon
  const handleEnter = useCallback(() => onEnter(index), [onEnter, index])

  return (
    <div
      className="group grid grid-cols-[48px_1fr_auto] items-center gap-6 lg:gap-10 py-5 cursor-default transition-all duration-250"
      style={{
        borderBottom: "1px solid rgba(48,83,74,0.10)",
        background: isActive ? "rgba(48,83,74,0.04)" : "transparent",
        borderRadius: isActive ? "12px" : "0",
        paddingLeft: isActive ? "12px" : "0",
        paddingRight: isActive ? "12px" : "0",
        marginLeft: isActive ? "-12px" : "0",
        marginRight: isActive ? "-12px" : "0",
        transition: "all 0.22s ease",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={onLeave}
    >
      {/* Row number */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
          fontWeight: 800,
          tabularNums: "tabular-nums",
          lineHeight: 1,
          /* Orange when active, muted green when not */
          color: isActive ? "#C9862b" : "rgba(48,83,74,0.22)",
          transition: "color 0.2s",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-5">
        {/* Icon bubble */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-250"
          style={{
            background: isActive ? "#30534A" : "rgba(48,83,74,0.08)",
            border: isActive ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
          }}
        >
          <Icon size={17} style={{ color: isActive ? "#C9862b" : "#30534A" }} />
        </div>

        <div>
          {/* Row title — near-black always, orange when active */}
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "3px",
              color: isActive ? "#C9862b" : "#0d1f1a",
              transition: "color 0.2s",
            }}
          >
            {reason.title}
          </h3>
          {/* Description — dark, never washed out */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              lineHeight: 1.65,
              color: "#3d5a52",
              margin: 0,
            }}
          >
            {reason.description}
          </p>
        </div>
      </div>

      {/* Stat — right side */}
      <div
        className="shrink-0 text-right transition-all duration-250"
        style={{ opacity: isActive ? 1 : 0.40 }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
            fontWeight: 800,
            lineHeight: 1,
            color: "#C9862b",
          }}
        >
          {reason.stat}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#30534A",
            marginTop: "2px",
          }}
        >
          {reason.statLabel}
        </div>
      </div>
    </div>
  )
})
DesktopReasonRow.displayName = "DesktopReasonRow"

const MobileReasonCard = memo(({ reason, index }: { reason: typeof reasons[number]; index: number }) => {
  const Icon = reason.icon
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-all duration-200"
      style={{
        background: "#ffffff",
        border: "1.5px solid rgba(48,83,74,0.14)",
        boxShadow: "0 2px 12px rgba(48,83,74,0.08)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Icon bubble */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(48,83,74,0.09)",
            border: "1px solid rgba(48,83,74,0.16)",
          }}
        >
          <Icon size={15} style={{ color: "#30534A" }} />
        </div>
        {/* Stat */}
        <div className="text-right">
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              lineHeight: 1,
              color: "#C9862b",
            }}
          >
            {reason.stat}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "#30534A",
              marginTop: "1px",
            }}
          >
            {reason.statLabel}
          </div>
        </div>
      </div>

      <div>
        {/* Card title — dark, readable */}
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#0d1f1a",
            marginBottom: "4px",
          }}
        >
          {reason.title}
        </h3>
        {/* Card description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11.5px",
            lineHeight: 1.65,
            color: "#3d5a52",
            margin: 0,
          }}
        >
          {reason.description}
        </p>
      </div>

      {/* Progress bar — orange */}
      <div
        className="h-[2px] rounded-full"
        style={{ width: BAR_WIDTHS[index], background: "#C9862b", opacity: 0.55 }}
      />
    </div>
  )
})
MobileReasonCard.displayName = "MobileReasonCard"

export function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
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

  const handleEnter = useCallback((i: number) => setActiveCard(i), [])
  const handleLeave = useCallback(() => setActiveCard(null), [])

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative overflow-hidden"
      style={{ background: "#f7f4ef" }}
    >
      {/* Left accent stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Warm glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.07) 0%, transparent 70%)" }}
      />

      {/* Label strip */}
      <div
        className="flex items-center gap-4 pl-8 pr-6 sm:pl-16 sm:pr-10 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.12)" }}
      >
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#C9862b",
          }}
        >
          Why Mahalaxmi Infra
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.12)" }} />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(48,83,74,0.45)",
          }}
        >
          The Difference We Make
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-6 sm:pl-16 sm:pr-10 lg:px-24 pt-12 pb-20 relative z-10">

        {/* ── Header + intro ── */}
        <div
          className={`grid lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-0 mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Left — heading + sub */}
          <div className="lg:pr-14">
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1rem",
                color: "#0d1f1a",
              }}
            >
              Why 17,000+ Families
              <br />
              {/* Dark green "Chose" */}
              <span style={{ color: "#30534A" }}>Chose</span>{" "}
              {/* Orange outlined "Mahalaxmi" */}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Mahalaxmi</span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                lineHeight: 1.8,
                /* Boosted from muted grey class — clearly readable */
                color: "#3d5a52",
                maxWidth: "400px",
                margin: 0,
              }}
            >
              From Mahalaxmi Infra site visit to possession — every step is handled with transparency and care.
            </p>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{ background: "rgba(48,83,74,0.12)", width: "1px" }}
          />

          {/* Right — checklists */}
          <div className="lg:pl-14 grid sm:grid-cols-2 gap-6">
            <div>
              {/* Section label */}
              <h4
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9862b",
                  marginBottom: "1rem",
                }}
              >
                Track Record
              </h4>
              <ul className="space-y-3">
                {trackRecord.map(item => <CheckItem key={item} text={item} gold />)}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#30534A",
                  marginBottom: "1rem",
                }}
              >
                Our Support
              </h4>
              <ul className="space-y-3">
                {support.map(item => <CheckItem key={item} text={item} />)}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Reasons ── */}
        <div
          className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Desktop rows */}
          <div className="hidden md:block divide-y divide-[rgba(48,83,74,0.08)]">
            {reasons.map((r, i) => (
              <DesktopReasonRow
                key={r.title}
                reason={r}
                index={i}
                isActive={activeCard === i}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {reasons.map((r, i) => (
              <MobileReasonCard key={r.title} reason={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}