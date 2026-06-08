"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

const faqs = [
  { id: 1, question: "What types of properties do you offer?",     answer: "We offer a wide range of residential and commercial plots in prime locations across Nagpur, including Besa, Beltarodi, Shankarpur, Wardha Road, and more. All properties are NMRDA sanctioned and RERA approved.", category: "Properties" },
  { id: 2, question: "What is the price range for your plots?",    answer: "Our plots start from ₹22 Lakh onwards, depending on the location, size, and amenities. We offer flexible payment plans and financing options to suit various budgets.",                                          category: "Pricing"    },
  { id: 3, question: "Are all your projects RERA approved?",       answer: "Yes, all our projects are 100% RERA approved and NMRDA sanctioned. We ensure complete legal compliance and transparency in all our dealings.",                                                                       category: "Legal"      },
  { id: 4, question: "What financing options are available?",      answer: "We offer multiple financing options including bank loans, in-house payment plans, and EMI facilities. Our team will help you choose the best option based on your financial situation.",                              category: "Finance"    },
  { id: 5, question: "How can I schedule a site visit?",           answer: "You can schedule a site visit by contacting us through our website, calling our helpline, or using the WhatsApp button. Our team will confirm your visit within 24 hours and provide all necessary details.",        category: "Visits"     },
  { id: 6, question: "What amenities are included?",               answer: "Our properties come with world-class amenities including 24/7 security, power backup, green spaces, community halls, and more. Specific amenities vary by project location.",                                       category: "Amenities"  },
]

const categories = ["all", "properties", "pricing", "legal", "finance"]

const QUICK_STATS = [
  { stat: "13+",  label: "Years of Experience"    },
  { stat: "100%", label: "RERA Approved Projects" },
  { stat: "17K+", label: "Happy Families"         },
]

const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

const FAQItem = memo(({ faq, isOpen, onToggle }: {
  faq: typeof faqs[number]
  isOpen: boolean
  onToggle: (id: number) => void
}) => {
  const handleClick = useCallback(() => onToggle(faq.id), [onToggle, faq.id])
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
      className="faq-item rounded-2xl overflow-hidden transition-all duration-300"
      onMouseMove={handleMouseMove}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          background: isOpen ? "#fff" : "rgba(48,83,74,0.02)",
          border: isOpen ? "1px solid rgba(201,134,43,0.45)" : "1px solid rgba(48,83,74,0.1)",
          boxShadow: isOpen
            ? "0 0 0 1px rgba(201,134,43,0.12), 0 6px 28px rgba(48,83,74,0.12), 0 2px 8px rgba(201,134,43,0.08)"
            : "none",
          transform: isOpen ? "translateX(4px)" : "translateX(0)",
          willChange: "transform",
          position: "relative",
        } as React.CSSProperties
      }
    >
      {/* Spotlight radial */}
      <div
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
        className="w-full flex items-start gap-3 sm:gap-4 text-left transition-colors duration-200 active:scale-[0.99]"
        style={{ padding: "1rem 1.25rem", position: "relative", zIndex: 1 }}
      >
        <span
          className="font-bold tabular-nums shrink-0 leading-none mt-0.5 transition-colors duration-200"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.95rem",
            color: isOpen ? "#C9862b" : "rgba(48,83,74,0.2)",
            minWidth: "28px",
            textShadow: isOpen ? "0 0 10px rgba(201,134,43,0.4)" : "none",
            transition: "color 0.2s, text-shadow 0.2s",
          }}
        >
          {String(faq.id).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <p
            className="font-bold leading-snug transition-colors duration-200"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.92rem",
              color: isOpen ? "#30534A" : "#0d0d0d",
            }}
          >
            {faq.question}
          </p>
          <span
            className="inline-block mt-1.5 text-[10px] font-semibold rounded-full px-2.5 py-0.5"
            style={{
              background: isOpen ? "rgba(201,134,43,0.1)" : "rgba(48,83,74,0.07)",
              color: isOpen ? "#a86a1a" : "#888",
              fontFamily: "'Inter', sans-serif",
              border: isOpen ? "1px solid rgba(201,134,43,0.25)" : "1px solid rgba(48,83,74,0.12)",
              boxShadow: isOpen ? "0 0 6px rgba(201,134,43,0.15)" : "none",
              transition: "all 0.2s",
            }}
          >
            {faq.category}
          </span>
        </div>

        <div
          className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
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
          maxHeight: isOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="flex gap-3"
          style={{
            padding: "0.9rem 1.25rem 1.1rem 3.5rem",
            borderTop: "1px solid rgba(48,83,74,0.08)",
            background: "linear-gradient(to right, rgba(201,134,43,0.02), transparent)",
          }}
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{
              background: "rgba(201,134,43,0.1)",
              border: "1px solid rgba(201,134,43,0.2)",
              boxShadow: "0 0 8px rgba(201,134,43,0.12)",
            }}
          >
            <MessageCircle size={11} style={{ color: "#C9862b" }} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
})
FAQItem.displayName = "FAQItem"

const SidePanel = memo(() => (
  <div className="hidden lg:flex lg:pl-14 flex-col gap-5">
    <div
      className="rounded-2xl p-7 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)" }}
    >
      {/* Panel glow orb */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,134,43,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: "rgba(201,134,43,0.2)",
          border: "1px solid rgba(201,134,43,0.35)",
          boxShadow: "0 0 16px rgba(201,134,43,0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <HelpCircle size={20} style={{ color: "#C9862b" }} />
      </div>

      <h3
        className="font-bold mb-2 text-white"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.2rem",
          position: "relative",
          zIndex: 1,
          textShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        Still have questions?
      </h3>
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", position: "relative", zIndex: 1 }}
      >
        Our team is here to help you with personalised assistance — reach out anytime.
      </p>

      <div className="space-y-2.5" style={{ position: "relative", zIndex: 1 }}>
        <button
          onClick={scrollToContact}
          className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl text-white transition-all duration-250 hover:scale-[1.02] active:scale-95"
          style={{
            background: "linear-gradient(135deg, #C9862b 0%, #e09b3a 100%)",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.04em",
            boxShadow: "0 4px 16px rgba(201,134,43,0.35)",
          }}
        >
          Contact Us
        </button>
        <a
          href="tel:+919326709970"
          className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl transition-all duration-250 hover:scale-[1.02] active:scale-95"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          Call Now
        </a>
      </div>
    </div>

    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid rgba(48,83,74,0.1)",
        boxShadow: "0 2px 10px rgba(48,83,74,0.05)",
      }}
    >
      <p
        className="text-[10px] uppercase tracking-wider font-bold mb-4"
        style={{
          color: "#C9862b",
          fontFamily: "'Poppins', sans-serif",
          textShadow: "0 0 10px rgba(201,134,43,0.3)",
        }}
      >
        Why trust us
      </p>
      {QUICK_STATS.map((s, i) => (
        <div
          key={s.stat}
          className="flex items-center gap-3 py-3"
          style={{ borderBottom: i < 2 ? "1px solid rgba(48,83,74,0.07)" : "none" }}
        >
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.3rem",
              color: "#C9862b",
              minWidth: "52px",
              textShadow: "0 0 12px rgba(201,134,43,0.3)",
            }}
          >
            {s.stat}
          </span>
          <span className="text-xs" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </div>
))
SidePanel.displayName = "SidePanel"

const MobileCTA = memo(() => (
  <div className="lg:hidden mt-8">
    <div
      className="rounded-2xl p-6 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-40%",
          right: "-10%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,134,43,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <h3
        className="font-bold mb-2 text-white"
        style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", position: "relative", zIndex: 1 }}
      >
        Still have questions?
      </h3>
      <p
        className="text-xs leading-relaxed mb-5"
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", position: "relative", zIndex: 1 }}
      >
        Our team is here to help you with personalised assistance.
      </p>
      <div className="flex gap-2" style={{ position: "relative", zIndex: 1 }}>
        <button
          onClick={scrollToContact}
          className="flex-1 font-bold text-sm py-3 rounded-xl text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #C9862b 0%, #e09b3a 100%)",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 4px 14px rgba(201,134,43,0.3)",
          }}
        >
          Contact Us
        </button>
        <a
          href="tel:+919326709970"
          className="flex-1 font-bold text-sm py-3 rounded-xl text-center transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Call Now
        </a>
      </div>
    </div>
  </div>
))
MobileCTA.displayName = "MobileCTA"

export function FAQSection() {
  const [openId, setOpenId]       = useState<number | null>(1)
  const [filter, setFilter]       = useState("all")
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

  const handleToggle = useCallback((id: number) => {
    setOpenId(prev => (prev === id ? null : id))
  }, [])

  const filtered = filter === "all" ? faqs : faqs.filter(f => f.category.toLowerCase() === filter)

  return (
    <section ref={sectionRef} id="faq" className="faq-section relative overflow-hidden">
      <style>{`
        @keyframes headingPulse {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(201,134,43,0)); }
          50%       { filter: drop-shadow(0 0 16px rgba(201,134,43,0.25)); }
        }
        .faq-heading-highlight {
          animation: headingPulse 4s ease-in-out infinite;
        }
        .faq-tab-active-glow {
          box-shadow: 0 0 0 1px rgba(48,83,74,0.4), 0 4px 14px rgba(48,83,74,0.22) !important;
        }
        .faq-count-badge {
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
        .faq-item:hover .faq-spotlight {
          opacity: 1 !important;
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
        className="absolute bottom-0 right-1/4 w-[450px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,134,43,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full pointer-events-none"
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
          FAQ
        </span>
        <span
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to right, rgba(201,134,43,0.3), rgba(48,83,74,0.1) 60%, transparent)",
          }}
        />
        <span className="faq-count-badge">{faqs.length} Questions</span>
      </div>

      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-20 relative z-10">

        {/* Header */}
        <div
          className={`mb-10 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h2
                className="font-bold leading-tight mb-3 text-[#0d0d0d] faq-heading-highlight"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)" }}
              >
                Frequently{" "}
                <span
                  style={{
                    color: "#30534A",
                    textShadow: "0 0 24px rgba(48,83,74,0.2)",
                  }}
                >
                  Asked
                </span>{" "}
                <span
                  style={{
                    WebkitTextStroke: "1.5px #C9862b",
                    color: "transparent",
                    filter: "drop-shadow(0 0 8px rgba(201,134,43,0.25))",
                  }}
                >
                  Questions
                </span>
              </h2>
              <p
                className="text-sm leading-relaxed max-w-md"
                style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}
              >
                Find answers to common questions about our properties, pricing, and services.
              </p>
            </div>

            {/* Filter tabs */}
            <div
              className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0"
              style={{ scrollbarWidth: "none" } as React.CSSProperties}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-250 active:scale-95 ${
                    filter === cat ? "faq-tab-active-glow" : ""
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background:
                      filter === cat
                        ? "linear-gradient(135deg, #30534A 0%, #1e3a32 100%)"
                        : "rgba(48,83,74,0.07)",
                    color: filter === cat ? "#fff" : "#30534A",
                    border: filter === cat ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1px_360px] gap-0 items-start">

          {/* FAQ accordion */}
          <div
            className={`lg:pr-14 space-y-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}
          >
            {filtered.length === 0 ? (
              <p className="text-sm py-10 text-center" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>
                No questions in this category yet.
              </p>
            ) : (
              filtered.map(faq => (
                <FAQItem key={faq.id} faq={faq} isOpen={openId === faq.id} onToggle={handleToggle} />
              ))
            )}
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(201,134,43,0.2), rgba(48,83,74,0.15), transparent)",
              width: "1px",
            }}
          />

          {/* Right panel */}
          <div
            className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ willChange: "transform, opacity" }}
          >
            <SidePanel />
          </div>
        </div>

        <MobileCTA />
      </div>
    </section>
  )
}