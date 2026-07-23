export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground">
      <div className="mx-auto max-w-md rounded-[1.5rem] border border-white/10 bg-[rgba(36,35,35,0.7)] p-8 text-center">
        <h1 className="font-display text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the authorized Google account connected to Gmail.
        </p>

        {params.error === "unauthorized" && (
          <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
            Your Google account is not authorized.
          </p>
        )}
        {params.error === "oauth" && (
          <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
            Google sign in could not be completed.
          </p>
        )}

        <a
          href="/api/auth/google"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Continue with Google
        </a>
      </div>
    </main>
  );
}