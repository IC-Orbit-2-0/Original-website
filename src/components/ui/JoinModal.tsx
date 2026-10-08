"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "./Button";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState("FullStack & Systems");
  const [experience, setExperience] = useState("Beginner with strong curiosity");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedApp, setSubmittedApp] = useState<{
    callsign: string;
    name: string;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          track,
          experience,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to submit application. Please retry.");
        setLoading(false);
        return;
      }

      // Success
      setSubmittedApp({
        callsign: data.application?.callsign || `#ICO-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.application?.name || name,
        email: data.application?.email || email,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#7C3AED", "#6366F1", "#A78BFA", "#38BDF8", "#FFFFFF"],
        });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedApp(null);
    setName("");
    setEmail("");
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl border border-violet-500/30 bg-[#0B0D18]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(124,58,237,0.35)] backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {submittedApp ? (
              <div className="py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20 border border-violet-400 text-violet-300 shadow-[0_0_30px_#7C3AED]"
                >
                  <CheckCircle2 className="h-9 w-9 text-violet-300" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">ORBITAL LINK ESTABLISHED!</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Welcome to the orbit, <span className="font-semibold text-violet-300">{submittedApp.name}</span>.
                  We’ve verified and registered your details under <span className="font-semibold text-violet-300">{submittedApp.email}</span>.
                </p>
                <div className="mt-6 rounded-xl border border-violet-500/30 bg-violet-950/30 p-4 font-mono text-sm font-bold text-violet-200 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                  OFFICIAL CALLSIGN: {submittedApp.callsign} // STATUS: ACTIVE
                </div>
                <div className="mt-8">
                  <Button variant="primary" onClick={handleReset} className="w-full">
                    RETURN TO ORBIT
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-violet-300">
                    <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                    ACADEMIC YEAR 2026 COHORT
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold text-white">
                    JOIN IC ORBITE
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    A student coding club where curious minds learn, build and launch together.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Student / Academic Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Primary Interest Track
                      </label>
                      <select
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-3 py-3 text-sm text-white focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      >
                        <option value="FullStack & Systems">FullStack & Systems</option>
                        <option value="AI & Autonomous Agents">AI & Reasoning Agents</option>
                        <option value="Creative 3D & WebGL">Creative 3D & WebGL</option>
                        <option value="Competitive & Hackathons">Competitive Hackathons</option>
                        <option value="Hardware & Embedded">Hardware & Robotics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Experience Level
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-3 py-3 text-sm text-white focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      >
                        <option value="Beginner with strong curiosity">Beginner (Hungry to learn)</option>
                        <option value="Intermediate builder">Intermediate (Have built projects)</option>
                        <option value="Advanced / Hackathon veteran">Advanced (Ship production code)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="w-full py-3.5"
                      icon={
                        loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )
                      }
                    >
                      {loading ? "ESTABLISHING ORBITAL LINK..." : "SUBMIT APPLICATION"}
                    </Button>
                  </div>

                  <p className="text-center text-[11px] text-slate-400">
                    No prior experience mandatory. All students passionate about code are welcome.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
