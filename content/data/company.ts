/** Copy for the About, Contact, Privacy and Terms pages. */

export const LEGAL_UPDATED = "November 14, 2026";

/* ---------- About ---------- */
export const aboutPrinciples: Array<{ title: string; text: string }> = [
  { title: "Revenue first", text: "We rank every fix by what the page is worth to your store, not by keyword volume or a vanity score. The work that moves revenue goes first." },
  { title: "Fixed at the root", text: "Most store SEO problems live in the theme, the platform settings or the way pages are generated. We fix the cause once, so it stays fixed." },
  { title: "One team, one roadmap", text: "Technical, content, links and reporting are planned together, in one roadmap and one monthly report, so nothing waits on a handoff." },
  { title: "Honest reporting", text: "Reports show organic revenue, the pages that earned it and what we do next. When something did not work, we say so and change the plan." },
];

export const aboutPlatforms = ["Shopify", "WooCommerce", "BigCommerce", "Magento", "Headless builds"];

export const aboutOffices: Array<{ flag: string; label: string; place: string; address: string }> = [
  { flag: "🇺🇸", label: "USA", place: "Casper, Wyoming", address: "5830 E 2nd St, Casper, WY, United States, 82609" },
  { flag: "🇮🇳", label: "India", place: "Nagpur, Maharashtra", address: "29, Nagpur, Maharashtra, India - 440034" },
];

export const contactTopics = [
  "Technical SEO",
  "Category & product pages",
  "Content & buying guides",
  "Link building & digital PR",
  "Conversion-focused SEO",
  "Reporting",
  "AI SEO",
  "Not sure yet",
] as const;

/* ---------- Legal documents ---------- */
export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; title: string; body: LegalBlock[] };

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      "BoostCart (“BoostCart”, “we”, “us”) is an e-commerce SEO and AI SEO agency. This policy explains what personal information we collect on boostcart.agency, why we collect it and the choices you have.",
      "We operate from the United States and India. You can reach us about anything in this policy through our contact page.",
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "We only collect what you give us or what your browser sends when you use the site.",
      {
        list: [
          "Forms. When you request an audit or contact us, we store the details you enter: your name, work email, website address, platform, industry or what you sell, and any message you write.",
          "Free SEO audit. We store the name, website address, platform and industry you enter, and the score and grade of the audit we run for you.",
          "Booking a call. Meetings are booked through Cal.com in a pop-up on our site. The details you enter there, such as your name, email and chosen time, are handled by Cal.com and shared with us so we can hold the meeting.",
          "Technical data. With each form submission we record the page it came from, the referring page and your browser type. Your IP address is used briefly to limit abuse and is not stored with your submission.",
          "Browser storage. Your cookie choice and the progress you save in our SEO checklist are kept in your own browser. They are not sent to us.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      {
        list: [
          "To reply to you, send the audit or plan you asked for and arrange calls.",
          "To run the free SEO audit and show you the results.",
          "To provide and improve our services and this website.",
          "To protect the site from spam, abuse and security threats.",
          "To meet legal obligations.",
        ],
      },
      "We do not sell your personal information, and we do not share it for advertising.",
    ],
  },
  {
    id: "legal-bases",
    title: "Legal bases",
    body: [
      "If you are in the European Economic Area, the United Kingdom or a similar region, we rely on: your consent (for example, optional analytics cookies); performing a request you make of us, such as an audit; our legitimate interests in running and securing a business website; and legal obligations.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: [
      "We use essential storage to run the site and remember your cookie choice. Non-essential cookies, such as analytics, are off by default and only load after you choose Accept in the cookie banner. You can change your mind by clearing this site’s data in your browser.",
      "When you open the booking pop-up, Cal.com may set its own cookies. Their use is covered by Cal.com’s own policies.",
    ],
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: [
      "We share information only with service providers that help us run the site and our business, and only as needed:",
      {
        list: [
          "Hosting and database providers, which store the form submissions described above.",
          "An SEO scoring provider. To run your free audit, the website address you enter is sent to a third-party audit service, which scans that public page and returns the results.",
          "Cal.com, for scheduling calls.",
        ],
      },
      "We may also disclose information if the law requires it, or to protect our rights, our users or the public.",
    ],
  },
  {
    id: "transfers",
    title: "International transfers",
    body: [
      "We have offices in the United States and India, and our providers may process data in these and other countries. Where required, we use appropriate safeguards for these transfers.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep enquiries and audit requests for as long as we need them to respond to you, deliver services and keep reasonable business records. You can ask us to delete your information at any time, and we will unless we have to keep it by law.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, delete or export your personal information, to object to or restrict how we use it, and to withdraw consent at any time. California residents have similar rights, including the right to know what we collect and to ask us to delete it. We do not sell or share personal information as those terms are defined in California law.",
      "To use any of these rights, send us a request through our contact page. We may need to confirm it is you before we act. You can also complain to your local data protection authority.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We use reasonable technical and organisational measures to protect your information, including encrypted connections and restricted access to stored submissions. No system is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: ["Our site is for business owners and is not directed at children under 16. We do not knowingly collect their personal information."],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: ["We may update this policy from time to time. The date at the top shows when it last changed. Significant changes will be highlighted on this page."],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: [
      "These terms apply to your use of boostcart.agency, including our free SEO audit, checklists, research and other content (together, the “Site”), which is run by BoostCart (“BoostCart”, “we”, “us”). By using the Site you agree to them. If you do not agree, please do not use the Site.",
    ],
  },
  {
    id: "services",
    title: "The Site and our services",
    body: [
      "The Site describes our e-commerce SEO and AI SEO services and offers free tools. Paid agency work is provided only under a separate written agreement or proposal that you and we both accept. If that agreement conflicts with these terms, the agreement wins for the work it covers.",
    ],
  },
  {
    id: "free-tools",
    title: "Free audit and tools",
    body: [
      "Our free SEO audit, checklists and sample reports are automated or general guidance. They are provided to help you spot issues, and they are not a complete audit of your store or advice for your specific situation.",
      "Please only audit websites you own or have permission to audit. We may limit how often the audit can be used and may refuse, change or stop any tool at any time.",
    ],
  },
  {
    id: "no-guarantee",
    title: "No guarantee of results",
    body: [
      "Search engines and AI tools decide rankings and citations, and they change often. We cannot promise any specific ranking, traffic or revenue. Examples, sample figures and case studies on the Site are for illustration, and past results do not guarantee future ones.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "You agree not to:",
      {
        list: [
          "use the Site in a way that breaks the law or others’ rights;",
          "scrape the Site, or send automated or excessive requests to our forms or tools;",
          "try to gain unauthorised access to the Site, our systems or other users’ data;",
          "submit false, harmful or misleading information, or details of a person without their permission;",
          "upload or send malicious code.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "The Site and its content, including text, design, graphics, logos and tools, belong to BoostCart or its licensors and are protected by intellectual property laws. You may view and use the Site and the free checklists for your own business. You may not copy, resell or republish our content without our written permission.",
      "Client names, logos and trademarks that appear on the Site belong to their owners.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services and links",
    body: [
      "The Site uses services from other companies, such as Cal.com for booking calls and an outside provider to run the free audit, and may link to other websites. We do not control those services or sites and are not responsible for them. Their own terms and privacy policies apply to your use of them.",
    ],
  },
  {
    id: "your-content",
    title: "Information you send us",
    body: [
      "When you send us information through the Site, you confirm it is accurate and that you are allowed to share it. You give us permission to use it to respond to you and provide what you asked for, as described in our Privacy Policy.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: [
      "The Site and free tools are provided “as is” and “as available”, without warranties of any kind, whether express or implied, including accuracy, fitness for a particular purpose and uninterrupted availability, to the fullest extent the law allows.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the fullest extent the law allows, BoostCart is not liable for any indirect, incidental, special or consequential damages, or for lost profits, revenue, data or business, arising from your use of the Site or free tools. Our total liability for any claim relating to the Site is limited to US$100. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    id: "changes",
    title: "Changes and ending access",
    body: [
      "We may update these terms, and the date at the top shows the latest version. Using the Site after a change means you accept it. We may suspend or end access to the Site or any tool at any time, including if you break these terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: ["Questions about these terms? Send us a message through our contact page."],
  },
];
