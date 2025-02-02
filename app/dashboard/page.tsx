"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import CharacterDisplay from "../CharacterDisplay"
import AICharacter from "../AICharacter"
import { initialClasses, EXPERIENCE_PER_LEVEL, EXPERIENCE_PER_TASK, LEVEL_CAP, characterImages, Class, Task } from "../classes"

export default function DashboardPage() {
  const [classes, setClasses] = useState<Class[]>(initialClasses)
  const [selectedSkinClass, setSelectedSkinClass] = useState("Gym Bro")
  const [characterImage, setCharacterImage] = useState(characterImages["Gym Bro"][1])

  useEffect(() => {
    const savedClasses = localStorage.getItem("classes")
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes))
  }, [classes])

  const toggleTask = (className: string, taskId: string) => {
    setClasses((prevClasses: Class[]) =>
      prevClasses.map((cls: Class) => {
        if (cls.name === className) {
          const updatedTasks = cls.tasks.map((task: Task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )

          // Change the selected class and update the character image
          setSelectedSkinClass(className)

          const newLevel = cls.level
          setCharacterImage(characterImages[className][newLevel] || characterImages[className][1])

          return { ...cls, tasks: updatedTasks, experience: cls.experience + EXPERIENCE_PER_TASK }
        }
        return cls
      })
    )
  }

  const levelUpClass = (className: string) => {
    setClasses((prevClasses: Class[]) =>
      prevClasses.map((cls: Class) => {
        if (cls.name === className && cls.experience >= EXPERIENCE_PER_LEVEL && cls.level < LEVEL_CAP) {
          const newLevel = cls.level + 1

          // Ensure character updates on level-up
          setSelectedSkinClass(className)
          setCharacterImage(characterImages[className][newLevel] || characterImages[className][1])

          return {
            ...cls,
            level: newLevel,
            experience: 0,
            tasks: cls.tasks.map((task: Task) => ({ ...task, completed: false }))
          }
        }
        return cls
      })
    )
  }
  const switchSkin = () => {
    const unlockedClasses = classes.filter((cls) => cls.level > 1)
    if (unlockedClasses.length === 0) return

    const currentIndex = unlockedClasses.findIndex((cls) => cls.name === selectedSkinClass)
    const nextIndex = (currentIndex + 1) % unlockedClasses.length
    const nextClass = unlockedClasses[nextIndex]

    setSelectedSkinClass(nextClass.name)

    const newLevel = nextClass.level
    if (characterImages[nextClass.name][newLevel]) {
      setCharacterImage(characterImages[nextClass.name][newLevel])
    } else {
      setCharacterImage(characterImages[nextClass.name][1]) // Default if level-based skin is missing
    }
  }

  return (
    <div className="flex h-screen relative">
      {/* Character Section */}
      <CharacterDisplay characterImage={characterImage} switchSkin={switchSkin} />

      {/* Right Section: Habit Tracking Dashboard */}
      <div className="w-2/3 flex items-center justify-center min-h-screen bg-black text-white p-8">
        <div className="w-full max-w-3xl">
          {classes.map((cls: Class) => (
            <div key={cls.name} className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold mb-4">{cls.name} - Level {cls.level}</h2>
              <div className="flex items-center mb-4">
                <Progress value={(cls.experience / EXPERIENCE_PER_LEVEL) * 100} className="flex-grow" />
                <span className="ml-4">{(cls.experience / EXPERIENCE_PER_LEVEL) * 100}%</span>
              </div>
              {cls.experience >= EXPERIENCE_PER_LEVEL && cls.level < LEVEL_CAP && (
                <Button className="bg-green-500 mb-4" onClick={() => levelUpClass(cls.name)}>
                  Level Up
                </Button>
              )}
              {cls.tasks.map((task: Task) => (
                <div key={task.id} className="flex items-center">
                  <Checkbox id={task.id} checked={task.completed} onCheckedChange={() => toggleTask(cls.name, task.id)}
                    className="mr-4 border-white" />
                  <label htmlFor={task.id} className="ml-2">{task.name}</label>
                </div>
              ))}
            </div>
          ))}
          

        </div>
         {/* AI Persona Component */}
      <AICharacter 
  activeClass={selectedSkinClass} 
  level={classes.find(cls => cls.name === selectedSkinClass)?.level || 1} 
  experience={classes.find(cls => cls.name === selectedSkinClass)?.experience || 0} 
/>
      </div>

     

    </div>
  )
}
