import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SavingsOverview } from "./components/SavingsOverview"
import { TestConnection } from "./components/TestConnection"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-york-red">Welcome to YorkU RBC Financial Literacy Hub</h1>
        <p className="text-xl mb-8">Your guide to financial success in Canada</p>
        <Button asChild size="lg">
          <Link href="/learn">Start Your Journey</Link>
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Interactive Learning"
          description="Engage with our Duolingo-style financial literacy modules"
          link="/learn"
          icon="📚"
        />
        <FeatureCard
          title="Banking Simulator"
          description="Practice managing accounts in a risk-free environment"
          link="/banking"
          icon="🏦"
        />
        <FeatureCard
          title="Community Forum"
          description="Connect with fellow newcomers and share experiences"
          link="/forum"
          icon="💬"
        />
        <FeatureCard
          title="Financial Tools"
          description="Budgeting, goal-setting, and more to manage your finances"
          link="/tools"
          icon="🧮"
        />
        <FeatureCard
          title="Campus Adventure"
          description="Learn finance while exploring York University virtually"
          link="/game"
          icon="🎮"
        />
        <Card className="bg-rbc-blue text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Why Financial Literacy Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Understanding finance is key to thriving in Canada. Our partnership with RBC ensures you get the best
              guidance.
            </p>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Savings Journey</h2>
        <SavingsOverview />
      </section>

      {/* Database connection status moved to bottom of page */}
      <section className="mt-8 mb-8">
        <TestConnection />
      </section>
    </div>
  )
}

const FeatureCard = ({
  title,
  description,
  link,
  icon,
}: { title: string; description: string; link: string; icon: string }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle className="flex items-center">
        <span className="text-3xl mr-2">{icon}</span>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
      <Button variant="link" asChild className="mt-4">
        <Link href={link}>Explore</Link>
      </Button>
    </CardContent>
  </Card>
)

