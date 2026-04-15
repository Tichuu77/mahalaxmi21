"use client"

import { useState, useEffect, useCallback, useRef, memo } from "react"
import { X, Send, CheckCircle2, Phone, Award, Shield } from "lucide-react"

const EMPTY = { name: "", mobile: "", lookingFor: "", interestedIn: "" }

const InputField = memo(({
  label, id, type = "text", placeholder, value, onChange, required,
}: {
  label: string; id: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void; required?: boolean
}) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-label="required">*</span>}
    </label>
    <input
      id={id} type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)} required={required}
      className="form-field__input" autoComplete="off"
    />
  </div>
))
InputField.displayName = "InputField"

const SelectField = memo(({
  label, id, options, value, onChange, required,
}: {
  label: string; id: string; options: string[]; value: string
  onChange: (v: string) => void; required?: boolean
}) => (
  <div className="form-field">
    <label htmlFor={id} className="form-field__label">
      {label}
      {required && <span className="form-field__required" aria-label="required">*</span>}
    </label>
    <select id={id} value={value} onChange={e => onChange(e.target.value)}
      required={required} className="form-field__select">
      <option value="">Select…</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
))
SelectField.displayName = "SelectField"

export default function ContactPopup() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Open after 3 s on first visit */
  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup-dismissed")
    if (dismissed) return
    const id = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(id)
  }, [])

  /* Auto-close thank-you after 3 s */
  useEffect(() => {
    if (status !== "success") return
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setStatus("idle")
      setForm(EMPTY)
    }, 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [status])

  const close = useCallback(() => {
    setVisible(false)
    sessionStorage.setItem("popup-dismissed", "1")
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const set = useCallback((k: keyof typeof EMPTY) => (v: string) =>
    setForm(p => ({ ...p, [k]: v })), [])

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
          subject: `[Popup] New Inquiry – ${form.lookingFor}`,
          message: `Name: ${form.name}\nMobile: ${form.mobile}\nLooking For: ${form.lookingFor}\nInterested In: ${form.interestedIn}`,
        }),
      })
      const data = await res.json()
      if (data.success) { setStatus("success") }
      else { setStatus("error"); setTimeout(() => setStatus("idle"), 3000) }
    } catch {
      setStatus("error"); setTimeout(() => setStatus("idle"), 3000)
    }
  }, [form])

  if (!visible) return null

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="popup-backdrop"
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Modal ── */}
      <div
        className="popup-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Quick enquiry form"
      >
        {/* Close button */}
        <button
          onClick={close}
          className="popup-close"
          aria-label="Close enquiry form"
        >
          <X size={14} aria-hidden="true" />
        </button>

        {status === "success" ? (
          /* ── Thank-you screen ── */
          <div className="popup-thankyou" role="status" aria-live="polite">
            <div className="popup-thankyou__ring" aria-hidden="true">
              <div className="popup-thankyou__ring-inner" />
              <CheckCircle2 size={30} className="popup-thankyou__icon" aria-hidden="true" />
            </div>
            <h3 className="popup-thankyou__title">Thank You!</h3>
            <p className="popup-thankyou__sub">
              Our team will call you within 30 minutes.
            </p>
            <div className="popup-thankyou__countdown" aria-label="Closing in 3 seconds">
              <div className="popup-thankyou__bar" />
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <>
            {/* Header strip */}
            <div className="popup-header">
              <div className="popup-header__glow" aria-hidden="true" />
              <div className="popup-header__badges">
                <span className="popup-header__badge">
                  <Shield size={9} aria-hidden="true" /> RERA Approved
                </span>
                <span className="popup-header__badge">
                  <Award size={9} aria-hidden="true" /> NMRDA Sanctioned
                </span>
              </div>
              <h2 className="popup-header__title">
                Get <em>Free</em> Site Visit
              </h2>
              <p className="popup-header__sub">
                Plots from <strong>₹22 Lakh</strong> · 90% bank finance · Respond in 30 min
              </p>
            </div>

            {/* Form body */}
            <div className="popup-body">
              <div className="popup-grid">
                <InputField label="Full Name" id="pop-name" placeholder="Your name"
                  value={form.name} onChange={set("name")} required />
                <InputField label="Mobile" id="pop-mobile" placeholder="+91 XXXXX XXXXX"
                  value={form.mobile} onChange={set("mobile")} required type="tel" />
                <SelectField label="Looking For" id="pop-looking"
                  options={["Residential Plot", "Commercial Plot", "Investment", "Other"]}
                  value={form.lookingFor} onChange={set("lookingFor")} />
                <SelectField label="Interested In" id="pop-interested"
                  options={["Mahalaxmi Nagar", "Tattva Apas", "Ongoing Project", "Completed Project", "Any Available"]}
                  value={form.interestedIn} onChange={set("interestedIn")} />
              </div>

              {status === "error" && (
                <p className="contact__error" role="alert">Something went wrong. Please try again.</p>
              )}

              <button
                onClick={submit}
                disabled={status === "loading"}
                className="popup-submit"
                aria-label="Send enquiry"
              >
                {status === "loading"
                  ? <><span className="popup-submit__spinner" aria-hidden="true" />Sending…</>
                  : <><Send size={13} aria-hidden="true" />Send Enquiry</>}
              </button>

              <p className="popup-privacy">
                <Phone size={9} aria-hidden="true" /> No spam. We only call to assist.
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        .popup-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,.65);
          backdrop-filter: blur(6px);
          animation: fadeIn .3s ease;
        }

        .popup-modal {
          position: fixed; z-index: 301;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: min(92vw, 460px);
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,.35), 0 0 0 1px rgba(48,83,74,.08);
          animation: popupIn .38s cubic-bezier(.22,1,.36,1);
        }

        @keyframes popupIn {
          from { opacity:0; transform:translate(-50%,-48%) scale(.93); }
          to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }

        .popup-close {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          width: 30px; height: 30px; border-radius: 8px;
          background: rgba(255,255,255,.18);
          border: 1px solid rgba(255,255,255,.25);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background .2s;
        }
        .popup-close:hover { background: rgba(255,255,255,.32); }

        /* Header */
        .popup-header {
          background: linear-gradient(135deg, #0d1a16 0%, var(--green) 100%);
          padding: 26px 26px 22px;
          position: relative; overflow: hidden;
        }
        .popup-header__glow {
          position: absolute; top: -40px; right: -40px;
          width: 150px; height: 150px; border-radius: 50%;
          background: radial-gradient(circle,rgba(201,134,43,.18) 0%,transparent 70%);
          pointer-events: none;
        }
        .popup-header__badges {
          display: flex; gap: 7px; margin-bottom: 12px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .popup-header__badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 8px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,134,43,.12);
          border: 1px solid rgba(201,134,43,.25);
          border-radius: 999px; padding: 4px 10px;
        }
        .popup-header__title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 5vw, 1.9rem);
          font-weight: 700; color: #fff; margin: 0 0 6px;
          line-height: 1.08; position: relative; z-index: 1;
        }
        .popup-header__title em { color: var(--gold); font-style: italic; }
        .popup-header__sub {
          font-size: 12px; color: rgba(255,255,255,.52);
          margin: 0; line-height: 1.6; position: relative; z-index: 1;
        }
        .popup-header__sub strong { color: var(--gold); }

        /* Body */
        .popup-body { padding: 20px 24px 22px; }
        .popup-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 12px;
        }
        @media (max-width: 380px) { .popup-grid { grid-template-columns: 1fr; } }

        .popup-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; background: var(--green); color: #fff;
          font-weight: 700; font-size: 13px; letter-spacing: .04em;
          padding: 13px 22px; border-radius: 12px;
          box-shadow: 0 8px 20px rgba(48,83,74,.28);
          transition: transform .22s, box-shadow .22s, background .2s;
          border: none; cursor: pointer; font-family: var(--font-body);
        }
        .popup-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(48,83,74,.38);
          background: #3d6b60;
        }
        .popup-submit:disabled { opacity: .6; cursor: not-allowed; }

        .popup-submit__spinner {
          width: 13px; height: 13px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          animation: spin .6s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .popup-privacy {
          display: flex; align-items: center; gap: 5px; justify-content: center;
          font-size: 10px; color: #bbb; margin: 9px 0 0; letter-spacing: .03em;
        }

        /* Thank-you */
        .popup-thankyou {
          padding: 50px 30px 44px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          background: linear-gradient(160deg, #f5f2ec 0%, #fff 100%);
        }
        .popup-thankyou__ring {
          position: relative; width: 72px; height: 72px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .popup-thankyou__ring-inner {
          position: absolute; inset: 0; border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 0 8px rgba(48,83,74,.1), 0 12px 32px rgba(48,83,74,.3);
          animation: ringPop .5s cubic-bezier(.22,1,.36,1);
        }
        @keyframes ringPop {
          from { transform: scale(.6); opacity: 0; }
          to   { transform: scale(1);  opacity: 1; }
        }
        .popup-thankyou__icon {
          position: relative; z-index: 1; color: var(--gold);
          animation: iconPop .5s .15s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes iconPop {
          from { transform: scale(.5) rotate(-15deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .popup-thankyou__title {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 700; color: var(--text-dark);
          margin: 0 0 8px;
          animation: fadeUp .4s .2s both;
        }
        .popup-thankyou__sub {
          font-size: 13px; color: #888; margin: 0 0 24px; line-height: 1.6;
          animation: fadeUp .4s .28s both;
        }
        .popup-thankyou__countdown {
          width: 100%; height: 4px; background: rgba(48,83,74,.1);
          border-radius: 2px; overflow: hidden;
          animation: fadeUp .4s .36s both;
        }
        .popup-thankyou__bar {
          height: 100%;
          background: linear-gradient(90deg, var(--gold), var(--green));
          border-radius: 2px;
          animation: countdown 3s linear forwards;
        }
        @keyframes countdown {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </>
  )
}