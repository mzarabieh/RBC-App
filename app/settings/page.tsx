"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const [isResetting, setIsResetting] = useState<Record<string, boolean>>({})
  const [resetSuccess, setResetSuccess] = useState<Record<string, boolean>>({})
  const { theme, setTheme } = useTheme()

  const resetTable = async (tableName: string) => {
    setIsResetting((prev) => ({ ...prev, [tableName]: true }))
    setResetSuccess((prev) => ({ ...prev, [tableName]: false }))

    try {
      let query

      if (tableName === "module_progress") {
        // For module_progress, we want to reset progress to 0, not delete records
        query = supabase.from("module_progress").update({ progress: 0, completed_sections: [], completed_at: null })
      } else if (tableName === "levels") {
        // For levels, we want to reset completion status but keep the first level unlocked
        query = supabase.from("levels").update({
          is_completed: false,
          is_locked: supabase.raw("CASE WHEN id = 1 THEN false ELSE true END"),
        })
      } else if (tableName === "modules") {
        // For modules, we want to reset lock status but keep the first module unlocked
        query = supabase.from("modules").update({
          is_locked: supabase.raw("CASE WHEN order_index = 1 THEN false ELSE true END"),
        })
      } else if (tableName === "goals") {
        // For goals, reset current value to 0
        query = supabase.from("goals").update({ current: 0 })
      } else if (tableName === "banking_accounts") {
        // Reset banking accounts to initial values
        query = supabase.from("banking_accounts").update({
          balance: supabase.raw(
            "CASE WHEN account_type = 'checking' THEN 1000 WHEN account_type = 'savings' THEN 5000 ELSE 0 END",
          ),
        })
      } else if (tableName === "all") {
        // Reset all progress tables
        await Promise.all([
          supabase.from("module_progress").update({ progress: 0, completed_sections: [], completed_at: null }),
          supabase.from("levels").update({
            is_completed: false,
            is_locked: supabase.raw("CASE WHEN id = 1 THEN false ELSE true END"),
          }),
          supabase.from("modules").update({
            is_locked: supabase.raw("CASE WHEN order_index = 1 THEN false ELSE true END"),
          }),
          supabase.from("goals").update({ current: 0 }),
          supabase.from("banking_accounts").update({
            balance: supabase.raw(
              "CASE WHEN account_type = 'checking' THEN 1000 WHEN account_type = 'savings' THEN 5000 ELSE 0 END",
            ),
          }),
          supabase.from("banking_transactions").delete().neq("id", 0),
          supabase.from("section_progress").delete().neq("id", 0),
        ])

        setResetSuccess((prev) => ({ ...prev, [tableName]: true }))
        toast.success("All progress has been reset successfully")
        setIsResetting((prev) => ({ ...prev, [tableName]: false }))
        return
      } else {
        // For other tables, delete all records
        query = supabase.from(tableName).delete().neq("id", 0) // Avoid empty where clause
      }

      const { error } = await query

      if (error) {
        console.error(`Error resetting ${tableName}:`, error)
        toast.error(`Failed to reset ${tableName}: ${error.message}`)
      } else {
        setResetSuccess((prev) => ({ ...prev, [tableName]: true }))
        toast.success(`${tableName} has been reset successfully`)
      }
    } catch (error) {
      console.error(`Error in resetTable for ${tableName}:`, error)
      toast.error(`An unexpected error occurred while resetting ${tableName}`)
    } finally {
      setIsResetting((prev) => ({ ...prev, [tableName]: false }))
    }
  }

  const unlockAllLevels = async () => {
    setIsResetting((prev) => ({ ...prev, unlock_levels: true }))

    try {
      const { error } = await supabase.from("levels").update({ is_locked: false })

      if (error) {
        console.error("Error unlocking levels:", error)
        toast.error(`Failed to unlock levels: ${error.message}`)
      } else {
        toast.success("All levels have been unlocked")
      }
    } catch (error) {
      console.error("Error in unlockAllLevels:", error)
      toast.error("An unexpected error occurred while unlocking levels")
    } finally {
      setIsResetting((prev) => ({ ...prev, unlock_levels: false }))
    }
  }

  const unlockAllModules = async () => {
    setIsResetting((prev) => ({ ...prev, unlock_modules: true }))

    try {
      const { error } = await supabase.from("modules").update({ is_locked: false })

      if (error) {
        console.error("Error unlocking modules:", error)
        toast.error(`Failed to unlock modules: ${error.message}`)
      } else {
        toast.success("All modules have been unlocked")
      }
    } catch (error) {
      console.error("Error in unlockAllModules:", error)
      toast.error("An unexpected error occurred while unlocking modules")
    } finally {
      setIsResetting((prev) => ({ ...prev, unlock_modules: false }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="appearance">
        <TabsList className="mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="progress">Progress Reset</TabsTrigger>
          <TabsTrigger value="unlock">Unlock Features</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Reset Progress</CardTitle>
              <CardDescription>Reset your progress in different parts of the application</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Resetting progress is irreversible. All your saved data for the selected feature will be lost.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Learning Modules</h3>
                    <p className="text-sm text-muted-foreground">Reset all learning module progress</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => resetTable("module_progress")}
                    disabled={isResetting["module_progress"]}
                  >
                    {isResetting["module_progress"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["module_progress"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Reset Progress"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Game Levels</h3>
                    <p className="text-sm text-muted-foreground">Reset all game level progress</p>
                  </div>
                  <Button variant="destructive" onClick={() => resetTable("levels")} disabled={isResetting["levels"]}>
                    {isResetting["levels"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["levels"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Reset Levels"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Savings Goals</h3>
                    <p className="text-sm text-muted-foreground">Reset all savings goals progress</p>
                  </div>
                  <Button variant="destructive" onClick={() => resetTable("goals")} disabled={isResetting["goals"]}>
                    {isResetting["goals"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["goals"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Reset Goals"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Banking Accounts</h3>
                    <p className="text-sm text-muted-foreground">Reset all banking account balances</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => resetTable("banking_accounts")}
                    disabled={isResetting["banking_accounts"]}
                  >
                    {isResetting["banking_accounts"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["banking_accounts"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Reset Accounts"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Banking Transactions</h3>
                    <p className="text-sm text-muted-foreground">Delete all banking transaction history</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => resetTable("banking_transactions")}
                    disabled={isResetting["banking_transactions"]}
                  >
                    {isResetting["banking_transactions"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["banking_transactions"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Delete History"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Forum Posts</h3>
                    <p className="text-sm text-muted-foreground">Delete all forum posts and comments</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => resetTable("forum_posts")}
                    disabled={isResetting["forum_posts"]}
                  >
                    {isResetting["forum_posts"] ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : resetSuccess["forum_posts"] ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Reset Complete
                      </>
                    ) : (
                      "Delete Posts"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => resetTable("all")}
                disabled={isResetting["all"]}
              >
                {isResetting["all"] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting All Progress...
                  </>
                ) : resetSuccess["all"] ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    All Progress Reset Complete
                  </>
                ) : (
                  "Reset All Progress"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="unlock">
          <Card>
            <CardHeader>
              <CardTitle>Unlock Features</CardTitle>
              <CardDescription>Unlock all features for testing purposes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Learning Modules</h3>
                  <p className="text-sm text-muted-foreground">Unlock all learning modules</p>
                </div>
                <Button onClick={unlockAllModules} disabled={isResetting["unlock_modules"]}>
                  {isResetting["unlock_modules"] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    "Unlock All Modules"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Game Levels</h3>
                  <p className="text-sm text-muted-foreground">Unlock all game levels</p>
                </div>
                <Button onClick={unlockAllLevels} disabled={isResetting["unlock_levels"]}>
                  {isResetting["unlock_levels"] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    "Unlock All Levels"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

