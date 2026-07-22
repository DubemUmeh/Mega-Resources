export const dynamic = "force-dynamic";

import { getReviewStats } from "@/lib/reviews";
import { AdminOverviewClient } from "./admin-overview-client";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchGmailMessages, getGoogleConnection } from "@/lib/gmail";

export default async function AdminOverviewPage() {
  const session = await requireAdmin();
  const { totalReviews, averageRating, pendingReviews } = await getReviewStats();
  const [contactRequests, quoteRequests, connection] = await Promise.all([
    fetchGmailMessages(session.adminId, 'subject:(contact OR "contact form") newer_than:30d', 3),
    fetchGmailMessages(session.adminId, 'subject:(quote OR quotation OR estimate) newer_than:30d', 3),
    getGoogleConnection(session.adminId),
  ]);

  return (
    <AdminOverviewClient
      totalReviews={totalReviews}
      avgRating={averageRating}
      pendingReviews={pendingReviews}
      unreadGmailMessages={[...contactRequests.messages, ...quoteRequests.messages].filter((m) => m.unread).length}
      recentContactRequests={contactRequests.messages}
      recentQuoteRequests={quoteRequests.messages}
      googleConnected={Boolean(connection && !connection.revokedAt)}
    />
  );
}
