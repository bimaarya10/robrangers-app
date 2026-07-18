"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

const StatCounter = ({ value, suffix = "", duration = 1500 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums font-extrabold text-[#1D1D1F] tracking-tight">
      {count}
      {suffix}
    </span>
  );
};

export default function Stats() {
  const statsList = [
    { value: 10, suffix: "K+", label: "Rangers Aktif" },
    { value: 50, suffix: "+", label: "Modul Roblox" },
    { value: 24, suffix: "/7", label: "AI Mentor Ready" },
    { value: 98, suffix: "%", label: "Tingkat Kepuasan" }
  ];

  return (
    <section className="bg-[#F5F5F7] border-y border-neutral-200/50 py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center justify-center">
          {statsList.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center justify-center text-center p-4 ${
                index > 0 ? "border-l border-neutral-300/40" : ""
              }`}
            >
              <span className="text-4xl md:text-5xl font-extrabold text-[#1D1D1F] flex items-center justify-center">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                <span className="text-xs sm:text-sm text-[#86868B] font-semibold tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
