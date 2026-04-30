"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Terminal } from "lucide-react";
import { gsap } from "gsap";
import BackgroundTheme from "@/components/BackgroundTheme";

const RESUME_LINK = "https://drive.google.com/file/d/1C4QQ1Z7LTc0kJey74edSp1Lo4uD3L8Ij/view?usp=sharing";
const RESUME_DOWNLOAD = "https://drive.google.com/uc?export=download&id=1C4QQ1Z7LTc0kJey74edSp1Lo4uD3L8Ij";

// ─── PULSE RING ──────────────────────────────────────────────────────────────

function PulseRing() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
      <motion.div
        className="absolute inset-0 rounded-full border border-indigo-500/50"
        animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-purple-500/30"
        animate={{ scale: [1, 2.3], opacity: [0.4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
      />
      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
    </div>
  );
}

// ─── RESUME CARD ─────────────────────────────────────────────────────────────

function ResumeCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      gsap.to(card, {
        rotateX: -y,
        rotateY: x,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });
    };
    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 sm:p-7 backdrop-blur-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow blobs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-indigo-600/20 blur-[70px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-purple-600/15 blur-[55px] pointer-events-none" />

        {/* Corner triangle accent */}
        <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none overflow-hidden rounded-tr-2xl">
          <svg viewBox="0 0 112 112" className="w-full h-full">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path d="M112 0 L112 112 L0 0 Z" fill="url(#cg)" opacity="0.18" />
          </svg>
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">

          {/* Left: thumbnail + info */}
          <div className="flex items-center gap-5">
            {/* PDF thumbnail */}
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(RESUME_LINK, "_blank")}
              className="relative w-[68px] h-[88px] rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 cursor-pointer group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                  <rect width="28" height="36" rx="4" fill="#1e1b4b" />
                  <path d="M5 8h10M5 13h18M5 18h18M5 23h18M5 28h10" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[8px] font-mono text-indigo-400 tracking-widest">PDF</span>
              </div>
              <motion.div className="absolute inset-0 bg-indigo-500/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <Eye size={18} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <PulseRing />
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Available Now</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight font-mono leading-none mb-1">
                My Resume
              </h3>
              <p className="text-sm text-gray-400">Md. Al Mostafa · Full-Stack Developer</p>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-600 font-mono">
                <Terminal size={10} />
                <span>Updated 2026</span>
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            {/* View button */}
            <motion.a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.05] text-sm font-mono text-gray-300 hover:text-white hover:bg-white/[0.09] transition-all"
            >
              <Eye size={14} className="text-indigo-400" />
              View
            </motion.a>

            {/* Download button */}
            <motion.a
              href={RESUME_DOWNLOAD}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono text-white overflow-hidden"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #818cf8, #a78bfa)" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                  width: "45%",
                }}
              />
              <Download size={14} className="relative z-10" />
              <span className="relative z-10">Download</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── DOWNLOAD FULL RESUME BUTTON ─────────────────────────────────────────────

function DownloadFullResumeBtn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="flex justify-center mt-6"
    >
      <motion.a
        href={RESUME_DOWNLOAD}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative inline-flex items-center gap-2.5 px-8 py-3 rounded-xl text-sm font-mono font-medium text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            width: "40%",
          }}
        />
        <Download size={15} className="relative z-10" />
        <span className="relative z-10">Download Full Resume</span>
      </motion.a>
    </motion.div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function MyResume() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-16">
      <BackgroundTheme />
      <div className="relative z-10 w-full max-w-2xl">
        <ResumeCard />
        <DownloadFullResumeBtn />
      </div>
    </div>
  );
}