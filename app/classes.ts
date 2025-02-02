export interface Task {
    id: string
    name: string
    completed: boolean
    className: string
  }
  
  export interface Class {
    name: string
    tasks: Task[]
    level: number
    experience: number
  }
  
  export const EXPERIENCE_PER_LEVEL = 100
  export const EXPERIENCE_PER_TASK = 20
  export const LEVEL_CAP = 4
  
  export const initialClasses: Class[] = [
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
  
  export const characterImages: Record<string, Record<number, string>> = {
    "Gym Bro": {
      1: "/Defguy.png",
      2: "/GB1.png",
      3: "/GB2.png",
      4: "/GB3.png",
    },
    "Detox Alchemist": {
      1: "/Defguy.png",
      2: "/DA1.png",
      3: "/DA2.png",
      4: "/DA3.png",
    },
    "Academic Weapon": {
      1: "/Defguy.png",
      2: "/AW1.png",
      3: "/AW2.png",
      4: "/AW3.png",
    },
  }
  