import { useMemo } from "react";

import type { DashboardPoint, WorkLog } from "@/types/work-log";
import { formatReadableDate, isDateInCurrentWeek } from "@/utils/date";

export function useDashboardStats(workLogs: WorkLog[]) {
  return useMemo(() => {
    const chartData: DashboardPoint[] = workLogs.map((log) => ({
      date: log.date,
      label: formatReadableDate(log.date),
      totalHours: log.totalOfficeHours,
      workLogId: log.id
    }));

    const weeklyHours = workLogs
      .filter((log) => isDateInCurrentWeek(log.date))
      .reduce((sum, log) => sum + log.totalOfficeHours, 0);

    const allEntries = workLogs.flatMap((log) => log.entries);
    const totalCompletedTasks = allEntries.filter((entry) => entry.completed).length;
    const completionPercentage = allEntries.length
      ? Math.round((totalCompletedTasks / allEntries.length) * 100)
      : 0;

    const averageDailyProductivity = workLogs.length
      ? Number((workLogs.reduce((sum, log) => sum + log.totalOfficeHours, 0) / workLogs.length).toFixed(1))
      : 0;

    return {
      chartData,
      weeklyHours,
      totalCompletedTasks,
      completionPercentage,
      averageDailyProductivity
    };
  }, [workLogs]);
}
