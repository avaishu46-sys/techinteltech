import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Target,
  Users,
  Lightbulb,
  Globe2,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import SectionLabel from "../components/SectionLabel";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";

function About() {
  const values = [
    {
      icon: Target,
      title: "Audience First",
      description:
        "We start with the people you're trying to reach and build marketing experiences around their needs.",
    },
    {
      icon: Lightbulb,
      title: "Useful Ideas",
      description:
        "We believe technology marketing should educate, inform and create genuine value for audiences.",
    },
    {
      icon: Users,
      title: "Connected Thinking",
      description:
        "Research, content, media and demand generation work better when they're connected.",
    },
    {
      icon: Globe2,
      title: "Technology Focus",
      description:
        "We understand the complexity of B2B technology categories and the audiences within them.",
    },
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Precision Targeting",
      desc: "Reach exact buyer personas across niche tech verticals.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Intelligence",
      desc: "Data-backed research and verified market analysis.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Impact",
      desc: "Demand gen strategies linked directly to pipeline growth.",
    },
  ];

  return (
    <main className="bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#02181d] pt-36 pb-20 text-white lg:pt-40 lg:pb-28">
        {/* Radial Teal Gradient Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b4f4a_0%,#052a2a_50%,#021416_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.25)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.2)_0%,transparent_60%)] pointer-events-none" />

        {/* Floating Blurred Orbs */}
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-400/20 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/60 px-3.5 py-1 text-xs font-semibold text-teal-300 mb-6 backdrop-blur-md">
                  {/* <Sparkles className="h-3.5 w-3.5 text-teal-400" /> */}
                  <span>About TechIntel</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                  Our Mission & Vision
                </p>

                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.08]">
                  Making technology{" "}
                  <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent">
                    easier to discover.
                  </span>
                </h1>

                <p className="mt-6 text-base text-slate-300 leading-relaxed max-w-2xl sm:text-lg">
                  TechIntel brings together technology research, content, audience intelligence, and marketing execution to help B2B technology brands connect with the right decision-makers.
                </p>
              </motion.div>
            </div>

            {/* Right Side Glassmorphism Banner Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border border-teal-500/25 bg-slate-900/60 p-7 backdrop-blur-md shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300/80 mb-6 flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-teal-400" /> Why TechIntel Matters
                </h2>

                <div className="space-y-4">
                  {highlights.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3.5 rounded-2xl border border-teal-500/15 bg-slate-950/70 p-3.5 transition duration-200 hover:border-teal-400/40"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">
                          <IconComp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{item.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8 items-center">
          <Reveal>
            <div>
              <SectionLabel>What we believe</SectionLabel>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-tight">
                Technology marketing works better when it starts with understanding.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p>
                Technology buyers have more information available to them than ever before. The challenge isn't simply getting noticed. It's becoming useful and relevant when a buyer is researching a problem or evaluating a solution.
              </p>
              <p>
                That's the space TechIntel operates in. We help technology companies communicate their value through research, editorial, media, and demand-generation experiences.
              </p>
              <p>
                Our approach combines audience understanding with practical marketing execution, helping brands move from initial awareness to long-term, meaningful engagement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="bg-slate-50 py-24 lg:py-32 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Our approach"
            title="Four principles behind our work."
            description="The way we think about technology marketing influences everything from initial audience research to final campaign execution."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:border-teal-400 hover:shadow-xl"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition duration-300 group-hover:bg-teal-500 group-hover:text-white">
                        <Icon size={22} />
                      </div>

                      <h3 className="mt-6 text-lg font-bold text-slate-950 group-hover:text-teal-600 transition duration-200">
                        {value.title}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                        {value.description}
                      </p>
                    </div>

                    {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition duration-200">
                      <span>Learn more</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div> */}
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION (currently disabled) ================= */}
      {/* <section className="relative overflow-hidden bg-[#02181d] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b4f4a_0%,#021416_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 text-center md:text-left">
            <div className="rounded-3xl border border-teal-500/20 bg-slate-900/40 p-8 backdrop-blur-md shadow-xl transition duration-300 hover:border-teal-400/40">
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                <CountUp end={1000000} suffix="+" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Technology Professionals Reached
              </p>
            </div>

            <div className="rounded-3xl border border-teal-500/20 bg-slate-900/40 p-8 backdrop-blur-md shadow-xl transition duration-300 hover:border-teal-400/40">
              <div className="text-4xl sm:text-5xl font-extrabold text-teal-400">
                <CountUp end={500} suffix="+" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Brands & Campaigns Supported
              </p>
            </div>

            <div className="rounded-3xl border border-teal-500/20 bg-slate-900/40 p-8 backdrop-blur-md shadow-xl transition duration-300 hover:border-teal-400/40">
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                <CountUp end={20} suffix="+" />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Technology Categories
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ================= CALL TO ACTION ================= */}
      <section className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                Let's create something meaningful.
              </h2>
              <p className="mt-2.5 max-w-xl text-sm leading-6 text-white/90 font-medium">
                Tell us about your technology marketing challenge and explore how our insights can drive growth for your brand.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-xs font-bold text-white shadow-xl transition-all duration-300 hover:bg-slate-900 hover:scale-105"
            >
              Start a conversation
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;