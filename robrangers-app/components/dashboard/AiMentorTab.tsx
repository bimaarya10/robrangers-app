"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Cpu, 
  Terminal, 
  AlertCircle, 
  Check, 
  RefreshCw, 
  HelpCircle,
  Code
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  code?: string;
  debuggable?: boolean;
}

// Matrix-like Hover Character Scrambler
const ScrambledText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2.5; // Scramble speed step
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};

export default function AiMentorTab() {
  const [query, setQuery] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Halo Ranger! Saya Robby, mentor AI kodingmu. Ada masalah skrip di Roblox Studio yang ingin kamu tanyakan atau debug?"
    },
    {
      id: "msg-2",
      sender: "user",
      text: "Tolong debug skrip sensor pintu otomatis saya, ini error terus di output window.",
      code: "Local sensor = script.Parent\nsensor.Touched:Connect(function(hit)\n  print(\"Pintu Terbuka!\")\nend)",
      debuggable: true
    }
  ]);
  
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugged, setDebugged] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([
    "Gunakan keyword 'local' huruf kecil untuk mendeklarasikan variabel lokal.",
    "Periksa Output Window di Roblox Studio untuk melihat line error secara detail.",
    "Pastikan skrip berada langsung di bawah Part sensor pintu."
  ]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch("/api/ai-mentor");
        if (res.ok) {
          const data = await res.json();
          if (data.chats && data.chats.length > 0) {
            const formatted = data.chats.map((c: any) => ({
              id: c.id,
              sender: c.sender,
              text: c.text
            }));
            setMessages(formatted);
          }
        }
      } catch (err) {
        console.error("Gagal memuat riwayat chat:", err);
      }
    };
    fetchChatHistory();
  }, []);

  // Apple Spring parameters
  const appleSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 0.5
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: Message = { id: `user-${Date.now()}`, sender: "user", text: query };
    setMessages(prev => [...prev, userMsg]);
    const promptToSend = query;
    setQuery("");

    // Add loading typing indicator
    const loadingId = `ai-loading-${Date.now()}`;
    setMessages(prev => [...prev, { id: loadingId, sender: "ai", text: "Robby sedang mengetik..." }]);

    try {
      const res = await fetch("/api/ai-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToSend })
      });

      const data = await res.json();

      // Replace typing indicator with actual answer
      setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: res.ok ? data.reply : "Maaf, terjadi kesalahan saat menghubungi mentor AI Anda."
      }));

      // Extract tips/hints from response if matching 💡 icon
      if (res.ok && data.reply) {
        const lines = data.reply.split("\n");
        const tips = lines.filter((l: string) => l.includes("💡") || l.includes("Tips") || l.includes("Tip:"));
        if (tips.length > 0) {
          const tipText = tips[0].replace(/💡|Tips:|Tip:/g, "").trim();
          setRecommendations(prev => [tipText, ...prev.slice(0, 2)]);
        }
      }
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== loadingId).concat({
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Koneksi ke server terputus. Harap periksa jaringan Anda."
      }));
    }
  };

  const handleFixBug = () => {
    if (isDebugging || debugged) return;
    setIsDebugging(true);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.sender === "user" && msg.debuggable 
            ? { 
                ...msg, 
                code: "local sensor = script.Parent\nsensor.Touched:Connect(function(hit)\n  print(\"Pintu Terbuka!\")\nend)", 
                debuggable: false 
              }
            : msg
        )
      );

      setMessages(prev => [
        ...prev,
        {
          id: `ai-fix-${Date.now()}`,
          sender: "ai",
          text: "🔧 Bug Berhasil Diperbaiki!\nMasalah terdapat pada Baris 1: Kata kunci 'Local' menggunakan huruf kapital 'L'. Di bahasa pemrograman Lua, syntax bersifat case-sensitive. Saya sudah mengubahnya menjadi 'local' huruf kecil. Silakan salin kembali kode di atas."
        }
      ]);

      setRecommendations(prev => [
        "Keyword bawaan Lua (local, function, then, end) harus ditulis dengan huruf kecil penuh.",
        ...prev.slice(0, 2)
      ]);
      setDebugged(true);
      setIsDebugging(false);
    }, 1500);
  };

  // Chat bubbles liquid entrance reveal (iOS pop style)
  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 24, // Slightly lower damping allows the spring physics to naturally bounce/overshoot
        mass: 0.8
      } 
    }
  };

  // Staggered drift for recommendations
  const driftContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const driftItem = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: appleSpring
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">AI Virtual Mentor</h1>
        <p className="text-xs text-[#86868B]">Tanyakan apa saja seputar syntax Lua, error Roblox Studio, atau mintalah koreksi bug.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT WORKSPACE: Chat Window (Spans 8 columns) */}
        <div className="lg:col-span-8 flex flex-col h-[580px] bg-white rounded-3xl border border-neutral-200/50 shadow-sm overflow-hidden">
          
          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  originX: msg.sender === "user" ? 1 : 0,
                  originY: 1
                }}
                className={`flex gap-4 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  msg.sender === "ai" 
                    ? "bg-gradient-to-tr from-[#0066CC] to-cyan-400 text-white" 
                    : "bg-neutral-100 text-[#1D1D1F]"
                }`}>
                  {msg.sender === "ai" ? <Cpu className="w-4.5 h-4.5" /> : "U"}
                </div>

                {/* Text bubble */}
                <div className="space-y-3 w-full">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "ai" 
                      ? "bg-[#F5F5F7]/80 text-[#1D1D1F] rounded-tl-none border border-neutral-100" 
                      : "bg-[#0066CC] text-white rounded-tr-none shadow-sm"
                  }`}>
                    {msg.text.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className={lIdx > 0 ? "mt-1" : ""}>{line}</p>
                    ))}
                  </div>

                  {/* Attachment Code Block */}
                  {msg.code && (
                    <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-[#1E1E24] shadow-md max-w-full relative">
                      {/* Rich glowing neon accent overlay */}
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0066CC]/50 to-transparent shadow-[0_0_15px_#0066CC]" />
                      
                      <div className="px-4 py-2 bg-[#1A1A22] border-b border-white/[0.05] flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                        <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> script.Parent.lua</span>
                        {msg.debuggable && (
                          <span className="text-red-400 flex items-center gap-1 font-bold">
                            <AlertCircle className="w-3.5 h-3.5" /> Bug Terdeteksi
                          </span>
                        )}
                      </div>
                      <pre className="p-4 overflow-x-auto text-[10px] text-neutral-200 font-mono leading-relaxed bg-[#1E1E24]/60">
                        <code>{msg.code}</code>
                      </pre>
                      
                      {/* Fix My Bug Matrix hover scrambler trigger */}
                      {msg.debuggable && (
                        <div className="px-4 py-2 bg-[#1A1A22] border-t border-white/[0.05] flex justify-end">
                          <button
                            onClick={handleFixBug}
                            disabled={isDebugging}
                            onMouseEnter={() => setBtnHovered(true)}
                            onMouseLeave={() => setBtnHovered(false)}
                            className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold text-[10px] flex items-center gap-1 transition-all duration-300 shadow-sm"
                          >
                            {isDebugging ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                Memperbaiki Bug...
                              </>
                            ) : (
                              <>
                                🔧 <ScrambledText text="Fix My Bug" isHovered={btnHovered} />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input field query */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-100 bg-[#F5F5F7]/30 flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tanyakan syntax Lua, misal: 'Bagaimana membuat platform bergerak di Obby?'"
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-xs bg-white focus:outline-none focus:border-[#0066CC] transition-colors"
            />
            <button
              type="submit"
              className="p-3 bg-[#1D1D1F] hover:bg-neutral-800 text-white rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* RIGHT WORKSPACE: Staggered recommendations (Spans 4 columns) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-neutral-200/50 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-4">
              <Sparkles className="w-4 h-4 text-[#0066CC]" />
              <h3 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Tips Pembelajaran AI</h3>
            </div>

            <motion.div 
              variants={driftContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {recommendations.map((hint, hIdx) => (
                <motion.div 
                  key={hIdx} 
                  variants={driftItem}
                  className="flex gap-3 text-xs leading-relaxed text-[#86868B] items-start"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0066CC]/5 text-[#0066CC] flex items-center justify-center shrink-0 font-bold mt-0.5">
                    {hIdx + 1}
                  </div>
                  <p>{hint}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="pt-4 border-t border-neutral-100 text-center">
              <a 
                href="#" 
                className="text-[10px] font-bold text-[#0066CC] hover:underline flex items-center justify-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                Lihat Panduan Roblox Studio <HelpCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
