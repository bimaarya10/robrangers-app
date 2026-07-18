"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Trophy, Play, CheckCircle2, Calendar } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function OverviewTab() {
  const { user } = useUser();
  const [xp, setXp] = useState(0);
  const [progressBarHovered, setProgressBarHovered] = useState(false);

  // Dynamic counter increment for XP progress
  useEffect(() => {
    let start = 0;
    const end = user ? (user.xp % 1000) : 0;
    if (end === 0) {
      setXp(0);
      return;
    }
    const duration = 1000; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setXp(end);
        clearInterval(timer);
      } else {
        setXp(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [user]);

  // iOS Fluid Springs
  const iosSpring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8
  };

  const iosBouncy = {
    type: "spring" as const,
    stiffness: 400,
    damping: 18,
    mass: 0.6
  };

  // Staggered bento containers
  const bentoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // Bento card clip-path rounded corners expansion and scale entrance
  const bentoItemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      clipPath: "inset(10% 10% 10% 10% rounded 2rem)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0% rounded 2rem)",
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 16,
        mass: 0.55
      }
    }
  };

  // Staggered word animation for welcome header
  const titleContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const titleWord = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: iosSpring }
  };

  // 3D Parallax Mouse Tilt coordinate math
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Continue Learning card and button animation variables
  const continueCardVariants = {
    initial: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
    hover: { 
      y: -6, 
      boxShadow: "inset 0 0 30px rgba(0,0,0,0.04), 0 20px 45px rgba(0,0,0,0.08)",
      transition: iosSpring
    }
  };

  const continueButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.08,
      transition: iosSpring
    }
  };

  // Activity list sequential cascade
  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: iosSpring
    }
  };

  const welcomeWords = `Selamat Datang, Ranger ${user?.name || "Ranger"}! 👋`.split(" ");

  return (
    <div className="space-y-8 select-none">
      
      {/* Tab Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Overview</h1>
        <p className="text-xs text-[#86868B]">Dashboard pusat pembelajaran dan perkembangan skill Roblox-mu.</p>
      </div>

      {/* Bento Grid Layout wrapper */}
      <motion.div 
        variants={bentoContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        
        {/* Bento Card 1: Welcome Greeting (Spans 2 columns) */}
        <motion.div 
          variants={bentoItemVariants}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm flex flex-col justify-between md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#0066CC]/5 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="max-w-md">
            {/* Staggered word reveal for the header */}
            <motion.h2 
              variants={titleContainer}
              className="text-xl font-bold text-[#1D1D1F] mb-1 flex flex-wrap gap-x-1.5"
            >
              {welcomeWords.map((word, wIdx) => (
                <motion.span key={wIdx} variants={titleWord} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <p className="text-xs text-[#86868B] leading-relaxed mb-6">
              Kemajuan belajarmu meningkat sebesar 18% minggu ini. Selesaikan satu tantangan lagi untuk mengklaim badge mingguanmu.
            </p>
          </div>

          {/* AI Advisor Banner */}
          <div className="p-4 rounded-2xl bg-[#0066CC]/5 border border-[#0066CC]/15 flex items-start gap-3 mt-4">
            <div className="p-2 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#0066CC]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#0066CC] uppercase tracking-wider">AI Rekomendasi</span>
              <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed mt-0.5">
                "Lanjutkan Modul 'Advanced Lua Scripting' untuk menaikkan skormu dan membuka tantangan AI companion!"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento Card 2: Gamification Tracker */}
        <motion.div 
          variants={bentoItemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Tingkatan</span>
              <h3 className="text-lg font-extrabold text-[#1D1D1F]">
                Level {user?.level || 1} - {user && user.level >= 10 ? "Expert" : user && user.level >= 5 ? "Intermediate" : "Beginner"}
              </h3>
            </div>
            <div className="p-2.5 rounded-full bg-[#FFCC00]/10 text-amber-600">
              <Trophy className="w-5 h-5 fill-current" />
            </div>
          </div>

          {/* Interactive Tooltip Progress Bar */}
          <div 
            className="flex flex-col gap-2 relative"
            onMouseEnter={() => setProgressBarHovered(true)}
            onMouseLeave={() => setProgressBarHovered(false)}
          >
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#86868B]">Progress XP</span>
              <span className="text-[#1D1D1F] font-mono">{xp.toLocaleString()} / 1,000 XP</span>
            </div>
            
            {/* Dynamic height expansion on hover */}
            <motion.div 
              animate={{ height: progressBarHovered ? 18 : 12 }}
              transition={iosSpring}
              className="w-full bg-neutral-100 rounded-full overflow-hidden relative cursor-help"
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${(user ? (user.xp % 1000) / 10 : 0)}%` }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 60,   // elastic stiffness
                  damping: 10,     // bounce
                  mass: 0.6,
                  delay: 0.2
                }}
                className="h-full bg-[#FFCC00] rounded-full shadow-[0_0_8px_rgba(255,204,0,0.5)]"
              />
            </motion.div>

            {/* Bouncy Floating Tooltip */}
            <AnimatePresence>
              {progressBarHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  transition={iosBouncy}
                  className="absolute left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none flex items-center gap-1 z-30 whitespace-nowrap"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#FFCC00] fill-current" />
                  <span>+{1000 - (user ? (user.xp % 1000) : 0)} XP ke Level {(user?.level || 1) + 1}</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45 -translate-y-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-neutral-100 pt-4 mt-4 flex items-center justify-between text-[10px] text-[#86868B] font-semibold uppercase tracking-wider">
            <span>Tersisa {1000 - (user ? (user.xp % 1000) : 0)} XP menuju Level {(user?.level || 1) + 1}</span>
          </div>
        </motion.div>

        {/* Bento Card 3: Continue Learning Progress (3D Parallax Mouse tilt card) */}
        <motion.div 
          variants={bentoItemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            rotateX, 
            rotateY,
            transformPerspective: 800,
            originX: 0.5,
            originY: 0.5
          }}
          className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm flex flex-col justify-between md:col-span-2 relative overflow-hidden cursor-pointer"
        >
          {/* Parallax inner shadow mask */}
          <motion.div 
            variants={continueCardVariants}
            className="absolute inset-0 bg-transparent rounded-3xl pointer-events-none border border-transparent z-0"
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 w-full">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200/40 relative overflow-hidden">
                <span className="absolute inset-0 bg-[#0066CC]/5" />
                <span className="text-[#0066CC] font-bold text-xs">LUA</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Modul Sedang Dipelajari</span>
                <h4 className="text-base font-bold text-[#1D1D1F] mt-0.5">Membangun Objek Interaktif Obby</h4>
                <span className="text-xs text-[#86868B] mt-0.5">Fase 2 - Client-Server Messaging System</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-[#1D1D1F]">65%</span>
                <span className="text-[10px] text-[#86868B]">Selesai</span>
              </div>
              <motion.button 
                variants={continueButtonVariants}
                onClick={() => {}}
                className="px-4 py-2.5 rounded-xl bg-[#1D1D1F] text-white hover:bg-[#0066CC] hover:border-[#0066CC] transition-colors text-xs font-bold flex items-center gap-1.5 shadow-sm border border-neutral-800"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Lanjutkan
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bento Card 4: Riwayat Belajar Feed */}
        <motion.div 
          variants={bentoItemVariants}
          whileHover={{ scale: 1.008 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm flex flex-col"
        >
          <h3 className="text-sm font-bold text-[#1D1D1F] mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0066CC]" /> Riwayat Belajar
          </h3>

          {/* Sequential cascade child items */}
          <motion.div 
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 relative flex-1"
          >
            {/* Timeline Line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-neutral-100" />

            {(user?.learningHistory || []).map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={listItem}
                className="relative pl-8 flex justify-between items-center text-xs"
              >
                {/* Check circle nodes */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-0.5 z-10">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="font-semibold text-[#1D1D1F]">{item.title}</h4>
                  <span className="text-[10px] text-[#86868B]">{item.date}</span>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>

    </div>
  );
}
