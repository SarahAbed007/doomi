import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, message } = await request.json()

    const result = await resend.emails.send({
      from: "Doomi Contact <onboarding@resend.dev>",
      to: "fatema.abed@gmx.net",
      subject: "New message from Doomi contact form",
      html: `<p>From: ${email}</p><p>${message}</p>`
    })

    console.log("Resend result:", result)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}