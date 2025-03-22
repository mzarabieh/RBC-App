"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModuleInterface } from "../../components/module-interface"
import {
  BankAccountsSection,
  InterestCalculatorSection,
  BankingOptionsSection,
  OpeningAccountSection,
  BankingPracticesSummarySection,
} from "../banking-practices"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export default function BankingModule() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    async function fetchProgress() {
      try {
        // First check if the table exists
        const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

        if (checkError) {
          console.warn("module_progress table doesn't exist:", checkError.message)
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("module_progress")
          .select("progress")
          .eq("module_id", "banking")
          .single()

        if (error && error.code !== "PGRST116") {
          throw error
        }

        if (data) {
          setProgress(data.progress)
        }
      } catch (error) {
        console.error("Error fetching module progress:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [])

  async function handleComplete() {
    try {
      // Check if the module_progress table exists
      const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

      if (checkError) {
        console.warn("module_progress table doesn't exist, using levels table as fallback")

        // Use the levels table as a fallback
        const { error: fallbackError } = await supabase.from("levels").upsert({
          id: 1, // Using the ID for the banking level
          title: "Banking Basics",
          description: "Learn the fundamentals of banking in Canada",
          is_locked: false,
          is_completed: true,
          questions: [],
        })

        if (fallbackError) {
          console.error("Fallback error:", fallbackError)
          throw fallbackError
        }

        toast.success("Module completed! 🎉")
        router.push("/learn")
        return
      }

      // If the table exists, proceed with the original logic
      const { error } = await supabase.from("module_progress").upsert({
        module_id: "banking",
        progress: 100,
        completed_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Upsert error details:", error)
        throw error
      }

      // Also unlock the next module (credit)
      await supabase
        .from("modules")
        .update({
          is_locked: false,
        })
        .eq("id", "credit")

      toast.success("Module completed! 🎉")
      router.push("/learn")
    } catch (error) {
      console.error("Error updating module progress:", error)
      toast.error("Failed to save progress, but you can continue learning!")
      // Even if saving fails, let the user continue
      router.push("/learn")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  const sections = [
    {
      id: "bank-accounts",
      title: "Types of Bank Accounts",
      content: <BankAccountsSection />,
      quiz: {
        question: "What is the main purpose of a chequing account?",
        options: ["Earning high interest", "Daily transactions", "Long-term savings", "Investment growth"],
        correctAnswer: 1,
        explanation:
          "A chequing account is primarily designed for everyday transactions like purchases and bill payments, not for earning interest or long-term savings.",
      },
    },
    {
      id: "interest-calculator",
      title: "Interest Rates and Calculations",
      content: <InterestCalculatorSection />,
      quiz: {
        question: "What is the main difference between simple and compound interest?",
        options: [
          "Simple interest is always higher than compound interest",
          "Compound interest is calculated only on the principal amount",
          "Simple interest is calculated only on the principal amount",
          "There is no difference between the two",
        ],
        correctAnswer: 2,
        explanation:
          "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and the accumulated interest, making it more beneficial for savers over time.",
      },
    },
    {
      id: "banking-options",
      title: "Banking Options in Canada",
      content: <BankingOptionsSection />,
      quiz: {
        question: "What is a key advantage of credit unions compared to big banks?",
        options: [
          "They have more international branches",
          "They are not-for-profit and often offer better perks to members",
          "They have more ATMs available",
          "They offer more products for international students",
        ],
        correctAnswer: 1,
        explanation:
          "Credit unions are not-for-profit organizations, meaning members typically get better perks than at big banks, such as lower fees and better interest rates.",
      },
    },
    {
      id: "opening-account",
      title: "Opening a Bank Account",
      content: <OpeningAccountSection />,
      quiz: {
        question: "Which of the following is NOT typically required when opening a bank account in Canada?",
        options: ["Government ID (passport)", "Proof of address", "Social Insurance Number (SIN)", "Credit history"],
        correctAnswer: 3,
        explanation:
          "While government ID, proof of address, and SIN are typically required to open a bank account in Canada, you do not need to have an established credit history.",
      },
    },
    {
      id: "summary",
      title: "Summary",
      content: <BankingPracticesSummarySection />,
      quiz: {
        question: "Which account is best for saving money for a future large purchase?",
        options: ["Chequing account", "Savings account", "Credit card", "Prepaid card"],
        correctAnswer: 1,
        explanation:
          "A savings account is designed for setting aside money for future needs and typically offers interest on your deposits, making it ideal for saving for large purchases.",
      },
    },
  ]

  return (
    <ModuleInterface
      moduleId="banking"
      title="Module 2: Canadian Banking Practices"
      sections={sections}
      onComplete={handleComplete}
    />
  )
}

