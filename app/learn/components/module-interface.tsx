"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface ModuleSection {
  id: string
  title: string
  content: React.ReactNode
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
}

interface ModuleInterfaceProps {
  moduleId: string
  title: string
  sections: ModuleSection[]
  onComplete: () => void
}

export function ModuleInterface({ moduleId, title, sections, onComplete }: ModuleInterfaceProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentSection = sections[currentSectionIndex]
  const progress = (completedSections.length / sections.length) * 100

  const handleNext = () => {
    if (currentSection.quiz && quizAnswer === null) {
      toast.error("Please answer the question before continuing")
      return
    }

    if (!completedSections.includes(currentSection.id)) {
      setCompletedSections([...completedSections, currentSection.id])
    }

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
      setQuizAnswer(null)
      setShowExplanation(false)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
      setQuizAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswer(answerIndex)
    setShowExplanation(true)
  }

  const isAnswerCorrect = quizAnswer !== null && currentSection.quiz && quizAnswer === currentSection.quiz.correctAnswer

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm mt-1">
          <span>Progress: {Math.round(progress)}%</span>
          <span>
            Section {currentSectionIndex + 1} of {sections.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                {completedSections.includes(currentSection.id) && (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                )}
                {currentSection.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">{currentSection.content}</div>

              {currentSection.quiz && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Quick Check: {currentSection.quiz.question}</h3>
                  <div className="space-y-2">
                    {currentSection.quiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={quizAnswer === index ? (isAnswerCorrect ? "success" : "destructive") : "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => handleQuizAnswer(index)}
                        disabled={quizAnswer !== null}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {showExplanation && (
                    <div
                      className={`mt-4 p-3 rounded-md ${isAnswerCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      <p className="font-medium">{isAnswerCorrect ? "✓ Correct!" : "✗ Not quite right."}</p>
                      <p className="mt-1">{currentSection.quiz.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentSectionIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext}>
                {currentSectionIndex === sections.length - 1 ? "Complete" : "Next"}{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

