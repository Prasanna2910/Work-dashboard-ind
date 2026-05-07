import type { WorkEntry } from "@/types/work-log";

export interface WorkLogValidationResult {
  isValid: boolean;
  formError: string;
  entryErrors: string[];
}

export function validateWorkLogForm(date: string, totalOfficeHours: number, entries: WorkEntry[]): WorkLogValidationResult {
  const entryErrors: string[] = [];

  if (!date) {
    return { isValid: false, formError: "Date is required.", entryErrors };
  }

  if (totalOfficeHours <= 0 || totalOfficeHours > 24) {
    return { isValid: false, formError: "Total office hours must be between 0 and 24.", entryErrors };
  }

  entries.forEach((entry, index) => {
    if (!entry.personWorkedWith.trim()) {
      entryErrors[index] = "Person worked with is required.";
    } else if (!entry.taskDescription.trim()) {
      entryErrors[index] = "Task description is required.";
    } else if (!entry.hoursSpent || entry.hoursSpent <= 0) {
      entryErrors[index] = "Hours spent must be greater than 0.";
    } else {
      entryErrors[index] = "";
    }
  });

  const totalEntryHours = entries.reduce((sum, entry) => sum + Number(entry.hoursSpent || 0), 0);
  if (totalEntryHours > totalOfficeHours) {
    return {
      isValid: false,
      formError: "Total entry hours cannot exceed total office hours.",
      entryErrors
    };
  }

  if (entryErrors.some(Boolean)) {
    return {
      isValid: false,
      formError: "Please fix highlighted entry errors.",
      entryErrors
    };
  }

  return { isValid: true, formError: "", entryErrors };
}
