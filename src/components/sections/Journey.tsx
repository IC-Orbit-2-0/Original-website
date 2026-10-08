"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { BookOpen, Hammer, TrendingUp, CheckCircle, Sparkles } from "lucide-react";

interface JourneyStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
  icon: React.ReactNode;
  accent: string;
  glow: string;
}

const STAGES: JourneyStage[] = [
  {
    step: "01",
    title: "LEARN",
    subtitle: "Understand the technology.",
    description:
      "Break down foundational theory through interactive labs, peer code reviews, and deep-dive technical explorations. Grasp the 'why' behind system architectures.",
    milestones: [
      "Modern Languages & Frameworks (Rust, Python, TypeScript)",
      "Distributed Systems & Database Internals",
      "AI Reasoning, Embeddings & RAG Architectures",
      "Interactive 3D Graphics & Custom GLSL Shaders",
    ],
    icon: <BookOpen className="h-6 w-6 text-violet-300" />,
    accent: "#7C3AED",
    glow: "rgba(124, 58, 237, 0.5)",
  },
  {
    step: "02",
    title: "BUILD",
    subtitle: "Turn knowledge into real projects.",
    description:
      "Theory solidifies through tangible execution. Form multidisciplinary squads, establish git workflows, write test suites, and ship applications that handle real traffic.",
    milestones: [
      "Sprint-based squad collaborations with weekly demos",
      "Open source contributions and audited security standards",
      "Fullstack web portals, CLI tools & embedded IoT devices",
      "Production containerized deployments with automated CI/CD",
    ],
    icon: <Hammer className="h-6 w-6 text-indigo-300" />,
    accent: "#6366F1",
    glow: "rgba(99, 102, 241, 0.5)",
  },
  {
    step: "03",
    title: "GROW",
    subtitle: "Grow with a community that moves forward together.",
    description:
      "Accelerate your career trajectory alongside high-trust mentors. Win national hackathons, take on technical leadership, and establish lifelong professional bonds.",
    milestones: [
      "Hackathon podiums & global project showcases",
      "Technical mentorship and track leadership opportunities",
      "Internship referrals and alumni network across top firms",
      "Publishing engineering blogs and community open tools",
    ],
    icon: <TrendingUp className="h-6 w-6 text-purple-300" />,
    accent: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.5)",
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background orbital grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="THE CONTINUOUS CYCLE"
          title="LEARN → BUILD → GROW"
          subtitle="A progressive trajectory engineered to take curious students from day one to industry-grade software architects."
        />

        <div className="relative mt-16">
          {/* Glowing orbital connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3px] bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-500 shadow-[0_0_20px_#7C3AED] pointer-events-none z-0" />

          {/* Glowing orbital connecting line for mobile/tablet (vertical) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 sm:left-12 w-[3px] bg-gradient-to-b from-violet-600 via-indigo-500 to-purple-500 shadow-[0_0_20px_#7C3AED] pointer-events-none z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-8 relative z-10">
            {STAGES.map((stage, idx) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.2 }}
                className="relative flex flex-col rounded-3xl border border-violet-500/20 bg-[#080A12]/90 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-violet-400/50 hover:shadow-[0_15px_40px_rgba(124,58,237,0.25)] ml-12 sm:ml-16 lg:ml-0"
              >
                {/* Orbital Node Indicator Pin */}
                <div
                  className="absolute -left-12 sm:-left-16 lg:left-1/2 lg:-top-6 lg:-translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[#0B0D18] text-white shadow-[0_0_25px_rgba(124,58,237,0.6)]"
                  style={{
                    borderColor: stage.accent,
                    boxShadow: `0 0 25px ${stage.glow}`,
                  }}
                >
                  <span className="font-mono text-sm font-black">{stage.step}</span>
                </div>

                {/* Card Header */}
                <div className="mt-2 sm:mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-violet-400">
                    PHASE {stage.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-950/40 border border-violet-500/20">
                    {stage.icon}
                  </div>
                </div>

                <h3 className="mt-4 text-3xl font-black text-white">
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-violet-300">
                  {stage.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {stage.description}
                </p>

                {/* Milestones list */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Phase Milestones:
                  </div>
                  {stage.milestones.map((milestone, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-slate-200"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
