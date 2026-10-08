"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060A] text-white"
    >
      {/* Subtle star particle points */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 h-1 w-1 rounded-full bg-white animate-ping" />
        <div className="absolute top-3/4 left-1/3 h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 h-1 w-1 rounded-full bg-indigo-300 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 h-1.5 w-1.5 rounded-full bg-violet-300 animate-ping" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Orbital SVG Ring drawing animation */}
        <div className="relative mb-6 flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-violet-950/40"
              strokeWidth="2"
              fill="transparent"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-violet-500"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.8))",
              }}
            />
          </svg>

          {/* Official IC ORBITE Logo emerging */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            <Image
              src="/images/ic-orbite-logo.png"
              alt="IC ORBITE Official Logo"
              fill
              sizes="(max-width: 640px) 112px, 128px"
              priority
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Progress & Telemetry text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          <div className="text-sm font-mono tracking-widest text-violet-300">
            INITIALIZING ORBITAL LINK // {progress}%
          </div>
          <div className="mt-1 text-xs font-mono text-slate-400">
            IC ORBITE • A STUDENT CODING CLUB
          </div>
        </motion.div>

        {/* Progress bar line */}
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-violet-950/60 border border-violet-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
