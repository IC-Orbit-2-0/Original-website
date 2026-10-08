"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("flex flex-col mb-12 sm:mb-16", alignClass, className)}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/30 px-3.5 py-1 mb-4 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#A78BFA] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-violet-300 uppercase">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
        <span className="bg-gradient-to-r from-white via-violet-100 to-indigo-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative orbital divider line */}
      <div
        className={cn(
          "mt-6 h-[2px] w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent",
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "mr-auto"
        )}
      />
    </motion.div>
  );
}
