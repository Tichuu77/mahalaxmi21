"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ThankYouPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hideContactPopupOnce", "true")
    }

    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(180deg, #f8fbfa 0%, #ffffff 100%)" }}>
      <div className="max-w-lg w-full text-center rounded-3xl p-8 sm:p-10" style={{ border: "1px solid rgba(48,83,74,0.12)", boxShadow: "0 20px 60px rgba(48,83,74,0.12)", background: "#fff" }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "#30534A" }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#0d0d0d", fontFamily: "'Poppins', sans-serif" }}>
          Thank You!
        </h1>
        <p className="text-sm sm:text-base mb-6" style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}>
          Your form has been submitted successfully. We will contact you shortly.
        </p>
        <p className="text-xs sm:text-sm" style={{ color: "#888", fontFamily: "'Inter', sans-serif" }}>
          Redirecting to home in 3 seconds…
        </p>

        <Link
          href="/"
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("hideContactPopupOnce", "true")
            }
          }}
          className="inline-block mt-6 text-sm font-semibold"
          style={{ color: "#30534A", textDecoration: "underline" }}
        >
          Go to home now
        </Link>
      </div>
    </main>
  )
}
