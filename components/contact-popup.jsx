"use client"

import { useState, useCallback, memo, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Send, X } from "lucide-react"
import {
    normalizePhone10,
    isBlockedOrFakePhone10,
    hasSubmittedThisPhone,
    recordSubmittedPhone,
    validateFillDuration,
} from "@/lib/form-protection"

const inputStyle = {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "rgba(48,83,74,0.04)",
    border: "1px solid rgba(48,83,74,0.18)",
    borderRadius: "0.875rem",
    color: "#0d0d0d",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
}

const inputFocus = (e) => { e.currentTarget.style.borderColor = "#C9862b" }
const inputBlur = (e) => { e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)" }
const COOLDOWN_MS = 12 * 60 * 60 * 1000

const Label = memo(({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-[11px] sm:text-xs font-bold uppercase mb-1.5 leading-snug break-words"
        style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.1em" }}>
        {children}
    </label>
))

const EMPTY_FORM = { name: "", mobile: "", lookingFor: "", interestedIn: "" }

export default function ContactPopup() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [formState, setFormState] = useState(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState("idle")
    const [honeypot, setHoneypot] = useState("")
    const formStartedAtRef = useRef(null)
    const humanRef = useRef(false)

    const markFormStarted = useCallback(() => {
        if (formStartedAtRef.current === null) formStartedAtRef.current = Date.now()
    }, [])

    const markHuman = useCallback(() => {
        humanRef.current = true
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return

        const alreadySubmitted = localStorage.getItem("formSubmitted") === "true"
        const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0")
        const withinCooldown = alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS
        if (withinCooldown) return

        const shouldHideOnce = sessionStorage.getItem("hideContactPopupOnce") === "true"
        if (shouldHideOnce) {
            sessionStorage.removeItem("hideContactPopupOnce")
            return
        }

        let observer = null
        let cancelled = false
        let rafId = 0

        const attachWhenReady = (attempt = 0) => {
            if (cancelled || attempt > 240) return
            const projectsSection = document.getElementById("projects")
            if (!projectsSection) {
                rafId = requestAnimationFrame(() => attachWhenReady(attempt + 1))
                return
            }
            let triggered = false
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (!entry.isIntersecting || triggered) continue
                        triggered = true
                        setOpen(true)
                        observer?.disconnect()
                        observer = null
                    }
                },
                { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
            )
            observer.observe(projectsSection)
        }

        const timer = setTimeout(() => { attachWhenReady() }, 400)

        return () => {
            cancelled = true
            clearTimeout(timer)
            cancelAnimationFrame(rafId)
            observer?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!open) return
        formStartedAtRef.current = null
        humanRef.current = false
        setHoneypot("")
        setSubmitStatus("idle")
    }, [open])

    const handleChange = useCallback((e) => {
        markFormStarted()
        markHuman()
        const { name, value } = e.target
        setFormState(prev => ({ ...prev, [name]: value }))
    }, [markFormStarted, markHuman])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        const alreadySubmitted = localStorage.getItem("formSubmitted") === "true"
        const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0")
        if (alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS) {
            setSubmitStatus("rateLimit")
            return
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
        const mobileRaw = (formState.mobile || "").trim()
        const lookingFor = (formState.lookingFor || "").trim()
        const interestedIn = (formState.interestedIn || "").trim()
        const phone10 = normalizePhone10(mobileRaw)

        if (!name || !mobileRaw || !lookingFor || !interestedIn) {
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

        localStorage.setItem("formSubmitted", "true")
        localStorage.setItem("formSubmittedAt", String(Date.now()))
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const formData = new FormData()
            formData.append("access_key", "7a6bc102-dcc3-4f79-a088-0a0f5bd21923")
            formData.append("name", name)
            formData.append("subject", `New Inquiry – ${lookingFor}`)
            formData.append("message", `Name: ${name}\nMobile: ${phone10}\nLooking For: ${lookingFor}\nInterested In: ${interestedIn}`)

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })
            const data = await res.json()

            if (res.ok && data.success) {
                recordSubmittedPhone(phone10)
                setFormState(EMPTY_FORM)
                setOpen(false)
                sessionStorage.setItem("hideContactPopupOnce", "true")
                router.push("/thank-you")
            } else {
                console.error("form submit failed", data)
                localStorage.removeItem("formSubmitted")
                localStorage.removeItem("formSubmittedAt")
                setSubmitStatus("error")
                setTimeout(() => setSubmitStatus("idle"), 3000)
            }
        } catch (err) {
            console.error("form submit error", err)
            localStorage.removeItem("formSubmitted")
            localStorage.removeItem("formSubmittedAt")
            setSubmitStatus("error")
            setTimeout(() => setSubmitStatus("idle"), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }, [formState, router, honeypot])

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
            <div
                className="relative w-full max-w-md rounded-2xl p-3 sm:p-8 max-h-[92vh] overflow-y-auto"
                style={{
                    background: "#fff",
                    boxShadow: "0 24px 64px rgba(48,83,74,0.18)",
                    border: "1px solid rgba(48,83,74,0.1)",
                    animation: "popIn 0.25s ease-out",
                }}
            >
                <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.94) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>

                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                    style={{ background: "rgba(48,83,74,0.07)", color: "#30534A" }}
                >
                    <X size={15} />
                </button>

                <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>Free Consultation</p>
                    <h2 className="font-bold text-2xl text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Get in <span style={{ color: "#30534A" }}>Touch</span>
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 max-w-full overflow-x-hidden"
                    onPointerDownCapture={markHuman}
                    onKeyDownCapture={markHuman}
                    onFocusCapture={markHuman}
                >
                    <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} />
                    {/* Honeypot — obscure name so autofill ignores it */}
                    <input
                        type="text"
                        name="b_phone"
                        tabIndex={-1}
                        autoComplete="new-password"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0 }}
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="popup-name">Name <span style={{ color: "#e55" }}>*</span></Label>
                            <input type="text" id="popup-name" name="name" value={formState.name}
                                onChange={handleChange} onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                                required placeholder="Your name" style={inputStyle} onBlur={inputBlur} />
                        </div>
                        <div>
                            <Label htmlFor="popup-mobile">Mobile <span style={{ color: "#e55" }}>*</span></Label>
                            <input type="tel" id="popup-mobile" name="mobile" value={formState.mobile}
                                onChange={(e) => { markFormStarted(); markHuman(); const v = e.target.value.replace(/\D/g, "").slice(0, 10); setFormState(prev => ({ ...prev, mobile: v })) }}
                                required placeholder="+91 XXXXX XXXXX" maxLength={10} pattern="\d{10}"
                                style={inputStyle} onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }} onBlur={inputBlur} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="popup-lookingFor">Looking For <span style={{ color: "#e55" }}>*</span></Label>
                        <select id="popup-lookingFor" name="lookingFor" value={formState.lookingFor}
                            onChange={handleChange} onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                            required onBlur={inputBlur}
                            style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330534A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", paddingRight: "2.5rem", color: formState.lookingFor ? "#0d0d0d" : "#aaa", cursor: "pointer" }}>
                            <option value="" disabled>Select property type</option>
                            <option value="Residential Plots">Residential Plots</option>
                            <option value="Commercial Plots">Commercial Plots</option>
                            <option value="Residential & Commercial Plots">Residential &amp; Commercial Plots</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="popup-interestedIn">Interested In (Project + Area) <span style={{ color: "#e55" }}>*</span></Label>
                        <input type="text" id="popup-interestedIn" name="interestedIn" value={formState.interestedIn}
                            onChange={handleChange} onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                            required placeholder="e.g. Green Valley – 1200 sq.ft" style={inputStyle} onBlur={inputBlur} />
                    </div>

                    {submitStatus === "error" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(229,85,85,0.07)", border: "1px solid rgba(229,85,85,0.25)", color: "#c44" }}>Please fill in all required fields and try again.</div>}
                    {submitStatus === "rateLimit" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(201,134,43,0.07)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>You recently submitted an inquiry. Please try again after 12 hours.</div>}
                    {submitStatus === "spam" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(229,85,85,0.07)", border: "1px solid rgba(229,85,85,0.25)", color: "#c44" }}>Submission could not be processed.</div>}
                    {submitStatus === "timing" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(201,134,43,0.07)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>Please take a few seconds to complete the form before sending.</div>}
                    {submitStatus === "interaction" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(201,134,43,0.07)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>Use the form fields or buttons to submit.</div>}
                    {submitStatus === "phone" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(229,85,85,0.07)", border: "1px solid rgba(229,85,85,0.25)", color: "#c44" }}>Enter a valid 10-digit Indian mobile number.</div>}
                    {submitStatus === "duplicatePhone" && <div className="rounded-xl p-3 text-sm" style={{ background: "rgba(201,134,43,0.07)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>This number already submitted from this device. Call us if you need help.</div>}

                    <button type="submit" disabled={isSubmitting || submitStatus === "rateLimit"}
                        className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background: "linear-gradient(135deg, #30534A, #3d6b60)", boxShadow: "0 6px 20px rgba(48,83,74,0.28)", fontFamily: "'Poppins', sans-serif" }}>
                        {isSubmitting
                            ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                            : <>Send Message <Send size={14} /></>}
                    </button>
                </form>
            </div>
        </div>
    )
}