"use client";

import React, { useState } from "react";
import { Clock, ChevronRight, ArrowRight } from "lucide-react";

interface Module {
  code: string;
  title: string;
  time: string;
  difficulty: string;
  description: string;
  progressCount: number;
}

export default function Modules() {
  const modulesList: Module[] = [
    {
      code: "MOD-01",
      title: "Dasar Luascript di Roblox",
      time: "8 Bab (16 Jam)",
      difficulty: "Pemula",
      description: "Pelajari variabel dasar, control flow, dan manipulasi objek di workspace menggunakan script. Cocok untuk awalan coding.",
      progressCount: 2
    },
    {
      code: "MOD-02",
      title: "Advanced Game Logic",
      time: "10 Bab (20 Jam)",
      difficulty: "Menengah",
      description: "Menghubungkan logika permainan, loop kompleks, deteksi tabrakan (Raycasting), dan kustomisasi server events.",
      progressCount: 4
    },
    {
      code: "MOD-03",
      title: "AI Companion & NPC Scripting",
      time: "12 Bab (24 Jam)",
      difficulty: "Lanjut",
      description: "Gunakan model generatif AI untuk merancang asisten robot di dalam Roblox yang dapat mendeteksi pesan chat pemain.",
      progressCount: 5
    }
  ];

  return (
    <section id="kurikulum" className="bg-[#F5F5F7] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">
              Pilihan Paket Modul Unggulan
            </h2>
            <p className="text-base text-[#86868B]">
              Silabus komprehensif dari dasar hingga mahir, dirancang khusus untuk membangun fondasi berpikir komputasional secara global.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs text-[#86868B] font-medium select-none mt-4 md:mt-0">
            <span>Geser Kanan</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable grid track */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth -mx-6 px-6 lg:mx-0 lg:px-0 md:grid md:grid-cols-2 lg:grid-cols-3">
          {modulesList.map((module, index) => (
            <ModuleCard key={index} module={module} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-3xl p-6 border border-neutral-100 flex flex-col justify-between min-w-[280px] max-w-[340px] md:max-w-none md:min-w-0 shadow-[0_10px_25px_rgba(0,0,0,0.015)] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] shrink-0"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-mono text-[#86868B]">{module.code}</span>
          <span className="text-[10px] font-semibold text-[#0066CC] bg-[#0066CC]/10 px-2 py-0.5 rounded-full">
            {module.difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-[#1D1D1F] mb-2 transition-colors duration-300">
          {module.title}
        </h3>
        
        <span className="text-xs text-neutral-400 font-medium flex items-center gap-1 mb-4">
          <Clock className="w-3.5 h-3.5 text-[#86868B]" /> {module.time}
        </span>
        
        <p className="text-xs text-[#86868B] leading-relaxed mb-6">
          {module.description}
        </p>
      </div>

      <div className="border-t border-neutral-100 pt-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#86868B] font-semibold mr-1">Tingkat Kesulitan:</span>
          
          {/* Progress dots - Glow Canary Yellow on hover */}
          <div className="flex gap-1 select-none">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < module.progressCount 
                    ? hovered 
                      ? "bg-[#FFCC00] shadow-[0_0_8px_rgba(255,204,0,1)] scale-110" 
                      : "bg-neutral-800"
                    : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
        </div>

        <span className="text-[10px] font-bold text-[#1D1D1F] hover:text-[#0066CC] transition-colors flex items-center gap-0.5 cursor-pointer">
          Detail <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
