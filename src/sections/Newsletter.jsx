// import { useState } from "react";
// import { ArrowRight, CheckCircle, Mail, Sparkles, Users, Bell, Check } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import SectionLabel from "../components/SectionLabel";

// const TOPICS = [
//   "B2B Marketing Strategy",
//   "AI & Automation",
//   "Demand Generation",
//   "Tech Analytics",
// ];

// function Newsletter() {
//   const [email, setEmail] = useState("");
//   const [selectedTopics, setSelectedTopics] = useState(["B2B Marketing Strategy"]);
//   const [submitted, setSubmitted] = useState(false);

//   const toggleTopic = (topic) => {
//     setSelectedTopics((prev) =>
//       prev.includes(topic)
//         ? prev.filter((t) => t !== topic)
//         : [...prev, topic]
//     );
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!email) return;

//     /* 
//       Backend integration placeholder:
//       Send { email, topics: selectedTopics }
//     */

//     setSubmitted(true);
//     setEmail("");
//   };

//   return (
//     <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28 text-slate-900">
//       {/* Background Soft Glow Effects */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-teal-200/40 blur-3xl rounded-full pointer-events-none" />
//       <div className="absolute top-10 right-10 w-72 h-72 bg-sky-200/30 blur-2xl rounded-full pointer-events-none" />

//       <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
//         {/* Header Block */}
//         <div className="text-center max-w-3xl mx-auto">
//           <div className="flex justify-center">
//             <SectionLabel>Curated Intelligence</SectionLabel>
//           </div>
//           <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
//             Tailor your technology insights.
//           </h2>
//           <p className="mt-4 text-base leading-relaxed text-slate-600">
//             Select the topics you care about most and get actionable strategy, trends, and growth resources delivered weekly.
//           </p>
//         </div>

//         {/* Main Bento Container */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mt-12 grid gap-6 md:grid-cols-12 items-stretch"
//         >
//           {/* Bento Card 1: Main Form & Topic Selection (8 Cols) */}
//           <div className="md:col-span-8 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-8 sm:p-10 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
//             <div>
//               {/* Interactive Tag Pill Selector */}
//               <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4">
//                 1. Choose your focus areas:
//               </p>

//               <div className="flex flex-wrap gap-2.5 mb-8">
//                 {TOPICS.map((topic) => {
//                   const isSelected = selectedTopics.includes(topic);
//                   return (
//                     <motion.button
//                       key={topic}
//                       type="button"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => toggleTopic(topic)}
//                       className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
//                         isSelected
//                           ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
//                           : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200/60"
//                       }`}
//                     >
//                       {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
//                       {topic}
//                     </motion.button>
//                   );
//                 })}
//               </div>

//               {/* Form Input Section */}
//               <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
//                 2. Enter your work address:
//               </p>

//               <AnimatePresence mode="wait">
//                 {submitted ? (
//                   <motion.div
//                     key="success"
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50/80 p-4 text-sm font-medium text-teal-900"
//                   >
//                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
//                       <CheckCircle className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <p className="font-bold">Subscription confirmed!</p>
//                       <p className="text-xs text-teal-700 mt-0.5">
//                         We'll send curated insights on {selectedTopics.length} topic(s) to your inbox.
//                       </p>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
//                     <div className="relative flex-1">
//                       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
//                         <Mail className="h-5 w-5" />
//                       </div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="name@company.com"
//                         required
//                         className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-sm"
//                       />
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-teal-600 focus:outline-none"
//                     >
//                       <span>Join Free</span>
//                       <ArrowRight className="h-4 w-4" />
//                     </motion.button>
//                   </form>
//                 )}
//               </AnimatePresence>
//             </div>

//             <p className="mt-6 text-xs text-slate-400">
//               Zero spam. Unsubscribe anytime with one click.
//             </p>
//           </div>

//           {/* Bento Card 2: Social Proof & Stats (4 Cols) */}
//           <div className="md:col-span-4 flex flex-col justify-between gap-6 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-teal-500 to-teal-700 p-8 text-white shadow-xl shadow-teal-600/20">
//             <div>
//               <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-6">
//                 <Sparkles className="h-5 w-5 text-white" />
//               </div>

//               <h3 className="text-xl font-bold leading-snug">
//                 Trusted by technology leaders worldwide.
//               </h3>

//               <p className="mt-3 text-xs text-teal-100 leading-relaxed">
//                 Get high-signal breakdowns of tech marketing trends before they go mainstream.
//               </p>
//             </div>

//             <div className="border-t border-white/20 pt-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex -space-x-2">
//                   <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-teal-600 overflow-hidden">
//                     <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Subscriber" />
//                   </div>
//                   <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-teal-600 overflow-hidden">
//                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Subscriber" />
//                   </div>
//                   <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-teal-600 overflow-hidden">
//                     <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Subscriber" />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold">12,000+</p>
//                   <p className="text-[11px] text-teal-100">Tech Marketers Subscribed</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default Newsletter;


import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Sparkles,
  Layers,
  BookOpen,
  BarChart3,
  Check,
  X,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../components/SectionLabel";
import { createNewsletterSubscription } from "../services/newsletter";

const PREVIEWS = [
  {
    id: "trends",
    label: "01. Market Trends",
    icon: BarChart3,
    title: "AI & Tech Buyer Behavior Shift",
    excerpt: "How B2B tech buyers evaluate vendors in 2026: 72% rely on intent signals and peer-to-peer case studies before initial sales outreach."
  },
  {
    id: "playbooks",
    label: "02. Playbooks",
    icon: BookOpen,
    title: "Category Positioning Framework",
    excerpt: "Step-by-step methodology to transform complex technical architecture into high-converting demand gen narratives."
  },
  {
    id: "data",
    label: "03. Data Snippets",
    icon: Layers,
    title: "CAC Benchmarks Across Enterprise SaaS",
    excerpt: "A breakdown of channel effectiveness, direct response performance, and multi-touch attribution metrics."
  }
];

function Newsletter() {
  const [activeTab, setActiveTab] = useState("trends");
  const [cadence, setCadence] = useState("weekly");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionResult, setSubscriptionResult] = useState(null);

  const activeContent = PREVIEWS.find((p) => p.id === activeTab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubscriptionResult(null);

    try {
      const result = await createNewsletterSubscription(email, cadence);

      setSubscriptionResult({
        status: result.status,
        message: result.message,
      });
      setEmail("");
    } catch (error) {
      setSubscriptionResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not subscribe you. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="relative overflow-hidden bg-slate-50 py-20 lg:py-28 text-slate-900">
      {/* Background Lighting & Grid Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      <div className="absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center">
            <SectionLabel>Inside The Newsletter</SectionLabel>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            See what you'll get before you subscribe.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Preview interactive editions of our weekly research and choose the frequency that fits your schedule.
          </p>
        </div>

        {/* Main Content Stage */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* Left Column: Interactive Content Previewer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                <div className="flex items-center gap-2">
                  {/* <Sparkles className="h-4 w-4 text-teal-600" /> */}
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Content Sample
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                  Interactive Studio
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {PREVIEWS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Animated Tab Content Box */}
              <div className="mt-6 min-h-[160px] rounded-2xl border border-slate-200/70 bg-slate-50/80 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-base font-bold text-slate-900">
                      {activeContent.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      “{activeContent.excerpt}”
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/80">
              <span>Read time: ~3 mins per issue</span>
              <span className="text-teal-600 font-medium">Curated by TechIntel Strategy Team</span>
            </div>
          </div>

          {/* Right Column: Custom Subscription Form Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Join the Dispatch
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Select your preferred email cadence:
              </p>

              {/* Cadence Toggle Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => setCadence("weekly")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                    cadence === "weekly"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cadence === "weekly" && <Check className="h-3.5 w-3.5 text-teal-600" />}
                  Weekly Digest
                </button>
                <button
                  type="button"
                  onClick={() => setCadence("monthly")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                    cadence === "monthly"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cadence === "monthly" && <Check className="h-3.5 w-3.5 text-teal-600" />}
                  Monthly Deep-Dive
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter work email"
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-3.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-sm"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-3.5 text-xs font-semibold text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe to {cadence === "weekly" ? "Weekly" : "Monthly"}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </motion.button>
              </form>
            </div>

            <p className="mt-6 text-[11px] text-center text-slate-400">
              No spam. Unsubscribe with one click anytime.
            </p>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {subscriptionResult && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSubscriptionResult(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="subscription-result-title"
              aria-describedby="subscription-result-message"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-2xl sm:p-9"
            >
              <button
                type="button"
                onClick={() => setSubscriptionResult(null)}
                aria-label="Close subscription message"
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <X size={18} />
              </button>

              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                  subscriptionResult.status === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                {subscriptionResult.status === "error" ? (
                  <AlertCircle size={28} />
                ) : (
                  <CheckCircle size={28} />
                )}
              </div>

              <h3
                id="subscription-result-title"
                className="mt-5 text-xl font-bold text-slate-950"
              >
                {subscriptionResult.status === "already_subscribed"
                  ? "Already subscribed"
                  : subscriptionResult.status === "subscribed"
                    ? "You’re subscribed!"
                    : "Subscription unsuccessful"}
              </h3>
              <p
                id="subscription-result-message"
                role={subscriptionResult.status === "error" ? "alert" : "status"}
                className="mt-2 text-sm leading-6 text-slate-600"
              >
                {subscriptionResult.message}
              </p>
              <button
                type="button"
                onClick={() => setSubscriptionResult(null)}
                className="mt-6 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Newsletter;