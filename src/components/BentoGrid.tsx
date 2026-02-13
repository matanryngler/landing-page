import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Coffee, Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TECH = ['AI Agents', 'Claude Code', 'MCP', 'Kubernetes', 'Python', 'Go', 'Terraform', 'AWS', 'EKS', 'ArgoCD'];

/* ── Typing hook ── */
const useTyping = (text: string, speed = 60, delay = 600) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        let i = 0;
        let interval: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            interval = setInterval(() => {
                i++;
                if (i <= text.length) {
                    setDisplayed(text.slice(0, i));
                } else {
                    setDone(true);
                    clearInterval(interval);
                }
            }, speed);
        }, delay);
        return () => { clearTimeout(timer); if (interval) clearInterval(interval); };
    }, [text, speed, delay]);

    return { displayed, done };
};

/* ── Prompt ── */
const Prompt = () => <span className="text-term-green font-semibold select-none shrink-0">$</span>;

/* ── Command line with optional cursor ── */
const CmdLine = ({ text, typing }: { text: string; typing: boolean }) => (
    <div className="flex items-center gap-2 text-sm mb-6">
        <Prompt />
        <span className="text-term-text">{text}</span>
        {typing && <span className="animate-blink text-term-green">▌</span>}
    </div>
);

/* ── Fade wrapper — only mounts when show=true so it doesn't reserve space ── */
const Fade = ({ show, children, className }: { show: boolean; children: React.ReactNode; className?: string }) => {
    if (!show) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ── Main ── */
const BentoGrid: React.FC = () => {
    // Cascading delays: each starts after prev finishes + 500ms content gap
    // whoami: 6×70=420ms, ls: 14×50=700ms, cat exp: 17×50=850ms, cat links: 13×50=650ms
    const t1 = useTyping('whoami', 70, 500);           // done ~920
    const t2 = useTyping('ls ~/projects/', 50, 1420);   // done ~2120
    const t3 = useTyping('cat experience.md', 50, 2620);// done ~3470
    const t4 = useTyping('cat links.txt', 50, 3970);    // done ~4620

    const [showCursor, setShowCursor] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setShowCursor(true), 5100);
        return () => clearTimeout(id);
    }, []);

    // Auto-scroll as new sections appear
    const endRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [t1.done, t2.displayed, t2.done, t3.displayed, t3.done, t4.displayed, t4.done, showCursor]);

    return (
        <div className="space-y-8">

            {/* ── whoami ── */}
            {t1.displayed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CmdLine text={t1.displayed} typing={!t1.done} />
                    <Fade show={t1.done}>
                        <div className="space-y-5">
                            <div className="flex items-start gap-5 sm:gap-6">
                                <img
                                    src={`${import.meta.env.BASE_URL}profile.jpg`}
                                    alt="Matan Ryngler"
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-term-border object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="min-w-0">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Matan Ryngler</h1>
                                    <p className="text-term-amber text-sm mt-1">Head of Platform · Legit Security</p>
                                    <p className="text-term-muted text-xs mt-1">Tel Aviv, Israel</p>
                                </div>
                            </div>
                            <p className="text-sm text-term-text leading-relaxed font-sans max-w-lg">
                                Platform engineering leader at the intersection of infrastructure and AI. Building the foundation that AI agents run on.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TECH.map((t) => (
                                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-term-border/60 text-term-muted hover:text-term-green hover:bg-term-green/10 transition-colors cursor-default">{t}</span>
                                ))}
                            </div>
                        </div>
                    </Fade>
                </motion.div>
            )}

            {/* ── ls projects ── */}
            {t2.displayed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
                    <CmdLine text={t2.displayed} typing={!t2.done} />
                    <Fade show={t2.done}>
                        <div className="space-y-4">
                            <ProjectEntry name="deployshield" tag="Claude Code Plugin" tagColor="amber"
                                description="Production safety guardrails for AI coding agents. Blocks write and mutating operations on cloud, database, IaC, and deployment CLIs."
                                url="https://github.com/matanryngler/deployshield" />
                            <ProjectEntry name="parallax" tag="K8s Operator" tagColor="cyan"
                                description="Dynamic, list-driven parallel execution of Jobs and CronJobs. Abstracts away the complexity of sharding workloads over a list of inputs."
                                url="https://github.com/matanryngler/parallax" />
                        </div>
                    </Fade>
                </motion.div>
            )}

            {/* ── cat experience ── */}
            {t3.displayed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
                    <CmdLine text={t3.displayed} typing={!t3.done} />
                    <Fade show={t3.done}>
                        <div className="border border-term-border rounded-lg p-5 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-white font-semibold text-sm">Legit Security</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-term-green/10 text-term-green border border-term-green/20 uppercase tracking-wider">Current</span>
                            </div>
                            <span className="text-term-amber text-xs block">Head of Platform</span>
                            <p className="text-sm text-term-muted font-sans leading-relaxed border-l-2 border-term-dim pl-3">
                                Leading AI agent infrastructure and platform engineering. Cloud strategy, EKS, FinOps, and core ASPM value delivery.
                            </p>
                            <a href="https://www.linkedin.com/in/matanryngler/" target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-1 text-xs text-term-blue hover:underline">
                                Full experience <ArrowUpRight className="w-3 h-3" />
                            </a>
                        </div>
                    </Fade>
                </motion.div>
            )}

            {/* ── cat links ── */}
            {t4.displayed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
                    <CmdLine text={t4.displayed} typing={!t4.done} />
                    <Fade show={t4.done}>
                        <div>
                            <div className="flex flex-wrap gap-3 mb-5">
                                <SocialLink href="https://github.com/matanryngler/" icon={<Github className="w-4 h-4" />} label="github" />
                                <SocialLink href="https://www.linkedin.com/in/matanryngler/" icon={<Linkedin className="w-4 h-4" />} label="linkedin" />
                                <SocialLink href="https://x.com/matanryngler" icon={<XIcon className="w-4 h-4" />} label="x.com" />
                                <SocialLink href="https://buymeacoffee.com/matanryngler" icon={<Coffee className="w-4 h-4" />} label="coffee" />
                            </div>
                            <EmailLine />
                        </div>
                    </Fade>
                </motion.div>
            )}

            {/* ── Blinking cursor ── */}
            {showCursor && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm pt-4">
                    <Prompt />
                    <span className="animate-blink text-term-green">▌</span>
                </motion.div>
            )}

            <div ref={endRef} />
        </div>
    );
};

/* ── Project entry ── */
const ProjectEntry = ({ name, tag, tagColor, description, url }: {
    name: string; tag: string; tagColor: 'amber' | 'cyan'; description: string; url: string;
}) => {
    const colors = {
        amber: 'text-term-amber bg-term-amber/10 border-term-amber/20',
        cyan: 'text-term-cyan bg-term-cyan/10 border-term-cyan/20',
    };
    return (
        <div className="border border-term-border rounded-lg p-5 hover:border-term-dim transition-colors">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-term-blue text-sm font-semibold">{name}/</span>
                <span className={cn("text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider", colors[tagColor])}>{tag}</span>
            </div>
            <p className="text-sm text-term-muted font-sans leading-relaxed mb-4">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 text-xs text-term-text hover:text-term-green transition-colors">
                <span className="text-term-dim">→</span> View on GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
        </div>
    );
};

/* ── Social link ── */
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-2 px-3 py-2 rounded-lg border border-term-border text-term-muted hover:text-term-green hover:border-term-green/30 transition-all text-xs">
        {icon}<span>{label}</span>
    </a>
);

/* ── Email ── */
const EmailLine = () => {
    const [copied, setCopied] = useState(false);
    const email = 'matanryngler@gmail.com';
    const handleCopy = () => { navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
    return (
        <button onClick={handleCopy} className="flex items-center gap-2 text-xs text-term-muted hover:text-term-green transition-colors group">
            <Mail className="w-4 h-4" />
            <span className="text-term-text group-hover:text-term-green transition-colors">{email}</span>
            {copied ? <span className="flex items-center gap-1 text-term-green"><Check className="w-3 h-3" /> copied!</span>
                    : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>
    );
};

export default BentoGrid;
