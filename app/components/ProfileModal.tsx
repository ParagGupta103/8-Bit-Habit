import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
  id: string
  name: string
  completed: boolean
  className: string
}

interface ProfileModalProps {
  completedTasks: Task[]
}

export function ProfileModal({ completedTasks }: ProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        localStorage.setItem("profileImage", base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || ""} alt="Profile" />
              <AvatarFallback>UP</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-image-upload"
            />
            <label htmlFor="profile-image-upload" className="cursor-pointer">
              <Button variant="outline" size="sm" as="span">
                Upload Picture
              </Button>
            </label>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Completed Tasks</h3>
            <ul className="space-y-2">
              {completedTasks.map((task) => (
                <li key={task.id} className="text-sm">
                  {task.name} ({task.className})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

