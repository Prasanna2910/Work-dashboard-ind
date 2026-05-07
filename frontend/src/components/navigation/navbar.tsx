import { BellRing, CalendarDays } from "lucide-react";

export function Navbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-white/80 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Work Productivity Dashboard</p>
          <p className="text-xs text-muted-foreground">High-signal progress tracking for focused teams</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="hidden items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 md:flex">
            <CalendarDays className="h-4 w-4" />
            {today}
          </div>
          <button className="rounded-full border border-border bg-white p-2 transition hover:bg-muted/60" aria-label="Notifications">
            <BellRing className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
