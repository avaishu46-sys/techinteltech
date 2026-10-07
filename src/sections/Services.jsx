import { useState } from "react";
import {
  PenTool,
  Megaphone,
  Target,
  BarChart3,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const services = [
  {
    number: "01",
    icon: PenTool,
    title: "Content & Editorial",
    description:
      "Create technology content that educates audiences, builds authority and supports the buyer journey.",
    points: ["Research-backed articles", "Editorial calendars", "Thought-leadership ghostwriting"],
  },
  {
    number: "02",
    icon: Megaphone,
    title: "Advertorial & Media",
    description:
      "Position your brand through relevant media experiences designed to reach the audiences you want.",
    points: ["Sponsored placements", "Native brand storytelling", "Media partnerships"],
  },
  {
    number: "03",
    icon: Target,
    title: "Demand Generation",
    description:
      "Build campaigns that connect your technology proposition with relevant business decision-makers.",
    points: ["Intent-based targeting", "Multi-channel campaigns", "Lead qualification"],
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Marketing Intelligence",
    description:
      "Use research, audience insights and campaign data to make smarter marketing decisions.",
    points: ["Audience research", "Campaign analytics", "Competitive benchmarking"],
  },
];

function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const Icon = current.icon;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="What we do"
            number="02"
            title="From technology story to market impact."
            description="A connected set of capabilities designed to help B2B technology brands communicate, engage and grow."
          />

          <Link
            to="/services"
            className="group flex w-fit items-center gap-2 text-sm font-semibold text-slate-950"
          >
            <span className="relative">
              View all information
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-500 transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Left: selectable list */}
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <li key={service.number}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group relative flex w-full items-center gap-5 py-6 text-left outline-none"
                  >
                    {/* active indicator bar */}
                    <span
                      className={`absolute left-0 top-0 h-full w-[3px] rounded-full bg-teal-500 transition-transform duration-300 ease-out ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                      style={{ transformOrigin: "center" }}
                      aria-hidden="true"
                    />

                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        isActive ? "text-teal-500" : "text-slate-300"
                      }`}
                    >
                      {service.number}
                    </span>

                    <span
                      className={`text-xl font-bold transition-colors duration-300 sm:text-2xl ${
                        isActive ? "text-slate-950" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {service.title}
                    </span>

                    <ArrowRight
                      size={18}
                      className={`ml-auto shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-teal-500 opacity-100"
                          : "-translate-x-2 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right: preview panel for the active service */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-10 text-white lg:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500 text-slate-950">
                  <Icon size={24} />
                </div>

                <h3 className="mt-8 text-3xl font-bold sm:text-4xl">{current.title}</h3>
                <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-300">
                  {current.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {current.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-slate-200">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/about"
                  className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-500 hover:text-white"
                >
                  Learn more
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* progress dots */}
            <div className="relative mt-12 flex items-center gap-2">
              {services.map((service, i) => (
                <button
                  key={service.number}
                  type="button"
                  aria-label={`Show ${service.title}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-teal-500" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;