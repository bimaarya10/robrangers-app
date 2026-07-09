"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ModulesTab from "@/components/dashboard/ModulesTab";
import AiMentorTab from "@/components/dashboard/AiMentorTab";
import ProjectTab from "@/components/dashboard/ProjectTab";
import ProfileTab from "@/components/dashboard/ProfileTab";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
