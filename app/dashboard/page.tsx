"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ProfileModal } from "../components/ProfileModal"

interface Task {
  id: string
  name: string
  completed: boolean
  className: string
}

interface Class {
  name: string
  tasks: Task[]
  level: number
  experience: number
}

const initialClasses: Class[] = [
  {
    name: "Gym Bro",
    tasks: [
      { id: "gb1", name: "Complete a workout session", completed: false, className: "Gym Bro" },
      { id: "gb2", name: "Track protein intake", completed: false, className: "Gym Bro" },
      { id: "gb3", name: "Try a new exercise", completed: false, className: "Gym Bro" },
      { id: "gb4", name: "Meal prep for the week", completed: false, className: "Gym Bro" },
      { id: "gb5", name: "Rest and recover properly", completed: false, className: "Gym Bro" },
    ],
    level: 1,
    experience: 0,
  },
  {
    name: "Detox Alchemist",
    tasks: [
      { id: "da1", name: "Drink 8 glasses of water", completed: false, className: "Detox Alchemist" },
      { id: "da2", name: "Eat a serving of leafy greens", completed: false, className: "Detox Alchemist" },
      { id: "da3", name: "Practice meditation", completed: false, className: "Detox Alchemist" },
      { id: "da4", name: "Try a new healthy recipe", completed: false, className: "Detox Alchemist" },
      { id: "da5", name: "Get 8 hours of sleep", completed: false, className: "Detox Alchemist" },
    ],
    level: 1,
    experience: 0,
  },
  {
    name: "Academic Weapon",
    tasks: [
      { id: "aw1", name: "Study for 2 hours", completed: false, className: "Academic Weapon" },
      { id: "aw2", name: "Complete all assignments", completed: false, className: "Academic Weapon" },
      { id: "aw3", name: "Review notes from previous class", completed: false, className: "Academic Weapon" },
      { id: "aw4", name: "Participate in class discussion", completed: false, className: "Academic Weapon" },
      { id: "aw5", name: "Read an educational article", completed: false, className: "Academic Weapon" },
    ],
    level: 1,
    experience: 0,
  },
]

const EXPERIENCE_PER_LEVEL = 100
const EXPERIENCE_PER_TASK = 20

export default function DashboardPage() {
  const [classes, setClasses] = useState<Class[]>(initialClasses)
  const router = useRouter()

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
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.name === className) {
          const updatedTasks = cls.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          )
          const completedTasks = updatedTasks.filter((task) => task.completed).length
          const newExperience = completedTasks * EXPERIENCE_PER_TASK
          const newLevel = Math.floor(newExperience / EXPERIENCE_PER_LEVEL) + 1
          return {
            ...cls,
            tasks: updatedTasks,
            level: newLevel,
            experience: newExperience % EXPERIENCE_PER_LEVEL,
          }
        }
        return cls
      }),
    )
  }

  const completedTasks = classes.flatMap((cls) => cls.tasks.filter((task) => task.completed))

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">8 Bit Habit Dashboard</h1>
          <ProfileModal completedTasks={completedTasks} />
        </div>

        <div className="space-y-8">
          {classes.map((cls) => (
            <div key={cls.name} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{cls.name}</h2>
              <div className="flex items-center mb-4">
                <div className="text-lg mr-4">Level {cls.level}</div>
                <Progress value={(cls.experience / EXPERIENCE_PER_LEVEL) * 100} className="flex-grow" />
                <div className="text-sm ml-4">
                  {cls.experience}/{EXPERIENCE_PER_LEVEL} XP
                </div>
              </div>
              <div className="space-y-2">
                {cls.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(cls.name, task.id)}
                    />
                    <label
                      htmlFor={task.id}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => router.push("/")} className="mt-8" variant="outline">
          Back to Game
        </Button>
      </div>
    </div>
  )
}

