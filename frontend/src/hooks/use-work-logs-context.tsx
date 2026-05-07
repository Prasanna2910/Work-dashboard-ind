import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import { useWorkLogs } from "@/hooks/use-work-logs";

const WorkLogsContext = createContext<ReturnType<typeof useWorkLogs> | null>(null);

export function WorkLogsProvider({ children }: { children: ReactNode }) {
  const value = useWorkLogs();
  return <WorkLogsContext.Provider value={value}>{children}</WorkLogsContext.Provider>;
}

export function useWorkLogsContext() {
  const context = useContext(WorkLogsContext);
  if (!context) {
    throw new Error("useWorkLogsContext must be used within WorkLogsProvider");
  }
  return context;
}
