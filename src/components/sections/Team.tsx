"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { EXECUTIVE_TEAM, TeamMember } from "@/data/team";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import { Shield, Sparkles, Orbit, Compass, Award } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface TeamProps {
  onHoverSound?: () => void;
}

export function Team({ onHoverSound }: TeamProps) {
  return (
    <section id="team" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-violet-950/25 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="EXECUTIVE COMMAND // FOUNDING TEAM"
          title="LEADERSHIP ORBIT"
          subtitle="Meet the visionaries, architects, and engineering leads steering IC ORBITE."
        />

        {/* Executive Leadership Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
        >
          {EXECUTIVE_TEAM.map((member, index) => (
            <motion.div key={member.id} variants={fadeInUp}>
              <GlassCard
                className="group flex flex-col justify-between h-full p-6 sm:p-7 hover:-translate-y-2 transition-all duration-300"
                glowColor="rgba(124, 58, 237, 0.4)"
              >
                <div>
                  {/* Top Coordinate Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-[10px] tracking-widest text-violet-400 uppercase">
                      {member.coordinates}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-950/40 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-violet-300">
                      <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                      {member.badge}
                    </span>
                  </div>

                  {/* Member Avatar / Monogram */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-violet-500/40 bg-gradient-to-b from-[#1E1B4B] to-[#0B0D18] text-center shadow-[0_0_25px_rgba(124,58,237,0.35)] transition-transform duration-300 group-hover:scale-108 group-hover:border-violet-300">
                      <span className="font-mono text-2xl font-black text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      {/* Orbital aura ring */}
                      <span className="absolute -inset-1 rounded-2xl border border-violet-400/20 pointer-events-none animate-pulse" />
                    </div>
                  </div>

                  {/* Name & Official Role */}
                  <div className="text-center">
                    <h3 className="text-xl font-black text-white group-hover:text-violet-200 transition-colors">
                      {member.name}
                    </h3>
                    <div className="mt-1 font-mono text-xs font-bold tracking-wider text-violet-400 uppercase">
                      {member.role}
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      {member.title}
                    </div>
                  </div>

                  {/* Specialty Tag */}
                  <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-950/20 p-2.5 text-center font-mono text-[11px] text-violet-200">
                    {member.specialty}
                  </div>

                  {/* Bio */}
                  <p className="mt-4 text-xs text-slate-300 leading-relaxed text-center sm:text-left">
                    {member.bio}
                  </p>
                </div>

                {/* Footer Metrics & Socials */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-slate-400">
                    <span className="text-violet-300 font-semibold">{member.metrics.value}</span>
                  </div>

                  {/* Social Channel Links */}
                  <div className="flex items-center gap-2">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={onHoverSound}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#05060A] text-slate-400 hover:border-violet-400 hover:text-white transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={onHoverSound}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#05060A] text-slate-400 hover:border-violet-400 hover:text-white transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedinIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
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
