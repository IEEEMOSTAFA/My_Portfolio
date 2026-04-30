'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Server, 
  Sparkles, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { personalData } from '@/src/data/personal';
import { skillsData } from '@/src/data/skills';
import { educationData } from '@/src/data/education';
// import { experienceData } from '@/data/experience';
import { experienceData } from '@/src/data/experience';

const AboutSection = () => {
  const highlightText = "Backend Developer & aspiring Full-Stack Engineer";

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#05050f]">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(99,102,241,0.15)_0px,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(at_70%_60%,rgba(168,85,247,0.15)_0px,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/50 mb-6"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-indigo-300">About Me</span>
          </motion.div>

          {/* <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{personalData.name.split(' ').pop()}</span>
          </h2> */}

          <p className="text-2xl text-slate-300 max-w-3xl">
            {highlightText}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Bio Card - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-indigo-950/50 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-white">My Story</h3>
                  <p className="text-slate-400">4th Year EEE Student turned Backend Developer</p>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-slate-300">
                <p>
                  {personalData.bio}
                </p>
                <p>
                  Currently in my final year of <span className="text-indigo-400 font-medium">B.Sc. in Electrical and Electronic Engineering</span> at University of Chittagong, I&apos;ve discovered my true passion lies in building robust, scalable backend systems and modern web applications.
                </p>
                <p>
                  With hands-on experience in Node.js ecosystems, databases, and payment integrations, I love turning complex problems into clean, efficient solutions.
                </p>
              </div>

              <div className="flex gap-4 mt-10">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Projects
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/5 text-white"
                  onClick={() => window.open(`mailto:${personalData.contact.email}`)}
                >
                  Get In Touch
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Side - Skills + Quick Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                  <h4 className="text-xl font-semibold text-white">Education</h4>
                </div>
                <div className="space-y-5">
                  {educationData.slice(0, 3).map((edu, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-2xl text-slate-500 mt-1">•</div>
                      <div>
                        <p className="font-medium text-white">{edu.degree}</p>
                        <p className="text-sm text-slate-400">{edu.institution}</p>
                        <p className="text-xs text-emerald-400 mt-1">{edu.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-6 h-6 text-pink-400" />
                  <h4 className="text-xl font-semibold text-white">Experience</h4>
                </div>
                {experienceData.map((exp, i) => (
                  <div key={i} className="border-l-2 border-purple-500 pl-6">
                    <p className="font-semibold text-white">{exp.position}</p>
                    <p className="text-purple-400 text-sm">{exp.company}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {exp.startDate} — {exp.endDate}
                    </p>
                  </div>
                ))}
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-4xl font-bold text-white">Skills & Technologies</h3>
              <p className="text-slate-400 mt-2">Tools I work with daily</p>
            </div>
            <Badge variant="secondary" className="bg-indigo-950 text-indigo-300 border-indigo-500/30 px-4 py-1">
              Always Learning
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-white">Frontend</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillsData.frontend.map((skill, index) => (
                  <Badge 
                    key={index}
                    className="bg-white/10 hover:bg-indigo-500/20 text-slate-200 border border-white/10 hover:border-indigo-400 transition-all px-5 py-2 text-sm"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Backend */}
            <Card className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-semibold text-white">Backend & Tools</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillsData.backend.map((skill, index) => (
                  <Badge 
                    key={index}
                    className="bg-white/10 hover:bg-purple-500/20 text-slate-200 border border-white/10 hover:border-purple-400 transition-all px-5 py-2 text-sm"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;