import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Zap, Lightbulb, Users } from 'lucide-react';

export function AboutSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const cards = [
        {
            title: "24-Hour Marathon",
            description: "Push your limits in a non-stop coding frenzy, building the next generation of tech.",
            icon: <Zap size={32} className="text-[#b533ff]" />
        },
        {
            title: "Innovation First",
            description: "Break boundaries. We supply the caffeine, you supply the disruptive ideas.",
            icon: <Lightbulb size={32} className="text-[#00e5ff]" />
        },
        {
            title: "Collaboration",
            description: "Team up with brilliant minds from across Europa to solve real-world problems.",
            icon: <Users size={32} className="text-[#ff00ff]" />
        }
    ];

    return (
        <section ref={ref} className="relative z-10 w-full min-h-screen py-32 flex flex-col items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight chrome-text">
                    DEFINE THE FUTURE
                </h2>
                <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">
                    Not just another hackathon. An immersive experience designed to challenge the elite. Setup your workspace, enter the zone.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50, rotateX: 20 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 20 }}
                        transition={{ duration: 0.8, delay: idx * 0.2, type: 'spring', damping: 25 }}
                        className="h-full"
                    >
                        <GlassCard className="h-full flex flex-col items-center text-center">
                            <div className="mb-6 bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-blue)]/20 p-4 rounded-full shadow-[0_0_20px_rgba(181,51,255,0.2)] border border-white/5">
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 tracking-wide text-white">
                                {card.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed font-light">
                                {card.description}
                            </p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
