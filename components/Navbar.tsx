"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Magnetic Button Wrapper for the CTA
export const MagneticButton = ({ 
  children, 
  className = "", 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void; 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX * 0.35);
    y.set(mouseY * 0.35);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative z-10 transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: "Beranda", href: "#hero" },
    { id: "levels", label: "Level Belajar", href: "#levels" },
    { id: "kurikulum", label: "Kurikulum", href: "#kurikulum" },
    { id: "roadmap", label: "Roadmap", href: "#roadmap" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? "border-gray-200/80 bg-white/80 backdrop-blur-md shadow-sm" 
          : "border-gray-100 bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-[#1D1D1F] flex items-center">
            RobRangers
            <span className="inline-block w-2 h-2 rounded-full bg-[#0066CC] ml-1 animate-pulse" />
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(link.href);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                setActiveTab(link.id);
              }}
              className="relative text-sm font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors py-1 group"
            >
              {link.label}
              {activeTab === link.id && (
                <motion.span 
                  layoutId="activeNavTab"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0066CC]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => router.push("/login")}
            className="text-sm font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            Masuk
          </button>
          <MagneticButton 
            onClick={() => router.push("/login")}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-neutral-800 transition-colors shadow-sm border border-neutral-200 border-gradient-glow flex items-center gap-2 group cursor-pointer"
          >
            Mulai Belajar
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1D1D1F] hover:bg-neutral-100 rounded-full transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-gray-200/80 bg-white px-6 py-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    setActiveTab(link.id);
                  }}
                  className="text-base font-semibold text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="h-[1px] bg-neutral-100" />
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/login");
                }}
                className="w-full py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-[#86868B] hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Masuk
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/login");
                }}
                className="w-full py-3 rounded-xl bg-[#1D1D1F] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Mulai Belajar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
