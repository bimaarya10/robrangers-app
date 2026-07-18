"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  FolderGit2, 
  User, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  // iOS Native Spring Configuration
  const iosSpring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "modules", label: "Modul & Materi", icon: BookOpen },
    { id: "ai-mentor", label: "AI Virtual Mentor", icon: Cpu },
    { id: "projects", label: "Project Showcase", icon: FolderGit2 },
    { id: "profile", label: "Profile", icon: User }
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <aside className="w-full md:w-64 bg-white/85 backdrop-blur-md border-b md:border-b-0 md:border-r border-neutral-200/50 p-6 flex flex-col justify-between shrink-0 select-none shadow-sm z-30">
      
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => router.push("/")}>
          <span className="text-xl font-bold tracking-tight text-[#1D1D1F] flex items-center">
            RobRangers
            <span className="inline-block w-2 h-2 rounded-full bg-[#0066CC] ml-1.5 animate-pulse" />
          </span>
        </div>

        {/* Menu Navigation */}
        <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible no-scrollbar pb-3 md:pb-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors shrink-0 w-full text-left cursor-pointer ${
                  isActive 
                    ? "text-[#0066CC]" 
                    : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-neutral-100/50"
                }`}
              >
                {/* Active indicator pill (background capsule slider matching landing page accent color) */}
                {isActive && (
                  <motion.div
                    layoutId="iosActiveGlow"
                    className="absolute inset-0 bg-[#0066CC]/5 border-l-2 border-[#0066CC] rounded-xl z-0"
                    transition={iosSpring}
                  />
                )}
                
                <Icon className={`w-4 h-4 z-10 ${isActive ? "text-[#0066CC]" : "text-[#86868B]"}`} />
                <span className="z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t border-neutral-200/50 pt-6 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F5F5F7] border border-neutral-200/80 flex items-center justify-center font-bold text-xs text-[#1D1D1F] relative overflow-hidden">
            GF
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#1D1D1F]">Ghonni Faza</span>
            <span className="text-[9px] text-[#86868B] uppercase tracking-wider font-semibold">Ranger Level 12</span>
          </div>
        </div>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-[#86868B] hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          title="Keluar Akun"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>

    </aside>
  );
}
