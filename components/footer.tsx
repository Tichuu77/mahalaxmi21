"use client"

import { memo } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

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
  { icon: Phone, href: "tel:+919326709970",              label: "+91 9326709970"           },
  { icon: Mail,  href: "mailto:kuwarb38@gmail.com", label: "kuwarb38@gmail.com" },
]

const certs = ["NMRDA Approved", "RERA Certified", "ISO Certified"]

export const Footer = memo(() => (
  <footer className="footer" aria-label="Site footer">
    <div className="footer__dot-bg" aria-hidden="true" />
    <div className="footer__glow-1" aria-hidden="true" />
    <div className="footer__glow-2" aria-hidden="true" />

    <div className="footer__inner">
      <div className="footer__grid">

        {/* Brand */}
        <div>
          <div className="footer__logo-wrap">
            <img
              src="/Malaxmi-Final-Logo-1.png"
              alt="Mahalaxmi Infra Logo"
              width={44}
              height={44}
              loading="lazy"
              className="footer__logo-img"
            />
            <div>
              <div className="footer__logo-name">Mahalaxmi Infra</div>
              <div className="footer__logo-sub">RERA Approved</div>
            </div>
          </div>
          <p className="footer__about-text">
            Nagpur's most trusted name in NMRDA sanctioned, RERA approved residential plots.
            Building landmarks since 2012.
          </p>
          <div className="gold-badge">
            <div className="gold-badge__dot" aria-hidden="true" />
            <span className="gold-badge__num">A50500037880</span>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer__col-divider">
          <div className="footer__col-header">
            <div className="footer__col-line" aria-hidden="true" />
            <h3 className="footer__col-label">Quick Links</h3>
          </div>
          <nav aria-label="Quick links">
            <ul className="footer__nav-list">
              {navLinks.slice(0, 5).map(link => (
                <li key={link.href}>
                  <a href={link.href} className="footer__nav-link">
                    <span className="footer__nav-link-dash" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Information */}
        <div className="footer__col-divider">
          <div className="footer__col-header">
            <div className="footer__col-line" aria-hidden="true" />
            <h3 className="footer__col-label">Information</h3>
          </div>
          <nav aria-label="Information links">
            <ul className="footer__nav-list">
              {navLinks.slice(5).map(link => (
                <li key={link.href}>
                  <a href={link.href} className="footer__nav-link">
                    <span className="footer__nav-link-dash" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer__col-divider">
          <div className="footer__col-header">
            <div className="footer__col-line" aria-hidden="true" />
            <h3 className="footer__col-label">Contact</h3>
          </div>
          <p className="footer__contact-name">Kuwar Bhairam</p>
          <address style={{ fontStyle: "normal" }}>
            <ul className="footer__contact-list">
              {contacts.map(c => {
                const Icon = c.icon
                return (
                  <li key={c.label}>
                    <a href={c.href} className="footer__contact-link">
                      <div className="footer__contact-icon-wrap" aria-hidden="true">
                        <Icon size={11} className="footer__contact-icon" />
                      </div>
                      {c.label}
                    </a>
                  </li>
                )
              })}
              <li>
                <div className="footer__addr">
                  <div className="footer__contact-icon-wrap" aria-hidden="true">
                    <MapPin size={11} className="footer__contact-icon" />
                  </div>
                  <p className="footer__addr-text">
                    Flat 103/104, Laxmivihar Apartment,<br />
                    Wardha Road, Somalwada,<br />
                    Nagpur 440025
                  </p>
                </div>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} Mahalaxmi Infra. All rights reserved.
        </p>
        <div className="footer__certs" role="list" aria-label="Certifications">
          {certs.map(cert => (
            <div key={cert} className="footer__cert" role="listitem">
              <div className="footer__cert-dot" aria-hidden="true" />
              <span className="footer__cert-name">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
))
Footer.displayName = "Footer"