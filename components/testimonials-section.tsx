"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content: "Investing with Maha Laxmi Developers was an effortless experience. Their transparent process and clear documentation gave me full confidence. The best decision I ever made.",
    name: "Rajkumar Gharjale",
    location: "Nagpur",
    image: "/testonomials1.webp",
    rating: 5,
  },
  {
    id: 2,
    content: "I wanted to invest in a growing area, and plots in Nagpur Besa seemed perfect. Maha Laxmi Developers exceeded my expectations in every way. Highly recommended!",
    name: "Priya Shah",
    location: "Mumbai",
    image: "/testonomials2.jpg",
    rating: 5,
  },
  {
    id: 3,
    content: "Investing in residential plots with Mahalaxmi Developers was one of my best decisions. Their transparency, clear titles, and prompt assistance gave me real peace of mind.",
    name: "Karan Akojwar",
    location: "Pune",
    image: "/testonomials3.jpg",
    rating: 5,
  },
]

const TOTAL = testimonials.length
const FIVE_STARS = Array.from({ length: 5 })

const Stars = memo(({ count, size }: { count: number; size: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={size} className="fill-amber-400 text-amber-400" />
    ))}
  </div>
))
Stars.displayName = "Stars"

const RatingStrip = memo(({ starSize = 11, fontSize = "1.8rem" }: { starSize?: number; fontSize?: string }) => (
  <div
    className="flex items-center gap-4 rounded-2xl p-4 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgba(201,134,43,0.1), rgba(201,134,43,0.04))",
      border: "1px solid rgba(201,134,43,0.25)",
      boxShadow: "0 0 16px rgba(201,134,43,0.08)",
    }}
  >
    {/* Corner orb */}
    <div
      style={{
        position: "absolute",
        top: "-30%", right: "-10%",
        width: "100px", height: "100px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,134,43,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        className="font-bold leading-none"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize,
          color: "#C9862b",
          textShadow: "0 0 16px rgba(201,134,43,0.4)",
        }}
      >
        5.0
      </div>
      <div className="flex gap-0.5 mt-1">
        {FIVE_STARS.map((_, i) => <Star key={i} size={starSize} className="fill-amber-400 text-amber-400" />)}
      </div>
    </div>
    <div style={{ position: "relative", zIndex: 1 }}>
      <p className="font-bold text-sm" style={{ color: "#0d0d0d", fontFamily: "'Poppins', sans-serif" }}>Average Rating</p>
      <p className="text-xs" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>From 17,000+ verified clients</p>
    </div>
  </div>
))
RatingStrip.displayName = "RatingStrip"

const ActiveCard = memo(({ t, quoteSize, contentSize }: {
  t: typeof testimonials[number]
  quoteSize: number
  contentSize: string
}) => (
  <div
    className="rounded-2xl p-6 lg:p-8 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)",
      boxShadow: "0 8px 32px rgba(48,83,74,0.25), 0 0 0 1px rgba(201,134,43,0.12)",
    }}
  >
    {/* Corner glow orb */}
    <div
      style={{
        position: "absolute",
        top: "-20%", right: "-10%",
        width: "200px", height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,134,43,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />

    <Quote
      size={quoteSize}
      className="absolute -top-4 -right-4"
      style={{ color: "rgba(255,255,255,0.04)" }}
    />

    <div className="mb-4 lg:mb-5" style={{ position: "relative", zIndex: 1 }}>
      <Stars count={t.rating} size={13} />
    </div>

    <p
      className="leading-relaxed mb-6 lg:mb-8 italic"
      style={{
        color: "rgba(255,255,255,0.88)",
        fontFamily: "'Inter', sans-serif",
        fontSize: contentSize,
        position: "relative",
        zIndex: 1,
      }}
    >
      "{t.content}"
    </p>

    <div className="flex items-center gap-3" style={{ position: "relative", zIndex: 1 }}>
      <img
        src={t.image}
        alt={t.name}
        loading="lazy"
        decoding="async"
        className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover"
        style={{
          border: "2px solid #C9862b",
          boxShadow: "0 0 10px rgba(201,134,43,0.4)",
        }}
      />
      <div>
        <p className="font-bold text-white text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.name}</p>
        <p
          className="text-xs"
          style={{
            color: "#C9862b",
            fontFamily: "'Inter', sans-serif",
            textShadow: "0 0 8px rgba(201,134,43,0.4)",
          }}
        >
          {t.location}
        </p>
      </div>
    </div>
  </div>
))
ActiveCard.displayName = "ActiveCard"

const NavControls = memo(({ current, onPrev, onNext, onDot }: {
  current: number
  onPrev: () => void
  onNext: () => void
  onDot: (i: number) => void
}) => (
  <div className="flex items-center gap-4">
    <button
      onClick={onPrev}
      aria-label="Previous"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105"
      style={{
        background: "rgba(48,83,74,0.1)",
        border: "1px solid rgba(48,83,74,0.18)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 10px rgba(48,83,74,0.2)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(48,83,74,0.35)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(48,83,74,0.18)"
      }}
    >
      <ChevronLeft size={17} style={{ color: "#30534A" }} />
    </button>

    <div className="flex gap-2">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: i === current ? "2rem" : "0.5rem",
            background: i === current ? "#C9862b" : "rgba(48,83,74,0.2)",
            boxShadow: i === current ? "0 0 8px rgba(201,134,43,0.5)" : "none",
          }}
          aria-label={`Testimonial ${i + 1}`}
        />
      ))}
    </div>

    <button
      onClick={onNext}
      aria-label="Next"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105"
      style={{
        background: "rgba(48,83,74,0.1)",
        border: "1px solid rgba(48,83,74,0.18)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 10px rgba(48,83,74,0.2)"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(48,83,74,0.35)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(48,83,74,0.18)"
      }}
    >
      <ChevronRight size={17} style={{ color: "#30534A" }} />
    </button>
  </div>
))
NavControls.displayName = "NavControls"

export function TestimonialsSection() {
  const [current, setCurrent]     = useState(0)
  const [autoplay, setAutoplay]   = useState(true)
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => setCurrent(p => (p + 1) % TOTAL), 5000)
    return () => clearInterval(interval)
  }, [autoplay])

  const prev = useCallback(() => { setCurrent(p => (p - 1 + TOTAL) % TOTAL); setAutoplay(false) }, [])
  const next = useCallback(() => { setCurrent(p => (p + 1) % TOTAL); setAutoplay(false) }, [])
  const goTo = useCallback((i: number) => { setCurrent(i); setAutoplay(false) }, [])

  const active = testimonials[current]

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials-section relative overflow-hidden">
      <style>{`
        @keyframes headingPulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(201,134,43,0)); }
          50%       { filter: drop-shadow(0 0 16px rgba(201,134,43,0.25)); }
        }
        .testimonials-heading-highlight {
          animation: headingPulse 4s ease-in-out infinite;
        }
        .testimonials-count-badge {
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
        .testimonial-thumb:hover {
          border-color: rgba(201,134,43,0.5) !important;
          box-shadow: 0 0 12px rgba(201,134,43,0.2);
        }
      `}</style>

      {/* Left accent stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{
          background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)",
          boxShadow: "2px 0 12px rgba(201,134,43,0.2)",
        }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 right-1/3 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
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
          Testimonials
        </span>
        <span
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to right, rgba(201,134,43,0.3), rgba(48,83,74,0.1) 60%, transparent)",
          }}
        />
        <span className="testimonials-count-badge">17,000+ Happy Families</span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* Header */}
        <div
          className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          <h2
            className="font-bold leading-tight mb-3 text-[#0d0d0d] testimonials-heading-highlight"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
          >
            Loved by{" "}
            <span
              style={{
                color: "#30534A",
                textShadow: "0 0 24px rgba(48,83,74,0.2)",
              }}
            >
              Our
            </span>{" "}
            <span
              style={{
                WebkitTextStroke: "1.5px #C9862b",
                color: "transparent",
                filter: "drop-shadow(0 0 8px rgba(201,134,43,0.25))",
              }}
            >
              Clients
            </span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
            Real stories from families who found their dream plots with Mahalaxmi Infra.
          </p>
        </div>

        {/* Desktop */}
        <div
          className={`hidden lg:grid grid-cols-[1fr_1px_1fr] gap-0 items-start transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Left */}
          <div className="pr-14">
            <div className="mb-6">
              <ActiveCard t={active} quoteSize={120} contentSize="1.05rem" />
            </div>
            <NavControls current={current} onPrev={prev} onNext={next} onDot={goTo} />
          </div>

          {/* Divider */}
          <div
            className="self-stretch"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(201,134,43,0.2), rgba(48,83,74,0.15), transparent)",
              width: "1px",
            }}
          />

          {/* Right — testimonial list */}
          <div className="pl-14 space-y-3">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                className="testimonial-thumb w-full text-left rounded-2xl p-5 transition-all duration-250 active:scale-[0.99]"
                style={{
                  background: i === current ? "#fff" : "rgba(48,83,74,0.03)",
                  border: i === current ? "1px solid rgba(201,134,43,0.45)" : "1px solid rgba(48,83,74,0.1)",
                  boxShadow: i === current
                    ? "0 0 0 1px rgba(201,134,43,0.1), 0 4px 20px rgba(48,83,74,0.1)"
                    : "none",
                  transform: i === current ? "translateX(4px)" : "translateX(0)",
                  transition: "all 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Gold left edge on active */}
                <div
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: "3px",
                    background: "linear-gradient(to bottom, #C9862b, rgba(201,134,43,0.3))",
                    opacity: i === current ? 1 : 0,
                    transition: "opacity 0.3s",
                    borderRadius: "0 2px 2px 0",
                  }}
                />

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                    style={{
                      border: i === current ? "2px solid #C9862b" : "2px solid rgba(48,83,74,0.15)",
                      boxShadow: i === current ? "0 0 8px rgba(201,134,43,0.3)" : "none",
                      transition: "border-color 0.25s, box-shadow 0.25s",
                    }}
                  />
                  <div>
                    <p
                      className="font-bold text-sm leading-none mb-0.5"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: i === current ? "#30534A" : "#555",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-[11px]"
                      style={{
                        color: i === current ? "#C9862b" : "#aaa",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: i === current ? "0 0 8px rgba(201,134,43,0.3)" : "none",
                        transition: "color 0.2s, text-shadow 0.2s",
                      }}
                    >
                      {t.location}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Stars count={t.rating} size={11} />
                  </div>
                </div>

                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: i === current ? "#555" : "#aaa",
                    fontFamily: "'Inter', sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  "{t.content}"
                </p>
              </button>
            ))}

            <div className="mt-2">
              <RatingStrip starSize={11} fontSize="1.8rem" />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div
          className={`lg:hidden transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="mb-5">
            <ActiveCard t={active} quoteSize={80} contentSize="0.875rem" />
          </div>

          <div className="flex items-center justify-between mb-5">
            <NavControls current={current} onPrev={prev} onNext={next} onDot={goTo} />
          </div>

          <RatingStrip starSize={10} fontSize="1.6rem" />
        </div>
      </div>
    </section>
  )
}