"use client"

import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react"
import { X, ZoomIn, ChevronLeft, ChevronRight, Image } from "lucide-react"

const galleryItems = [
  { id: 1,  src: "/gallery1.jpg",  alt: "Morning View",           category: "Exterior"   },
  { id: 2,  src: "/gallery2.jpg",  alt: "Well Maintained Square", category: "Amenities"  },
  { id: 3,  src: "/gallery3.jpg",  alt: "Grand Entrance",         category: "Exterior"   },
  { id: 4,  src: "/gallery4.jpg",  alt: "Tree Covered",           category: "Landscape"  },
  { id: 5,  src: "/gallery5.jpg",  alt: "Night View",             category: "Exterior"   },
  { id: 6,  src: "/gallery6.jpg",  alt: "Cozy Living Space",      category: "Interior"   },
  { id: 7,  src: "/gallery7.jpg",  alt: "Designer Interiors",     category: "Interior"   },
  { id: 8,  src: "/gallery8.jpg",  alt: "Premium Amenities",      category: "Amenities"  },
  { id: 9,  src: "/gallery9.jpg",  alt: "Swimming Pool",          category: "Amenities"  },
  { id: 10, src: "/gallery10.jpg", alt: "Evening View",           category: "Exterior"   },
  { id: 11, src: "/gallery11.jpg", alt: "Playground",             category: "Amenities"  },
  { id: 12, src: "/gallery12.jpg", alt: "Aerial Top View",        category: "Exterior"   },
]
const TOTAL = galleryItems.length
const nextId = (id: number) => galleryItems[(galleryItems.findIndex(g => g.id === id) + 1) % TOTAL].id
const prevId = (id: number) => galleryItems[(galleryItems.findIndex(g => g.id === id) - 1 + TOTAL) % TOTAL].id
const CATEGORIES = ["All", "Exterior", "Amenities", "Interior", "Landscape"] as const

const Lightbox = memo(({ id, onClose, onPrev, onNext }: { id: number; onClose: () => void; onPrev: () => void; onNext: () => void }) => {
  const item  = galleryItems.find(g => g.id === id)!
  const index = galleryItems.findIndex(g => g.id === id)
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close lightbox" className="lightbox__close"><X size={15} /></button>
        <div className="lightbox__frame">
          <img src={item.src} alt={item.alt} />
          <button onClick={onPrev} aria-label="Previous" className="lightbox__nav lightbox__nav--prev"><ChevronLeft size={18} /></button>
          <button onClick={onNext} aria-label="Next"     className="lightbox__nav lightbox__nav--next"><ChevronRight size={18} /></button>
        </div>
        <div className="lightbox__caption">
          <div>
            <p className="lightbox__cap-name">{item.alt}</p>
            <span className="lightbox__cap-cat">{item.category}</span>
          </div>
          <div className="lightbox__progress">
            {galleryItems.map((_, i) => <div key={i} className={`lightbox__prog-dot${i === index ? " active" : ""}`} />)}
          </div>
        </div>
      </div>
    </div>
  )
})
Lightbox.displayName = "Lightbox"

const Tile = memo(({ item, tall, visible, index, onOpen }: { item: typeof galleryItems[0]; tall?: boolean; visible: boolean; index: number; onOpen: (id: number) => void }) => (
  <div
    className={`gal-tile${tall ? " gal-tile--tall" : ""}${visible ? " on" : ""} s${index}`}
    onClick={() => onOpen(item.id)}
    role="button" tabIndex={0} aria-label={`View ${item.alt}`}
    onKeyDown={e => e.key === "Enter" && onOpen(item.id)}
  >
    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="gal-tile__img" />
    <div className="gal-tile__overlay" />
    <div className="gal-tile__zoom"><ZoomIn size={15} aria-hidden="true" /></div>
    <div className="gal-tile__cap">
      <span className="gal-tile__cat">{item.category}</span>
      <p className="gal-tile__name">{item.alt}</p>
    </div>
    <div className="gal-tile__bar" />
  </div>
))
Tile.displayName = "Tile"

export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasAnimated.current) { setIsVisible(true); hasAnimated.current = true } },
      { threshold: 0.05, rootMargin: "80px" }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (selectedId === null) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(id => id !== null ? nextId(id) : null) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(id => id !== null ? prevId(id) : null) }
      if (e.key === "Escape")     setSelectedId(null)
    }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [selectedId])

  const filteredItems = useMemo(() => 
    activeCategory === "All" ? galleryItems : galleryItems.filter(g => g.category === activeCategory),
    [activeCategory]
  )

  const open      = useCallback((id: number) => setSelectedId(id), [])
  const close     = useCallback(() => setSelectedId(null), [])
  const modalPrev = useCallback(() => setSelectedId(id => id !== null ? prevId(id) : null), [])
  const modalNext = useCallback(() => setSelectedId(id => id !== null ? nextId(id) : null), [])

  const vis = isVisible

  return (
    <section ref={sectionRef} id="gallery" aria-label="Project Gallery" className="gallery-v2">
      {/* Background */}
      <div className="gallery-v2__bg">
        <div className="gallery-v2__bg-gradient" />
      </div>

      {/* Header Strip */}
      <div className="gallery-v2__header-strip">
        <div className="gallery-v2__header-inner">
          <div className="gallery-v2__header-badge">
            <Image size={14} aria-hidden="true" />
            <span>Photo Gallery</span>
          </div>
          <span className="gallery-v2__header-count">{TOTAL} Photos</span>
        </div>
      </div>

      <div className="gallery-v2__inner">
        {/* Section Header */}
        <div className={`gallery-v2__section-header rv ${vis ? "on" : ""} d0`}>
          <h2 className="gallery-v2__title">
            Inside Our <em>Projects</em> & Spaces
          </h2>
          <p className="gallery-v2__subtitle">
            Real photographs from our actual sites - no renders, no stock photos.
          </p>
        </div>

        {/* Category Filter - Horizontal Scroll */}
        <div className={`gallery-v2__filter-wrap rv ${vis ? "on" : ""} d1`}>
          <div className="gallery-v2__filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`gallery-v2__filter ${activeCategory === cat ? "active" : ""}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="gallery-v2__filter-count">
                    {cat === "All" ? TOTAL : galleryItems.filter(g => g.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid - Desktop */}
        <div className={`gallery-v2__grid rv ${vis ? "on" : ""} d2`}>
          {filteredItems.map((item, i) => (
            <div 
              key={item.id} 
              className={`gallery-v2__item stagger-item ${vis ? "on" : ""} s${i % 12}`}
              onClick={() => open(item.id)}
            >
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              <div className="gallery-v2__item-overlay">
                <div className="gallery-v2__item-zoom">
                  <ZoomIn size={18} aria-hidden="true" />
                </div>
                <div className="gallery-v2__item-info">
                  <span className="gallery-v2__item-category">{item.category}</span>
                  <span className="gallery-v2__item-name">{item.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Gallery */}
        <div className={`gallery-v2__mobile rv ${vis ? "on" : ""} d2`}>
          <div className="gallery-v2__scroll">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-v2__scroll-item"
                onClick={() => open(item.id)}
              >
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                <div className="gallery-v2__scroll-overlay">
                  <span className="gallery-v2__scroll-category">{item.category}</span>
                  <span className="gallery-v2__scroll-name">{item.alt}</span>
                </div>
                <div className="gallery-v2__scroll-zoom">
                  <ZoomIn size={14} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
          <p className="gallery-v2__scroll-hint">Swipe to explore more</p>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="gallery-v2__trust-bar">
        <div className="gallery-v2__trust-inner">
          <span className="gallery-v2__trust-label">Every frame, a promise</span>
          <div className="gallery-v2__trust-items">
            {["Real Photography", "Actual Sites", "No Renders"].map(label => (
              <div key={label} className="gallery-v2__trust-item">
                <span className="gallery-v2__trust-dot" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedId !== null && <Lightbox id={selectedId} onClose={close} onPrev={modalPrev} onNext={modalNext} />}
    </section>
  )
}
