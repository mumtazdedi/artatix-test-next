import DashboardSection from "@/sections/DashboardSection";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="flex items-center gap-4">
      <Suspense>
        <DashboardSection />
      </Suspense>
    </div>
  );
}
