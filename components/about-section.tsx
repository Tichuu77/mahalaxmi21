"use client"

import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react"
import { Award, Users, TrendingUp, Building2, Shield, CheckCircle2, ArrowRight, Play } from "lucide-react"

const TARGETS = { projects: 70, clients: 17000, years: 13, sqft: 500 }

// Mobile stat card component
const MobileStatCard = memo(({ stat, index, visible }: { stat: any; index: number; visible: boolean }) => {
  const Icon = stat.icon
  return (
    <div className={`about-v2__stat-card stagger-item ${visible ? "on" : ""} s${index}`}>
      <div className="about-v2__stat-icon">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div className="about-v2__stat-content">
        <div className="about-v2__stat-value">{stat.value.toLocaleString()}{stat.suffix}</div>
        <div className="about-v2__stat-label">{stat.label}</div>
      </div>
    </div>
  )
})
MobileStatCard.displayName = "MobileStatCard"

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
      const p = Math.min(step / STEPS, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCounters({
        projects: Math.round(TARGETS.projects * ease),
        clients:  Math.round(TARGETS.clients  * ease),
        years:    Math.round(TARGETS.years    * ease),
        sqft:     Math.round(TARGETS.sqft     * ease),
      })
      if (step >= STEPS) { clearInterval(timerRef.current!); setCounters(TARGETS) }
    }, 30)
  }, [])

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasAnimated.current) { hasAnimated.current = true; setIsVisible(true); animateCounters() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => { obs.disconnect(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [animateCounters])

  const features = useMemo(() => [
    { icon: Award,        text: "Premium Materials",    desc: "High-quality construction materials" },
    { icon: Users,        text: "Expert Craftsmanship", desc: "Skilled professionals at every step" },
    { icon: Shield,       text: "Quality Assurance",    desc: "Rigorous quality control standards" },
    { icon: CheckCircle2, text: "Timely Delivery",      desc: "Projects delivered on schedule" },
    { icon: TrendingUp,   text: "Value Appreciation",   desc: "Strategic locations for growth" },
    { icon: Building2,    text: "Modern Architecture",  desc: "Contemporary design principles" },
  ], [])

  const stats = useMemo(() => [
    { value: counters.projects, suffix: "+",  label: "Completed Projects", icon: Building2  },
    { value: counters.clients,  suffix: "+",  label: "Happy Families",     icon: Users      },
    { value: counters.years,    suffix: "+",  label: "Years Experience",   icon: Award      },
    { value: counters.sqft,     suffix: "K+", label: "Sq.Ft Delivered",    icon: TrendingUp },
  ], [counters])

  const trust = useMemo(() => [
    { icon: Shield,       label: "NMRDA Sanctioned" },
    { icon: CheckCircle2, label: "RERA Approved"    },
    { icon: Award,        label: "ISO Certified"    },
  ], [])

  const vis = isVisible

  return (
    <section id="about" ref={sectionRef} aria-label="About Mahalaxmi Infra" className="about-v2">
      {/* Decorative background */}
      <div className="about-v2__bg">
        <div className="about-v2__bg-pattern" />
        <div className="about-v2__bg-gradient" />
      </div>

      {/* Header Strip */}
      <div className="about-v2__header-strip">
        <div className="about-v2__header-inner">
          <div className="about-v2__header-badge">
            <span className="about-v2__header-badge-dot" />
            <span>About Us</span>
          </div>
          <span className="about-v2__header-since">Since 2012</span>
        </div>
      </div>

      <div className="about-v2__inner">
        {/* Section Header */}
        <div className={`about-v2__section-header rv ${vis ? "on" : ""} d0`}>
          <h2 className="about-v2__title">
            Building <em>Dreams</em> Into Reality
          </h2>
          <p className="about-v2__subtitle">
            Nagpur&apos;s most trusted name in NMRDA sanctioned and RERA approved residential plots. 
            With 70+ completed projects and 17,000+ families settled, we&apos;ve turned land into lifestyles for over a decade.
          </p>
        </div>

        {/* Stats Row - Horizontal Scroll on Mobile */}
        <div className={`about-v2__stats-scroll rv ${vis ? "on" : ""} d1`}>
          {stats.map((stat, index) => (
            <MobileStatCard key={stat.label} stat={stat} index={index} visible={vis} />
          ))}
        </div>

        {/* Features Grid */}
        <div className={`about-v2__features rv ${vis ? "on" : ""} d2`}>
          <div className="about-v2__features-header">
            <div className="about-v2__features-line" />
            <span className="about-v2__features-label">Why Families Trust Us</span>
          </div>
          <div className="about-v2__features-grid">
            {features.map(({ icon: Icon, text, desc }, index) => (
              <div key={text} className={`about-v2__feature stagger-item ${vis ? "on" : ""} s${index}`}>
                <div className="about-v2__feature-icon">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div className="about-v2__feature-content">
                  <h4 className="about-v2__feature-title">{text}</h4>
                  <p className="about-v2__feature-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges + CTA */}
        <div className={`about-v2__bottom rv ${vis ? "on" : ""} d3`}>
          <div className="about-v2__trust-badges">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="about-v2__trust-badge">
                <Icon size={14} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          
          <div className="about-v2__cta-group">
            <a href="#projects" className="about-v2__cta-primary">
              <span>Explore Projects</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="about-v2__cta-secondary">
              <Play size={16} aria-hidden="true" />
              <span>Schedule Visit</span>
            </a>
          </div>
        </div>

        {/* RERA Note */}
        <div className={`about-v2__rera rv ${vis ? "on" : ""} d4`}>
          <div className="about-v2__rera-dot" />
          <span>MAHA RERA NO. A50500044725 | ISO Certified | 70+ Completed Projects</span>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="about-v2__trust-bar">
        <div className="about-v2__trust-bar-inner">
          <span className="about-v2__trust-bar-label">Building landmarks since 2012</span>
          <div className="about-v2__trust-bar-items">
            {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map(label => (
              <div key={label} className="about-v2__trust-bar-item">
                <span className="about-v2__trust-bar-dot" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
