import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { workLogsService } from "@/services/work-logs-service";
import type { WorkLog, WorkLogPayload } from "@/types/work-log";

interface UseWorkLogsResult {
  workLogs: WorkLog[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  fetchWorkLogs: () => Promise<void>;
  createWorkLog: (payload: WorkLogPayload) => Promise<void>;
  updateWorkLog: (id: string, payload: WorkLogPayload) => Promise<void>;
  deleteWorkLog: (id: string) => Promise<void>;
}

function getApiErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const maybeAxiosError = error as { response?: { data?: { detail?: string } } };
    return maybeAxiosError.response?.data?.detail || "Something went wrong.";
  }
  return "Something went wrong.";
}

export function useWorkLogs(): UseWorkLogsResult {
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await workLogsService.getAll();
      setWorkLogs(response);
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWorkLog = useCallback(
    async (payload: WorkLogPayload) => {
      setIsSaving(true);
      try {
        const created = await workLogsService.create(payload);
        setWorkLogs((prev) => [...prev, created].sort((a, b) => a.date.localeCompare(b.date)));
        toast.success("Work log saved successfully.");
      } catch (err) {
        toast.error(getApiErrorMessage(err));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    []
  );

  const updateWorkLog = useCallback(async (id: string, payload: WorkLogPayload) => {
    setIsSaving(true);
    try {
      const updated = await workLogsService.update(id, payload);
      setWorkLogs((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast.success("Work log updated.");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const deleteWorkLog = useCallback(async (id: string) => {
    try {
      await workLogsService.remove(id);
      setWorkLogs((prev) => prev.filter((log) => log.id !== id));
      toast.success("Work log removed.");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      throw err;
    }
  }, []);

  useEffect(() => {
    void fetchWorkLogs();
  }, [fetchWorkLogs]);

  return {
    workLogs,
    isLoading,
    isSaving,
    error,
    fetchWorkLogs,
    createWorkLog,
    updateWorkLog,
    deleteWorkLog
  };
}
