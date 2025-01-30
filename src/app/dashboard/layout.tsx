import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <Suspense>
          <AppSidebar />
        </Suspense>
        <main className="overflow-hidden w-full">
          <div className="p-2">
            <SidebarTrigger />
          </div>
          <div className="p-4 bg-slate-100 min-h-screen w-full">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
