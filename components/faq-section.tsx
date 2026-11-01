"use client"

import { useState, useCallback, memo } from "react"
import { ChevronDown, HelpCircle, Phone, MessageSquare, Sparkles } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Where is Mahalaxmi Nagar 51 (Anaya) located?",
    answer: "Mahalaxmi Nagar 51 Anaya is located at Mouza Sumthana, Nagpur. It directly touches the Samruddhi Mahamarg Expressway Interchange and is situated just 7 minutes from MIHAN SEZ (Infosys, TCS, Tech Mahindra), 8 minutes from AIIMS & NCI Nagpur, and 5 minutes from D-Mart.",
    category: "Location",
  },
  {
    id: 2,
    question: "What is the RERA and NMRDA approval status of the project?",
    answer: "The project is 100% legally approved and sanctioned by NMRDA (Nagpur Metropolitan Region Development Authority) with clear RL sanctions. It is registered under MahaRERA with Project Registration No: PP1190002602003 (Agent MahaRERA: A50500037880).",
    category: "Legal",
  },
  {
    id: 3,
    question: "What plot sizes are available in Mahalaxmi Nagar 51 Anaya?",
    answer: "Anaya offers a wide range of plot sizes spanning from 1,130 sq.ft. up to 5,000 sq.ft. (including 1,130, 1,250, 1,500, 1,800, 2,400, 3,921, and 5,000 sq.ft). Options include Executive Villa Plots, Central Park-Facing Boulevard Plots, and Dual-Frontage Royal Estate Corner Plots.",
    category: "Plots",
  },
  {
    id: 4,
    question: "What is the price range and booking token amount?",
    answer: "Residential plots in Mahalaxmi Nagar 51 Anaya start from ₹35.4 Lakh* onwards, depending on the chosen plot size, location, and facing. Booking tokens start from ₹51,000, with flexible structured payment stages linked to bank loan disbursements.",
    category: "Pricing",
  },
  {
    id: 5,
    question: "Is bank loan finance available for purchasing plots in Anaya?",
    answer: "Yes, up to 85% to 90% bank loan financing is sanctioned and available from all premier nationalized and private banks including State Bank of India (SBI), HDFC Bank, ICICI Bank, Bank of Baroda, and Axis Bank with competitive interest rates.",
    category: "Finance",
  },
  {
    id: 6,
    question: "What amenities and internal infrastructure are provided?",
    answer: "Mahalaxmi Nagar 51 Anaya features over 30 modern lifestyle amenities: a Grand Clubhouse, Olympic-length Swimming Pool, Floodlit Box Cricket Turf, Football Sports Turf, Modern Gymnasium, Children's Play Wonderland, Day-care Crèche, Central Landscaped Lawns, Senior Citizen Plaza, Wide Cement Concrete Roads (9m, 12m, 18m), Underground Electrification, Rainwater Harvesting, and 24/7 Gated Security with CCTV.",
    category: "Amenities",
  },
  {
    id: 7,
    question: "How can I book a free site visit or speak with the sales desk?",
    answer: "You can connect directly with our Direct Sales Desk by calling +91 9326709970, messaging on WhatsApp, or using the contact form on this website. Complimentary pickup and drop site visits are arranged 7 days a week.",
    category: "Visits",
  },
]

const categories = ["all", "Location", "Legal", "Plots", "Pricing", "Finance", "Amenities"]

const QUICK_STATS = [
  { stat: "PP1190002602003", label: "Project MahaRERA" },
  { stat: "78+ Acres",       label: "Master Township"  },
  { stat: "524 Plots",       label: "Sanctioned Units" },
  { stat: "90% Loan",        label: "Bank Financed"    },
]

const FAQItem = memo(({ faq, isOpen, onToggle }: {
  faq: typeof faqs[number]
  isOpen: boolean
  onToggle: (id: number) => void
}) => {
  const handleClick = useCallback(() => onToggle(faq.id), [onToggle, faq.id])

  return (
    <div
      className="faq-item rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: isOpen ? "#ffffff" : "rgba(48,83,74,0.02)",
        border: isOpen ? "1px solid rgba(201,134,43,0.45)" : "1px solid rgba(48,83,74,0.1)",
        boxShadow: isOpen
          ? "0 8px 30px rgba(48,83,74,0.1), 0 2px 10px rgba(201,134,43,0.08)"
          : "none",
      }}
    >
      <button
        onClick={handleClick}
        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
      >
        <span
          className="font-bold text-sm sm:text-base leading-snug transition-colors"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: isOpen ? "#30534A" : "#0d0d0d",
          }}
        >
          {faq.question}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
          style={{
            background: isOpen ? "#30534A" : "rgba(48,83,74,0.08)",
            color: isOpen ? "#ffffff" : "#30534A",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-0 animate-in fade-in duration-200">
          <div className="h-px w-full bg-[#30534A]/10 mb-4" />
          <p
            className="text-xs sm:text-sm text-[#555] leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  )
})
FAQItem.displayName = "FAQItem"

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1)
  const [activeFilter, setActiveFilter] = useState("all")

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  const filteredFaqs = faqs.filter(
    (f) => activeFilter === "all" || f.category.toLowerCase() === activeFilter.toLowerCase()
  )

  return (
    <section
      id="faq"
      className="faq-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#fbfcfb" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2 sm:mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Everything You Need to Know <span className="text-[#30534A]">About</span> <span className="text-[#C9862b]">Anaya 51</span>
          </h2>

          <p className="text-xs sm:text-base text-[#555] leading-relaxed">
            Verified details regarding the Mouza Sumthana project location, NMRDA and MahaRERA approvals, plot dimensions, pricing, and bank loans.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  activeFilter.toLowerCase() === cat.toLowerCase()
                    ? "#30534A"
                    : "rgba(48,83,74,0.06)",
                color:
                  activeFilter.toLowerCase() === cat.toLowerCase()
                    ? "#ffffff"
                    : "#30534A",
                border:
                  activeFilter.toLowerCase() === cat.toLowerCase()
                    ? "1px solid #30534A"
                    : "1px solid rgba(48,83,74,0.15)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column: FAQs List on Left & Support Card on Right */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">

          {/* Left: Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Right: Quick Assistance Card */}
          <div className="space-y-6">
            <div
              className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #30534A 0%, #1c362f 100%)",
                boxShadow: "0 14px 40px rgba(48,83,74,0.25)",
              }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold mb-4">
                <HelpCircle size={14} className="text-[#C9862b]" />
                Have More Questions?
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold mb-2 leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Speak with our Direct Sales Desk
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Get instant answers on available plot inventory, corner plots, bank loan eligibility, or to book a free site visit.
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+919326709970"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #C9862b 0%, #b3731e 100%)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={15} />
                  Call Now: +91 9326709970
                </a>

                <a
                  href="https://wa.me/919326709970?text=Hi%2C%20I%20have%20questions%20about%20Mahalaxmi%20Nagar%2051%20Anaya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  <MessageSquare size={15} className="text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Quick Stat Tiles */}
            <div className="p-6 rounded-3xl bg-white border border-[#30534A]/12 shadow-sm space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9862b] block">
                Township Fast Facts
              </span>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="p-3 rounded-xl bg-[#30534A]/5">
                    <span className="text-sm font-extrabold text-[#30534A] block truncate" title={s.stat}>
                      {s.stat}
                    </span>
                    <span className="text-[10px] text-[#888] font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}