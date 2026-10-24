"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { name: string; role?: string | null; bio?: string | null; photoUrl?: string | null };

function Avatar({ photoUrl, name, size }: { photoUrl?: string | null; name: string; size: number }) {
  return photoUrl ? (
    <Image src={photoUrl} alt="" width={size * 2} height={size * 2} className="rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span aria-hidden className="grid place-items-center rounded-full bg-accent-soft text-accent-strong" style={{ width: size, height: size }}>
      <User style={{ width: size * 0.55, height: size * 0.55 }} />
      <span className="sr-only">{name}</span>
    </span>
  );
}

/** Author name with avatar. Opens a profile card on hover, keyboard focus or tap. */
export function AuthorPopover({ name, role, bio, photoUrl }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const pointer = useRef<string>("mouse");
  const panelId = useId();

  const show = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span
      ref={wrap}
      className="relative inline-block"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hide()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onClick={() => (pointer.current === "mouse" ? show() : setOpen((o) => !o))}
        className="group inline-flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-ink transition-colors duration-200 hover:bg-ink-05"
      >
        <Avatar photoUrl={photoUrl} name={name} size={32} />
        <span className="text-[0.9375rem] font-medium underline decoration-ink-20 decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent">{name}</span>
      </button>

      <span
        id={panelId}
        role="region"
        aria-label={`About ${name}`}
        aria-hidden={!open}
        data-open={open}
        className={cn(
          "absolute left-1/2 top-full z-30 w-[21rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2 text-left",
          "invisible translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-out-quart)]",
          "data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100",
        )}
      >
        <span className="block rounded-xl border border-ink-10 bg-white p-5 shadow-lg">
          <span className="flex items-center gap-4">
            <Avatar photoUrl={photoUrl} name={name} size={56} />
            <span className="block min-w-0">
              <span className="block font-display text-lg font-bold leading-tight text-ink">{name}</span>
              {role && <span className="eyebrow mt-1 block text-xs">{role}</span>}
            </span>
          </span>
          {bio && <span className="mt-4 block text-sm leading-6 text-ink-68">{bio}</span>}
        </span>
      </span>
    </span>
  );
}
