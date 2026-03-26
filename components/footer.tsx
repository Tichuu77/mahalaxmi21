"use client"

import { memo } from "react"
import { Phone, Mail, MapPin, ArrowUpRight, Heart } from "lucide-react"

const navLinks = [
  { href: "#about",        label: "About Us"        },
  { href: "#amenities",    label: "Amenities"       },
  { href: "#projects",     label: "Our Projects"    },
  { href: "#gallery",      label: "Gallery"         },
  { href: "#user-guide",   label: "How It Works"    },
  { href: "#news",         label: "News & Articles" },
  { href: "#testimonials", label: "Testimonials"    },
  { href: "#faq",          label: "FAQ"             },
  { href: "#contact",      label: "Contact Us"      },
]

const contacts = [
  { icon: Phone, href: "tel:+919970501128",              label: "+91 9970501128" },
  { icon: Mail,  href: "mailto:manoj.mungale@gmail.com", label: "manoj.mungale@gmail.com" },
]

export const Footer = memo(() => (
  <footer className="footer-v2" aria-label="Footer">
    {/* Background */}
    <div className="footer-v2__bg">
      <div className="footer-v2__bg-pattern" />
      <div className="footer-v2__glow-1" />
      <div className="footer-v2__glow-2" />
    </div>

    <div className="footer-v2__inner">
      {/* Top Section - Logo & CTA */}
      <div className="footer-v2__top">
        <div className="footer-v2__brand">
          <div className="footer-v2__logo">
            <img src="/Malaxmi-Final-Logo-1.png" alt="Mahalaxmi Infra Logo" width={56} height={56} loading="lazy" />
            <div>
              <div className="footer-v2__logo-name">Mahalaxmi Infra</div>
              <div className="footer-v2__logo-sub">RERA Approved</div>
            </div>
          </div>
          <p className="footer-v2__tagline">
            Nagpur&apos;s most trusted name in NMRDA sanctioned, RERA approved residential plots. Building landmarks since 2012.
          </p>
        </div>
        
        <div className="footer-v2__cta">
          <a href="#contact" className="footer-v2__cta-btn">
            <span>Schedule a Site Visit</span>
            <ArrowUpRight size={18} />
          </a>
          <a href="tel:+919970501128" className="footer-v2__cta-phone">
            <Phone size={16} />
            <span>+91 9970501128</span>
          </a>
        </div>
      </div>

      {/* Links Grid */}
      <div className="footer-v2__links-grid">
        {/* Quick Links */}
        <div className="footer-v2__links-col">
          <h3 className="footer-v2__col-title">Quick Links</h3>
          <ul className="footer-v2__links">
            {navLinks.slice(0, 5).map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer-v2__link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="footer-v2__links-col">
          <h3 className="footer-v2__col-title">Information</h3>
          <ul className="footer-v2__links">
            {navLinks.slice(5).map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer-v2__link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-v2__links-col">
          <h3 className="footer-v2__col-title">Contact</h3>
          <div className="footer-v2__contact-info">
            <p className="footer-v2__contact-name">Monoj Mungle</p>
            <ul className="footer-v2__contact-list">
              {contacts.map(c => {
                const Icon = c.icon
                return (
                  <li key={c.label}>
                    <a href={c.href} className="footer-v2__contact-link">
                      <Icon size={14} />
                      <span>{c.label}</span>
                    </a>
                  </li>
                )
              })}
              <li className="footer-v2__address">
                <MapPin size={14} />
                <address>
                  Flat 103/104, Laxmivihar Apartment,<br />
                  Wardha Road, Somalwada,<br />
                  Nagpur 440025
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="footer-v2__badges">
        {["NMRDA Approved", "RERA Certified", "ISO Certified", "70+ Projects", "17K+ Families"].map(badge => (
          <span key={badge} className="footer-v2__badge">{badge}</span>
        ))}
      </div>

      {/* Bottom */}
      <div className="footer-v2__bottom">
        <p className="footer-v2__copy">
          &copy; {new Date().getFullYear()} Mahalaxmi Infra. All rights reserved.
        </p>
        <p className="footer-v2__made">
          Made with <Heart size={12} className="footer-v2__heart" /> in Nagpur
        </p>
      </div>
    </div>
  </footer>
))
Footer.displayName = "Footer"
