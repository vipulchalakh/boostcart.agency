import { cn } from "@/lib/cn";

const tints = ["#f4d9c6", "#d6e4f0", "#e3d6f0", "#d8ecd9"];

/** Initials avatar (no photos until real people are supplied). */
export function Avatar({ initials, size = 32, index = 0, className }: { initials: string; size?: number; index?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-grid place-items-center rounded-full font-sans text-xs font-medium text-ink ring-2 ring-white", className)}
      style={{ width: size, height: size, background: tints[index % tints.length] }}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({ people, size = 32 }: { people: string[]; size?: number }) {
  return (
    <span className="inline-flex">
      {people.map((p, i) => (
        <Avatar key={p + i} initials={p} index={i} size={size} className={i > 0 ? "-ml-1" : ""} />
      ))}
    </span>
  );
}
