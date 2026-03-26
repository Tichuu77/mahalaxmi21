"use client"

import { useEffect, useState } from "react"
import { ArrowRight, MapPin, TrendingUp, Award, Shield, CheckCircle2, Play, ChevronDown } from "lucide-react"

const STATS = [
  { value: "70+",  label: "Projects",       icon: "building" },
  { value: "17K+", label: "Families",       icon: "users"    },
  { value: "13+",  label: "Years",          icon: "calendar" },
  { value: "100%", label: "RERA Approved",  icon: "check"    },
]

const TRUST = [
  { icon: Shield,       label: "NMRDA Sanctioned" },
  { icon: CheckCircle2, label: "RERA Approved"    },
  { icon: Award,        label: "ISO Certified"    },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const L = isLoaded

  return (
    <section id="home" aria-label="Mahalaxmi Infra – Premium Plots in Nagpur" className="hero-v2">
      {/* Background layers */}
      <div className="hero-v2__bg">
        <img 
          src="/hero-bg.jpeg" 
          alt="" 
          className="hero-v2__bg-img" 
          loading="eager" 
          fetchPriority="high"
        />
        <div className="hero-v2__bg-overlay" />
        <div className="hero-v2__bg-gradient" />
      </div>

      {/* Floating decorative elements */}
      <div className="hero-v2__decor">
        <div className="hero-v2__decor-circle hero-v2__decor-circle--1" />
        <div className="hero-v2__decor-circle hero-v2__decor-circle--2" />
        <div className="hero-v2__decor-line hero-v2__decor-line--1" />
        <div className="hero-v2__decor-line hero-v2__decor-line--2" />
      </div>

      <div className="hero-v2__inner">
        {/* Top Badge */}
        <div className={`hero-v2__top-badge ${L ? "animate-in" : ""}`}>
          <div className="hero-v2__location-badge">
            <MapPin size={14} aria-hidden="true" />
            <span>Nagpur, Maharashtra</span>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="hero-v2__content">
          <h1 className={`hero-v2__title ${L ? "animate-in delay-1" : ""}`}>
            <span className="hero-v2__title-line">Premium</span>
            <span className="hero-v2__title-highlight">RERA Approved</span>
            <span className="hero-v2__title-line">Plots in Nagpur</span>
          </h1>

          <p className={`hero-v2__subtitle ${L ? "animate-in delay-2" : ""}`}>
            NMRDA sanctioned residential plots near MIHAN, Wardha Road & Hingna.
            Starting <strong>Rs. 22 Lakh</strong> with up to 90% bank financing.
          </p>

          {/* CTA Buttons */}
          <div className={`hero-v2__cta-group ${L ? "animate-in delay-3" : ""}`}>
            <a href="#projects" className="hero-v2__cta-primary">
              <span>Explore Projects</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="hero-v2__cta-secondary">
              <Play size={16} aria-hidden="true" />
              <span>Schedule Visit</span>
            </a>
          </div>
        </div>

        {/* Stats Grid - Unique Bento-style */}
        <div className={`hero-v2__stats ${L ? "animate-in delay-4" : ""}`}>
          {STATS.map((stat, index) => (
            <div key={stat.label} className={`hero-v2__stat hero-v2__stat--${index + 1}`}>
              <div className="hero-v2__stat-value">{stat.value}</div>
              <div className="hero-v2__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Price Badge - Floating */}
        <div className={`hero-v2__price-badge ${L ? "animate-in delay-5" : ""}`}>
          <div className="hero-v2__price-icon">
            <TrendingUp size={18} aria-hidden="true" />
          </div>
          <div className="hero-v2__price-content">
            <span className="hero-v2__price-label">Starting from</span>
            <span className="hero-v2__price-value">Rs. 22 Lakh</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className={`hero-v2__trust ${L ? "animate-in delay-6" : ""}`}>
          {TRUST.map(t => {
            const Icon = t.icon
            return (
              <div key={t.label} className="hero-v2__trust-item">
                <Icon size={14} aria-hidden="true" />
                <span>{t.label}</span>
              </div>
            )
          })}
        </div>

        {/* Scroll Indicator */}
        <div className={`hero-v2__scroll ${L ? "animate-in delay-7" : ""}`}>
          <ChevronDown size={20} aria-hidden="true" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
