import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logos/tech-logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/resources" },
  ];

  useEffect(() => {
    let frame = 0;

    const updateNavbarBackground = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const headerBottom =
          document.querySelector("header")?.getBoundingClientRect().bottom ?? 72;
        const darkSections = document.querySelectorAll(
          "main section.text-white, main > div.text-white, footer"
        );
        const navbarMidpoint = headerBottom / 2;
        const overlapsDarkSection = Array.from(darkSections).some((section) => {
          const bounds = section.getBoundingClientRect();
          return (
            bounds.top <= navbarMidpoint &&
            bounds.bottom > navbarMidpoint &&
            getComputedStyle(section).color === "rgb(255, 255, 255)"
          );
        });

        setIsOnDarkBackground(overlapsDarkSection);
      });
    };

    updateNavbarBackground();
    window.addEventListener("scroll", updateNavbarBackground, { passive: true });
    window.addEventListener("resize", updateNavbarBackground);

    return () => {
      window.removeEventListener("scroll", updateNavbarBackground);
      window.removeEventListener("resize", updateNavbarBackground);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isOnDarkBackground ? "bg-white shadow-md shadow-black/10" : "bg-transparent"
      }`}
    >
      <nav className="w-full">
        <div className="relative border-b border-transparent bg-transparent shadow-none backdrop-blur-none">
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:h-18 lg:px-12">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="group col-start-1 flex shrink-0 items-center"
              aria-label="TechIntel Home"
            >
              <img
                src={logo}
                alt="TechIntel"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14"
              />
            </Link>

            <div className="col-start-2 hidden items-center lg:flex">
              <div className="flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/90 p-1.5 shadow-lg shadow-black/20 backdrop-blur-md">
                {navLinks.map((link) => (
                  <NavLink key={link.name} to={link.path} className="relative">
                    {({ isActive }) => (
                      <div
                        className={`relative flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white hover:text-white/80"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 32,
                            }}
                            className="absolute inset-0 rounded-full bg-teal-500 shadow-md shadow-teal-500/20"
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="col-start-3 hidden items-center justify-self-end gap-4 lg:flex">
              <div
                className={`flex items-center gap-2 text-xs font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  isOnDarkBackground ? "text-slate-950" : "text-white"
                }`}
              >
                {/* <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                <span>Explore TechIntel</span> */}
              </div>

              <div
                className={`h-7 w-px ${
                  isOnDarkBackground ? "bg-slate-300" : "bg-white/40"
                }`}
              />

              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-slate-950 py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/20"
              >
                <span>Contact Us</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/20 bg-slate-950/90 text-white transition-all duration-300 hover:border-teal-400 hover:bg-slate-900 lg:hidden"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-white/20 bg-slate-950/95 px-4 pb-4 pt-3 text-white backdrop-blur-md sm:px-6">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NavLink
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                        >
                          {({ isActive }) => (
                            <div
                              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                                isActive
                                  ? "bg-teal-500 text-white shadow-md shadow-teal-500/15"
                                  : "text-white/80 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <span>{link.name}</span>
                            </div>
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-medium text-white/70">
                    <Sparkles size={15} className="text-teal-300" />
                    <span>Explore TechIntel resources &amp; insights</span>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="group mt-3 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-500"
                  >
                    <span>Let&apos;s Talk</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;