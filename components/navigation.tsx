"use client"

import { useState, useCallback, useEffect, memo } from "react"
import { X, Menu, Home, Building2, Image, Phone, Info, Grid3X3, MessageSquare, Newspaper } from "lucide-react"

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

// Mobile bottom nav items - limited to 5 for app-like experience
const mobileNavItems = [
  { href: "#home",     label: "Home",     icon: Home      },
  { href: "#projects", label: "Projects", icon: Building2 },
  { href: "#gallery",  label: "Gallery",  icon: Image     },
  { href: "#about",    label: "About",    icon: Info      },
  { href: "#contact",  label: "Contact",  icon: Phone     },
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
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Track active section for mobile nav
  useEffect(() => {
    const sections = ["home", "projects", "gallery", "about", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const toggle    = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Top navigation - desktop and mobile header */}
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

      {/* Mobile Bottom Navigation - App-like */}
      <div className="mobile-bottom-nav">
        <div className="mobile-bottom-nav__inner">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.replace("#", "")
            return (
              <a
                key={item.href}
                href={item.href}
                className={`mobile-bottom-nav__item ${isActive ? "active" : ""}`}
                aria-label={item.label}
              >
                <div className={`mobile-bottom-nav__icon ${isActive ? "active" : ""}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className={`mobile-bottom-nav__label ${isActive ? "active" : ""}`}>
                  {item.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Full screen drawer for more options */}
      {isOpen && (
        <div className="nav__drawer">
          <div className="nav__drawer-header">
            <div className="nav__drawer-logo">
              <img src="/Malaxmi-Final-Logo-1.png" alt="Mahalaxmi Infra Logo" width={48} height={48} />
              <div>
                <div className="nav__drawer-logo-name">Mahalaxmi Infra</div>
                <div className="nav__drawer-logo-sub">RERA Approved</div>
              </div>
            </div>
            <button onClick={closeMenu} className="nav__drawer-close" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          
          <div className="nav__drawer-label">
            <div className="nav__drawer-label-line" />
            <span className="nav__drawer-label-text">Explore</span>
          </div>
          
          <div className="nav__drawer-grid">
            {navLinks.map((link, index) => {
              const icons = [Info, Grid3X3, Building2, Image, MessageSquare, Newspaper, MessageSquare, Phone]
              const Icon = icons[index] || Info
              return (
                <a key={link.href} href={link.href} className="nav__drawer-card" onClick={closeMenu}>
                  <div className="nav__drawer-card-icon">
                    <Icon size={20} />
                  </div>
                  <span className="nav__drawer-card-label">{link.label}</span>
                </a>
              )
            })}
          </div>
          
          <div className="nav__drawer-footer">
            <a href="#contact" className="nav__drawer-cta" onClick={closeMenu}>
              Schedule a Site Visit
            </a>
            <div className="nav__drawer-trust">
              <span className="nav__drawer-trust-badge">NMRDA Approved</span>
              <span className="nav__drawer-trust-badge">RERA Certified</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
