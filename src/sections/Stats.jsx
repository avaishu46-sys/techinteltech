import React, { useEffect, useRef, useState } from "react";
import Reveal from "../components/Reveal";

// Helper CountUp Component with IntersectionObserver / Reset support
const CountUpAnimated = ({ end, prefix = "", suffix = "", duration = 2000, isVisible, compact = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutExpo) for smooth slowdown towards the end
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, isVisible]);

  // Keep the growing value compact so it stays inside its grid column.
  const formattedCount = compact
    ? count >= 1000000
      ? `${Math.floor(count / 1000000)}M`
      : count >= 1000
        ? `${Math.floor(count / 1000)}k`
        : count.toLocaleString()
    : count.toLocaleString();

  return (
    <span>
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
};

function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger count when section is in view, reset when it leaves
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 } // Triggers when 25% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      value: 1000000,
      suffix: "+",
      label: "Technology professionals reached",
      formattedDisplay: true, // Use 1M+ or full number formatted
    },
    {
      value: 500,
      suffix: "+",
      label: "Brands and campaigns supported",
    },
    {
      value: 20,
      suffix: "+",
      label: "Technology categories covered",
    },
    {
      value: 10,
      suffix: "+",
      label: "Years of industry experience",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-[#02181d] py-20 text-white lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.16)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:items-center lg:gap-14">
          <div className="border-b border-white/15 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-400">
              Our impact
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Built for measurable reach
            </h2>
            <Reveal>
              <div className="mt-8 border-l-2 border-teal-400 pl-5">
                <div className="whitespace-nowrap text-6xl font-extrabold tracking-tight text-white tabular-nums sm:text-7xl lg:text-6xl xl:text-8xl">
                  <CountUpAnimated
                    end={stats[0].value}
                    suffix={stats[0].suffix}
                    isVisible={isVisible}
                    duration={2200}
                    compact={stats[0].formattedDisplay}
                  />
                </div>
                <p className="mt-2 max-w-xs text-sm font-medium leading-6 text-slate-400">
                  {stats[0].label}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 sm:gap-y-0">
            {stats.slice(1).map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div
                  className={`min-w-0 py-1 ${
                    index === 1
                      ? "border-l border-white/15 pl-4 sm:pl-6 lg:pl-8"
                      : index === 2
                        ? "sm:border-l sm:border-white/15 sm:pl-6 lg:pl-8"
                        : ""
                  }`}
                >
                  <div className="whitespace-nowrap text-4xl font-extrabold tracking-tight text-teal-400 tabular-nums sm:text-5xl">
                    <CountUpAnimated
                      end={stat.value}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                      duration={2200}
                    />
                  </div>
                  <p className="mt-3 max-w-40 text-xs font-medium leading-5 text-slate-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;