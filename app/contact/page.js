"use client"
import { useState } from "react"
import Image from "next/image"

export default function Contact() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!email || !message) return
    setLoading(true)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message })
    })
    const data = await res.json()
    if (data.success) setSent(true)
    setLoading(false)
  }

  const glass = {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "24px",
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #06d6a0 0%, #7b2d8b 30%, #f4845f 65%, #facc15 100%)",
      fontFamily: "inherit"
    }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 32px",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Image src="/pet.svg" alt="Doomi" width={36} height={36} />
          <span style={{ fontWeight: "800", fontSize: "22px", color: "white", letterSpacing: "-1px" }}>doomi</span>
        </a>
        <a href="/" style={{
          background: "white", color: "#0f172a", fontWeight: "800", fontSize: "14px",
          padding: "10px 22px", borderRadius: "100px", textDecoration: "none"
        }}>← Back</a>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "80px 24px 120px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Image src="/pet.svg" alt="Doomi" width={64} height={64} style={{ marginBottom: "20px" }} />
          <h1 style={{
            fontSize: "48px", fontWeight: "800", letterSpacing: "-2px",
            color: "white", margin: "0 0 16px 0", lineHeight: 1.1
          }}>Say hello 👋</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px", lineHeight: "1.7", margin: 0 }}>
            Got a question, idea, or just want to chat about screen time? We'd love to hear from you.
          </p>
        </div>

        {sent ? (
          <div style={{ ...glass, padding: "48px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ color: "white", fontWeight: "800", fontSize: "24px", margin: "0 0 12px 0" }}>Message sent!</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", margin: 0 }}>We'll get back to you at {email} soon.</p>
          </div>
        ) : (
          <div style={{ ...glass, padding: "36px 32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>
                YOUR EMAIL
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "14px", padding: "14px 18px",
                  color: "white", fontSize: "15px", outline: "none",
                  fontFamily: "inherit"
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>
                MESSAGE
              </label>
              <textarea
                placeholder="What's on your mind?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "14px", padding: "14px 18px",
                  color: "white", fontSize: "15px", outline: "none",
                  fontFamily: "inherit", resize: "none", lineHeight: "1.6"
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !message}
              style={{
                width: "100%", background: "white",
                color: "#0f172a", fontWeight: "800", fontSize: "16px",
                padding: "18px", borderRadius: "100px",
                border: "none", cursor: loading ? "wait" : "pointer",
                opacity: (!email || !message) ? 0.5 : 1,
                marginTop: "8px"
              }}>
              {loading ? "Sending..." : "Send message"}
            </button>
          </div>
        )}
      </div>

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