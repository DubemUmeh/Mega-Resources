"use client";

import { useState } from "react";
import {
  FaEnvelopeOpenText,
  FaCopy,
  FaExternalLinkAlt,
  FaCheck,
} from "react-icons/fa";
import { GmailListItem, gmailReplyUrl } from "@/lib/gmail-client";
import { markHandled } from "../gmail-actions";

export function GmailRequestList({ messages }: { messages: GmailListItem[] }) {
  const [selected, setSelected] = useState<GmailListItem | null>(
    messages[0] ?? null,
  );

  if (!messages.length) {
    return (
      <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 sm:p-8 text-center text-neutral-500 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
        No matching Gmail messages found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-3">
        {messages.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m)}
            className={`w-full rounded-[1.2rem] border bg-white p-4 text-left shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition-colors hover:border-blue-600/30 ${
              selected?.id === m.id
                ? "border-blue-600/40"
                : "border-neutral-200"
            }`}
          >
            <div className="flex justify-between gap-3">
              <div>
                <p className="font-semibold text-neutral-900">
                  {m.fromName || m.fromEmail}
                </p>
                <p className="text-xs text-neutral-500">{m.fromEmail}</p>
              </div>
              <span className="text-xs text-neutral-400">
                {m.date ? new Date(m.date).toLocaleString() : ""}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-neutral-900">
              {m.unread ? "• " : ""}
              {m.subject}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
              {m.preview}
            </p>
            {m.handled && (
              <span className="mt-3 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                Handled
              </span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <aside className="rounded-[1.5rem] border border-neutral-200 bg-white p-4 sm:p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
            <FaEnvelopeOpenText className="h-3.5 w-3.5" />
          </span>
          <h2 className="mt-4 font-display text-xl font-semibold text-neutral-900">
            {selected.subject}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            From {selected.fromName} &lt;{selected.fromEmail}&gt;
          </p>
          <p className="mt-5 whitespace-pre-wrap rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
            {selected.preview}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              target="_blank"
              href={gmailReplyUrl(selected)}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Reply in Gmail{" "}
              <FaExternalLinkAlt className="ml-2 inline h-3 w-3" />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(selected.fromEmail)}
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <FaCopy className="mr-2 inline h-3 w-3" />
              Copy email
            </button>
            <form
              action={async () => {
                await markHandled(selected.id);
              }}
            >
              <button className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
                <FaCheck className="mr-2 inline h-3 w-3" />
                Mark handled
              </button>
            </form>
          </div>
        </aside>
      )}
    </div>
  );
}
