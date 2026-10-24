"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Mail } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { url: string; title: string; orientation?: "vertical" | "horizontal"; className?: string };

const icon = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

const XIcon = () => (
  <svg {...icon}>
    <path d="M17.6 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.5 5.9L17.6 3Zm-1.1 16.2h1.7L7.6 4.7H5.8l10.7 14.5Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg {...icon}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.84v1.54h.06c.53-.96 1.84-1.97 3.78-1.97 4.05 0 4.8 2.57 4.8 5.9V21h-4v-5.1c0-1.22-.02-2.78-1.78-2.78-1.78 0-2.05 1.32-2.05 2.69V21h-4V9.75Z" />
  </svg>
);
const FacebookIcon = () => (
  <svg {...icon}>
    <path d="M13.5 21v-7.7h2.6l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.2c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.9 1.4-3.9 4v2.2H7.7v3h2.66V21h3.14Z" />
  </svg>
);

const btn =
  "grid size-11 place-items-center rounded-full border border-ink-10 bg-white text-ink-68 shadow-xs transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-ui)] hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white focus-visible:-translate-y-0.5 motion-reduce:transform-none";

/** Share links. The vertical layout sits in a sticky rail on large screens, the horizontal one inline on small screens. */
export function ShareRail({ url, title, orientation = "vertical", className }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("flex items-center gap-3", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap", className)}>
      <p className="eyebrow text-xs text-ink-50">Share</p>
      <ul className={cn("flex gap-2.5", orientation === "vertical" ? "flex-col" : "flex-row")}>
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={btn}>
              <Icon />
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email" title="Share by email" className={btn}>
            <Mail aria-hidden className="size-[18px]" />
          </a>
        </li>
        <li className="relative">
          <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={cn(btn, copied && "border-accent bg-accent text-white")}>
            {copied ? <Check aria-hidden className="size-[18px]" /> : <Link2 aria-hidden className="size-[18px]" />}
          </button>
          <span role="status" aria-live="polite" className={cn("pointer-events-none absolute whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs text-white transition-opacity duration-200", orientation === "vertical" ? "left-full top-1/2 ml-3 -translate-y-1/2" : "-top-9 left-1/2 -translate-x-1/2", copied ? "opacity-100" : "opacity-0")}>
            {copied ? "Link copied" : ""}
          </span>
        </li>
      </ul>
    </div>
  );
}
