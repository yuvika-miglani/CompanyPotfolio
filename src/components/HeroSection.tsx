"use client";

import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

function TypewriterHeading() {
  const phrases = ["brew AI Workflows", "brew internal tools", "kill operational friction."];
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const stagnant = "We help you ";

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        }, 80); // typing speed
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // pause duration
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        }, 40); // deleting speed
      } else {
        setIsDeleting(false);
        setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIdx]);

  return (
    <h1 className="hero-title typewriter-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "2.4em" }}>
      <span style={{ display: "block" }}>{stagnant}</span>
      <span style={{ display: "block", minHeight: "1.2em" }}>
        <span className="typewriter-dynamic" style={{ color: "var(--accent-primary)" }}>
          {displayedText}
        </span>
        <span className="typewriter-cursor"></span>
      </span>
    </h1>
  );
}

function WordFlipper() {
  const words = ["operations", "workflows", "systems", "products"];
  return (
    <span className="word-flipper">
      <span className="flipper-list">
        {words.map((w, idx) => (
          <span key={idx} className="flipper-word">
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="theme-dark hero-section pb-0" ref={ref}>
      {/* Perspective Grid Background */}
      <div className="hero-perspective-grid">
        <div className="hero-perspective-grid-inner" />
        <div className="hero-perspective-grid-fade" />
      </div>

      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <div className="container hero-container">
        <TypewriterHeading />

        <div className="hero-subtitle">
          <div className="subtitle-flipper-text">
            <span>Rebuilding studio-grade </span>
            <WordFlipper />
            <span> around artificial intelligence.</span>
          </div>
        </div>

        <div className="hero-actions">
          <button onClick={() => handleScrollTo("book-session")} className="btn btn-primary hero-btn">
            Get Started
          </button>
          <button onClick={() => handleScrollTo("approach")} className="btn btn-secondary hero-btn">
            Learn More
          </button>
        </div>
      </div>

      {/* Google Gemini Effect directly embedded */}
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </section>
  );
}
