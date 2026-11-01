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
      className="gallery-section relative overflow-hidden py-10 sm:py-16"
      style={{ background: "#fbfcfb" }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Header */}
        <div className={`mb-6 sm:mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ willChange: "transform, opacity" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            PHOTO GALLERY
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Inside Our <span className="text-[#30534A]">Projects</span> <span className="text-[#C9862b]">&amp; Spaces</span>
          </h2>
          <p className="text-xs sm:text-base text-[#666]">
            Real site photographs showcasing wide concrete avenues, green spaces, and ready infrastructure.
          </p>
        </div>

        {/* Mobile: 2 Cards per Row Grid */}
        <div className={`md:hidden mb-8 grid grid-cols-2 gap-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ willChange: "transform, opacity" }}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-xs border border-[#30534A]/10 group cursor-pointer active:scale-98 transition-transform"
              onClick={() => setSelectedId(item.id)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-white/80 text-[8px] uppercase tracking-wider block font-semibold">{item.category}</span>
                  <p className="font-bold text-white text-xs leading-tight line-clamp-1">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
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