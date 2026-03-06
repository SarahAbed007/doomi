import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"

const client = new Anthropic()

export async function POST(request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image")

    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")
    const mimeType = image.type

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: base64,
              },
            },
            {
              type: "text",
              text: `Look at this image. First check if it is a screen time or digital wellbeing screenshot from a phone.

If it is NOT a screen time screenshot, respond with ONLY this JSON:
{"error": "not_a_screenshot"}

If it IS a screen time screenshot, respond with ONLY this JSON, no other text, no markdown, no backticks:
{
  "totalTime": "X hours Y minutes",
  "totalMinutes": 000,
  "worstApp": "app name",
  "worstAppTime": "X hours Y minutes",
  "roast": "funny savage roast in 2-3 sentences. Include that the global average is 4 hours and make it personal based on their actual numbers",
  "advice": "one specific actionable tip",
  "verdict": "DOOMING HARD or GETTING THERE or ACTUALLY OKAY",
  "vsAverage": "X times the average" 
}`,
            },
          ],
        },
      ],
    })

    const text = message.content[0].text.trim()
    console.log("Claude response:", text)
    const json = JSON.parse(text)
    return NextResponse.json(json)

  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}