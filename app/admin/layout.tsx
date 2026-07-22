import type { Metadata } from "next";
import { AdminSidebar } from "./_components/admin-sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { PortfolioProvider } from "./_components/portfolio-store";
import { createMetadata } from "@/lib/seo";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Admin | Mega Resources LTD",
  description: "Private Mega Resources LTD content management area.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) return <ToastProvider>{children}</ToastProvider>;
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