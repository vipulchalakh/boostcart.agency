import Image from "next/image";
import { ArrowUpRight, User } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";

type Props = { name: string; role?: string | null; bio?: string | null; photoUrl?: string | null; linkedinUrl?: string | null };

export function AuthorBio({ name, role, bio, photoUrl, linkedinUrl }: Props) {
  return (
    <section aria-labelledby="author-bio-title" className="rounded-2xl border border-ink-10 bg-ink-02 p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {photoUrl ? (
          <Image src={photoUrl} alt="" width={176} height={176} className="size-[88px] shrink-0 rounded-full object-cover ring-4 ring-white" />
        ) : (
          <span aria-hidden className="grid size-[88px] shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong ring-4 ring-white">
            <User className="size-9" />
          </span>
        )}
        <div className="min-w-0">
          <p id="author-bio-title" className="eyebrow text-xs">
            Written by
          </p>
          <p className="mt-1 font-display text-xl font-bold leading-tight text-ink">{name}</p>
          {role && <p className="mt-0.5 text-sm text-ink-50">{role}</p>}
          {bio && <p className="mt-3 text-base leading-7 text-ink/80">{bio}</p>}
          {linkedinUrl && (
            <AppLink href={linkedinUrl} className="post-link mt-4 inline-flex items-center gap-1 text-sm">
              Connect on LinkedIn
              <ArrowUpRight aria-hidden className="size-4" />
            </AppLink>
          )}
        </div>
      </div>
    </section>
  );
}
