"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { X, Menu } from "lucide-react"

const navLinks = [
  { href: "#about",        label: "About"        },
  { href: "#amenities",    label: "Amenities"    },
  { href: "#projects",     label: "Projects"     },
  { href: "#gallery",      label: "Gallery"      },
  { href: "#user-guide",   label: "User Guide"   },
  { href: "#news",         label: "News"         },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact"      },
]

const DesktopLinks = memo(() => (
  <div className="nav__links">
    {navLinks.map(link => (
      <a key={link.href} href={link.href} className="nav__link">{link.label}</a>
    ))}
  </div>
))
DesktopLinks.displayName = "DesktopLinks"

export function Navigation() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const toggle    = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Top navigation */}
      <nav role="navigation" aria-label="Main navigation" className={`nav ${scrolled ? "nav--scrolled" : "nav--top"}`}>
        <div className="nav__inner">
          <a href="#home" aria-label="Mahalaxmi Infra – Home" className="nav__logo">
            <img src="/Malaxmi-Final-Logo-1.png" alt="Mahalaxmi Infra Logo" width={72} height={72} className="nav__logo-img" fetchPriority="high" decoding="sync" />
            <div>
              <div className="nav__logo-name">Mahalaxmi Infra</div>
            </div>
          </a>
          <DesktopLinks />
          <div className="nav__cta">
            <a href="#contact" className="nav__cta-btn">Get Started</a>
          </div>
          <div className="nav__toggle">
            <button onClick={toggle} className="nav__toggle-btn" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      {isOpen && (
        <>
          <div className="nav__overlay" onClick={closeMenu} />
          <div className="nav__drawer">
            <div className="nav__drawer-header">
              <div className="nav__drawer-logo">
                <img src="/Malaxmi-Final-Logo-1.png" alt="Mahalaxmi Infra Logo" width={44} height={44} />
                <div>
                  <div className="nav__drawer-logo-name">Mahalaxmi Infra</div>
                  <div className="nav__drawer-logo-sub">RERA Approved</div>
                </div>
              </div>
              <button onClick={closeMenu} className="nav__drawer-close" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            
            <div className="nav__drawer-links">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="nav__drawer-link" onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className="nav__drawer-footer">
              <a href="#contact" className="nav__drawer-cta" onClick={closeMenu}>
                Schedule a Site Visit
              </a>
              <div className="nav__drawer-badges">
                <span className="nav__drawer-badge">NMRDA Approved</span>
                <span className="nav__drawer-badge">RERA Certified</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
