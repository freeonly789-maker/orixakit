import { OrixCard } from "@/components/ui/orix-card"

interface StatsCardProps {
  title: string
  value: string
  description: string
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <OrixCard title={title} description={description} hover>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </OrixCard>
  )
}
