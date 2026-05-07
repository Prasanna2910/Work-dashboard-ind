import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PersonHours } from "@/types/work-log";

interface WorkDistributionPieChartProps {
  data: PersonHours[];
}

const PIE_COLORS = ["#56d9c6", "#79a8ff", "#ff9b6a", "#7ce38b", "#ffcd4e", "#ec7b95"];

export function WorkDistributionPieChart({ data }: WorkDistributionPieChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Work Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="48%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                isAnimationActive
                animationDuration={650}
              >
                {data.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} hours`, "Time Spent"]}
                contentStyle={{
                  background: "rgba(15,23,42,0.96)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ color: "#6b7280", fontSize: "12px" }}
                formatter={(value) => <span className="text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
