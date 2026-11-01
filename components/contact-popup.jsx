"use client"

import { useState, useCallback, memo, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Send, X, Phone, ShieldCheck } from "lucide-react"
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
        style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.08em" }}>
        {children}
    </label>
))
Label.displayName = "Label"

const EMPTY_FORM = { name: "", mobile: "", plotCategory: "Executive Villa Plot (1,130 - 1,500 Sq.Ft)" }

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
        const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0", 10)
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

        const timer = setTimeout(() => { attachWhenReady() }, 500)

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
        setFormState((prev) => ({ ...prev, [name]: value }))
    }, [markFormStarted, markHuman])

    const handleMobileChange = useCallback((e) => {
        markFormStarted()
        markHuman()
        const raw = e.target.value.replace(/\D/g, "").slice(0, 10)
        setFormState((prev) => ({ ...prev, mobile: raw }))
    }, [markFormStarted, markHuman])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleSubmit = useCallback(
        async (e) => {
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
            const phone10 = normalizePhone10(mobile)

            if (!name || !mobile) {
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
                formData.append("subject", `Popup Inquiry — Mahalaxmi Nagar 51 (${plotCategory})`)
                formData.append("message", `Project: Mahalaxmi Nagar 51 Anaya (Mouza Sumthana)\nName: ${name}\nMobile: ${phone10}\nPlot Category: ${plotCategory}\nSales Desk: Mahalaxmi Infra (+91 9326709970)`)

                const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                })
                const data = await res.json()

                if (res.ok && data.success) {
                    recordSubmittedPhone(phone10)
                    setFormState(EMPTY_FORM)
                    setHoneypot("")
                    setOpen(false)
                    if (typeof window !== "undefined") sessionStorage.setItem("hideContactPopupOnce", "true")
                    router.push("/thank-you")
                } else {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("formSubmitted")
                        localStorage.removeItem("formSubmittedAt")
                    }
                    setSubmitStatus("error")
                    setTimeout(() => setSubmitStatus("idle"), 3000)
                }
            } catch (err) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("formSubmitted")
                    localStorage.removeItem("formSubmittedAt")
                }
                setSubmitStatus("error")
                setTimeout(() => setSubmitStatus("idle"), 3000)
            } finally {
                setIsSubmitting(false)
            }
        },
        [formState, router, honeypot]
    )

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
            <div
                className="relative w-full max-w-md rounded-2xl p-4 sm:p-7 max-h-[92vh] overflow-y-auto"
                style={{
                    background: "#fff",
                    boxShadow: "0 24px 64px rgba(48,83,74,0.18)",
                    border: "1px solid rgba(48,83,74,0.1)",
                    animation: "popIn 0.25s ease-out",
                }}
            >
                <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.94) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
                    style={{ background: "rgba(48,83,74,0.07)", color: "#30534A" }}
                    aria-label="Close"
                >
                    <X size={15} />
                </button>

                {/* Header */}
                <div className="mb-5 pr-8">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#30534A]/10 text-[#30534A] text-[10px] font-bold mb-2">
                        <ShieldCheck size={11} className="text-[#C9862b]" />
                        MahaRERA: PP1190002602003
                    </div>
                    <h2 className="font-extrabold text-xl sm:text-2xl text-[#0d0d0d]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Mahalaxmi Nagar 51 <span style={{ color: "#30534A" }}>Anaya</span>
                    </h2>
                    <p className="text-xs text-[#666] mt-1">
                        Download Sanctioned Layout Map &amp; Real-Time Price Sheet directly.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5 max-w-full overflow-x-hidden"
                    onPointerDownCapture={markHuman}
                    onKeyDownCapture={markHuman}
                    onFocusCapture={markHuman}
                >
                    <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} />
                    <input
                        type="text"
                        name="b_phone"
                        tabIndex={-1}
                        autoComplete="new-password"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                        aria-hidden="true"
                    />

                    <div>
                        <Label htmlFor="popup-name">Your Full Name <span style={{ color: "#e55" }}>*</span></Label>
                        <input
                            type="text"
                            id="popup-name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Rahul Patil"
                            style={inputStyle}
                            onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                            onBlur={inputBlur}
                        />
                    </div>

                    <div>
                        <Label htmlFor="popup-mobile">Mobile Number <span style={{ color: "#e55" }}>*</span></Label>
                        <input
                            type="tel"
                            id="popup-mobile"
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

                    <div>
                        <Label htmlFor="popup-plotCategory">Plot Category in Anaya <span style={{ color: "#e55" }}>*</span></Label>
                        <select
                            id="popup-plotCategory"
                            name="plotCategory"
                            value={formState.plotCategory}
                            onChange={handleChange}
                            required
                            style={{
                                ...inputStyle,
                                appearance: "none",
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2330534A' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                paddingRight: "2.5rem",
                                color: formState.plotCategory ? "#0d0d0d" : "#888",
                                cursor: "pointer",
                            }}
                            onFocus={(e) => { markFormStarted(); markHuman(); inputFocus(e) }}
                            onBlur={inputBlur}
                        >
                            <option value="Executive Villa Plot (1,130 - 1,500 Sq.Ft)">Executive Villa Plot (1,130 - 1,500 Sq.Ft)</option>
                            <option value="Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)">Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)</option>
                            <option value="Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)">Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)</option>
                            <option value="Clubhouse & Sports Enclave Plot">Clubhouse &amp; Sports Enclave Plot</option>
                            <option value="Request Complete Cost Sheet & Layout">Request Complete Cost Sheet &amp; Layout</option>
                        </select>
                    </div>

                    {submitStatus === "error" && (
                        <div className="rounded-xl p-2.5 text-xs" style={{ background: "rgba(229,85,85,0.08)", border: "1px solid rgba(229,85,85,0.3)", color: "#c44" }}>
                            Please fill all required fields correctly.
                        </div>
                    )}
                    {submitStatus === "rateLimit" && (
                        <div className="rounded-xl p-2.5 text-xs" style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>
                            You recently submitted an inquiry. Please call +91 9326709970 directly for instant assistance.
                        </div>
                    )}
                    {submitStatus === "phone" && (
                        <div className="rounded-xl p-2.5 text-xs" style={{ background: "rgba(229,85,85,0.08)", border: "1px solid rgba(229,85,85,0.3)", color: "#c44" }}>
                            Please enter a valid 10-digit Indian phone number.
                        </div>
                    )}
                    {submitStatus === "duplicatePhone" && (
                        <div className="rounded-xl p-2.5 text-xs" style={{ background: "rgba(201,134,43,0.1)", border: "1px solid rgba(201,134,43,0.3)", color: "#a06820" }}>
                            This number has already submitted recently. Please call +91 9326709970 for urgent requests.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || submitStatus === "rateLimit"}
                        className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60 cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #30534A, #203b34)",
                            boxShadow: "0 6px 20px rgba(48,83,74,0.25)",
                            fontFamily: "'Poppins', sans-serif",
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing…
                            </>
                        ) : (
                            <>
                                Download Layout &amp; Cost Sheet <Send size={14} />
                            </>
                        )}
                    </button>

                    <div className="pt-2 text-center">
                        <a
                            href="tel:+919326709970"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#30534A] hover:text-[#C9862b] transition-colors"
                        >
                            <Phone size={12} className="text-[#C9862b]" />
                            Call Direct Sales Desk: +91 9326709970
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}