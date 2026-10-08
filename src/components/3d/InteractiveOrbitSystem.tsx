"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORBIT_NODES, OrbitNode } from "@/data/orbitNodes";
import { X, ArrowRight, Sparkles, Orbit } from "lucide-react";

export function InteractiveOrbitSystem() {
  const [mounted, setMounted] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string>("learn");
  const activeNode = ORBIT_NODES.find((n) => n.id === activeNodeId) || ORBIT_NODES[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-6xl py-8">
      {/* Node selector tabs (accessible navigation) */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {ORBIT_NODES.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? "border border-violet-400 bg-violet-600/30 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] scale-105"
                  : "border border-white/10 bg-[#0B0D18]/70 text-slate-400 hover:border-violet-500/40 hover:text-white"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              {node.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Orbital Visual Canvas (Left / Center) */}
        <div className="lg:col-span-7 relative flex aspect-square w-full max-w-[500px] mx-auto items-center justify-center">
          {/* Orbital rings */}
          <div className="absolute inset-4 rounded-full border border-violet-500/15 animate-spin-slow pointer-events-none" />
          <div className="absolute inset-16 rounded-full border border-dashed border-indigo-500/20 animate-spin-reverse-slow pointer-events-none" />
          <div className="absolute inset-28 rounded-full border border-violet-400/25 pointer-events-none" />

          {/* Central glowing core: IC ORBITE */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-10 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-2 border-violet-400/80 bg-gradient-to-b from-[#1E1B4B] to-[#0B0D18] text-center shadow-[0_0_40px_rgba(124,58,237,0.7)] backdrop-blur-xl"
          >
            <Orbit className="h-6 w-6 text-violet-300 animate-spin-slow" />
            <div className="mt-1 text-xs font-black tracking-widest text-white">
              IC ORBITE
            </div>
            <div className="text-[9px] font-mono text-violet-300 tracking-wider">
              NUCLEUS
            </div>

            {/* Core pulsing aura */}
            <span className="absolute -inset-2 rounded-full border border-violet-400/40 animate-ping opacity-30 pointer-events-none" />
          </motion.div>

          {/* Orbiting Interactive Nodes */}
          {ORBIT_NODES.map((node, index) => {
            const isSelected = node.id === activeNodeId;
            const angleRad = (index / ORBIT_NODES.length) * Math.PI * 2;
            const radius = 175; // px from center in 500px box
            const x = (Math.cos(angleRad) * radius).toFixed(2);
            const y = (Math.sin(angleRad) * radius).toFixed(2);

            return (
              <motion.button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`group absolute z-20 flex flex-col items-center justify-center transition-all duration-300 ${
                  isSelected ? "scale-110 opacity-100" : activeNodeId ? "opacity-45 hover:opacity-100" : "opacity-90"
                }`}
              >
                {/* Node Orb */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-mono font-bold text-white transition-all duration-300 shadow-lg"
                  style={{
                    backgroundColor: isSelected ? node.color : "#0B0D18",
                    borderColor: node.color,
                    boxShadow: isSelected ? `0 0 30px ${node.glowColor}` : "none",
                  }}
                >
                  <span className="text-[11px]">{node.label.slice(0, 3)}</span>
                </div>

                {/* Node Label tag */}
                <span
                  className="mt-1.5 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors"
                  style={{
                    color: isSelected ? "#FFFFFF" : "#A78BFA",
                    backgroundColor: isSelected ? "rgba(124, 58, 237, 0.4)" : "rgba(11, 13, 24, 0.8)",
                  }}
                >
                  {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Node Information Panel (Right side) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-violet-500/30 bg-[#0B0D18]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(124,58,237,0.25)] relative overflow-hidden"
            >
              {/* Top ambient color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: activeNode.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-violet-300">
                  <Sparkles className="h-3 w-3" style={{ color: activeNode.color }} />
                  ECOSYSTEM NODE // 0{ORBIT_NODES.findIndex((n) => n.id === activeNode.id) + 1}
                </div>

                <div
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold"
                  style={{
                    backgroundColor: `${activeNode.color}25`,
                    color: activeNode.color,
                  }}
                >
                  {activeNode.metric}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeNode.label}
              </h3>
              <p className="mt-1 text-sm font-medium text-violet-300">
                {activeNode.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {activeNode.description}
              </p>

              <div className="mt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Key Deliverables & Initiatives
                </div>
                <ul className="space-y-2">
                  {activeNode.coreFocus.map((focus, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeNode.color }}
                      />
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next node trigger */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  CLICK ANY ORBITAL NODE TO EXPLORE
                </span>
                <button
                  onClick={() => {
                    const currentIndex = ORBIT_NODES.findIndex((n) => n.id === activeNodeId);
                    const nextIndex = (currentIndex + 1) % ORBIT_NODES.length;
                    setActiveNodeId(ORBIT_NODES[nextIndex].id);
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-violet-300 hover:text-white transition-colors"
                >
                  NEXT NODE <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
