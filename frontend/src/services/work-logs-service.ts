import { apiClient } from "@/services/api";
import type { WorkLog, WorkLogPayload } from "@/types/work-log";

export const workLogsService = {
  async getAll(): Promise<WorkLog[]> {
    const { data } = await apiClient.get<WorkLog[]>("/work-logs");
    return data;
  },
  async getById(id: string): Promise<WorkLog> {
    const { data } = await apiClient.get<WorkLog>(`/work-logs/${id}`);
    return data;
  },
  async create(payload: WorkLogPayload): Promise<WorkLog> {
    const { data } = await apiClient.post<WorkLog>("/work-logs", payload);
    return data;
  },
  async update(id: string, payload: WorkLogPayload): Promise<WorkLog> {
    const { data } = await apiClient.put<WorkLog>(`/work-logs/${id}`, payload);
    return data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/work-logs/${id}`);
  }
};
