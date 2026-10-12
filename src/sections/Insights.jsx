import SectionHeading from "../components/SectionHeading";
import ResourceCard from "../components/ResourceCard";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Insights() {
  const resources = [
    {
      title: "Build and Secure AI Apps and Agents at Scale",
      description:
        "Explore security best practices and architecture frameworks for deploying scalable AI agents safely.",
      category: "Technology",
      type: "eBook",
      slug: "future-of-enterprise-technology",
      image:
        "https://techintel.tech/lp/build-and-secure-ai-apps-and-agents-at-scale/Images/banner_1235.png",
    },
    {
      title: "A step-by-step framework to build agents",
      description:
        "A practical developer roadmap covering dynamic memory, LLM tool integration, and agent loop execution.",
      category: "Technology",
      type: "Guide",
      image:
        "https://techintel.tech/lp/a-step-by-step-framework-to-build-agents/Images/ey%20image%20.png",
    },
    {
      title: "Making AI Deliver",
      description:
        "Bridge the gap between generative AI experimentation and business ROI with proven governance practices.",
      category: "Technology",
      type: "Whitepaper",
      image:
        "https://techintel.tech/lp/Making-AI-Deliver-gdpr/Images/2026-04-democratization-in-the-ai-age-lp-360x360-2x.png",
    },
    {
      title: "State of AI Agents",
      description:
        "A global enterprise survey on AI adoption, agentic workflow architectures, and infrastructure spend.",
      category: "Technology",
      type: "eBook",
      image:
        "https://techintel.tech/lp/state-of-ai-agents-gdpr/Images/lp-headerhero-image-2026-01-eb-state-of-ai-agents.png",
    },
  ];

  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Resources"
            number="03"
            title="Resources for today's technology teams."
            description="Explore practical guides, reports and eBooks on the technologies shaping business."
          />

          <Link
            to="/resources"
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-slate-950"
          >
            View all resources
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {resources.slice(0, 3).map((resource, index) => (
            <Reveal
              key={resource.title}
              delay={index * 0.08}
              className="h-full"
            >
              <ResourceCard resource={resource} linkTo="/resources" />
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Reveal>
            <div className="flex w-full flex-col items-center rounded-3xl bg-slate-950 p-8 text-center text-white lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
                More resources
              </p>

              <h3 className="mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                Research to help you make confident technology decisions.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Find expert guides and research on AI, enterprise technology,
                and the trends shaping business.
              </p>

              <Link
                to="/resources"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold transition hover:bg-teal-400"
              >
                Browse all resources
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

export default Insights;