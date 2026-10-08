"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { MissionPlanet } from "../3d/MissionPlanet";
import { fadeInUp } from "@/lib/animations";
import { Code2, Cpu, Rocket, ShieldCheck } from "lucide-react";

export function Mission() {
  const pillars = [
    {
      icon: <Code2 className="h-5 w-5 text-violet-400" />,
      title: "Active Learning",
      desc: "Moving beyond passive tutorials into direct code manipulation and system debugging.",
    },
    {
      icon: <Rocket className="h-5 w-5 text-indigo-400" />,
      title: "Real Production",
      desc: "Building software that real users interact with, deployed on live cloud infrastructure.",
    },
    {
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      title: "Deep Exploration",
      desc: "Venturing into AI models, low-level compilers, hardware hacks, and WebGL graphics.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: "Peer Accountability",
      desc: "Surrounding yourself with ambitious peers who keep you motivated and accountable.",
    },
  ];

  return (
    <section id="mission" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FOUNDATIONAL PHILOSOPHY"
          title="OUR MISSION"
          subtitle="Turning curiosity into capability."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Mission Narrative & Core Statements (Left) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="rounded-3xl border border-violet-500/20 bg-[#0B0D18]/70 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                An orbit where ambitious student developers converge.
              </h3>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                <span className="font-semibold text-violet-300">IC ORBITE</span> is
                more than a club—it is a launchpad designed to bridge the chasm
                between textbook theory and modern engineering craft.
              </p>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                We believe the best way to master technology is to build fearlessly.
                Here, students learn bleeding-edge stacks, ship open-source
                repositories, collaborate on high-stakes hackathons, and accelerate
                their journey into the global tech ecosystem.
              </p>

              {/* 4 Pillars Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-[#05060A]/80 p-4 transition-colors hover:border-violet-500/30"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-950/40 border border-violet-500/20">
                      {pillar.icon}
                    </div>
                    <div className="text-sm font-bold text-white">{pillar.title}</div>
                    <div className="mt-1 text-xs text-slate-400 leading-normal">
                      {pillar.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Rotating Planet with 5 Orbital Labels (Right) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <MissionPlanet />
            <div className="text-center font-mono text-xs text-slate-400">
              [ HOVER OR TOUCH LABELS TO INSPECT ORBITAL PATHWAYS ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
