import { getAdminMediaSlots } from "@/lib/media";
import { AdminTopbar } from "../_components/admin-topbar";
import { MediaManager } from "../_components/media-manager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const slots = await getAdminMediaSlots();
  return (
    <>
      <AdminTopbar title="Website Media" description="Replace service and hero visuals without touching code. Original defaults and previous uploads remain available." />
      <MediaManager initialSlots={slots} />
    </>
  );
}
