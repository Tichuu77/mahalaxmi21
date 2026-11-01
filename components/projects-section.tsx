"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { ArrowRight, MapPin, Phone, ShieldCheck, CheckCircle2, Download, Sparkles, Compass, Maximize2 } from "lucide-react"

type PlotCategory = {
  id: string
  title: string
  sizeRange: string
  carpetDesc: string
  roadWidth: string
  facing: string
  priceStarting: string
  image: string
  tag: string
  features: string[]
  description: string
  suitableFor: string
}

const PLOT_COLLECTIONS: PlotCategory[] = [
  {
    id: "executive",
    title: "Executive Villa Plots",
    sizeRange: "1,130 – 1,500 Sq.Ft",
    carpetDesc: "Approx 105 to 140 Sq.Mtrs",
    roadWidth: "9m & 12m Cement Roads",
    facing: "East / West Facing Available",
    priceStarting: "Starting ₹35.4 Lakh*",
    image: "/project_M-51.png",
    tag: "Most Popular",
    features: ["NMRDA Sanctioned", "Clear Title RL", "Underground Drainage", "Up to 90% Loan"],
    description: "Perfect dimensions for building modern 3 to 4 BHK independent duplex villas. Positioned along quiet internal paved avenues with manicured street lighting and complete underground utility conduits.",
    suitableFor: "Ideal for young families, professionals, and smart investors seeking high capital appreciation.",
  },
  {
    id: "boulevard",
    title: "Premium Boulevard Plots",
    sizeRange: "1,800 – 2,500 Sq.Ft",
    carpetDesc: "Approx 167 to 232 Sq.Mtrs",
    roadWidth: "12m & 18m Tree-Lined Boulevards",
    facing: "Central Garden & Park Facing",
    priceStarting: "Custom Pricing on Request",
    image: "/gallery3.jpg",
    tag: "Garden Facing",
    features: ["Park Frontage", "Grand Avenues", "Rainwater Harvesting", "Bank Approved"],
    description: "Positioned directly facing the landscaped central lawns and botanical gardens. Provides generous width allowing spacious front lawns, dual-car driveways, and expansive private terrace verandas.",
    suitableFor: "Designed for buyers planning luxury custom villas with private landscaping and open green views.",
  },
  {
    id: "estate",
    title: "Royal Estate Corner Plots",
    sizeRange: "3,000 – 5,000 Sq.Ft",
    carpetDesc: "Approx 278 to 465 Sq.Mtrs",
    roadWidth: "Dual Road Access (12m & 18m)",
    facing: "Double-Side Open Corner",
    priceStarting: "Flagship Luxury Plots",
    image: "/gallery1.jpg",
    tag: "Exclusive Release",
    features: ["Corner Parcel", "Double Access", "Maximum Privacy", "Prime Elevation"],
    description: "The crown jewels of Mahalaxmi Nagar 51 Anaya. Limited edition large corner plots with dual road frontages, ideal for multi-storey royal mansions, swimming pools, private gazebos, and grand courtyards.",
    suitableFor: "Tailored for HNIs, industrialists, and multi-generational families building landmark private estates.",
  },
  {
    id: "clubhouse",
    title: "Clubhouse & Sports Enclave Plots",
    sizeRange: "1,500 – 2,200 Sq.Ft",
    carpetDesc: "Approx 140 to 205 Sq.Mtrs",
    roadWidth: "12m Wide Central Ring",
    facing: "Clubhouse & Turf Facing",
    priceStarting: "Lifestyle Premium",
    image: "/gallery9.jpg",
    tag: "Next to Amenities",
    features: ["30-Sec Walk to Pool", "Turf Proximity", "Creche Nearby", "24/7 Security"],
    description: "Situated just steps away from the grand multi-facility Clubhouse, Olympic-length swimming pool, Box Cricket Turf, Football Turf, and the day-care crèche. Offers unmatched everyday convenience.",
    suitableFor: "Ideal for active families with children and sports enthusiasts who value healthy resort living.",
  },
]


const TABS = [
  { label: "All Plot Layouts",     value: "all"       },
  { label: "1,130 – 1,500 Sq.Ft",  value: "executive" },
  { label: "1,800 – 2,500 Sq.Ft",  value: "boulevard" },
  { label: "3,000 – 5,000 Sq.Ft",  value: "estate"    },
  { label: "Clubhouse Enclave",    value: "clubhouse" },
] as const

type TabValue = (typeof TABS)[number]["value"]

export function ProjectsSection() {
  const [selectedTab, setSelectedTab] = useState<TabValue>("all")
  const [modalImage, setModalImage] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filteredPlots = useMemo(() => {
    if (selectedTab === "all") return PLOT_COLLECTIONS
    return PLOT_COLLECTIONS.filter((p) => p.id === selectedTab)
  }, [selectedTab])

  const handleWhatsAppInquiry = useCallback((title: string, sizeRange: string) => {
    const text = `Hi, I am interested in the "${title} (${sizeRange})" at Mahalaxmi Nagar 51 Anaya, Mouza Sumthana. Please share the detailed layout plan, available plot numbers, and pricing.`
    window.open(`https://wa.me/919326709970?text=${encodeURIComponent(text)}`, "_blank")
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#fbfcfb" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            ANAYA 51 MASTERPLAN &amp; INVENTORY
          </div>

          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2 sm:mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sanctioned Villa Plots &amp; <span className="text-[#30534A]">Township</span> <span className="text-[#C9862b]">Inventory</span>
          </h2>

          <p className="text-xs sm:text-base text-[#555] leading-relaxed">
            Spanning across a massive 78-acre integrated master plan at Mouza Sumthana.
            Featuring 524 clear-title, NMRDA-sanctioned residential plots with up to 90% bank loan approval.
          </p>
        </div>

        {/* Masterplan Showcase Banner Card */}
        <div
          className="rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-14 shadow-lg sm:shadow-xl border border-[#30534A]/15 bg-white"
          style={{ boxShadow: "0 10px 30px rgba(48,83,74,0.08)" }}
        >
          <div className="grid lg:grid-cols-[1.3fr_0.9fr] items-stretch">
            {/* Visual Masterplan Image with Zoom */}
            <div className="relative group bg-[#11231e] min-h-[240px] sm:min-h-[420px] overflow-hidden flex items-center justify-center">
              <img
                src="/project_M-51.png"
                alt="Mahalaxmi Nagar 51 Anaya Master Plan Layout"
                className="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border border-[#C9862b]/40">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[9px] sm:text-[11px] font-bold text-[#30534A] uppercase tracking-wider">
                  Official Sanctioned Layout
                </span>
              </div>

              <button
                onClick={() => setModalImage("/project_M-51.png")}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 hover:bg-[#30534A] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
              >
                <Maximize2 size={13} />
                Zoom Masterplan
              </button>
            </div>

            {/* Masterplan Highlights & Specifications */}
            <div className="p-4 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#fbfdfc]">
              <div>
                <div className="flex items-center gap-1.5 text-[#C9862b] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1.5">
                  <Compass size={14} />
                  Integrated Master Township
                </div>

                <h3
                  className="text-xl sm:text-3xl font-extrabold text-[#0d0d0d] mb-2 sm:mb-4 leading-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Anaya — Designed for Royal Living &amp; High ROI
                </h3>

                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-4 sm:mb-6">
                  Strategically situated at Mouza Sumthana, touching the Samruddhi Mahamarg Interchange. Designed with wide cement roads, underground drainage, electrical conduit, landscaped open spaces, and world-class sports &amp; community infrastructure.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-[10px] sm:text-xs text-[#888]">Total Project Size</span>
                    <span className="text-sm sm:text-lg font-extrabold text-[#30534A]">78+ Acres</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-[10px] sm:text-xs text-[#888]">Total Sanctioned Plots</span>
                    <span className="text-sm sm:text-lg font-extrabold text-[#C9862b]">524 Units</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-[10px] sm:text-xs text-[#888]">Plot Sizes Available</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0d0d0d]">1,130 to 5,000 Sq.Ft</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-[10px] sm:text-xs text-[#888]">Bank Loan Approval</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0d0d0d]">Up to 85% - 90%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-3 border-t border-[#30534A]/10">
                <a
                  href="tel:+919326709970"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] active:scale-95 text-center"
                  style={{
                    background: "linear-gradient(135deg, #30534A 0%, #203b34 100%)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={14} className="text-[#C9862b]" />
                  Call Desk (+91 9326709970)
                </a>

                <a
                  href="#contact"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-[#30534A] border border-[#30534A]/30 hover:border-[#C9862b] hover:text-[#C9862b] font-semibold text-xs sm:text-sm transition-all text-center"
                >
                  Request Masterplan PDF
                  <Download size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none sm:justify-center sm:flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  selectedTab === tab.value
                    ? "linear-gradient(135deg, #30534A, #244139)"
                    : "rgba(48,83,74,0.06)",
                color: selectedTab === tab.value ? "#ffffff" : "#30534A",
                border:
                  selectedTab === tab.value
                    ? "1px solid #30534A"
                    : "1px solid rgba(48,83,74,0.15)",
                boxShadow:
                  selectedTab === tab.value
                    ? "0 4px 15px rgba(48,83,74,0.25)"
                    : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Dedicated Mahalaxmi Nagar 51 Plot Collections: 2 per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 mb-8 sm:mb-12">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#30534A]/12 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ boxShadow: "0 6px 20px rgba(48,83,74,0.06)" }}
            >
              <div>
                {/* Card Top Image & Badges */}
                <div className="relative h-28 sm:h-44 overflow-hidden bg-[#182a25]">
                  <img
                    src={plot.image}
                    alt={plot.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold text-[#30534A] tracking-wider uppercase border border-[#C9862b]/30">
                    {plot.tag}
                  </div>

                  <span className="absolute bottom-2 right-2 bg-[#C9862b] text-white text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {plot.sizeRange}
                  </span>
                </div>

                {/* Card Body Details */}
                <div className="p-2.5 sm:p-5">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#C9862b] uppercase tracking-wider block mb-0.5">
                    Anaya 51
                  </span>

                  <h4
                    className="text-xs sm:text-base font-bold text-[#0d0d0d] leading-snug line-clamp-1 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {plot.title}
                  </h4>

                  <div className="space-y-1 pb-2.5 mb-2.5 border-b border-[#30534A]/10 text-[10px] sm:text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#888]">Facing:</span>
                      <span className="font-semibold text-[#0d0d0d] truncate ml-1">{plot.facing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#888]">Road:</span>
                      <span className="font-semibold text-[#0d0d0d] truncate ml-1">{plot.roadWidth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#888]">Pricing:</span>
                      <span className="font-bold text-[#C9862b] truncate ml-1">{plot.priceStarting}</span>
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-xs text-[#666] leading-tight line-clamp-2 mb-2 hidden sm:block">
                    {plot.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-2.5 sm:p-5 pt-0">
                <button
                  onClick={() => handleWhatsAppInquiry(plot.title, plot.sizeRange)}
                  className="w-full flex items-center justify-center gap-1 py-2 sm:py-2.5 rounded-xl text-white font-bold text-[11px] sm:text-xs transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #30534A, #25423b)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={12} className="text-[#C9862b]" />
                  <span>Inquire Plan</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Masterplan Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Full Masterplan"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center text-xs text-[#555] font-semibold">
              Mahalaxmi Nagar 51 (Anaya) • Sanctioned Township Master Plan • RERA: PP1190002602003
            </div>
          </div>
        </div>
      )}
    </section>
  )
}