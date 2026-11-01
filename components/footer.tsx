"use client"

import { memo, useCallback } from "react"
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, ShieldCheck } from "lucide-react"

const CURRENT_YEAR = new Date().getFullYear()

const navLinks = [
  { href: "#about",          label: "About Anaya"    },
  { href: "#projects",       label: "Township 51"    },
  { href: "#amenities",      label: "30+ Amenities"  },
  { href: "#location",       label: "Connectivity"   },
  { href: "#other-projects", label: "Other Projects" },
  { href: "#gallery",        label: "Site Gallery"   },
  { href: "#why-choose-us",  label: "Why Invest"     },
  { href: "#faq",            label: "Township FAQ"   },
  { href: "#contact",        label: "Contact Desk"   },
]

const resourceLinks = [
  { href: "#projects", label: "Executive Plots (1,130 - 1,500 Sq.Ft)" },
  { href: "#projects", label: "Boulevard Plots (1,800 - 2,500 Sq.Ft)" },
  { href: "#projects", label: "Estate Corner Plots (3,000 - 5,000 Sq.Ft)" },
  { href: "#contact",  label: "Download Sanctioned Masterplan PDF"    },
  { href: "#contact",  label: "Schedule Free Site Visit with Cab"     },
  { href: "#contact",  label: "Bank Loan EMI & Eligibility Guide"      },
]

const linkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "#C9862b"
}
const linkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = "rgba(255,255,255,0.7)"
}

const NavList = memo(({ links }: { links: typeof navLinks }) => (
  <ul className="space-y-2">
    {links.map((link) => (
      <li key={`${link.href}-${link.label}`}>
        <a
          href={link.href}
          className="flex items-center gap-2 group text-xs text-white/70 hover:text-[#C9862b] transition-colors"
          onMouseEnter={linkEnter}
          onMouseLeave={linkLeave}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9862b]/50 group-hover:bg-[#C9862b] transition-colors" />
          {link.label}
        </a>
      </li>
    ))}
  </ul>
))
NavList.displayName = "NavList"

const IconBadge = memo(({ icon: Icon }: { icon: React.ElementType }) => (
  <span className="w-7 h-7 rounded-lg bg-[#30534A]/80 border border-[#C9862b]/30 flex items-center justify-center shrink-0 text-[#C9862b]">
    <Icon size={13} />
  </span>
))
IconBadge.displayName = "IconBadge"

export const Footer = memo(function Footer() {
  return (
    <footer className="footer relative overflow-hidden bg-[#0d1714] text-white">
      {/* Decorative Top Gold Border */}
      <div
        className="w-full h-1"
        style={{ background: "linear-gradient(90deg, #30534A, #C9862b, #30534A)" }}
      />

      {/* Label Strip */}
      <div className="flex items-center gap-4 px-6 sm:px-12 lg:px-20 py-4 border-b border-white/10 relative z-10 text-xs">
        <span className="font-bold tracking-widest text-[#C9862b] uppercase">
          Mahalaxmi Nagar 51 • Anaya Township
        </span>
        <span className="flex-1 h-px bg-white/10" />
        <span className="text-white/60 text-[11px] hidden sm:inline">
          Mouza Sumthana, Samruddhi Corridor, Nagpur
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.8fr] gap-10 lg:gap-8 mb-12">

          {/* Brand & Project Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Malaxmi-Final-Logo.-2png.png"
                alt="Mahalaxmi Infra Logo"
                loading="lazy"
                decoding="async"
                className="w-14 h-14 object-contain"
                width={56}
                height={56}
              />
              <div>
                <span
                  className="block text-lg font-extrabold text-white tracking-wide"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  MAHALAXMI INFRA
                </span>
                <span className="block text-[10px] font-bold text-[#C9862b] tracking-widest uppercase">
                  A TRADITION OF TRUST
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed mb-4 max-w-sm">
              Developing <strong>Mahalaxmi Nagar 51 (Anaya)</strong> — a premier 78-acre master-planned residential plotted township at Mouza Sumthana, Nagpur.
            </p>

            <div className="space-y-1.5 text-[11px]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                <ShieldCheck size={12} className="text-[#C9862b]" />
                <span>Project MahaRERA: <strong>PP1190002602003</strong></span>
              </div>
              <br />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                <ShieldCheck size={12} className="text-[#C9862b]" />
                <span>Agent MahaRERA: <strong>A50500037880</strong></span>
              </div>
            </div>
          </div>

          {/* Township Navigation */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-[#C9862b] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Township
            </h4>
            <NavList links={navLinks} />
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-[#C9862b] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Explore
            </h4>
            <NavList links={resourceLinks} />
          </div>

          {/* Dedicated Sales Desk Contact */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-[#C9862b] mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Sales Desk
            </h4>
            <p className="text-sm font-bold text-white mb-0.5">
              Direct Booking Desk
            </p>
            <p className="text-[11px] text-[#C9862b] font-semibold uppercase tracking-wider mb-4">
              Mahalaxmi Infra • Agent RERA: A50500037880
            </p>

            <ul className="space-y-2.5 text-xs text-white/80">
              <li>
                <a
                  href="tel:+919326709970"
                  className="flex items-center gap-2.5 hover:text-[#C9862b] transition-colors"
                >
                  <IconBadge icon={Phone} />
                  <span>+91 9326709970</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kuwarb38@gmail.com"
                  className="flex items-center gap-2.5 hover:text-[#C9862b] transition-colors truncate"
                >
                  <IconBadge icon={Mail} />
                  <span className="truncate">kuwarb38@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconBadge icon={MapPin} />
                <span className="leading-relaxed text-[11px]">
                  Flat 103/104, Laxmivihar Apartment, Wardha Road, Somalwada, Nagpur 440025
                </span>
              </li>
              <li>
                <a
                  href="https://www.mahalaxmiinfra.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#C9862b] hover:underline"
                >
                  <IconBadge icon={Globe} />
                  <span>www.mahalaxmiinfra.in</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/10 text-xs text-white/60">
          <div>
            <p>© {CURRENT_YEAR} Mahalaxmi Infra. Mahalaxmi Nagar 51 (Anaya). All rights reserved.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9862b]" />
            <p>NMRDA Sanctioned • MahaRERA: PP1190002602003 • Clear RL Title</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/share/18PdfPMute/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mahalaxmi Infra Facebook"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#30534A] flex items-center justify-center text-white/80 hover:text-white transition-all"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/mahalaxmiinfra_ak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mahalaxmi Infra Instagram"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#30534A] flex items-center justify-center text-white/80 hover:text-white transition-all"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
})
Footer.displayName = "Footer"