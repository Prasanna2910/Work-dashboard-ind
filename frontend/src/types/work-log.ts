export interface WorkEntry {
  personWorkedWith: string;
  taskDescription: string;
  hoursSpent: number;
  completed: boolean;
}

export interface WorkLog {
  id: string;
  date: string;
  totalOfficeHours: number;
  entries: WorkEntry[];
}

export interface WorkLogPayload {
  date: string;
  totalOfficeHours: number;
  entries: WorkEntry[];
}

export interface DashboardPoint {
  date: string;
  label: string;
  totalHours: number;
  workLogId: string;
}

export interface PersonHours {
  name: string;
  value: number;
}
