"use client"

import { Wifi, Dumbbell, Trees, Zap, Shield, Users, Droplets, Gamepad2, Heart, Car, PartyPopper, Baby } from "lucide-react"
import { useState, useRef, useEffect, useMemo, memo, useCallback } from "react"

const amenities = [
  { icon: Wifi,        title: "Smart Home",      description: "Advanced IoT integration for modern living.",      category: "facilities"    },
  { icon: Dumbbell,    title: "Fitness Center",  description: "State-of-the-art gym & workout facilities.",       category: "wellness"      },
  { icon: Trees,       title: "Green Spaces",    description: "Lush landscaping, parks and tree-lined paths.",    category: "wellness"      },
  { icon: Zap,         title: "Power Backup",    description: "Uninterrupted power supply around the clock.",     category: "facilities"    },
  { icon: Shield,      title: "24/7 Security",   description: "CCTV surveillance and on-site security team.",     category: "facilities"    },
  { icon: Users,       title: "Community Hub",   description: "Vibrant spaces designed for social gatherings.",   category: "entertainment" },
  { icon: Droplets,    title: "Swimming Pool",   description: "Olympic-sized pool with children's splash zone.",  category: "wellness"      },
  { icon: Gamepad2,    title: "Gaming Zone",     description: "Indoor games & entertainment for all ages.",       category: "entertainment" },
  { icon: Heart,       title: "Yoga Studio",     description: "Dedicated wellness spaces for mind & body.",       category: "wellness"      },
  { icon: Car,         title: "Covered Parking", description: "Secure multi-level parking for every resident.",   category: "facilities"    },
  { icon: PartyPopper, title: "Banquet Hall",    description: "Premium event spaces for celebrations.",           category: "entertainment" },
  { icon: Baby,        title: "Kids Play Area",  description: "Safe, colorful playground for children.",          category: "entertainment" },
]

const TABS = ["all", "facilities", "wellness", "entertainment"] as const
type Tab = typeof TABS[number]

const AmenityCardV2 = memo(({ amenity, index, visible }: { amenity: typeof amenities[0]; index: number; visible: boolean }) => {
  const Icon = amenity.icon
  const categoryColors: Record<string, string> = {
    facilities: "var(--green)",
    wellness: "var(--gold)",
    entertainment: "#3b82f6"
  }
  const color = categoryColors[amenity.category] || "var(--green)"
  
  return (
    <article className={`amenity-v2__card stagger-item ${visible ? "on" : ""} s${index}`}>
      <div className="amenity-v2__card-header">
        <div className="amenity-v2__icon" style={{ background: `${color}10`, borderColor: `${color}20` }}>
          <Icon size={22} style={{ color }} aria-hidden="true" />
        </div>
        <span className="amenity-v2__category" style={{ color, background: `${color}08`, borderColor: `${color}15` }}>
          {amenity.category}
        </span>
      </div>
      <div className="amenity-v2__content">
        <h3 className="amenity-v2__title">{amenity.title}</h3>
        <p className="amenity-v2__desc">{amenity.description}</p>
      </div>
      <div className="amenity-v2__bar" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </article>
  )
})
AmenityCardV2.displayName = "AmenityCardV2"

export function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.07, rootMargin: "60px" }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const handleTabChange = useCallback((tab: Tab) => setActiveTab(tab), [])
  const filtered = useMemo(() => activeTab === "all" ? amenities : amenities.filter(a => a.category === activeTab), [activeTab])
  const vis = isVisible

  return (
    <section ref={sectionRef} id="amenities" aria-label="Amenities" className="amenities-v2">
      {/* Background */}
      <div className="amenities-v2__bg">
        <div className="amenities-v2__bg-dots" />
      </div>

      {/* Header Strip */}
      <div className="amenities-v2__header-strip">
        <div className="amenities-v2__header-inner">
          <div className="amenities-v2__header-badge">
            <span className="amenities-v2__header-badge-icon" />
            <span>World-Class Amenities</span>
          </div>
          <span className="amenities-v2__header-count">{amenities.length} Amenities</span>
        </div>
      </div>

      <div className="amenities-v2__inner">
        {/* Section Header */}
        <div className={`amenities-v2__section-header rv ${vis ? "on" : ""} d0`}>
          <h2 className="amenities-v2__title">
            Designed for <em>Modern</em> Living
          </h2>
          <p className="amenities-v2__subtitle">
            Experience world-class amenities designed to enhance your lifestyle and comfort.
          </p>
        </div>

        {/* Filter Tabs - Pill Style */}
        <div className={`amenities-v2__tabs-wrap rv ${vis ? "on" : ""} d1`}>
          <div className="amenities-v2__tabs">
            {TABS.map(tab => (
              <button 
                key={tab} 
                onClick={() => handleTabChange(tab)} 
                aria-pressed={activeTab === tab}
                className={`amenities-v2__tab ${activeTab === tab ? "active" : ""}`}
              >
                {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && <span className="amenities-v2__tab-count">{filtered.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-v2__grid">
          {filtered.map((amenity, i) => (
            <AmenityCardV2 key={amenity.title} amenity={amenity} index={i} visible={vis} />
          ))}
        </div>
      </div>

      {/* Trust Bar */}
      <div className="amenities-v2__trust-bar">
        <div className="amenities-v2__trust-inner">
          <span className="amenities-v2__trust-label">Designed for modern living</span>
          <div className="amenities-v2__trust-items">
            {["Premium Build Quality", "Vastu Compliant", "24x7 Maintenance"].map(label => (
              <div key={label} className="amenities-v2__trust-item">
                <span className="amenities-v2__trust-dot" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
