"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Award, Users, Building2, CheckCircle2, TrendingUp, Shield } from "lucide-react"

const TARGETS = { projects: 9, clients: 1000, years: 13, sqft: 500 } as const
const DURATION = 2000
const STEPS = 60

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, sqft: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const animatedRef = useRef(false)

  const animateCounters = useCallback(() => {
    if (animatedRef.current) return
    animatedRef.current = true
    const interval = DURATION / STEPS
    let cur = { projects: 0, clients: 0, years: 0, sqft: 0 }
    timerRef.current = setInterval(() => {
      cur.projects = Math.min(cur.projects + TARGETS.projects / STEPS, TARGETS.projects)
      cur.clients  = Math.min(cur.clients  + TARGETS.clients  / STEPS, TARGETS.clients)
      cur.years    = Math.min(cur.years    + TARGETS.years    / STEPS, TARGETS.years)
      cur.sqft     = Math.min(cur.sqft     + TARGETS.sqft     / STEPS, TARGETS.sqft)
      setCounters({
        projects: Math.floor(cur.projects),
        clients:  Math.floor(cur.clients),
        years:    Math.floor(cur.years),
        sqft:     Math.floor(cur.sqft),
      })
      if (cur.projects >= TARGETS.projects && cur.clients >= TARGETS.clients && cur.years >= TARGETS.years && cur.sqft >= TARGETS.sqft) {
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
    { icon: Award,        text: "RERA Registered"       },
    { icon: Shield,       text: "NMRDA Sanctioned"      },
    { icon: CheckCircle2, text: "Clear Legal Titles"    },
    { icon: Building2,    text: "Bank Finance Eligible" },
    { icon: TrendingUp,   text: "Transparent Pricing"   },
    { icon: Users,        text: "Free Site Visits"      },
  ], [])

  const stats = useMemo(() => [
    { value: counters.projects, suffix: "+",  label: "Locations",        icon: Building2  },
    { value: counters.clients,  suffix: "+",  label: "Happy Families",   icon: Users      },
    { value: counters.years,    suffix: "+",  label: "Years Experience", icon: Award      },
    { value: counters.sqft,     suffix: "K+", label: "Sq.Ft Delivered",  icon: TrendingUp },
  ], [counters])

  const trust = useMemo(() => [
    { icon: Shield,       label: "NMRDA Sanctioned" },
    { icon: CheckCircle2, label: "RERA Approved — A50500037880" },
    { icon: Award,        label: "Since 2011" },
  ], [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section relative overflow-hidden"
    >
      {/* Decorative vertical stripe */}
      <div className="about-gradient-bar absolute top-0 left-0 bottom-0 w-1.5" />

      {/* Watermark */}
      <div className="about-watermark absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block">
        INFRA
      </div>

      {/* Top strip */}
      <div
        className="about-header flex items-center gap-4 px-5 sm:px-10 lg:px-24 py-5"
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
          About Us
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.12)" }} />
      </div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 pt-10 pb-0 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

          {/* ── LEFT ── */}
          <div
            className={`lg:pr-16 pb-10 lg:pb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "0ms", willChange: "transform, opacity" }}
          >
            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                /* Near-black base — no ambiguity on any background */
                color: "#0d1f1a",
              }}
            >
              Nagpur's Leading
              <br />
              {/* Green highlight */}
              <span style={{ color: "#30534A" }}>Real Estate</span>{" "}
              {/* Orange outlined */}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Developer</span>
            </h2>

            {/* Image */}
            <div
              className="group relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <img
                  src="/aboutUs.webp"
                  alt="Mahalaxmi Infra Premium Projects"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={600}
                />
              </div>

              {/* Dark overlay so badges always readable */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,15,10,0.72) 0%, rgba(5,15,10,0.18) 55%, transparent 100%)",
                }}
              />

              {/* RERA badge — bottom left */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid rgba(201,134,43,0.30)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                }}
              >
                <Award size={13} style={{ color: "#C9862b", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#0d1f1a",
                    letterSpacing: "0.05em",
                  }}
                >
                  RERA Approved
                </span>
              </div>

              {/* Years badge — bottom right */}
              <div
                className="absolute bottom-4 right-4 flex flex-col items-center justify-center rounded-xl px-4 py-2"
                style={{
                  background: "#30534A",
                  border: "1px solid rgba(201,134,43,0.30)",
                  boxShadow: "0 2px 12px rgba(48,83,74,0.40)",
                  minWidth: "60px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#C9862b",
                    lineHeight: 1,
                  }}
                >
                  13
                </span>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Years
                </span>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{ background: "rgba(48,83,74,0.12)", width: "1px" }}
          />

          {/* Horizontal divider (mobile) */}
          <div
            className="lg:hidden w-full"
            style={{ height: "1px", background: "rgba(48,83,74,0.12)", margin: "0.5rem 0" }}
          />

          {/* ── RIGHT ── */}
          <div
            className={`lg:pl-16 pb-10 lg:pb-14 lg:pt-[6.5rem] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "150ms", willChange: "transform, opacity" }}
          >
            {/* Body copy — near-black, high contrast */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                lineHeight: 1.85,
                color: "#1a2e28",
                marginBottom: "1rem",
              }}
            >
              {/* Brand name — bold green */}
              <strong style={{ color: "#30534A", fontWeight: 700 }}>Mahalaxmi Infra</strong>
              {" "}— also known as Mahalaxmi Developers and Mahalaxmi Developer Pvt Ltd — has been building trust across Nagpur since 2011.
              We deliver NMRDA &amp; RERA approved residential plots that are legally clear, bank-finance eligible, and perfectly located.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                lineHeight: 1.85,
                color: "#1a2e28",
                marginBottom: "1.75rem",
              }}
            >
              All projects are{" "}
              {/* Orange highlight inline */}
              <strong style={{ color: "#C9862b", fontWeight: 700 }}>RERA registered</strong>
              {" "}(MAHA RERA No. A50500037880) and NMRDA sanctioned — with transparent pricing, clear titles, and no hidden charges.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-200"
                    style={{
                      background: "rgba(48,83,74,0.08)",
                      border: "1px solid rgba(48,83,74,0.20)",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(48,83,74,0.14)"
                      e.currentTarget.style.borderColor = "rgba(201,134,43,0.45)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(48,83,74,0.08)"
                      e.currentTarget.style.borderColor = "rgba(48,83,74,0.20)"
                    }}
                  >
                    <Icon size={12} style={{ color: "#C9862b", flexShrink: 0 }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        /* Dark green — readable on pale green bg */
                        color: "#1a3d34",
                      }}
                    >
                      {f.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                const isDark = i % 2 === 0
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl p-4"
                    style={{
                      background: isDark ? "#30534A" : "#ffffff",
                      border: isDark
                        ? "1.5px solid #30534A"
                        : "1.5px solid rgba(48,83,74,0.16)",
                      boxShadow: isDark
                        ? "0 4px 18px rgba(48,83,74,0.30)"
                        : "0 2px 10px rgba(48,83,74,0.08)",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: isDark ? "rgba(201,134,43,0.18)" : "rgba(48,83,74,0.08)",
                        border: isDark ? "1px solid rgba(201,134,43,0.30)" : "1px solid rgba(48,83,74,0.14)",
                      }}
                    >
                      <Icon size={16} style={{ color: isDark ? "#C9862b" : "#30534A" }} />
                    </div>
                    <div className="min-w-0">
                      {/* Stat number */}
                      <div
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                          fontWeight: 800,
                          lineHeight: 1,
                          marginBottom: "2px",
                          /* Orange number on both dark-green and white cards */
                          color: "#C9862b",
                        }}
                      >
                        {stat.value.toLocaleString()}
                        <span style={{ fontSize: "0.75em" }}>{stat.suffix}</span>
                      </div>
                      {/* Stat label */}
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11.5px",
                          fontWeight: 600,
                          letterSpacing: "0.03em",
                          /* White on dark card, dark-green on white card */
                          color: isDark ? "#ffffff" : "#1a3d34",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <a
                href="tel:+919326709970"
                className="group inline-flex items-center gap-2 font-bold text-sm rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  padding: "13px 28px",
                  background: "#C9862b",
                  color: "#ffffff",
                  boxShadow: "0 4px 20px rgba(201,134,43,0.40)",
                  border: "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b5741f"
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(201,134,43,0.55)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#C9862b"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,134,43,0.40)"
                }}
              >
                Call Mahalaxmi Infra Now
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div
        className={`mt-0 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          transitionDelay: "400ms",
          marginTop: "0",
          borderTop: "1px solid rgba(48,83,74,0.12)",
          background: "rgba(48,83,74,0.04)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 py-5 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:justify-between">
          {trust.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2.5"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(201,134,43,0.12)",
                    border: "1px solid rgba(201,134,43,0.25)",
                  }}
                >
                  <Icon size={13} style={{ color: "#C9862b" }} />
                </div>
                {/* Trust label — dark green, fully readable on pale strip */}
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "#1a3d34",
                  }}
                >
                  {t.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}