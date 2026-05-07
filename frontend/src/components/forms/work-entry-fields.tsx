import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WorkEntry } from "@/types/work-log";

interface WorkEntryFieldsProps {
  entries: WorkEntry[];
  errors: string[];
  onUpdateEntry: (index: number, key: keyof WorkEntry, value: string | number | boolean) => void;
  onRemoveEntry: (index: number) => void;
}

export function WorkEntryFields({ entries, errors, onUpdateEntry, onRemoveEntry }: WorkEntryFieldsProps) {
  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-lg border border-border bg-white/80 p-4 md:grid-cols-[1.2fr_1.5fr_0.6fr_0.7fr_auto]"
        >
          <Input
            placeholder="Person worked with"
            value={entry.personWorkedWith}
            onChange={(event) => onUpdateEntry(index, "personWorkedWith", event.target.value)}
          />
          <Input
            placeholder="Task description"
            value={entry.taskDescription}
            onChange={(event) => onUpdateEntry(index, "taskDescription", event.target.value)}
          />
          <Input
            type="number"
            min={0.5}
            max={24}
            step={0.5}
            placeholder="Hours"
            value={entry.hoursSpent || ""}
            onChange={(event) => onUpdateEntry(index, "hoursSpent", Number(event.target.value))}
          />
          <label className="flex items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={entry.completed}
              onChange={(event) => onUpdateEntry(index, "completed", event.target.checked)}
            />
            Done
          </label>
          <Button type="button" variant="outline" size="icon" onClick={() => onRemoveEntry(index)} aria-label="Remove entry">
            <Trash2 className="h-4 w-4" />
          </Button>
          {errors[index] ? <p className="text-xs text-red-600 md:col-span-5">{errors[index]}</p> : null}
        </div>
      ))}
    </div>
  );
}
