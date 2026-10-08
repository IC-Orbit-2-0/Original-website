"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroGlobe } from "../3d/HeroGlobe";
import { Button } from "../ui/Button";
import { ArrowDown, Orbit, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  onOpenJoin: () => void;
  onHoverSound?: () => void;
}

export function Hero({ onOpenJoin, onHoverSound }: HeroProps) {
  const scrollToMission = () => {
    const el = document.getElementById("mission");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWhatWeDo = () => {
    const el = document.getElementById("what-we-do");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* 3D Earth, Orbital Rings, and Satellite Canvas */}
      <HeroGlobe />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8 text-center">
        {/* Orbital Mission Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-[#0B0D18]/70 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(124,58,237,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-mono font-medium tracking-widest text-violet-200 uppercase">
            ORBITAL STATUS: ACTIVE // CHAPTER 01
          </span>
        </motion.div>

        {/* Floating Official IC ORBITE Logo with Depth & Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative mb-6 flex h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 items-center justify-center"
        >
          {/* Ambient Cosmic Core Aura */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-violet-600/30 via-indigo-600/30 to-purple-600/30 blur-2xl animate-pulse-glow" />

          {/* Interactive Floating Logo */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full overflow-hidden rounded-3xl p-1 transition-transform duration-500 hover:scale-105"
          >
            <Image
              src="/images/ic-orbite-logo.png"
              alt="IC ORBITE Official Emblem"
              fill
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              priority
              loading="eager"
              className="object-contain drop-shadow-[0_0_35px_rgba(124,58,237,0.55)]"
            />
          </motion.div>
        </motion.div>

        {/* Hero Title & Identity */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            <span className="bg-gradient-to-b from-white via-violet-100 to-indigo-300 bg-clip-text text-transparent">
              IC ORBITE
            </span>
          </h1>

          <div className="text-sm sm:text-base md:text-lg font-mono font-bold tracking-[0.25em] text-violet-300 uppercase">
            INTERESTED. CODE ORBIT
          </div>

          <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
            A STUDENT CODING CLUB
          </div>

          {/* Brand Philosophy */}
          <div className="pt-2 text-xs sm:text-sm font-mono font-medium tracking-widest text-violet-400">
            LEARN • BUILD • GROW • TOGETHER
          </div>
        </motion.div>

        {/* Dual CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToMission}
            onHoverSound={onHoverSound}
            icon={<Orbit className="h-5 w-5" />}
          >
            ENTER THE ORBIT
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToWhatWeDo}
            onHoverSound={onHoverSound}
            icon={<Sparkles className="h-5 w-5" />}
          >
            EXPLORE CLUB
          </Button>
        </motion.div>

        {/* Telemetry Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 sm:mt-18 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 rounded-2xl border border-violet-500/20 bg-[#0B0D18]/70 px-6 py-4 backdrop-blur-xl"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-white">400+</div>
            <div className="text-[10px] sm:text-xs font-mono text-violet-300 tracking-wider">
              MEMBERS
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-white">120+</div>
            <div className="text-[10px] sm:text-xs font-mono text-violet-300 tracking-wider">
              REPOS SHIPPED
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-white">18+</div>
            <div className="text-[10px] sm:text-xs font-mono text-violet-300 tracking-wider">
              HACKATHON WINS
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-black text-white">100%</div>
            <div className="text-[10px] sm:text-xs font-mono text-violet-300 tracking-wider">
              STUDENT DRIVEN
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <motion.button
          onClick={scrollToMission}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll to Mission"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">
            SCROLL TO ENTER
          </span>
          <ArrowDown className="h-4 w-4 text-violet-400" />
        </motion.button>
      </div>
    </section>
  );
}
