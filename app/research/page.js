"use client"
import { useEffect } from "react"
import Image from "next/image"

export default function Research() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"
    script.onload = () => {
      const Chart = window.Chart

      const gradientPlugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: () => {}
      }

      // CHART 1
      new Chart(document.getElementById('chart1'), {
        type: 'bar',
        data: {
          labels: ['US Adults', 'German Adults', 'US Gen Z', 'German Gen Z'],
          datasets: [{
            label: 'Hours per Day',
            data: [7, 5.5, 9, 7],
            backgroundColor: ['#06d6a0', '#7b2d8b', '#f4845f', '#facc15'],
            borderWidth: 0,
            borderRadius: 8,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x}h / day` } }
          },
          scales: {
            x: {
              min: 0, max: 12,
              ticks: { callback: v => v + 'h', stepSize: 2, color: 'rgba(255,255,255,0.6)' },
              grid: { color: 'rgba(255,255,255,0.08)' },
              border: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
              grid: { display: false },
              border: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: 'rgba(255,255,255,0.8)', font: { weight: '600' } }
            }
          }
        }
      })

      // CHART 2
      new Chart(document.getElementById('chart2'), {
        type: 'bar',
        data: {
          labels: ['US Gen Z (18–24)', 'German Gen Z (est.)'],
          datasets: [{
            label: 'Social Media Hours / Day',
            data: [3.1, 2.5],
            backgroundColor: ['#f4845f', '#7b2d8b'],
            borderWidth: 0,
            borderRadius: 8,
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x}h on social media` } }
          },
          scales: {
            x: {
              min: 0, max: 5,
              ticks: { callback: v => v + 'h', stepSize: 1, color: 'rgba(255,255,255,0.6)' },
              grid: { color: 'rgba(255,255,255,0.08)' },
              border: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
              grid: { display: false },
              border: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: 'rgba(255,255,255,0.8)', font: { weight: '600' } }
            }
          }
        }
      })

      // CHART 3
      new Chart(document.getElementById('chart3'), {
        type: 'bar',
        data: {
          labels: ['Actively reducing', 'Comfortable with usage', 'Want to reduce but struggle'],
          datasets: [
            {
              label: 'US Gen Z',
              data: [46, 14, 40],
              backgroundColor: '#f4845f',
              borderWidth: 0,
              borderRadius: 6,
            },
            {
              label: 'German Gen Z (est.)',
              data: [46, 20, 34],
              backgroundColor: '#7b2d8b',
              borderWidth: 0,
              borderRadius: 6,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: { usePointStyle: true, boxWidth: 8, padding: 20, color: 'rgba(255,255,255,0.8)' }
            },
            tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}%` } }
          },
          scales: {
            y: {
              min: 0, max: 100,
              ticks: { callback: v => v + '%', stepSize: 20, color: 'rgba(255,255,255,0.6)' },
              grid: { color: 'rgba(255,255,255,0.08)' },
              border: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              grid: { display: false },
              border: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } }
            }
          }
        }
      })

      // CHART 4
      new Chart(document.getElementById('chart4'), {
        type: 'bar',
        data: {
          labels: ['Age 16–20', 'Age 21–27', 'All Gen Z avg.'],
          datasets: [{
            label: 'Phone Screen Time (hours/day)',
            data: [7.88, 7.08, 7.38],
            backgroundColor: ['#06d6a0', '#facc15', '#f4845f'],
            borderWidth: 0,
            borderRadius: 8,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y}h/day` } }
          },
          scales: {
            y: {
              min: 6, max: 9,
              ticks: { callback: v => v + 'h', stepSize: 0.5, color: 'rgba(255,255,255,0.6)' },
              grid: { color: 'rgba(255,255,255,0.08)' },
              border: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
              grid: { display: false },
              border: { color: 'rgba(255,255,255,0.1)' },
              ticks: { color: 'rgba(255,255,255,0.8)', font: { weight: '600' } }
            }
          }
        }
      })
    }
    document.head.appendChild(script)
  }, [])

  const glass = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "24px",
    padding: "32px",
  }

  const chartWrap = {
    ...glass,
    margin: "24px 0"
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

      {/* HEADER */}
      <header style={{ textAlign: "center", padding: "80px 24px 60px", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{
          display: "inline-block", background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.4)", borderRadius: "100px",
          padding: "6px 18px", fontSize: "12px", color: "white",
          fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase",
          marginBottom: "24px"
        }}>Digital Health Report</div>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 56px)", fontWeight: "800",
          letterSpacing: "-2px", color: "white", margin: "0 0 20px 0",
          lineHeight: 1.1, textShadow: "0 4px 24px rgba(0,0,0,0.2)"
        }}>Screen Time:<br />The Data Behind Our Digital Lives</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: "1.7", margin: 0 }}>
          A data-driven look at how much time we spend on screens, who's affected most, and what the research says about the consequences.
        </p>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 120px" }}>

        {/* STATS */}
        <section style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>At a Glance</span>
          </div>
          <h2 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white", marginBottom: "32px" }}>The Numbers Are Hard to Ignore</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
            {[
              { num: "7h", label: "US Adult Daily Avg." },
              { num: "5.5h", label: "German Adult Daily Avg." },
              { num: "9h", label: "US Gen Z Daily Avg." },
              { num: "7h", label: "German Teen Daily Avg." },
              { num: "46%", label: "Gen Z Actively Cutting Back" },
            ].map((s, i) => (
              <div key={i} style={{ ...glass, textAlign: "center", padding: "28px 16px" }}>
                <div style={{ fontSize: "40px", fontWeight: "800", color: "#facc15", letterSpacing: "-2px", lineHeight: 1, marginBottom: "8px" }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.5px", textTransform: "uppercase", fontWeight: "600" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CHARTS 1 & 2 */}
        <section style={{ marginBottom: "60px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>Comparisons</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white", margin: "8px 0 16px 0" }}>How the US & Germany Compare</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px", lineHeight: "1.7" }}>American adults and Gen Z consistently outpace their German counterparts in daily screen time across all measured categories.</p>
          <div style={chartWrap}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "white", marginBottom: "4px" }}>Daily Screen Time by Group</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>Average hours per day — US vs. Germany (2024)</div>
            <canvas id="chart1" height="220"></canvas>
          </div>
          <div style={chartWrap}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "white", marginBottom: "4px" }}>Gen Z Social Media Usage</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>Hours per day spent on social platforms only</div>
            <canvas id="chart2" height="160"></canvas>
          </div>
        </section>

        {/* HEALTH EFFECTS */}
        <section style={{ marginBottom: "60px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>Health Impact</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white", margin: "8px 0 16px 0" }}>What Excessive Screen Time Does to Us</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "32px", lineHeight: "1.7" }}>Research from the NIH, Mayo Clinic, Stanford, and the CDC consistently links high daily screen exposure to a broad range of physical and mental health consequences.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              { title: "Physical Health", desc: "Increased risk of obesity, diabetes, and heart disease from sedentary behavior. Chronic neck, shoulder, and back pain. Eye strain and headaches are common." },
              { title: "Sleep Disruption", desc: "Blue light from evening screen use suppresses melatonin, making it harder to fall and stay asleep. Poor sleep compounds into long-term cardiovascular risk." },
              { title: "Mental Health", desc: "Heavy social media use is tied to higher rates of anxiety, depression, and stress in teens and adults." },
              { title: "Cognition & Learning", desc: "Children with heavy screen use score lower on thinking and language tests. In adults, excessive screens are linked to reduced attention span and higher dementia risk." },
              { title: "Social Development", desc: "Very high screen time crowds out face-to-face interaction, contributing to loneliness and weaker social skills." },
              { title: "Behavioral Effects", desc: "In children, excessive screens are linked to more behavior problems and difficulty reading emotions." },
            ].map((e, i) => (
              <div key={i} style={{
                ...glass,
                borderLeft: "3px solid #facc15",
                borderRadius: "16px",
                padding: "24px"
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "800", color: "white", margin: "0 0 10px 0" }}>{e.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", margin: 0 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHART 3 */}
        <section style={{ marginBottom: "60px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>Attitudes & Awareness</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white", margin: "8px 0 16px 0" }}>Gen Z Wants to Unplug — But Struggles To</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px", lineHeight: "1.7" }}>Despite being the highest-screen-time generation, Gen Z is also the most likely to be actively working to reduce it.</p>
          <div style={chartWrap}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "white", marginBottom: "4px" }}>Gen Z Screen Time Attitudes</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>US & Germany — approximate percentages</div>
            <canvas id="chart3" height="220"></canvas>
          </div>
          <div style={{
            ...glass,
            borderLeft: "4px solid #facc15",
            borderRadius: "16px",
            padding: "28px 32px",
            margin: "24px 0"
          }}>
            <p style={{ fontSize: "20px", fontWeight: "700", color: "white", lineHeight: "1.6", margin: "0 0 12px 0", fontStyle: "italic" }}>
              "Only 14% of Gen Z said they are comfortable with their current screen time. Around 70–80% feel they use too much or should reduce it."
            </p>
            <cite style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", fontStyle: "normal" }}>ExpressVPN Multinational Survey</cite>
          </div>
        </section>

        {/* CHART 4 */}
        <section style={{ marginBottom: "60px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>Deep Dive</span>
          <h2 style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px", color: "white", margin: "8px 0 16px 0" }}>Younger Gen Z Spends Even More Time on Screens</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px", lineHeight: "1.7" }}>Within Gen Z, age matters. Younger members (16–20) spend nearly an hour more per day on their phones than older Gen Z (21–27).</p>
          <div style={chartWrap}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "white", marginBottom: "4px" }}>US Gen Z Phone Screen Time by Age Group</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>Average daily hours — phone only (2024)</div>
            <canvas id="chart4" height="200"></canvas>
          </div>
        </section>

        {/* CITATIONS */}
        <section style={{ ...glass, borderRadius: "24px" }}>
          <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "#facc15" }}>Sources</span>
          <h2 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-1px", color: "white", margin: "8px 0 32px 0" }}>Citations</h2>
          {[
            {
              title: "Health Effects of High Screen Time",
              sources: ["NIH / PMC — The hazards of excessive screen time", "Stanford Lifestyle Medicine — What Excessive Screen Time Does to the Adult Brain", "Mayo Clinic — Children and too much screen time", "CDC — Associations Between Screen Time Use and Health"]
            },
            {
              title: "Average Adult Screen Time — US & Germany",
              sources: ["Backlinko — Revealing Average Screen Time Statistics for 2026", "Statista — Media: daily usage time in Germany 2024", "Exploding Topics — Alarming Average Screen Time Statistics (2026)"]
            },
            {
              title: "Gen Z Screen Time",
              sources: ["dcdx — Gen Z Screen Time Report (4th Annual)", "Statista — U.S. daily phone screen time by generation 2024", "Statista — Gen Z: Bildschirmzeit steigt am Wochenende"]
            },
            {
              title: "Gen Z Screen Time Reduction",
              sources: ["ExpressVPN — Survey: 46% of Gen Z take measures to limit screen time", "Yahoo News — German teens cutting back on social media use", "Sage Journals — Are young Europeans tired of the digital world?"]
            }
          ].map((group, i) => (
            <div key={i} style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", color: "#06d6a0", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{group.title}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.sources.map((s, j) => (
                  <li key={j} style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", padding: "5px 0 5px 16px", position: "relative", lineHeight: "1.5" }}>
                    <span style={{ position: "absolute", left: 0, color: "#facc15" }}>—</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

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
        Data compiled from publicly available research and surveys.
      </footer>
    </main>
  )
}