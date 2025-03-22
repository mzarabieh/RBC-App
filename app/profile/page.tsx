"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, User } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface UserProfile {
  id: number
  username: string
  email: string
  display_name: string | null
  avatar_url: string | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    display_name: "",
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        // Check if the table exists
        const { error: checkError } = await supabase.from("user_profile").select("count").limit(1)

        if (checkError) {
          console.warn("user_profile table doesn't exist:", checkError)
          // Create a default profile in state
          const defaultProfile = {
            id: 1,
            username: "user",
            email: "user@example.com",
            display_name: "Demo User",
            avatar_url: null,
          }

          setProfile(defaultProfile)
          setFormData({
            username: defaultProfile.username,
            email: defaultProfile.email,
            display_name: defaultProfile.display_name || "",
          })
          setLoading(false)
          return
        }

        // Fetch the profile
        const { data, error } = await supabase.from("user_profile").select("*").limit(1).single()

        if (error) {
          console.error("Error fetching profile:", error)
          throw error
        }

        setProfile(data)
        setFormData({
          username: data.username,
          email: data.email,
          display_name: data.display_name || "",
        })
      } catch (error) {
        console.error("Error in fetchProfile:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Check if the table exists
      const { error: checkError } = await supabase.from("user_profile").select("count").limit(1)

      if (checkError) {
        console.warn("user_profile table doesn't exist, creating it")

        // Create the table with a simple RPC call
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS user_profile (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            display_name TEXT,
            avatar_url TEXT,
            preferences JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `

        // Try to execute the SQL
        try {
          await supabase.rpc("exec_sql", { sql: createTableSQL })
        } catch (sqlError) {
          console.error("Failed to create table:", sqlError)
          // Continue anyway, we'll try to insert/update
        }
      }

      if (profile?.id) {
        // Update existing profile
        const { error } = await supabase
          .from("user_profile")
          .update({
            username: formData.username,
            email: formData.email,
            display_name: formData.display_name || null,
          })
          .eq("id", profile.id)

        if (error) throw error
      } else {
        // Insert new profile
        const { error } = await supabase.from("user_profile").insert([
          {
            username: formData.username,
            email: formData.email,
            display_name: formData.display_name || null,
          },
        ])

        if (error) throw error
      }

      toast.success("Profile updated successfully")

      // Refresh the profile data
      const { data, error } = await supabase.from("user_profile").select("*").limit(1).single()

      if (!error && data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-2xl">
                {getInitials(profile?.display_name || profile?.username || "User Name")}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">
              <User className="mr-2 h-4 w-4" />
              Change Picture
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input
                  id="display_name"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  placeholder="How you want to be addressed"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

