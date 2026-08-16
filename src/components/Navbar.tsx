"use client";

import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState<{ left: number; opacity: number }>({
    left: 0,
    opacity: 0,
  });

  // Spring animation state
  const animStateRef = useRef({
    currentLeft: 0,
    velocityLeft: 0,
  });

  const pillRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Track cursor relative X coordinate inside container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - containerRect.left;
    
    setActiveRect({
      left: relativeX - 2, // Center the 4px dot under cursor
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setActiveRect((prev) => ({ ...prev, opacity: 0 }));
  };

  // Spring physics loop for velocity stretch and motion blur
  useEffect(() => {
    let animId: number;
    const state = animStateRef.current;

    // Initialize position on first hover
    if (state.currentLeft === 0 && activeRect.left > 0) {
      state.currentLeft = activeRect.left;
    }

    const loop = () => {
      // Lower stiffness (0.05) and high damping (0.82) to make it move slower and smoother than the cursor
      const k = 0.05; 
      const damping = 0.82; 

      // Animate left coordinate
      const forceLeft = (activeRect.left - state.currentLeft) * k;
      state.velocityLeft = (state.velocityLeft + forceLeft) * damping;
      const prevLeft = state.currentLeft;
      state.currentLeft += state.velocityLeft;

      // Velocity-based scale (horizontal stretch) and blur calculations
      const velocity = state.currentLeft - prevLeft;
      const stretch = Math.min(1 + Math.abs(velocity) * 0.95, 6.0);
      const skew = Math.max(-15, Math.min(15, velocity * -0.9));
      const blurVal = Math.min(Math.abs(velocity) * 0.5, 3.0);

      if (pillRef.current) {
        pillRef.current.style.transform = `translate3d(${state.currentLeft}px, 0, 0) scaleX(${stretch}) skewX(${skew}deg)`;
        pillRef.current.style.filter = `blur(${blurVal}px)`;
        pillRef.current.style.opacity = `${activeRect.opacity}`;
      }

      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, [activeRect]);

  return (
    <nav className="site-navbar">
      {/* 1. Left Column: Logo with Blue Dot */}
      <div className="navbar-col logo-col" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span className="logo-dot">•</span>
        <span className="logo-text">1126LABS<sup>®</sup></span>
      </div>

      {/* 2. Middle Column: Spaced Links with Velocity Indicator */}
      <div
        ref={containerRef}
        className="navbar-col links-col"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={pillRef} className="navbar-link-highlight" />

        <button
          onClick={() => handleScrollTo("dilemma")}
          className="nav-link"
        >
          Blueprint
        </button>
        <button
          onClick={() => handleScrollTo("approach")}
          className="nav-link"
        >
          Approach
        </button>
        <button
          onClick={() => handleScrollTo("why-us")}
          className="nav-link"
        >
          Why us
        </button>
        <button
          onClick={() => handleScrollTo("fit")}
          className="nav-link"
        >
          Fit
        </button>
        <button
          onClick={() => handleScrollTo("faq")}
          className="nav-link"
        >
          FAQ
        </button>
      </div>

      {/* 3. Right Column: Black Capsule CTA */}
      <div className="navbar-col cta-col">
        <button onClick={() => handleScrollTo("book-session")} className="btn-cta-black">
          BOOK A CALL →
        </button>
      </div>
    </nav>
  );
}
