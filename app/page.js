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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  )
}

const VERDICTS = {
  "DOOMING HARD": {
    label: "Doomscroll Level: Extreme",
    sublabel: "You're deep in it.",
    headerGradient: "linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #facc15 100%)",
    badgeColor: "#dc2626"
  },
  "GETTING THERE": {
    label: "Doomscroll Level: Moderate",
    sublabel: "Room to improve.",
    headerGradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #facc15 100%)",
    badgeColor: "#d97706"
  },
  "ACTUALLY OKAY": {
    label: "Doomscroll Level: Low",
    sublabel: "Not bad at all.",
    headerGradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #67e8f9 100%)",
    badgeColor: "#0891b2"
  },
}

export default function Home() {
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
const [menuOpen, setMenuOpen] = useState(false)

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

  const verdictData = VERDICTS[result?.verdict] || VERDICTS["DOOMING HARD"]

  return (
    <main style={{
      fontFamily: "inherit",
      minHeight: "100vh",
      background: "linear-gradient(160deg, #06d6a0 0%, #7b2d8b 30%, #f4845f 65%, #facc15 100%)",
    }}>

      <nav style={{
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "16px 32px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  position: "sticky", top: 0, zIndex: 100
}}>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <Image src="/pet.svg" alt="Doomi" width={36} height={36} />
    <span style={{ fontWeight: "800", fontSize: "22px", color: "white", letterSpacing: "-1px" }}>doomi</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <a href="#analyzer" style={{
      background: "white",
      color: "#0f172a", fontWeight: "800", fontSize: "14px",
      padding: "10px 22px", borderRadius: "100px", textDecoration: "none",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
    }}>Try it free</a>
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      style={{
        background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "12px", padding: "10px", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: "5px", alignItems: "center"
      }}>
      <span style={{ width: "20px", height: "2px", background: "white", display: "block" }}></span>
      <span style={{ width: "20px", height: "2px", background: "white", display: "block" }}></span>
      <span style={{ width: "20px", height: "2px", background: "white", display: "block" }}></span>
    </button>
  </div>

  {menuOpen && (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
      zIndex: 200, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "16px"
    }} onClick={() => setMenuOpen(false)}>
      {[
        { label: "Home", href: "/" },
        { label: "Research & Studies", href: "/research" },
        { label: "About Doomi", href: "/about" },
        { label: "How to find screen time", href: "/how-to" },
        { label: "Contact", href: "/contact" },
      ].map((item) => (
        <a key={item.href} href={item.href} style={{
          color: "white", fontSize: "28px", fontWeight: "800",
          textDecoration: "none", letterSpacing: "-1px",
          transition: "opacity 0.2s"
        }}>{item.label}</a>
      ))}
      <button onClick={() => setMenuOpen(false)} style={{
        marginTop: "24px", background: "rgba(255,255,255,0.2)",
        border: "1px solid rgba(255,255,255,0.3)", color: "white",
        borderRadius: "100px", padding: "12px 32px", cursor: "pointer",
        fontSize: "16px", fontWeight: "700"
      }}>Close</button>
    </div>
  )}
</nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: "720px", margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "100px", padding: "8px 20px", fontSize: "13px",
            color: "white", fontWeight: "700", marginBottom: "28px",
            letterSpacing: "0.5px"
          }}>
            Free AI Screen Time Analyzer
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
            <Image src="/pet.svg" alt="Doomi pet" width={90} height={90}
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))" }} />
            <h1 style={{
              fontSize: "clamp(56px, 10vw, 88px)", fontWeight: "800",
              letterSpacing: "-4px", margin: 0, lineHeight: 0.9,
              color: "white",
              textShadow: "0 4px 24px rgba(0,0,0,0.2)"
            }}>doomi</h1>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: "20px", color: "rgba(255,255,255,0.85)",
            lineHeight: "1.7", margin: "0 0 40px 0", fontWeight: "500"
          }}>
            Upload your screen time screenshot.<br />
            Get analysed by AI. Feel seen. Scroll less.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a href="#analyzer" style={{
            display: "inline-block",
            background: "white",
            color: "#0f172a", fontWeight: "800", fontSize: "18px",
            padding: "20px 48px", borderRadius: "100px", textDecoration: "none",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            letterSpacing: "-0.5px"
          }}>
            Analyse my screen time
          </a>
        </FadeIn>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{
              textAlign: "center", fontSize: "36px", fontWeight: "800",
              letterSpacing: "-1.5px", color: "white", marginBottom: "56px",
              textShadow: "0 2px 12px rgba(0,0,0,0.15)"
            }}>
              How it works
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px" }}>
            {[
              { icon: "📱", title: "Upload", desc: "Take a screenshot of your screen time and upload it here" },
              { icon: "🧠", title: "AI analyses", desc: "Claude reads your data and compares it to global averages" },
              { icon: "📊", title: "Get your verdict", desc: "See your doomscroll level and what to do about it" },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "24px", padding: "32px 24px", textAlign: "center"
                }}>
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "18px",
                    background: "rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "28px", margin: "0 auto 20px"
                  }}>{step.icon}</div>
                  <h3 style={{ fontWeight: "800", fontSize: "18px", color: "white", margin: "0 0 10px 0" }}>{step.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYZER */}
      <section id="analyzer" style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>

          {!result && (
            <>
              <FadeIn>
                <h2 style={{
                  textAlign: "center", fontSize: "32px", fontWeight: "800",
                  letterSpacing: "-1px", color: "white", marginBottom: "8px"
                }}>Try it now</h2>
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontWeight: "500" }}>
                  Upload your screen time screenshot below
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <label style={{
                  display: "block",
                  border: "2px dashed rgba(255,255,255,0.4)",
                  borderRadius: "28px", padding: "52px 32px", cursor: "pointer",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  textAlign: "center", transition: "all 0.2s"
                }}>
                  <input type="file" accept="image/*" style={{ display: "none" }}
                    onChange={(e) => handleFile(e.target.files[0])} />
                  {image ? (
                    <>
                      <img src={image} alt="preview" style={{ maxHeight: "200px", borderRadius: "16px", marginBottom: "16px", objectFit: "contain" }} />
                      <p style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Looking good — now get analysed</p>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: "64px", height: "64px", borderRadius: "20px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "32px", margin: "0 auto 20px"
                      }}>📱</div>
                      <p style={{ color: "white", fontWeight: "700", fontSize: "16px", margin: "0 0 8px 0" }}>Drop your screen time screenshot</p>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: 0 }}>iPhone and Android supported</p>
                    </>
                  )}
                </label>
              </FadeIn>

              {image && !loading && (
                <FadeIn delay={0.1}>
                  <button onClick={analyze} style={{
                    marginTop: "16px", width: "100%",
                    background: "white",
                    color: "#0f172a",
                    fontWeight: "800", fontSize: "17px", padding: "20px",
                    borderRadius: "100px", border: "none", cursor: "pointer",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    letterSpacing: "-0.3px"
                  }}>
                    Analyse
                  </button>
                </FadeIn>
              )}

              {loading && (
                <div style={{ textAlign: "center", marginTop: "24px", color: "white", fontWeight: "700", fontSize: "16px" }}>
                  Analysing...
                </div>
              )}
            </>
          )}

          {result && (
            <FadeIn>
              <div style={{
                borderRadius: "28px", overflow: "hidden",
                border: "3px solid #1e3a5f",
                boxShadow: "0 32px 80px rgba(0,0,0,0.3)"
              }}>
                {/* VERDICT HEADER */}
                <div style={{
                  background: verdictData.headerGradient,
                  padding: "36px 28px", textAlign: "center"
                }}>
                  <Image src="/pet.svg" alt="Doomi" width={56} height={56} style={{ marginBottom: "16px" }} />
                  <p style={{
                    fontSize: "11px", fontWeight: "800", letterSpacing: "3px",
                    textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
                    margin: "0 0 8px 0"
                  }}>Your result</p>
                  <p style={{
                    fontSize: "26px", fontWeight: "800", color: "white",
                    margin: "0 0 4px 0", letterSpacing: "-0.5px",
                    textShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}>{verdictData.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: 0, fontWeight: "600" }}>
                    {verdictData.sublabel}
                  </p>
                </div>

                {/* CARD BODY */}
                <div style={{
                  background: "linear-gradient(180deg, #f97316 0%, #374151 25%, #1f2937 60%, #111827 100%)",
                  padding: "24px 28px",
                  display: "flex", flexDirection: "column", gap: "14px"
                }}>
                  {[
                    { label: "Total screen time", value: result.totalTime },
                    { label: "Worst offender", value: `${result.worstApp} · ${result.worstAppTime}` },
                    { label: "vs. global average", value: `avg 4h · ${result.vsAverage}`, highlight: true },
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      paddingBottom: i < 2 ? "14px" : 0,
                      borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none"
                    }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{row.label}</span>
                      <span style={{ color: row.highlight ? "#f87171" : "white", fontWeight: "700", fontSize: "14px" }}>{row.value}</span>
                    </div>
                  ))}

                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "16px", padding: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginTop: "4px"
                  }}>
                    <p style={{ color: "#6EE7B7", fontSize: "10px", fontWeight: "800", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 10px 0" }}>Doomi says</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.7", margin: 0, fontSize: "14px" }}>{result.roast}</p>
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "16px", padding: "18px",
                    border: "1px solid rgba(255,255,255,0.08)"
                  }}>
                    <p style={{ color: "#FACC15", fontSize: "10px", fontWeight: "800", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 10px 0" }}>One thing to try</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: "1.7", margin: 0, fontSize: "14px" }}>{result.advice}</p>
                  </div>

                  {/* EMAIL CAPTURE */}
                  <div style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "16px", padding: "20px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    textAlign: "center"
                  }}>
                    <p style={{ color: "#0f172a", fontWeight: "800", fontSize: "15px", margin: "0 0 4px 0" }}>Want to stop dooming for real?</p>
                    <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 16px 0" }}>Get early access to the full app.</p>
                    {emailSent ? (
                      <div style={{
                        background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                        color: "#0f172a", fontWeight: "800", fontSize: "15px",
                        padding: "16px", borderRadius: "100px", textAlign: "center"
                      }}>
                        You're on the list!
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="email" placeholder="your@email.com" value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            flex: 1, background: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "100px", padding: "12px 16px",
                            color: "#0f172a", fontSize: "14px", outline: "none"
                          }}
                        />
                        <button onClick={submitEmail} style={{
                          background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                          color: "#0f172a", fontWeight: "800", fontSize: "14px",
                          padding: "12px 20px", borderRadius: "100px",
                          border: "none", cursor: "pointer", whiteSpace: "nowrap"
                        }}>
                          Notify me
                        </button>
                      </div>
                    )}
                  </div>

                  <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,0.3)", margin: "4px 0 0 0" }}>
                    Global average based on{" "}
                    <a href="https://datareportal.com/reports/digital-2024-global-overview-report"
                      target="_blank" style={{ color: "rgba(255,255,255,0.4)" }}>
                      DataReportal 2024
                    </a>
                  </p>
                </div>
              </div>

              <button onClick={() => { setResult(null); setImage(null); setImageFile(null) }}
                style={{ marginTop: "16px", width: "100%", color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                Try another screenshot
              </button>
            </FadeIn>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "32px",
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.5)", fontSize: "13px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <Image src="/pet.svg" alt="Doomi" width={24} height={24} />
          <span style={{ fontWeight: "800", color: "white", letterSpacing: "-0.5px" }}>doomi</span>
        </div>
        Helping you scroll less, one analysis at a time.
      </footer>
    </main>
  )
}