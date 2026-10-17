import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; icon?: ReactNode; className?: string; as?: "p" | "h1"; id?: string };

export function Eyebrow({ children, icon, className, as: Tag = "p", id }: Props) {
  return (
    <Tag id={id} className={cn("eyebrow inline-flex items-center gap-2", className)}>
      {icon}
      {children}
    </Tag>
  );
}
