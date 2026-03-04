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
                <div className="mb-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        HACK EUROPA 2.0
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-neon-blue tracking-[0.3em] uppercase mb-6">
                        14 March 2026
                    </p>
                    <QuoteRotator />
                </div>

                <Countdown />

                <div className="mt-16 flex flex-col items-center gap-6">
                    <ChromeButton
                        onClick={onRegister}
                        className="scale-110 md:scale-125"
                    >
                        REGISTER NOW
                    </ChromeButton>
                    <p className="text-sm text-white/30 tracking-widest uppercase">
                        Kochi, India • In-Person
                    </p>
                </div>
            </motion.div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-neon-magenta/5 to-transparent pointer-events-none" />
        </section>
    );
}
