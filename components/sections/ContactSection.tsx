"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, User } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import Lottie from "lottie-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

// import BackgroundTheme from "@/components/BackgroundTheme"; // ← Import the reusable background
import { personalData } from "@/src/data/personal"; // Adjust path as needed
import BackgroundTheme from "../BackgroundTheme";

// Simple contact animation Lottie (you can replace with better one later)
const contactLottie = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "Contact",
  layers: [
    {
      ty: 4,
      nm: "envelope",
      sr: 1,
      ks: { p: { a: 0, k: [100, 100] }, o: { a: 1, k: 100 } },
      shapes: [{
        ty: "gr",
        it: [
          { ty: "rc", s: { a: 0, k: [80, 60] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 8 } },
          { ty: "fl", c: { a: 0, k: [0.4, 0.6, 1, 1] } }
        ]
      }]
    }
  ]
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:${personalData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    // Reset form after opening email client
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // GSAP animation for form elements
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        ".form-element",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-[#05050f]">
      
      {/* Exact Same Background Theme as Hero */}
      <BackgroundTheme />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                Let's Build <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Something Great</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-md">
                I'm always excited to connect with fellow developers, companies, and opportunities.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <a href={`mailto:${personalData.contact.email}`} className="text-white hover:text-indigo-400 transition-colors">
                    {personalData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <a href={`tel:${personalData.contact.phone}`} className="text-white hover:text-purple-400 transition-colors">
                    {personalData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Location</p>
                  <p className="text-white">{personalData.contact.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-slate-500 mb-4">Find me on</p>
              <div className="flex gap-4">
                <a href={personalData.socialLinks.github} target="_blank" className="text-3xl text-slate-400 hover:text-white transition-colors">
                  <FaGithub />
                </a>
                <a href={personalData.socialLinks.linkedin} target="_blank" className="text-3xl text-slate-400 hover:text-white transition-colors">
                  <FaLinkedin />
                </a>
                {personalData.socialLinks.facebook && (
                  <a href={personalData.socialLinks.facebook} target="_blank" className="text-3xl text-slate-400 hover:text-white transition-colors">
                    <FaFacebook />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/70 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>
                  <p className="text-slate-400 mt-1">{personalData.availability}</p>
                </div>
                <div className="w-16 h-16 opacity-70">
                  <Lottie animationData={contactLottie} loop />
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element">
                  <label className="text-sm text-slate-400 mb-2 block">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-11 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="Md. Al Mostafa"
                    />
                  </div>
                </div>

                <div className="form-element">
                  <label className="text-sm text-slate-400 mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-11 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-element">
                  <label className="text-sm text-slate-400 mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-3xl p-5 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-y min-h-[140px] transition-colors"
                    placeholder="Hi Mostafa, I'd like to discuss a project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    "Opening Email Client..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
