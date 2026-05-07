import { useMemo } from "react";

import { WorkDistributionPieChart } from "@/components/charts/WorkDistributionPieChart";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { WorkLog } from "@/types/work-log";
import { buildWorkDistributionByPerson } from "@/utils/work-log-analytics";

interface DayDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDay: WorkLog | null;
  isLoading?: boolean;
}

function DayDetailsLoading() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-[320px] w-full" />
    </div>
  );
}

export function DayDetailsModal({ open, onOpenChange, selectedDay, isLoading = false }: DayDetailsModalProps) {
  const pieData = useMemo(() => buildWorkDistributionByPerson(selectedDay), [selectedDay]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Day Productivity Breakdown</DialogTitle>
          <DialogDescription>
            {selectedDay
              ? `Detailed office activity for ${selectedDay.date}.`
              : "Select a day from the chart to inspect detailed work insights."}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? <DayDetailsLoading /> : null}

        {!isLoading && !selectedDay ? (
          <EmptyState title="No Day Selected" description="Click any day bar on the chart to open this details view." />
        ) : null}

        {!isLoading && selectedDay ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="space-y-4">
              <Card className="bg-white/90">
                <CardContent className="grid gap-3 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Date</p>
                    <p className="mt-1 font-display text-base font-semibold">{selectedDay.date}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Office Hours</p>
                    <p className="mt-1 font-display text-base font-semibold">{selectedDay.totalOfficeHours}h</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {selectedDay.entries.map((entry, index) => (
                  <Card key={`${entry.personWorkedWith}-${entry.taskDescription}-${index}`} className="bg-white/90">
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Person Worked With</p>
                          <p className="mt-1 font-medium text-foreground">{entry.personWorkedWith}</p>
                        </div>
                        <Badge variant={entry.completed ? "success" : "danger"}>
                          {entry.completed ? "Completed" : "Not Completed"}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">Task Description</p>
                        <p className="mt-1 text-sm text-slate-600">{entry.taskDescription}</p>
                      </div>

                      <div className="rounded-md border border-border bg-muted/60 px-3 py-2 text-sm text-foreground">
                        Hours Spent: <span className="font-semibold">{entry.hoursSpent}h</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              {pieData.length > 0 ? (
                <WorkDistributionPieChart data={pieData} />
              ) : (
                <EmptyState
                  title="No Distribution Data"
                  description="Add entries with hours to visualize time spent per person."
                />
              )}
            </section>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
