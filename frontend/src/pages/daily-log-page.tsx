import { Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { WorkEntryFields } from "@/components/forms/work-entry-fields";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWorkLogsContext } from "@/hooks/use-work-logs-context";
import type { WorkEntry, WorkLog, WorkLogPayload } from "@/types/work-log";
import { formatDateForInput } from "@/utils/date";
import { validateWorkLogForm } from "@/utils/validation";

const createDefaultEntry = (): WorkEntry => ({
  personWorkedWith: "",
  taskDescription: "",
  hoursSpent: 0,
  completed: false
});

export function DailyLogPage() {
  const { workLogs, createWorkLog, updateWorkLog, deleteWorkLog, isSaving } = useWorkLogsContext();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(formatDateForInput(new Date()));
  const [totalOfficeHours, setTotalOfficeHours] = useState<number>(8);
  const [entries, setEntries] = useState<WorkEntry[]>([createDefaultEntry()]);
  const [entryErrors, setEntryErrors] = useState<string[]>([]);
  const [formError, setFormError] = useState<string>("");

  const selectedWorkLog = useMemo(
    () => (selectedId ? workLogs.find((item) => item.id === selectedId) || null : null),
    [selectedId, workLogs]
  );

  const resetForm = () => {
    setSelectedId(null);
    setDate(formatDateForInput(new Date()));
    setTotalOfficeHours(8);
    setEntries([createDefaultEntry()]);
    setEntryErrors([]);
    setFormError("");
  };

  const handleUpdateEntry = (index: number, key: keyof WorkEntry, value: string | number | boolean) => {
    setEntries((prev) => prev.map((entry, idx) => (idx === index ? { ...entry, [key]: value } : entry)));
  };

  const handleRemoveEntry = (index: number) => {
    setEntries((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== index)));
  };

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, createDefaultEntry()]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validation = validateWorkLogForm(date, totalOfficeHours, entries);
    setEntryErrors(validation.entryErrors);
    setFormError(validation.formError);
    if (!validation.isValid) {
      return;
    }

    const payload: WorkLogPayload = {
      date,
      totalOfficeHours,
      entries
    };

    if (selectedId) {
      await updateWorkLog(selectedId, payload);
    } else {
      await createWorkLog(payload);
    }

    resetForm();
  };

  const handleEdit = (workLog: WorkLog) => {
    setSelectedId(workLog.id);
    setDate(workLog.date);
    setTotalOfficeHours(workLog.totalOfficeHours);
    setEntries(workLog.entries);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Daily Work Log" description="Create, edit, and maintain daily office execution logs." />

      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>{selectedId ? "Edit Work Log" : "Create Work Log"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Date</label>
                <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
              </div>
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Total Office Hours</label>
                <Input
                  type="number"
                  min={0.5}
                  max={24}
                  step={0.5}
                  value={totalOfficeHours}
                  onChange={(event) => setTotalOfficeHours(Number(event.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">Work Entries</h3>
                <Button type="button" variant="secondary" size="sm" onClick={handleAddEntry}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Entry
                </Button>
              </div>
              <WorkEntryFields
                entries={entries}
                errors={entryErrors}
                onUpdateEntry={handleUpdateEntry}
                onRemoveEntry={handleRemoveEntry}
              />
            </div>

            {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {selectedId ? "Update Log" : "Save Log"}
              </Button>
              {selectedId ? (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {workLogs.length === 0 ? (
            <EmptyState title="No Logs Created" description="Your saved logs will show here once you submit the form." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Office Hours</TableHead>
                  <TableHead>Entries</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.totalOfficeHours}</TableCell>
                    <TableCell>{log.entries.length}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button type="button" variant="outline" size="sm" onClick={() => handleEdit(log)}>
                        Edit
                      </Button>
                      <Button type="button" variant="destructive" size="sm" onClick={() => void deleteWorkLog(log.id)}>
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
