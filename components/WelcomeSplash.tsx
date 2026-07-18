"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeSplashProps {
  onComplete: () => void;
}

export default function WelcomeSplash({ onComplete }: WelcomeSplashProps) {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const texts = [
    "Belajar Pemrograman.",
    "Membangun Dunia Virtual.",
    "Dipandu AI."
  ];

  // Cycling sequence timer controls
  useEffect(() => {
    if (sequenceIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        setSequenceIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Final slide triggers exiting transition sequence
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 1600);

      const finishTimer = setTimeout(() => {
        onComplete();
      }, 2300);

      return () => {
        clearTimeout(timer);
        clearTimeout(finishTimer);
      };
    }
  }, [sequenceIndex, onComplete]);

  // Spring physics constants matching Apple Event guidelines
  const appleSpring = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 0.5
  };

  const words = texts[sequenceIndex].split(" ");

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            scale: 0.93, 
            filter: "blur(16px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          // Canvas transition from dark obsidian to pure white
          animate={{
            backgroundColor: sequenceIndex === 2 ? "#FFFFFF" : "#0A0A0C"
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          <div className="text-center px-6 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={sequenceIndex}
                className="flex flex-wrap justify-center gap-x-4 gap-y-3"
              >
                {words.map((word, wIdx) => (
                  <motion.span
                    key={wIdx}
                    initial={{ opacity: 0, y: 35, filter: "blur(8px)", scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, y: -25, filter: "blur(6px)", scale: 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 16,
                      mass: 0.45,
                      delay: wIdx * 0.12 // Staggered word animation
                    }}
                    className={`text-3xl sm:text-5xl font-extrabold tracking-[0.14em] uppercase leading-tight select-none inline-block ${
                      sequenceIndex === 2 ? "text-[#1D1D1F]" : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
