"use client"

import { useState, useRef, useEffect, useCallback, memo } from "react"
import { Phone, Mail, MapPin, CheckCircle2, Send, Award, Shield } from "lucide-react"

const EMPTY = { name: "", mobile: "", lookingFor: "", interestedIn: "" }

/* ── Input Field ── */
const InputField = memo(({
  label, id, type = "text", placeholder, value, onChange, required,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-label="required">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className="form-field__input"
      autoComplete="off"
    />
  </div>
))
InputField.displayName = "InputField"

/* ── Select Field ── */
const SelectField = memo(({
  label, id, options, value, onChange, required,
}: {
  label: string
  id: string
  options: string[]
  value: string
  onChange: (v: string) => void
  required?: boolean
}) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-label="required">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      className="form-field__select"
    >
      <option value="">Select…</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
))
SelectField.displayName = "SelectField"

/* ── Section ── */
export default function ContactSection() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.07 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const set = useCallback(
    (k: keyof typeof EMPTY) => (v: string) => setForm(p => ({ ...p, [k]: v })),
    []
  )

  const submit = useCallback(async () => {
    if (!form.name || !form.mobile) return
    setStatus("loading")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "7a6bc102-dcc3-4f79-a088-0a0f5bd21923",
          name: form.name,
          subject: `New Inquiry – ${form.lookingFor}`,
          message: `Name: ${form.name}\nMobile: ${form.mobile}\nLooking For: ${form.lookingFor}\nInterested In: ${form.interestedIn}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus("success")
        setForm(EMPTY)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }, [form])

  const vis = isVisible

  const contacts = [
    { icon: Phone, label: "Call / WhatsApp", values: ["+91 9326709970"],                                      dark: true  },
    { icon: Mail,  label: "Email",           values: ["manoj.kuwarb38@gmail.com"],                             dark: false },
    { icon: MapPin, label: "Office Address", values: ["Flat 103/104, Laxmivihar Apartment,", "Wardha Road, Somalwada, Nagpur 440025"], dark: false },
  ]

  const badges = [
    { icon: Award,        text: "MAHA RERA Approved" },
    { icon: Shield,       text: "NMRDA Sanctioned"   },
    { icon: CheckCircle2, text: "ISO Certified"       },
    { icon: Phone,        text: "30-min Response"     },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact Mahalaxmi Infra"
      className="contact"
    >
      <div className="label-strip">
        <div className="label-strip__line" />
        <span className="label-strip__text">Get In Touch</span>
        <div className="label-strip__fill" />
        <span className="label-strip__right">We Respond Fast</span>
      </div>

      <div className="section-inner">
        <div className={`rv ${vis ? "on" : ""} d0 mb-section`}>
          <div className="section-eyebrow">
            <div className="section-eyebrow__line" />
            <span className="section-eyebrow__label">Contact Us</span>
          </div>
          <h2 className="section-heading">
            Let's <em>Find</em> Your<br /><span>Dream Plot</span>
          </h2>
          <p className="section-sub">
            Reach out for a site visit, price list, or any query. Our team responds within 30 minutes.
          </p>
        </div>

        <div className="contact__layout">
          {/* ── Contact info ── */}
          <div className={`rv ${vis ? "on" : ""} d1 contact__info`}>
            <div className="contact__cards">
              {contacts.map(c => {
                const Icon = c.icon
                return (
                  <address
                    key={c.label}
                    className={`contact-card contact-card--${c.dark ? "dark" : "light"}`}
                    style={{ fontStyle: "normal" }}
                  >
                    <div className="contact-card__inner">
                      <div className={`contact-card__corner contact-card__corner--${c.dark ? "dark" : "light"}`} aria-hidden="true" />
                      <div className={`contact-card__icon-wrap contact-card__icon-wrap--${c.dark ? "dark" : "light"}`}>
                        <Icon size={16} className="contact-card__icon" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="contact-card__label">{c.label}</p>
                        {c.values.map((v, i) => (
                          <p key={i} className={`contact-card__value contact-card__value--${c.dark ? "dark" : "light"}`}>
                            {v}
                          </p>
                        ))}
                      </div>
                    </div>
                  </address>
                )
              })}
            </div>

            <div className="contact__badges" role="list" aria-label="Certifications">
              {badges.map(({ icon: Icon, text }) => (
                <div key={text} className="contact__badge" role="listitem">
                  <Icon size={13} className="contact__badge-icon" aria-hidden="true" />
                  <span className="contact__badge-text">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <div className={`rv ${vis ? "on" : ""} d2 contact__form-wrap`}>
            <div className="contact__form-corner-tl" aria-hidden="true" />
            <div className="contact__form-corner-br" aria-hidden="true" />

            {status === "success" ? (
              <div className="contact__success" role="alert" aria-live="polite">
                <div className="contact__success-icon" aria-hidden="true">
                  <CheckCircle2 size={26} className="icon-gold" />
                </div>
                <h3 className="contact__success-title">We'll be in touch!</h3>
                <p className="contact__success-sub">Our team will call you within 30 minutes.</p>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">Schedule a Site Visit</h3>
                <p className="contact__form-sub">Fill in your details and we'll get back to you shortly.</p>

                <div className="contact__form-grid" role="group" aria-label="Contact form">
                  <InputField label="Full Name"     id="contact-name"     placeholder="Your name"             value={form.name}        onChange={set("name")}        required />
                  <InputField label="Mobile Number" id="contact-mobile"   placeholder="+91 XXXXX XXXXX"       value={form.mobile}      onChange={set("mobile")}      required type="tel" />
                  <SelectField
                    label="Looking For" id="contact-looking"
                    options={["Residential Plot", "Commercial Plot", "Investment", "Other"]}
                    value={form.lookingFor}
                    onChange={set("lookingFor")}
                  />
                  <SelectField
                    label="Interested In" id="contact-interested"
                    options={["Mahalaxmi Nagar", "Tattva Apas", "Ongoing Project", "Completed Project", "Any Available"]}
                    value={form.interestedIn}
                    onChange={set("interestedIn")}
                  />
                </div>

                {status === "error" && (
                  <p className="contact__error" role="alert">Something went wrong. Please try again.</p>
                )}

                <button
                  onClick={submit}
                  disabled={status === "loading"}
                  className="contact__submit"
                  aria-label="Send enquiry"
                >
                  {status === "loading"
                    ? "Sending…"
                    : <><Send size={14} aria-hidden="true" /> Send Enquiry</>
                  }
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="trust-bar">
        <div className="trust-bar__inner">
          <p className="trust-bar__label">Your data is safe with us</p>
          <div className="trust-bar__items" role="list">
            {["No Spam", "100% Confidential", "Quick Response"].map(label => (
              <div key={label} className="trust-bar__item" role="listitem">
                <div className="trust-bar__dot" aria-hidden="true" />
                <span className="trust-bar__name">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}