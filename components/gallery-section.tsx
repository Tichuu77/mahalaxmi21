"use client"

import { useEffect, useState, useRef, useCallback, memo } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Static data at module level
const galleryItems = [
  { id: 1,  src: "/gallery1.jpg",  alt: "Morning View",          category: "exterior"   },
  { id: 2,  src: "/gallery2.jpg",  alt: "Well Maintained Square", category: "amenities" },
  { id: 3,  src: "/gallery3.jpg",  alt: "Good Entrance",          category: "exterior"  },
  { id: 4,  src: "/gallery4.jpg",  alt: "Tree Covered",           category: "landscape" },
  { id: 5,  src: "/gallery5.jpg",  alt: "Night View",             category: "exterior"  },
  { id: 6,  src: "/gallery6.jpg",  alt: "Cozy Living Space",      category: "interior"  },
  { id: 7,  src: "/gallery7.jpg",  alt: "Designer Interiors",     category: "interior"  },
  { id: 8,  src: "/gallery8.jpg",  alt: "Premium Amenities",      category: "amenities" },
  { id: 9,  src: "/gallery9.jpg",  alt: "Swimming Pool",          category: "amenities" },
  { id: 10, src: "/gallery10.jpg", alt: "Evening View",           category: "exterior"  },
  { id: 11, src: "/gallery11.jpg", alt: "Playground",             category: "amenities" },
  { id: 12, src: "/gallery12.jpg", alt: "Top View",               category: "exterior"  },
]

const TOTAL = galleryItems.length

// Precomputed modular nav — avoids recalc in multiple places
const nextId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) + 1) % TOTAL].id
const prevId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) - 1 + TOTAL) % TOTAL].id

/* ── GalleryTile ── */
const GalleryTile = memo(({
  item, className, large = false, wide = false, onClick,
}: {
  item: { src: string; alt: string; category: string }
  className?: string
  large?: boolean
  wide?: boolean
  onClick: () => void
}) => (
  <div
    className={`group cursor-pointer relative rounded-2xl overflow-hidden ${className}`}
    onClick={onClick}
  >
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
      style={{ willChange: "transform" }}
    />

    <div
      className={`absolute inset-0 transition-opacity duration-300 ${wide ? "gallery-tile-overlay wide" : "gallery-tile-overlay"}`}
    />

    <div className={`absolute ${large || wide ? "bottom-5 left-5" : "bottom-3 left-3"}`}>
      {(large || wide) && (
        <span className="gallery-tile-category block text-[10px] uppercase tracking-widest mb-1 font-semibold">
          {item.category}
        </span>
      )}
      <p className="text-white font-bold drop-shadow-lg leading-tight" style={{ fontSize: large ? "1.15rem" : "0.78rem" }}>
        {item.alt}
      </p>
    </div>

    {large && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="gallery-tile-hover-icon w-14 h-14 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    )}

    {!large && (
      <div
        className="gallery-tile-accent absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-500"
      />
    )}
  </div>
))
GalleryTile.displayName = "GalleryTile"

/* ── Lightbox ── */
const Lightbox = memo(({ selectedId, onClose, onPrev, onNext }: {
  selectedId: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  const active = galleryItems.find(i => i.id === selectedId)!
  return (
    <div
      className="gallery-lightbox-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        style={{ maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={active.src}
          alt={active.alt}
          decoding="async"
          className="w-full rounded-2xl object-contain"
          style={{ maxHeight: "80vh" }}
        />

        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
          className="gallery-lightbox-nav-button absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
          className="gallery-lightbox-nav-button absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        <button
          onClick={onClose}
          aria-label="Close"
          className="gallery-lightbox-close-button absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <X size={18} className="text-white" />
        </button>

        <div
          className="gallery-lightbox-info absolute bottom-3 left-3 right-3 rounded-xl px-4 py-3"
        >
          <p className="text-white font-semibold text-sm">{active.alt}</p>
          <span className="gallery-lightbox-info-category text-[10px] uppercase tracking-widest font-semibold">
            {active.category}
          </span>
        </div>
      </div>
    </div>
  )
})
Lightbox.displayName = "Lightbox"

/* ── Section ── */
export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Intersection observer
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
      { threshold: 0.08, rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Keyboard nav — only attached when lightbox is open
  useEffect(() => {
    if (selectedId === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(id => id !== null ? nextId(id) : null) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(id => id !== null ? prevId(id) : null) }
      if (e.key === "Escape")     { e.preventDefault(); setSelectedId(null) }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId])

  const closeModal  = useCallback(() => setSelectedId(null), [])
  const modalPrev   = useCallback(() => setSelectedId(id => id !== null ? prevId(id) : null), [])
  const modalNext   = useCallback(() => setSelectedId(id => id !== null ? nextId(id) : null), [])
  const nextSlide   = useCallback(() => setCurrentSlide(p => (p + 1) % TOTAL), [])
  const prevSlide   = useCallback(() => setCurrentSlide(p => (p - 1 + TOTAL) % TOTAL), [])

  // Stable per-item open handlers — built once at render, tiles are memoized so they won't re-render
  // Use data-id pattern to avoid creating 12 closures
  const handleTileClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.id)
    if (id) setSelectedId(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="gallery-section relative overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Glow accents */}
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(201,134,43,0.08)" }} />
      <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(48,83,74,0.07)" }} />

      {/* Label strip */}
      <div
        className="gallery-section-label-strip flex items-center gap-4 px-6 sm:px-16 lg:px-24 py-5 relative z-10"
      >
        <span className="gallery-section-label text-[10px] tracking-[0.35em] uppercase font-bold">Gallery</span>
        <span className="gallery-section-label-divider flex-1" />
        <span className="gallery-section-label-subtitle text-[10px] tracking-[0.2em] uppercase font-medium">{TOTAL} Photos</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 lg:px-24 pt-8 pb-6 relative z-10">

        {/* Header */}
        <div className={`mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ willChange: "transform, opacity" }}>
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold block mb-3" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
            Visual Inspiration
          </span>
          <h2 className="font-bold leading-tight" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)", color: "#0d0d0d" }}>
            Inside Our{" "}
            <span style={{ color: "#30534A" }}>Projects</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>&amp; Spaces</span>
          </h2>
        </div>

        {/* Mobile slider */}
        <div className={`md:hidden mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ willChange: "transform, opacity" }}>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {galleryItems.map((item) => (
                  <div key={item.id} className="min-w-full relative group" onClick={() => setSelectedId(item.id)}>
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="w-full object-cover" style={{ height: "260px" }} />
                    <div className="gallery-mobile-slide-overlay absolute inset-0 flex items-end p-4">
                      <div>
                        <span className="text-white/70 text-[10px] uppercase tracking-widest block mb-0.5">{item.category}</span>
                        <p className="font-bold text-white text-base">{item.alt}</p>
                        <p className="text-white/50 text-xs mt-0.5">Tap to enlarge</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={prevSlide} aria-label="Previous" className="gallery-slide-nav-button absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all z-10">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={nextSlide} aria-label="Next" className="gallery-slide-nav-button absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all z-10">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            <div className="flex justify-center gap-1.5 mt-4">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentSlide === i ? "2rem" : "0.5rem",
                    background: currentSlide === i ? "#C9862b" : "rgba(48,83,74,0.25)"
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop masonry */}
        <div className={`hidden md:grid grid-cols-12 gap-4 lg:gap-5 auto-rows-[180px] transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ willChange: "opacity" }}>
          <GalleryTile item={galleryItems[0]} className="col-span-6 row-span-2" large onClick={() => setSelectedId(galleryItems[0].id)} />
          <GalleryTile item={galleryItems[1]} className="col-span-3 row-span-2"       onClick={() => setSelectedId(galleryItems[1].id)} />
          <GalleryTile item={galleryItems[2]} className="col-span-3 row-span-1"       onClick={() => setSelectedId(galleryItems[2].id)} />
          <GalleryTile item={galleryItems[3]} className="col-span-3 row-span-1"       onClick={() => setSelectedId(galleryItems[3].id)} />
          <GalleryTile item={galleryItems[4]} className="col-span-6 row-span-1" wide  onClick={() => setSelectedId(galleryItems[4].id)} />
          {galleryItems.slice(5, 12).map((item) => (
            <GalleryTile key={item.id} item={item} className="col-span-3 row-span-1" onClick={() => setSelectedId(item.id)} />
          ))}
        </div>
      </div>

      {/* Lightbox — only mounted when open */}
      {selectedId !== null && (
        <Lightbox
          selectedId={selectedId}
          onClose={closeModal}
          onPrev={modalPrev}
          onNext={modalNext}
        />
      )}
    </section>
  )
}