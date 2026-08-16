"use client";

import { useEffect, useRef, useState } from "react";

export default function FitSection() {
  const [activeToggle, setActiveToggle] = useState<"not-fit" | "built-for-you">("built-for-you");

  // Webcam variables
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebcam, setHasWebcam] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const notFitItems = [
    { num: "01", text: "You want a tool recommendation." },
    { num: "02", text: "You want someone to manage AI for you forever." },
    { num: "03", text: "You're hoping AI fixes a people problem." },
    { num: "04", text: "You need a six-month strategy deck." },
    { num: "05", text: "You're not ready to change how you work." }
  ];

  const builtForYouItems = [
    { num: "01", text: "You need custom operations, not off-the-shelf templates." },
    { num: "02", text: "You want to rebuild workflows around AI-native models." },
    { num: "03", text: "You care about studio-grade UI design and user experience." },
    { num: "04", text: "You have operations complexity and team size > 10." },
    { num: "05", text: "You have budget for bespoke engineering and automation." }
  ];

  const currentItems = activeToggle === "built-for-you" ? builtForYouItems : notFitItems;



  // Setup webcam feed
  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 },
          audio: false,
        });
        setStream(mediaStream);
        setHasWebcam(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch((err) => console.log("Video play error:", err));
        }
      } catch (err) {
        console.log("Webcam access denied or unavailable:", err);
        setHasWebcam(false);
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Voxel Grid Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width;
    let height = canvas.height;

    // hidden processing canvas to downsample video
    const processCanvas = document.createElement("canvas");
    const processCtx = processCanvas.getContext("2d");
    const gridCols = 36;
    const gridRows = 27;
    processCanvas.width = gridCols;
    processCanvas.height = gridRows;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const render = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.05;

      const spacingX = width / gridCols;
      const spacingY = height / gridRows;

      // Draw blocks helper
      const drawBlock = (x: number, y: number, r: number, g: number, b: number, heightVal: number) => {
        const bx = x * spacingX + spacingX / 2;
        const by = y * spacingY + spacingY / 2;

        const sizeX = spacingX * 0.85;
        const sizeY = spacingY * 0.85;

        const h = heightVal * 25 * window.devicePixelRatio;

        // Colors
        const baseColor = `rgb(${r}, ${g}, ${b})`;
        const frontColor = `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`;
        const sideColor = `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`;

        // 1. Draw front face (oblique side face)
        ctx.fillStyle = frontColor;
        ctx.beginPath();
        ctx.moveTo(bx - sizeX / 2, by + sizeY / 2);
        ctx.lineTo(bx + sizeX / 2, by + sizeY / 2);
        ctx.lineTo(bx + sizeX / 2, by + sizeY / 2 - h);
        ctx.lineTo(bx - sizeX / 2, by + sizeY / 2 - h);
        ctx.closePath();
        ctx.fill();

        // 2. Draw side face
        ctx.fillStyle = sideColor;
        ctx.beginPath();
        ctx.moveTo(bx + sizeX / 2, by + sizeY / 2);
        ctx.lineTo(bx + sizeX / 2 + sizeX * 0.2, by - sizeY * 0.2);
        ctx.lineTo(bx + sizeX / 2 + sizeX * 0.2, by - sizeY * 0.2 - h);
        ctx.lineTo(bx + sizeX / 2, by + sizeY / 2 - h);
        ctx.closePath();
        ctx.fill();

        // 3. Draw top face (colored top)
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.moveTo(bx - sizeX / 2, by + sizeY / 2 - h);
        ctx.lineTo(bx + sizeX / 2, by + sizeY / 2 - h);
        ctx.lineTo(bx + sizeX / 2 + sizeX * 0.2, by - sizeY * 0.2 - h);
        ctx.lineTo(bx - sizeX / 2 + sizeX * 0.2, by - sizeY * 0.2 - h);
        ctx.closePath();
        ctx.fill();
      };

      // 1. IF WE HAVE WEBCAM: Process and Draw webcam pixels
      if (hasWebcam && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        if (processCtx) {
          processCtx.save();
          processCtx.translate(gridCols, 0);
          processCtx.scale(-1, 1);
          processCtx.drawImage(videoRef.current, 0, 0, gridCols, gridRows);
          processCtx.restore();

          const imgData = processCtx.getImageData(0, 0, gridCols, gridRows);
          const data = imgData.data;

          for (let y = 0; y < gridRows; y++) {
            for (let x = 0; x < gridCols; x++) {
              const idx = (y * gridCols + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
              drawBlock(x, y, r, g, b, brightness);
            }
          }
        }
      } else {
        // 2. FALLBACK ANIMATION: procedural blue/navy wave (no purple)
        for (let y = 0; y < gridRows; y++) {
          for (let x = 0; x < gridCols; x++) {
            const dx = x - gridCols / 2;
            const dy = y - gridRows / 2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const ripple = Math.sin(dist * 0.3 - time) * 0.5 + 0.5;

            // Interpolate between navy (16, 34, 47) and brand blue (20, 109, 247)
            const r = Math.round(16 + ripple * (20 - 16));
            const g = Math.round(34 + ripple * (109 - 34));
            const b = Math.round(47 + ripple * (247 - 47));

            drawBlock(x, y, r, g, b, ripple);
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [hasWebcam]);

  return (
    <section id="fit" className="theme-dark fit-section">
      <div className="section-grid-lines" />

      {/* Hidden elements for webcam data extraction */}
      <video
        ref={videoRef}
        style={{ display: "none" }}
        playsInline
        muted
      />

      <div className="container fit-container">
        <div className="fit-text-column">
          <div className="fit-reflective-card">
            {/* Main Toggle Switch */}
            <div className="fit-main-toggle-container">
              <div className="fit-toggle-pill">
                <button
                  type="button"
                  className={`fit-toggle-btn ${activeToggle === "not-fit" ? "active" : ""}`}
                  onClick={() => setActiveToggle("not-fit")}
                >
                  Not the right fit
                </button>
                <button
                  type="button"
                  className={`fit-toggle-btn ${activeToggle === "built-for-you" ? "active" : ""}`}
                  onClick={() => setActiveToggle("built-for-you")}
                >
                  Built for you
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="fit-checklist-new">
              {currentItems.map((item, idx) => (
                <div key={idx} className="fit-item-new">
                  <span className="fit-item-num">{item.num}</span>
                  <span className="fit-item-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fit-visual-column">
          <div className="webcam-grid-wrapper">
            <canvas ref={canvasRef} className="webcam-grid-canvas" />

            {/* Header text overlaying the grid */}
            <div className="webcam-grid-overlay">
              <span className="section-tag-overlay">04 / Fit Check</span>
              <h2 className="section-title-overlay">Are we a good fit for your business?</h2>
              <p className="fit-lead-overlay">
                We operate as an elite studio. We only take on projects where our AI operations design model can deliver extreme compounding advantages.
              </p>
            </div>

            <div className="webcam-overlay-text">
              {hasWebcam === true ? (
                <span>✦ LIVE WEBCAM VOXEL GRID RUNNING</span>
              ) : hasWebcam === false ? (
                <span>✦ FALLBACK 3D WAVE RUNNING (WEBCAM BLOCKED)</span>
              ) : (
                <span>✦ INITIALIZING VOXEL RENDERING ENGINE</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
