"use client"

import { useEffect, useState } from "react"

interface AICharacterProps {
  activeClass: string
  level: number
  experience: number
}

const spriteImages: Record<string, string> = {
  "Gym Bro": "/GWC.png",
  "Detox Alchemist": "/DAC.png",
  "Academic Weapon": "/AWC.png",
}

export default function AICharacter({ activeClass, level, experience }: AICharacterProps) {
  const [message, setMessage] = useState("Let's start strong! What's your first goal? 💡")

  useEffect(() => {
    const fetchMessage = async () => {
      const prompt = `You are a motivational coach for the '${activeClass}' class. 
      The player is at Level ${level} with ${experience} XP. Provide a short, encouraging, and fun message.`

      try {
        const response = await fetch("/api/chatgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        })
        const data = await response.json()
        setMessage(data.message || "Keep going! You're doing great! 🚀")
      } catch (error) {
        console.error("Error fetching AI response:", error)
        setMessage("Keep pushing forward! You got this! 💪")
      }
    }

    fetchMessage()
  }, [activeClass, level, experience])

  return (
    <div className="flex items-center space-x-6 bg-gray-900 text-white p-6 rounded-lg shadow-md mt-6">
      {/* Coach Sprite (Increased Size) */}
      <img src={spriteImages[activeClass]} alt={`${activeClass} Coach`} className="w-40 h-40 object-contain" />

      {/* Speech Bubble (Adjusted for Larger Sprite) */}
      <div className="relative bg-gray-700 text-white p-4 rounded-lg text-lg max-w-lg shadow-md">
        {message}
        <div className="absolute -bottom-3 left-6 w-6 h-6 bg-gray-700 rotate-45"></div>
      </div>
    </div>
  )
}
