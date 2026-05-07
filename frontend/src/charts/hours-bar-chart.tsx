import type { DashboardPoint } from "@/types/work-log";

import { DailyHoursBarChart } from "@/components/charts/DailyHoursBarChart";

interface HoursBarChartProps {
  data: DashboardPoint[];
  onBarClick: (point: DashboardPoint) => void;
}

// Backward-compatible wrapper.
export function HoursBarChart({ data, onBarClick }: HoursBarChartProps) {
  return <DailyHoursBarChart data={data} onSelectDay={onBarClick} />;
}
