import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const TECH = ['AI Agents', 'Claude Code', 'MCP', 'Kubernetes', 'Python', 'Go', 'Terraform', 'AWS', 'EKS', 'ArgoCD'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

/* ── Command definitions with typo variants ── */
const COMMANDS = [
    { correct: 'whoami', typo: 'whomai', typoStart: 3, speed: 90 },
    { correct: 'ls ~/projects/', typo: 'ls ~/projcets/', typoStart: 9, speed: 65 },
    { correct: 'cat experience.md', typo: 'cat experience.dm', typoStart: 15, speed: 65 },
    { correct: 'cat links.txt', typo: 'cat links.tct', typoStart: 11, speed: 65 },
];

const cmdDuration = (cmd: typeof COMMANDS[number], hasTypo: boolean) => {
    if (!hasTypo) return cmd.correct.length * cmd.speed;
    const bs = Math.round(cmd.speed * 0.4);
    return cmd.typo.length * cmd.speed + 500
        + (cmd.typo.length - cmd.typoStart) * bs + 250
        + (cmd.correct.length - cmd.typoStart) * cmd.speed;
};

/* ── Unified typing hook — handles both normal and typo typing ── */
const useSmartTyping = (correct: string, typo: string | null, typoStart: number, speed: number, delay: number) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        const frames: { text: string; wait: number }[] = [];

        if (typo) {
            for (let i = 1; i <= typo.length; i++)
                frames.push({ text: typo.slice(0, i), wait: speed });
            frames.push({ text: typo, wait: 500 });
            for (let i = typo.length - 1; i >= typoStart; i--)
                frames.push({ text: typo.slice(0, i), wait: Math.round(speed * 0.4) });
            frames.push({ text: correct.slice(0, typoStart), wait: 250 });
            for (let i = typoStart + 1; i <= correct.length; i++)
                frames.push({ text: correct.slice(0, i), wait: speed });
        } else {
            for (let i = 1; i <= correct.length; i++)
                frames.push({ text: correct.slice(0, i), wait: speed });
        }

        let idx = 0;
        let timeout: ReturnType<typeof setTimeout>;

        const next = () => {
            if (!mounted.current) return;
            if (idx >= frames.length) { setDone(true); return; }
            const f = frames[idx];
            setDisplayed(f.text);
            idx++;
            timeout = setTimeout(next, f.wait);
        };

        timeout = setTimeout(next, delay);
        return () => { mounted.current = false; clearTimeout(timeout); };
    }, [correct, typo, typoStart, speed, delay]);

    return { displayed, done };
};

/* ── Scramble text effect ── */
const useScramble = (text: string, trigger: boolean, speed = 40, iterations = 3) => {
    const [displayed, setDisplayed] = useState(text.replace(/\S/g, ' '));
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        let frame = 0;
        const totalFrames = text.length * iterations;
        let raf: ReturnType<typeof setInterval>;

        raf = setInterval(() => {
            frame++;
            const resolved = Math.floor(frame / iterations);
            const result = text
                .split('')
                .map((char, i) => {
                    if (char === ' ') return ' ';
                    if (i < resolved) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

            setDisplayed(result);

            if (frame >= totalFrames) {
                setDisplayed(text);
                setDone(true);
                clearInterval(raf);
            }
        }, speed);

        return () => clearInterval(raf);
    }, [trigger, text, speed, iterations]);

    return { displayed, done };
};

/* ── Live clock ── */
const useTelAvivTime = () => {
    const [time, setTime] = useState('');
    useEffect(() => {
        const tick = () => {
            setTime(new Date().toLocaleTimeString('en-GB', {
                timeZone: 'Asia/Jerusalem',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
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
const Terminal: React.FC = () => {
    // Randomly decide which commands get typos (stable per mount)
    const typoFlags = useRef<boolean[] | null>(null);
    if (typoFlags.current === null) {
        typoFlags.current = COMMANDS.map(() => Math.random() < 0.25);
    }
    const flags = typoFlags.current;

    // Compute cascading delays dynamically (typo commands take longer)
    const GAP = 600;
    const delays = [500];
    for (let i = 1; i < COMMANDS.length; i++) {
        delays.push(delays[i - 1] + cmdDuration(COMMANDS[i - 1], flags[i - 1]) + GAP);
    }
    const totalEnd = delays[3] + cmdDuration(COMMANDS[3], flags[3]);

    const t1 = useSmartTyping(COMMANDS[0].correct, flags[0] ? COMMANDS[0].typo : null, COMMANDS[0].typoStart, COMMANDS[0].speed, delays[0]);
    const t2 = useSmartTyping(COMMANDS[1].correct, flags[1] ? COMMANDS[1].typo : null, COMMANDS[1].typoStart, COMMANDS[1].speed, delays[1]);
    const t3 = useSmartTyping(COMMANDS[2].correct, flags[2] ? COMMANDS[2].typo : null, COMMANDS[2].typoStart, COMMANDS[2].speed, delays[2]);
    const t4 = useSmartTyping(COMMANDS[3].correct, flags[3] ? COMMANDS[3].typo : null, COMMANDS[3].typoStart, COMMANDS[3].speed, delays[3]);

    const nameScramble = useScramble('Matan Ryngler', t1.done, 35, 4);
    const telAvivTime = useTelAvivTime();

    const [showCursor, setShowCursor] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => setShowCursor(true), totalEnd + 400);
        return () => clearTimeout(id);
    }, [totalEnd]);

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
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                        {nameScramble.displayed}
                                    </h1>
                                    <p className="text-term-amber text-sm mt-1">Head of Platform · Legit Security</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-term-muted text-xs">Tel Aviv, Israel</span>
                                        <span className="text-term-dim text-xs">·</span>
                                        <span className="text-term-dim text-xs tabular-nums">{telAvivTime}</span>
                                    </div>
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CmdLine text={t4.displayed} typing={!t4.done} />
                    <Fade show={t4.done}>
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
                                <InlineLink href="https://github.com/matanryngler/" label="github" />
                                <span className="text-term-dim">/</span>
                                <InlineLink href="https://www.linkedin.com/in/matanryngler/" label="linkedin" />
                                <span className="text-term-dim">/</span>
                                <InlineLink href="https://x.com/matanryngler" label="x.com" />
                                <span className="text-term-dim">/</span>
                                <InlineLink href="https://buymeacoffee.com/matanryngler" label="buy me a coffee" />
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

/* ── Inline text link ── */
const InlineLink = ({ href, label }: { href: string; label: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className="text-term-muted hover:text-term-green transition-colors">
        {label}
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

export default Terminal;
