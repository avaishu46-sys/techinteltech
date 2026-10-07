import { useState } from "react";
import {
  Search,
  Users,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

/* One shared teal theme for all four pillars */
const THEME = {
  accent: "from-teal-500 to-emerald-500",
  accentText: "text-teal-600",
  badgeBg: "bg-teal-50 text-teal-700 border-teal-200",
};

const points = [
  {
    icon: Search,
    number: "01",
    title: "Research First",
    tagline: "Market & Tech Intelligence",
    description:
      "We leverage deep technical market insights to uncover exactly what your target B2B audience needs before launching a single campaign.",
    stat: "85%",
    statLabel: "Higher Audience Intent",
    highlights: [
      "Buyer Intent & Demand Analysis",
      "Competitor Tech-Stack Benchmarking",
      "ICP & Decision-Maker Mapping",
    ],
  },
  {
    icon: Users,
    number: "02",
    title: "Audience Focus",
    tagline: "Precision Decision-Maker Reach",
    description:
      "We help tech brands bypass generic volume noise and connect directly with verified enterprise decision-makers and C-suite stakeholders.",
    stat: "3.2x",
    statLabel: "Target Account Conversion",
    highlights: [
      "Account-Based Target Lists (ABM)",
      "Verified C-Suite Personas",
      "High-Precision Demand Gen",
    ],
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Content Connects",
    tagline: "High-Impact Value Messaging",
    description:
      "We translate complex cloud, SaaS, and engineering propositions into compelling, high-converting content experiences.",
    stat: "64%",
    statLabel: "Increased Engagement",
    highlights: [
      "Technical Whitepapers & Guides",
      "Interactive Product Demos",
      "Conversion-Focused Copywriting",
    ],
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Built for Impact",
    tagline: "Measurable Pipeline Engine",
    description:
      "Every campaign asset and distribution channel is engineered for measurable engagement, qualified pipeline, and trackable ROI.",
    stat: "4.8x",
    statLabel: "Average Campaign ROI",
    highlights: [
      "Pipeline Velocity Acceleration",
      "Multi-Touch Revenue Attribution",
      "Scalable Lead Nurturing Engines",
    ],
  },
];

function WhyTechIntel() {
  const [activeTab, setActiveTab] = useState(0);

  const current = points[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 text-slate-900 lg:py-32">
      {/* Background Lighting & Grid Texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            label="Why TechIntel"
            number="01"
            title="Technology marketing built around relevance."
            description="B2B technology buyers look for actionable insight and credible solutions. Here is how our methodology delivers both."
          />
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {points.map((item, idx) => {
              const TabIcon = item.icon;
              const isActive = activeTab === idx;

              return (
                <button
                  key={item.number}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "scale-105 border-slate-950 bg-slate-950 text-white shadow-xl shadow-slate-950/10"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100/80"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-teal-500 text-slate-950"
                        : "bg-slate-100 text-slate-500 group-hover:text-slate-900"
                    }`}
                  >
                    <TabIcon size={15} />
                  </div>
                  <span>{item.title}</span>
                  <span
                    className={`ml-1 text-[10px] font-black tracking-widest ${
                      isActive ? "text-slate-400" : "text-slate-300"
                    }`}
                  >
                    {item.number}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* MAIN EXECUTIVE DISPLAY CONSOLE */}
        <Reveal delay={0.2}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60 backdrop-blur-xl">
            {/* Top Gradient Accent Bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${THEME.accent}`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid gap-12 p-8 lg:grid-cols-12 lg:items-center lg:p-12"
              >
                {/* LEFT: CORE PILLAR INFORMATION (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold ${THEME.badgeBg}`}
                    >
                      <CurrentIcon size={15} />
                      <span>Pillar {current.number}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Methodology Core
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    {current.title}
                  </h3>
                  <p className={`mt-1 text-base font-bold ${THEME.accentText}`}>
                    {current.tagline}
                  </p>

                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    {current.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-1">
                    {current.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-sm font-semibold text-slate-800"
                      >
                        <CheckCircle2
                          size={18}
                          className={`flex-shrink-0 ${THEME.accentText}`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: IMPACT METRIC CARD (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-xl">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Proven Metric
                      </span>
                      <BarChart3 size={18} className="text-teal-400" />
                    </div>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-5xl font-black text-white sm:text-6xl">
                        {current.stat}
                      </span>
                      <span className="text-xs font-semibold text-teal-400">
                        Impact
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-medium text-slate-300">
                      {current.statLabel}
                    </p>

                    <div className="mt-8 border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span>Strategy Execution</span>
                        <span className="text-teal-400">100% Alignment</span>
                      </div>
                      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${THEME.accent}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyTechIntel;