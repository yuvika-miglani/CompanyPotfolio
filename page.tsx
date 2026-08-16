"use client";

import OpeningAnimation from "@/components/OpeningAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DilemmaSection from "@/components/DilemmaSection";
import ApproachSection from "@/components/ApproachSection";
import WhyUsSection from "@/components/WhyUsSection";
import FitSection from "@/components/FitSection";
import FAQSection from "@/components/FAQSection";
import BookSessionSection from "@/components/BookSessionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Zooming grid opening animation */}
      <OpeningAnimation />

      <div className="site-layout-grid">
        {/* Background Vertical Grid Lines */}
        <div className="grid-vert-line left-line" />
        <div className="grid-vert-line right-line" />

        {/* 2. Sleek Pinned Navbar */}
        <Navbar />

        <main>
          {/* 3. Hero Section */}
          <HeroSection />

          {/* 4. Dilemma & Need Section */}
          <DilemmaSection />

          {/* 5. Approach Section */}
          <ApproachSection />

          {/* 6. Why Us Section */}
          <WhyUsSection />

          {/* 7. Fit Section */}
          <FitSection />

          {/* 8. FAQ Section */}
          <FAQSection />

          {/* 9. Book a Session Section */}
          <BookSessionSection />
        </main>

        {/* 10. Footer */}
        <Footer />
      </div>
    </>
  );
}
