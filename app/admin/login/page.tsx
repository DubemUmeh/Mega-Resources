export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-neutral-50 px-5 py-16 text-neutral-900">
      <div className="mx-auto max-w-md rounded-[1.5rem] border border-neutral-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <h1 className="font-display text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Use the authorized Google account connected to Gmail.
        </p>

        {params.error === "unauthorized" && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            Your Google account is not authorized.
          </p>
        )}
        {params.error === "oauth" && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
            Google sign in could not be completed.
          </p>
        )}

        <a
          href="/api/auth/google"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Continue with Google
        </a>
      </div>
    </main>
  );
}