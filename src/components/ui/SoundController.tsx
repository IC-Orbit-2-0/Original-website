"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SoundControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function SoundController({ isPlaying, onToggle }: SoundControllerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-[#0B0D18]/80 px-3.5 py-2 backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
        aria-label={isPlaying ? "Mute ambient audio" : "Enable cosmic soundscape"}
      >
        {/* Glow indicator */}
        <span
          className={`h-2 w-2 rounded-full transition-colors duration-300 ${
            isPlaying
              ? "bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse"
              : "bg-slate-500"
          }`}
        />

        {isPlaying ? (
          <Volume2 className="h-4 w-4 text-violet-300 transition-colors group-hover:text-white" />
        ) : (
          <VolumeX className="h-4 w-4 text-slate-400 transition-colors group-hover:text-violet-300" />
        )}

        {/* Dynamic sound waves */}
        {isPlaying && (
          <div className="flex items-center gap-0.5">
            <span className="h-2 w-0.5 animate-pulse bg-violet-400" />
            <span className="h-3.5 w-0.5 animate-pulse bg-violet-300 [animation-delay:150ms]" />
            <span className="h-2.5 w-0.5 animate-pulse bg-violet-400 [animation-delay:300ms]" />
          </div>
        )}

        <span className="text-xs font-mono uppercase tracking-wider text-slate-300 group-hover:text-white">
          {isPlaying ? "AUDIO ON" : "AUDIO"}
        </span>
      </motion.button>
    </div>
  );
}
