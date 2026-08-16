"use client";

import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [phase, setPhase] = useState<"animating" | "fading" | "completed">("animating");

  useEffect(() => {
    // 1. Zoom animation runs for 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
    }, 2500);

    // 2. Fade transition takes 1.2 seconds, then we mark as completed (remove from DOM)
    const completeTimer = setTimeout(() => {
      setPhase("completed");
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  if (phase === "completed") return null;

  return (
    <div
      className={`opening-grid-overlay ${phase === "fading" ? "fade-out" : ""}`}
      aria-hidden="true"
    >
      <div className="zooming-grid" />
    </div>
  );
}
