import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Countdown } from './Countdown';
import { ChromeButton } from '../ui/ChromeButton';
import { useState, useEffect, useRef } from 'react';

interface EventSectionProps {
    onRegister: () => void;
}

const QUOTES = [
    "The future belongs to those who build it.",
    "Innovation is the bridge between dreams and reality.",
    "Beyond the horizon of code lies pure creation.",
    "Where logic meets imagination, art is born.",
    "Redefine the possible, one byte at a time."
];

function QuoteRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % QUOTES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xs md:text-sm text-white/40 italic font-light tracking-[0.2em] uppercase"
                >
                    "{QUOTES[index]}"
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

export function EventSection({ onRegister }: EventSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const prizeScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1.1, 0.8]);
    const prizeRotate = useTransform(scrollYProgress, [0.2, 0.8], [-2, 2]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="min-h-screen relative flex items-center justify-center py-32 px-6 overflow-hidden"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl w-full text-center z-10"
            >
                {/* 1. Main Heading */}
                <div className="mb-4">
                    <motion.span
                        variants={itemVariants}
                        className="block text-xs md:text-sm uppercase tracking-[1em] text-white/30 font-medium translate-x-[0.5em] mb-4"
                    >
                        Presented by SAIT
                    </motion.span>
                    <motion.h2
                        variants={itemVariants}
                        className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10"
                    >
                        HACK EUROPA 2.0
                    </motion.h2>
                </div>

                {/* 2. Prize Pool (Massive - Notice First after Header) */}
                <motion.div
                    variants={itemVariants}
                    style={{ scale: prizeScale, rotate: prizeRotate }}
                    className="relative inline-block mb-12 group"
                >
                    <div className="absolute -inset-8 bg-neon-magenta/20 blur-[120px] rounded-full group-hover:bg-neon-magenta/30 transition-all duration-700 animate-pulse" />
                    <div className="relative flex flex-col items-center">
                        <span className="text-[10rem] md:text-[20rem] font-black tracking-tighter chrome-text-holographic leading-none drop-shadow-[0_0_50px_rgba(255,0,255,0.5)]">
                            15K
                        </span>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1, delay: 1 }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-neon-magenta to-transparent mt-[-10px] md:mt-[-20px]"
                        />
                        <span className="text-neon-magenta text-xl md:text-4xl font-black tracking-[0.4em] uppercase italic mt-4 drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]">
                            Total Prize Pool
                        </span>
                    </div>
                </motion.div>

                {/* 3. Date and Time (Increased Size) */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-6 mb-16"
                >
                    <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8">
                        <span className="text-4xl md:text-7xl font-bold text-neon-blue tracking-tight uppercase">
                            14 MARCH 2026
                        </span>
                        <span className="hidden md:block text-5xl font-thin text-white/20">|</span>
                        <span className="text-3xl md:text-5xl font-light text-white/80 tracking-widest uppercase">
                            09:00 AM IST
                        </span>
                    </div>

                    <div className="w-24 h-[1px] bg-white/10" />
                    <QuoteRotator />
                </motion.div>

                {/* 4. Interactive Elements */}
                <motion.div
                    variants={itemVariants}
                    className="mb-20"
                >
                    <Countdown />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-12"
                >
                    <ChromeButton
                        onClick={onRegister}
                        className="scale-125 md:scale-[1.5] hover:shadow-[0_0_50px_rgba(255,0,255,0.4)] transition-all duration-500"
                    >
                        INITIALIZE REGISTRATION
                    </ChromeButton>

                    <motion.a
                        href="https://maps.app.goo.gl/r5fnt1RtqjDBynXLA"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="group flex flex-col items-center gap-3 no-underline"
                    >
                        <span className="text-xs text-white/40 uppercase tracking-[0.5em] font-bold group-hover:text-neon-blue transition-colors">
                            BATTLEGROUND LOCATION
                        </span>
                        <div className="flex items-center gap-4 border-b border-white/10 pb-2 group-hover:border-neon-blue/50 transition-all">
                            <span className="text-lg md:text-2xl text-white/90 tracking-[0.2em] font-light">
                                SOFTWARE BLOCK, SOE, CUSAT
                            </span>
                            <svg className="w-6 h-6 text-white/30 group-hover:text-neon-blue group-hover:rotate-12 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}
