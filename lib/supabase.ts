import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://umhgtrfqluhdzfcmyjzo.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtaGd0cmZxbHVoZHpmY215anpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MDI5ODcsImV4cCI6MjA1NTQ3ODk4N30.f9cLYalYG2q2Isx9xCq7oHrHAINJOtW2yMIHHOGwRAM"

// Log for debugging
console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Anon Key available:", !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for data operations
export async function getGoals() {
  try {
    const { data, error } = await supabase.from("goals").select("*")

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("goals table doesn't exist")
        return []
      }
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getGoals:", error)
    return []
  }
}

export async function createGoal(goal: {
  title: string
  target: number
  current: number
  deadline: string
  type: string
}) {
  try {
    const { data, error } = await supabase.from("goals").insert([goal]).select()

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("goals table doesn't exist")
        return null
      }
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error("Error in createGoal:", error)
    return null
  }
}

export async function updateGoal(
  id: number,
  updates: Partial<{
    title: string
    target: number
    current: number
    deadline: string
    type: string
  }>,
) {
  try {
    const { data, error } = await supabase.from("goals").update(updates).eq("id", id).select()

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("goals table doesn't exist")
        return null
      }
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error("Error in updateGoal:", error)
    return null
  }
}

export async function deleteGoal(id: number) {
  try {
    const { error } = await supabase.from("goals").delete().eq("id", id)

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("goals table doesn't exist")
        return
      }
      throw error
    }
  } catch (error) {
    console.error("Error in deleteGoal:", error)
  }
}

// Game progress functions
export async function getLevels() {
  try {
    const { data, error } = await supabase.from("levels").select("*")

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("levels table doesn't exist")
        return []
      }
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getLevels:", error)
    return []
  }
}

export async function updateLevelProgress(levelId: number, completed: boolean) {
  try {
    const { data, error } = await supabase.from("levels").update({ is_completed: completed }).eq("id", levelId).select()

    if (error) {
      if (error.code === "42P01") {
        // Table doesn't exist
        console.warn("levels table doesn't exist")
        return null
      }
      throw error
    }

    return data?.[0] || null
  } catch (error) {
    console.error("Error in updateLevelProgress:", error)
    return null
  }
}

// Learning module progress functions
export async function getModuleProgress(moduleId: string) {
  try {
    const { data, error } = await supabase.from("module_progress").select("*").eq("module_id", moduleId).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No data found, which is fine
        return null
      }

      if (error.code === "42P01") {
        // Table doesn't exist, we'll handle this gracefully
        console.warn("module_progress table does not exist")
        return null
      }

      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getModuleProgress:", error)
    return null
  }
}

export async function updateModuleProgress(moduleId: string, progress: number) {
  try {
    // First check if the table exists
    const { error: checkError } = await supabase.from("module_progress").select("count").limit(1)

    if (checkError && checkError.code === "42P01") {
      // Table doesn't exist, we'll create it
      console.warn("module_progress table does not exist, using fallback")
      return null
    }

    const { data, error } = await supabase
      .from("module_progress")
      .upsert({
        module_id: moduleId,
        progress,
        updated_at: new Date().toISOString(),
        completed_at: progress === 100 ? new Date().toISOString() : null,
      })
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error in updateModuleProgress:", error)
    return null
  }
}

