import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, message } = await request.json()

    await resend.emails.send({
      from: "Doomi Contact <onboarding@resend.dev>",
      to: "hello@stopdooming.com",
      subject: "New message from Doomi contact form",
      html: `
        <div style="font-family: sans-serif; max-width: 500px;">
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}