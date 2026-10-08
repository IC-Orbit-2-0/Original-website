"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Orbit } from "lucide-react";
import { Button } from "../ui/Button";

interface NavbarProps {
  onOpenJoin: () => void;
  onHoverSound?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Mission", href: "#mission" },
  { label: "The Orbit", href: "#the-orbit" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Journey", href: "#journey" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Team", href: "#team" },
];

export function Navbar({ onOpenJoin, onHoverSound }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scrollspy
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5 sm:py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between rounded-full border px-4 sm:px-6 py-2.5 transition-all duration-500 ${
              scrolled
                ? "border-violet-500/25 bg-[#080A12]/85 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-xl"
                : "border-white/10 bg-[#0B0D18]/40 backdrop-blur-md"
            }`}
          >
            {/* Left: Official IC ORBITE Logo + Wordmark */}
            <Link
              href="#hero"
              className="flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/ic-orbite-logo.png"
                  alt="IC ORBITE Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-white">
                  IC ORBITE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-violet-300 uppercase hidden sm:block">
                  A Student Coding Club
                </span>
              </div>
            </Link>

            {/* Center/Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={onHoverSound}
                    className={`relative rounded-full px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-violet-400/50 bg-violet-600/20 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Right: CTA & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenJoin}
                onHoverSound={onHoverSound}
                className="hidden sm:inline-flex"
                icon={<Orbit className="h-3.5 w-3.5" />}
              >
                JOIN ORBIT
              </Button>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-violet-500/30 bg-[#080A12]/95 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-mono tracking-wider transition-colors ${
                      isActive
                        ? "border border-violet-400/40 bg-violet-950/40 text-white font-bold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoin();
                  }}
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  JOIN IC ORBITE
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
