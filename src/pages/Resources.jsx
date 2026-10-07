import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  FileText,
  X,
  Filter,
  TrendingUp,
  Layers,
  ShieldCheck,
  Cpu,
  Briefcase,
  Users,
  ShoppingBag,
  Server,
  Cloud,
  Brain,
  Lock,
} from "lucide-react";

const CATEGORY_ICONS = {
  All: Layers,
  Cybersecurity: ShieldCheck,
  Technology: Cpu,
  Finance: Briefcase,
  HR: Users,
  "E-commerce": ShoppingBag,
  IT: Server,
  Cloud,
  AI: Brain,
  Security: Lock,
};

// const CATEGORY_ICON_STYLES = {
//   All: "bg-teal-100 text-teal-700",
//   Cybersecurity: "bg-rose-100 text-rose-700",
//   Technology: "bg-teal-100 text-teal-700",
//   Finance: "bg-emerald-100 text-emerald-700",
//   HR: "bg-orange-100 text-orange-700",
//   "E-commerce": "bg-amber-100 text-amber-700",
//   IT: "bg-blue-100 text-blue-700",
//   Cloud: "bg-sky-100 text-sky-700",
//   AI: "bg-violet-100 text-violet-700",
//   Security: "bg-red-100 text-red-700",
// };

const CATEGORY_ICON_STYLES = {
  All: "bg-teal-100 text-teal-700",
  Cybersecurity: "bg-teal-100 text-teal-700",
  Technology: "bg-teal-100 text-teal-700",
  Finance: "bg-teal-100 text-teal-700",
  HR: "bg-teal-100 text-teal-700",
  "E-commerce": "bg-teal-100 text-teal-700",
  IT: "bg-teal-100 text-teal-700",
  Cloud: "bg-teal-100 text-teal-700",
  AI: "bg-teal-100 text-teal-700",
  Security: "bg-teal-100 text-teal-700",
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'trending', 'ebooks'
  const [currentPage, setCurrentPage] = useState(1);
  const [importedResources, setImportedResources] = useState([]);
  const [resourceLoadError, setResourceLoadError] = useState(false);
  const resultsAreaRef = useRef(null);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!search.trim()) return undefined;

    const timeoutId = window.setTimeout(() => {
      resultsAreaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}resource-assets.json`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Resource data failed to load");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Resource data is invalid");
        setImportedResources(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setResourceLoadError(true);
      });

    return () => controller.abort();
  }, []);

  // Real dataset
  const curatedResources = useMemo(() => [
    {
      id: "1",
      title: "Build and Secure AI Apps and Agents at Scale",
      description: "Explore insights, security best practices, and architecture frameworks to deploy scalable AI agents safely in enterprise environments.",
      link: "https://techintel.tech/lp/build-and-secure-ai-apps-and-agents-at-scale/",
      image: "https://techintel.tech/lp/build-and-secure-ai-apps-and-agents-at-scale/Images/banner_1235.png",
      category: "Technology",
      type: "eBook",
      readTime: "8 min read",
      featured: true,
      trending: true,
      downloads: "12.4k",
    },
    {
      id: "2",
      title: "A step-by-step framework to build agents",
      description: "A comprehensive developer roadmap covering dynamic memory, LLM tool integration, and agent loop execution.",
      link: "https://techintel.tech/lp/a-step-by-step-framework-to-build-agents/",
      image: "https://techintel.tech/lp/a-step-by-step-framework-to-build-agents/Images/ey%20image%20.png",
      category: "Technology",
      type: "Guide",
      readTime: "12 min read",
      featured: false,
      trending: true,
      downloads: "8.9k",
    },
    {
      id: "3",
      title: "Transformando la interacción con el cliente",
      description: "Estrategias avanzadas de omnicanalidad e inteligencia artificial para optimizar el engagement de clientes.",
      link: "https://techintel.tech/lp/transformando-la-interaccion-con-el-cliente/",
      image: "https://techintel.tech/lp/transformando-la-interaccion-con-el-cliente/Images/banner-1-2.png",
      category: "Technology",
      type: "Report",
      readTime: "15 min read",
      featured: false,
      trending: false,
      downloads: "5.1k",
    },
    {
      id: "4",
      title: "Seis señales de que su CCM tradicional está poniendo en riesgo su negocio",
      description: "Análisis crítico sobre la modernización de la gestión de comunicaciones con clientes y riesgos operativos.",
      link: "https://techintel.tech/lp/seis-senales-de-que-su-ccm-tradicional-esta-poniendo-en-riesgo-su-negocio/",
      image: "https://techintel.tech/lp/seis-senales-de-que-su-ccm-tradicional-esta-poniendo-en-riesgo-su-negocio/Images/banner.jpg",
      category: "Technology",
      type: "eBook",
      readTime: "10 min read",
      featured: false,
      trending: false,
      downloads: "4.2k",
    },
    {
      id: "5",
      title: "Making AI Deliver",
      description: "Bridging the gap between generative AI experimentation and business ROI with proven governance practices.",
      link: "https://techintel.tech/lp/Making-AI-Deliver-gdpr/",
      image: "https://techintel.tech/lp/Making-AI-Deliver-gdpr/Images/2026-04-democratization-in-the-ai-age-lp-360x360-2x.png",
      category: "Technology",
      type: "Whitepaper",
      readTime: "18 min read",
      featured: true,
      trending: true,
      downloads: "15.8k",
    },
    {
      id: "6",
      title: "Multichannel Math: How Retail Sales Tax Complexity Adds Up",
      description: "How evolving cross-border e-commerce tax regulations impact multi-state retail compliance and systems.",
      link: "https://techintel.tech/lp/multichannel-math-how-retail-sales-tax-complexity-adds-up/",
      image: "https://techintel.tech/lp/images_lp/bannerimg1.png",
      category: "E-commerce",
      type: "Guide",
      readTime: "6 min read",
      featured: false,
      trending: false,
      downloads: "3.7k",
    },
    {
      id: "7",
      title: "From Cart to Compliance: Optimising B2B Commerce",
      description: "Streamlining B2B checkout flows, cross-border invoicing, and automated tax calculation engines.",
      link: "https://techintel.tech/lp/from-cart-to-compliance-optimising-b2b-commerce/",
      image: "https://techintel.tech/lp/images_lp/bannerimg2.png",
      category: "E-commerce",
      type: "Report",
      readTime: "14 min read",
      featured: false,
      trending: false,
      downloads: "6.4k",
    },
    {
      id: "8",
      title: "State of AI Agents",
      description: "Global enterprise survey on AI adoption, agentic workflow architectures, and infrastructure spend.",
      link: "https://techintel.tech/lp/state-of-ai-agents/",
      image: "https://techintel.tech/lp/state-of-ai-agents-gdpr/Images/lp-headerhero-image-2026-01-eb-state-of-ai-agents.png",
      category: "Technology",
      type: "eBook",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "9",
      title: "The Ultimate Checklist to Shift-Left Governance",
      description: "A practical guide for technology leaders to implement proactive governance and compliance in software development lifecycles.",
      link: "https://techintel.tech/lp/The-Ultimate-Checklist-to-Shift-Left-Governance/",
      image: "https://techintel.tech/assets/Images/210720251.png",
      category: "Cloud",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "10",
      title: "Sports + Outdoor Commerce Report 2025",
      link: "https://techintel.tech/lp/Sports-Outdoor-Commerce-Report-2025/",
      description: "A comprehensive analysis of the sports and outdoor retail landscape, highlighting emerging trends, consumer behaviors, and technology adoption.",
      image: "https://techintel.tech/lp/Sports-Outdoor-Commerce-Report-2025/Images/Sports-Outdoor-Commerce-Report-resource-tile.png",
      category: "E-commerce",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "11",
      title: "Why the four key metrics are essential in today’s software-driven automotive industry",
      description: "An in-depth exploration of the four critical metrics that automotive software teams must monitor to ensure optimal performance, safety, and user experience.",
      link: "https://techintel.tech/lp/why-the-four-key-metrics-are-essential-in-todays-software-driven-automotive-industry/",
      image: "https://techintel.tech/lp/why-the-four-key-metrics-are-essential-in-todays-software-driven-automotive-industry/Images/cover.jpg",
      category: "Technology",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "12",
      title: "混合雲備份入門指南",
      description: "A beginner's guide to hybrid cloud backup solutions.",
      link: "https://techintel.tech/lp/hybrid-cloud-backup-for-dummies-5/",
      image: "https://techintel.tech/lp/hybrid-cloud-backup-for-dummies-5/Images/cover.jpg",
      category: "IT",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "13",
      title: "10 個最佳實踐 改善恢復 目標",
      description: "A comprehensive guide to the top 10 best practices for improving recovery objectives in hybrid cloud environments.",
      link: "https://techintel.tech/lp/10-best-practices-to-improve-recovery-objectives-9/",
      image: "https://techintel.tech/lp/10-best-practices-to-improve-recovery-objectives-9/Images/cover.jpg",
      category: "IT",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "14",
      title: "2024 年混合雲和多雲狀況",
      description: "An overview of the current state of hybrid and multi-cloud environments in 2024.",
      link: "https://techintel.tech/lp/the-state-of-hybrid-and-multi-cloud-in-2024-5/",
      image: "https://techintel.tech/lp/the-state-of-hybrid-and-multi-cloud-in-2024-5/Images/cover.jpg",
      category: "IT",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "15",
      title: "Forrester Wave™：資料彈性解決方案，2024 年第 4 季度",
      description: "A comprehensive analysis of the Forrester Wave™ data resilience solutions for the fourth quarter of 2024.",
      link: "https://techintel.tech/lp/the-forrester-wave-data-resilience-solutions-q4-2024-5/",
      image: "https://techintel.tech/lp/the-forrester-wave-data-resilience-solutions-q4-2024-5/Images/cover.png",
      category: "IT",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "16",
      title: "安全設計和資料保護指南",
      description: "A comprehensive guide to secure-by-design and data protection strategies.",
      link: "https://techintel.tech/lp/your-guide-to-secure-by-design-and-data-protection-4/",
      image: "https://techintel.tech/lp/your-guide-to-secure-by-design-and-data-protection-4/Images/cover.jpg",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "17",
      title: "Veeam 資料平台 + Sophos 託管偵測與回應",
      description: "A comprehensive guide to Veeam's data platform and Sophos's managed detection and response solutions.",
      link: "https://techintel.tech/lp/veeam-data-platform-sophos-managed-detect-and-response-10/",
      image: "https://techintel.tech/lp/veeam-data-platform-sophos-managed-detect-and-response-10/Images/cover.jpg",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "18",
      title: "GigaOm 混合雲資料保護 Radar 報告",
      description: "An overview of the current state of hybrid and multi-cloud environments in 2024.",
      link: "https://techintel.tech/lp/gigaom-radar-report-for-hybrid-cloud-data-protection-4/",
      image: "https://techintel.tech/lp/gigaom-radar-report-for-hybrid-cloud-data-protection-4/Images/cover.png",
      category: "Cloud",
      type: "eBook",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "19",
      title: "451 企業購買指南",
      description: "A comprehensive analysis of the Forrester Wave™ data resilience solutions for the fourth quarter of 2024.",
      link: "https://techintel.tech/lp/451-enterprise-buyers-guide-4/",
      image: "https://techintel.tech/lp/451-enterprise-buyers-guide-4/Images/cover.jpg",
      category: "Cloud",
      type: "eBook",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "20",
      title: "5 Steps to Healthier, Fitter E-Commerce",
      description: "A guide to improving the health and performance of your e-commerce platform.",
      link: "https://techintel.tech/lp/5-Steps-to-Healthier-Fitter-E-Commerce/",
      image: "https://techintel.tech/lp/images/170720251.png",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "21",
      title: "5 Tech trends and what they mean to ecommerce",
      description: "An analysis of the top 5 technology trends and their impact on the e-commerce industry.",
      link: "https://techintel.tech/lp/5-Tech-trends-and-what-they-mean-to-ecommerce/",
      image: "https://techintel.tech/lp/images/170720252.png",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "22",
      title: "Listicle - 10 things ecommerce leaders need to know about Cloudflare",
      description: "A listicle highlighting 10 essential things ecommerce leaders should know about Cloudflare.",
      link: "https://techintel.tech/lp/Listicle-10-things-ecommerce-leaders-need-to-know-about-Cloudflare/",
      image: "https://techintel.tech/lp/images/170720253.png",
      category: "Security",
      type: "eBook",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "23",
      title: "Maturity Model",
      description: "A guide to understanding and implementing the maturity model for your organization.",
      link: "https://techintel.tech/lp/Maturity-Model/",
      image: "https://techintel.tech/lp/images/250720254.png",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "24",
      title: "Security or performance: Solving the classic website dilemma",
      description: "An analysis of the trade-offs between security and performance in website design.",
      link: "https://techintel.tech/lp/Security-or-performance-Solving-the-classic-website-dilemma/",
      image: "https://techintel.tech/lp/images/170720255.png",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
    {
      id: "25",
      title: "Shielding the Future: Retail Industry’s Cyber Threat Landscape",
      description: "An overview of the current cyber threat landscape facing the retail industry.",
      link: "https://techintel.tech/lp/Shielding-the-Future-Retail-Industrys-Cyber-Threat-Landscape/",
      image: "https://techintel.tech/lp/images/170720256.png",
      category: "HR",
      type: "report",
      readTime: "22 min read",
      featured: false,
      trending: true,
      downloads: "18.1k",
    },
  ], []);

  const resources = useMemo(() => {
    const resourcesByLink = new Map();
    for (const resource of [...importedResources, ...curatedResources]) {
      const key = resource.link || `missing:${resource.id}`;
      resourcesByLink.set(key, resource);
    }
    return Array.from(resourcesByLink.values());
  }, [importedResources, curatedResources]);

  // Dynamically derive categories
  const categories = useMemo(() => {
    const names = new Set(resources.map((resource) => resource.category.trim()));

    return ["All", ...names];
  }, [resources]);

  // Filter logic
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        category === "All" || resource.category.trim() === category;
      const searchTerm = search.trim().toLowerCase();
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.category.toLowerCase().includes(searchTerm);
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "trending" && resource.trending) ||
        (activeTab === "ebooks" && resource.type === "eBook");

      return matchesCategory && matchesSearch && matchesTab;
    });
  }, [category, search, activeTab, resources]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const pageNumbers = Array.from(
    new Set([
      1,
      totalPages,
      ...Array.from(
        { length: Math.max(0, Math.min(totalPages, currentPage + 2) - Math.max(1, currentPage - 2) + 1) },
        (_, index) => Math.max(1, currentPage - 2) + index
      ),
    ])
  )
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
  const currentAssets = useMemo(() => {
    return filteredResources.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredResources, currentPage, itemsPerPage]);

  const handleTopicClick = (topic) => {
    setSearch(topic);
    setCurrentPage(1);
  };

  return (
    <main className="bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. HERO SECTION (same style as About page) */}
      <section className="relative overflow-hidden bg-[#02181d] pt-36 pb-20 text-white lg:pt-30 lg:pb-18">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0b4f4a_0%,#052a2a_50%,#021416_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.25)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.2)_0%,transparent_60%)] pointer-events-none" />

        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-teal-400/20 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/60 px-3.5 py-1 text-xs font-semibold text-teal-300 mb-6 backdrop-blur-md">
                  <span>Resource library</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">
                  Research & Insights
                </p>

                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                  Research, reports and ideas for{" "}
                  <span className="block bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 bg-clip-text text-transparent">
                    technology professionals.
                  </span>
                </h1>

                <p className="mt-6 text-base text-slate-300 leading-relaxed max-w-2xl sm:text-lg">
                  Explore our curated collection of developer frameworks, enterprise whitepapers, and cloud security reports.
                </p>

                {/* Hero Search Box */}
                <div className="mt-8 flex max-w-md items-center rounded-2xl border border-teal-500/30 bg-slate-900/60 p-1.5 backdrop-blur-md shadow-2xl transition focus-within:border-teal-400">
                  <div className="pl-3 text-teal-300/70">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    aria-label="Search resources by name, topic, or category"
                    placeholder="Search resources by name or category"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-transparent px-3 py-2 text-xs font-medium text-white placeholder-slate-500 outline-none"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="p-1 text-teal-300 hover:text-white mr-1"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl border border-teal-500/25 bg-slate-900/60 p-7 backdrop-blur-md shadow-2xl"
              >
                <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-teal-400/10 blur-2xl pointer-events-none" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300/80 mb-5 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-400" /> Popular Research Topics
                </h2>

                <div className="flex flex-wrap gap-2">
                  {["AI Agents", "Data Engineering", "GDPR", "Finance", "Security"].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicClick(topic)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        search.toLowerCase().includes(topic.toLowerCase())
                          ? "border-teal-400 bg-teal-400/20 text-teal-200"
                          : "border-teal-500/20 bg-slate-950/70 text-slate-300 hover:border-teal-400/50 hover:text-white"
                      }`}
                    >
                      #{topic}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-teal-500/20 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-3xl font-extrabold text-white">100%</p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">Free Peer Research</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-teal-400">50+</p>
                    <p className="text-[11px] font-medium text-slate-400 mt-0.5">Verified Playbooks</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN RESOURCE CONTENT */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-10 border-b border-slate-200 pb-10">
            <div className="mb-8 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-600">
                Our library
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl leading-tight">
                Browse resources by category.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Reports, guides and eBooks across the technology topics your buyers care about.
              </p>
            </div>

            <nav
              aria-label="Resource categories"
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setCurrentPage(1); }}
                  aria-pressed={category === cat}
                  className={`group flex min-h-[60px] cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    category === cat
                      ? "bg-[#02181d] text-white shadow-md shadow-slate-950/10"
                      : "bg-white text-slate-700 hover:bg-teal-50"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      category === cat
                        ? "bg-white/10 text-teal-200"
                        : CATEGORY_ICON_STYLES[cat] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {(() => {
                      const CategoryIcon = CATEGORY_ICONS[cat] || Filter;
                      return <CategoryIcon className="h-4 w-4" aria-hidden="true" />;
                    })()}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                    {cat}
                  </span>
                </button>
              ))}
            </nav>

            {resourceLoadError && (
              <p className="mt-3 text-xs text-amber-700" role="status">
                Some resources could not be loaded. Showing available assets.
              </p>
            )}
          </div>

          {/* View Tabs & Status */}
          <div
            ref={resultsAreaRef}
            className="scroll-mt-24 flex flex-col gap-4 border-b border-slate-200 pb-6 mb-10 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Asset Format Tabs */}
            <div className="flex w-fit min-w-0 max-w-full shrink-0 items-center gap-1 overflow-x-auto rounded-xl bg-slate-200/70 p-1 sm:shrink">
              <button
                onClick={() => { setActiveTab("all"); setCurrentPage(1); }}
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === "all"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Assets
              </button>
              <button
                onClick={() => { setActiveTab("trending"); setCurrentPage(1); }}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === "trending"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="h-3.5 w-3.5 text-teal-600" />
                Trending
              </button>
              <button
                onClick={() => { setActiveTab("ebooks"); setCurrentPage(1); }}
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === "ebooks"
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                eBooks
              </button>
            </div>

            {/* Results Count & Clear Button */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <p>
                {filteredResources.length === 0 ? (
                  "Showing 0 results"
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-slate-950">
                      {(currentPage - 1) * itemsPerPage + 1}
                      -
                      {Math.min(currentPage * itemsPerPage, filteredResources.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-950">
                      {filteredResources.length}
                    </span>{" "}
                    results
                  </>
                )}
              </p>
              {(search || category !== "All" || activeTab !== "all") && (
                <button
                  onClick={() => { setSearch(""); setCategory("All"); setActiveTab("all"); setCurrentPage(1); }}
                  className="text-teal-600 hover:underline font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Resource Cards */}
          <div>
            <motion.div layout className="grid min-w-0 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {currentAssets.length > 0 ? (
                  currentAssets.map((resource, index) => (
                    <motion.div
                      layout
                      key={resource.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                      className="group flex min-w-0 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400 hover:shadow-xl"
                    >
                      <div>
                        {/* Image Thumbnail */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-50 mb-4">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            loading="lazy"
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
                            }}
                          />
                        </div>

                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-700">
                            {resource.category}
                          </span>
                          <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-semibold text-teal-700">
                            {resource.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-2">
                          <BookOpen className="h-3.5 w-3.5 text-teal-600" />
                          <span>{resource.readTime}</span>
                        </div>

                        <h3 className="break-words text-lg font-bold leading-snug text-slate-950 transition duration-200 group-hover:text-teal-600">
                          {resource.title}
                        </h3>

                        <p className="mt-2.5 break-words text-xs leading-relaxed text-slate-600 line-clamp-2">
                          {resource.description}
                        </p>
                      </div>

                      {/* Action Footer */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        {resource.link ? (
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-teal-600 transition hover:text-teal-700"
                          >
                            View Details
                            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-400">
                            Details unavailable
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white"
                  >
                    <FileText className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No resources found matching your search
                    </p>
                    <button
                      onClick={() => { setSearch(""); setCategory("All"); setActiveTab("all"); setCurrentPage(1); }}
                      className="mt-4 rounded-full bg-slate-950 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-900"
                    >
                      Reset All Search Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex max-w-full flex-wrap items-center justify-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-teal-50 disabled:opacity-40"
                >
                  &laquo; Prev
                </button>

                {pageNumbers.map((page, index) => (
                  <span
                    key={page}
                    className={`items-center gap-2 ${
                      page === currentPage ? "flex" : "hidden sm:flex"
                    }`}
                  >
                    {index > 0 && page - pageNumbers[index - 1] > 1 && (
                      <span className="hidden px-1 text-xs text-slate-400 sm:inline" aria-hidden="true">
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`h-9 w-9 rounded-lg text-xs font-semibold transition ${
                        currentPage === page
                          ? "bg-slate-950 text-white shadow-md"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-teal-50"
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-teal-50 disabled:opacity-40"
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}