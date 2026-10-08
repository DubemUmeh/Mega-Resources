export const dynamic = "force-dynamic";

import { getReviewStats } from "@/lib/reviews";
import { AdminOverviewClient } from "./admin-overview-client";
import { requireAdmin } from "@/lib/admin-auth";
import { fetchGmailMessages, getGoogleConnection } from "@/lib/gmail";

const CONTACT_REQUEST_QUERY = "from:support@megaresourcesgh.com newer_than:30d";
const QUOTE_REQUEST_QUERY = "from:quotes@megaresourcesgh.com newer_than:30d";

export default async function AdminOverviewPage() {
  const session = await requireAdmin();
  const { totalReviews, averageRating, pendingReviews } = await getReviewStats();
  const [contactRequests, quoteRequests, connection] = await Promise.all([
    fetchGmailMessages(session.adminId, CONTACT_REQUEST_QUERY, 3),
    fetchGmailMessages(session.adminId, QUOTE_REQUEST_QUERY, 3),
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
