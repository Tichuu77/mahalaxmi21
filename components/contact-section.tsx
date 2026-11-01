"use client"

import { useState, useCallback, memo, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck, UserCheck, MessageSquare } from "lucide-react"
import {
  normalizePhone10,
  isBlockedOrFakePhone10,
  hasSubmittedThisPhone,
  recordSubmittedPhone,
  validateFillDuration,
} from "@/lib/form-protection"

const contacts = [
  { icon: Phone,  label: "Sales Desk Phone", value: "+91 9326709970", sub: "Direct Desk • Mon–Sun, 8am–8pm", href: "tel:+919326709970" },
  { icon: Mail,   label: "Official Email",   value: "kuwarb38@gmail.com", sub: "Instant reply for cost sheets & masterplans", href: "mailto:kuwarb38@gmail.com" },
  { icon: MapPin, label: "Office Address", value: "Flat 103/104, Laxmivihar Apartment, Wardha Road, Somalwada, Nagpur 440025", sub: "Site Office: Mouza Sumthana, Samruddhi Corridor, Nagpur", href: null },
]

const badges = [
  "Direct Developer Sale",
  "Zero Brokerage",
  "MahaRERA: PP1190002602003",
  "Agent RERA: A50500037880",
  "Free Site Visit Pickup",
  "Up to 90% Loan Guidance",
]

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1.1rem",
  background: "rgba(48,83,74,0.04)",
  border: "1px solid rgba(48,83,74,0.18)",
  borderRadius: "0.875rem",
  color: "#0d0d0d",
  fontSize: "0.9rem",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
}

const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "#C9862b"
}
const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)"
}

const Label = memo(({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-[11px] sm:text-xs font-bold uppercase mb-1.5 leading-snug break-words"
    style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.08em" }}>
    {children}
  </label>
))
Label.displayName = "Label"

type FormState = { name: string; mobile: string; plotCategory: string; visitDate: string }
const EMPTY_FORM: FormState = { name: "", mobile: "", plotCategory: "Executive Villa Plot (1,130 - 1,500 Sq.Ft)", visitDate: "" }
type ContactSectionProps = { sectionId?: string }
const COOLDOWN_MS = 12 * 60 * 60 * 1000
type SubmitStatus = "idle" | "error" | "rateLimit" | "spam" | "timing" | "interaction" | "phone" | "duplicatePhone"

export default function ContactSection({ sectionId = "contact" }: ContactSectionProps) {
  const router = useRouter()
  const fieldId = (field: string) => `${sectionId}-${field}`
  const [formState, setFormState] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [honeypot, setHoneypot] = useState("")

  const formStartedAtRef = useRef<number | null>(null)
  const humanRef = useRef(false)

  const markFormStarted = useCallback(() => {
    if (formStartedAtRef.current === null) formStartedAtRef.current = Date.now()
  }, [])

  const markHuman = useCallback(() => {
    humanRef.current = true
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    markFormStarted()
    markHuman()
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }, [markFormStarted, markHuman])

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    markFormStarted()
    markHuman()
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10)
    setFormState(prev => ({ ...prev, mobile: raw }))
  }, [markFormStarted, markHuman])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (typeof window !== "undefined") {
      const alreadySubmitted = localStorage.getItem("formSubmitted") === "true"
      const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0", 10)
      if (alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS) {
        setSubmitStatus("rateLimit")
        return
      }
    }

    if (honeypot.trim() !== "") {
      setSubmitStatus("spam")
      setTimeout(() => setSubmitStatus("idle"), 4000)
      return
    }

    if (!humanRef.current) {
      setSubmitStatus("interaction")
      setTimeout(() => setSubmitStatus("idle"), 4000)
      return
    }

    if (!validateFillDuration(formStartedAtRef.current)) {
      setSubmitStatus("timing")
      setTimeout(() => setSubmitStatus("idle"), 4000)
      return
    }

    const name = (formState.name || "").trim()
    const mobile = (formState.mobile || "").trim()
    const plotCategory = (formState.plotCategory || "").trim()
    const visitDate = (formState.visitDate || "").trim()
    const phone10 = normalizePhone10(mobile)

    if (!name || !mobile || !plotCategory) {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
      return
    }

    if (isBlockedOrFakePhone10(phone10)) {
      setSubmitStatus("phone")
      setTimeout(() => setSubmitStatus("idle"), 4000)
      return
    }

    if (hasSubmittedThisPhone(phone10)) {
      setSubmitStatus("duplicatePhone")
      setTimeout(() => setSubmitStatus("idle"), 4000)
      return
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("formSubmitted", "true")
      localStorage.setItem("formSubmittedAt", String(Date.now()))
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const formData = new FormData()
      formData.append("access_key", "7a6bc102-dcc3-4f79-a088-0a0f5bd21923")
      formData.append("name", name)
      formData.append("subject", `New Mahalaxmi Nagar 51 Inquiry — ${plotCategory}`)
      formData.append("message", `Project: Mahalaxmi Nagar 51 (Anaya)\nName: ${name}\nMobile: ${phone10}\nPlot Category: ${plotCategory}\nPreferred Visit Date/Notes: ${visitDate}\nSales Desk: Mahalaxmi Infra (+91 9326709970)`)

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.success) {
        recordSubmittedPhone(phone10)
        setFormState(EMPTY_FORM)
        formStartedAtRef.current = null
        humanRef.current = false
        setHoneypot("")
        if (typeof window !== "undefined") sessionStorage.setItem("hideContactPopupOnce", "true")
        router.push("/thank-you")
      } else {
        console.error("form submit failed", data)
        if (typeof window !== "undefined") { localStorage.removeItem("formSubmitted"); localStorage.removeItem("formSubmittedAt") }
        setSubmitStatus("error")
        setTimeout(() => setSubmitStatus("idle"), 3000)
      }
    } catch (err) {
      console.error("form submit error", err)
      if (typeof window !== "undefined") { localStorage.removeItem("formSubmitted"); localStorage.removeItem("formSubmittedAt") }
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }, [formState, router, honeypot])

  return (
    <section id={sectionId} className="contact-section relative overflow-x-clip overflow-y-hidden py-10 sm:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Section Title */}
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3">
            DIRECT SALES DESK
          </div>
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-2 sm:mb-3 text-[#0d0d0d]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Connect With Our <span className="text-[#30534A]">Sales</span> <span className="text-[#C9862b]">Desk</span>
          </h2>
          <p className="text-xs sm:text-base text-[#666] leading-relaxed">
            Interested in booking a residential plot in <strong>Mahalaxmi Nagar 51 (Anaya)</strong> at Mouza Sumthana?
            Contact our Direct Sales Desk for pricing, layout maps, and site visits.
          </p>
        </div>

        {/* Main 2-Column Layout: Left (Official Card + Info) / Right (Direct Form) */}
        <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-10 lg:gap-14 items-start">

          {/* Left Column: Official ID Card & Contact Badges */}
          <div className="space-y-6">

            {/* Official Executive Identity Box */}
            <div
              className="rounded-3xl p-6 sm:p-7 shadow-xl border border-[#30534A]/15 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #f7f9f8 100%)",
                boxShadow: "0 14px 40px rgba(48,83,74,0.08)",
              }}
            >
              <div className="flex items-center gap-3 pb-5 border-b border-[#30534A]/10">
                <div className="relative w-16 h-16 rounded-2xl p-2 shrink-0 border-2 border-[#C9862b] bg-white flex items-center justify-center shadow-sm">
                  <img
                    src="/Malaxmi-Final-Logo.-2png.png"
                    alt="Mahalaxmi Infra Official Desk"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#30534A]/10 text-[#30534A] text-[10px] font-bold">
                    <UserCheck size={12} className="text-[#C9862b]" />
                    VERIFIED DEVELOPER REPRESENTATIVE
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0d0d0d] mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Mahalaxmi Infra Sales Desk
                  </h3>
                  <p className="text-xs font-bold text-[#C9862b] uppercase tracking-wider">
                    Direct Booking Desk • Mahalaxmi Nagar 51
                  </p>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="py-4 space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#30534A]/8">
                  <span className="text-[#666]">Agent MahaRERA:</span>
                  <span className="font-bold text-[#30534A]">A50500037880</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#30534A]/8">
                  <span className="text-[#666]">Project MahaRERA:</span>
                  <span className="font-bold text-[#C9862b]">PP1190002602003</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#30534A]/8">
                  <span className="text-[#666]">Official Phone:</span>
                  <a href="tel:+919326709970" className="font-bold text-[#30534A] hover:underline">
                    +91 9326709970
                  </a>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#30534A]/8">
                  <span className="text-[#666]">Official Email:</span>
                  <a href="mailto:kuwarb38@gmail.com" className="font-medium text-[#30534A] hover:underline truncate max-w-[200px]">
                    kuwarb38@gmail.com
                  </a>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#30534A]/8 text-[11px] leading-relaxed">
                  <span className="text-[#666] block font-semibold mb-0.5">Office Address:</span>
                  <span className="text-[#222]">Flat 103/104, Laxmivihar Apartment, Wardha Road, Somalwada, Nagpur 440025</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+919326709970"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #30534A, #203b34)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={13} className="text-[#C9862b]" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919326709970?text=Hi%2C%20I%20am%20interested%20in%20Mahalaxmi%20Nagar%2051%20Anaya%20plots."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-[#30534A]/25 text-[#30534A] font-bold text-xs hover:border-[#C9862b]"
                >
                  <MessageSquare size={13} className="text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2.5">
              {badges.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#30534A]/4 border border-[#30534A]/10 text-xs font-semibold text-[#30534A]"
                >
                  <CheckCircle size={14} className="text-[#C9862b] shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Inquiry & Site Visit Form */}
          <div
            className="rounded-3xl p-6 sm:p-9 bg-white border border-[#30534A]/15 shadow-xl"
            style={{ boxShadow: "0 16px 45px rgba(48,83,74,0.07)" }}
          >
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9862b] block">
                Instant Priority Callback
              </span>
              <h3
                className="text-2xl font-extrabold text-[#0d0d0d] mt-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Inquire for Mahalaxmi Nagar 51 Anaya
              </h3>
              <p className="text-xs text-[#666] mt-1">
                Fill the form below and our sales desk will connect with you with the layout plan and price breakdown.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              onPointerDownCapture={markHuman}
              onKeyDownCapture={markHuman}
              onFocusCapture={markHuman}
            >
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />
              {/* Honeypot */}
              <input
                type="text"
                name="b_phone"
                tabIndex={-1}
                autoComplete="new-password"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={fieldId("name")}>Your Full Name <span style={{ color: "#e55" }}>*</span></Label>
                  <input
                    type="text"
                    id={fieldId("name")}
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rajesh Sharma"
                    style={inputStyle}
                    onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                    onBlur={inputBlur}
                  />
                </div>
                <div>
                  <Label htmlFor={fieldId("mobile")}>Mobile Number <span style={{ color: "#e55" }}>*</span></Label>
                  <input
                    type="tel"
                    id={fieldId("mobile")}
                    name="mobile"
                    value={formState.mobile}
                    onChange={handleMobileChange}
                    required
                    placeholder="+91 9XXXX XXXXX"
                    maxLength={10}
                    pattern="\d{10}"
                    style={inputStyle}
                    onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                    onBlur={inputBlur}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={fieldId("plotCategory")}>Preferred Plot Category in Anaya <span style={{ color: "#e55" }}>*</span></Label>
                <select
                  id={fieldId("plotCategory")}
                  name="plotCategory"
                  value={formState.plotCategory}
                  onChange={handleChange}
                  required
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330534A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1.1rem center",
                    paddingRight: "2.5rem",
                    color: formState.plotCategory ? "#0d0d0d" : "#888",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                  onBlur={inputBlur}
                >
                  <option value="" disabled>Select plot configuration</option>
                  <option value="Executive Villa Plot (1,130 - 1,500 Sq.Ft)">Executive Villa Plot (1,130 - 1,500 Sq.Ft)</option>
                  <option value="Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)">Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)</option>
                  <option value="Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)">Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)</option>
                  <option value="Clubhouse & Sports Enclave Plot">Clubhouse &amp; Sports Enclave Plot</option>
                  <option value="General Township Site Visit">General Township Site Visit / Consultation</option>
                </select>
              </div>

              <div>
                <Label htmlFor={fieldId("visitDate")}>Preferred Site Visit Date / Query (Optional)</Label>
                <input
                  type="text"
                  id={fieldId("visitDate")}
                  name="visitDate"
                  value={formState.visitDate}
                  onChange={handleChange}
                  placeholder="e.g. This Saturday morning / Looking for East Facing"
                  style={inputStyle}
                  onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                  onBlur={inputBlur}
                />
              </div>

              {submitStatus === "error" && (
                <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(229,85,85,0.08)", border: "1px solid rgba(229,85,85,0.3)", color: "#c44" }}>
                  Please fill in all required fields and try again.
                </div>
              )}
              {submitStatus === "rateLimit" && (
                <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>
                  You recently submitted an inquiry. Please call +91 9326709970 directly for instant assistance.
                </div>
              )}
              {submitStatus === "phone" && (
                <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(229,85,85,0.08)", border: "1px solid rgba(229,85,85,0.3)", color: "#c44" }}>
                  Please enter a valid 10-digit Indian mobile number.
                </div>
              )}
              {submitStatus === "duplicatePhone" && (
                <div className="rounded-xl p-3 text-xs" style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>
                  This mobile number has already submitted an inquiry recently. Please call +91 9326709970 for urgent requests.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "rateLimit"}
                className="w-full flex items-center justify-center gap-2 font-bold text-sm py-4 rounded-xl text-white transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #30534A, #203b34)",
                  boxShadow: "0 6px 20px rgba(48,83,74,0.28)",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Request to Sales Desk…
                  </>
                ) : (
                  <>
                    Get Layout Plan &amp; Cost Sheet
                    <Send size={15} />
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#888] text-center">
                🔒 Direct Developer Contact • No Spam • We Respect Your Privacy
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}