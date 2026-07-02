"use client";

import { motion } from "motion/react";

export interface BrazilPin {
  city: string;
  uf: string;
  lat: number;
  lng: number;
  hq?: boolean;
}

interface BrazilMapProps {
  pins: BrazilPin[];
  color?: string;
}

// Bounding box of continental Brazil
const BBOX = { minLng: -74, maxLng: -34, minLat: -34, maxLat: 5.5 };
const VIEW_W = 600;
const VIEW_H = 640;

function project(lat: number, lng: number) {
  const x = ((lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng)) * VIEW_W;
  const y = ((BBOX.maxLat - lat) / (BBOX.maxLat - BBOX.minLat)) * VIEW_H;
  return { x, y };
}

// Simplified but recognizable Brazil silhouette (hand-tuned to bbox above).
const BRAZIL_PATH = `M 328.5 600.3 L 329.0 602.3 L 326.2 605.1 L 329.0 608.1 L 328.5 610.2 L 325.4 613.4 L 321.0 624.9 L 308.8 635.9 L 307.0 633.7 L 308.5 626.3 L 311.2 625.5 L 313.2 620.4 L 315.3 619.5 L 316.6 622.1 L 318.7 621.6 L 321.2 616.1 L 319.6 612.7 L 320.7 609.9 L 318.1 612.0 L 319.1 613.9 L 313.9 618.2 L 309.2 617.1 L 305.3 613.8 L 303.8 608.9 L 298.5 606.4 L 291.2 598.8 L 281.4 595.6 L 276.4 588.7 L 269.9 592.7 L 269.7 587.9 L 257.9 576.9 L 254.0 576.6 L 251.7 579.9 L 245.4 578.3 L 255.5 569.3 L 261.2 560.9 L 263.8 560.1 L 271.9 548.6 L 274.5 549.7 L 273.4 546.7 L 284.5 540.4 L 283.8 539.2 L 286.0 539.1 L 287.8 535.2 L 295.8 533.8 L 297.4 530.7 L 303.0 528.9 L 304.9 525.6 L 303.7 520.8 L 305.4 513.9 L 302.5 509.9 L 301.6 504.3 L 298.5 504.2 L 298.5 502.2 L 293.6 505.4 L 291.1 503.8 L 296.1 483.8 L 295.7 479.1 L 289.9 474.9 L 284.1 477.8 L 278.7 477.3 L 275.8 456.3 L 272.4 450.3 L 266.9 450.0 L 264.1 446.8 L 257.4 450.5 L 240.1 447.0 L 242.7 428.4 L 241.1 427.7 L 242.1 425.2 L 240.2 424.5 L 237.5 415.9 L 242.1 412.7 L 238.0 409.2 L 244.6 397.1 L 243.5 395.3 L 246.6 384.6 L 248.2 384.5 L 243.7 373.7 L 238.4 371.9 L 234.1 367.5 L 233.0 359.7 L 235.2 352.6 L 207.4 352.7 L 206.4 339.8 L 201.5 333.9 L 206.3 333.7 L 205.9 326.0 L 202.7 319.0 L 204.3 315.8 L 203.0 312.6 L 194.8 307.6 L 182.4 308.6 L 177.5 301.6 L 168.3 299.9 L 162.6 293.5 L 160.6 294.6 L 153.2 290.5 L 145.6 291.6 L 139.4 284.9 L 138.6 286.1 L 137.4 283.7 L 134.5 283.5 L 133.7 278.9 L 131.1 278.8 L 131.8 275.9 L 129.6 271.4 L 131.2 267.1 L 128.6 258.9 L 130.7 254.7 L 130.7 248.6 L 128.5 245.8 L 126.6 248.6 L 123.4 246.8 L 110.7 249.4 L 104.8 255.3 L 96.3 259.3 L 94.4 262.6 L 89.2 262.0 L 86.4 266.6 L 81.9 269.1 L 68.6 266.2 L 61.0 266.1 L 55.3 268.5 L 52.0 266.3 L 50.7 267.3 L 50.7 248.2 L 52.6 241.8 L 41.8 250.6 L 27.3 251.1 L 27.7 247.9 L 24.6 242.9 L 11.8 241.6 L 15.9 234.7 L 10.6 228.7 L 10.8 226.4 L 6.9 224.3 L 3.4 217.2 L 4.7 215.1 L 0.2 211.5 L 0.6 208.1 L 4.5 207.5 L 2.9 204.3 L 5.3 198.7 L 12.9 194.4 L 11.5 186.8 L 15.6 180.7 L 16.9 172.6 L 31.8 162.3 L 45.9 160.2 L 50.2 156.0 L 55.1 156.3 L 57.0 159.9 L 60.5 158.8 L 69.1 107.5 L 65.6 101.3 L 65.8 97.3 L 59.1 92.1 L 59.4 80.0 L 67.8 77.2 L 69.6 79.2 L 73.3 78.6 L 71.0 71.9 L 62.3 71.5 L 62.4 61.2 L 87.7 61.0 L 86.0 59.5 L 87.3 57.0 L 90.9 59.4 L 99.2 52.7 L 100.7 58.5 L 103.5 61.0 L 103.7 70.2 L 107.2 69.2 L 115.2 76.9 L 126.2 72.8 L 126.9 78.6 L 130.1 74.0 L 132.3 74.2 L 133.5 70.4 L 137.9 67.8 L 138.8 69.3 L 144.0 64.4 L 144.9 67.0 L 148.6 62.9 L 150.1 57.0 L 159.0 54.3 L 158.9 49.6 L 154.4 50.5 L 149.2 48.6 L 150.1 44.2 L 146.5 38.7 L 147.2 31.4 L 139.9 24.2 L 138.1 19.7 L 141.6 22.6 L 147.5 22.3 L 150.5 26.4 L 154.8 25.8 L 154.8 24.0 L 157.5 26.8 L 158.6 24.7 L 161.9 25.1 L 161.6 27.0 L 165.6 30.7 L 169.0 29.3 L 168.7 23.8 L 171.7 24.0 L 173.1 21.4 L 181.0 22.6 L 186.6 20.2 L 190.2 15.6 L 195.1 15.9 L 201.1 9.3 L 199.2 4.5 L 208.0 4.1 L 210.2 8.6 L 207.6 16.1 L 214.9 18.3 L 214.1 21.3 L 217.2 25.2 L 212.0 31.2 L 212.9 34.8 L 210.2 42.4 L 211.5 50.8 L 214.2 52.2 L 213.7 58.9 L 221.2 66.6 L 226.2 67.8 L 227.7 70.1 L 229.4 68.1 L 232.6 68.6 L 232.4 65.4 L 235.2 63.2 L 239.9 64.8 L 240.2 62.2 L 246.9 61.6 L 250.4 56.7 L 253.7 56.3 L 258.1 59.1 L 263.2 57.4 L 270.7 59.2 L 271.5 56.0 L 267.9 52.4 L 270.5 48.1 L 279.2 49.9 L 285.0 47.1 L 293.5 53.3 L 300.4 52.9 L 303.5 50.6 L 306.9 52.5 L 309.9 51.0 L 311.0 54.0 L 315.8 54.0 L 321.7 48.3 L 325.0 37.7 L 335.3 23.6 L 337.3 17.2 L 343.9 26.1 L 344.5 38.3 L 349.5 54.5 L 353.3 53.5 L 356.4 59.9 L 361.3 61.6 L 359.1 83.6 L 364.8 83.2 L 369.1 88.9 L 376.0 92.8 L 383.8 93.3 L 382.9 97.2 L 390.1 100.5 L 391.5 98.1 L 392.4 100.1 L 394.4 97.8 L 398.0 101.5 L 397.9 98.8 L 400.5 98.8 L 402.5 101.7 L 403.7 99.8 L 404.1 102.2 L 405.6 100.6 L 406.0 103.3 L 407.1 101.0 L 407.7 103.7 L 410.4 101.9 L 409.9 104.9 L 413.6 103.0 L 412.5 104.9 L 412.8 105.9 L 415.4 106.7 L 416.9 103.5 L 415.9 108.1 L 417.4 105.2 L 416.9 107.4 L 418.9 105.6 L 418.5 106.5 L 418.4 108.6 L 418.9 108.5 L 420.5 106.1 L 420.8 109.2 L 422.3 106.0 L 421.8 109.6 L 423.1 107.9 L 422.9 108.7 L 423.1 108.9 L 422.4 109.9 L 423.3 109.6 L 424.8 107.5 L 423.9 109.2 L 424.1 110.8 L 424.8 110.9 L 424.5 111.0 L 423.9 111.5 L 424.2 111.9 L 425.6 111.2 L 426.3 109.5 L 426.7 111.0 L 427.5 110.1 L 427.2 111.1 L 427.4 111.4 L 427.1 111.9 L 427.2 112.0 L 428.9 110.0 L 427.7 112.3 L 427.8 114.0 L 428.4 114.1 L 428.3 112.6 L 428.8 112.0 L 429.0 112.6 L 429.7 110.4 L 430.2 110.5 L 430.6 112.1 L 429.2 113.1 L 430.5 113.3 L 429.7 117.2 L 433.1 113.9 L 433.1 112.8 L 433.5 111.9 L 433.5 111.2 L 433.6 112.7 L 433.4 113.1 L 433.5 113.3 L 433.6 113.5 L 433.5 113.1 L 433.8 113.2 L 434.0 113.0 L 434.0 112.6 L 435.6 113.7 L 435.7 113.1 L 435.8 113.0 L 435.9 113.3 L 436.4 113.3 L 437.0 112.2 L 437.6 112.0 L 436.5 115.3 L 437.7 114.6 L 438.3 115.4 L 438.0 116.0 L 439.5 114.3 L 440.4 115.4 L 438.3 116.3 L 439.5 117.3 L 437.8 118.5 L 441.1 117.4 L 440.5 118.0 L 440.5 118.7 L 441.2 119.2 L 441.5 118.2 L 442.1 118.9 L 441.0 119.9 L 442.7 120.6 L 442.5 123.8 L 444.1 125.0 L 445.1 129.6 L 449.7 128.0 L 448.5 129.0 L 450.6 129.3 L 450.3 130.8 L 455.8 125.1 L 457.6 127.5 L 462.2 127.6 L 469.6 132.0 L 468.9 130.4 L 472.8 133.1 L 482.6 133.2 L 486.1 136.2 L 502.5 134.2 L 503.5 134.7 L 507.2 134.7 L 507.8 135.1 L 508.6 134.9 L 510.2 135.2 L 510.9 135.5 L 532.9 149.2 L 552.5 169.0 L 559.7 171.6 L 575.8 171.9 L 581.1 177.9 L 587.0 202.7 L 588.1 205.0 L 587.7 217.4 L 584.9 227.9 L 580.5 237.9 L 564.0 259.6 L 555.1 265.8 L 539.3 293.8 L 534.8 298.9 L 530.8 298.6 L 525.8 303.6 L 526.7 310.2 L 525.0 311.8 L 526.1 315.0 L 524.0 327.4 L 527.2 346.1 L 521.8 367.3 L 523.0 375.7 L 516.5 382.2 L 514.5 387.5 L 514.7 401.9 L 512.9 407.5 L 509.2 410.1 L 503.6 423.5 L 503.1 423.3 L 500.6 426.8 L 500.3 425.9 L 498.6 427.2 L 494.0 437.3 L 495.2 445.6 L 480.6 454.2 L 480.2 457.2 L 482.0 457.8 L 479.5 460.2 L 479.8 461.7 L 464.2 461.5 L 463.7 456.5 L 460.7 458.5 L 461.4 459.8 L 462.7 460.4 L 462.3 461.5 L 460.7 462.0 L 458.3 462.1 L 456.7 463.0 L 452.5 460.2 L 446.4 462.7 L 444.6 462.1 L 445.5 461.1 L 444.5 460.5 L 439.6 463.1 L 439.3 465.6 L 442.3 466.4 L 441.3 467.6 L 436.4 467.2 L 428.9 471.9 L 428.5 475.2 L 422.3 474.0 L 418.2 475.3 L 417.3 477.8 L 414.2 477.5 L 407.7 481.3 L 393.4 492.8 L 381.5 508.1 L 381.1 512.4 L 382.6 513.9 L 379.7 521.3 L 381.0 528.6 L 383.0 528.9 L 380.8 530.6 L 382.1 532.0 L 380.3 534.4 L 381.4 541.0 L 378.6 551.5 L 365.3 562.9 L 348.5 593.2 L 328.8 610.1 L 329.8 606.6 L 328.5 604.9 L 332.2 605.4 L 332.0 604.3 L 335.0 603.9 L 337.6 600.6 L 338.5 601.5 L 338.6 599.2 L 341.4 598.8 L 342.5 592.5 L 345.3 592.0 L 345.5 589.7 L 349.5 587.3 L 349.2 580.9 L 351.4 583.0 L 351.0 578.3 L 346.1 582.2 L 344.2 581.5 L 344.5 579.6 L 341.3 578.2 L 341.6 575.9 L 340.6 575.2 L 340.6 580.1 L 341.8 580.0 L 343.6 581.4 L 341.1 582.7 L 340.6 587.3 L 339.2 585.8 L 338.4 592.8 L 335.7 593.6 L 335.8 595.7 L 331.0 596.6 L 329.5 602.6 L 328.5 600.3 Z`;

export function BrazilMap({ pins, color = "oklch(0.38 0.14 18)" }: BrazilMapProps) {
  const hq = pins.find((p) => p.hq);
  const hqPt = hq ? project(hq.lat, hq.lng) : null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label="Mapa do Brasil com filiais"
      >
        <defs>
          <linearGradient id="brz-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.92" />
            <stop offset="100%" stopColor={color} stopOpacity="0.75" />
          </linearGradient>
          <filter id="brz-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={color} floodOpacity="0.25" />
          </filter>
          <radialGradient id="brz-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind map */}
        <ellipse cx={VIEW_W / 2} cy={VIEW_H / 2} rx={VIEW_W / 2.2} ry={VIEW_H / 2.4} fill="url(#brz-glow)" opacity="0.25" />

        {/* Brazil shape */}
        <motion.path
          d={BRAZIL_PATH}
          fill="url(#brz-fill)"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#brz-shadow)"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />

        {/* Connecting arcs from HQ */}
        {hqPt &&
          pins
            .filter((p) => !p.hq)
            .map((p, i) => {
              const end = project(p.lat, p.lng);
              const mx = (hqPt.x + end.x) / 2;
              const my = Math.min(hqPt.y, end.y) - 40;
              const d = `M ${hqPt.x} ${hqPt.y} Q ${mx} ${my} ${end.x} ${end.y}`;
              return (
                <motion.path
                  key={`arc-${p.uf}`}
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.85"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.12, ease: "easeOut" }}
                />
              );
            })}

        {/* Pins */}
        {pins.map((p, i) => {
          const pt = project(p.lat, p.lng);
          const r = p.hq ? 9 : 6;
          return (
            <motion.g
              key={p.uf}
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
            >
              {p.hq && (
                <>
                  <circle cx={pt.x} cy={pt.y} r={r * 2.2} fill={color} opacity="0.18">
                    <animate attributeName="r" values={`${r};${r * 3};${r}`} dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={pt.x} cy={pt.y} r={r * 1.5} fill={color} opacity="0.22" />
                </>
              )}
              <circle cx={pt.x} cy={pt.y} r={r + 2} fill="white" />
              <circle cx={pt.x} cy={pt.y} r={r} fill={color} />
              <circle cx={pt.x} cy={pt.y} r={r / 2.4} fill="white" />
              <text
                x={pt.x + r + 10}
                y={pt.y + 5}
                fontSize={p.hq ? 16 : 13}
                fontWeight={p.hq ? 800 : 700}
                fill="white"
                stroke="black"
                strokeWidth="3"
                paintOrder="stroke"
                style={{ fontFamily: "Barlow, sans-serif", letterSpacing: "0.04em" }}
              >
                {p.uf}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

export default BrazilMap;