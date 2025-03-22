"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wallet } from "lucide-react"

export function SavingsOverview() {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="text-3xl mr-2">💰</span>
          Savings Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Track and manage your financial goals</p>
        <Button variant="link" asChild className="mt-4">
          <Link href="/savings">View Your Goals</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

