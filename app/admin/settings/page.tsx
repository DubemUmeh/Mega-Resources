import { getDb } from "@/db/db";
import { authorizedAdmins, businessSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import { getGoogleConnection } from "@/lib/gmail";
import { AdminTopbar } from "../_components/admin-topbar";
import { RoleSelect } from "../_components/role-select";
import { addAuthorizedUser } from "../admin-users-actions";
import { disconnectGoogle } from "../gmail-actions";
import { UserActionsMenu } from "../_components/user-actions-menu";
import { BusinessProfileForm } from "../_components/business-profile-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function SettingsPage() {
  const db = getDb();
  const session = await requireAdmin();
  const [settings] = await db.select().from(businessSettings).limit(1);
  const users = await db.select().from(authorizedAdmins).orderBy(authorizedAdmins.createdAt);
  const connection = await getGoogleConnection(session.adminId);

  return (
    <>
      <AdminTopbar title="Settings" description="Business profile, Gmail connection, and authorized admin users." />

      <div className="grid gap-4 sm:gap-5">
        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-900">Business Profile</h2>
          <BusinessProfileForm settings={settings} />
        </section>

        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-900">Google Connection</h2>
          <div className="mt-3 grid gap-2 text-sm text-neutral-500">
            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
              <span>Connected Google account:</span>
              <span className="min-w-0 truncate text-neutral-900">{connection?.googleEmail || "Not connected"}</span>
            </p>
            <p>
              Gmail API status:{" "}
              <span className={connection && !connection.revokedAt ? "font-medium text-green-600" : "font-medium text-red-500"}>
                {connection && !connection.revokedAt ? "Connected" : "Disconnected"}
              </span>
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            <a href="/api/auth/google" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">Reconnect</a>
            <form action={disconnectGoogle}>
              <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">Disconnect</button>
            </form>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)] sm:p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-900">Authorized Users</h2>
          {session.role === "SUPER_ADMIN" && (
            <form action={addAuthorizedUser} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_160px_auto]">
              <input name="name" placeholder="Name" className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
              <input name="email" type="email" placeholder="Google email" className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
              <RoleSelect name="role" defaultValue="ADMIN" />
              <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">Add</button>
            </form>
          )}

          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">Name</TableHead>
                  <TableHead className="w-[30%]">Email</TableHead>
                  <TableHead className="w-[15%]">Role</TableHead>
                  <TableHead className="w-[15%]">Status</TableHead>
                  <TableHead className="w-[20%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="max-w-[180px] truncate font-medium" title={u.name}>{u.name}</TableCell>
                    <TableCell className="max-w-[260px] truncate" title={u.googleEmail}>{u.googleEmail}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      <span className={u.active ? "inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700" : "inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600"}>
                        {u.active ? "Active" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {session.role === "SUPER_ADMIN" && (
                        <span className="inline-flex">
                          <UserActionsMenu user={{ id: u.id, name: u.name, active: u.active ?? false }} />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </>
  );
}
