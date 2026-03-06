"use client"
import { useState } from "react"
import Image from "next/image"

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
    "DOOMING HARD": { color: "#f87171", emoji: "💀" },
    "GETTING THERE": { color: "#FACC15", emoji: "😬" },
    "ACTUALLY OKAY": { color: "#6EE7B7", emoji: "✨" },
  }

  const verdict = verdictConfig[result?.verdict] || { color: "#f87171", emoji: "💀" }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #1a1a4e 0%, #2d1b69 25%, #0f3460 55%, #1a3a4a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>

      {!result && (
        <div style={{ width: "100%", maxWidth: "440px", textAlign: "center" }}>

          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
              <Image
                src="/pet.svg"
                alt="Doomi pet"
                width={60}
                height={60}
                style={{ filter: "drop-shadow(0 0 20px rgba(110,231,183,0.3))" }}
              />
              <h1 style={{
                fontSize: "54px",
                fontWeight: "900",
                letterSpacing: "-2px",
                margin: 0,
                background: "linear-gradient(90deg, #6EE7B7, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>doomi</h1>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
              Upload your screen time. We'll tell you the truth.
            </p>
          </div>

          <label style={{
            display: "block",
            border: "2px dashed rgba(110, 231, 183, 0.25)",
            borderRadius: "24px",
            padding: "48px 32px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s"
          }}>
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            {image ? (
              <>
                <img src={image} alt="preview" style={{ maxHeight: "180px", borderRadius: "12px", marginBottom: "16px", objectFit: "contain" }} />
                <p style={{ color: "#6EE7B7", fontSize: "14px", margin: 0 }}>Looking good — now roast me</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: "40px", margin: "0 0 12px 0" }}>📱</p>
                <p style={{ color: "#f8fafc", fontWeight: "600", margin: "0 0 6px 0" }}>Drop your screen time screenshot</p>
                <p style={{ color: "#475569", fontSize: "14px", margin: 0 }}>or click to upload</p>
              </>
            )}
          </label>

          {image && (
            <button
              onClick={analyze}
              disabled={loading}
              style={{
                marginTop: "20px",
                width: "100%",
                background: loading ? "rgba(110,231,183,0.2)" : "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                color: "#0F172A",
                fontWeight: "800",
                fontSize: "17px",
                padding: "16px",
                borderRadius: "100px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s"
              }}
            >
              {loading ? "Reading your sins... 👀" : "Roast me 🔥"}
            </button>
          )}
        </div>
      )}

      {result && (
        <div style={{ width: "100%", maxWidth: "440px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "4px" }}>
              <Image
                src="/pet.svg"
                alt="Doomi pet"
                width={45}
                height={45}
                style={{ filter: "drop-shadow(0 0 15px rgba(110,231,183,0.3))" }}
              />
              <h1 style={{
                fontSize: "30px",
                fontWeight: "900",
                letterSpacing: "-1px",
                margin: 0,
                background: "linear-gradient(90deg, #6EE7B7, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>doomi</h1>
            </div>
            <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>your screen time report</p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(110,231,183,0.15)",
            borderRadius: "28px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            <div style={{ textAlign: "center", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <p style={{ fontSize: "34px", fontWeight: "900", color: verdict.color, margin: 0, letterSpacing: "-1px" }}>
                {verdict.emoji} {result.verdict}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontSize: "14px" }}>Total screen time</span>
              <span style={{ color: "#f8fafc", fontWeight: "700" }}>{result.totalTime}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontSize: "14px" }}>Worst offender</span>
              <span style={{ color: "#f8fafc", fontWeight: "700" }}>{result.worstApp} · {result.worstAppTime}</span>
            </div>

            <div style={{
              background: "rgba(0,0,0,0.2)",
              borderRadius: "16px",
              padding: "16px",
              border: "1px solid rgba(110,231,183,0.1)"
            }}>
              <p style={{ color: "#6EE7B7", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>Doomi says</p>
              <p style={{ color: "#f8fafc", lineHeight: "1.6", margin: 0 }}>{result.roast}</p>
            </div>

            <div style={{
              background: "rgba(0,0,0,0.2)",
              borderRadius: "16px",
              padding: "16px",
              border: "1px solid rgba(250,204,21,0.15)"
            }}>
              <p style={{ color: "#FACC15", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>One thing to try</p>
              <p style={{ color: "#f8fafc", lineHeight: "1.6", margin: 0 }}>{result.advice}</p>
            </div>
          </div>

          <div style={{
            marginTop: "16px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(110,231,183,0.15)",
            borderRadius: "28px",
            padding: "24px",
            textAlign: "center"
          }}>
            <p style={{ color: "#f8fafc", fontWeight: "700", fontSize: "16px", margin: "0 0 4px 0" }}>
              Want to stop dooming for real? 👾
            </p>
            <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>
              We're building the full app. Get early access.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(110,231,183,0.2)",
                  borderRadius: "100px",
                  padding: "12px 16px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <button
                onClick={submitEmail}
                style={{
                  background: "linear-gradient(90deg, #14B8A6, #6EE7B7)",
                  color: "#0F172A",
                  fontWeight: "800",
                  fontSize: "14px",
                  padding: "12px 20px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {emailSent ? "✓ Done!" : "Notify me"}
              </button>
            </div>
          </div>

          <button
            onClick={() => { setResult(null); setImage(null); setImageFile(null) }}
            style={{ marginTop: "12px", width: "100%", color: "#475569", background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
          >
            Try another screenshot →
          </button>
        </div>
      )}
    </main>
  )
}