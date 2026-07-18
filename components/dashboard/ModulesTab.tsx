"use client";

import React, { useState } from "react";
import { motion as motionImported, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Volume2, 
  Maximize, 
  Award, 
  Lock, 
  Check, 
  ChevronRight, 
  FileText, 
  HelpCircle, 
  Code,
  ArrowLeft
} from "lucide-react";

interface Module {
  id: number;
  title: string;
  level: string;
  duration: string;
  desc: string;
}

export default function ModulesTab() {
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);
  const [subTab, setSubTab] = useState("text");
  const [isCompleted, setIsCompleted] = useState(false); // Completion simulator
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState("");

  const modules: Module[] = [
    { 
      id: 1, 
      title: "01. Workspace & Terrain Roblox", 
      level: "Beginner", 
      duration: "10 Mins",
      desc: "Pelajari dasar-dasar navigasi workspace dan memahat terrain 3D di Roblox Studio." 
    },
    { 
      id: 2, 
      title: "02. Script Logika & Part Tombol", 
      level: "Intermediate", 
      duration: "12 Mins",
      desc: "Menghubungkan fungsi sentuhan (Touched event) pada part tombol untuk memicu logika Lua." 
    },
    { 
      id: 3, 
      title: "03. Client-Server Messaging", 
      level: "Advance", 
      duration: "15 Mins",
      desc: "Mempelajari RemoteEvent dan RemoteFunction untuk sinkronisasi aksi antar pemain." 
    }
  ];

  const handleAnswerSubmit = (optionIndex: number) => {
    setQuizSelected(optionIndex);
    if (optionIndex === 0) {
      setQuizFeedback("Luar biasa! Benar sekali. print() adalah fungsi bawaan Lua untuk mencetak pesan ke output.");
    } else {
      setQuizFeedback("Kurang tepat. Coba perhatikan lagi script editor di Roblox Studio.");
    }
  };

  // iOS Spring Configurations
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

  return (
    <div className="space-y-8 select-none">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Modul & Materi</h1>
          <p className="text-xs text-[#86868B]">Pilih modul pembelajaran di bawah ini untuk memulai koding.</p>
        </div>
        
        {/* Simulator Toggle */}
        <button
          onClick={() => {
            setIsCompleted(!isCompleted);
            setQuizSelected(null);
            setQuizFeedback("");
          }}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors relative z-25 ${
            isCompleted 
              ? "bg-green-50 text-green-600 border-green-200" 
              : "bg-white text-charcoal border-neutral-200"
          }`}
        >
          {isCompleted ? "Simulasi: Completed (100%)" : "Simulasi: Belum Selesai (65%)"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {expandedModuleId === null ? (
          // GRID VIEW OF MODULES
          <motionImported.div 
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={iosSpring}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {modules.map((mod) => (
              <motionImported.div
                key={mod.id}
                layoutId={`module-card-${mod.id}`}
                onClick={() => setExpandedModuleId(mod.id)}
                whileHover={{ scale: 1.025, y: -4 }}
                whileTap={{ scale: 0.96 }}
                transition={iosSpring}
                className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm cursor-pointer hover:shadow-md flex flex-col justify-between min-h-[190px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#0066CC]/5 to-transparent rounded-bl-full pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold text-[#0066CC] bg-[#0066CC]/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {mod.level}
                  </span>
                  <h3 className="text-sm font-bold text-[#1D1D1F] mt-4 leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-[#86868B] mt-2 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-4 mt-4 flex justify-between items-center text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">
                  <span>{mod.duration}</span>
                  <span className="text-[#0066CC] flex items-center gap-0.5">Mulai Belajar <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </motionImported.div>
            ))}
          </motionImported.div>
        ) : (
          // WORKSPACE VIEW (SHARED ELEMENT EXPANSION)
          <motionImported.div
            key="workspace"
            layoutId={`module-card-${expandedModuleId}`}
            transition={iosSpring}
            className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/50 shadow-md relative"
          >
            {/* Close / Back button */}
            <motionImported.button
              onClick={() => setExpandedModuleId(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 p-2 rounded-full hover:bg-neutral-100 border border-neutral-200/50 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D1D1F] shadow-sm relative z-20 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Modul
            </motionImported.button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Media Player & Text Sub-Tabs */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 16:9 Mock Video Player */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#1A1A22] border border-neutral-200/10 group">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="perspective-grid" />
                    </div>
                    <motionImported.div 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-md cursor-pointer"
                    >
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </motionImported.div>
                    <span className="text-xs text-neutral-400 mt-4 font-mono">Modul 02: Membangun Objek Interaktif Obby</span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1">Video Tutorial: Client-Server Messaging • 12:45 Mins</span>
                  </div>

                  {/* Player Controls */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-white/30 rounded-full cursor-pointer relative">
                      <div className="absolute left-0 top-0 h-full w-[65%] bg-[#0066CC] rounded-full" />
                      <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-white">
                      <div className="flex items-center gap-4">
                        <button className="hover:text-[#0066CC] transition-colors"><Play className="w-4 h-4 fill-current" /></button>
                        <button className="hover:text-[#0066CC] transition-colors"><Volume2 className="w-4 h-4" /></button>
                        <span className="font-mono text-[10px] text-neutral-300">08:15 / 12:45</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="hover:text-[#0066CC] transition-colors"><Maximize className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub Tab selection with elastic bounce layout indicators */}
                <div className="border-b border-neutral-200 flex gap-6 relative">
                  {[
                    { id: "text", label: "Materi Teks", icon: FileText },
                    { id: "quiz", label: "Quiz Interaktif", icon: HelpCircle },
                    { id: "challenge", label: "Tantangan Koding", icon: Code }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = subTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={`flex items-center gap-1.5 pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors py-1 shrink-0 ${
                          isActive ? "text-[#0066CC]" : "text-[#86868B] hover:text-[#1D1D1F]"
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5 z-10" />
                        <span className="z-10">{tab.label}</span>
                        {isActive && (
                          <motionImported.span 
                            layoutId="activeSubTabIndicator"
                            className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0066CC]"
                            transition={iosBouncy}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Text / Challenge workspace content cards */}
                <motionImported.div 
                  layout
                  transition={iosSpring}
                  className="bg-white rounded-2xl p-6 border border-neutral-100 min-h-[190px]"
                >
                  <AnimatePresence mode="wait">
                    {subTab === "text" && (
                      <motionImported.div
                        key="text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 text-sm text-[#86868B] leading-relaxed"
                      >
                        <h3 className="font-bold text-[#1D1D1F] text-base">Fungsi Print & Output di Roblox Studio</h3>
                        <p>
                          Saat merancang logika game di Roblox, kita memerlukan alat komunikasi untuk melacak jika skrip kita berjalan lancar. Di Lua script, perintah bawaan terpenting untuk hal ini adalah <code>print()</code>.
                        </p>
                        <p>
                          Apapun nilai yang diletakkan di dalam tanda kurung <code>print("Teks di Sini")</code> akan diproyeksikan langsung pada panel <strong>Output Window</strong> di Roblox Studio. Ini sangat berguna untuk mendeteksi logic error atau sekadar melacak parameter data.
                        </p>
                      </motionImported.div>
                    )}

                    {subTab === "quiz" && (
                      <motionImported.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="font-bold text-[#1D1D1F] text-sm mb-1">Pertanyaan 1 dari 3:</h3>
                          <p className="text-xs text-[#86868B]">Fungsi manakah yang digunakan untuk mencetak log ke output di Roblox Studio?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            "print()",
                            "console.log()",
                            "System.out.println()",
                            "output.write()"
                          ].map((opt, oIdx) => (
                            <motionImported.button
                              key={oIdx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswerSubmit(oIdx)}
                              className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all duration-300 ${
                                quizSelected === oIdx 
                                  ? oIdx === 0 
                                    ? "bg-green-50 border-green-300 text-green-700 font-bold" 
                                    : "bg-red-50 border-red-300 text-red-700"
                                  : "bg-white border-neutral-200 hover:bg-[#F5F5F7]/30 hover:border-neutral-300"
                              }`}
                            >
                              {opt}
                            </motionImported.button>
                          ))}
                        </div>

                        {quizFeedback && (
                          <motionImported.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-2xl border text-xs font-medium ${
                              quizSelected === 0 
                                ? "bg-green-50/50 border-green-200 text-green-700" 
                                : "bg-red-50/50 border-red-200 text-red-700"
                            }`}
                          >
                            {quizFeedback}
                          </motionImported.div>
                        )}
                      </motionImported.div>
                    )}

                    {subTab === "challenge" && (
                      <motionImported.div
                        key="challenge"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="font-bold text-[#1D1D1F] text-base mb-1">Tantangan: Sensor Tombol Otomatis</h3>
                          <p className="text-xs text-[#86868B] leading-relaxed">
                            Hubungkan fungsi <code>onTouched</code> milik Part tombol agar mencetak tulisan "Tombol Aktif!" saat diinjak oleh karakter pemain.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-[#1E1E24] rounded-2xl border border-white/[0.06] text-xs font-mono text-neutral-300 space-y-1 shadow-inner">
                          <div><span className="text-purple-400">local</span> button = script.Parent</div>
                          <div><span className="text-purple-400">local function</span> <span className="text-green-400">onTouched</span>(otherPart)</div>
                          <div>  <span className="text-neutral-500">-- TULIS KODEMU DI BAWAH SINI</span></div>
                          <div className="pl-4 py-1.5 bg-neutral-900/60 rounded border border-dashed border-white/10 w-fit text-neutral-500 px-3 my-1">
                            print("Tombol Aktif!")
                          </div>
                          <div><span className="text-purple-400">end</span></div>
                          <div>button.Touched:<span className="text-green-400">Connect</span>(onTouched)</div>
                        </div>
                      </motionImported.div>
                    )}
                  </AnimatePresence>
                </motionImported.div>
              </div>

              {/* Right Column: Shimmering Certificate on completion & Syllabus */}
              <div className="lg:col-span-4">
                <div className="space-y-6">
                  
                  {/* Metallic Shimmer Certificate Wrapper */}
                  <div className={isCompleted ? "p-[2px] rounded-[26px] animate-shimmer-border" : ""}>
                    <div 
                      className={`rounded-[24px] p-6 transition-all duration-500 overflow-hidden relative flex flex-col justify-between min-h-[280px] ${
                        isCompleted 
                          ? "bg-white text-[#1D1D1F]" 
                          : "bg-white border border-neutral-200/50 shadow-sm text-neutral-400"
                      }`}
                    >
                      {/* Metallic shine reflection overlay */}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -translate-x-full animate-[shimmer_3s_infinite]" />
                      )}

                      {/* Badge asset */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full pointer-events-none flex items-center justify-center">
                        <motionImported.div
                          animate={isCompleted ? {
                            rotate: 360,
                            scale: [1, 1.08, 1],
                            filter: [
                              "drop-shadow(0 0 4px rgba(255,204,0,0.3))",
                              "drop-shadow(0 0 16px rgba(255,204,0,0.75))",
                              "drop-shadow(0 0 4px rgba(255,204,0,0.3))"
                            ]
                          } : {}}
                          transition={{ 
                            rotate: { duration: 15, ease: "linear", repeat: Infinity },
                            scale: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
                            filter: { duration: 2.5, ease: "easeInOut", repeat: Infinity }
                          }}
                          className={`p-2.5 rounded-full ${isCompleted ? "bg-[#FFCC00]/10 text-amber-500 shadow" : "bg-neutral-100 text-neutral-300"}`}
                        >
                          {isCompleted ? <Award className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                        </motionImported.div>
                      </div>

                      <div className="relative z-10">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          isCompleted ? "bg-[#FFCC00]/10 text-amber-600" : "bg-neutral-100 text-neutral-400"
                        }`}>
                          Sertifikat Kelulusan
                        </span>
                        
                        <h3 className="text-lg font-extrabold tracking-tight mt-6 text-[#1D1D1F]">
                          {isCompleted ? "Sertifikat Siap Dicetak! 🎓" : "Sertifikat Masih Terkunci"}
                        </h3>
                        
                        <p className={`text-xs mt-2 leading-relaxed ${
                          isCompleted ? "text-[#1D1D1F]/80" : "text-[#86868B]"
                        }`}>
                          {isCompleted 
                            ? "Selamat! Anda telah menyelesaikan 100% kurikulum Sandbox Roblox & AI Scripting. Sertifikat keahlian Anda siap diunduh." 
                            : "Selesaikan sisa 35% modul dan kuis untuk membuka dokumen sertifikasi keahlian koding Anda."}
                        </p>
                      </div>

                      <div className="mt-8 border-t border-neutral-100 pt-6 relative z-10">
                        {isCompleted ? (
                          <motionImported.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3 rounded-xl bg-[#1D1D1F] hover:bg-neutral-800 text-white text-xs font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5"
                          >
                            <Award className="w-4 h-4" />
                            Unduh Sertifikat PDF
                          </motionImported.button>
                        ) : (
                          <div className="flex items-center gap-2 text-xs font-bold text-[#86868B]">
                            <Lock className="w-4 h-4" />
                            <span>Lengkapi {modules.filter(m => m.id === 3).map(m => m.title)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Syllabus list */}
                  <div className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Silabus Modul</h4>
                    <div className="space-y-3.5 text-xs font-medium">
                      {modules.map((item, idx) => {
                        const isFinished = idx < 2 || isCompleted;
                        return (
                          <div key={idx} className="flex justify-between items-center py-1">
                            <span className={isFinished ? "text-[#1D1D1F]" : "text-[#86868B]"}>{item.title}</span>
                            {isFinished ? (
                              <span className="w-5 h-5 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-400 border border-neutral-200/50 flex items-center justify-center shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motionImported.div>
        )}
      </AnimatePresence>

    </div>
  );
}
