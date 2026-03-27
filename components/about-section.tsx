"use client"

import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react"
import { Award, Users, TrendingUp, Building2, Shield, CheckCircle2 } from "lucide-react"

const TARGETS = { projects: 70, clients: 17000, years: 13, sqft: 500 }

const features = [
  { icon: Award,        text: "Premium Materials"    },
  { icon: Users,        text: "Expert Craftsmanship" },
  { icon: Shield,       text: "Quality Assurance"    },
  { icon: CheckCircle2, text: "Timely Delivery"      },
  { icon: TrendingUp,   text: "Value Appreciation"   },
  { icon: Building2,    text: "Modern Architecture"  },
]

const trustItems = [
  { icon: Shield,       label: "NMRDA Sanctioned" },
  { icon: CheckCircle2, label: "RERA Approved"    },
  { icon: Award,        label: "ISO Certified"    },
]

export function AboutSection() {
  const [counters, setCounters] = useState({ projects: 0, clients: 0, years: 0, sqft: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const hasAnimated = useRef(false)

  const animateCounters = useCallback(() => {
    let step = 0
    const STEPS = 55
    timerRef.current = setInterval(() => {
      step++
      const p    = Math.min(step / STEPS, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCounters({
        projects: Math.round(TARGETS.projects * ease),
        clients:  Math.round(TARGETS.clients  * ease),
        years:    Math.round(TARGETS.years    * ease),
        sqft:     Math.round(TARGETS.sqft     * ease),
      })
      if (step >= STEPS) {
        clearInterval(timerRef.current!)
        setCounters(TARGETS)
      }
    }, 30)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [animateCounters])

  const stats = useMemo(() => [
    { value: counters.projects, suffix: "+",  label: "Completed Projects", icon: Building2,  dark: false },
    { value: counters.clients,  suffix: "+",  label: "Happy Families",     icon: Users,      dark: true  },
    { value: counters.years,    suffix: "+",  label: "Years Experience",   icon: Award,      dark: false },
    { value: counters.sqft,     suffix: "K+", label: "Sq.Ft Delivered",    icon: TrendingUp, dark: true  },
  ], [counters])

  const vis = isVisible

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Mahalaxmi Infra"
      className="about"
    >
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">About Us</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">Since 2012</span>
      </div>

      <div className="section-inner">
        <div className="about__layout">
          {/* ── Copy Column ── */}
          <div>
            <div className={`rv ${vis ? "on" : ""} d0 section-eyebrow`}>
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Our Story</span>
            </div>

            <h2 className={`rv ${vis ? "on" : ""} d1 section-heading`}>
              Building <em>Dreams</em><br />
              <span>Since 2012</span>
            </h2>

            <p className={`rv ${vis ? "on" : ""} d2 section-sub`}>
              Mahalaxmi Infra is Nagpur's most trusted name in NMRDA sanctioned and RERA approved
              residential plots. With 70+ completed projects and 17,000+ families settled, we've
              turned land into lifestyles for over a decade.
            </p>

            <div className={`rv ${vis ? "on" : ""} d3 about__features`} role="list" aria-label="Key features">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="about__feature" role="listitem">
                  <Icon size={13} className="about__feature-icon" aria-hidden="true" />
                  <span className="about__feature-text">{text}</span>
                </div>
              ))}
            </div>

            <div className={`rv ${vis ? "on" : ""} d4 about__trust`} aria-label="Certifications">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="about__trust-pill">
                  <Icon size={11} className="about__trust-icon" aria-hidden="true" />
                  <span className="about__trust-label">{label}</span>
                </div>
              ))}
            </div>

            <div className={`rv ${vis ? "on" : ""} d5`}>
              <a href="#projects" className="about__cta">
                Explore Our Projects
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Stats Panel ── */}
          <div className={`rv-r ${vis ? "on" : ""} d1`}>
            <div className="about__stats-header">
              <div className="about__stats-header-glow1" aria-hidden="true" />
              <div className="about__stats-header-glow2" aria-hidden="true" />
              <div className="about__stats-header-label">Our Track Record</div>
              <div className="about__stats-header-title">
                Numbers That<br /><em>Speak</em> for Us
              </div>
              <div className="about__stats-header-line" />
            </div>

            <div className="about__stats-grid" role="list" aria-label="Statistics">
              {stats.map(stat => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={`about__stat-card ${stat.dark ? "about__stat-card--dark" : "about__stat-card--light"}`}
                    role="listitem"
                  >
                    <div className={`about__stat-corner ${stat.dark ? "about__stat-corner--dark" : "about__stat-corner--light"}`} aria-hidden="true" />
                    <div className={`about__stat-icon-wrap ${stat.dark ? "about__stat-icon-wrap--dark" : "about__stat-icon-wrap--light"}`}>
                      <Icon size={16} className="about__stat-icon" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="about__stat-val">
                        {stat.value.toLocaleString()}<span>{stat.suffix}</span>
                      </div>
                      <div className={`about__stat-lbl ${stat.dark ? "about__stat-lbl--dark" : "about__stat-lbl--light"}`}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="about__rera-note">
              <div className="about__rera-dot" aria-hidden="true" />
              <span className="about__rera-text">MAHA RERA NO. A50500044725 · ISO Certified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Building landmarks since 2012</p>
          <div className="trust-bar__items" role="list">
            {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map(label => (
              <div key={label} className="trust-bar__item" role="listitem">
                <div className="trust-bar__dot" aria-hidden="true" />
                <span className="trust-bar__name">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}