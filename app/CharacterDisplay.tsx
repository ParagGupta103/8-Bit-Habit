"use client"

import { Button } from "@/components/ui/button"

interface CharacterDisplayProps {
  characterImage: string
  switchSkin: () => void
}

export default function CharacterDisplay({ characterImage, switchSkin }: CharacterDisplayProps) {
  return (
    <div className="w-1/3 flex flex-col items-center justify-center bg-gray-900 p-4 border-r border-gray-700">
      <h2 className="text-white text-2xl mb-6">Your Character</h2>
      <div className="w-[600px] h-[600px] bg-white flex items-center justify-center rounded-lg">
        <img src={characterImage} alt="Character" className="w-full h-full object-contain" />
      </div>
      <Button className="mt-4 bg-blue-500 hover:bg-blue-600" onClick={switchSkin}>
        Switch Skins
      </Button>
    </div>
  )
}
