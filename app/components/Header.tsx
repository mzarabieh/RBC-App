import Link from "next/link"
import Image from "next/image"
import { UserButton } from "./UserButton"
import { ModeToggle } from "./ModeToggle"
import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/YorkULogo_Ver_rgb_square.jpg-ZvlzMucJQlqSWHvkONm0gb14k7RAvC.jpeg"
                alt="York University Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rbc%20logo-ligYgsycijbeKDLJmcCXjrVXwhjqtA.webp"
                alt="RBC Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <Link href="/" className="text-xl font-semibold text-york-red">
              Financial Literacy Hub
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/learn" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Learn
            </Link>
            <Link href="/banking" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Banking
            </Link>
            <Link href="/forum" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Forum
            </Link>
            <Link href="/tools" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Tools
            </Link>
            <Link href="/savings" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Savings
            </Link>
            <Link href="/game" className="text-gray-700 dark:text-gray-200 hover:text-york-red">
              Game
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

