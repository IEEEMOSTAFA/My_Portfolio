"use client";

import React from "react";
import { motion } from "framer-motion";

const particles = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  size: 4 + (i % 4) * 2,
  color: i % 3 === 0 
    ? "rgba(99, 102, 241, 0.6)" 
    : i % 3 === 1 
    ? "rgba(168, 85, 247, 0.5)" 
    : "rgba(236, 72, 153, 0.4)",
}));

function Particle({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        width: size, 
        height: size, 
        background: color 
      }}
      animate={{ 
        y: [0, -25, 0], 
        opacity: [0.3, 0.8, 0.3] 
      }}
      transition={{ 
        duration: 4 + Math.random() * 3, 
        repeat: Infinity, 
        ease: "easeInOut", 
        delay: Math.random() * 2 
      }}
    />
  );
}

export default function BackgroundTheme() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#05050f]">
      
      {/* Soft Mesh Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-pink-600/5 blur-[80px]" />

      {/* Subtle Grid Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.04]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke="white" 
              strokeWidth="0.5" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </div>
  );
}