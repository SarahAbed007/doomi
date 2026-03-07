import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
})

export const metadata = {
  title: "Doomi — Screen Time Roaster",
  description: "Upload your screen time screenshot and get roasted by AI.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className} style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}