"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

import { personalData } from "@/src/data/personal"; // Adjust path if needed
import BackgroundTheme from "@/components/BackgroundTheme";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // GSAP subtle animation on load
  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        ".footer-element",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative bg-[#05050f] overflow-hidden border-t border-slate-800 pt-20 pb-12">
      
      {/* Same Futuristic Background Theme */}
      <BackgroundTheme />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Bio */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/Mostafa_Logo.png"
                alt="Mostafa Logo"
                className="h-14 w-auto"
              />
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Md. Al Mostafa</h3>
                <p className="text-indigo-400 text-sm font-medium">{personalData.designation}</p>
              </div>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed footer-element">
              {personalData.bio}
            </p>

            <div className="flex items-center gap-2 text-slate-500 text-sm footer-element">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> in Chattogram, Bangladesh
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-lg footer-element">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              {[
                { name: "About Me", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Skills", href: "#skills" },
                { name: "Contact", href: "#contact" },
              ].map((link, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 4 }}
                  className="footer-element"
                >
                  <a 
                    href={link.href} 
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-6 text-lg footer-element">Get In Touch</h4>
            
            <div className="space-y-4 text-slate-400 footer-element">
              <a 
                href={`mailto:${personalData.contact.email}`}
                className="flex items-center gap-3 hover:text-indigo-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  ✉️
                </div>
                <span>{personalData.contact.email}</span>
              </a>

              <a 
                href={`tel:${personalData.contact.phone}`}
                className="flex items-center gap-3 hover:text-purple-400 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-purple-500/10 flex items-center justify-center">
                  📞
                </div>
                <span>{personalData.contact.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center">
                  📍
                </div>
                <span>{personalData.contact.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="text-slate-500 mb-4 text-sm footer-element">Connect with me</p>
              <div className="flex gap-4">
                <motion.a
                  href={personalData.socialLinks.github}
                  target="_blank"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-11 h-11 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                >
                  <FaGithub className="text-2xl" />
                </motion.a>

                <motion.a
                  href={personalData.socialLinks.linkedin}
                  target="_blank"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-11 h-11 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                >
                  <FaLinkedin className="text-2xl" />
                </motion.a>

                {personalData.socialLinks.facebook && (
                  <motion.a
                    href={personalData.socialLinks.facebook}
                    target="_blank"
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="w-11 h-11 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    <FaFacebook className="text-2xl" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <div className="footer-element">
            © {currentYear} Md. Al Mostafa. All rights reserved.
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors footer-element"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </motion.button>

          <div className="text-xs text-slate-600 footer-element">
            Crafted with passion &amp; code
          </div>
        </div>
      </div>
    </footer>
  );
}