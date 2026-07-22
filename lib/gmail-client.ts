export type GmailListItem = {
  id: string;
  threadId: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  date: string;
  preview: string;
  unread: boolean;
  handled: boolean;
};

export function gmailReplyUrl(message: { fromEmail: string; fromName: string; subject: string; preview: string }) {
  const subject = message.subject.toLowerCase().startsWith("re:") ? message.subject : `Re: ${message.subject}`;
  const body = `Hello ${message.fromName || "there"},\n\n\n\nOriginal request:\n${message.preview}`;
  const url = new URL("https://mail.google.com/mail/");
  url.hash = `inbox?compose=new&to=${encodeURIComponent(message.fromEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return url.toString();
}
