"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { ArrowRight, MapPin, Award, TrendingUp } from "lucide-react"

const DESKTOP_STATS = [
  { value: "70+",     label: "Completed Projects" },
  { value: "17,000+", label: "Happy Clients"      },
  { value: "100%",    label: "RERA Approved"       },
]

const MOBILE_STATS = [
  { value: "70+",  label: "Projects"      },
  { value: "17K+", label: "Happy Clients" },
  { value: "100%", label: "RERA Approved" },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsLoaded(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToContact  = useCallback(() => scrollTo("contact"),  [scrollTo])
  const scrollToProjects = useCallback(() => scrollTo("projects"), [scrollTo])

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden bg-[#f7f4ef]">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpeg"
          alt="Mahalaxmi Infra background"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="sync"
          width={1440}
          height={900}
        />
      </div>

      {/* Strong directional overlay — heavy on left (text side), lighter on right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,15,10,0.87) 0%, rgba(5,15,10,0.75) 45%, rgba(5,15,10,0.42) 72%, rgba(5,15,10,0.18) 100%)",
        }}
      />

      {/* Bottom fade so mobile stats always sit on dark floor */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none h-44"
        style={{
          background: "linear-gradient(to top, rgba(5,15,10,0.65) 0%, transparent 100%)",
        }}
      />

      {/* Gold vertical rule */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 z-[3]"
        style={{
          left: "50%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent 0%, #C9862b 30%, #C9862b 70%, transparent 100%)",
          opacity: 0.45,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 items-center px-6 sm:px-10 lg:px-16 py-28 sm:py-32 gap-10 lg:gap-0">

        {/* LEFT — Text */}
        <div className="flex flex-col justify-center">

          {/* Eyebrow */}
          <div
            className={`transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span
                style={{
                  display: "block",
                  width: "36px",
                  height: "2px",
                  background: "#C9862b",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.30em",
                  textTransform: "uppercase" as const,
                  fontWeight: 700,
                  color: "#C9862b",
                  textShadow: "0 1px 8px rgba(0,0,0,0.95)",
                }}
              >
                NMRDA Sanctioned · RERA Approved
              </span>
            </div>
          </div>

          {/* Headline */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "80ms" }}
          >
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.07,
                marginBottom: "1.1rem",
                /* White base — never lost against any photo */
                color: "#ffffff",
                textShadow: "0 2px 20px rgba(0,0,0,1), 0 1px 6px rgba(0,0,0,1)",
              }}
            >
              Mahalaxmi Infra —
              <br />
              {/* Orange line */}
              <span
                style={{
                  color: "#C9862b",
                  textShadow: "0 2px 18px rgba(0,0,0,0.95), 0 0 32px rgba(201,134,43,0.25)",
                }}
              >
                Nagpur's Most
              </span>
              <br />
              {/* Orange + underline */}
              <span
                style={{
                  color: "#C9862b",
                  position: "relative",
                  display: "inline-block",
                  textShadow: "0 2px 18px rgba(0,0,0,0.95), 0 0 32px rgba(201,134,43,0.25)",
                }}
              >
                Trusted Developer
                <span
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    width: "100%",
                    height: "2.5px",
                    background:
                      "linear-gradient(90deg, #C9862b 0%, rgba(201,134,43,0) 100%)",
                    borderRadius: "2px",
                  }}
                />
              </span>
            </h1>
          </div>

          {/* Sub-heading */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "140ms" }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.875rem, 1.05vw, 1rem)",
                lineHeight: 1.8,
                /* White body text — fully legible on dark overlay */
                color: "#ffffff",
                marginBottom: "1.1rem",
                maxWidth: "480px",
                textShadow: "0 1px 10px rgba(0,0,0,0.95)",
              }}
            >
              Mahalaxmi Developers Nagpur — 70+ NMRDA approved residential plot
              projects, 17,000+ happy families, and over 13 years of transparent
              real estate excellence.{" "}
              <strong style={{ color: "#C9862b", fontWeight: 600 }}>
                Besa · Wardha Road · MIHAN · Samruddhi Circle.
              </strong>
            </p>
          </div>

          {/* Location pill */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "190ms" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "2rem",
                maxWidth: "480px",
                borderRadius: "12px",
                padding: "14px 16px",
                /* Subtle green-tinted glass */
                background: "rgba(48,83,74,0.30)",
                border: "1px solid rgba(48,83,74,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <MapPin
                style={{
                  width: "16px",
                  height: "16px",
                  color: "#C9862b",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12.5px",
                  /* White so it's readable on the dark green pill */
                  color: "#ffffff",
                  lineHeight: 1.7,
                  margin: 0,
                  textShadow: "0 1px 6px rgba(0,0,0,0.9)",
                }}
              >
                <strong style={{ color: "#C9862b", fontWeight: 600 }}>Prime Locations: </strong>
                Besa, Beltarodi, Shankarpur, Wardha Road, Jamtha, Katol Road,
                Umred Road, Koradi Road &amp; Samruddhi Circle Nagpur
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              transitionDelay: "240ms",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {/* Primary — orange */}
            <button
              onClick={scrollToContact}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#C9862b",
                border: "none",
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "13.5px",
                letterSpacing: "0.02em",
                padding: "14px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(201,134,43,0.50)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.04)"
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(201,134,43,0.65)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(201,134,43,0.50)"
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)" }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.04)" }}
            >
              Contact Us Now
              <ArrowRight size={16} />
            </button>

            {/* Secondary — green border, white text */}
            <button
              onClick={scrollToProjects}
              style={{
                background: "transparent",
                border: "1.5px solid #30534A",
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "13.5px",
                padding: "14px 26px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C9862b"
                e.currentTarget.style.color = "#C9862b"
                e.currentTarget.style.transform = "scale(1.04)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#30534A"
                e.currentTarget.style.color = "#ffffff"
                e.currentTarget.style.transform = "scale(1)"
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)" }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.04)" }}
            >
              Explore Projects
            </button>
          </div>

          {/* Investment highlight */}
          <div
            className={`transition-all duration-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms", willChange: "transform, opacity" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "999px",
                padding: "10px 20px",
                background: "rgba(201,134,43,0.15)",
                border: "1px solid rgba(201,134,43,0.40)",
              }}
            >
              <TrendingUp style={{ width: "15px", height: "15px", flexShrink: 0, color: "#C9862b" }} />
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  /* White so it pops on any background */
                  color: "#ffffff",
                  textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                }}
              >
                Best Investment @ ₹22 Lakh on Samruddhi Circle
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Desktop stats card */}
        <div className="hidden lg:flex flex-col items-end justify-end pb-10 pr-4">
          <div
            className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: "420ms", willChange: "transform, opacity" }}
          >
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                /* White card — same as original but fully opaque so text is crisp */
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(201,134,43,0.22)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                minWidth: "280px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 22px",
                  borderBottom: "1px solid rgba(201,134,43,0.14)",
                  background: "rgba(48,83,74,0.06)",
                }}
              >
                <Award style={{ width: "16px", height: "16px", color: "#C9862b" }} />
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "10.5px",
                    letterSpacing: "0.20em",
                    textTransform: "uppercase" as const,
                    fontWeight: 700,
                    /* Dark green on white — very readable */
                    color: "#30534A",
                  }}
                >
                  Certified Excellence
                </span>
              </div>

              {/* Stat rows */}
              {DESKTOP_STATS.map((stat, i) => (
                <div
                  key={stat.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 22px",
                    borderBottom: i < 2 ? "1px solid rgba(201,134,43,0.10)" : "none",
                  }}
                >
                  {/* Orange stat number on white card — full contrast */}
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "2rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#C9862b",
                      minWidth: "96px",
                    }}
                  >
                    {stat.value}
                  </span>
                  {/* Dark green label on white card */}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13.5px",
                      lineHeight: 1.4,
                      color: "#30534A",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stats */}
        <div
          className={`lg:hidden grid grid-cols-3 gap-2 sm:gap-3 -mt-2 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "360ms", willChange: "transform, opacity" }}
        >
          {MOBILE_STATS.map((stat) => (
            <div
              key={stat.value}
              style={{
                borderRadius: "12px",
                padding: "14px 10px",
                textAlign: "center",
                /* Opaque white so text is crisp on any photo */
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(201,134,43,0.18)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {/* Orange number on white */}
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.25rem, 4vw, 1.6rem)",
                  fontWeight: 800,
                  color: "#C9862b",
                  marginBottom: "3px",
                }}
              >
                {stat.value}
              </div>
              {/* Green label on white */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10.5px",
                  color: "#30534A",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-10 z-10 transition-all duration-700 hidden lg:flex flex-col items-center gap-2 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "700ms" }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, rgba(201,134,43,0.7), transparent)",
          }}
        />
      </div>
    </section>
  )
}