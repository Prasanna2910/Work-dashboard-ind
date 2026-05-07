import { BarChart3, ClipboardPenLine } from "lucide-react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

const links = [
  { to: ROUTES.dashboard, label: "Dashboard", icon: BarChart3 },
  { to: ROUTES.dailyLog, label: "Daily Work Log", icon: ClipboardPenLine }
];

export function Sidebar() {
  return (
    <aside className="w-full border-r border-border/80 bg-white/70 p-4 md:w-64">
      <nav className="flex gap-2 md:flex-col">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all",
                isActive
                  ? "border-primary/20 bg-primary/10 text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground"
              )
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
