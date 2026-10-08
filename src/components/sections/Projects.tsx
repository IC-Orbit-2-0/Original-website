"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { STUDENT_PROJECTS, StudentProject } from "@/data/projects";
import { ExternalLink, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "../ui/Icons";

interface ProjectsProps {
  onHoverSound?: () => void;
}

export function Projects({ onHoverSound }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevProject = () => {
    setActiveIndex((prev) => (prev === 0 ? STUDENT_PROJECTS.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev === STUDENT_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  const current = STUDENT_PROJECTS[activeIndex];

  return (
    <section id="projects" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 right-1/4 h-[550px] w-[550px] rounded-full bg-indigo-950/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="STUDENT INNOVATION SHOWCASE"
          title="ORBITAL PROJECTS"
          subtitle="Real software, tools, and platforms built, maintained, and deployed by IC ORBITE student members."
        />

        {/* 3D Depth Carousel Container */}
        <div className="relative mt-8 sm:mt-12 flex flex-col items-center">
          {/* Main 3D Card Display */}
          <div className="relative w-full max-w-4xl h-[480px] sm:h-[420px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.88, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.88, rotateY: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full rounded-3xl border border-violet-500/30 bg-[#0B0D18]/90 p-8 sm:p-10 shadow-[0_20px_50px_rgba(124,58,237,0.25)] backdrop-blur-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-violet-300">
                      <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                      {current.category}
                    </div>

                    <div className="rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 font-mono text-xs text-emerald-300">
                      {current.stats.label}: {current.stats.value}
                    </div>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {current.title}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-violet-300">
                    {current.tagline}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    {current.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="mt-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Core Technologies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {current.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-violet-500/20 bg-violet-950/30 px-3 py-1 font-mono text-xs font-medium text-violet-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a
                      href={current.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onHoverSound={onHoverSound}
                        icon={<GithubIcon className="h-4 w-4" />}
                      >
                        GITHUB
                      </Button>
                    </a>

                    <a
                      href={current.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        onHoverSound={onHoverSound}
                        icon={<ExternalLink className="h-4 w-4" />}
                      >
                        LIVE DEMO
                      </Button>
                    </a>
                  </div>

                  <div className="font-mono text-xs text-slate-400">
                    PROJECT 0{activeIndex + 1} / 0{STUDENT_PROJECTS.length}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Buttons & Indicators */}
          <div className="mt-8 flex items-center gap-6">
            <button
              onClick={prevProject}
              onMouseEnter={onHoverSound}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/30 bg-[#0B0D18]/80 text-violet-300 transition-all duration-200 hover:border-violet-400 hover:bg-violet-900/50 hover:text-white hover:shadow-[0_0_20px_#7C3AED]"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {STUDENT_PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-8 bg-violet-400 shadow-[0_0_10px_#A78BFA]"
                      : "w-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Jump to project ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              onMouseEnter={onHoverSound}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-500/30 bg-[#0B0D18]/80 text-violet-300 transition-all duration-200 hover:border-violet-400 hover:bg-violet-900/50 hover:text-white hover:shadow-[0_0_20px_#7C3AED]"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
