import { DayDetailsModal as NewDayDetailsModal } from "@/components/modals/DayDetailsModal";
import type { WorkLog } from "@/types/work-log";

interface LegacyDayDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workLog: WorkLog | null;
}

// Backward-compatible wrapper for earlier imports.
export function DayDetailsModal({ open, onOpenChange, workLog }: LegacyDayDetailsModalProps) {
  return <NewDayDetailsModal open={open} onOpenChange={onOpenChange} selectedDay={workLog} />;
}
