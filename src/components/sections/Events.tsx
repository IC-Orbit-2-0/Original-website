"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { CLUB_EVENTS, ClubEvent } from "@/data/events";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
  Ticket,
} from "lucide-react";
import confetti from "canvas-confetti";

interface EventsProps {
  onRegister?: () => void;
  onHoverSound?: () => void;
}

export function Events({ onHoverSound }: EventsProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [eventsList, setEventsList] = useState<ClubEvent[]>(CLUB_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  // Registration modal states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ticketConfirmation, setTicketConfirmation] = useState<{
    ticketId: string;
    eventTitle: string;
  } | null>(null);

  const categories = ["ALL", "CODE JAM", "HACKATHON", "WORKSHOP", "TECH TALK"];

  const filteredEvents =
    filter === "ALL"
      ? eventsList
      : eventsList.filter((e) => e.category === filter);

  const handleOpenRegister = (evt: ClubEvent) => {
    setSelectedEvent(evt);
    setErrorMessage("");
    setTicketConfirmation(null);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regName || !regEmail) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          name: regName.trim(),
          email: regEmail.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Event registration failed.");
        setLoading(false);
        return;
      }

      // Decrement spot in local UI
      setEventsList((prev) =>
        prev.map((item) =>
          item.id === selectedEvent.id && item.spotsLeft !== undefined
            ? { ...item, spotsLeft: Math.max(0, item.spotsLeft - 1) }
            : item
        )
      );

      setTicketConfirmation({
        ticketId: data.ticketId || `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        eventTitle: selectedEvent.title,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#7C3AED", "#6366F1", "#A78BFA", "#34D399", "#FFFFFF"],
        });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error("Event registration error:", err);
      setErrorMessage("Network error occurred. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRegName("");
    setRegEmail("");
    setErrorMessage("");
    setTicketConfirmation(null);
  };

  return (
    <section id="events" className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-900/15 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CALENDAR & EXPEDITIONS"
          title="UPCOMING EVENTS"
          subtitle="Join our hands-on workshops, 36-hour hackathons, code jams, and tech talks throughout the semester."
        />

        {/* Filter categories */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                onMouseEnter={onHoverSound}
                className={`rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "border border-violet-400 bg-violet-600/30 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)] scale-105"
                    : "border border-white/10 bg-[#0B0D18]/70 text-slate-400 hover:border-violet-500/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Event Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredEvents.map((evt) => (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <GlassCard
                  className="flex flex-col justify-between h-full p-6 sm:p-8 hover:-translate-y-1.5 transition-transform"
                  glowColor="rgba(124, 58, 237, 0.35)"
                >
                  <div>
                    {/* Header: Category Badge & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-violet-300">
                        <Sparkles className="h-3 w-3 text-violet-400" />
                        {evt.category}
                      </span>

                      <span
                        className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-bold ${
                          evt.status === "REGISTRATION OPEN"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : evt.status === "FEATURED"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {evt.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white">{evt.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-violet-300">
                      {evt.tagline}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Metadata: Date, Time, Location */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 border-t border-b border-white/5 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-violet-400" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="h-3.5 w-3.5 text-purple-400" />
                        <span>{evt.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {evt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Action */}
                  <div className="mt-6 pt-4 flex items-center justify-between">
                    {evt.spotsLeft !== undefined ? (
                      <span className="font-mono text-xs text-amber-300">
                        ⚡ {evt.spotsLeft} SPOTS REMAINING
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-slate-400">
                        OPEN TO ALL STUDENTS
                      </span>
                    )}

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenRegister(evt)}
                      onHoverSound={onHoverSound}
                      icon={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      REGISTER
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dedicated Event RSVP Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md rounded-3xl border border-violet-500/30 bg-[#0B0D18]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.35)]"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {ticketConfirmation ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 shadow-[0_0_25px_#34D399]">
                    <Ticket className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ORBITAL PASS CONFIRMED!</h3>
                  <p className="mt-2 text-xs text-slate-300">
                    You have reserved a seat for{" "}
                    <span className="font-semibold text-violet-300">
                      {ticketConfirmation.eventTitle}
                    </span>
                    .
                  </p>
                  <div className="mt-5 rounded-xl border border-violet-500/30 bg-violet-950/30 p-3 font-mono text-sm font-bold text-violet-200">
                    TICKET REF: {ticketConfirmation.ticketId}
                  </div>
                  <div className="mt-6">
                    <Button variant="primary" onClick={handleCloseModal} className="w-full">
                      DONE
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 px-2.5 py-0.5 text-[11px] font-mono text-violet-300">
                      <Sparkles className="h-3 w-3 text-violet-400" />
                      EVENT PASS RESERVATION
                    </span>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-xs text-slate-400">{selectedEvent.tagline}</p>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyanshu Sharma"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-4 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                        Student Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. priyanshu@college.edu"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full rounded-xl border border-violet-500/20 bg-[#05060A]/80 px-4 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-full py-3"
                        icon={
                          loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )
                        }
                      >
                        {loading ? "RESERVING PASS..." : "CONFIRM RESERVATION"}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
