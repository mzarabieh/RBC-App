"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SetupDatabase() {
  const [isCreating, setIsCreating] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const setupDatabase = async () => {
    setIsCreating(true)
    setStatus("idle")

    try {
      // Create the stored procedure first
      const createProcedure = `
        CREATE OR REPLACE FUNCTION create_module_progress_table()
        RETURNS void AS $$
        BEGIN
          CREATE TABLE IF NOT EXISTS module_progress (
            module_id TEXT PRIMARY KEY,
            progress INTEGER DEFAULT 0,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            completed_at TIMESTAMP WITH TIME ZONE
          );
        END;
        $$ LANGUAGE plpgsql;
      `

      // Execute the SQL to create the procedure
      const { error: procedureError } = await supabase.rpc("exec_sql", { sql: createProcedure })

      if (procedureError) {
        console.error("Error creating procedure:", procedureError)

        // Try direct table creation as fallback
        const createTable = `
          CREATE TABLE IF NOT EXISTS module_progress (
            module_id TEXT PRIMARY KEY,
            progress INTEGER DEFAULT 0,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            completed_at TIMESTAMP WITH TIME ZONE
          );
        `

        const { error: tableError } = await supabase.rpc("exec_sql", { sql: createTable })

        if (tableError) {
          console.error("Error creating table directly:", tableError)
          toast.error("Failed to set up database. Please contact support.")
          setStatus("error")
          return
        }
      }

      // Now call the procedure to create the table
      const { error } = await supabase.rpc("create_module_progress_table")

      if (error) {
        console.error("Error calling procedure:", error)
        toast.error("Database setup encountered an issue")
        setStatus("error")
      } else {
        toast.success("Database setup completed successfully!")
        setStatus("success")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An unexpected error occurred")
      setStatus("error")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          If you're seeing errors with module progress, you may need to set up the required database tables.
        </p>
        <Button
          onClick={setupDatabase}
          disabled={isCreating}
          variant={status === "success" ? "success" : status === "error" ? "destructive" : "default"}
        >
          {isCreating ? "Setting Up..." : status === "success" ? "Setup Complete" : "Setup Database"}
        </Button>
      </CardContent>
    </Card>
  )
}

