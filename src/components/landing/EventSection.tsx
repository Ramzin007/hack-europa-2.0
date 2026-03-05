import { motion, AnimatePresence } from 'framer-motion';
import { Countdown } from './Countdown';
import { ChromeButton } from '../ui/ChromeButton';
import { useState, useEffect } from 'react';

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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="text-sm md:text-base text-white/50 italic font-light tracking-widest"
                >
                    "{QUOTES[index]}"
                </motion.p>
            </AnimatePresence>
        </div>
    );
}

export function EventSection({ onRegister }: EventSectionProps) {
    return (
        <section className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-4xl w-full text-center z-10"
            >
                <div className="mb-12 flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/40 mb-4"
                    >
                        Presented by SAIT
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        HACK EUROPA 2.0
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-xl md:text-2xl font-light text-neon-blue tracking-[0.3em] uppercase mb-4"
                    >
                        14 March 2026 • 09:00 AM
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="px-6 py-2 border border-neon-magenta/30 bg-neon-magenta/5 rounded-full mb-8"
                    >
                        <span className="text-neon-magenta font-bold tracking-widest uppercase text-sm md:text-base">
                            Price Pool of 15000
                        </span>
                    </motion.div>
                    <QuoteRotator />
                </div>

                <Countdown />

                <div className="mt-16 flex flex-col items-center gap-6">
                    <ChromeButton
                        onClick={onRegister}
                        className="scale-110 md:scale-125 mb-4"
                    >
                        REGISTER NOW
                    </ChromeButton>
                    <motion.a
                        href="https://maps.app.goo.gl/r5fnt1RtqjDBynXLA"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1, y: -2 }}
                        className="text-sm text-white/80 tracking-widest uppercase font-medium border-b border-white/20 pb-1 flex items-center gap-2 group transition-all"
                    >
                        Software block, SOE, CUSAT
                        <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.a>
                </div>
            </motion.div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-neon-magenta/5 to-transparent pointer-events-none" />
        </section>
    );
}
