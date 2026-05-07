import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardPoint } from "@/types/work-log";

interface DailyHoursBarChartProps {
  data: DashboardPoint[];
  onSelectDay: (point: DashboardPoint) => void;
}

const BAR_COLORS = ["#56d9c6", "#79a8ff", "#ff9b6a", "#7ce38b", "#ffcd4e", "#9c8cff", "#ec7b95"];

export function DailyHoursBarChart({ data, onSelectDay }: DailyHoursBarChartProps) {
  const handleBarClick = (barData: { payload?: unknown }) => {
    const selected = barData.payload as DashboardPoint | undefined;
    if (selected) {
      onSelectDay(selected);
    }
  };

  return (
    <Card className="mt-6 animate-fade-in-up">
      <CardHeader>
        <CardTitle>Daily Work Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 14, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip
                cursor={{ fill: "rgba(37,99,235,0.12)" }}
                formatter={(value) => [`${value} hours`, "Total"]}
                contentStyle={{
                  background: "#0F172A",
                  border: "1px solid #1E293B",
                  borderRadius: 16,
                  boxShadow: "0 10px 24px rgba(15,23,42,0.28)"
                }}
                labelStyle={{ color: "#E2E8F0", fontWeight: 500 }}
                itemStyle={{ color: "#FFFFFF", fontWeight: 600 }}
              />
              <Bar
                dataKey="totalHours"
                radius={[8, 8, 4, 4]}
                isAnimationActive
                animationDuration={500}
                onClick={handleBarClick}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.date}
                    fill={BAR_COLORS[index % BAR_COLORS.length]}
                    className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
