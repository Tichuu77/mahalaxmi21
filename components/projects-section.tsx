"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { MapPin, Phone, ArrowRight } from "lucide-react"

type Project = {
  id: number
  title: string
  image: string
  description: string
  location: string
  status: "ongoing" | "completed" | "upcoming"
}

const allProjects: Project[] = [
  { id: 2,  title: "Mahalaxmi Nagar-31",    image: "/ongoingProject8.webp",   description: "Ready to move residential layout on Besa-Pipla Road, opposite Zudio & Croma. Prime location with up to 90% bank finance.",                                                               location: "MOUZA - BESA",                  status: "ongoing"   },
  { id: 3,  title: "Mahalaxmi Nagar-39",    image: "/ongoingProject5.webp",   description: "New project on Katol Road, Fetri (Chicholi), touching Outer Ring Road. Fully developed NMRDA & RL sanctioned.",                                                                           location: "MOUZA - FETRI",                 status: "ongoing"   },
  { id: 4,  title: "Mahalaxmi Nagar-41",    image: "/ongoingProject3.webp",   description: "Premium layout near Samruddhi Mahamarg with clubhouse & swimming pool. NMRDA + RL approved. Up to 90% finance.",                                                                           location: "MOUZA - GOMGAON",               status: "ongoing"   },
  { id: 5,  title: "Mahalaxmi Nagar - 42",  image: "/ongoingProject2.webp",   description: "Well-connected plots near Jamtha, Wardha Road. NMRDA & RL sanctioned with excellent amenities.",                                                                                           location: "MOUZA - JAMTHA",                status: "ongoing"   },
  { id: 6,  title: "Mahalaxmi Nagar - 43",  image: "/project_43.jpg",         description: "Ready-to-move plots behind Royal Gondwana School, Shankarpur. Fully developed with 90% finance.",                                                                                           location: "MOUZA - SHANKARPUR",            status: "ongoing"   },
  { id: 7,  title: "Mahalaxmi Nagar - 44",  image: "/M-44.jpg",               description: "Mahalaxmi Developers launched the project Mahalaxmi Nagar 44. The layout is NIT / NMRDA sanctioned with RL. Bank finance is available 75% to 80% from any nationalized bank.",            location: "MOUZA - TARODI",                status: "ongoing"   },
  { id: 8,  title: "Mahalaxmi Nagar - 45",  image: "/project_M-45.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - SUMTHANA",              status: "ongoing"   },
  { id: 9,  title: "Mahalaxmi Nagar - 46",  image: "/project_M-46.jpg",       description: "Premium plotted development near Samruddhi Mahamarg, close to AIIMS, IIM, MIHAN & D-Mart.",                                                                                               location: "MOUZA - SUMTHANA",              status: "ongoing"   },
  { id: 10, title: "Tattva Apas",           image: "/tatava apas.webp",        description: "Tattva Apas offers contemporary living with 100+ meticulously crafted apartments. Featuring landscaped gardens, play areas, and fitness centers, it fosters a vibrant social atmosphere.", location: "MOUZA - BELTARODI",             status: "ongoing"   },
  { id: 11, title: "Mahalaxmi Nagar - 47",  image: "/ongoingProject12.jpg",   description: "New launch behind Haldiram & AM Cinema on Koradi Road. NMRDA & RL approved with 90% finance.",                                                                                            location: "KORADI ROAD (Behind Haldiram)", status: "ongoing"   },
  { id: 12, title: "Mahalaxmi Nagar - 37",  image: "/completedProject1.webp", description: "NMRDA & RL sanctioned layout in Kotewada. 75-80% bank loan approved.",                                                                                                                     location: "MOUZA - KOTEWADA",              status: "completed" },
  { id: 13, title: "Mahalaxmi Nagar - 35",  image: "/completedProject2.webp", description: "Fully delivered premium layout with all amenities completed.",                                                                                                                              location: "MOUZA - KOTEWADA",              status: "completed" },
  { id: 14, title: "Mahalaxmi Nagar - 34",  image: "/completedProject3.webp", description: "Successfully delivered project with high appreciation value.",                                                                                                                              location: "MOUZA - BAHADURA",              status: "completed" },
  { id: 15, title: "Mahalaxmi Nagar - 48",  image: "/plotDef.avif",           description: "",                                                                                                                                                                                          location: "",                              status: "upcoming"  },
  { id: 16, title: "Mahalaxmi Nagar - 49",  image: "/plotDef.avif",           description: "",                                                                                                                                                                                          location: "",                              status: "upcoming"  },
  { id: 17, title: "Mahalaxmi Nagar - 50",  image: "/plotDef.avif",           description: "",                                                                                                                                                                                          location: "",                              status: "upcoming"  },
]

const TABS = [
  { label: "All",       value: "all"       },
  { label: "Ongoing",   value: "ongoing"   },
  { label: "Completed", value: "completed" },
  { label: "Upcoming",  value: "upcoming"  },
] as const

type TabValue = typeof TABS[number]["value"]

const waUrl = (title: string, location: string) =>
  `https://wa.me/919326709970?text=${encodeURIComponent(`Hi, I'm interested in "${title}"${location ? ` at ${location}` : ""}. Could you share more details?`)}`

/* ── Status Badge ── */
const StatusBadge = memo(({ status }: { status: Project["status"] }) => (
  <div className={`status-badge status-badge--${status}`} aria-label={`Status: ${status}`}>
    <span className={`status-badge__dot status-badge__dot--${status}`} aria-hidden="true" />
    <span className={`status-badge__label status-badge__label--${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
))
StatusBadge.displayName = "StatusBadge"

/* ── Hero Card ── */
const HeroCard = memo(({ project }: { project: Project }) => {
  const openWA = useCallback(
    () => window.open(waUrl(project.title, project.location), "_blank"),
    [project.title, project.location]
  )

  return (
    <article className="proj-hero" aria-label={`Featured project: ${project.title}`}>
      <div className="proj-hero__grid">
        <div className="proj-hero__img-wrap">
          <img
            src={project.image}
            alt={`${project.title} – ${project.location}`}
            loading="lazy"
            decoding="async"
            className="proj-hero__img"
          />
          <div className="proj-hero__img-overlay" aria-hidden="true" />
          <div className="proj-hero__status">
            <StatusBadge status={project.status} />
          </div>
          <div className="proj-hero__mob-title">
            <span className="proj-hero__mob-title-eyebrow">Featured Project</span>
            <h3 className="proj-hero__mob-title-h3">{project.title}</h3>
          </div>
        </div>

        <div className="proj-hero__content">
          <div className="proj-hero__desk-title">
            <div className="proj-hero__eyebrow section-eyebrow">
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Featured Project</span>
            </div>
            <h3 className="proj-hero__title">{project.title}</h3>
          </div>

          {project.location && (
            <div className="proj-hero__loc">
              <div className="proj-hero__loc-icon-wrap" aria-hidden="true">
                <MapPin size={11} className="proj-hero__loc-icon" />
              </div>
              <span className="proj-hero__loc-text">{project.location}</span>
            </div>
          )}

          {project.description && (
            <p className="proj-hero__desc">{project.description}</p>
          )}

          <div className="proj-hero__tags" aria-label="Project features">
            {["NMRDA Approved", "Bank Finance", "RERA Certified"].map(t => (
              <span key={t} className="tag-pill tag-pill--green">{t}</span>
            ))}
          </div>

          <button onClick={openWA} className="proj-hero__cta" aria-label={`Enquire about ${project.title}`}>
            <Phone size={13} aria-hidden="true" />
            Enquire Now
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
})
HeroCard.displayName = "HeroCard"

/* ── Grid Card ── */
const ProjectCard = memo(({ project, index, visible }: {
  project: Project
  index: number
  visible: boolean
}) => {
  const openWA = useCallback(
    () => window.open(waUrl(project.title, project.location), "_blank"),
    [project.title, project.location]
  )

  return (
    <article
      className={`proj-card stagger-item${visible ? " on" : ""} s${index}`}
      aria-label={project.title}
    >
      <div className="proj-card__img-wrap">
        <img
          src={project.image}
          alt={`${project.title} – ${project.location}`}
          loading="lazy"
          decoding="async"
          className="proj-card__img"
        />
        <div className="proj-card__status">
          <StatusBadge status={project.status} />
        </div>
        <span className="proj-card__num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="proj-card__body">
        <h3 className="proj-card__title">{project.title}</h3>

        {project.location && (
          <div className="proj-card__loc">
            <MapPin size={9} className="proj-card__loc-icon" aria-hidden="true" />
            <span className="proj-card__loc-text">{project.location}</span>
          </div>
        )}

        {project.description && (
          <p className="proj-card__desc">{project.description}</p>
        )}

        <div className="proj-card__tags">
          <span className="tag-pill tag-pill--gold">NMRDA</span>
          <span className="tag-pill tag-pill--gold">Bank Finance</span>
        </div>

        <button
          onClick={openWA}
          className="proj-card__btn"
          aria-label={`Contact us about ${project.title}`}
        >
          <Phone size={10} aria-hidden="true" />
          Contact Us
        </button>
      </div>

      <div className="proj-card__bar" aria-hidden="true" />
    </article>
  )
})
ProjectCard.displayName = "ProjectCard"

/* ── Section ── */
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.05, rootMargin: "60px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filtered = useMemo(
    () => activeTab === "all" ? allProjects : allProjects.filter(p => p.status === activeTab),
    [activeTab]
  )

  const [hero, ...rest] = filtered
  const vis = isVisible

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Our Projects"
      className="projects"
    >
      <div className="label-strip label-strip--dark">
        <div className="label-strip__line" />
        <span className="label-strip__text">Our Portfolio</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">{allProjects.length} Projects</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 projects__header`}>
          <div>
            <div className="section-eyebrow">
              <div className="section-eyebrow__line" />
              <span className="section-eyebrow__label">Completed · Ongoing · Upcoming</span>
            </div>
            <h2 className="section-heading section-heading--white">
              Our <em>Landmark</em><br /><span className="green">Projects</span>
            </h2>
          </div>

          <div className="projects__tabs" role="tablist" aria-label="Filter projects">
            {TABS.map(t => (
              <button
                key={t.value}
                role="tab"
                aria-selected={activeTab === t.value}
                onClick={() => setActiveTab(t.value)}
                className={`projects__tab${activeTab === t.value ? " active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="proj-empty">
            <div className="proj-empty__emoji" role="img" aria-label="Under construction">🏗️</div>
            <p className="proj-empty__text">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="proj-list">
            {hero && (
              <div className={`rv ${vis ? "on" : ""} d1`}>
                <HeroCard project={hero} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="proj-grid">
                {rest.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} visible={vis} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="trust-bar trust-bar--dark">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Building landmarks since 2012</p>
          <div className="trust-bar__items" role="list">
            {["NMRDA Approved", "Up to 90% Finance", "RERA Certified"].map(label => (
              <div key={label} className="trust-bar__item" role="listitem">
                <div className="trust-bar__dot" aria-hidden="true" />
                <span className="trust-bar__name">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}