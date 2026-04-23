import { StatsCard } from "./components/stats-card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your performance overview.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
          />
          <StatsCard
            title="Active Users"
            value="2,543"
            description="+12% from last month"
          />
          <StatsCard
            title="Conversions"
            value="1,234"
            description="+5.2% from last month"
          />
          <StatsCard
            title="Bounce Rate"
            value="42.3%"
            description="-2.1% from last month"
          />
        </div>
      </div>
    </div>
  )
}
