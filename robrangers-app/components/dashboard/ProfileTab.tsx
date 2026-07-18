"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Save, CheckCircle2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

// Inline Custom SVG Github Icon
const GithubIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Modular Input Field with custom morphing glow focus rings
interface InputFieldProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  disabled?: boolean;
}

const InputField = ({ label, icon: Icon, value, onChange, type = "text", disabled = false }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Glow border morphing ring */}
        <motion.div
          animate={{
            borderColor: isFocused ? "#0066CC" : "#E5E5E5",
            boxShadow: isFocused 
              ? "0 0 0 3px rgba(0, 102, 204, 0.18)" 
              : "0 0 0 0px rgba(0, 102, 204, 0)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 rounded-xl border pointer-events-none z-10"
        />
        <Icon className="absolute left-4 w-4 h-4 text-[#86868B] z-20 pointer-events-none" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`w-full pl-11 pr-4 py-3 rounded-xl border-none text-xs placeholder-neutral-400 focus:outline-none bg-[#F5F5F7]/40 relative z-0 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
};

export default function ProfileTab() {
  const { user, updateProfile } = useUser();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setGithubConnected(user.githubConnected || false);
    }
  }, [user]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, phone });
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
      }, 2000);
    } catch (err: any) {
      alert(err.message || "Gagal memperbarui profil.");
    }
  };

  const handleSyncGithub = async () => {
    if (githubConnected) {
      setGithubLoading(true);
      try {
        await updateProfile({ githubConnected: false, githubUsername: "" });
        setGithubConnected(false);
      } catch (err) {
        alert("Gagal memutuskan tautan GitHub.");
      } finally {
        setGithubLoading(false);
      }
      return;
    }

    const username = prompt("Masukkan username GitHub Anda:");
    if (!username || !username.trim()) return;

    setGithubLoading(true);
    try {
      await updateProfile({ githubConnected: true, githubUsername: username });
      setGithubConnected(true);
    } catch (err) {
      alert("Gagal menghubungkan akun GitHub.");
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Profile</h1>
        <p className="text-xs text-[#86868B]">Kelola pengaturan akun, nomor kontak, dan integrasi repository.</p>
      </div>

      <div className="max-w-2xl bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/50 shadow-sm">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs font-semibold text-green-700 flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4.5 h-4.5" /> Pengaturan profil berhasil disimpan!
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <InputField 
              label="Nama Lengkap" 
              icon={User} 
              value={name} 
              onChange={setName} 
            />

            {/* Email */}
            <InputField 
              label="Alamat Email" 
              icon={Mail} 
              value={email} 
              onChange={setEmail} 
              type="email"
              disabled={true}
            />

            {/* Phone */}
            <InputField 
              label="Nomor Telepon" 
              icon={Phone} 
              value={phone} 
              onChange={setPhone} 
            />

            {/* GitHub Sync Badge */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                GitHub Repository
              </label>
              <button
                type="button"
                onClick={handleSyncGithub}
                disabled={githubLoading}
                className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 relative z-10 ${
                  githubConnected 
                    ? "bg-green-50 border-green-200 text-green-700" 
                    : githubLoading
                    ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-white border-neutral-200 text-charcoal hover:bg-[#F5F5F7]/30 hover:border-neutral-300"
                }`}
              >
                <GithubIcon className="w-4.5 h-4.5" />
                {githubLoading 
                  ? "Menghubungkan..." 
                  : githubConnected 
                  ? "Terhubung: @ghonnifaza" 
                  : "Hubungkan GitHub"}
              </button>
            </div>

          </div>

          <div className="border-t border-neutral-100 pt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#1D1D1F] text-white hover:bg-neutral-800 transition-all duration-300 text-xs font-bold flex items-center gap-2 shadow-md border border-neutral-800"
            >
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
