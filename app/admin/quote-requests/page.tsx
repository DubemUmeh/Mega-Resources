import { AdminTopbar } from "../_components/admin-topbar";
import { GmailRequestList } from "../_components/gmail-request-list";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchGmailMessages } from "@/lib/gmail";
export default async function QuoteRequestsPage() { const admin = await requireAdmin(); const result = await fetchGmailMessages(admin.adminId, 'subject:(quote OR quotation OR estimate) newer_than:90d', 20); return <><AdminTopbar title="Quote Requests" description="Quote request emails fetched directly from Gmail." />{result.status === "disconnected" ? <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-6 text-red-200">Gmail is not connected. Reconnect Google in Settings.</div> : <GmailRequestList messages={result.messages} />}</> }
