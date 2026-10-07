import Hero from "../sections/Hero";
import TrustedBrands from "../sections/TrustedBrands";
import WhyTechIntel from "../sections/WhyTechIntel";
import Services from "../sections/Services";
import Stats from "../sections/Stats";
import Insights from "../sections/Insights";
import CaseStudies from "../sections/CaseStudies";
import Testimonials from "../sections/Testimonials";
import Newsletter from "../sections/Newsletter";
import FinalCTA from "../sections/FinalCTA";

function Home() {
  return (
    <>
      <Hero />
      <TrustedBrands />
      <WhyTechIntel />
      <Services />
      <Stats />
      <Insights />
      {/* <CaseStudies /> */}
      {/* <Testimonials /> */}
      <Newsletter />
      <FinalCTA />
    </>
  );
}

export default Home;