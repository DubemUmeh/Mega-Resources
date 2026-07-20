import { AdminSidebar } from "./_components/admin-sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { PortfolioProvider } from "./_components/portfolio-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <PortfolioProvider>
        <div className="min-h-screen w-full bg-background/50">
          <AdminSidebar />
          <main className="px-5 py-8 lg:pl-68 lg:pr-10 lg:py-10">
            <div className="mx-auto w-full max-w-304">{children}</div>
          </main>
        </div>
      </PortfolioProvider>
    </ToastProvider>
  );
}