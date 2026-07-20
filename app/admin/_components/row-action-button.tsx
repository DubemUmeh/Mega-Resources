"use client";

export function RowActionButton({
  icon: Icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger" | "accent";
}) {
  const toneClasses =
    tone === "danger"
      ? "hover:bg-red-500/15 hover:text-red-400"
      : tone === "accent"
        ? "hover:bg-blue-600/15 hover:text-blue-600"
        : "hover:bg-foreground/10 hover:text-foreground";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 ${toneClasses}`}
    >
      <Icon className="h-3 w-3" />
    </button>
  );
}