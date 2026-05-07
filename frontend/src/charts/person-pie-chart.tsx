import type { PersonHours } from "@/types/work-log";

import { WorkDistributionPieChart } from "@/components/charts/WorkDistributionPieChart";

// Backward-compatible wrapper.
export function PersonPieChart({ data }: { data: PersonHours[] }) {
  return <WorkDistributionPieChart data={data} />;
}
