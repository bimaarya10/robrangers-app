"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Heart, 
  ArrowUpRight 
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface Project {
  id: number;
  title: string;
  author: string;
  authorId: string;
  plays: string;
  score: number;
  feedback: string;
  likes: number;
  likedBy: string[];
  isLiked?: boolean;
}

export default function ProjectTab() {
  const { user, refreshUser } = useUser();
  const [dragActive, setDragActive] = useState(false);
  const [uploaderHovered, setUploaderHovered] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [aiReport, setAiReport] = useState<string | null>(null);
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [peerProjects, setPeerProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setPeerProjects(data.projects);
      }
    } catch (err) {
      console.error("Gagal memuat showcase projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const iosSpring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".rbxl")) {
        simulateUpload(file);
      } else {
        alert("Harap unggah file proyek Roblox berekstensi .rbxl");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith(".rbxl")) {
        simulateUpload(file);
      } else {
        alert("Harap unggah file proyek Roblox berekstensi .rbxl");
      }
    }
  };

  const simulateUpload = (file: File) => {
    setUploadedFile(file.name);
    setUploadProgress(0);
    setAiReport(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(100);

        // Call backend upload API
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name.replace(".rbxl", ""));

        fetch("/api/projects", {
          method: "POST",
          body: formData
        })
          .then(res => {
            if (!res.ok) throw new Error("Gagal mengunggah file.");
            return res.json();
          })
          .then(data => {
            setAiReport(data.report);
            setUploadProgress(null);
            refreshUser(); // Sync user XP/levels
            fetchProjects(); // Reload showcase board
          })
          .catch(err => {
            alert(err.message || "Gagal memproses file.");
            setUploadProgress(null);
          });
      } else {
        setUploadProgress(progress);
      }
    }, 150);
  };

  const toggleLike = async (id: number) => {
    try {
      const res = await fetch("/api/projects/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id })
      });
      if (res.ok) {
        const data = await res.json();
        setPeerProjects(prev =>
          prev.map(p => (p.id === id ? { 
            ...p, 
            likes: data.project.likes, 
            likedBy: data.project.likedBy
          } : p))
        );
      }
    } catch (err) {
      console.error("Gagal mengubah like proyek:", err);
    }
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Project Showcase</h1>
        <p className="text-xs text-[#86868B]">Unggah proyek Roblox Studio-mu untuk dinilai oleh AI, atau lihat galeri karya teman sekelas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: Uploader (Spans 6 columns) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">Unggah Proyek Roblox</h3>
            
            {/* Drag & Drop Area with vector walking dashes */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onMouseEnter={() => setUploaderHovered(true)}
              onMouseLeave={() => setUploaderHovered(false)}
              className={`rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative min-h-[220px] ${
                dragActive ? "bg-[#0066CC]/5" : "hover:bg-[#F5F5F7]/30"
              }`}
            >
              {/* Walking dashes SVG using Framer Motion */}
              <svg className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none">
                <motion.rect
                  width="100%"
                  height="100%"
                  fill="none"
                  rx="16"
                  stroke={dragActive || uploaderHovered ? "#0066CC" : "#E5E5E5"}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  animate={dragActive || uploaderHovered ? { strokeDashoffset: [0, -24] } : { strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                />
              </svg>

              <input 
                type="file" 
                accept=".rbxl"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="p-3.5 rounded-full bg-neutral-100 text-[#86868B] mb-4 relative z-10">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-[#1D1D1F] mb-1 relative z-10">Drag & Drop Proyek Roblox Studio Anda</h4>
              <p className="text-[10px] text-[#86868B] max-w-xs mb-3 relative z-10">Format file berekstensi .rbxl. File Anda akan diuji secara otomatis oleh modul AI Evaluator.</p>
              <span className="text-[10px] font-bold text-[#0066CC] hover:underline relative z-10">Atau pilih file dari komputer</span>
            </div>

            {/* Uploading progress tracker */}
            {uploadProgress !== null && (
              <div className="p-4 rounded-2xl bg-[#F5F5F7]/50 border border-neutral-100 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#1D1D1F] flex items-center gap-1.5"><FileText className="w-4 h-4 text-[#0066CC]" /> {uploadedFile}</span>
                  <span className="text-[#0066CC]">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-200/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0066CC] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="text-[9px] text-[#86868B] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-pulse" /> AI sedang mengevaluasi arsitektur client-server...
                </span>
              </div>
            )}

            {/* AI evaluation report card */}
            {aiReport && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-[#0066CC]/5 border border-[#0066CC]/15 flex gap-3.5"
              >
                <div className="p-2 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 h-9 w-9">
                  <Sparkles className="w-4.5 h-4.5 text-[#0066CC]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">AI Laporan Evaluasi</span>
                  <p className="text-xs text-[#1D1D1F] font-semibold leading-relaxed mt-1 whitespace-pre-line">
                    {aiReport}
                  </p>
                  <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 mt-3">
                    <CheckCircle className="w-3.5 h-3.5" /> Ditambahkan ke Portofolio
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Peer Showcase Grid (Spans 6 columns) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">Karya Teman Kelas</h3>

            <div className="space-y-4">
              {peerProjects.map((proj) => {
                const isHovered = hoveredCard === proj.id;
                const isLiked = user && proj.likedBy ? proj.likedBy.includes(user.id) : !!proj.isLiked;
                
                return (
                  <motion.div 
                    key={proj.id}
                    onMouseEnter={() => setExpandedCard(proj.id)}
                    onMouseLeave={() => setExpandedCard(null)}
                    whileHover={{
                      y: -6,
                      scale: 1.015,
                      rotateX: 2.5,
                      rotateY: -2.5,
                      boxShadow: "0 22px 45px -12px rgba(0, 0, 0, 0.08)"
                    }}
                    transition={iosSpring}
                    className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col cursor-pointer relative"
                    style={{ transformPerspective: 1000 }}
                  >
                    {/* Decorative abstract mesh that blurs on hover */}
                    <motion.div
                      animate={{ filter: isHovered ? "blur(10px)" : "blur(0px)" }}
                      transition={iosSpring}
                      className="absolute inset-0 opacity-[0.03] bg-gradient-to-tr from-[#0066CC] via-[#FFCC00] to-cyan-400 pointer-events-none z-0"
                    />

                    {/* Basic Info panel */}
                    <div className="p-4 flex justify-between items-center bg-white/95 relative z-10 border-b border-neutral-100">
                      <div className="flex flex-col gap-0.5 text-left">
                        <h4 className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1">
                          {proj.title}
                          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                        </h4>
                        <span className="text-[10px] text-[#86868B]">{proj.author} • {proj.plays}</span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            {proj.score}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1 relative z-20">
                          <span className="text-[10px] font-mono text-neutral-400 font-bold">{proj.likes || 0}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(proj.id);
                            }}
                            className={`p-1.5 rounded-full transition-colors ${
                              isLiked 
                                ? "text-red-500 bg-red-50 hover:bg-red-100" 
                                : "text-neutral-400 hover:text-red-500 hover:bg-neutral-100"
                            }`}
                          >
                            <Heart className={`w-4.5 h-4.5 ${isLiked ? "fill-current" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Feedback assessment block sliding up on hover */}
                    <div className="overflow-hidden relative z-10">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={iosSpring}
                        className="bg-[#F5F5F7]/95 border-t border-neutral-100 backdrop-blur-md"
                      >
                        <div className="p-4 flex gap-3 text-left">
                          <div className="p-1.5 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0 w-7 h-7 mt-0.5">
                            <Sparkles className="w-4 h-4 text-[#0066CC]" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-bold text-[#0066CC] uppercase tracking-wider">Tinjauan AI Mentor</span>
                            <p className="text-xs text-[#1D1D1F] leading-relaxed mt-1">
                              {proj.feedback}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );

  // Helper local states for card morphing triggers
  function setExpandedCard(cardId: number | null) {
    setHoveredCard(cardId);
  }
}
