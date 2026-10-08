"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { COMMUNITY_MEMBERS, CommunityMember } from "@/data/community";
import { Users, Code, Award, Sparkles } from "lucide-react";

export function ConstellationNetwork() {
  const [activeMember, setActiveMember] = useState<CommunityMember | null>(COMMUNITY_MEMBERS[0]);

  // Connecting line segments between constellation nodes
  const connections = [
    [0, 1],
    [1, 2],
    [2, 0],
    [0, 3],
    [3, 5],
    [5, 4],
    [4, 1],
    [2, 5],
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-violet-500/20 bg-[#080A12]/80 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient opacity-60" />

      {/* Constellation Field Header */}
      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-violet-300">
          <Users className="h-4 w-4 text-violet-400" />
          <span>NETWORK MAP // CHAPTER ARCHITECTS</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            NODES ACTIVE
          </span>
          <span>LATENCY: 4ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Constellation Network Visual (Left) */}
        <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] w-full rounded-2xl border border-white/5 bg-[#05060A]/90 p-4">
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            {connections.map(([fromIdx, toIdx], i) => {
              const from = COMMUNITY_MEMBERS[fromIdx];
              const to = COMMUNITY_MEMBERS[toIdx];
              return (
                <line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(124, 58, 237, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              );
            })}
          </svg>

          {/* Interactive Member Nodes */}
          {COMMUNITY_MEMBERS.map((member) => {
            const isSelected = activeMember?.id === member.id;
            return (
              <motion.button
                key={member.id}
                onClick={() => setActiveMember(member)}
                onMouseEnter={() => setActiveMember(member)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  top: `${member.y}%`,
                  left: `${member.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="group absolute z-20 flex flex-col items-center cursor-pointer"
                aria-label={`View ${member.name}`}
              >
                {/* Node Orb with Initials */}
                <div
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? "border-violet-300 bg-violet-600 text-white shadow-[0_0_25px_#7C3AED] scale-110"
                      : "border-violet-500/40 bg-[#0B0D18] text-violet-300 hover:border-violet-300 hover:text-white"
                  }`}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                {/* Name Label */}
                <span
                  className={`mt-1.5 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-mono tracking-wider transition-colors ${
                    isSelected
                      ? "bg-violet-900/80 text-white font-bold"
                      : "text-slate-400 group-hover:text-violet-200"
                  }`}
                >
                  {member.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Member Profile Spotlight (Right) */}
        <div className="lg:col-span-5">
          {activeMember && (
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl border border-violet-500/30 bg-[#0B0D18]/90 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400 bg-violet-950/60 font-mono font-bold text-violet-200 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  {activeMember.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{activeMember.name}</h4>
                  <p className="text-xs font-mono text-violet-300">{activeMember.role}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-violet-500/15 bg-[#05060A]/80 p-3 font-mono text-xs text-slate-300">
                <div className="text-[10px] uppercase text-violet-400 mb-0.5">Primary Specialization:</div>
                <div className="font-semibold text-white">{activeMember.specialty}</div>
              </div>

              <blockquote className="mt-4 border-l-2 border-violet-500 pl-3 text-xs italic text-slate-300 leading-relaxed">
                "{activeMember.quote}"
              </blockquote>

              <div className="mt-5 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/10">
                <span>COLLABORATIVE PEER NODE</span>
                <span className="text-violet-300 font-semibold">CONNECT VIA DISCORD</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
