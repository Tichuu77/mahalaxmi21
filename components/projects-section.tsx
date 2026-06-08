"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { ArrowRight, MapPin, Phone } from "lucide-react"

type Project = {
  id: number
  title: string
  image: string
  description: string
  location: string
  status: string
}

// Static data at module level
const projects = {
  ongoing: [
    { id: 1,  title: "Mahalaxmi Nagar-31",    image: "/ongoingProject8.webp",   description: "Ready to move residential layout on Besa-Pipla Road, opposite Zudio & Croma. Prime location with up to 90% bank finance.",                                                               location: "MOUZA - BESA",                      status: "ongoing"   },
    { id: 2,  title: "Mahalaxmi Nagar-39",    image: "/ongoingProject5.webp",   description: "New project on Katol Road, Fetri (Chicholi), touching Outer Ring Road. Fully developed NMRDA & RL sanctioned.",                                                                           location: "MOUZA - FETRI",                     status: "ongoing"   },
    { id: 3,  title: "Mahalaxmi Nagar-41",    image: "/ongoingProject3.webp",   description: "Premium layout near Samruddhi Mahamarg with clubhouse & swimming pool. NMRDA + RL approved. Up to 90% finance.",                                                                           location: "MOUZA - GOMGAON",                   status: "ongoing"   },
    { id: 4,  title: "Mahalaxmi Nagar - 42",  image: "/ongoingProject2.webp",   description: "Well-connected plots near Jamtha, Wardha Road. NMRDA & RL sanctioned with excellent amenities.",                                                                                           location: "MOUZA - JAMTHA",                    status: "ongoing"   },
    { id: 5,  title: "Mahalaxmi Nagar - 43",  image: "/project_43.jpg",         description: "Ready-to-move plots behind Royal Gondwana School, Shankarpur. Fully developed with 90% finance.",                                                                                          location: "MOUZA - SHANKARPUR",                status: "ongoing"   },
    { id: 6,  title: "Mahalaxmi Nagar - 45",  image: "/project_M-45.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - SUMTHANA",                  status: "ongoing"   },
    { id: 7,  title: "Mahalaxmi Nagar - 46",  image: "/project_M-46.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - BHANDARA JABALPUR OUTER RING ROAD TOUCH PROJECT",                  status: "ongoing"   },
    { id: 8,  title: "Tattva Apas",           image: "/tatava apas.webp",       description: "Tattva Apas offers contemporary living with 100+ meticulously crafted apartments. Featuring landscaped gardens, play areas, and fitness centers, it fosters a vibrant social atmosphere.", location: "MOUZA - BELTARODI",                 status: "ongoing"   },
    { id: 9, title: "Mahalaxmi Nagar - 47",  image: "/project_M-47.jpg",       description: "New launch behind Haldiram & AM Cinema on Koradi Road. NMRDA & RL approved with 90% finance.",                                                                                            location: "KORADI ROAD (Behind Haldiram)",     status: "ongoing"   },
    { id: 10, title: "Mahalaxmi Nagar - 49",  image: "/M-49-2.jpg.jpeg",           description: "", location: "Mouza SONDAPAR MIHAN NEAR AIIMS AND NCI OUTER RING ROAD TOUCH", status: "ongoing" },
    { id: 11, title: "Mahalaxmi Nagar - 52",  image: "/project_M-52.jpg",           description: "Mahalaxmi Developers launched the project Mahalaxmi Nagar 52. The layout is NIT / NMRDA sanctioned with 90% bank finance.", location: "MOUZA - DHAMNA HUDKESHAR ROAD NEAR OUTER RING ROAD", status: "ongoing" },
  ],
  completed: [
    { id: 12, title: "Mahalaxmi Nagar - 37",  image: "/completedProject1.webp", description: "NMRDA & RL sanctioned layout in Kotewada. 75-80% bank loan approved.",                    location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 13, title: "Mahalaxmi Nagar - 35",  image: "/completedProject2.webp", description: "Fully delivered premium layout with all amenities completed.",                             location: "MOUZA - KOTEWADA", status: "completed" },
    { id: 14, title: "Mahalaxmi Nagar - 34",  image: "/completedProject3.webp", description: "Successfully delivered project with high appreciation value.",                             location: "MOUZA - BAHADURA", status: "completed" },
  ],
  upcoming: [
    { id: 15, title: "Mahalaxmi Nagar - 48",  image: "/plotDef.avif",           description: "", location: "", status: "upcoming" },
    { id: 16, title: "Mahalaxmi Nagar - 50",  image: "/plotDef.avif",           description: "", location: "", status: "upcoming" },
  ],
}

const ALL_PROJECTS: Project[] = [
  ...projects.completed,
  ...projects.ongoing,
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
  { label: "All",       value: "all"       },
  { label: "Ongoing",   value: "ongoing"   },
  { label: "Completed", value: "completed" },
  { label: "Upcoming",  value: "upcoming"  },
] as const

type TabValue = (typeof TABS)[number]["value"]

// WhatsApp URL builders — pure functions, outside components
const featuredWAUrl = (title: string, location: string) =>
  `https://wa.me/919326709970?text=${encodeURIComponent(`Hi, I'm interested in "${title}" at ${location}. Could you share more details?`)}`

const cardWAUrl = (title: string, location: string) =>
  `https://wa.me/919326709970?text=${encodeURIComponent(`Hi, I'm interested in "${title}" at ${location}. Could you share more details?`)}`

/* ── FeaturedCard ── */
const FeaturedCard = memo(({ project }: { project: Project }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG]

  const handleWhatsApp = useCallback(() => {
    window.open(featuredWAUrl(project.title, project.location), "_blank")
  }, [project.title, project.location])

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: "#fff", border: "1px solid rgba(48,83,74,0.12)", boxShadow: "0 14px 44px rgba(48,83,74,0.1)" }}
    >
      <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr]">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ minHeight: "220px", maxHeight: "460px" }}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ minHeight: "220px" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)" }} />

          <div
            className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${cfg.border}`, backdropFilter: "blur(8px)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: cfg.text, fontFamily: "'Poppins', sans-serif" }}>
              {cfg.label}
            </span>
          </div>

          <div className="lg:hidden absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
              ★ Featured Project
            </p>
            <h3 className="font-bold text-white leading-tight drop-shadow-lg" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem" }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[linear-gradient(180deg,#ffffff_0%,#fbfcfb_100%)]">
          <div>
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-8 h-px" style={{ background: "#C9862b" }} />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
                  Featured Project
                </span>
              </div>
              <h3 className="font-bold text-[#0d0d0d] leading-tight" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.3rem, 2vw, 1.9rem)" }}>
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <MapPin size={13} style={{ color: "#C9862b", flexShrink: 0 }} />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#999", fontFamily: "'Inter', sans-serif" }}>
                {project.location}
              </span>
            </div>

            <p className="leading-relaxed mb-5 text-sm" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {FEATURED_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold rounded-full px-3 py-1"
                  style={{ background: "rgba(48,83,74,0.07)", border: "1px solid rgba(48,83,74,0.18)", color: "#30534A", fontFamily: "'Inter', sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleWhatsApp}
            className="group flex items-center justify-center gap-2 font-bold text-sm px-6 py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-[1.01] active:scale-95 w-full"
            style={{ background: "linear-gradient(135deg, #30534A, #3d6b60)", boxShadow: "0 6px 20px rgba(48,83,74,0.28)", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.03em" }}
          >
            <Phone size={15} />
            Contact Us
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
})
FeaturedCard.displayName = "FeaturedCard"

/* ── ProjectCard ── */
const ProjectCard = memo(({ project }: { project: Project }) => {
  const cfg = STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG]

  const handleWhatsApp = useCallback(() => {
    window.open(cardWAUrl(project.title, project.location), "_blank")
  }, [project.title, project.location])

  const handleEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#30534A"
    e.currentTarget.style.color = "#fff"
    e.currentTarget.style.borderColor = "transparent"
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(48,83,74,0.3)"
  }, [])

  const handleLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(48,83,74,0.07)"
    e.currentTarget.style.color = "#30534A"
    e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)"
    e.currentTarget.style.boxShadow = "none"
  }, [])

  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99]"
      style={{ background: "#fff", border: "1px solid rgba(48,83,74,0.1)", boxShadow: "0 8px 24px rgba(48,83,74,0.08)", willChange: "transform" }}
    >
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />

        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${cfg.border}`, backdropFilter: "blur(6px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: cfg.text, fontFamily: "'Poppins', sans-serif" }}>
            {cfg.label}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-[linear-gradient(180deg,#ffffff_0%,#fcfdfc_100%)]">
        <h3
          className="font-bold mb-2 leading-snug transition-colors duration-200 group-hover:text-[#30534A]"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", color: "#0d0d0d" }}
        >
          {project.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={12} style={{ color: "#C9862b", flexShrink: 0 }} />
          <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>
            {project.location}
          </span>
        </div>

        <p
          className="leading-relaxed mb-4 flex-1"
          style={{
            color: "#666",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold rounded-full px-2.5 py-1"
              style={{ background: "rgba(201,134,43,0.08)", border: "1px solid rgba(201,134,43,0.22)", color: "#a86a1a", fontFamily: "'Inter', sans-serif" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleWhatsApp}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="group/btn w-full flex items-center justify-center gap-2 font-semibold text-xs py-3 rounded-xl transition-all duration-250 active:scale-95"
          style={{ background: "rgba(48,83,74,0.07)", color: "#30534A", border: "1px solid rgba(48,83,74,0.18)", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.04em" }}
        >
          <Phone size={12} />
          Contact Us
          <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div
        className="h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #C9862b, #30534A)" }}
      />
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

/* ── Section ── */
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
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
      { threshold: 0.06, rootMargin: "60px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = useMemo(
    () => activeTab === "all" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.status === activeTab),
    [activeTab]
  )

  const [featured, ...rest] = filtered

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f9fbfa 70%, #ffffff 100%)" }}
    >
      {/* Left accent stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      {/* Label strip */}
      <div
        className="flex items-center gap-4 pl-6 pr-4 sm:pl-12 sm:pr-10 lg:px-24 py-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full"
          style={{ color: "#a86a1a", background: "rgba(201,134,43,0.12)", border: "1px solid rgba(201,134,43,0.3)", fontFamily: "'Poppins', sans-serif" }}
        >
          Portfolio
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(48,83,74,0.35)", fontFamily: "'Inter', sans-serif" }}>70+ Projects</span>
      </div>

      {/* Header */}
      <div
        className={`max-w-[1320px] mx-auto pl-6 pr-4 sm:pl-12 sm:pr-10 lg:px-24 pt-12 pb-8 relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 p-5 sm:p-7 rounded-2xl" style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(48,83,74,0.1)", boxShadow: "0 8px 26px rgba(48,83,74,0.06)" }}>
          <div>
            <h2
              className="font-bold text-[#0d0d0d] leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 5vw, 3.2rem)" }}
            >
              Our{" "}
              <span style={{ color: "#30534A" }}>Projects</span>{" "}
              &amp;{" "}
              <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Portfolio</span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
              Explore our completed, ongoing, and upcoming developments across Nagpur.
            </p>
          </div>

          <div
            className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveTab(t.value)}
                className="shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-250 active:scale-95"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: activeTab === t.value ? "linear-gradient(135deg, #30534A, #3d6b60)" : "rgba(48,83,74,0.07)",
                  color: activeTab === t.value ? "#fff" : "#30534A",
                  border: activeTab === t.value ? "1px solid #30534A" : "1px solid rgba(48,83,74,0.15)",
                  boxShadow: activeTab === t.value ? "0 8px 20px rgba(48,83,74,0.2)" : "none",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        className={`max-w-[1320px] mx-auto pl-6 pr-4 sm:pl-12 sm:pr-10 lg:px-24 pb-10 relative z-10 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        style={{ willChange: "transform, opacity" }}
      >
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏗️</div>
            <p className="text-base" style={{ color: "#aaa", fontFamily: "'Inter', sans-serif" }}>No projects in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {featured && <FeaturedCard project={featured} />}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {rest.map((project, i) => (
                  <div
                    key={project.id}
                    className="transition-all duration-500"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}