'use client'

import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import { memo } from "react"

// Static data at module level
const navLinks = [
  { href: "#about",     label: "About"     },
  { href: "#amenities", label: "Amenities" },
  { href: "#projects",  label: "Projects"  },
  { href: "#gallery",   label: "Gallery"   },
]

const resourceLinks = [
  { href: "#user-guide",   label: "User Guide"   },
  { href: "#news",         label: "News"         },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact"      },
]

// Current year computed once at module level — never changes during session
const CURRENT_YEAR = new Date().getFullYear()

// Shared hover handlers — module-level, not re-created per link per render
const linkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "#C9862b"
}
const linkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "rgba(255,255,255,0.5)"
}

// Reusable nav link list
const NavList = memo(({ links }: { links: typeof navLinks }) => (
  <ul className="space-y-3">
    {links.map((link) => (
      <li key={link.href}>
        <a
          href={link.href}
          className="footer-nav-link flex items-center gap-2 group"
          onMouseEnter={linkEnter}
          onMouseLeave={linkLeave}
        >
          <span className="footer-nav-link-bar" />
          {link.label}
        </a>
      </li>
    ))}
  </ul>
))
NavList.displayName = "NavList"

// Icon badge — shared between contact items
const IconBadge = memo(({ icon: Icon }: { icon: React.ElementType }) => (
  <span className="footer-icon-badge">
    <Icon size={13} />
  </span>
))
IconBadge.displayName = "IconBadge"

// Footer is fully static after mount — memo at top level
export const Footer = memo(function Footer() {
  return (
    <footer className="footer relative overflow-hidden">
      {/* Dot texture */}
      <div className="footer-dot-texture absolute inset-0 pointer-events-none" />

      {/* Gold top border */}
      <div className="footer-top-border w-full" />

      {/* Label strip */}
      <div className="footer-label-strip flex items-center gap-4 pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 py-4 relative z-10">
        <span className="footer-label">Mahalaxmi Infra</span>
        <span className="footer-divider flex-1" />
      </div>

      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto pl-8 pr-8 sm:pl-16 sm:pr-12 lg:px-24 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-10 lg:gap-8 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Malaxmi-Final-Logo.-2png.png"
                alt="Mahalaxmi Infra Logo"
                loading="lazy"
                decoding="async"
                className="w-16 h-16 object-contain"
                width={64}
                height={64}
              />
              <div>
                <span className="footer-logo-text">Mahalaxmi Infra</span>
                <span className="footer-subtitle">Premium Real Estate</span>
              </div>
            </div>

            <p className="footer-description">
              Delivering premium residential &amp; commercial plots with excellence, transparency, and innovation across Nagpur.
            </p>

            <div className="footer-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5">
              <span className="footer-badge-dot" />
              <span className="footer-badge-text">MAHA RERA NO. A50500037880</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-section-title">Navigation</h4>
            <NavList links={navLinks} />
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer-section-title">Resources</h4>
            <NavList links={resourceLinks} />
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-section-title">Contact</h4>
            <p className="footer-contact-name">Kuwar Bhairam</p>

            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919326709970"
                  className="footer-contact-item flex items-center gap-3"
                  onMouseEnter={linkEnter}
                  onMouseLeave={linkLeave}
                >
                  <IconBadge icon={Phone} />
                  +91 9326709970
                </a>
              </li>
              <li>
                <a
                  href="mailto:kuwarb38@gmail.com"
                  className="footer-contact-item flex items-center gap-3"
                  onMouseEnter={linkEnter}
                  onMouseLeave={linkLeave}
                >
                  <IconBadge icon={Mail} />
                  kuwarb38@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm footer-contact-item">
                <span className="mt-0.5">
                  <IconBadge icon={MapPin} />
                </span>
                <span className="leading-relaxed">
                  Flat 103/104, Laxmivihar Apartment, Wardha Road, Somalwada, Nagpur 440025
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-divider flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6">
          <div>
            <p className="footer-copyright">© {CURRENT_YEAR} Mahalaxmi Infra. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9862b" }} />
            <p className="footer-badge-info">NMRDA Sanctioned · RERA Approved · ISO Certified</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/18PdfPMute/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mahalaxmi Infra Facebook"
              className="footer-social-link transition-colors duration-200"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/mahalaxmiinfra_ak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mahalaxmi Infra Instagram"
              className="footer-social-link transition-colors duration-200"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})