"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ConstellationNetwork } from "../3d/ConstellationNetwork";
import { COMMUNITY_METRICS } from "@/data/community";
import { Users, Heart, Share2, Award } from "lucide-react";

export function Community() {
  return (
    <section id="community" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-950/25 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="STUDENT NETWORK & CULTURE"
          title="YOU DON'T HAVE TO BUILD ALONE."
          subtitle="Great ideas become greater when people build them together."
        />

        {/* Digital Constellation Network Visualizer */}
        <ConstellationNetwork />

        {/* Community Metric Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {COMMUNITY_METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-violet-500/20 bg-[#0B0D18]/70 p-6 text-center backdrop-blur-xl"
            >
              <div className="text-3xl sm:text-4xl font-black text-white">
                {metric.value}
              </div>
              <div className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-violet-300">
                {metric.label}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {metric.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
