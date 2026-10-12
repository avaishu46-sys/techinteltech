import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Search,
  FileText,
  Crosshair,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const CAPABILITIES = [
  { icon: Search, label: "Research" },
  { icon: FileText, label: "Content" },
  { icon: Crosshair, label: "Demand generation" },
];

const MARQUEE = [
  "Research",
  "Content",
  "Demand Generation",
  "Decision-Maker Targeting",
  "Full-Funnel Execution",
  "Pipeline Growth",
];

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#14b8a6_0%,#0d9488_55%,#0f766e_100%)] text-white">
      {/* ---------------- BACKGROUND ---------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* grid, faded out toward the edges */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)",
          }}
        />

        {/* breathing glows */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-white/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-emerald-900/50 blur-3xl"
        />

        {/* rotating outline rings (kept from the original) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/25"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-white/15"
        />
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT: copy */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
            >
              <Sparkles size={14} className="animate-pulse" />
              Let's build what's next
            </motion.div>

            <motion.h2
              variants={item}
              className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]"
            >
              Your next technology marketing{" "}
              <span className="relative inline-block text-slate-950">
                story
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  fill="none"
                >
                  <motion.path
                    d="M2 8 C 50 2, 110 12, 198 4"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                  />
                </svg>
              </span>{" "}
              starts here.
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-base leading-7 text-white/85"
            >
              Tell us what you're trying to achieve and let's explore how
              research, content and demand generation can help.
            </motion.p>

            {/* capability pills */}
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
              {CAPABILITIES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md"
                >
                  <Icon size={15} className="text-white/90" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* buttons */}
            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(2,6,23,0.6)] transition hover:bg-white hover:text-slate-950"
              >
                {/* shimmer sweep */}
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[420%]" />
                <span className="relative">Let's Talk</span>
                <ArrowUpRight
                  size={18}
                  className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                to="/resources"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold transition hover:bg-white/15"
              >
                Explore Resources
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: orbit graphic with rotating-text CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-[300px] lg:max-w-[340px]"
          >
            <OrbitGraphic />

            {/* center button */}
            <Link
              to="/contact"
              aria-label="Let's talk"
              className="group absolute inset-[29%] flex flex-col items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_25px_60px_-10px_rgba(2,6,23,0.7)] transition duration-300 hover:scale-105 hover:bg-white hover:text-slate-950"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2.8s]" />
              <span className="relative text-lg font-bold">Let's Talk</span>
              <ArrowUpRight
                size={26}
                className="relative mt-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ---------------- MARQUEE STRIP ---------------- */}
      <div className="relative border-t border-white/20 bg-black/10 py-3.5 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 whitespace-nowrap"
          >
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={i}
                className="mx-6 inline-flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                {t}
                <Sparkles size={13} className="text-white/60" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OrbitGraphic: rings, orbiting dots and rotating circular text       */
/* ------------------------------------------------------------------ */
function OrbitGraphic() {
  const spin = (duration, reverse = false) => ({
    animate: { rotate: reverse ? -360 : 360 },
    transition: { duration, repeat: Infinity, ease: "linear" },
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <path
          id="ctaCirclePath"
          d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
        />
        <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#ctaGlow)" />

      {/* outer dashed ring + dots (slow) */}
      <motion.g {...spin(60)} style={{ originX: 0.5, originY: 0.5 }}>
        <circle
          cx="200"
          cy="200"
          r="190"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
          strokeDasharray="4 10"
        />
        <circle cx="200" cy="10" r="6" fill="#fff" />
        <circle cx="390" cy="200" r="4" fill="rgba(255,255,255,0.7)" />
        <circle cx="200" cy="390" r="6" fill="#fff" />
        <circle cx="10" cy="200" r="4" fill="rgba(255,255,255,0.7)" />
      </motion.g>

      {/* circular text ring */}
      <motion.g {...spin(28)} style={{ originX: 0.5, originY: 0.5 }}>
        {/* invisible circle keeps the rotation centred on the graphic */}
        <circle cx="200" cy="200" r="165" stroke="none" fill="none" />
        <text
          fill="#fff"
          fontSize="17"
          fontWeight="700"
          letterSpacing="3"
          style={{ textTransform: "uppercase" }}
        >
          <textPath
            href="#ctaCirclePath"
            textLength="935"
            lengthAdjust="spacing"
          >
            {"Let's build what's next • Research • Content • Demand generation • "}
          </textPath>
        </text>
      </motion.g>

      {/* inner ring + orbiting dot (reverse) */}
      <motion.g {...spin(22, true)} style={{ originX: 0.5, originY: 0.5 }}>
        <circle
          cx="200"
          cy="200"
          r="116"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
        <circle cx="200" cy="84" r="7" fill="#0f172a" />
        <circle cx="316" cy="200" r="4" fill="#fff" />
      </motion.g>
    </svg>
  );
}

export default FinalCTA;


// import {
//   ArrowUpRight,
//   ArrowRight,
//   Sparkles,
//   Search,
//   FileText,
//   Crosshair,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import CardRing from "../components/CardRing";

// const container = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.12 } },
// };

// const item = {
//   hidden: { opacity: 0, y: 28 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const CAPABILITIES = [
//   { icon: Search, label: "Research" },
//   { icon: FileText, label: "Content" },
//   { icon: Crosshair, label: "Demand generation" },
// ];

// const MARQUEE = [
//   "Research",
//   "Content",
//   "Demand Generation",
//   "Decision-Maker Targeting",
//   "Full-Funnel Execution",
//   "Pipeline Growth",
// ];

// function FinalCTA() {
//   return (
//     <section className="relative overflow-hidden bg-[linear-gradient(135deg,#14b8a6_0%,#0d9488_55%,#0f766e_100%)] text-white">
//       {/* ---------------- BACKGROUND ---------------- */}
//       <div aria-hidden className="pointer-events-none absolute inset-0">
//         {/* grid, faded out toward the edges */}
//         <div
//           className="absolute inset-0 opacity-30"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
//             backgroundSize: "64px 64px",
//             maskImage:
//               "radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)",
//             WebkitMaskImage:
//               "radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)",
//           }}
//         />

//         {/* breathing glows */}
//         <motion.div
//           animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
//           transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-white/30 blur-3xl"
//         />
//         <motion.div
//           animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.4, 0.25] }}
//           transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-emerald-900/50 blur-3xl"
//         />

//         {/* rotating outline rings (kept from the original) */}
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//           className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/25"
//         />
//         <motion.div
//           animate={{ rotate: -360 }}
//           transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-white/15"
//         />
//       </div>

//       {/* ---------------- CONTENT ---------------- */}
//       <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-8 lg:pb-12 lg:pt-16">
//         <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
//           {/* LEFT: copy */}
//           <motion.div
//             variants={container}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <motion.div
//               variants={item}
//               className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
//             >
//               <Sparkles size={14} className="animate-pulse" />
//               Let's build what's next
//             </motion.div>

//             <motion.h2
//               variants={item}
//               className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.6rem]"
//             >
//               Your next technology marketing{" "}
//               <span className="relative inline-block text-slate-950">
//                 story
//                 <svg
//                   aria-hidden
//                   viewBox="0 0 200 12"
//                   preserveAspectRatio="none"
//                   className="absolute -bottom-1 left-0 h-3 w-full"
//                   fill="none"
//                 >
//                   <motion.path
//                     d="M2 8 C 50 2, 110 12, 198 4"
//                     stroke="white"
//                     strokeWidth="4"
//                     strokeLinecap="round"
//                     initial={{ pathLength: 0 }}
//                     whileInView={{ pathLength: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
//                   />
//                 </svg>
//               </span>{" "}
//               starts here.
//             </motion.h2>

//             <motion.p
//               variants={item}
//               className="mt-5 max-w-xl text-base leading-7 text-white/85"
//             >
//               Tell us what you're trying to achieve and let's explore how
//               research, content and demand generation can help.
//             </motion.p>

//             {/* capability pills */}
//             <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
//               {CAPABILITIES.map(({ icon: Icon, label }) => (
//                 <span
//                   key={label}
//                   className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md"
//                 >
//                   <Icon size={15} className="text-white/90" />
//                   {label}
//                 </span>
//               ))}
//             </motion.div>

//             {/* buttons */}
//             <motion.div
//               variants={item}
//               className="mt-7 flex flex-wrap items-center gap-4"
//             >
//               <Link
//                 to="/contact"
//                 className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-12px_rgba(2,6,23,0.6)] transition hover:bg-white hover:text-slate-950"
//               >
//                 {/* shimmer sweep */}
//                 <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[420%]" />
//                 <span className="relative">Let's Talk</span>
//                 <ArrowUpRight
//                   size={18}
//                   className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//                 />
//               </Link>

//               <Link
//                 to="/resources"
//                 className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold transition hover:bg-white/15"
//               >
//                 Explore Resources
//                 <ArrowRight
//                   size={17}
//                   className="transition-transform group-hover:translate-x-1"
//                 />
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* RIGHT: card ring animation with the Let's Talk button in the centre */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
//             className="relative isolate mx-auto aspect-square w-full max-w-[300px] lg:max-w-[340px]"
//           >
//             <CardRing />

//             {/* center button */}
//             <Link
//               to="/contact"
//               aria-label="Let's talk"
//               className="group absolute inset-[29%] z-10 flex flex-col items-center justify-center rounded-full bg-slate-950 text-white shadow-[0_25px_60px_-10px_rgba(2,6,23,0.7)] transition duration-300 hover:scale-105 hover:bg-white hover:text-slate-950"
//             >
//               <span className="absolute inset-0 animate-ping rounded-full bg-white/20 [animation-duration:2.8s]" />
//               <span className="relative text-lg font-bold">Let's Talk</span>
//               <ArrowUpRight
//                 size={26}
//                 className="relative mt-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
//               />
//             </Link>
//           </motion.div>
//         </div>
//       </div>

//       {/* ---------------- MARQUEE STRIP ---------------- */}
//       <div className="relative border-t border-white/20 bg-black/10 py-3.5 backdrop-blur-sm">
//         <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
//           <motion.div
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
//             className="flex shrink-0 whitespace-nowrap"
//           >
//             {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
//               <span
//                 key={i}
//                 className="mx-6 inline-flex items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/80"
//               >
//                 {t}
//                 <Sparkles size={13} className="text-white/60" />
//               </span>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FinalCTA;