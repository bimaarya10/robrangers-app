"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Milestone {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
}

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestonesList: Milestone[] = [
    {
      step: "01",
      title: "Setup & World Building",
      subtitle: "Visualisasi Game & Lingkungan 3D",
      desc: "Instalasi Roblox Studio, menjelajahi workspace, menyusun terrain 3D, dan memasukkan aset visual game pertama Anda.",
      badge: "Fase Awal"
    },
    {
      step: "02",
      title: "AI Co-Pilot Scripting",
      subtitle: "Pengenalan Logika Kode Interaktif",
      desc: "Mulai menulis script Lua dibantu oleh Copilot Mentor AI untuk merancang rintangan dinamis dan mekanisme tombol interaktif.",
      badge: "Fase Logika"
    },
    {
      step: "03",
      title: "Multiplayer Networking",
      subtitle: "Koneksi Client & Data Simpanan",
      desc: "Mengembangkan script server-side untuk melacak skor pemain, leaderboard global, dan menyimpan kemajuan game menggunakan Roblox DataStore.",
      badge: "Fase Jaringan"
    },
    {
      step: "04",
      title: "Launch & Monetize",
      subtitle: "Mempublikasikan Game & Monetisasi",
      desc: "Uji coba akhir (Beta Testing) bersama siswa lain, lalu publikasikan game ke Roblox Hub serta pasang monetisasi gamepass untuk menghasilkan Robux.",
      badge: "Fase Rilis"
    }
  ];

  return (
    <section id="roadmap" className="bg-white py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-28">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">
            Kurikulum Berbasis Project-Based Learning
          </h2>
          <p className="text-base text-[#86868B]">
            Alur belajar interaktif (Roadmap) di RobRangers yang disesuaikan dengan kurikulum internasional untuk melatih computational thinking secara intensif.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          
          {/* Gray line base track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-[1px] md:-translate-x-1/2" />
          
          {/* Animated fill track */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0066CC] to-[#FFCC00] -translate-x-[1px] md:-translate-x-1/2"
          />

          {/* Milestones list */}
          <div className="space-y-16 lg:space-y-24">
            {milestonesList.map((item, index) => (
              <TimelineStep key={index} item={item} index={index} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function TimelineStep({ item, index }: { item: Milestone; index: number }) {
  const stepRef = useRef(null);
  // Active threshold: triggers when the element enters the middle 60% of the screen
  const isInView = useInView(stepRef, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <div 
      ref={stepRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Node Bullet point */}
      <div className="absolute left-4 md:left-1/2 top-1.5 md:top-1/2 -translate-x-[5px] md:-translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div
          animate={
            isInView 
              ? { scale: 1.3, backgroundColor: "#0066CC", boxShadow: "0 0 14px rgba(0, 102, 204, 0.7)" } 
              : { scale: 1, backgroundColor: "#E5E5E5" }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-3.5 h-3.5 rounded-full border-2 border-white bg-neutral-300"
        />
      </div>

      {/* Card Content */}
      <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40, y: 15 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? 40 : -40, y: 15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl p-6 lg:p-8 border border-neutral-100 shadow-[0_10px_25px_rgba(0,0,0,0.015)] relative"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#0066CC] tracking-wide uppercase">
              {item.badge}
            </span>
            <span className="text-3xl font-extrabold text-neutral-200 font-mono tracking-tighter">
              {item.step}
            </span>
          </div>

          <h3 className="text-lg lg:text-xl font-extrabold text-[#1D1D1F] mb-1">
            {item.title}
          </h3>
          
          <h4 className="text-xs font-semibold text-[#86868B] mb-4 uppercase tracking-wider">
            {item.subtitle}
          </h4>
          
          <p className="text-xs sm:text-sm text-[#86868B] leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      </div>

      {/* Spacing alignment */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}
