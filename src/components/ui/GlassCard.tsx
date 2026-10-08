"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: string;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  enableTilt = true,
  glowColor = "rgba(124, 58, 237, 0.3)",
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={cn(
        "relative rounded-2xl border border-violet-500/15 bg-[#0B0D18]/70 p-6 backdrop-blur-xl transition-shadow duration-500 overflow-hidden",
        isHovered
          ? "border-violet-400/40 shadow-[0_15px_35px_-5px_rgba(124,58,237,0.25)]"
          : "shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Dynamic Radial Glow following cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle corner tech border accents */}
      <span className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-violet-400/40 rounded-tl-sm" />
      <span className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-violet-400/40 rounded-tr-sm" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-violet-400/40 rounded-bl-sm" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-violet-400/40 rounded-br-sm" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
