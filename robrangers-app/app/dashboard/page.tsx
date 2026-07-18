"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ModulesTab from "@/components/dashboard/ModulesTab";
import AiMentorTab from "@/components/dashboard/AiMentorTab";
import ProjectTab from "@/components/dashboard/ProjectTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // iOS Spring Configuration
  const iosSpring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8
  };

  // Renders correct sub-tab workspace
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "modules":
        return <ModulesTab />;
      case "ai-mentor":
        return <AiMentorTab />;
      case "projects":
        return <ProjectTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={iosSpring}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
            <span className="absolute w-2 h-2 rounded-full bg-[#0066CC]/20 animate-ping" />
          </div>
          <p className="text-xs text-[#86868B] font-semibold uppercase tracking-wider">Memuat Akun Ranger...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col md:flex-row select-none font-sans overflow-hidden">
      
      {/* 1. Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Scrollable Content Workspace Container */}
      <main className="flex-grow overflow-y-auto max-h-screen p-6 md:p-10 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: "4%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-4%" }}
              transition={iosSpring}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
