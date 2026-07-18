"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import WelcomeSplash from "@/components/WelcomeSplash";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("ghonnifaza@domain.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Harap masukkan email dan kata sandi Anda.");
      return;
    }
    setIsLoading(true);
    setErrorMsg("");

    try {
      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err.message || "Email atau kata sandi tidak valid.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex flex-col md:flex-row select-none font-sans">
      
      {/* Back to Home Button */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-30 p-2.5 rounded-full bg-white/80 hover:bg-neutral-100 border border-neutral-200/50 shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 text-sm font-medium text-[#1D1D1F] backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Beranda
      </button>

      {/* LEFT SIDE: Apple-Style Marketing Banner */}
      <div className="hidden md:flex md:w-1/2 bg-[#F5F5F7] relative flex-col justify-between p-12 overflow-hidden border-r border-neutral-200/30">
        {/* Background 3D Grid flow simulation */}
        <div className="absolute inset-0 z-0 h-full pointer-events-none opacity-40">
          <div className="perspective-grid" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-transparent to-transparent z-0" />
        
        {/* Glowing Orbs */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#0066CC]/5 blur-[60px]" />
        <div className="absolute bottom-16 right-12 w-72 h-72 rounded-full bg-[#FFCC00]/5 blur-[70px]" />

        <div className="relative z-10">
          <span className="text-xl font-bold tracking-tight text-[#1D1D1F] flex items-center gap-1">
            RobRangers
            <span className="w-2 h-2 rounded-full bg-[#0066CC]" />
          </span>
        </div>

        <div className="relative z-10 my-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066CC]/10 text-xs font-semibold text-[#0066CC] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Gamer to Creator Transition
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#1D1D1F] mb-6">
              Ubah Hobi Bermain Menjadi Karya Coding Nyata.
            </h2>
            <p className="text-base text-[#86868B] leading-relaxed">
              Mulai petualangan belajarmu di sandbox Roblox Studio. Didampingi asisten Mentor AI Robby 24/7 untuk membantumu merancang logika multiplayer game, memecahkan bug, hingga mengumpulkan sertifikat kompetensi internasional.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs text-[#86868B] font-medium">
          <span>Tingkat Kepuasan 98%</span>
          <span>•</span>
          <span>10,000+ Rangers Terdaftar</span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md flex flex-col"
        >
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1D1D1F] mb-2">
              Selamat Datang Kembali
            </h1>
            <p className="text-sm text-[#86868B]">
              Masuk untuk melanjutkan modul belajar coding dan melatih AI Companion.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
                {errorMsg}
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-[#86868B] pointer-events-none" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 text-sm placeholder-neutral-400 bg-[#F5F5F7]/30 focus:bg-white focus:border-[#0066CC] focus:outline-none transition-all duration-300 shadow-inner focus:shadow-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                  Kata Sandi
                </label>
                <a href="#" className="text-xs text-[#0066CC] hover:underline font-medium">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-[#86868B] pointer-events-none" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-neutral-200 text-sm placeholder-neutral-400 bg-[#F5F5F7]/30 focus:bg-white focus:border-[#0066CC] focus:outline-none transition-all duration-300 shadow-inner focus:shadow-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 p-1 text-[#86868B] hover:text-[#1D1D1F] transition-colors rounded-full"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold bg-[#1D1D1F] text-white hover:bg-neutral-800 transition-all duration-300 shadow-md flex items-center justify-center gap-2 border border-neutral-800 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Memproses..." : "Masuk Ke Akun"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Footnotes */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#86868B]">
              Belum memiliki akun?{" "}
              <button 
                onClick={() => router.push("/register")}
                className="text-[#0066CC] hover:underline font-semibold"
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
