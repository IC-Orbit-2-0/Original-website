"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import {
  Code,
  FolderGit2,
  Trophy,
  Mic,
  Zap,
  Users2,
  ArrowUpRight,
} from "lucide-react";

interface Initiative {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const INITIATIVES: Initiative[] = [
  {
    id: "workshops",
    number: "01",
    title: "WORKSHOPS",
    tagline: "Hands-on technical learning.",
    description:
      "Interactive coding masterclasses where you don't just watch slides—you configure dev environments, write code live, and deploy real systems.",
    details: ["Fullstack Architectures", "Docker & Cloud Deployments", "WebGL & 3D Shaders"],
    icon: <Code className="h-6 w-6 text-violet-400 group-hover:text-white transition-colors" />,
  },
  {
    id: "projects",
    number: "02",
    title: "PROJECTS",
    tagline: "Build real-world projects.",
    description:
      "From distributed microservices to creative AI web applications, collaborate in pods of 3-5 students to build portfolio-defining products.",
    details: ["Open Source Repositories", "Production Architecture", "Weekly Sprint Reviews"],
    icon: <FolderGit2 className="h-6 w-6 text-indigo-400 group-hover:text-white transition-colors" />,
  },
  {
    id: "hackathons",
    number: "03",
    title: "HACKATHONS",
    tagline: "Solve problems under pressure.",
    description:
      "36-hour sprint weekends where teams turn ambitious ideas into functional prototypes, competing for prizes, recognition, and seed funding.",
    details: ["Internal Rapid Jams", "National Team Delegations", "Dedicated Mentor Pods"],
    icon: <Trophy className="h-6 w-6 text-pink-400 group-hover:text-white transition-colors" />,
  },
  {
    id: "tech-talks",
    number: "04",
    title: "TECH TALKS",
    tagline: "Learn from experienced developers.",
    description:
      "Intimate technical sessions with staff engineers, startup founders, and research scientists exploring what it actually takes to build at scale.",
    details: ["System Design Deep Dives", "AI Model Engineering", "Career Architecture"],
    icon: <Mic className="h-6 w-6 text-cyan-400 group-hover:text-white transition-colors" />,
  },
  {
    id: "competitions",
    number: "05",
    title: "COMPETITIONS",
    tagline: "Challenge yourself and grow.",
    description:
      "Algorithm battles, speed coding clashes, and CTF security challenges engineered to sharpen your problem-solving reflexes under time constraints.",
    details: ["Live Arena Leaderboards", "Algorithmic Drills", "CTF Security Challenges"],
    icon: <Zap className="h-6 w-6 text-amber-400 group-hover:text-white transition-colors" />,
  },
  {
    id: "community",
    number: "06",
    title: "COMMUNITY",
    tagline: "Meet people who love technology.",
    description:
      "A tight-knit network of passionate builders, designers, and hackers who celebrate each other's breakthroughs and build lifelong partnerships.",
    details: ["24/7 Discord Lounges", "In-Person Demo Nights", "Lifelong Alumni Network"],
    icon: <Users2 className="h-6 w-6 text-emerald-400 group-hover:text-white transition-colors" />,
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background glowing aura */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-950/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="ACTIVITIES & ENGAGEMENT"
          title="WHAT WE DO"
          subtitle="Explore the six core pillars that power the IC ORBITE experience throughout the academic year."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {INITIATIVES.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <GlassCard
                className="group flex flex-col justify-between h-full p-8 transition-all duration-300 hover:-translate-y-2.5"
                glowColor="rgba(124, 58, 237, 0.4)"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-violet-400 tracking-widest">
                      {item.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-950/30 transition-transform duration-300 group-hover:scale-110 group-hover:border-violet-400/50 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-violet-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-violet-300">
                    {item.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bullets / Details */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="space-y-1.5">
                    {item.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-mono text-slate-400"
                      >
                        <span className="h-1 w-1 rounded-full bg-violet-400" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
