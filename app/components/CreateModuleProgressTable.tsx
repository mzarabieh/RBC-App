"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export function CreateModuleProgressTable() {
  const [isCreating, setIsCreating] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const createTable = async () => {
    setIsCreating(true)
    setStatus("idle")

    try {
      // Check if table exists
      const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

      if (!checkError) {
        toast.info("module_progress table already exists!")
        setStatus("success")
        setIsCreating(false)
        return
      }

      // Create the table using SQL
      const { error } = await supabase.rpc("create_module_progress_table")

      if (error) {
        console.error("Error creating table:", error)
        toast.error("Failed to create module_progress table")
        setStatus("error")
      } else {
        toast.success("module_progress table created successfully!")
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
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="font-bold mb-2">Learning Module Setup</h3>
      <p className="mb-4 text-sm">
        If you're seeing errors with module progress, you may need to create the required database table.
      </p>
      <Button
        onClick={createTable}
        disabled={isCreating}
        variant={status === "success" ? "success" : status === "error" ? "destructive" : "default"}
      >
        {isCreating ? "Creating..." : status === "success" ? "Table Created" : "Create Module Progress Table"}
      </Button>
    </div>
  )
}

