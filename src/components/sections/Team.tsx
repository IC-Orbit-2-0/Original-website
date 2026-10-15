"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { MEMBERS, Member } from "@/data/members";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import { Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface TeamProps {
  onHoverSound?: () => void;
}

function MemberCard({
  member,
  onHoverSound,
}: {
  member: Member;
  onHoverSound?: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <GlassCard
        className="group flex flex-col justify-between h-full p-5 sm:p-6 hover:-translate-y-2 transition-all duration-300"
        glowColor="rgba(124, 58, 237, 0.4)"
      >
        <div>
          {/* Top Orbital Coordinate Badge */}
          {member.coordinates && (
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-4">
              <span className="font-mono text-[10px] tracking-widest text-violet-400 uppercase">
                {member.coordinates}
              </span>
              {member.badge && (
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-950/40 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-violet-300">
                  <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                  {member.badge}
                </span>
              )}
            </div>
          )}

          {/* Member Photograph Container with Zoom & Cosmic Framing */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-violet-500/25 bg-[#070913] mb-4 group-hover:border-violet-400/60 shadow-[0_0_20px_rgba(124,58,237,0.15)] transition-all duration-300">
            {!imgError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#1E1B4B] to-[#0B0D18]">
                <span className="font-mono text-3xl font-black text-white">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}

            {/* Bottom Vignette Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D18]/90 via-transparent to-transparent opacity-60" />
          </div>

          {/* Member Name */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-violet-200 transition-colors">
              {member.name}
            </h3>

            {/* Member Role (rendered only when provided; no placeholder text) */}
            {member.role ? (
              <p className="mt-1 font-mono text-xs font-semibold tracking-wider text-violet-400 uppercase">
                {member.role}
              </p>
            ) : (
              <div className="mt-1 h-4" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Individual Profile Destinations (LinkedIn & GitHub) */}
        <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-center gap-3">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={onHoverSound}
            aria-label={`${member.name} on LinkedIn`}
            title={`${member.name}'s LinkedIn Profile`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/25 bg-[#05060A] text-slate-400 hover:border-violet-400 hover:text-white hover:bg-violet-950/60 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition-all duration-200"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={onHoverSound}
            aria-label={`${member.name} on GitHub`}
            title={`${member.name}'s GitHub Profile`}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/25 bg-[#05060A] text-slate-400 hover:border-violet-400 hover:text-white hover:bg-violet-950/60 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 transition-all duration-200"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Team({ onHoverSound }: TeamProps) {
  return (
    <section id="team" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-violet-950/25 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The people behind the ideas."
          title="MEET THE ORBIT"
          subtitle="Meet the curious minds learning, building, and growing together at IC ORBITE."
        />

        {/* 5-Member Balanced Responsive Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-7"
        >
          {MEMBERS.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onHoverSound={onHoverSound}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
