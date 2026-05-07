import type { PersonHours, WorkLog } from "@/types/work-log";

export function buildWorkDistributionByPerson(workLog: WorkLog | null): PersonHours[] {
  if (!workLog) {
    return [];
  }

  const grouped: Record<string, number> = {};

  for (const entry of workLog.entries) {
    grouped[entry.personWorkedWith] = (grouped[entry.personWorkedWith] || 0) + entry.hoursSpent;
  }

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
