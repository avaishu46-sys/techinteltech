import { Link } from "react-router-dom";
import { Linkedin, ArrowUp } from "lucide-react";
import logo from "../assets/logos/tech-logo.png";
import isoBadge from "../assets/logos/Untitled-design-11-removebg-preview.png";
import footerBg from "../assets/images/footer_bg.jpg";

const linkClass =
  "block text-base leading-6 text-slate-700 transition-all duration-300 hover:translate-x-2 hover:text-slate-950";
const headingClass =
  "relative mb-7 text-lg font-medium text-slate-950 after:absolute after:-bottom-2.5 after:left-0 after:h-0.5 after:w-[50px] after:bg-teal-600 after:content-['']";

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer
      className="relative overflow-hidden border-t-4 border-teal-200 bg-cover bg-center bg-no-repeat text-slate-900"
      style={{
        backgroundImage: `linear-gradient(rgba(197, 218, 211, 0.8), rgba(93, 209, 194, 0.8)), url(${footerBg})`,
                // backgroundImage: `linear-gradient(rgba(197, 218, 211, 0.8), rgba(93, 209, 194, 0.8)), url(${footerBg})`,

      }}
    >

      <div className="relative z-10 mx-auto max-w-[1580px] px-3 pt-10 pb-8 sm:px-4">
        <div className="grid grid-cols-1 gap-y-8 min-[575px]:grid-cols-2 lg:grid-cols-4">
          <div className="px-2">
            <Link to="/" aria-label="TechIntel home" className="inline-block">
              <img
                src={logo}
                alt="TechIntel"
                className="h-[60px] w-auto object-contain"
              />
            </Link>
            <address className="mt-6 max-w-[340px] space-y-2 text-base not-italic leading-6 text-slate-700">
              <p>Office No. 605, Verdant 84, Koregaon Park, Pune - 411036</p>
              <p>16192 Coastal Hwy, Lewes, Delaware 19958, USA</p>
            </address>
          </div>

          <div className="px-2">
            <h3 className={headingClass}>Legal &amp; Privacy</h3>
            <ul className="space-y-2.5">
              <li><Link to="/terms" className={linkClass}>Terms of Use / T&amp;C</Link></li>
              <li><Link to="/privacy" className={linkClass}>Privacy Notice / Policy</Link></li>
              <li><Link to="/cookie-policy" className={linkClass}>Cookie Notice / Cookie Settings</Link></li>
              <li><Link to="/do-not-share" className={linkClass}>Do Not Share or Sell My Personal Information</Link></li>
              <li>
                <a
                  href="https://app.termly.io/dsar/d57b5309-8c31-4c47-9b42-9752e9504c41"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Limit Use of Sensitive PI
                </a>
              </li>
            </ul>
          </div>

          <div className="px-2">
            <h3 className={headingClass}>Trust &amp; Compliance</h3>
            <ul className="space-y-2.5">
              <li><Link to="/accessibility" className={linkClass}>Accessibility Statement</Link></li>
            </ul>
          </div>

          <div className="px-2">
            <h3 className={headingClass}>Support &amp; Contact</h3>
            <ul className="space-y-2.5">
              <li><Link to="/contact" className={linkClass}>Contact / Support</Link></li>
              <li>
                <a
                  href="mailto:contact@techintel.tech"
                  className="block text-base leading-6 text-slate-700 transition-all duration-300 hover:translate-x-2 hover:text-slate-950"
                >
                  contact@techintel.tech
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.linkedin.com/company/prospect-precise-llc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechIntel on LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white transition-colors hover:bg-teal-700"
                >
                  <Linkedin size={28} fill="currentColor" strokeWidth={0} />
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <IsoBadge />
              <GdprBadge />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1580px] px-3 sm:px-4">
        <div className="border-t border-slate-900/20" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1580px] flex-col gap-3 px-3 py-4 text-[15px] text-slate-700 sm:px-4 md:flex-row md:items-center md:justify-between">
        <p>©Copyright {currentYear} | TechIntel | All rights reserved</p>
        <div className="flex items-center gap-4 md:pr-16">
          <Link to="/unsubscribe" className="transition-colors hover:text-slate-600">Unsubscribe</Link>
          <span className="text-slate-900/60">|</span>
          <Link to="/gdpr" className="transition-colors hover:text-slate-600">GDPR Policy</Link>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}

function IsoBadge() {
  return (
    <img
      src={isoBadge}
      alt="ISO 9001:2015 certified"
      className="h-16 w-36 object-contain"
    />
  );
}

function GdprBadge() {
  return null;
}

export default Footer;