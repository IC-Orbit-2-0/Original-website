"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SoundController } from "@/components/ui/SoundController";
import { JoinModal } from "@/components/ui/JoinModal";
import { Preloader } from "@/components/sections/Preloader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { TheOrbit } from "@/components/sections/TheOrbit";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Journey } from "@/components/sections/Journey";
import { Events } from "@/components/sections/Events";
import { Projects } from "@/components/sections/Projects";
import { Team } from "@/components/sections/Team";
import { Community } from "@/components/sections/Community";
import { JoinOrbit } from "@/components/sections/JoinOrbit";
import { Footer } from "@/components/sections/Footer";
import { SpaceScene } from "@/components/3d/SpaceScene";
import { useAudioSynth } from "@/hooks/useAudioSynth";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const { isPlaying, toggleAudio, playChime } = useAudioSynth();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Futuristic Desktop Custom Cursor */}
      <CustomCursor />

      {/* Master 3D Space Background */}
      <SpaceScene />

      {/* Floating Ambient Sound Controller */}
      <SoundController isPlaying={isPlaying} onToggle={toggleAudio} />

      {/* Navigation Bar */}
      <Navbar
        onOpenJoin={() => {
          playChime(920);
          setIsJoinOpen(true);
        }}
        onHoverSound={() => playChime(660)}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 flex flex-col w-full min-h-screen">
        <Hero
          onOpenJoin={() => {
            playChime(920);
            setIsJoinOpen(true);
          }}
          onHoverSound={() => playChime(660)}
        />

        <Mission />

        <TheOrbit />

        <WhatWeDo />

        <Journey />

        <Events
          onRegister={() => {
            playChime(880);
            setIsJoinOpen(true);
          }}
          onHoverSound={() => playChime(660)}
        />

        <Projects onHoverSound={() => playChime(660)} />

        <Team onHoverSound={() => playChime(660)} />

        <Community />

        <JoinOrbit
          onOpenJoin={() => {
            playChime(920);
            setIsJoinOpen(true);
          }}
          onHoverSound={() => playChime(660)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Application / Join Modal */}
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
    </>
  );
}
