"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], .interactive"
      );
      setIsHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleElementHover, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Tiny glowing dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-white shadow-[0_0_12px_#A78BFA]"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50, mass: 0.1 }}
        style={{ width: 6, height: 6 }}
      />

      {/* Trailing orbital ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-violet-400/60 bg-violet-500/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        animate={{
          x: mousePos.x - (isHovering ? 28 : 16),
          y: mousePos.y - (isHovering ? 28 : 16),
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? "rgba(167, 139, 250, 0.9)" : "rgba(124, 58, 237, 0.4)",
          backgroundColor: isHovering ? "rgba(124, 58, 237, 0.18)" : "rgba(124, 58, 237, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      />
    </>
  );
}
