import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ---------------------------------------------------------------
   Card ring: 12 tilted cards that spin in a ring, fold into a fan
   behind the centre button, then open back into the ring.
   Cards only: the centre "Let's Talk" button lives in the parent.
   The ring always scales to fit its container, so it never spills
   out and never overlaps other content when the layout wraps.
   --------------------------------------------------------------- */

const STAGE = 380; // design size (px); scaled to fit the container
const CARD_W = 112;
const CARD_H = 70;
const RING_R = 125; // centre -> card centre in the ring
const FAN_R = 100; // centre -> card centre in the fan
const TILT = 58; // card turn in the ring (deg)

const CYCLE = 14; // seconds per loop
// ring spins -> fold to fan -> hold -> open to ring -> ring spins
const TIMES = [0, 0.5, 0.6, 0.68, 0.78, 1];
const EASE = ["linear", "easeInOut", "linear", "easeInOut", "linear"];
const SPIN_AT_FOLD = 250;
const SPIN_TOTAL = 360; // full turn per loop = seamless repeat

const CARDS = [
  { label: "Research", face: "from-white to-teal-100", ink: "text-slate-900" },
  { label: "Content", face: "from-teal-300 to-teal-500", ink: "text-slate-950" },
  { label: "Demand Gen", face: "from-slate-800 to-slate-950", ink: "text-white" },
  { label: "Targeting", face: "from-emerald-200 to-teal-300", ink: "text-slate-900" },
  { label: "Pipeline", face: "from-white to-slate-200", ink: "text-slate-900" },
  { label: "Insights", face: "from-teal-700 to-teal-900", ink: "text-white" },
  { label: "Strategy", face: "from-teal-100 to-white", ink: "text-slate-900" },
  { label: "Outreach", face: "from-slate-700 to-slate-900", ink: "text-white" },
  { label: "ABM", face: "from-teal-400 to-emerald-500", ink: "text-slate-950" },
  { label: "Analytics", face: "from-white to-emerald-100", ink: "text-slate-900" },
  { label: "Growth", face: "from-teal-600 to-teal-800", ink: "text-white" },
  { label: "Full-funnel", face: "from-slate-200 to-white", ink: "text-slate-900" },
];

const N = CARDS.length;

function CardFace({ label, face, ink }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br ${face} p-2.5 shadow-lg shadow-slate-950/25`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0" />
      <div className="relative h-4 w-5 rounded-[4px] bg-gradient-to-br from-amber-200 to-amber-400 ring-1 ring-black/10" />
      <p
        className={`relative mt-3 text-[8px] font-bold uppercase tracking-[0.18em] ${ink}`}
      >
        {label}
      </p>
      <div className="absolute bottom-2 right-2.5 flex">
        <span className="h-3 w-3 rounded-full bg-teal-500/80" />
        <span className="-ml-1.5 h-3 w-3 rounded-full bg-slate-950/70" />
      </div>
    </div>
  );
}

function RingCard({ card, index }) {
  const ringAngle = index * (360 / N) - 180;
  const fanAngle = ringAngle * 0.33;
  const foldedAngle = fanAngle - SPIN_AT_FOLD; // cancel the ring's spin
  const depth = index * 1.2;
  const delay = index * 0.04; // small ripple around the ring

  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
      initial={{ rotate: ringAngle }}
      animate={{
        rotate: [ringAngle, ringAngle, foldedAngle, foldedAngle, ringAngle, ringAngle],
      }}
      transition={{
        duration: CYCLE,
        times: TIMES,
        ease: EASE,
        repeat: Infinity,
        delay,
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: CARD_W,
          height: CARD_H,
          marginLeft: -CARD_W / 2,
          marginTop: -CARD_H / 2,
        }}
        initial={{ y: -RING_R, rotateY: TILT, z: 0 }}
        animate={{
          y: [-RING_R, -RING_R, -FAN_R, -FAN_R, -RING_R, -RING_R],
          rotateY: [TILT, TILT, 0, 0, TILT, TILT],
          z: [0, 0, depth, depth, 0, 0],
        }}
        transition={{
          duration: CYCLE,
          times: TIMES,
          ease: EASE,
          repeat: Infinity,
          delay,
        }}
      >
        <CardFace {...card} />
      </motion.div>
    </motion.div>
  );
}

function CardRing() {
  const reduceMotion = useReducedMotion();
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.8);

  // scale the 380px stage to exactly fit whatever size the parent gives us
  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / STAGE);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: STAGE,
          height: STAGE,
          marginLeft: -STAGE / 2,
          marginTop: -STAGE / 2,
          transform: `scale(${scale})`,
          perspective: 900,
        }}
      >
        {reduceMotion ? (
          // still ring for people who prefer reduced motion
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {CARDS.map((card, i) => (
              <div
                key={card.label}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${i * (360 / N)}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    transform: `translateY(${-RING_R}px) rotateY(${TILT}deg)`,
                  }}
                >
                  <CardFace {...card} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotate: 0 }}
            animate={{
              rotate: [
                0,
                SPIN_AT_FOLD,
                SPIN_AT_FOLD,
                SPIN_AT_FOLD,
                SPIN_AT_FOLD,
                SPIN_TOTAL,
              ],
            }}
            transition={{
              duration: CYCLE,
              times: TIMES,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {CARDS.map((card, i) => (
              <RingCard key={card.label} card={card} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CardRing;