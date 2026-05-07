import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { DailyHoursBarChart } from "@/components/charts/DailyHoursBarChart";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { PageHeader } from "@/components/common/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DayDetailsModal } from "@/components/modals/DayDetailsModal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { useWorkLogsContext } from "@/hooks/use-work-logs-context";
import type { DashboardPoint, WorkLog } from "@/types/work-log";

export function DashboardPage() {
  const { workLogs, isLoading, error, fetchWorkLogs } = useWorkLogsContext();
  const { chartData, weeklyHours, totalCompletedTasks, averageDailyProductivity, completionPercentage } =
    useDashboardStats(workLogs);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const selectedDay = useMemo<WorkLog | null>(
    () => workLogs.find((log) => log.id === selectedDayId) || null,
    [workLogs, selectedDayId]
  );

  const handleSelectDay = (point: DashboardPoint) => {
    setSelectedDayId(point.workLogId);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Productivity Dashboard • Prasanna"
        description="Track daily office effort, collaboration hours, and delivery momentum."
        action={
          <Link to={ROUTES.dailyLog}>
            <Button>Add Daily Log</Button>
          </Link>
        }
      />

      {isLoading ? (
        <LoadingState />
      ) : workLogs.length === 0 ? (
        <EmptyState
          title="No Work Logs Yet"
          description="Start by adding your first daily work log to unlock analytics and trends."
        />
      ) : (
        <>
          <StatsCards
            weeklyHours={weeklyHours}
            totalCompletedTasks={totalCompletedTasks}
            averageDailyProductivity={averageDailyProductivity}
            completionPercentage={completionPercentage}
          />
          <DailyHoursBarChart data={chartData} onSelectDay={handleSelectDay} />
        </>
      )}

      {error ? (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
          <Button variant="outline" className="ml-3" onClick={() => void fetchWorkLogs()}>
            Retry
          </Button>
        </div>
      ) : null}

      <DayDetailsModal open={isModalOpen} onOpenChange={setIsModalOpen} selectedDay={selectedDay} isLoading={isLoading} />
    </>
  );
}
