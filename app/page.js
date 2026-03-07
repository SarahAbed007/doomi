"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
    }}>
      {children}
    </div>
  )
}

export default function Home() {
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  function handleFile(file) {
    if (!file) return
    setImageFile(file)
    setImage(URL.createObjectURL(file))
  }

  async function analyze() {
    if (!imageFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append("image", imageFile)
    const res = await fetch("/api/analyze", { method: "POST", body: formData })
    const data = await res.json()
    if (data.error === "not_a_screenshot") {
      alert("That doesn't look like a screen time screenshot! Please upload your iPhone or Android screen time report.")
      setLoading(false)
      return
    }
    setResult(data)
    setLoading(false)
  }

  async function submitEmail() {
    if (!email) return
    setEmailSent(true)
    await fetch("https://api.sheety.co/144575ee7e1cfc9fdf9f5fc8a210181f/doomi/sheet1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sheet1: { email: email } })
    })
  }

  const verdictConfig = {
    "DOOMING HARD": { color: "#ef4444", bg: "#fef2f2", emoji: "💀" },
    "GETTING THERE": { color: "#d97706", bg: "#fffbeb", emoji: "😬" },
    "ACTUALLY OKAY": { color: "#059669", bg: "#ecfdf5", emoji: "✨" },
  }
  const verdict = verdictConfig[result?.verdict] || { color: "#ef4444", bg: "#fef2f2", emoji: "💀" }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 32px", background: "white",
        borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/pet.svg" alt="Doomi" width={36} height={36} />
          <span style={{ fontWeight: "900", fontSize: "22px", color: "#0f172a", letterSpacing: "-1px" }}>doomi</span>
        </div>
        <a href="#analyzer" style={{
          background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
          color: "#0f172a", fontWeight: "700", fontSize: "14px",
          padding: "10px 20px", borderRadius: "100px", textDecoration: "none"
        }}>Try it free →</a>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "80px 24px 60px", maxWidth: "700px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            display: "inline-block", background: "#f0fdf4", border: "1px solid #bbf7d0",
            borderRadius: "100px", padding: "6px 16px", fontSize: "13px",
            color: "#16a34a", fontWeight: "600", marginBottom: "24px"
          }}>
            Free screen time analyzer ✨
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <Image src="/pet.svg" alt="Doomi pet" width={80} height={80} style={{ filter: "drop-shadow(0 4px 12px rgba(20,184,166,0.3))" }} />
            <h1 style={{
              fontSize: "clamp(48px, 8vw, 72px)", fontWeight: "900",
              letterSpacing: "-3px", margin: 0, lineHeight: 1,
              background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>doomi</h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: "20px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0" }}>
            Upload your screen time screenshot.<br />
            Get roasted by AI. Feel seen. Do better.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a href="#analyzer" style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
            color: "#0f172a", fontWeight: "800", fontSize: "18px",
            padding: "18px 40px", borderRadius: "100px", textDecoration: "none",
            boxShadow: "0 8px 32px rgba(20,184,166,0.3)"
          }}>
            Roast my screen time 🔥
          </a>
        </FadeIn>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 24px", background: "white" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: "900", letterSpacing: "-1px", color: "#0f172a", marginBottom: "48px" }}>
              How it works
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px" }}>
            {[
              { emoji: "📱", title: "Upload", desc: "Take a screenshot of your screen time report and upload it" },
              { emoji: "🤖", title: "AI analyzes", desc: "Our AI reads your usage and compares it to global averages" },
              { emoji: "💀", title: "Get roasted", desc: "Receive a brutally honest verdict and tips to do better" },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "20px",
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "28px", margin: "0 auto 16px"
                  }}>{step.emoji}</div>
                  <h3 style={{ fontWeight: "800", fontSize: "18px", color: "#0f172a", margin: "0 0 8px 0" }}>{step.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYZER */}
      <section id="analyzer" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>

          {!result && (
            <>
              <FadeIn>
                <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "900", letterSpacing: "-1px", color: "#0f172a", marginBottom: "8px" }}>
                  Try it now
                </h2>
                <p style={{ textAlign: "center", color: "#64748b", marginBottom: "32px" }}>
                  Upload your screen time screenshot below
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <label style={{
                  display: "block", border: "2px dashed #cbd5e1", borderRadius: "24px",
                  padding: "48px 32px", cursor: "pointer", background: "white",
                  textAlign: "center", transition: "all 0.2s"
                }}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
                  {image ? (
                    <>
                      <img src={image} alt="preview" style={{ maxHeight: "200px", borderRadius: "12px", marginBottom: "16px", objectFit: "contain" }} />
                      <p style={{ color: "#14B8A6", fontSize: "14px", fontWeight: "600", margin: 0 }}>Looking good — now roast me</p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: "48px", margin: "0 0 16px 0" }}>📱</p>
                      <p style={{ color: "#0f172a", fontWeight: "700", fontSize: "16px", margin: "0 0 6px 0" }}>Drop your screen time screenshot</p>
                      <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>or click to upload · iPhone & Android supported</p>
                    </>
                  )}
                </label>
              </FadeIn>

              {image && (
                <FadeIn delay={0.1}>
                  <button onClick={analyze} disabled={loading} style={{
                    marginTop: "16px", width: "100%",
                    background: loading ? "#e2e8f0" : "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                    color: loading ? "#94a3b8" : "#0f172a",
                    fontWeight: "800", fontSize: "17px", padding: "18px",
                    borderRadius: "100px", border: "none", cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 8px 24px rgba(20,184,166,0.3)"
                  }}>
                    {loading ? "Reading your sins... 👀" : "Roast me 🔥"}
                  </button>
                </FadeIn>
              )}
            </>
          )}

          {result && (
            <>
              <div style={{
                background: "white", borderRadius: "28px", overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
              }}>
                <div style={{ background: verdict.bg, padding: "28px", textAlign: "center", borderBottom: "1px solid #f1f5f9" }}>
                  <Image src="/pet.svg" alt="Doomi" width={50} height={50} style={{ marginBottom: "12px" }} />
                  <p style={{ fontSize: "30px", fontWeight: "900", color: verdict.color, margin: 0, letterSpacing: "-1px" }}>
                    {verdict.emoji} {result.verdict}
                  </p>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>Total screen time</span>
                    <span style={{ color: "#0f172a", fontWeight: "700" }}>{result.totalTime}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>Worst offender</span>
                    <span style={{ color: "#0f172a", fontWeight: "700" }}>{result.worstApp} · {result.worstAppTime}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>vs. global average</span>
                    <span style={{ color: "#ef4444", fontWeight: "700" }}>avg 4h · {result.vsAverage}</span>
                  </div>

                  <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "16px" }}>
                    <p style={{ color: "#14B8A6", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>Doomi says</p>
                    <p style={{ color: "#0f172a", lineHeight: "1.6", margin: 0 }}>{result.roast}</p>
                  </div>

                  <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "16px" }}>
                    <p style={{ color: "#FACC15", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>One thing to try</p>
                    <p style={{ color: "#0f172a", lineHeight: "1.6", margin: 0 }}>{result.advice}</p>
                  </div>
                </div>

                <div style={{ padding: "0 24px 24px" }}>
                  <div style={{ background: "#f0fdf4", borderRadius: "16px", padding: "20px", textAlign: "center" }}>
                    <p style={{ color: "#0f172a", fontWeight: "700", fontSize: "15px", margin: "0 0 4px 0" }}>Want to stop dooming for real? 👾</p>
                    <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>Get early access to the full app.</p>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="email" placeholder="your@email.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          flex: 1, background: "white", border: "1px solid #e2e8f0",
                          borderRadius: "100px", padding: "12px 16px", color: "#0f172a",
                          fontSize: "14px", outline: "none"
                        }}
                      />
                      <button onClick={submitEmail} style={{
                        background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                        color: "#0f172a", fontWeight: "800", fontSize: "14px",
                        padding: "12px 20px", borderRadius: "100px", border: "none", cursor: "pointer"
                      }}>
                        {emailSent ? "✓ Done!" : "Notify me"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: "11px", color: "#94a3b8", marginTop: "12px" }}>
                Global average based on{" "}
                <a href="https://datareportal.com/reports/digital-2024-global-overview-report" target="_blank" style={{ color: "#64748b" }}>
                  DataReportal 2024
                </a>
              </p>

              <button onClick={() => { setResult(null); setImage(null); setImageFile(null) }}
                style={{ marginTop: "8px", width: "100%", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}>
                Try another screenshot →
              </button>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "32px", borderTop: "1px solid #e2e8f0", color: "#94a3b8", fontSize: "13px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <Image src="/pet.svg" alt="Doomi" width={24} height={24} />
          <span style={{ fontWeight: "700", color: "#0f172a" }}>doomi</span>
        </div>
        Made with 💀 to help you scroll less
      </footer>
    </main>
  )
}