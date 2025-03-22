"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface UserProfile {
  username: string
  email: string
  display_name: string | null
  avatar_url: string | null
}

export function UserButton() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Check if the table exists
        const { error: checkError } = await supabase.from("user_profile").select("count").limit(1)

        if (checkError) {
          // Default profile if table doesn't exist
          setProfile({
            username: "user",
            email: "user@example.com",
            display_name: "Demo User",
            avatar_url: null,
          })
          return
        }

        // Fetch the profile
        const { data, error } = await supabase
          .from("user_profile")
          .select("username, email, display_name, avatar_url")
          .limit(1)
          .single()

        if (error) {
          console.warn("Error fetching profile:", error)
          // Default profile if no data
          setProfile({
            username: "user",
            email: "user@example.com",
            display_name: "Demo User",
            avatar_url: null,
          })
          return
        }

        setProfile(data)
      } catch (error) {
        console.error("Error in fetchProfile:", error)
      }
    }

    fetchProfile()
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ""} alt={profile?.display_name || profile?.username} />
            <AvatarFallback>{profile ? getInitials(profile.display_name || profile.username) : "UN"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.display_name || profile?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{profile?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

