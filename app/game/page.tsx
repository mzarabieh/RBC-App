"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"
import { Lock, Unlock, Trophy } from "lucide-react"
import { getLevels, updateLevelProgress } from "@/lib/supabase"
import { toast } from "sonner"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabase } from "@/lib/supabase"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Level {
  id: number
  title: string
  description: string
  is_locked: boolean
  is_completed: boolean
  questions: Question[]
  module_id?: string
}

export default function GamePage() {
  const [levels, setLevels] = useState<Level[]>([])
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabaseClient = createClientComponentClient()

  useEffect(() => {
    fetchLevels()
  }, [])

  async function fetchLevels() {
    try {
      const data = await getLevels()
      setLevels(data)
    } catch (error) {
      toast.error("Failed to fetch levels")
      console.error("Error fetching levels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLevelClick = (level: Level) => {
    if (!level.is_locked) {
      setCurrentLevel(level)
      setShowQuiz(true)
    }
  }

  const handleLevelComplete = async (levelId: number) => {
    try {
      await updateLevelProgress(levelId, true)

      // Unlock the next level
      const completedLevelIndex = levels.findIndex((level) => level.id === levelId)
      if (completedLevelIndex !== -1 && completedLevelIndex < levels.length - 1) {
        const nextLevel = levels[completedLevelIndex + 1]

        // Update the next level to be unlocked
        await supabase.from("levels").update({ is_locked: false }).eq("id", nextLevel.id)
      }

      await fetchLevels()
      setShowQuiz(false)
      toast.success("Level completed!")

      // If the level has a module_id, also update the module progress
      const completedLevel = levels.find((level) => level.id === levelId)
      if (completedLevel?.module_id) {
        try {
          // Check if module_progress table exists
          const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

          if (!checkError) {
            // Update module progress to 100% if it exists
            await supabase.from("module_progress").upsert({
              module_id: completedLevel.module_id,
              progress: 100,
              completed_at: new Date().toISOString(),
            })
          }
        } catch (moduleError) {
          console.error("Error updating module progress:", moduleError)
        }
      }
    } catch (error) {
      toast.error("Failed to update level progress")
      console.error("Error updating level progress:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-900 to-blue-700">
      {!showQuiz ? (
        <div className="max-w-4xl mx-auto">
          <div className="text-white text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Financial Learning Journey</h1>
            <p>Complete levels to unlock new financial knowledge</p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-white/20 -translate-x-1/2 z-0" />

            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative z-10 mb-8 ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                style={{ width: "calc(50% - 20px)" }}
              >
                <Card
                  className={`cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                    level.is_locked ? "opacity-75" : ""
                  }`}
                  onClick={() => handleLevelClick(level)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{level.title}</h3>
                      {level.is_locked ? (
                        <Lock className="text-gray-400" />
                      ) : level.is_completed ? (
                        <Trophy className="text-yellow-500" />
                      ) : (
                        <Unlock className="text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{level.description}</p>
                    {level.is_completed && (
                      <Badge variant="success" className="mt-4">
                        Completed
                      </Badge>
                    )}
                    {level.module_id && (
                      <Badge variant="outline" className="mt-4 ml-2">
                        Module: {level.module_id}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <QuizInterface
          level={currentLevel!}
          onComplete={() => handleLevelComplete(currentLevel!.id)}
          onBack={() => setShowQuiz(false)}
        />
      )}
    </div>
  )
}

function QuizInterface({ level, onComplete, onBack }: { level: Level; onComplete: () => void; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (selectedAnswer: number) => {
    const correct = selectedAnswer === level.questions[currentQuestion].correctAnswer

    if (correct) {
      setScore(score + 1)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    if (currentQuestion + 1 < level.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete()
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ← Back to Journey
        </Button>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{level.title}</h2>
          <div className="space-y-4">
            <h3 className="text-xl">
              Question {currentQuestion + 1} of {level.questions.length}
            </h3>
            <p className="text-lg">{level.questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {level.questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto py-4"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

