"use client"
import { useState } from "react"

export default function Home() {
  const [image, setImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFile(file) {
    if (!file) return
    setImageFile(file)
    const url = URL.createObjectURL(file)
    setImage(url)
  }

  async function analyze() {
    if (!imageFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append("image", imageFile)
    const res = await fetch("/api/analyze", { method: "POST", body: formData })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Doomi 💀</h1>
      <p className="text-gray-400 mb-8">Find out how bad your scrolling really is.</p>

      <label className="border-2 border-dashed border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-white transition-all">
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        <p className="text-2xl mb-2">📱</p>
        <p className="text-gray-300">Drop your screen time screenshot here</p>
        <p className="text-gray-500 text-sm mt-1">or click to upload</p>
      </label>

      {image && (
        <div className="mt-6 text-center">
          <img src={image} alt="Your screenshot" className="max-w-xs rounded-xl mb-4" />
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            {loading ? "Analysing... 🔍" : "Roast me 🔥"}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-8 max-w-md w-full bg-gray-900 rounded-2xl p-6 space-y-4">
          <div className="text-center">
            <span className="text-2xl font-bold">{result.verdict}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total screen time</span>
            <span className="font-bold">{result.totalTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Worst app</span>
            <span className="font-bold">{result.worstApp} — {result.worstAppTime}</span>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">Doomi says:</p>
            <p className="text-white">{result.roast}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">One thing to try:</p>
            <p className="text-white">{result.advice}</p>
          </div>
        </div>
      )}
    </main>
  )
}