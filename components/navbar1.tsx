







"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Home", href: "/", isPage: false },
  { title: "About Me", href: "/About", isPage: true },
  { title: "Projects", href: "/projects", isPage: true },
  { title: "Contact", href: "/Contact", isPage: true },
];

interface Navbar1Props {
  className?: string;
}

export function Navbar1({ className }: Navbar1Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === "/") {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("fixed top-0 left-0 right-0 z-50", className)}
      >
        {/* Glass pill container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <motion.div
            animate={
              scrolled
                ? { backdropFilter: "blur(20px)", boxShadow: "0 1px 40px rgba(0,0,0,0.08)" }
                : { backdropFilter: "blur(0px)", boxShadow: "none" }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "flex items-center justify-between h-14 lg:h-16 px-4 lg:px-6 rounded-2xl transition-colors duration-300",
              scrolled
                ? "bg-background/80 border border-border/40"
                : "bg-transparent border border-transparent"
            )}
          >
            {/* ── Logo ── */}
            <motion.a
              href="/"
              onClick={scrollToHome}
              className="flex items-center gap-2.5 group shrink-0"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Go to home"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-400/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <img
                  src="/Mostafa_Logo.png"
                  alt="Mostafa Logo"
                  className="h-14 w-14 rounded-full object-cover"
                />
              </div>
              <span className="hidden sm:block font-semibold text-sm tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                Mostafa
              </span>
            </motion.a>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {navItems.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  >
                    {item.isPage ? (
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          scrollToSection(item.href.substring(1).toLowerCase());
                        }}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 flex items-center",
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-xl bg-muted"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <AnimatePresence>
                          {active && (
                            <motion.span
                              key="dot"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                            />
                          )}
                        </AnimatePresence>
                        <span className="relative z-10">{item.title}</span>
                      </Link>
                    ) : (
                      <Link
                        href="/"
                        onClick={scrollToHome}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 flex items-center",
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-xl bg-muted"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{item.title}</span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">

              {/* Let's Chat CTA — desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
              >
                <Link
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold",
                    "bg-amber-500 hover:bg-amber-400 text-white",
                    "shadow-md shadow-amber-500/20 hover:shadow-amber-400/30",
                    "transition-colors duration-200"
                  )}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90" />
                  </span>
                  Let's Chat
                </Link>
              </motion.div>

              {/* ── Theme Toggle ── */}
              <motion.button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  "border border-border/60 bg-background/50",
                  "hover:bg-muted hover:border-border transition-colors duration-200"
                )}
              >
                {mounted ? (
                  <AnimatePresence mode="wait" initial={false}>
                    {resolvedTheme === "dark" ? (
                      <motion.span
                        key="sun"
                        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        <Moon className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                ) : (
                  <span className="w-4 h-4" />
                )}
              </motion.button>

              {/* ── Mobile Hamburger ── */}
              <motion.button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={cn(
                  "lg:hidden w-10 h-10 rounded-xl flex items-center justify-center",
                  "border border-border/60 bg-background/50",
                  "hover:bg-muted hover:border-border transition-colors duration-200"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex"
                    >
                      <X className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex"
                    >
                      <Menu className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 pt-2">
                <motion.nav
                  className="bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl p-3 flex flex-col gap-1"
                  initial={{ y: -8 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.25 }}
                  aria-label="Mobile navigation"
                >
                  {[...navItems, { title: "Let's Chat", href: "/contact", isPage: true }].map(
                    (item, i) => {
                      const active = isActive(item.href);
                      const isContact = item.title === "Let's Chat";

                      return (
                        <motion.div
                          key={item.href + item.title}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {item.isPage ? (
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                                isContact
                                  ? "bg-amber-500 text-white hover:bg-amber-400 mt-1"
                                  : active
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {active && !isContact && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              )}
                              {isContact && (
                                <span className="relative flex h-2 w-2 shrink-0">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90" />
                                </span>
                              )}
                              {item.title}
                            </Link>
                          ) : (
                            <a
                              href="/"
                              onClick={scrollToHome}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200",
                                active
                                  ? "bg-muted text-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {active && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              )}
                              {item.title}
                            </a>
                          )}
                        </motion.div>
                      );
                    }
                  )}
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Layout spacer */}
      <div className="h-[72px] lg:h-[80px]" />
    </>
  );
}

export default Navbar1;












