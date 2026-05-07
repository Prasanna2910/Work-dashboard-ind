import "@fontsource-variable/manrope";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import { Toaster } from "@/components/ui/sonner";
import { WorkLogsProvider } from "@/hooks/use-work-logs-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkLogsProvider>
        <App />
        <Toaster />
      </WorkLogsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
