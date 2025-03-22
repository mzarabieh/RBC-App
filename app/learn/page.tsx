"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, LockIcon, BookOpen } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Module {
  id: string
  title: string
  description: string
  progress: number
  isLocked: boolean
  path: string
}

export default function LearnPage() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "income",
      title: "Understanding Income",
      description: "Learn about different types of income, pay stubs, and Canada's tax system",
      progress: 0,
      isLocked: false,
      path: "/learn/modules/income",
    },
    {
      id: "banking",
      title: "Banking Basics",
      description: "Understand different account types and banking services",
      progress: 0,
      isLocked: true,
      path: "/learn/modules/banking",
    },
    {
      id: "credit",
      title: "Credit and Loans",
      description: "Learn about credit scores, credit cards, and different types of loans",
      progress: 0,
      isLocked: true,
      path: "/learn/modules/credit",
    },
    {
      id: "budgeting",
      title: "Budgeting and Saving",
      description: "Create a budget and develop saving strategies",
      progress: 0,
      isLocked: true,
      path: "/learn/modules/budgeting",
    },
    {
      id: "investing",
      title: "Introduction to Investing",
      description: "Learn about investment options and strategies",
      progress: 0,
      isLocked: true,
      path: "/learn/modules/investing",
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModuleProgress() {
      try {
        // First check if the table exists
        const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

        if (checkError) {
          console.warn("Error checking module_progress table:", checkError)

          // Check if any levels are completed as a fallback
          try {
            const { data: levelData } = await supabase.from("levels").select("*").eq("id", 999).single()

            if (levelData && levelData.is_completed) {
              // If the special level for the income module is completed, update the modules state
              const updatedModules = [...modules]
              const incomeModuleIndex = updatedModules.findIndex((m) => m.id === "income")

              if (incomeModuleIndex !== -1) {
                updatedModules[incomeModuleIndex].progress = 100

                // Unlock the next module
                if (incomeModuleIndex < updatedModules.length - 1) {
                  updatedModules[incomeModuleIndex + 1].isLocked = false
                }

                setModules(updatedModules)
              }
            }
          } catch (levelError) {
            console.warn("Error checking fallback level:", levelError)
          }

          setLoading(false)
          return
        }

        const { data, error } = await supabase.from("module_progress").select("module_id, progress")

        if (error) throw error

        if (data) {
          const updatedModules = [...modules]

          data.forEach((item) => {
            const moduleIndex = updatedModules.findIndex((m) => m.id === item.module_id)
            if (moduleIndex !== -1) {
              updatedModules[moduleIndex].progress = item.progress

              // Unlock the next module if this one is completed
              if (item.progress === 100 && moduleIndex < updatedModules.length - 1) {
                updatedModules[moduleIndex + 1].isLocked = false
              }
            }
          })

          setModules(updatedModules)
        }
      } catch (error) {
        console.error("Error fetching module progress:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModuleProgress()
  }, [])

  const overallProgress = modules.reduce((sum, module) => sum + module.progress, 0) / modules.length

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Financial Literacy Course</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Track your journey through financial literacy</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">{Math.round(overallProgress)}% Complete</p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {modules.map((module) => (
            <Card key={module.id} className={module.isLocked ? "opacity-70" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {module.progress === 100 && <CheckCircle className="h-5 w-5 text-green-500 mr-2" />}
                      {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                  {module.isLocked ? (
                    <Badge variant="outline" className="flex items-center">
                      <LockIcon className="h-3 w-3 mr-1" /> Locked
                    </Badge>
                  ) : module.progress === 100 ? (
                    <Badge variant="success">Completed</Badge>
                  ) : module.progress > 0 ? (
                    <Badge variant="secondary">In Progress</Badge>
                  ) : (
                    <Badge variant="outline">Not Started</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={module.progress} className="h-2" />
              </CardContent>
              <CardFooter>
                <Button asChild disabled={module.isLocked}>
                  <Link href={module.path}>
                    {module.progress > 0 ? "Continue Learning" : "Start Learning"} <BookOpen className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

