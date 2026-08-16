"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "motion/react";
import React from "react";

const transition = {
  duration: 0,
  ease: "linear" as const,
};

export const GoogleGeminiEffect = ({
  pathLengths,
  className,
}: {
  pathLengths: MotionValue[];
  className?: string;
}) => {
  const paths = React.useMemo(() => {
    const rawPathsData = [
      // Path 0 (FFB7C5)
      [
        { start: [0, 663] },
        { c: [145.5, 663, 191, 666.265, 269, 647] },
        { c: [326.5, 630, 339.5, 621, 397.5, 566] },
        { c: [439, 531.5, 455, 529.5, 490, 523] },
        { c: [509.664, 519.348, 521, 503.736, 538, 504.236] },
        { c: [553.591, 504.236, 562.429, 514.739, 584.66, 522.749] },
        { c: [592.042, 525.408, 600.2, 526.237, 607.356, 523.019] },
        { c: [624.755, 515.195, 641.446, 496.324, 657, 496.735] },
        { c: [673.408, 496.735, 693.545, 519.572, 712.903, 526.769] },
        { c: [718.727, 528.934, 725.184, 528.395, 730.902, 525.965] },
        { c: [751.726, 517.115, 764.085, 497.106, 782, 496.735] },
        { c: [794.831, 496.47, 804.103, 508.859, 822.469, 518.515] },
        { c: [835.13, 525.171, 850.214, 526.815, 862.827, 520.069] },
        { c: [875.952, 513.049, 889.748, 502.706, 903.5, 503.736] },
        { c: [922.677, 505.171, 935.293, 510.562, 945.817, 515.673] },
        { c: [954.234, 519.76, 963.095, 522.792, 972.199, 524.954] },
        { c: [996.012, 530.611, 1007.42, 534.118, 1034, 549] },
        { c: [1077.5, 573.359, 1082.5, 594.5, 1140, 629] },
        { c: [1206, 670, 1328.5, 662.5, 1440, 662.5] }
      ],
      // Path 1 (FFDDB7)
      [
        { start: [0, 587.5] },
        { c: [147, 587.5, 277, 587.5, 310, 573.5] },
        { c: [348, 563, 392.5, 543.5, 408, 535] },
        { c: [434, 523.5, 426, 526.235, 479, 515.235] },
        { c: [494, 512.729, 523, 510.435, 534.5, 512.735] },
        { c: [554.5, 516.735, 555.5, 523.235, 576, 523.735] },
        { c: [592, 523.735, 616, 496.735, 633, 497.235] },
        { c: [648.671, 497.235, 661.31, 515.052, 684.774, 524.942] },
        { c: [692.004, 527.989, 700.2, 528.738, 707.349, 525.505] },
        { c: [724.886, 517.575, 741.932, 498.33, 757.5, 498.742] },
        { c: [773.864, 498.742, 791.711, 520.623, 810.403, 527.654] },
        { c: [816.218, 529.841, 822.661, 529.246, 828.451, 526.991] },
        { c: [849.246, 518.893, 861.599, 502.112, 879.5, 501.742] },
        { c: [886.47, 501.597, 896.865, 506.047, 907.429, 510.911] },
        { c: [930.879, 521.707, 957.139, 519.639, 982.951, 520.063] },
        { c: [1020.91, 520.686, 1037.5, 530.797, 1056.5, 537] },
        { c: [1102.24, 556.627, 1116.5, 570.704, 1180.5, 579.235] },
        { c: [1257.5, 589.5, 1279, 587, 1440, 588] }
      ],
      // Path 2 (B1C5FF)
      [
        { start: [0, 514] },
        { c: [147.5, 514.333, 294.5, 513.735, 380.5, 513.735] },
        { c: [405.976, 514.94, 422.849, 515.228, 436.37, 515.123] },
        { c: [477.503, 514.803, 518.631, 506.605, 559.508, 511.197] },
        { c: [564.04, 511.706, 569.162, 512.524, 575, 513.735] },
        { c: [588, 516.433, 616, 521.702, 627.5, 519.402] },
        { c: [647.5, 515.402, 659, 499.235, 680.5, 499.235] },
        { c: [700.5, 499.235, 725, 529.235, 742, 528.735] },
        { c: [757.654, 528.735, 768.77, 510.583, 791.793, 500.59] },
        { c: [798.991, 497.465, 807.16, 496.777, 814.423, 499.745] },
        { c: [832.335, 507.064, 850.418, 524.648, 866, 524.235] },
        { c: [882.791, 524.235, 902.316, 509.786, 921.814, 505.392] },
        { c: [926.856, 504.255, 932.097, 504.674, 937.176, 505.631] },
        { c: [966.993, 511.248, 970.679, 514.346, 989.5, 514.735] },
        { c: [1006.3, 515.083, 1036.5, 513.235, 1055.5, 513.235] },
        { c: [1114.5, 513.235, 1090.5, 513.235, 1124, 513.235] },
        { c: [1177.5, 513.235, 1178.99, 514.402, 1241, 514.402] },
        { c: [1317.5, 514.402, 1274.5, 512.568, 1440, 513.235] }
      ],
      // Path 3 (4FABFF)
      [
        { start: [0, 438.5] },
        { c: [150.5, 438.5, 261, 438.318, 323.5, 456.5] },
        { c: [351, 464.5, 387.517, 484.001, 423.5, 494.5] },
        { c: [447.371, 501.465, 472, 503.735, 487, 507.735] },
        { c: [503.786, 512.212, 504.5, 516.808, 523, 518.735] },
        { c: [547, 521.235, 564.814, 501.235, 584.5, 501.235] },
        { c: [604.5, 501.235, 626, 529.069, 643, 528.569] },
        { c: [658.676, 528.569, 672.076, 511.63, 695.751, 501.972] },
        { c: [703.017, 499.008, 711.231, 498.208, 718.298, 501.617] },
        { c: [735.448, 509.889, 751.454, 529.98, 767, 529.569] },
        { c: [783.364, 529.569, 801.211, 507.687, 819.903, 500.657] },
        { c: [825.718, 498.469, 832.141, 499.104, 837.992, 501.194] },
        { c: [859.178, 508.764, 873.089, 523.365, 891, 523.735] },
        { c: [907.8, 524.083, 923, 504.235, 963, 506.735] },
        { c: [1034.5, 506.735, 1047.5, 492.68, 1071, 481.5] },
        { c: [1122.5, 457, 1142.23, 452.871, 1185, 446.5] },
        { c: [1255.5, 436, 1294, 439, 1439.5, 439] }
      ],
      // Path 4 (076EFF)
      [
        { start: [0.5, 364] },
        { c: [145.288, 362.349, 195, 361.5, 265.5, 378] },
        { c: [322, 391.223, 399.182, 457.5, 411, 467.5] },
        { c: [424.176, 478.649, 456.916, 491.677, 496.259, 502.699] },
        { c: [498.746, 503.396, 501.16, 504.304, 503.511, 505.374] },
        { c: [517.104, 511.558, 541.149, 520.911, 551.5, 521.236] },
        { c: [571.5, 521.236, 590, 498.736, 611.5, 498.736] },
        { c: [631.5, 498.736, 652.5, 529.236, 669.5, 528.736] },
        { c: [685.171, 528.736, 697.81, 510.924, 721.274, 501.036] },
        { c: [728.505, 497.988, 736.716, 497.231, 743.812, 500.579] },
        { c: [761.362, 508.857, 778.421, 529.148, 794, 528.736] },
        { c: [810.375, 528.736, 829.35, 508.68, 848.364, 502.179] },
        { c: [854.243, 500.169, 860.624, 500.802, 866.535, 502.718] },
        { c: [886.961, 509.338, 898.141, 519.866, 916, 520.236] },
        { c: [932.8, 520.583, 934.5, 510.236, 967.5, 501.736] },
        { c: [1011.5, 491, 1007.5, 493.5, 1029.5, 480] },
        { c: [1069.5, 453.5, 1072, 440.442, 1128.5, 403.5] },
        { c: [1180.5, 369.5, 1275, 360.374, 1439, 364] }
      ]
    ];

    return rawPathsData.map((pathObjArray, pathIndex) => {
      let points: string[] = [];
      let cx = 0;
      let cy = 0;
      
      pathObjArray.forEach((seg: any) => {
        if (seg.start) {
          cx = seg.start[0];
          cy = seg.start[1];
          points.push(`M ${cx.toFixed(1)} ${cy.toFixed(1)}`);
        } else if (seg.c) {
          const [x1, y1, x2, y2, x3, y3] = seg.c;
          
          const segmentWidth = Math.abs(x3 - cx);
          const steps = Math.max(2, Math.round(segmentWidth / 3)); // sample every 3px
          
          for (let j = 1; j <= steps; j++) {
            const t = j / steps;
            const mt = 1 - t;
            
            const x = mt * mt * mt * cx + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
            let y = mt * mt * mt * cy + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
            
            // Only apply jagged electric/lightning noise on the left side (x < 620)
            if (x < 620) {
              const env = Math.pow(1 - x / 620, 1.6);
              const phase = pathIndex * 2.5;
              
              // Jagged lightning noise waves (scaled down to be a little less distorted)
              const n1 = Math.sin(x * 0.12 + phase) * 9;
              const n2 = Math.sin(x * 0.35 - phase) * 5;
              const n3 = Math.sin(x * 0.95 + phase * 2) * 3;
              const n4 = Math.sin(x * 1.85 - phase * 3) * 1.5;
              y += (n1 + n2 + n3 + n4) * env;
            }
            
            points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
          }
          
          cx = x3;
          cy = y3;
        }
      });
      
      return points.join(' ');
    });
  }, []);

  return (
    <div className={cn("relative w-full h-[350px] overflow-hidden mt-8", className)}>
      {/* Center button */}
      <div className="w-full h-full flex items-center justify-center absolute z-30">
        <button className="font-extrabold bg-[#146DF7] text-white rounded-full min-w-[220px] md:min-w-[280px] md:py-5 py-3.5 z-30 md:text-xl text-sm flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 tracking-wider">
          1126.labs
        </button>
      </div>

      {/* Sized SVG using viewport translation for path Y values (350 to 700) */}
      <svg
        width="1440"
        height="350"
        viewBox="0 350 1440 350"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <motion.path
          d={paths[0]}
          stroke="#CFF0FF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[0],
          }}
          transition={transition}
        />
        <motion.path
          d={paths[1]}
          stroke="#146DF7"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[1],
          }}
          transition={transition}
        />
        <motion.path
          d={paths[2]}
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[2],
          }}
          transition={transition}
        />
        <motion.path
          d={paths[3]}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[3],
          }}
          transition={transition}
        />
        <motion.path
          d={paths[4]}
          stroke="#4C5963"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[4],
          }}
          transition={transition}
        />

        {/* Gaussian blur for the background paths */}
        <path
          d={paths[0]}
          stroke="#CFF0FF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d={paths[1]}
          stroke="#146DF7"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d={paths[2]}
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d={paths[3]}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />
        <path
          d={paths[4]}
          stroke="#4C5963"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
        />

        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
