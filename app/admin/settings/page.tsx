import { getDb } from "@/db/db";
import { authorizedAdmins, businessSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import { getGoogleConnection } from "@/lib/gmail";
import { AdminTopbar } from "../_components/admin-topbar";
import { RoleSelect } from "../_components/role-select";
import {
  addAuthorizedUser,
  saveBusinessSettings,
} from "../admin-users-actions";
import { disconnectGoogle } from "../gmail-actions";
import { UserActionsMenu } from "../_components/user-actions-menu";

export default async function SettingsPage() {
  const db = getDb();
  const session = await requireAdmin();
  const [settings] = await db.select().from(businessSettings).limit(1);
  const users = await db
    .select()
    .from(authorizedAdmins)
    .orderBy(authorizedAdmins.createdAt);
  const connection = await getGoogleConnection(session.adminId);

  return (
    <>
      <AdminTopbar
        title="Settings"
        description="Business profile, Gmail connection, and authorized admin users."
      />

      <div className="grid gap-4 sm:gap-5">
        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 sm:p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Business Profile
          </h2>
          <form
            action={saveBusinessSettings}
            className="mt-4 grid gap-3 md:grid-cols-2"
          >
            {[
              ["businessName", "Business name", settings?.businessName],
              ["businessEmail", "Business email", settings?.businessEmail],
              ["phone", "Phone", settings?.phone],
              ["logoUrl", "Logo", settings?.logoUrl],
              ["address", "Address", settings?.address],
            ].map(([n, l, v]) => (
              <label key={n} className="text-sm text-neutral-500">
                {l}
                <input
                  name={n}
                  defaultValue={v || ""}
                  className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                />
              </label>
            ))}
            <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:col-span-2">
              Save profile
            </button>
          </form>
        </section>

        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 sm:p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Google Connection
          </h2>
          <div className="mt-3 grid gap-2 text-sm text-neutral-500">
            <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
              <span>Connected Google account:</span>
              <span className="min-w-0 truncate text-neutral-900">
                {connection?.googleEmail || "Not connected"}
              </span>
            </p>
            <p>
              Gmail API status:{" "}
              <span
                className={
                  connection && !connection.revokedAt
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                {connection && !connection.revokedAt
                  ? "Connected"
                  : "Disconnected"}
              </span>
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href="/api/auth/google"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Reconnect
            </a>
            <form action={disconnectGoogle}>
              <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
                Disconnect
              </button>
            </form>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 sm:p-6 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Authorized Users
          </h2>
          {session.role === "SUPER_ADMIN" && (
            <form
              action={addAuthorizedUser}
              className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_160px_auto]"
            >
              <input
                name="name"
                placeholder="Name"
                className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
              <input
                name="email"
                type="email"
                placeholder="Google email"
                className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
              />
              <RoleSelect name="role" defaultValue="ADMIN" />
              <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                Add
              </button>
            </form>
          )}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full table-fixed text-left text-sm">
              <thead className="text-neutral-500">
                <tr>
                  <th className="w-[20%] py-2">Name</th>
                  <th className="w-[30%]">Email</th>
                  <th className="w-[15%]">Role</th>
                  <th className="w-[15%]">Status</th>
                  <th className="w-[20%]"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t border-neutral-200 text-neutral-900"
                  >
                    <td className="max-w-0 truncate py-3" title={u.name}>
                      {u.name}
                    </td>
                    <td className="max-w-0 truncate" title={u.googleEmail}>
                      {u.googleEmail}
                    </td>
                    <td className="truncate">{u.role}</td>
                    <td className="truncate">
                      {u.active ? "Active" : "Disabled"}
                    </td>
                    <td className="flex flex-wrap gap-2 py-2">
                      {session.role === "SUPER_ADMIN" && (
                        <UserActionsMenu user={{ id: u.id, name: u.name, active: u.active ?? false }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
