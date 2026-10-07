import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Search,
  FileText,
  Crosshair,
  TrendingUp,
  BarChart3,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import heroBgImage from "../assets/images/hero_teal_1.png";
import reserchImage from "../assets/cards/reserch.jfif";
import fileTextImage from "../assets/cards/file.webp";
import crosshairImage from "../assets/cards/crosshair.webp";
import trendingUpImage from "../assets/cards/treadingup.jpg";
import barChart3Image from "../assets/cards/barchart3.webp";
import radioImage from "../assets/cards/radio.webp";
import shieldCheckImage from "../assets/cards/sheidcheck.png";


const CARDS = [
  {
    icon: Search,
    tag: "Research",
    text: "Research that finds the right buyers.",
    from: "#14b8a6",
    to: "#0b3b5c",
    image: reserchImage,
  },
  {
    icon: FileText,
    tag: "Content",
    text: "Content that earns decision-maker trust.",
    from: "#06b6d4",
    to: "#173d6b",
    image: fileTextImage,
  },
  {
    icon: Crosshair,
    tag: "Targeting",
    text: "Targeting precise enough to skip the noise.",
    from: "#34d399",
    to: "#0f4c5c",
    image: crosshairImage,
  },
  {
    icon: TrendingUp,
    tag: "Pipeline",
    text: "Pipeline you can trace, not just count.",
    from: "#2dd4bf",
    to: "#1b3a6b",
    image: trendingUpImage,
  },
  {
    icon: BarChart3,
    tag: "Insights",
    text: "Reporting that ties every campaign to revenue.",
    from: "#22d3ee",
    to: "#0f3d3e",
    image: barChart3Image,
  },
  {
    icon: Radio,
    tag: "Media",
    text: "Media engines that reach verified audiences.",
    from: "#5eead4",
    to: "#12456b",
    image: radioImage,
  },
  {
    icon: ShieldCheck,
    tag: "Authority",
    text: "Thought leadership buyers actually read.",
    from: "#10b981",
    to: "#0d3b56",
    image: shieldCheckImage,
  },
];

const SLIDE_MS = 3200;

const STATEMENT =
  "We transform complex B2B technology offerings into scalable pipeline through research-backed content, high-precision decision-maker targeting, and full-funnel execution.";
const WORDS = STATEMENT.split(" ");

const REVEAL_START = 0.22;
const REVEAL_END = 0.88; 
const WORD_SPAN = 0.035; 

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1 fade-out
  const heroOpacity = useTransform(scrollYProgress, [0.04, 0.17], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.04, 0.17], [0, -30]);
  const heroDisplay = useTransform(scrollYProgress, (v) =>
    v >= 0.18 ? "none" : "flex"
  );

  // Gradually dim the hero image as the statement comes into focus.
  const bgDimOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 1],
    [0, 0.62, 0.62]
  );

  // Bring the statement in after the headline and cards begin fading away.
  const statementOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.24, 1],
    [0, 1, 1]
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10 h-[220vh] bg-[#030812] text-white select-none"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* BACKGROUND (static: nothing here reacts to the mouse) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-95"
            style={{ backgroundImage: `url(${heroBgImage})` }}
          />
          <motion.div
            style={{ opacity: bgDimOpacity }}
            className="absolute inset-0 bg-[#020b18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030812]/20 via-transparent to-[#030812]/45" />
        </div>

        {/* Ambient dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* SECTION 1: CENTERED HEADLINE */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, display: heroDisplay }}
          className="absolute inset-x-0 top-0 z-10 mx-auto w-full max-w-5xl flex-col items-center px-6 pt-24 text-center sm:pt-28 lg:pt-32"
        >
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-teal-300/30 bg-teal-950/40 px-4 py-2 backdrop-blur-md">
            {/* <Sparkles size={14} className="animate-pulse text-teal-300" /> */}
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-200">
              Demand Generation Engine
            </span>
          </div>

          <h1 className="text-[clamp(2rem,min(6vw,8.2vh),4.5rem)] font-black leading-[1.08] tracking-tight text-white">
            Architecting demand for{" "}
            <span className="bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(45,212,191,0.35)]">
              enterprise tech leaders.
            </span>
          </h1>

          {/* hidden on short screens so the slider never collides with it */}
          <p className="mt-5 hidden max-w-2xl text-base font-normal leading-relaxed text-slate-100 sm:text-lg [@media(min-height:740px)]:block">
            We connect high-growth B2B technology brands with verified
            decision-makers through high-precision research, authority content,
            and targeted media engines.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/resources"
              className="group inline-flex items-center gap-2.5 rounded-full bg-teal-300 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(94,234,212,0.45)] transition-all hover:bg-teal-200"
            >
              Explore Resources
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* CARD SLIDER (bottom, cards bleed off the sides and bottom) */}
        <motion.div
          style={{ opacity: heroOpacity, display: heroDisplay }}
          className="absolute inset-x-0 bottom-0 z-10 h-[36vh]"
        >
          <CardSlider />
        </motion.div>

        {/* SECTION 2: STATEMENT */}
        <motion.div
          style={{ opacity: statementOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12"
        >
          <div className="w-full max-w-[1400px] text-center">
            <h2 className="flex flex-wrap justify-center text-[clamp(1.5rem,min(5.2vw,7.6vh),4.75rem)] font-semibold leading-[1.15] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              {WORDS.map((word, i) => {
                const start =
                  REVEAL_START + (i / WORDS.length) * (REVEAL_END - REVEAL_START);
                return (
                  <Word
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    start={start}
                    end={start + WORD_SPAN}
                  />
                );
              })}
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Word({ word, progress, start, end }) {
  const range = useMemo(() => [start, end], [start, end]);
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#64748b", "#ffffff"]);

  const lower = word.toLowerCase();
  const isHighlight =
    lower.includes("pipeline") ||
    lower.includes("decision-maker") ||
    lower.includes("high-precision");

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.25em] inline-block"
    >
      <span
        className={
          isHighlight
            ? "font-bold text-teal-300 underline decoration-teal-400/50 underline-offset-8 drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
            : ""
        }
      >
        {word}
      </span>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* CardSlider: centered coverflow-style carousel                       */
/* - center card is biggest, side cards shrink, drop and tilt          */
/* - auto-plays, pauses on hover, click a card or drag to move         */
/* ------------------------------------------------------------------ */
function CardSlider() {
  const N = CARDS.length;
  const half = Math.floor(N / 2);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(240);

  // card width from screen size (only updates on resize, never on mouse move)
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const h = window.innerHeight * 0.4;
      setCardW(vw < 768 ? vw * 0.56 : Math.min(vw * 0.2, h * 0.8, 300));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // auto-play
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % N), SLIDE_MS);
    return () => clearTimeout(id);
  }, [active, paused, N]);

  // remember previous offsets so a card that wraps from one end to the other
  // jumps instantly instead of flying across the whole row
  const prevOffsets = useRef([]);
  const offsets = CARDS.map(
    (_, i) => ((i - active + N + half) % N) - half
  );
  useEffect(() => {
    prevOffsets.current = offsets;
  });

  const go = (dir) => setActive((a) => (a + dir + N) % N);

  return (
    <div
      className="relative h-full w-full [perspective:1400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        {CARDS.map((card, i) => {
          const off = offsets[i];
          const abs = Math.abs(off);
          const prev = prevOffsets.current[i];
          const wrapped = prev !== undefined && Math.abs(off - prev) > half;
          const Icon = card.icon;

          return (
            <motion.button
              key={card.tag}
              type="button"
              aria-label={card.tag}
              onClick={() => setActive(i)}
              initial={false}
              animate={{
                x: off * cardW * 0.86,
                y: abs * 26,
                scale: 1 - abs * 0.09,
                rotateY: -off * 13,
                opacity: 1 - abs * 0.13,
              }}
              transition={
                wrapped
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 110, damping: 20 }
              }
              style={{
                width: cardW,
                marginLeft: -cardW / 2,
                left: "50%",
                height: "98%",
                zIndex: 20 - abs,
                transformOrigin: "50% 0%",
              }}
              className="absolute top-0 block text-left"
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/25 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)]"
                style={{
                  background: `linear-gradient(160deg, ${card.from}, ${card.to})`,
                }}
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.tag}
                    draggable={false}
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-cover"
                    // keeps faces in frame; change per card with `imagePosition`
                    style={{ objectPosition: card.imagePosition || "center 25%" }}
                  />
                ) : (
                  <>
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
                    <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-black/25 blur-2xl" />
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />
                    <div className="absolute inset-x-0 top-[16%] flex justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/35 bg-white/15 text-white shadow-lg">
                        <Icon size={38} strokeWidth={1.5} />
                      </div>
                    </div>
                  </>
                )}

                {/* text scrim */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-100">
                    {card.tag}
                  </span>
                  <p className="mt-2 text-[15px] font-semibold leading-snug text-white">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}