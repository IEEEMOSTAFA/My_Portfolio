// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import { useSpring as useReactSpring, animated, config } from "@react-spring/web";
// import { gsap } from "gsap";
// import { TextPlugin } from "gsap/TextPlugin";
// import { Mail, ArrowRight, Code2, Layers, Zap } from "lucide-react";

// import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Lottie from "lottie-react";

// // Register GSAP plugins
// gsap.registerPlugin(TextPlugin);

// // ─── Lottie JSON (inline minimal "code typing" animation) ───────────────────
// // In production, import from a .json file e.g. import codeAnim from "@/lottie/code.json"
// // Here we define a minimal valid Lottie payload so the component is self-contained.
// const codeLottie = {
//   v: "5.7.4",
//   fr: 30,
//   ip: 0,
//   op: 60,
//   w: 200,
//   h: 200,
//   nm: "Code",
//   ddd: 0,
//   assets: [],
//   layers: [
//     {
//       ddd: 0, ind: 1, ty: 4, nm: "bar",
//       sr: 1, ks: {
//         o: { a: 1, k: [{ t: 0, s: [100], e: [20] }, { t: 30, s: [20], e: [100] }, { t: 60, s: [100] }], ix: 11 },
//         r: { a: 0, k: 0, ix: 10 },
//         p: { a: 0, k: [100, 100, 0], ix: 2 },
//         s: { a: 0, k: [100, 100, 100], ix: 6 },
//       },
//       ao: 0,
//       shapes: [{
//         ty: "gr",
//         it: [
//           { ty: "rc", d: 1, s: { a: 0, k: [12, 40] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "rect" },
//           { ty: "fl", c: { a: 0, k: [0.39, 0.51, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "fill" },
//           { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
//         ],
//         nm: "bar"
//       }],
//       ip: 0, op: 60, st: 0, bm: 0
//     }
//   ]
// };

// // ─── Tech stack pills ────────────────────────────────────────────────────────
// const STACK = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker"];

// // ─── Social links ─────────────────────────────────────────────────────────────
// const SOCIALS = [
//   { icon: FaGithub,     href: "https://github.com/IEEEMOSTAFA",   label: "GitHub" },
//   { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/md-al-mostafa-66817a251/",  label: "LinkedIn" },
// //   { icon: FaXTwitter,   href: "https://twitter.com",   label: "Twitter" },
// ];

// // ─── Floating particle ───────────────────────────────────────────────────────
// function Particle({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
//   return (
//     <motion.div
//       className="absolute rounded-full pointer-events-none"
//       style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
//       animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
//       transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
//     />
//   );
// }

// // ─── Main Component ──────────────────────────────────────────────────────────
// export default function HeroSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const titleRef     = useRef<HTMLSpanElement>(null);
//   const imgRef       = useRef<HTMLDivElement>(null);
//   const [hovered, setHovered] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // --- Framer scroll parallax ---
//   const { scrollY } = useScroll();
//   const imgY  = useSpring(useTransform(scrollY, [0, 400], [0, -60]),  { stiffness: 80, damping: 20 });
//   const textY = useSpring(useTransform(scrollY, [0, 400], [0, 30]),   { stiffness: 80, damping: 20 });

//   // --- React Spring: glowing ring pulse on image ---
//   const ringSpring = useReactSpring({
//     boxShadow: hovered
//       ? "0 0 0 6px rgba(99,102,241,0.5), 0 0 60px 20px rgba(99,102,241,0.25)"
//       : "0 0 0 3px rgba(99,102,241,0.25), 0 0 30px 8px rgba(99,102,241,0.1)",
//     config: config.wobbly,
//   });

//   // --- GSAP: typewriter on subtitle ---
//   useEffect(() => {
//     if (!titleRef.current) return;
//     const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Open Source Lover", "Problem Solver"];
//     let i = 0;
//     const tl = gsap.timeline({ repeat: -1 });
//     roles.forEach((role) => {
//       tl.to(titleRef.current, { duration: 1.2, text: role, ease: "none" })
//         .to(titleRef.current, { duration: 0.8, text: "", ease: "none", delay: 1.5 });
//     });
//     return () => { tl.kill(); };
//   }, []);

//   // --- AOS init ---
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
//     setMounted(true);
//   }, []);

//   // --- GSAP: image float on mount ---
//   useEffect(() => {
//     if (!imgRef.current) return;
//     gsap.fromTo(
//       imgRef.current,
//       { y: 30, opacity: 0, scale: 0.95 },
//       { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.4 }
//     );
//     gsap.to(imgRef.current, {
//       y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6,
//     });
//   }, [mounted]);

//   // Particles (seeded so SSR-safe)
//   const particles = Array.from({ length: 12 }, (_, i) => ({
//     x: (i * 37 + 11) % 100,
//     y: (i * 53 + 7)  % 100,
//     size: 4 + (i % 4) * 2,
//     color: i % 3 === 0 ? "rgba(99,102,241,0.6)" : i % 3 === 1 ? "rgba(168,85,247,0.5)" : "rgba(236,72,153,0.4)",
//   }));

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex items-center overflow-hidden bg-[#05050f]"
//     >
//       {/* ── Ambient background ── */}
//       <div className="absolute inset-0 pointer-events-none select-none">
//         {/* Mesh gradient blobs */}
//         <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[120px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-pink-600/5 blur-[80px]" />

//         {/* Grid lines */}
//         <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
//               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>

//         {/* Floating particles */}
//         {particles.map((p, i) => <Particle key={i} {...p} />)}
//       </div>

//       {/* ── Main layout ── */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* ── LEFT: Text content ── */}
//           <motion.div style={{ y: textY }} className="order-2 lg:order-1 flex flex-col gap-6">

//             {/* Status badge */}
//             <div data-aos="fade-right" data-aos-delay="100">
//               <Badge
//                 variant="outline"
//                 className="inline-flex items-center gap-2 border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full"
//               >
//                 <span className="relative flex h-2 w-2">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
//                   <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
//                 </span>
//                 Available for work
//               </Badge>
//             </div>

//             {/* Name */}
//             <div data-aos="fade-right" data-aos-delay="200">
//               <h1 className="font-extrabold leading-[1.08] tracking-tight text-white"
//                   style={{ fontFamily: "'Clash Display', 'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
//                 Hi, I'm{" "}
//                 <span className="relative inline-block">
//                   <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     Mostafa
//                   </span>
//                   <span className="absolute inset-x-0 bottom-1 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
//                 </span>
//               </h1>
//             </div>

//             {/* Typewriter role */}
//             <div data-aos="fade-right" data-aos-delay="300">
//               <p className="text-2xl font-semibold text-slate-300 flex items-center gap-2 min-h-[36px]"
//                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
//                 <Code2 className="w-5 h-5 text-indigo-400 shrink-0" />
//                 <span ref={titleRef} className="text-indigo-200" />
//                 <span className="animate-pulse text-indigo-400">|</span>
//               </p>
//             </div>

//             {/* Bio */}
//             <div data-aos="fade-right" data-aos-delay="400">
//               <p className="text-slate-400 text-lg leading-relaxed max-w-lg"
//                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                 I craft{" "}
//                 <span className="text-white font-medium">scalable web applications</span> from pixel-perfect UIs to robust back-ends — turning complex problems into elegant, performant solutions.
//               </p>
//             </div>

//             {/* Tech stack pills */}
//             <div data-aos="fade-right" data-aos-delay="500" className="flex flex-wrap gap-2">
//               {STACK.map((tech, i) => (
//                 <motion.span
//                   key={tech}
//                   whileHover={{ scale: 1.08, y: -2 }}
//                   className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-800/60 text-slate-300 cursor-default"
//                   style={{ backdropFilter: "blur(8px)" }}
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <div data-aos="fade-up" data-aos-delay="600" className="flex flex-wrap gap-4 pt-2">
//               <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
//                 <Button
//                   size="lg"
//                   className="group relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3 rounded-xl gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-300"
//                 >
//                   <Mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
//                   Get in Touch
//                   <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Button>
//               </motion.div>

//               <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="group border-slate-600 bg-slate-800/50 hover:bg-slate-700/60 text-slate-200 font-semibold px-7 py-3 rounded-xl gap-2 backdrop-blur-sm transition-all duration-300"
//                 >
//                   <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//                   Explore My Work
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </motion.div>
//             </div>

//             {/* Social links */}
//             <div data-aos="fade-up" data-aos-delay="700" className="flex items-center gap-4 pt-1">
//               <span className="text-slate-600 text-sm">Find me on</span>
//               <div className="flex gap-3">
//                 {SOCIALS.map(({ icon: Icon, href, label }) => (
//                   <motion.a
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noreferrer"
//                     aria-label={label}
//                     whileHover={{ scale: 1.2, y: -2 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
//                   >
//                     <Icon className="w-4 h-4" />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             {/* Mini stats */}
//             <div data-aos="fade-up" data-aos-delay="800"
//                  className="flex gap-8 pt-4 border-t border-slate-800">
//               {[
//                 { value: "3+", label: "Years Exp." },
//                 { value: "40+", label: "Projects" },
//                 { value: "20+", label: "Happy Clients" },
//               ].map(({ value, label }) => (
//                 <div key={label} className="text-center">
//                   <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
//                      style={{ fontFamily: "'Clash Display', sans-serif" }}>
//                     {value}
//                   </p>
//                   <p className="text-xs text-slate-500 mt-0.5">{label}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ── RIGHT: Image ── */}
//           <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">

//             {/* Lottie accent (top-right corner) */}
//             <div className="absolute -top-6 -right-4 w-24 h-24 opacity-60 pointer-events-none z-20" data-aos="zoom-in" data-aos-delay="900">
//               <Lottie animationData={codeLottie} loop />
//             </div>

//             {/* Decorative rings */}
//             <motion.div
//               className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-indigo-500/15"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             />
//             <motion.div
//               className="absolute w-[290px] h-[290px] md:w-[360px] md:h-[360px] rounded-full border border-purple-500/10"
//               animate={{ rotate: -360 }}
//               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//             />

//             {/* Orbit dot */}
//             <motion.div
//               className="absolute w-3 h-3 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50"
//               style={{ top: "50%", left: "50%", transformOrigin: "170px 0" }}
//               animate={{ rotate: 360 }}
//               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
//             />
//             <motion.div
//               className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50"
//               style={{ top: "50%", left: "50%", transformOrigin: "140px 0" }}
//               animate={{ rotate: -360 }}
//               transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
//             />

//             {/* Image card */}
//             <motion.div
//               style={{ y: imgY }}
//               className="relative z-10"
//               data-aos="zoom-in"
//               data-aos-delay="300"
//             >
//               <animated.div
//                 ref={imgRef}
//                 style={{ ...ringSpring, borderRadius: "2rem" }}
//                 onMouseEnter={() => setHovered(true)}
//                 onMouseLeave={() => setHovered(false)}
//                 className="relative w-[260px] h-[320px] md:w-[310px] md:h-[390px] overflow-hidden cursor-pointer"
//               >
//                 {/* Gradient overlay on hover */}
//                 <AnimatePresence>
//                   {hovered && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="absolute inset-0 z-10 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent flex items-end p-5"
//                     >
//                       <span className="text-white font-semibold text-sm flex items-center gap-1">
//                         <Zap className="w-4 h-4 text-yellow-400" /> Full-Stack Developer
//                       </span>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Photo */}
//                 <img
//                   src="/Mostafa_photo.png"
//                   alt="Mostafa — Full-Stack Developer"
//                   className="w-full h-full object-cover object-top"
//                   draggable={false}
//                 />
//               </animated.div>

//               {/* Floating badge: "Open to Work" */}
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
//                 className="absolute -bottom-4 -left-6 bg-slate-900 border border-indigo-500/30 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/40 flex items-center gap-2 backdrop-blur-sm"
//               >
//                 <span className="text-lg">🚀</span>
//                 <div>
//                   <p className="text-white text-xs font-semibold leading-tight">Open to Work</p>
//                   <p className="text-slate-500 text-[10px]">Full-time / Freelance</p>
//                 </div>
//               </motion.div>

//               {/* Floating badge: experience */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.4, type: "spring", stiffness: 120 }}
//                 className="absolute -top-4 -right-6 bg-slate-900 border border-purple-500/30 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-sm"
//               >
//                 <p className="text-white text-xs font-semibold">3+ Years</p>
//                 <p className="text-slate-500 text-[10px]">Experience</p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* ── Scroll indicator ── */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
//         animate={{ y: [0, 8, 0] }}
//         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//       >
//         <span className="text-[10px] tracking-widest uppercase">Scroll</span>
//         <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
//       </motion.div>
//     </section>
//   );
// }





























"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useSpring as useReactSpring, animated, config } from "@react-spring/web";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight, Code2, Layers, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import Link from "next/link";
import { heroData } from "@/src/data/herodata";

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

// ─── Lottie JSON (inline minimal "code typing" animation) ───────────────────
// In production, import from a .json file e.g. import codeAnim from "@/lottie/code.json"
// Here we define a minimal valid Lottie payload so the component is self-contained.
const codeLottie = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Code",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: "bar",
      sr: 1, ks: {
        o: { a: 1, k: [{ t: 0, s: [100], e: [20] }, { t: 30, s: [20], e: [100] }, { t: 60, s: [100] }], ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [100, 100, 0], ix: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6 },
      },
      ao: 0,
      shapes: [{
        ty: "gr",
        it: [
          { ty: "rc", d: 1, s: { a: 0, k: [12, 40] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 4 }, nm: "rect" },
          { ty: "fl", c: { a: 0, k: [0.39, 0.51, 1, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "fill" },
          { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ],
        nm: "bar"
      }],
      ip: 0, op: 60, st: 0, bm: 0
    }
  ]
};

// Data is imported from herodata.ts

// ─── Floating particle ───────────────────────────────────────────────────────
function Particle({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color }}
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLSpanElement>(null);
  const imgRef       = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- Framer scroll parallax ---
  const { scrollY } = useScroll();
  const imgY  = useSpring(useTransform(scrollY, [0, 400], [0, -60]),  { stiffness: 80, damping: 20 });
  const textY = useSpring(useTransform(scrollY, [0, 400], [0, 30]),   { stiffness: 80, damping: 20 });

  // --- React Spring: glowing ring pulse on image ---
  const ringSpring = useReactSpring({
    boxShadow: hovered
      ? "0 0 0 6px rgba(99,102,241,0.5), 0 0 60px 20px rgba(99,102,241,0.25)"
      : "0 0 0 3px rgba(99,102,241,0.25), 0 0 30px 8px rgba(99,102,241,0.1)",
    config: config.wobbly,
  });

  // --- GSAP: typewriter on subtitle ---
  useEffect(() => {
    if (!titleRef.current) return;
    const roles = heroData.roles;
    let i = 0;
    const tl = gsap.timeline({ repeat: -1 });
    roles.forEach((role) => {
      tl.to(titleRef.current, { duration: 1.2, text: role, ease: "none" })
        .to(titleRef.current, { duration: 0.8, text: "", ease: "none", delay: 1.5 });
    });
    return () => { tl.kill(); };
  }, []);

  // --- AOS init ---
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
    setMounted(true);
  }, []);

  // --- GSAP: image float on mount ---
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.4 }
    );
    gsap.to(imgRef.current, {
      y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6,
    });
  }, [mounted]);

  // Particles (seeded so SSR-safe)
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 37 + 11) % 100,
    y: (i * 53 + 7)  % 100,
    size: 4 + (i % 4) * 2,
    color: i % 3 === 0 ? "rgba(99,102,241,0.6)" : i % 3 === 1 ? "rgba(168,85,247,0.5)" : "rgba(236,72,153,0.4)",
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#05050f]"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Mesh gradient blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-pink-600/5 blur-[80px]" />

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1 flex flex-col gap-6">

            {/* Status badge */}
            <div data-aos="fade-right" data-aos-delay="100">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                </span>
                {heroData.availability}
              </Badge>
            </div>

            {/* Name */}
            <div data-aos="fade-right" data-aos-delay="200">
              <h1 className="font-extrabold leading-[1.08] tracking-tight text-white"
                  style={{ fontFamily: "'Clash Display', 'Syne', sans-serif", fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
                Hi, I'm{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {heroData.name}
                  </span>
                  <span className="absolute inset-x-0 bottom-1 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
                </span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div data-aos="fade-right" data-aos-delay="300">
              <p className="text-2xl font-semibold text-slate-300 flex items-center gap-2 min-h-[36px]"
                 style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <Code2 className="w-5 h-5 text-indigo-400 shrink-0" />
                <span ref={titleRef} className="text-indigo-200" />
                <span className="animate-pulse text-indigo-400">|</span>
              </p>
            </div>

            {/* Bio */}
            <div data-aos="fade-right" data-aos-delay="400">
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg"
                 style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {heroData.bio}
              </p>
            </div>

            {/* Tech stack pills */}
            <div data-aos="fade-right" data-aos-delay="500" className="flex flex-wrap gap-2">
              {heroData.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-slate-700 bg-slate-800/60 text-slate-300 cursor-default"
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div data-aos="fade-up" data-aos-delay="600" className="flex flex-wrap gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href={heroData.cta.primary.href}>
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-7 py-3 rounded-xl gap-2 shadow-lg shadow-indigo-600/30 transition-all duration-300"
                  >
                    <Layers className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    {heroData.cta.primary.label}
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href={heroData.cta.secondary.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-slate-600 bg-slate-800/50 hover:bg-slate-700/60 text-slate-200 font-semibold px-7 py-3 rounded-xl gap-2 backdrop-blur-sm transition-all duration-300"
                  >
                    <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    {heroData.cta.secondary.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Social links */}
            <div data-aos="fade-up" data-aos-delay="700" className="flex items-center gap-4 pt-1">
              <span className="text-slate-600 text-sm">Find me on</span>
              <div className="flex gap-3">
                {heroData.socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mini stats */}
            <div data-aos="fade-up" data-aos-delay="800"
                 className="flex gap-8 pt-4 border-t border-slate-800">
              {heroData.stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                     style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {value}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Image ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">

            {/* Lottie accent (top-right corner) */}
            <div className="absolute -top-6 -right-4 w-24 h-24 opacity-60 pointer-events-none z-20" data-aos="zoom-in" data-aos-delay="900">
              <Lottie animationData={codeLottie} loop />
            </div>

            {/* Decorative rings */}
            <motion.div
              className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-indigo-500/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[290px] h-[290px] md:w-[360px] md:h-[360px] rounded-full border border-purple-500/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbit dot */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50"
              style={{ top: "50%", left: "50%", transformOrigin: "170px 0" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50"
              style={{ top: "50%", left: "50%", transformOrigin: "140px 0" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />

            {/* Image card */}
            <motion.div
              style={{ y: imgY }}
              className="relative z-10"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <animated.div
                ref={imgRef}
                style={{ ...ringSpring, borderRadius: "2rem" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative w-[260px] h-[320px] md:w-[310px] md:h-[390px] overflow-hidden cursor-pointer"
              >
                {/* Gradient overlay on hover */}
                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent flex items-end p-5"
                    >
                      <span className="text-white font-semibold text-sm flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-400" /> {heroData.photoOverlayLabel}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Photo */}
                <img
                  src="/Mostafa_photo.png"
                  alt={heroData.photoAlt}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </animated.div>

              {/* Floating badge: "Open to Work" */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
                className="absolute -bottom-4 -left-6 bg-slate-900 border border-indigo-500/30 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/40 flex items-center gap-2 backdrop-blur-sm"
              >
                <span className="text-lg">{heroData.badges.bottomLeft.emoji}</span>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">{heroData.badges.bottomLeft.title}</p>
                  <p className="text-slate-500 text-[10px]">{heroData.badges.bottomLeft.subtitle}</p>
                </div>
              </motion.div>

              {/* Floating badge: experience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 120 }}
                className="absolute -top-4 -right-6 bg-slate-900 border border-purple-500/30 rounded-2xl px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-sm"
              >
                <p className="text-white text-xs font-semibold">{heroData.badges.topRight.title}</p>
                <p className="text-slate-500 text-[10px]">{heroData.badges.topRight.subtitle}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}