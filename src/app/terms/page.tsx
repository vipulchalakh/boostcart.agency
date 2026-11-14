import type { Metadata } from "next";
import { LEGAL_UPDATED, termsSections } from "@content/data";
import { LegalDocument } from "@/components/company/LegalDocument";
import { PageHeader } from "@/components/company/PageHeader";
import { breadcrumbLd, pageMeta } from "@/components/company/jsonLd";
import { Button } from "@/components/ui/Button";

const path = "/terms";
const title = "Terms of Service";
const description = "The terms that apply when you use boostcart.agency, including our free SEO audit and other tools.";

export const metadata: Metadata = pageMeta(path, title, description);

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(title, path)).replace(/</g, "\\u003c") }} />
      <PageHeader crumb={title} title={title} lead="The rules for using our website and free tools, in plain language." note={`Last updated ${LEGAL_UPDATED}`} />
      <LegalDocument sections={termsSections}>
        <div className="mt-4 rounded-xl bg-ink-02 p-6 ring-1 ring-ink-05">
          <p className="font-medium text-ink">Questions about these terms?</p>
          <p className="mt-1 text-ink-68">Send us a message and we&rsquo;ll get back to you.</p>
          <div className="mt-4"><Button href="/contact" variant="secondary" size="md" arrow>Contact us</Button></div>
        </div>
      </LegalDocument>
    </>
  );
}
