import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="font-display text-5xl font-semibold">404</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to={ROUTES.dashboard}>
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
