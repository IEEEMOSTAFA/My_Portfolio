"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Layers,
  Sparkles,
  ArrowUpRight,
  Code2,
  Globe,
  Star,
} from "lucide-react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyResume from "./MyResume";

export const projects = [
  {
    id: 1,
    title: "EdTech Learning Platform",
    slug: "edtech-learning-platform",
    description:
      "A scalable full-stack learning platform with course management and secure Stripe payments.",
    longDescription:
      "Designed and developed a production-ready EdTech platform enabling users to browse courses, enroll, and access structured learning content. Implemented secure authentication, role-based dashboards (Admin & Student), course management system, and Stripe-powered payments. Focused on scalability, performance, and clean UI/UX.",
    image: "/edtech_platform.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Prisma",
      "Stripe",
      "Tailwind CSS",
    ],
    features: [
      "Secure authentication system (JWT / session-based)",
      "Role-based dashboards (Admin & Student)",
      "Course creation, update & management",
      "Stripe payment gateway integration",
      "Protected routes with middleware",
      "Fully responsive modern UI",
    ],
    liveUrl: "https://edtech-frontend-flax.vercel.app/",
    githubUrl: "#",
    featured: true,
    category: "fullstack",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    accentColor: "#6366F1",
    number: "01",
  },
  {
    id: 2,
    title: "Home Rent Management",
    slug: "home-rent-management-system",
    description:
      "A full-stack rental platform to manage properties, tenants, and rent payments.",
    longDescription:
      "Built a comprehensive home rental management system that allows users to browse properties, manage tenants, and track rent payments efficiently. Includes secure authentication, admin dashboard, and scalable backend architecture designed for real-world usage.",
    image: "/HomeRent.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Prisma",
      "Docker",
    ],
    features: [
      "Authentication and authorization system",
      "Property listing and advanced search",
      "Tenant management dashboard",
      "Rent tracking and payment management",
      "Admin control panel",
      "Responsive and user-friendly UI",
    ],
    liveUrl: "https://edtech-frontend-flax.vercel.app/",
    githubUrl: "#",
    featured: true,
    category: "fullstack",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    accentColor: "#A855F7",
    number: "02",
  },
];

/* ─── Floating Orb ──────────────────────────────────────────── */
const FloatingOrb = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

/* ─── Tech Badge ──────────────────────────────────────────────── */
const TechBadge = ({
  tech,
  index,
}: {
  tech: string;
  index: number;
}) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide
      bg-white/5 border border-white/10 text-indigo-300 hover:bg-indigo-500/20
      hover:border-indigo-500/50 hover:text-indigo-200 transition-all duration-200 cursor-default"
  >
    {tech}
  </motion.span>
);

/* ─── Project Card ───────────────────────────────────────────── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Outer glow on hover */}
      <motion.div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 blur-sm`}
        animate={{ opacity: hovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a1a]/80 backdrop-blur-xl shadow-2xl">
        {/* Top gradient bar */}
        <div
          className={`h-[2px] w-full bg-gradient-to-r ${project.gradient}`}
        />

        <CardContent className="p-0">
          {/* Image / preview area */}
          <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#0d0d2b] to-[#111130]">
            {/* Animated grid lines — always visible as base layer */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99,102,241,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.4) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* ── Actual project screenshot ── */}
            <motion.div
              className="absolute inset-0"
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                onError={(e) => {
                  // hide broken img so fallback icon shows
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>

            {/* Fallback icon — shown when image fails to load */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient}
                  flex items-center justify-center shadow-2xl opacity-30`}
              >
                <Globe className="w-9 h-9 text-white" />
              </motion.div>
            </div>

            {/* Dark overlay so badges stay readable over bright screenshots */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Project number watermark */}
            <span
              className="absolute -right-4 -top-4 text-[120px] font-black leading-none select-none pointer-events-none"
              style={{ color: project.accentColor, opacity: 0.08 }}
            >
              {project.number}
            </span>

            {/* Featured pill */}
            {project.featured && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="gap-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] px-2.5 py-1 font-semibold backdrop-blur-sm">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Featured
                </Badge>
              </div>
            )}

            {/* Category pill */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-black/30 border border-white/10 text-white/70 text-[10px] font-medium capitalize backdrop-blur-sm">
                <Layers className="w-2.5 h-2.5 mr-1" />
                {project.category}
              </Badge>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
          </div>

          {/* Content */}
          <div className="px-6 pt-5 pb-6 space-y-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                {project.title}
              </h3>
              <span
                className="text-2xl font-black tabular-nums shrink-0 mt-0.5"
                style={{ color: project.accentColor, opacity: 0.3 }}
              >
                {project.number}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.slice(0, 5).map((t, i) => (
                <TechBadge key={t} tech={t} index={i} />
              ))}
              {project.technologies.length > 5 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold text-white/30 bg-white/5 border border-white/10">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Actions */}
            <div className="flex items-center gap-3 pt-0.5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="sm"
                  className={`w-full gap-2 bg-gradient-to-r ${project.gradient} text-white
                    hover:opacity-90 active:scale-95 transition-all shadow-lg font-semibold text-xs`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Live Demo
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-70" />
                </Button>
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 border-white/10 bg-white/5 text-white/60 hover:text-white
                    hover:bg-white/10 hover:border-white/20 transition-all text-xs"
                >
                  <FiGithub className="w-3.5 h-3.5" />
                  Code
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ─── Section Header ─────────────────────────────────────────── */
const SectionHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center space-y-4 mb-20"
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-widest uppercase"
      >
        <Sparkles className="w-3 h-3" />
        Selected Work
        <Sparkles className="w-3 h-3" />
      </motion.div>

      {/* Headline */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
        <span className="text-white">Featured </span>
        <span
          className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent"
        >
          Projects
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed">
        Production-ready applications built with modern technologies, focused on
        performance, scalability, and exceptional UX.
      </p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center justify-center gap-8 pt-4"
      >
        {[
          { label: "Projects", value: "2+" },
          { label: "Technologies", value: "10+" },
          { label: "Category", value: "Full Stack" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-black text-white">{stat.value}</p>
            <p className="text-xs text-white/30 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Section ───────────────────────────────────────────── */
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-4 overflow-hidden"
      style={{ background: "#05050f" }}
    >
      {/* Background orbs */}
      <FloatingOrb
        className="w-96 h-96 bg-indigo-600 -top-32 -left-32"
        delay={0}
      />
      <FloatingOrb
        className="w-80 h-80 bg-purple-600 top-1/2 -right-20"
        delay={3}
      />
      <FloatingOrb
        className="w-64 h-64 bg-pink-600 bottom-20 left-1/4"
        delay={1.5}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader />

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <p className="text-white/30 text-sm">Want to see more?</p>
          <a
            href="https://github.com/IEEEMOSTAFA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="gap-2 border-white/10 bg-white/5 text-white/60 hover:text-white
                hover:bg-white/10 hover:border-indigo-500/40 transition-all px-6"
            >
              <Code2 className="w-4 h-4" />
              View All on GitHub
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>

    
  );
}