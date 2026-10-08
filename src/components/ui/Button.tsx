"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "orbital";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  onHoverSound?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  onHoverSound,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-medium shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:border-violet-300 border border-violet-400/30",
    secondary:
      "bg-[#0B0D18]/80 text-violet-200 border border-violet-500/30 backdrop-blur-md hover:bg-violet-950/40 hover:border-violet-400/70 hover:text-white shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    ghost:
      "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent",
    orbital:
      "relative bg-gradient-to-b from-[#17152E]/90 to-[#0B0D18]/90 text-white border border-indigo-400/40 hover:border-violet-300 shadow-[0_0_30px_rgba(99,102,241,0.3)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={onHoverSound}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer overflow-hidden",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Light sheen animation */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
      
      {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
