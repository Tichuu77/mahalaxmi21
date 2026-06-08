"use client"

import { useEffect, useRef, useState, memo } from "react"
import { MapPin, Plane, Route, School, Leaf, Factory, Home, Sunrise, Building2 } from "lucide-react"

const locations = [
  {
    icon: Building2,
    area: "Besa / Beltarodi",
    detail: "Near Zudio, Croma",
    tag: "High Demand",
    tagGold: true,
  },
  {
    icon: Plane,
    area: "Wardha Road / MIHAN",
    detail: "Near AIIMS & IIM",
    tag: "Top Rated",
    tagGold: true,
  },
  {
    icon: Route,
    area: "Samruddhi Circle",
    detail: "Plots from ₹22 Lakh",
    tag: "Best Value",
    tagGold: true,
  },
  {
    icon: School,
    area: "Manish Nagar",
    detail: "Flats & Plots",
    tag: "Residential",
    tagGold: false,
  },
  {
    icon: Leaf,
    area: "Katol Road",
    detail: "Outer Ring Road connectivity",
    tag: "Growing Zone",
    tagGold: false,
  },
  {
    icon: Factory,
    area: "Koradi Road",
    detail: "Behind Haldiram — new launches",
    tag: "New Launch",
    tagGold: true,
  },
  {
    icon: Home,
    area: "Hudkeshwar",
    detail: "Residential community",
    tag: "Residential",
    tagGold: false,
  },
  {
    icon: Sunrise,
    area: "Shankarpur",
    detail: "Behind Royal Gondwana School",
    tag: "Peaceful",
    tagGold: false,
  },
  {
    icon: MapPin,
    area: "Umred / Kamptee Road",
    detail: "Affordable investment plots",
    tag: "Affordable",
    tagGold: false,
  },
]

const LocationCard = memo(({ loc, index, isVisible }: {
  loc: typeof locations[number]
  index: number
  isVisible: boolean
}) => {
  const Icon = loc.icon
  return (
    <div
      className="locations-card group relative rounded-2xl p-5 flex flex-col gap-3 cursor-default transition-all duration-300"
      style={{
        transitionDelay: isVisible ? `${index * 60}ms` : "0ms",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Number watermark */}
      <span className="locations-card-number absolute top-3 right-4 font-bold tabular-nums select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="locations-card-icon w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300">
        <Icon size={17} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="locations-card-title font-bold leading-snug mb-1">{loc.area}</h3>
        <p className="locations-card-detail">{loc.detail}</p>
      </div>

      {/* Tag */}
      <div className="flex items-center gap-2">
        <span
          className="locations-card-tag inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
          style={
            loc.tagGold
              ? { background: "rgba(201,134,43,0.12)", color: "#C9862b", border: "1px solid rgba(201,134,43,0.3)" }
              : { background: "rgba(48,83,74,0.08)", color: "#30534A", border: "1px solid rgba(48,83,74,0.2)" }
          }
        >
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: loc.tagGold ? "#C9862b" : "#30534A" }} />
          {loc.tag}
        </span>
      </div>

      {/* Bottom bar — grows on hover */}
      <div className="locations-card-bar absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300" />
    </div>
  )
})
LocationCard.displayName = "LocationCard"

export function LocationsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
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

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="locations-section relative overflow-hidden"
    >
      <style>{`
        .locations-section {
          background: #fff;
        }

        /* Left accent */
        .locations-gradient-bar {
          background: linear-gradient(to bottom, #C9862b, #30534A, #C9862b);
        }

        /* Header strip */
        .locations-header-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C9862b;
        }
        .locations-header-divider {
          height: 1px;
          background: linear-gradient(to right, rgba(201,134,43,0.3), transparent);
          display: block;
        }

        /* Title */
        .locations-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          color: #30534A;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .locations-title-gold { color: #C9862b; }
        .locations-title-outline {
          -webkit-text-stroke: 1.5px #30534A;
          color: transparent;
        }
        .locations-description {
          font-size: 0.95rem;
          color: #5a6a5e;
          line-height: 1.7;
          max-width: 480px;
        }

        /* Badge */
        .locations-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(48,83,74,0.07);
          border: 1px solid rgba(48,83,74,0.18);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #30534A;
          margin-bottom: 1.5rem;
        }
        .locations-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C9862b;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }

        /* Cards grid */
        .locations-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .locations-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .locations-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }

        /* Card */
        .locations-card {
          background: #f7f4ef;
          border: 1px solid rgba(48,83,74,0.1);
          will-change: transform, opacity;
        }
        .locations-card:hover {
          background: #fff;
          border-color: rgba(201,134,43,0.35);
          box-shadow: 0 8px 32px rgba(48,83,74,0.10);
          transform: translateY(-3px) !important;
        }
        .locations-card-number {
          font-size: 1.8rem;
          color: rgba(48,83,74,0.06);
          line-height: 1;
        }
        .locations-card-icon {
          background: rgba(48,83,74,0.08);
          border: 1px solid rgba(48,83,74,0.14);
          color: #30534A;
        }
        .locations-card:hover .locations-card-icon {
          background: #30534A;
          border-color: #30534A;
          color: #C9862b;
        }
        .locations-card-title {
          font-size: 0.92rem;
          color: #1a2e28;
        }
        .locations-card-detail {
          font-size: 0.78rem;
          color: #6b7a6e;
          line-height: 1.5;
        }
        .locations-card-bar {
          background: transparent;
          opacity: 0;
        }
        .locations-card:hover .locations-card-bar {
          background: linear-gradient(to right, #C9862b, #30534A);
          opacity: 1;
        }

        /* CTA */
        .locations-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #30534A;
          color: #fff;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s;
          border: 2px solid #30534A;
        }
        .locations-cta:hover {
          background: transparent;
          color: #30534A;
        }
        .locations-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #C9862b;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s;
          border: 2px solid rgba(201,134,43,0.4);
        }
        .locations-cta-outline:hover {
          background: rgba(201,134,43,0.08);
          border-color: #C9862b;
        }

        /* Trust strip */
        .locations-trust-strip {
          background: #30534A;
        }
        .locations-trust-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.04em;
        }
        .locations-trust-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.2);
        }
        .locations-trust-gold {
          color: #C9862b;
          font-weight: 700;
        }
      `}</style>

      {/* Left accent stripe */}
      <div className="locations-gradient-bar absolute top-0 left-0 bottom-0 w-1.5" />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(48,83,74,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Header strip */}
      <div className="flex items-center gap-4 px-5 sm:px-10 lg:px-24 py-5 relative z-10">
        <span className="locations-header-label">Our Locations</span>
        <span className="locations-header-divider flex-1" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 pt-6 pb-16 relative z-10">

        {/* Intro */}
        <div
          className="mb-10 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(16px)" }}
        >
          <div className="locations-badge">
            <span className="locations-badge-dot" />
            9+ Prime Locations Across Nagpur
          </div>

          <h2 className="locations-title font-bold">
            Mahalaxmi Infra Plots
            <br />
            <span className="locations-title-gold">Across</span>{" "}
            <span className="locations-title-outline">Nagpur</span>
          </h2>

          <p className="locations-description">
            Mahalaxmi Developer Nagpur operates across 9+ prime locations — all strategically chosen for highest appreciation and connectivity.
          </p>
        </div>

        {/* Grid */}
        <div className="locations-grid mb-10">
          {locations.map((loc, i) => (
            <LocationCard key={loc.area} loc={loc} index={i} isVisible={isVisible} />
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3 justify-center transition-all duration-700"
          style={{
            transitionDelay: "500ms",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <a href="#contact" className="locations-cta">
            Book a Free Site Visit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="tel:+919326709970" className="locations-cta-outline">
            Call Now — Mon–Sat 9am–7pm
          </a>
        </div>
      </div>

      {/* Trust strip */}
      <div className="locations-trust-strip">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-24 py-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <span className="locations-trust-text">
            <span className="locations-trust-gold">MAHA RERA</span> No. A50500037880
          </span>
          <span className="locations-trust-divider hidden sm:block" />
          <span className="locations-trust-text">NMRDA Sanctioned</span>
          <span className="locations-trust-divider hidden sm:block" />
          <span className="locations-trust-text">Bank Finance Eligible — SBI · HDFC · ICICI</span>
          <span className="locations-trust-divider hidden sm:block" />
          <span className="locations-trust-text">Since <span className="locations-trust-gold">2011</span></span>
        </div>
      </div>
    </section>
  )
}