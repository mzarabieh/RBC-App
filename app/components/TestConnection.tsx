"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TestConnection() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to query the goals table first
        const { data: goalsData, error: goalsError } = await supabase.from("goals").select("count").single()

        if (!goalsError) {
          setStatus("connected")
          return
        }

        // If goals table doesn't exist, try levels table
        const { data: levelsData, error: levelsError } = await supabase.from("levels").select("count").single()

        if (!levelsError) {
          setStatus("connected")
          return
        }

        // If both fail, check if we can at least connect to Supabase
        const { data: healthData, error: healthError } = await supabase.rpc("get_service_status")

        if (!healthError) {
          setStatus("connected")
          setErrorMessage("Connected to Supabase, but database tables are not set up yet.")
          return
        }

        throw new Error("Could not connect to Supabase")
      } catch (error) {
        console.error("Database connection error:", error)
        setStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Unknown error")
      }
    }

    testConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Connection Status</CardTitle>
      </CardHeader>
      <CardContent>
        {status === "loading" && <p>Testing connection to database...</p>}
        {status === "connected" && (
          <div>
            <p className="text-green-600">✅ Connected to Supabase!</p>
            {errorMessage && <p className="text-amber-600 mt-2">{errorMessage}</p>}
          </div>
        )}
        {status === "error" && (
          <div>
            <p className="text-red-600">❌ Connection failed</p>
            <p className="text-sm mt-2">{errorMessage || "Could not connect to the database."}</p>
            <p className="text-sm mt-2">
              Please make sure your Supabase credentials are correctly set up in your environment variables.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

