"use client";

import { useEffect, useState } from "react";

export default function PlaneAnimation() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="absolute inset-x-0 top-20 z-0 pointer-events-none overflow-hidden h-32">
      <div
        className={`w-12 h-12 absolute transition-all duration-[3000ms] ease-out ${
          animate ? "translate-x-[110vw] -translate-y-4 rotate-12" : "-translate-x-20 translate-y-10 -rotate-12"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
        >
          <path d="M2 12h2l2 4h4l4-8H2z" fill="none" />
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
        <div className="absolute top-1/2 right-full w-20 h-1 bg-gradient-to-l from-indigo-500/50 to-transparent blur-[2px]" />
      </div>
    </div>
  );
}
