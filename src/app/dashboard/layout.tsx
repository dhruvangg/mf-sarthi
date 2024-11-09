import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BreadcrumbNav } from "@/components/BreadcrumbNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-4">
        <BreadcrumbNav />
        <div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}