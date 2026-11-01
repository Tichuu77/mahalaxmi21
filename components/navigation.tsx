"use client"

import { useState, useCallback, memo } from "react"
import { Menu, X, Phone, ShieldCheck, Calendar, Compass, MessageSquare } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { href: "#about",          label: "About"          },
  { href: "#projects",       label: "Township 51"    },
  { href: "#amenities",      label: "Amenities"      },
  { href: "#location",       label: "Location"       },
  { href: "#other-projects", label: "Other Projects" },
  { href: "#gallery",        label: "Gallery"        },
  { href: "#why-choose-us",  label: "Why Invest"     },
  { href: "#contact",        label: "Contact"        },
]

const DesktopLinks = memo(() => (
  <div className="hidden xl:flex items-center gap-6">
    {navLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="text-[#1e342e] hover:text-[#C9862b] transition-colors text-xs font-semibold tracking-wider uppercase whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C9862b] hover:after:w-full after:transition-all after:duration-300"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {link.label}
      </a>
    ))}
  </div>
))
DesktopLinks.displayName = "DesktopLinks"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle    = useCallback(() => setIsOpen(p => !p), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-[#30534A]/10 shadow-xs transition-all">
      {/* Sleek slim top micro bar */}
      <div className="bg-[#1e342e] text-white text-[11px] py-1 px-3 sm:px-8 flex justify-between items-center border-b border-[#C9862b]/20">
        <div className="flex items-center gap-2 truncate">
          <ShieldCheck size={12} className="text-[#C9862b] shrink-0" />
          <span className="font-medium tracking-wide truncate">
            Mahalaxmi Nagar 51 • Mouza Sumthana, Nagpur
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-[#C9862b] font-semibold whitespace-nowrap">
            MahaRERA: PP1190002602003
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-white/70 hidden md:inline">Direct Sales Desk</span>
          <a
            href="tel:+919326709970"
            className="flex items-center gap-1 font-bold text-[#C9862b] hover:text-white transition-colors whitespace-nowrap"
          >
            <Phone size={10} />
            +91 9326709970
          </a>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo & Brand Identity (No Wrapping) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <img
              src="/Mahalaxmi Infra new Logo.png"
              alt="Mahalaxmi Infra Logo"
              className="w-10 h-10 sm:w-13 sm:h-13 object-contain transition-transform duration-300 group-hover:scale-105"
              fetchPriority="high"
              decoding="sync"
              width={52}
              height={52}
            />
            <div className="flex flex-col">
              <span
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="font-extrabold text-[#1e342e] text-sm sm:text-base lg:text-lg tracking-tight leading-tight group-hover:text-[#C9862b] transition-colors whitespace-nowrap"
              >
                MAHALAXMI NAGAR 51
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#C9862b] uppercase whitespace-nowrap">
                  ANAYA TOWNSHIP
                </span>
                <span className="text-[8px] sm:text-[9px] bg-[#30534A]/10 text-[#30534A] px-1.5 py-0.2 rounded-xs font-semibold whitespace-nowrap">
                  78 Acres
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Links (Hidden on small / visible on xl) */}
          <DesktopLinks />

          {/* Clean Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="tel:+919326709970"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#1e342e] hover:text-[#C9862b] hover:bg-[#30534A]/5 transition-all text-xs font-bold whitespace-nowrap"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Phone size={13} className="text-[#C9862b]" />
              <span>Direct Line</span>
            </a>
            <Link
              href="#contact"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#30534A] to-[#203a33] hover:from-[#25423b] hover:to-[#172c26] text-white rounded-xl transition-all font-semibold text-xs shadow-md shadow-[#30534A]/20 hover:shadow-lg hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Calendar size={13} className="text-[#C9862b]" />
              <span>Book Site Visit</span>
            </Link>
          </div>

          {/* Mobile Actions: Call Button + Menu Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href="tel:+919326709970"
              aria-label="Call Direct Desk"
              className="p-2 text-[#30534A] bg-[#30534A]/8 rounded-xl flex items-center justify-center active:scale-95"
            >
              <Phone size={18} className="text-[#C9862b]" />
            </a>
            <button
              onClick={toggle}
              className="p-2 text-[#1e342e] hover:text-[#C9862b] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile menu (App-like sheet) */}
        {isOpen && (
          <div className="lg:hidden pb-5 pt-2 border-t border-[#30534A]/10 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5 px-2 mb-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-3 py-2.5 text-[#1e342e] hover:text-[#C9862b] bg-[#30534A]/5 hover:bg-[#30534A]/10 rounded-xl text-xs font-bold transition-colors text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-2 px-2">
              <a
                href="tel:+919326709970"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#30534A]/20 text-[#30534A] rounded-xl font-bold text-xs bg-white shadow-xs"
              >
                <Phone size={13} className="text-[#C9862b]" />
                Call Desk
              </a>
              <Link
                href="#contact"
                className="flex-1 bg-[#30534A] text-white py-2.5 rounded-xl font-bold text-center text-xs shadow-md flex items-center justify-center gap-1.5"
                onClick={closeMenu}
              >
                <Calendar size={13} className="text-[#C9862b]" />
                Book Visit
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}