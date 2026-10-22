import SectionLabel from "../components/SectionLabel";

const sections = [
  {
    title: "How & Why is this important?",
    content: [
      "The GDPR was created to regulate how businesses use data, ensuring it’s the same across the entire EU. Although it will apply to smaller businesses as well as large corporations, recent high-profile scandals have demonstrated how big organisation’s will have to comply to a single set of rules. The main implications of contravention of the GDPR for businesses, could be financial penalties.",
    ],
  },
  {
    title: "Does this affect you?",
    content: [
      "Any business that processes an EU Data Subject’s data, whether you are in the EU or outside of it, will be subject to the regulation and will have to abide by the rules it lays out for processing data.",
      <>
        Techintel is concerned with the purposes of processing data and making
        it available to business customers for direct marketing and this is
        classified as <strong>‘Legitimate Interest’</strong>.
      </>,
      "Techintel relies on the legitimate interest precedent as an appropriate legal basis under the applicable Data Protection Laws to provide Business Data to its customers.",
      "Customers may use the business data for the sending of B2B direct marketing communications if they do so in line with the relevant laws. The initiator may conduct such marketing activity under an opt-out / unsubscribe basis, where employees of a public or corporate entity are contacted for the purposes of direct marketing.",
    ],
  },
  // {
  //   title: "Legitimate interest",
  //   content: [
  //     "TechIntel relies on legitimate interest as an appropriate legal basis under applicable data protection laws when providing business data to its customers.",
  //   ],
  //   callout:
  //     "Customers may use business data to send B2B direct marketing communications when they comply with relevant laws. Marketing activity may be conducted on an opt-out or unsubscribe basis where permitted.",
  // },
];

const readinessPoints = [
  "Our aim is to help businesses market directly to each other using accurate business data and reach relevant individuals who have a legitimate interest in receiving that marketing.",
  "Business data is processed only from verifiable information sources.",
  "We provide tools that support compliance with applicable data protection and marketing regulations.",
  "Individuals can request access, correction, deletion, or restriction of their personal data where applicable.",
  "We respect unsubscribe and opt-out requests and provide appropriate suppression controls.",
];

function GDPRPolicy() {
  return (
    <main className="bg-slate-50 text-slate-800">
      <section className="bg-slate-950 pt-40 pb-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>DATA PROTECTION &amp; PRIVACY</SectionLabel>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            GDPR Policy
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Learn how TechIntel approaches data protection and supports GDPR
            compliance for business data and marketing activities.
          </p>
          <p className="mt-5 text-sm text-slate-400">
            Last updated: September 2026
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <article className="mx-auto max-w-5xl px-6">
          <div className="space-y-6">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="border-l-4 border-cyan-500 pl-4 text-2xl font-semibold text-slate-950">
                  {section.title}
                </h2>
                {section.content.map((paragraph, index) => (
                  <p
                    key={`${section.title}-${index}`}
                    className="mt-5 leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.callout && (
                  <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 p-5 leading-8 text-slate-700">
                    {section.callout}
                  </div>
                )}
              </section>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="border-l-4 border-cyan-500 pl-4 text-2xl font-semibold text-slate-950">
                Our data is GDPR-ready
              </h2>
              <ul className="mt-5 space-y-4 text-slate-600">
                {readinessPoints.map((point) => (
                  <li key={point} className="flex gap-3 leading-8">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="border-l-4 border-cyan-500 pl-4 text-2xl font-semibold text-slate-950">
                Contact us
              </h2>
              <p className="mt-5 leading-8 text-slate-600">
                For questions about this GDPR Policy or your data protection
                rights, contact us at{" "}
                <a
                  href="mailto:contact@techintel.tech"
                  className="font-medium text-cyan-600 hover:text-cyan-700"
                >
                  contact@techintel.tech
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}

export default GDPRPolicy;
