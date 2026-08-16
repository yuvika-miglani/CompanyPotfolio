"use client";

import { useEffect, useRef, useState } from "react";

// Define 3D point and line interfaces
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Line3D {
  p1: Point3D;
  p2: Point3D;
  isTruss?: boolean;
}

export default function DilemmaSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [inView, setInView] = useState(false);

  // Track mouse coordinates over the section
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouse({ x, y });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Handle resizing
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate 3D structural nodes for 1126
    const lines: Line3D[] = [];

    // Helper to generate a 3D structural truss block (box with diagonal bracing)
    const addStructuralBlock = (x: number, y: number, z: number, w: number, d: number, h: number) => {
      // 8 corners
      const corners: Point3D[] = [
        { x, y, z }, // 0: bottom-back-left
        { x: x + w, y, z }, // 1: bottom-back-right
        { x: x + w, y: y + d, z }, // 2: bottom-front-right
        { x, y: y + d, z }, // 3: bottom-front-left
        { x, y, z: z + h }, // 4: top-back-left
        { x: x + w, y, z: z + h }, // 5: top-back-right
        { x: x + w, y: y + d, z: z + h }, // 6: top-front-right
        { x, y: y + d, z: z + h }, // 7: top-front-left
      ];

      // Add main frame lines (horizontal & vertical columns)
      const frameIndices = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom outline
        [4, 5], [5, 6], [6, 7], [7, 4], // top outline
        [0, 4], [1, 5], [2, 6], [3, 7], // vertical columns
      ];

      frameIndices.forEach(([i, j]) => {
        lines.push({ p1: corners[i], p2: corners[j], isTruss: false });
      });

      // Add cross-bracing trusses (diagonal lines on roof and sides)
      lines.push({ p1: corners[4], p2: corners[6], isTruss: true }); // top diagonal 1
      lines.push({ p1: corners[5], p2: corners[7], isTruss: true }); // top diagonal 2
      lines.push({ p1: corners[0], p2: corners[5], isTruss: true }); // side diagonal
      lines.push({ p1: corners[3], p2: corners[6], isTruss: true }); // side diagonal
    };

    // Construct "1126" using structural blocks
    // Grid coordinate layout: X is depth (front-back), Y is horizontal (left-right), Z is height (up-down)
    const blockWidth = 0.8;
    const blockDepth = 0.8;
    const blockHeight = 0.8;

    // Digit "1" (First)
    // Vertical tower (5 blocks tall to match '2' and '6')
    for (let h = 0; h < 5; h++) {
      addStructuralBlock(0, 0, h * blockHeight, blockWidth, blockDepth, blockHeight);
    }
    // Top slant/cap
    addStructuralBlock(0, -0.4, 4 * blockHeight, blockWidth, 0.4, blockHeight * 0.5);

    // Digit "1" (Second)
    for (let h = 0; h < 5; h++) {
      addStructuralBlock(0, 2.0, h * blockHeight, blockWidth, blockDepth, blockHeight);
    }
    addStructuralBlock(0, 1.6, 4 * blockHeight, blockWidth, 0.4, blockHeight * 0.5);

    // Digit "2"
    // Bottom bar
    addStructuralBlock(0, 4.0, 0, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 4.8, 0, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 5.6, 0, blockWidth, blockDepth, blockHeight);
    // Left support column
    addStructuralBlock(0, 4.0, blockHeight, blockWidth, blockDepth, blockHeight);
    // Middle bar
    addStructuralBlock(0, 4.0, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 4.8, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 5.6, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    // Right support column
    addStructuralBlock(0, 5.6, 3 * blockHeight, blockWidth, blockDepth, blockHeight);
    // Top bar
    addStructuralBlock(0, 4.0, 4 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 4.8, 4 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 5.6, 4 * blockHeight, blockWidth, blockDepth, blockHeight);

    // Digit "6"
    // Left vertical tower
    for (let h = 0; h < 5; h++) {
      addStructuralBlock(0, 7.6, h * blockHeight, blockWidth, blockDepth, blockHeight);
    }
    // Bottom bar
    addStructuralBlock(0, 8.4, 0, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 9.2, 0, blockWidth, blockDepth, blockHeight);
    // Right bottom column
    addStructuralBlock(0, 9.2, blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 9.2, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    // Middle bar
    addStructuralBlock(0, 8.4, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 9.2, 2 * blockHeight, blockWidth, blockDepth, blockHeight);
    // Top bar
    addStructuralBlock(0, 8.4, 4 * blockHeight, blockWidth, blockDepth, blockHeight);
    addStructuralBlock(0, 9.2, 4 * blockHeight, blockWidth, blockDepth, blockHeight);

    // Render loop
    let angleY = -0.80; // Base rotation (spaced out horizontally)
    let angleX = 0.32; // Base pitch (tilted a lil backwards)
    let baseTime = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate rotation based on mouse coordinates for interactive look-around
      const targetAngleY = -0.80 + mouse.x * 0.15;
      const targetAngleX = 0.32 + mouse.y * 0.1;

      angleY += (targetAngleY - angleY) * 0.1;
      angleX += (targetAngleX - angleX) * 0.1;
      baseTime += 0.005;

      // Center offset
      const centerX = width / 2;
      const centerY = height / 2;

      // Project 3D coordinate to 2D isometric viewport
      const project = (p: Point3D) => {
        // Translate coordinates to center around grid origin
        let x = p.x - 0.4;
        let y = p.y - 4.6;
        let z = p.z - 1.6;

        // Apply dynamic float animation (slight bobbing)
        z += Math.sin(baseTime + p.y) * 0.05;

        // Rotate Y-axis (yaw)
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = x * cosY - y * sinY;
        const y1 = x * sinY + y * cosY;

        // Rotate X-axis (pitch)
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const z2 = z * cosX - y1 * sinX;
        const y2 = z * sinX + y1 * cosX;

        // Isometric projection scale
        const scale = Math.min(width, height) * 0.11;

        return {
          x: centerX + x1 * scale,
          y: centerY - z2 * scale,
        };
      };

      // Draw Grid Floor lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1 * window.devicePixelRatio;
      const floorSize = 6;
      for (let i = -floorSize; i <= floorSize; i++) {
        const p11 = project({ x: i, y: -floorSize, z: -0.2 });
        const p12 = project({ x: i, y: floorSize, z: -0.2 });
        ctx.beginPath();
        ctx.moveTo(p11.x, p11.y);
        ctx.lineTo(p12.x, p12.y);
        ctx.stroke();

        const p21 = project({ x: -floorSize, y: i, z: -0.2 });
        const p22 = project({ x: floorSize, y: i, z: -0.2 });
        ctx.beginPath();
        ctx.moveTo(p21.x, p21.y);
        ctx.lineTo(p22.x, p22.y);
        ctx.stroke();
      }

      // Draw lines
      lines.forEach((line) => {
        const pt1 = project(line.p1);
        const pt2 = project(line.p2);

        if (line.isTruss) {
          // Draw structural trusses (thin, light black dashed/solid lines)
          ctx.strokeStyle = "rgba(9, 9, 11, 0.15)";
          ctx.lineWidth = 0.8 * window.devicePixelRatio;
          ctx.setLineDash([2 * window.devicePixelRatio, 3 * window.devicePixelRatio]);
        } else {
          // Draw primary columns and rafters (black solid lines)
          ctx.strokeStyle = "rgba(9, 9, 11, 0.85)";
          ctx.lineWidth = 1.5 * window.devicePixelRatio;
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.stroke();
      });

      // Clear dash pattern
      ctx.setLineDash([]);

      // Draw technical blueprint dots at intersections (black)
      ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
      lines.forEach((line) => {
        if (!line.isTruss) {
          const pt1 = project(line.p1);
          ctx.beginPath();
          ctx.arc(pt1.x, pt1.y, 2 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    if (inView) {
      render();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mouse, inView]);

  return (
    <section id="dilemma" className="theme-light dilemma-section" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="section-grid-lines" />
      <div className="container dilemma-container">
        <div className="dilemma-content">
          <span className="section-tag">01 / The Dilemma</span>
          <h2 className="section-title">Operations shouldn't be built around SaaS tools.</h2>
          <p className="dilemma-lead">
            We buy tools to solve collaboration, but instead we build data silos. The modern team spends more time feeding the databases of Slack, Jira, Salesforce, and Notion than actually doing work.
          </p>
          <div className="dilemma-points">
            <div className="dilemma-point-card">
              <h3>The Tool Debt</h3>
              <p>Every tool you add creates a new place where context goes to die. Duplicating knowledge across platforms consumes hours of team bandwidth every week.</p>
            </div>
            <div className="dilemma-point-card">
              <h3>Cognitive Fragmentation</h3>
              <p>People don't think in relational databases or ticket boards. They think in flows, stories, and outcomes. Our tools should adapt to our minds, not the other way around.</p>
            </div>
          </div>
        </div>

        <div className="dilemma-visual">
          <canvas ref={canvasRef} className="structural-canvas" />
        </div>
      </div>
    </section>
  );
}
