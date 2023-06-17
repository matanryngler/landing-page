import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin, ArrowUpRight, Copy, Check, Terminal, Shield, Coffee } from 'lucide-react';
import { Block } from './Block';
import { cn } from '../lib/utils';

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TECH = ['AI Agents', 'Claude Code', 'MCP', 'Kubernetes', 'Python', 'Go', 'Terraform', 'AWS', 'EKS', 'ArgoCD'];

const sectionStagger = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        }
    }
};

const SectionLabel = ({ children }: { children: string }) => (
    <div className="flex items-center gap-3 mt-6 mb-1">
        <span className="text-[10px] font-mono text-stone-600 uppercase tracking-[0.2em]">{children}</span>
        <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
);

const BentoGrid: React.FC = () => {
    return (
        <div className="flex flex-col gap-3">
            {/* Top section -- intro, location, socials, ticker */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[140px] md:auto-rows-[180px]"
                initial="initial"
                animate="animate"
                variants={{
                    initial: { opacity: 0 },
                    animate: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.15,
                        }
                    }
                }}
            >

                {/* 1. Intro Block (2x2) */}
                <Block className="col-span-1 md:col-span-2 row-span-2 !p-0">
                    <div className="w-full h-full flex flex-col justify-end p-8 sm:p-10 relative group">
                        {/* Decorative gradient orb */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-copper-400/[0.04] rounded-full blur-[80px]" />

                        {/* Subtle grid pattern for visual interest in empty space */}
                        <div className="absolute inset-0 opacity-[0.03]"
                             style={{
                                 backgroundImage: 'radial-gradient(circle, rgba(212,149,106,0.4) 1px, transparent 1px)',
                                 backgroundSize: '24px 24px',
                                 maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 60%)',
                                 WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 60%)',
                             }}
                        />

                        <div className="absolute top-8 left-8 sm:top-10 sm:left-10 flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-copper-400"></span>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper-400 opacity-30"></span>
                            </span>
                            <span className="text-[11px] font-mono font-medium text-copper-400/70 tracking-wider uppercase">Platform Engineering & AI</span>
                        </div>

                        {/* Profile photo -- larger and more prominent */}
                        <img
                            src={`${import.meta.env.BASE_URL}profile.jpg`}
                            alt="Profile"
                            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-white/[0.06] grayscale group-hover:grayscale-0 transition-all duration-700 object-cover shadow-lg shadow-black/20"
                        />

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display italic text-stone-100 mb-3 tracking-tight leading-[1.05]">
                            Matan Ryngler
                        </h1>
                        <p className="text-base text-stone-500 max-w-md leading-relaxed">
                            Head of Platform at <span className="text-stone-300">Legit Security</span>. <br className="hidden sm:block" />
                            Leading at the intersection of platform engineering and AI.
                        </p>
                    </div>
                </Block>

                {/* 2. Location */}
                <Block className="col-span-1 row-span-1">
                    <div className="flex flex-col h-full justify-between">
                        <MapPin className="text-stone-600 w-5 h-5" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-2xl font-display italic text-stone-200">Tel Aviv</h3>
                            <p className="text-stone-600 text-xs font-mono mt-0.5">32.0853&deg;N, 34.7818&deg;E</p>
                        </div>
                    </div>
                    <div className="absolute right-[-30px] top-[-30px] w-36 h-36 border border-white/[0.03] rounded-full" />
                    <div className="absolute right-[-50px] top-[-50px] w-56 h-56 border border-white/[0.02] rounded-full" />
                </Block>

                {/* 3. Socials */}
                <Block className="col-span-1 row-span-1">
                    <div className="flex flex-col h-full justify-between">
                        <span className="text-stone-600 text-[10px] font-mono uppercase tracking-[0.2em]">Connect</span>
                        <div className="flex gap-3">
                            <a href="https://github.com/matanryngler/" target="_blank" rel="noopener noreferrer"
                               className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white hover:text-stone-900 text-stone-500 transition-all duration-300">
                                <Github className="w-4 h-4" strokeWidth={1.5} />
                            </a>
                            <a href="https://www.linkedin.com/in/matanryngler/" target="_blank" rel="noopener noreferrer"
                               className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:text-white text-stone-500 transition-all duration-300">
                                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                            </a>
                            <a href="https://x.com/matanryngler" target="_blank" rel="noopener noreferrer"
                               className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white hover:text-stone-900 text-stone-500 transition-all duration-300">
                                <XIcon className="w-4 h-4" />
                            </a>
                            <a href="https://buymeacoffee.com/matanryngler" target="_blank" rel="noopener noreferrer"
                               className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-amber-500 hover:border-amber-500 hover:text-white text-stone-500 transition-all duration-300">
                                <Coffee className="w-4 h-4" strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>
                </Block>

                {/* 4. Tech Ticker (full width) */}
                <Block className="col-span-1 md:col-span-3 row-span-1 overflow-hidden !p-0 !block">
                    <div className="h-full flex items-center relative">
                        {/* Fade edges match glass-card bg instead of surface */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[rgba(12,10,9,0.97)] to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[rgba(12,10,9,0.97)] to-transparent z-10" />

                        <div className="flex animate-scroll whitespace-nowrap gap-12 px-8 w-max">
                            {[...TECH, ...TECH].map((tech, i) => (
                                <span key={i} className="text-lg font-mono font-medium text-stone-700 hover:text-copper-400 transition-colors duration-300 cursor-default select-none">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </Block>
            </motion.div>

            {/* Projects label */}
            <SectionLabel>Projects</SectionLabel>

            {/* Projects section */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-[180px]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionStagger}
            >
                {/* 5. DeployShield */}
                <Block className="col-span-1 row-span-1 md:row-span-2 group" whileHover={{ y: -3, transition: { duration: 0.3 } }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-copper-400/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-copper-400/10 text-copper-400 border border-copper-400/20 rounded-lg mb-5">
                                <Shield className="w-3 h-3" /> Claude Code Plugin
                            </span>
                            <h3 className="text-2xl font-display italic text-stone-100 mb-2">DeployShield</h3>
                            <p className="text-stone-500 text-xs leading-relaxed">
                                Production safety guardrails for AI coding agents. Blocks write and mutating operations on cloud, database, IaC, and deployment CLIs.
                            </p>
                        </div>
                        <a href="https://github.com/matanryngler/deployshield" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-900 rounded-xl text-sm font-semibold hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/5 w-fit">
                            View Project <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </Block>

                {/* 6. Parallax */}
                <Block className="col-span-1 row-span-1 md:row-span-2 group" whileHover={{ y: -3, transition: { duration: 0.3 } }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-copper-400/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-copper-400/10 text-copper-400 border border-copper-400/20 rounded-lg mb-5">
                                <Terminal className="w-3 h-3" /> K8s Operator
                            </span>
                            <h3 className="text-2xl font-display italic text-stone-100 mb-2">Parallax</h3>
                            <p className="text-stone-500 text-xs leading-relaxed">
                                Dynamic, list-driven parallel execution of Jobs and CronJobs. Abstracts away the complexity of sharding workloads over a list of inputs.
                            </p>
                        </div>
                        <a href="https://github.com/matanryngler/parallax" target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-900 rounded-xl text-sm font-semibold hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/5 w-fit">
                            View Project <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </Block>
            </motion.div>

            {/* Experience label */}
            <SectionLabel>Experience</SectionLabel>

            {/* Experience + Contact section */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[180px]"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionStagger}
            >
                {/* 7. Legit Security */}
                <Block className="col-span-1 md:col-span-2 row-span-1 overflow-hidden group">
                    <div className="absolute -bottom-6 -right-6 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-700 rotate-12">
                        <img src={`${import.meta.env.BASE_URL}legit.png`} alt="" className="w-40 h-40 object-contain grayscale" />
                    </div>

                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-stone-200 font-medium text-base">Legit Security</h4>
                                <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-copper-400/10 text-copper-400 border border-copper-400/20">Current</span>
                            </div>
                            <span className="text-xs text-copper-300/60 font-mono block mb-3">Head of Platform</span>
                            <p className="text-stone-500 text-xs leading-relaxed border-l border-copper-400/20 pl-3">
                                Leading AI agent infrastructure and platform engineering. Cloud strategy, EKS, FinOps, and core ASPM delivery.
                            </p>
                        </div>
                        <a href="https://www.linkedin.com/in/matanryngler/" target="_blank" rel="noopener noreferrer"
                           className="text-[10px] font-mono text-stone-600 hover:text-copper-400 flex items-center gap-1 transition-colors duration-300 mt-2">
                            Full Experience <ArrowUpRight className="w-2.5 h-2.5" />
                        </a>
                    </div>
                </Block>

                {/* 8. Contact */}
                <EmailBlock />
            </motion.div>
        </div>
    );
};

const EmailBlock: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const email = "matanryngler@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Block className="col-span-1 row-span-1 cursor-pointer" whileHover={{ scale: 0.98 }}>
            <div className="h-full flex flex-col justify-center items-center text-center gap-3" onClick={handleCopy}>
                <div className={cn(
                    "p-3 rounded-2xl transition-all duration-500",
                    copied
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-white/[0.03] text-stone-500 border border-white/[0.06]"
                )}>
                    {copied ? <Check className="w-5 h-5" /> : <Mail className="w-5 h-5" strokeWidth={1.5} />}
                </div>
                <div>
                    <p className="text-[10px] font-mono text-stone-600 uppercase tracking-[0.2em] mb-1">Get in touch</p>
                    <p className="text-stone-200 font-medium text-sm">{email}</p>
                </div>
                <span className="text-[10px] font-mono text-stone-700 flex items-center gap-1.5">
                    {copied ? "Copied!" : <><Copy className="w-3 h-3" /> Click to copy</>}
                </span>
            </div>
        </Block>
    );
};

export default BentoGrid;
