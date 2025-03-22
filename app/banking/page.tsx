'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BankingPage() {
  const [balance, setBalance] = useState(1000)
  const [amount, setAmount] = useState('')

  const handleDeposit = () => {
    setBalance(balance + Number(amount))
    setAmount('')
  }

  const handleWithdraw = () => {
    if (Number(amount) <= balance) {
      setBalance(balance - Number(amount))
      setAmount('')
    } else {
      alert('Insufficient funds')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Banking Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button onClick={handleDeposit}>Deposit</Button>
              <Button onClick={handleWithdraw} variant="outline">Withdraw</Button>
            </div>
            <p>Transaction history will be displayed here...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

