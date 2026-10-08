"use client";

import { useEffect, useRef, useState } from "react";

export function useAudioSynth() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return audioCtxRef.current;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    return ctx;
  };

  const startDrone = () => {
    const ctx = initAudio();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Master drone gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
    masterGain.connect(ctx.destination);
    droneGainRef.current = masterGain;

    // Low-pass filter for warm cosmic ambient sound
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(140, ctx.currentTime);
    filter.connect(masterGain);
    filterRef.current = filter;

    // Sub oscillator 1 (55Hz - A1 note)
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    osc1.connect(filter);
    osc1.start();
    droneOsc1Ref.current = osc1;

    // Harmonizing oscillator 2 (82.4Hz - E2 fifth)
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(82.4, ctx.currentTime);
    osc2.connect(filter);
    osc2.start();
    droneOsc2Ref.current = osc2;

    setIsPlaying(true);
  };

  const stopDrone = () => {
    if (droneGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      droneGainRef.current.gain.setValueAtTime(
        droneGainRef.current.gain.value,
        ctx.currentTime
      );
      droneGainRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 1.2
      );

      setTimeout(() => {
        try {
          droneOsc1Ref.current?.stop();
          droneOsc2Ref.current?.stop();
          droneOsc1Ref.current?.disconnect();
          droneOsc2Ref.current?.disconnect();
          droneGainRef.current?.disconnect();
        } catch {
          // ignore
        }
        droneOsc1Ref.current = null;
        droneOsc2Ref.current = null;
        droneGainRef.current = null;
        setIsPlaying(false);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  // Play subtle futuristic celestial chime on interaction
  const playChime = (freq: number = 880) => {
    if (!isPlaying || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext might be paused or unavailable
    }
  };

  useEffect(() => {
    return () => {
      try {
        droneOsc1Ref.current?.stop();
        droneOsc2Ref.current?.stop();
        audioCtxRef.current?.close();
      } catch {
        // ignore
      }
    };
  }, []);

  return { isPlaying, toggleAudio, playChime };
}
