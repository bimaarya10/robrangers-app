"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Levels from "@/components/Levels";
import Modules from "@/components/Modules";
import Roadmap from "@/components/Roadmap";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] flex flex-col font-sans select-none selection:bg-[#0066CC]/10">
      
      {/* 1. Frosted Sticky Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Apple-Style Hero Header & Workspace */}
        <Hero />

        {/* 3. Responsive Metric Counters */}
        <Stats />

        {/* 4. Bento Curriculum Levels */}
        <Levels />

        {/* 5. Modules Carousel Showcase */}
        <Modules />

        {/* 6. Gamified Roadmap Timeline */}
        <Roadmap />

        {/* 7. Bento Student Testimonials */}
        <section className="bg-[#F5F5F7] py-20 lg:py-32 border-t border-neutral-200/50">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Title */}
            <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D1D1F] mb-4">
                Apa Kata Para Rangers & Orang Tua
              </h2>
              <p className="text-base text-[#86868B]">
                Ribuan siswa telah menciptakan game mereka sendiri dan bertransisi dari penikmat game menjadi pencipta teknologi masa depan.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 - Spans 2 cols */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl p-8 border border-neutral-100 md:col-span-2 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.015)] animate-fade-in"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FFCC00] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl font-medium text-[#1D1D1F] leading-relaxed mb-6">
                    "Berkat RobRangers, game Roblox buatan saya sudah dimainkan lebih dari <strong>50,000 kali</strong> oleh pemain global! Mentor AI-nya sangat membantu saat script Lua saya error. Rasanya seru sekali."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066CC] to-purple-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">Arya Widjaja (14 Tahun)</h4>
                    <p className="text-xs text-[#86868B]">Siswa Kelas 8, Junior Creator</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.015)]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FFCC00] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-[#86868B] leading-relaxed mb-6">
                    "Sebagai orang tua, saya senang melihat anak saya tidak hanya bermain Roblox, tetapi aktif belajar logika berpikir matematis. Kurikulum RobRangers terstruktur dengan sangat baik."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFCC00] to-orange-400 flex items-center justify-center text-white font-bold">
                    IB
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">Ibu Beatrice</h4>
                    <p className="text-xs text-[#86868B]">Orang Tua Arya (Siswa RobRangers)</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 border border-neutral-100 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.015)]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FFCC00] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-[#86868B] leading-relaxed mb-6">
                    "Integrasi AI Mentor di RobRangers sangat revolusioner. Setiap siswa mendapatkan bantuan adaptif 1-on-1 instan saat mereka belajar di rumah. Ini memangkas kurva belajar coding hingga 3x lipat."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-[#0066CC] flex items-center justify-center text-white font-bold">
                    PN
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">Pak Nadiem</h4>
                    <p className="text-xs text-[#86868B]">Guru TI & Mitra Edukasi</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Spans 2 cols */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-3xl p-8 border border-neutral-100 md:col-span-2 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.015)]"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FFCC00] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-base text-[#1D1D1F] leading-relaxed mb-6">
                    "Saya suka bagaimana RobRangers mengajarkan prinsip logika engineering nyata lewat Roblox Studio. Ini bukan sekadar drag-and-drop code, melainkan penulisan syntax nyata, networking, dan desain user-experience sesungguhnya!"
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 border-t border-neutral-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F]">Ryan 'Roblox Dev'</h4>
                    <p className="text-xs text-[#86868B]">Lead Game Developer di Roblox Community Indonesia</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      {/* 8. Premium Minimalist Footer */}
      <footer className="bg-white border-t border-neutral-200/60 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <span className="text-xl font-bold tracking-tight text-[#1D1D1F] flex items-center">
              RobRangers
              <span className="inline-block w-2 h-2 rounded-full bg-[#0066CC] ml-1" />
            </span>
            <p className="text-sm text-[#86868B] leading-relaxed max-w-sm">
              Platform edukasi coding premium yang menggabungkan Roblox Studio dan Generative AI Mentor untuk melahirkan inovator teknologi masa depan.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200/50 text-[10px] font-bold text-[#86868B]">
                Award Winning Innovation Proposal 🏆
              </span>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Kurikulum</h4>
            <div className="flex flex-col gap-2.5">
              {["Sandbox Explorer", "Logic Architect", "AI Master", "Modul Lua"].map((link, idx) => (
                <a key={idx} href="#levels" className="text-sm text-[#86868B] hover:text-[#0066CC] transition-colors relative w-fit group">
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0066CC] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Fitur Utama</h4>
            <div className="flex flex-col gap-2.5">
              {["AI Mentor Co-Pilot", "Roblox Sandbox", "Project Portfolio", "Multiplayer Test"].map((link, idx) => (
                <a key={idx} href="#hero" className="text-sm text-[#86868B] hover:text-[#0066CC] transition-colors relative w-fit group">
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0066CC] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Perusahaan</h4>
            <div className="flex flex-col gap-2.5">
              {["Tentang Kami", "Kemitraan Sekolah", "Hubungi Kami", "Karir"].map((link, idx) => (
                <a key={idx} href="#" className="text-sm text-[#86868B] hover:text-[#0066CC] transition-colors relative w-fit group">
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0066CC] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">Legalitas</h4>
            <div className="flex flex-col gap-2.5">
              {["Kebijakan Privasi", "Ketentuan Layanan", "Pedoman Keamanan"].map((link, idx) => (
                <a key={idx} href="#" className="text-sm text-[#86868B] hover:text-[#0066CC] transition-colors relative w-fit group">
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#0066CC] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-200/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#86868B]">
            &copy; {new Date().getFullYear()} RobRangers Indonesia. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#86868B]">
            <span>Dirancang dengan filosofi Apple Premium Digital Experience 🍏</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
