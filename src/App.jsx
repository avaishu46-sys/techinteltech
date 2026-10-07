import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoadingScreen from "./components/LoadingScreen";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceDetails = lazy(() => import("./pages/ResourceDetails"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetails = lazy(() => import("./pages/CaseStudyDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/cookie-policy"));
const DoNotShare = lazy(() => import("./pages/do-not-share"));
const Accessibility = lazy(() => import("./pages/accessibility"));
const GDPRPolicy = lazy(() => import("./pages/GDPR_Policy"));
const Unsubscribe = lazy(() => import("./pages/unsubscribe"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Company */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/resources/:slug"
            element={<ResourceDetails />}
          />

          {/* Blogs */}
          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/blogs/:slug"
            element={<BlogDetails />}
          />

          {/* Case Studies */}
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route
            path="/case-studies/:slug"
            element={<CaseStudyDetails />}
          />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

          {/* Legal */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/do-not-share" element={<DoNotShare />} />
          <Route path="/do-not-sell" element={<DoNotShare />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/gdpr" element={<GDPRPolicy />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;