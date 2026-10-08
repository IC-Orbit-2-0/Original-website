"use client";

import React from "react";
import Image from "next/image";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  DiscordIcon,
  InfinityIcon,
} from "../ui/Icons";

export function Footer() {
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Mission", href: "#mission" },
    { label: "The Orbit", href: "#the-orbit" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Events", href: "#events" },
    { label: "Projects", href: "#projects" },
    { label: "Community", href: "#community" },
    { label: "Join", href: "#join" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com", icon: <GithubIcon className="h-4 w-4" /> },
    { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedinIcon className="h-4 w-4" /> },
    { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon className="h-4 w-4" /> },
    { label: "Discord", href: "https://discord.com", icon: <DiscordIcon className="h-4 w-4" /> },
  ];

  return (
    <footer className="relative w-full border-t border-violet-500/20 bg-[#05060A] pt-16 pb-12 overflow-hidden">
      {/* Subtle orbital ring in footer background */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full border border-violet-500/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between pb-12 border-b border-white/5">
          {/* Left: Official IC ORBITE Logo + Typography */}
          <div className="md:col-span-5 flex flex-col items-start space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src="/images/ic-orbite-logo.png"
                  alt="IC ORBITE Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white">
                  IC ORBITE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-violet-300 uppercase">
                  INTERESTED. CODE ORBIT
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  A STUDENT CODING CLUB
                </span>
              </div>
            </div>
            <p className="max-w-sm text-xs text-slate-400 leading-relaxed">
              Empowering students to explore future technologies, build production software, and reach higher orbits together.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Social Channels */}
          <div className="md:col-span-3 flex flex-col sm:items-end space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              CONNECT WITH US
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-[#0B0D18] text-slate-400 hover:border-violet-400 hover:text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner with Motto */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} IC ORBITE. ALL RIGHTS RESERVED.
          </div>

          {/* Brand Philosophy motto */}
          <div className="flex items-center gap-2 text-violet-300 font-semibold tracking-widest">
            <span>IDEAS IN ORBIT</span>
            <InfinityIcon className="h-4 w-4 text-violet-400 animate-pulse" />
            <span>A BRIGHTER TOMORROW</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
