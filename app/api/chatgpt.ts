import { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to store your API key in .env.local
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" })
  }

  const { prompt } = req.body

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are a motivational AI coach." }, { role: "user", content: prompt }],
      max_tokens: 50,
    })

    const message = response.choices[0]?.message?.content || "You're doing great! Keep pushing forward! 🚀"
    res.status(200).json({ message })
  } catch (error) {
    console.error("OpenAI API error:", error)
    res.status(500).json({ message: "Something went wrong. Stay motivated! 💪" })
  }
}
