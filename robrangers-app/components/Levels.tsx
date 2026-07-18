"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

export default function Levels() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const levelsList = [
    {
      level: "Tingkat Pemula",
      name: "Sandbox Explorer (Beginner)",
      desc: "Menyelami workspace 3D Roblox Studio, memahami manipulasi objek fisik, part, material, pencahayaan, dan menulis script Lua dasar (variabel, fungsi, percabangan logika).",
      projects: ["Obstacle Course (Obby) Dinamis", "Sistem Koin & Custom Leaderboard"],
      badge: "SD / SMP",
      accentColor: "#FFCC00" // Canary Yellow
    },
    {
      level: "Tingkat Menengah",
      name: "Logic Architect (Intermediate)",
      desc: "Memahami interaksi Client-Server (RemoteEvents & RemoteFunctions), datastore untuk menyimpan progres pemain, rancangan GUI interaktif, serta optimalisasi server logic multiplayer.",
      projects: ["Multiplayer Tycoon Simulator", "Custom Combat & Arena System"],
      badge: "Terpopuler",
      accentColor: "linear-gradient(to right, #FFCC00, #0066CC)" // Yellow to Blue Blend
    },
    {
      level: "Tingkat Mahir",
      name: "AI & Monetization Master (Advanced)",
      desc: "Menyusun algoritma AI pathfinding untuk NPC, mengintegrasikan LLM Generative AI di dalam skrip game, hingga merancang sistem monetisasi profesional (Gamepass & Developer Products).",
      projects: ["Survival Open World dengan AI Companion", "Game Terintegrasi Monetisasi Robux"],
      badge: "SMA / Kuliah",
      accentColor: "#0066CC" // Cyber Blue
    }
  ];

  return (
    <section id="levels" className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">
            Tingkatan Belajar Kurikulum
          </h2>
          <p className="text-base text-[#86868B]">
            Setiap tingkatan dirancang secara presisi oleh pengembang game Roblox profesional dan pakar pendidikan untuk menyesuaikan fase perkembangan logika.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levelsList.map((lvl, index) => {
            const isHovered = hoveredLevel === index;
            const borderStyle = isHovered
              ? lvl.accentColor.includes("gradient")
                ? { borderImage: `${lvl.accentColor} 1`, borderWidth: "2px" }
                : { borderColor: lvl.accentColor, borderWidth: "2px" }
              : { borderColor: "transparent", borderWidth: "2px" };

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredLevel(index)}
                onMouseLeave={() => setHoveredLevel(null)}
                whileHover={{ y: -8 }}
                className="bg-[#F5F5F7] rounded-3xl p-8 lg:p-10 border transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden"
                style={{
                  ...borderStyle,
                  boxShadow: isHovered 
                    ? `0 20px 40px -15px ${
                        lvl.accentColor.includes("gradient") 
                          ? "rgba(0,102,204,0.15)" 
                          : lvl.accentColor + "40"
                      }`
                    : "none"
                }}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                      style={{
                        background: lvl.accentColor.includes("gradient") 
                          ? "linear-gradient(to right, #0066CC, #FFCC00)" 
                          : lvl.accentColor,
                        color: lvl.accentColor === "#FFCC00" ? "#1D1D1F" : "#FFFFFF"
                      }}
                    >
                      {lvl.level}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {lvl.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold text-[#1D1D1F] mb-4">
                    {lvl.name}
                  </h3>
                  
                  <p className="text-sm text-[#86868B] leading-relaxed mb-6">
                    {lvl.desc}
                  </p>
                </div>

                <div className="border-t border-neutral-200/60 pt-6 mt-6">
                  <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0066CC]" /> Project Goal:
                  </h4>
                  <ul className="space-y-2">
                    {lvl.projects.map((proj, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#86868B] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
