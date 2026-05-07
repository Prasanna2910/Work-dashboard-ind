import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { AppLayout } from "@/layouts/app-layout";
import { DailyLogPage } from "@/pages/daily-log-page";
import { DashboardPage } from "@/pages/dashboard-page";
import { NotFoundPage } from "@/pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={ROUTES.dashboard} />} />
      <Route element={<AppLayout />}>
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.dailyLog} element={<DailyLogPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
