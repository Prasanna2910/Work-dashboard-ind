import { CheckCircle2, Gauge, Percent, Timer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  weeklyHours: number;
  totalCompletedTasks: number;
  averageDailyProductivity: number;
  completionPercentage: number;
}

const cards = [
  { key: "weekly", label: "Total Hours This Week", icon: Timer },
  { key: "completed", label: "Completed Tasks", icon: CheckCircle2 },
  { key: "average", label: "Average Daily Productivity", icon: Gauge },
  { key: "ratio", label: "Completion Percentage", icon: Percent }
] as const;

export function StatsCards({
  weeklyHours,
  totalCompletedTasks,
  averageDailyProductivity,
  completionPercentage
}: StatsCardsProps) {
  const values = {
    weekly: `${weeklyHours.toFixed(1)}h`,
    completed: `${totalCompletedTasks}`,
    average: `${averageDailyProductivity.toFixed(1)}h/day`,
    ratio: `${completionPercentage}%`
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key} className="animate-fade-in-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{card.label}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <p className="font-display text-2xl font-semibold">{values[card.key]}</p>
            <div className="rounded-full bg-muted/30 p-2 text-primary">
              <card.icon className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
