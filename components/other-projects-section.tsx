"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { ArrowRight, MapPin, Phone, Building2, Sparkles } from "lucide-react"

type Project = {
  id: number
  title: string
  image: string
  description: string
  location: string
  status: string
}

const projects = {
  ongoing: [
    { id: 1,  title: "Mahalaxmi Nagar-31",    image: "/ongoingProject8.webp",   description: "Ready to move residential layout on Besa-Pipla Road, opposite Zudio & Croma. Prime location with up to 90% bank finance.", location: "MOUZA - BESA", status: "ongoing" },
    { id: 2,  title: "Mahalaxmi Nagar-39",    image: "/ongoingProject5.webp",   description: "New project on Katol Road, Fetri (Chicholi), touching Outer Ring Road. Fully developed NMRDA & RL sanctioned.", location: "MOUZA - FETRI", status: "ongoing" },
    { id: 3,  title: "Mahalaxmi Nagar-41",    image: "/ongoingProject3.webp",   description: "Premium layout near Samruddhi Mahamarg with clubhouse & swimming pool. NMRDA + RL approved. Up to 90% finance.", location: "MOUZA - GOMGAON", status: "ongoing" },
    { id: 4,  title: "Mahalaxmi Nagar - 42",  image: "/ongoingProject2.webp",   description: "Well-connected plots near Jamtha, Wardha Road. NMRDA & RL sanctioned with excellent amenities.", location: "MOUZA - JAMTHA", status: "ongoing" },
    { id: 5,  title: "Mahalaxmi Nagar - 43",  image: "/project_43.jpg",         description: "Ready-to-move plots behind Royal Gondwana School, Shankarpur. Fully developed with 90% finance.", location: "MOUZA - SHANKARPUR", status: "ongoing" },
    { id: 6,  title: "Mahalaxmi Nagar - 45",  image: "/project_M-45.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.", location: "MOUZA - SUMTHANA", status: "ongoing" },
    { id: 7,  title: "Mahalaxmi Nagar - 46",  image: "/project_M-46.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.", location: "MOUZA - BHANDARA JABALPUR OUTER RING ROAD TOUCH PROJECT", status: "ongoing" },
    { id: 8,  title: "Tattva Apas",           image: "/tatava apas.webp",       description: "Tattva Apas offers contemporary living with 100+ meticulously crafted apartments. Featuring landscaped gardens, play areas, and fitness centers.", location: "MOUZA - BELTARODI", status: "ongoing" },
    { id: 9,  title: "Mahalaxmi Nagar - 47",  image: "/project_M-47.jpg",       description: "New launch behind Haldiram & AM Cinema on Koradi Road. NMRDA & RL approved with 90% finance.", location: "KORADI ROAD (Behind Haldiram)", status: "ongoing" },
    { id: 10, title: "Mahalaxmi Nagar - 49",  image: "/project_M-49.jpeg",      description: "Fast-developing residential layout touching Outer Ring Road near AIIMS and NCI.", location: "Mouza SONDAPAR MIHAN NEAR AIIMS AND NCI OUTER RING ROAD TOUCH", status: "ongoing" },
    { id: 12, title: "Mahalaxmi Nagar - 52",  image: "/project_M-52.jpg",       description: "Mahalaxmi Developers launched Mahalaxmi Nagar 52. The layout is NIT / NMRDA sanctioned with 90% bank finance.", location: "MOUZA - DHAMNA HUDKESHAR ROAD NEAR OUTER RING ROAD", status: "ongoing" },
    { id: 13, title: "Mahalaxmi Nagar - 53",  image: "/plotDef.avif",           description: "NMRDA sanctioned plotted development with prime access to city arterial routes.", location: "MOUZA - SALAI (GODHANI)", status: "ongoing" },
    { id: 14, title: "Mahalaxmi Nagar - 54",  image: "/plotDef.avif",           description: "Prime residential layout along Kamptee corridor with clear title documentation.", location: "MOUZA - BHILGAON, KAMPTEE ROAD", status: "ongoing" },
  ],
  completed: [
    { id: 15, title: "Mahalaxmi Nagar - 37",  image: "/completedProject1.webp", description: "NMRDA & RL sanctioned layout in Kotewada. 75-80% bank loan approved.", location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 16, title: "Mahalaxmi Nagar - 35",  image: "/completedProject2.webp", description: "Fully delivered premium layout with all amenities completed.", location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 17, title: "Mahalaxmi Nagar - 34",  image: "/completedProject3.webp", description: "Successfully delivered project with high appreciation value.", location: "MOUZA - BAHADURA", status: "completed" },
  ],
  upcoming: [
    { id: 18, title: "Mahalaxmi Nagar - 48",  image: "/plotDef.avif",           description: "Upcoming master-planned residential layout with world-class utilities.", location: "NAGPUR OUTER CORRIDOR", status: "upcoming" },
    { id: 19, title: "Mahalaxmi Nagar - 50",  image: "/project_M-50.webp",      description: "Township development adjacent to Sumthana corridor with low-density villa plots.", location: "MOUZA - SUMTHANA", status: "upcoming" },
  ],
}

const ALL_PROJECTS: Project[] = [
  ...projects.ongoing,
  ...projects.completed,
  ...projects.upcoming,
]

const STATUS_CONFIG = {
  completed: { label: "Completed", dot: "#22c55e", bg: "rgba(34,197,94,0.1)",   text: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  ongoing:   { label: "Ongoing",   dot: "#C9862b", bg: "rgba(201,134,43,0.12)", text: "#a86a1a", border: "rgba(201,134,43,0.35)" },
  upcoming:  { label: "Upcoming",  dot: "#3b82f6", bg: "rgba(59,130,246,0.1)",  text: "#2563eb", border: "rgba(59,130,246,0.3)"  },
}

const TAGS = ["NMRDA Approved", "Bank Finance"]
const FEATURED_TAGS = [...TAGS, "RERA Certified"]

const TABS = [
  { label: "All Projects",  value: "all"       },
  { label: "Ongoing",       value: "ongoing"   },
  { label: "Completed",     value: "completed" },
  { label: "Upcoming",      value: "upcoming"  },
] as const

type TabValue = (typeof TABS)[number]["value"]

const cardWAUrl = (title: string, location: string) =>
  `https://wa.me/919326709970?text=${encodeURIComponent(`Hi, I'm interested in "${title}" at ${location}. Could you share more details and price sheet?`)}`

/* ── FeaturedCard ── */
const FeaturedCard = memo(({ project }: { project: Project }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.ongoing

  const handleWhatsApp = useCallback(() => {
    window.open(cardWAUrl(project.title, project.location), "_blank")
  }, [project.title, project.location])

  return (
    <div
      className="rounded-3xl overflow-hidden mb-6"
      style={{ background: "#fff", border: "1px solid rgba(48,83,74,0.12)", boxShadow: "0 14px 44px rgba(48,83,74,0.1)" }}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_1fr]">
        {/* Image */}
        <div className="relative overflow-hidden min-h-[220px] max-h-[380px] bg-[#1a2d27]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 45%)" }}
          />
          <span
            className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1 shadow-sm"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text, backdropFilter: "blur(8px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
            {cfg.label}
          </span>
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-[#C9862b]">
              <MapPin size={13} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-wider uppercase truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                {project.location}
              </span>
            </div>

            <h3
              className="font-bold text-[#0d0d0d] text-xl sm:text-2xl mb-3 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-4 line-clamp-3">
              {project.description || "Fully sanctioned plotted residential layout with complete road networks and verified bank loan eligibility."}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {FEATURED_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold rounded-full px-2.5 py-0.5"
                  style={{ background: "rgba(201,134,43,0.08)", border: "1px solid rgba(201,134,43,0.22)", color: "#a86a1a" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #30534A, #203b34)", fontFamily: "'Poppins', sans-serif" }}
            >
              <Phone size={13} className="text-[#C9862b]" />
              Inquire Project
            </button>
            <a
              href="#contact"
              className="px-4 py-3 rounded-xl border border-[#30534A]/25 text-[#30534A] hover:border-[#C9862b] hover:text-[#C9862b] text-xs font-bold transition-all flex items-center justify-center"
            >
              Cost Sheet
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})
FeaturedCard.displayName = "FeaturedCard"

/* ── ProjectCard ── */
const ProjectCard = memo(({ project }: { project: Project }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.ongoing

  const handleWhatsApp = useCallback(() => {
    window.open(cardWAUrl(project.title, project.location), "_blank")
  }, [project.title, project.location])

  return (
    <div
      className="group rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between bg-white border border-[#30534A]/12 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      style={{ boxShadow: "0 4px 16px rgba(48,83,74,0.06)" }}
    >
      <div>
        {/* Card Image */}
        <div className="relative h-28 sm:h-44 overflow-hidden bg-[#182a25]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
          <span
            className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase rounded-full px-2 py-0.5 shadow-xs"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text, backdropFilter: "blur(6px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
            {cfg.label}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-2.5 sm:p-4">
          <div className="flex items-center gap-1 text-[#C9862b] mb-1">
            <MapPin size={10} className="shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase truncate">
              {project.location}
            </span>
          </div>

          <h4
            className="font-bold text-[#0d0d0d] text-xs sm:text-base group-hover:text-[#30534A] transition-colors mb-1 sm:mb-2 leading-snug line-clamp-1"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {project.title}
          </h4>

          <p className="text-[10px] sm:text-xs text-[#666] leading-relaxed mb-2 line-clamp-2 hidden sm:block">
            {project.description || "NMRDA sanctioned residential plotted development with comprehensive amenities and quick registry."}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            <span className="text-[8px] sm:text-[9px] font-semibold rounded-md px-1.5 py-0.5 bg-[#30534A]/6 text-[#30534A] truncate">
              NMRDA Approved
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold rounded-md px-1.5 py-0.5 bg-[#C9862b]/10 text-[#a86a1a] truncate hidden sm:inline-block">
              Bank Finance
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-2.5 sm:p-4 pt-0">
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-1 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#30534A]/8 hover:bg-[#30534A] text-[#30534A] hover:text-white transition-all text-[10px] sm:text-xs font-bold cursor-pointer"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Phone size={11} className="text-[#C9862b]" />
          <span>Inquire</span>
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

/* ── Section Component ── */
export function OtherProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [showAll, setShowAll] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const filtered = useMemo(() => {
    if (activeTab === "all") return ALL_PROJECTS
    return ALL_PROJECTS.filter((p) => p.status === activeTab)
  }, [activeTab])

  // Clean presentation: 6 projects on mobile by default (8 on desktop) unless expanded
  const displayedProjects = useMemo(() => {
    if (showAll) return filtered
    return filtered.slice(0, 6)
  }, [filtered, showAll])

  const [featured, ...rest] = displayedProjects

  return (
    <section
      ref={sectionRef}
      id="other-projects"
      className="other-projects-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
              <Building2 size={13} className="text-[#C9862b]" />
              ESTABLISHED TRACK RECORD
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2 sm:mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Other Landmark <span className="text-[#30534A]">Projects</span> <span className="text-[#C9862b]">by Mahalaxmi</span>
            </h2>

            <p className="text-xs sm:text-base text-[#555] leading-relaxed">
              Explore our extensive portfolio of NMRDA-approved residential plotted layouts delivered across Nagpur's prime growth corridors.
            </p>
          </div>

          {/* Filter Tabs (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => { setActiveTab(t.value); setShowAll(false) }}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background:
                    activeTab === t.value
                      ? "linear-gradient(135deg, #30534A, #244139)"
                      : "rgba(48,83,74,0.06)",
                  color: activeTab === t.value ? "#ffffff" : "#30534A",
                  border: activeTab === t.value ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                  boxShadow: activeTab === t.value ? "0 4px 14px rgba(48,83,74,0.2)" : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards: Mobile App 2-in-a-row & Desktop Grid */}
        <div>
          {/* Desktop Only: Featured Project Hero Card (when All selected) */}
          {activeTab === "all" && featured && (
            <div className="hidden md:block mb-8">
              <FeaturedCard project={featured} />
            </div>
          )}

          {/* Mobile Screen: 2-in-a-row */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            {displayedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {/* Desktop/Tablet Screen: Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {(activeTab === "all" ? rest : displayedProjects).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        {/* Show More / Show Less Toggle Button */}
        {filtered.length > 6 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-6 py-2.5 rounded-full text-xs font-bold border border-[#30534A]/30 text-[#30534A] hover:bg-[#30534A] hover:text-white transition-all cursor-pointer shadow-xs"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {showAll ? "Show Less Projects" : `View All (${filtered.length}) Projects`}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
