import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navigation/navbar";
import { Sidebar } from "@/components/navigation/sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.12),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(15,23,42,0.08),transparent_35%),linear-gradient(135deg,#FFFFFF,#F8FAFC)]" />
      <div className="relative">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row">
          <Sidebar />
          <main className="w-full p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
