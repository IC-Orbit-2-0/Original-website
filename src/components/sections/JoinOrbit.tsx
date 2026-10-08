"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Sparkles, Orbit, Compass, ArrowRight } from "lucide-react";

interface JoinOrbitProps {
  onOpenJoin: () => void;
  onHoverSound?: () => void;
}

export function JoinOrbit({ onOpenJoin, onHoverSound }: JoinOrbitProps) {
  return (
    <section id="join" className="relative w-full py-28 sm:py-36 overflow-hidden">
      {/* Large Glowing 3D Orbital Background Effect */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Orbital rings expanding */}
        <div className="h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] rounded-full border border-violet-500/15 animate-spin-slow" />
        <div className="absolute h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] rounded-full border border-dashed border-indigo-500/20 animate-spin-reverse-slow" />
        <div className="absolute h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full border border-violet-400/20" />
        {/* Core glow */}
        <div className="absolute h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-violet-600/15 blur-[90px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-violet-500/30 bg-[#080A12]/85 p-8 sm:p-14 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,58,237,0.3)]"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-4 py-1 text-xs font-mono uppercase tracking-widest text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            MISSION ONBOARDING OPEN
          </div>

          <h2 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black text-white">
            <span className="bg-gradient-to-r from-white via-violet-100 to-indigo-300 bg-clip-text text-transparent">
              READY TO ENTER THE ORBIT?
            </span>
          </h2>

          <div className="mt-6 space-y-1.5 text-base sm:text-lg text-slate-300 font-medium">
            <p>Learn something new.</p>
            <p>Build something meaningful.</p>
            <p className="text-violet-300">
              Grow with people who share your curiosity.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenJoin}
              onHoverSound={onHoverSound}
              icon={<Orbit className="h-5 w-5" />}
            >
              JOIN IC ORBITE
            </Button>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                onHoverSound={onHoverSound}
                icon={<Compass className="h-5 w-5" />}
              >
                FOLLOW OUR JOURNEY
              </Button>
            </a>
          </div>

          {/* Guarantee / Inclusivity reassurance */}
          <p className="mt-8 text-xs font-mono text-slate-400">
            CAMPUS CHAPTER 01 // OPEN TO ALL PASSIONATE BUILDERS & STUDENTS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
