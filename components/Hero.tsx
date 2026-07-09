"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, Terminal, Activity, Check, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const [isScriptRunning, setIsScriptRunning] = useState(false);
  const [scriptSuccess, setScriptSuccess] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const handleRunScript = () => {
    if (isScriptRunning) return;
    setIsScriptRunning(true);
    setScriptSuccess(false);
    setConsoleOutput(["[System]: Connecting to Roblox API...", "[System]: Transmitting code block..."]);

    setTimeout(() => {
      setConsoleOutput(prev => [...prev, "[AI Mentor]: Syntax verification: OK (Lua 5.1 compliant)"]);
    }, 700);

    setTimeout(() => {
      setConsoleOutput(prev => [
        ...prev, 
        "[RobRanger AI]: Spawning Roblox object companion 'CyberBot'...",
        "[RobRanger AI]: Success! Companion bot instantiated in Workspace 🤖"
      ]);
    }, 1500);

    setTimeout(() => {
      setConsoleOutput(prev => [
        ...prev,
        "[System]: Script execution complete. AI Mentor Robby initialized successfully.",
        "✨ Ready to play! Build, code and launch your virtual world."
      ]);
      setScriptSuccess(true);
      setIsScriptRunning(false);
    }, 2400);
  };

  // Text Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const words = "Kuasai Pemrograman lewat Dunia Virtual. Didampingi AI.".split(" ");

  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-12 pb-20 lg:py-32">
      {/* 3D Grid background simulation */}
      <div className="absolute inset-0 z-0 h-full pointer-events-none overflow-hidden bg-white">
        <div className="perspective-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left text column */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Focal Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066CC]/10 border border-[#0066CC]/20 text-xs font-semibold text-[#0066CC] mb-8 tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Roblox Scripting Platform
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.08] font-extrabold tracking-tight text-[#1D1D1F] mb-6">
              {words.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={itemVariants} 
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="text-lg text-[#86868B] max-w-lg mb-10 leading-relaxed"
          >
            Belajar coding nyata secara menyenangkan di <strong>Roblox Studio</strong>. Dibimbing langsung oleh <strong>Generative AI Mentor</strong> yang interaktif untuk merancang script logika, memecahkan error secara realtime, hingga mempublikasikan game pertamamu.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto"
          >
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("levels")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full text-sm font-semibold bg-[#1D1D1F] text-white shadow-lg hover:shadow-xl hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-3 border border-neutral-800 border-gradient-glow"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button className="px-6 py-4 text-sm font-semibold text-[#1D1D1F] hover:text-[#0066CC] transition-colors flex items-center justify-center gap-1.5 group">
              <Play className="w-4 h-4 fill-current group-hover:scale-105 transition-transform" />
              Lihat Video Demo
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>

        {/* Right mockup column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex justify-center w-full"
        >
          {/* Subtle Glowing Blur effects */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#0066CC]/10 blur-[65px] animate-pulse" />
          <div className="absolute -bottom-16 -right-12 w-72 h-72 rounded-full bg-[#FFCC00]/10 blur-[75px] animate-pulse delay-700" />

          {/* Roblox Workspace Simulated Viewport */}
          <div className="relative w-full max-w-[540px] rounded-2xl shadow-2xl border border-neutral-200/50 bg-[#121216] overflow-hidden flex flex-col text-sm text-neutral-300 font-mono">
            {/* macOS Window Controls */}
            <div className="px-4 py-3 bg-[#1A1A22] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-xs text-neutral-400 font-medium">RobRangersStudio - script_mentor.lua</div>
              <div className="w-12" />
            </div>

            {/* Simulated Workspace */}
            <div className="p-5 flex-1 min-h-[250px] overflow-x-auto text-xs leading-relaxed">
              <div className="flex gap-4">
                {/* Line Numbers */}
                <div className="text-neutral-600 select-none text-right pr-2">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                </div>
                {/* Lua Script Content */}
                <div className="flex-1">
                  <div><span className="text-[#86868B] font-style-italic">-- RobRangers AI Mentor Co-Pilot</span></div>
                  <div><span className="text-purple-400">local</span> <span className="text-blue-300">RobRanger</span> = <span className="text-yellow-400">require</span>(game.ReplicatedStorage.RobRanger)</div>
                  <div><span className="text-purple-400">local</span> <span className="text-blue-300">Player</span> = game.Players.LocalPlayer</div>
                  <div className="h-2" />
                  <div><span className="text-[#86868B] font-style-italic">-- Click "Jalankan Skrip" to run logs</span></div>
                  <div><span className="text-purple-400">local</span> <span className="text-blue-300">aiMentor</span> = <span className="text-blue-300">RobRanger</span>.<span className="text-green-400">ConnectMentor</span>()</div>
                  <div><span className="text-blue-300">aiMentor</span>:<span className="text-green-400">OnQuerySent</span>(<span className="text-purple-400">function</span>(query)</div>
                  <div className="pl-4"><span className="text-purple-400">if</span> query == <span className="text-[#FF8800]">"buat_companion"</span> <span className="text-purple-400">then</span></div>
                  <div className="pl-8"><span className="text-purple-400">local</span> pet = <span className="text-blue-300">RobRanger</span>.<span className="text-green-400">SpawnCompanion</span>(<span className="text-[#FF8800]">"CyberBot"</span>)</div>
                  <div className="pl-8"><span className="text-blue-300">aiMentor</span>:<span className="text-green-400">Say</span>(<span className="text-[#FF8800]">"Ranger, Companion-mu siap meluncur!"</span>)</div>
                  <div className="pl-4"><span className="text-purple-400">end</span></div>
                  <div><span className="text-purple-400">end</span>)</div>
                </div>
              </div>
              
              {/* Output log drawer */}
              <AnimatePresence>
                {(isScriptRunning || consoleOutput.length > 0) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="mt-4 p-3 bg-neutral-950 rounded-lg border border-white/[0.08]"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.05] text-[10px] text-neutral-400 select-none">
                      <span className="flex items-center gap-1"><Terminal className="w-3 h-3 text-[#0066CC]" /> Output Konsol</span>
                      <span className="flex items-center gap-1">
                        <Activity className={`w-3 h-3 ${isScriptRunning ? "animate-spin text-[#FFCC00]" : "text-green-500"}`} />
                        {isScriptRunning ? "Processing..." : "Active"}
                      </span>
                    </div>
                    <div className="pt-2 text-[10px] space-y-1 text-neutral-400 max-h-[100px] overflow-y-auto">
                      {consoleOutput.map((log, idx) => (
                        <div key={idx} className={log.startsWith("✨") ? "text-[#FFCC00] font-bold" : log.includes("[AI Mentor]") ? "text-[#0066CC]" : ""}>
                          {log}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer triggers */}
            <div className="px-4 py-3 bg-[#1A1A22] border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                RobRangers AI: Online
              </span>
              <button
                onClick={handleRunScript}
                disabled={isScriptRunning}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                  scriptSuccess
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : isScriptRunning
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-[#0066CC] text-white hover:bg-[#0071E3]"
                }`}
              >
                {scriptSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Berhasil Dijalankan
                  </>
                ) : isScriptRunning ? (
                  "Mengeksekusi..."
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Jalankan Skrip
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Floating AI Mentor bubble overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute -right-4 -bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[210px] border border-neutral-100 flex gap-3 z-20"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066CC] to-cyan-400 flex items-center justify-center text-white font-bold font-mono text-xs shrink-0 shadow-inner">
              AI
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-[11px] font-bold text-[#1D1D1F]">Robby (AI Mentor)</h4>
              <p className="text-[10px] text-[#86868B] leading-relaxed">
                "Klik tombol di atas untuk melihat bagaimana AI mendeteksi script logikamu secara visual!"
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
