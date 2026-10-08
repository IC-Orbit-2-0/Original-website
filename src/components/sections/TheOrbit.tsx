"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { InteractiveOrbitSystem } from "../3d/InteractiveOrbitSystem";

export function TheOrbit() {
  return (
    <section id="the-orbit" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-900/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="INTERACTIVE ECOSYSTEM"
          title="THE ORBIT"
          subtitle="Explore the interconnected pillars of IC ORBITE. Click any celestial node to examine how our community operates."
        />

        {/* 3D / Interactive Orbital System with Central Nucleus & HUD */}
        <InteractiveOrbitSystem />
      </div>
    </section>
  );
}
