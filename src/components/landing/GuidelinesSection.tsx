import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Users, HeartHandshake, Timer, Utensils, Laptop, Lightbulb } from 'lucide-react';

const guidelines = [
    {
        title: "Team Size",
        text: "Each team must consist of 2-4 members.",
        icon: Users
    },
    {
        title: "Inclusive Teams",
        text: "Every team must include at least one female participant.",
        icon: HeartHandshake
    },
    {
        title: "Hack Duration",
        text: "Participants will have 10 hours to design and build their solution.",
        icon: Timer
    },
    {
        title: "Food & Refreshments",
        text: "Food and refreshments will be provided for all participants.",
        icon: Utensils
    },
    {
        title: "Bring Your Equipment",
        text: "Participants must bring their own laptops, chargers, and development tools. Internet will be provided.",
        icon: Laptop
    },
    {
        title: "Original Work",
        text: "All projects must be developed during the hackathon. Pre-built solutions are not allowed.",
        icon: Lightbulb
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export function GuidelinesSection() {
    return (
        <section className="relative py-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    style={{ willChange: "transform, opacity" }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-7xl font-black chrome-text-holographic tracking-tighter mb-4 shadow-neon-purple/20">
                        HACKATHON GUIDELINES
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-neon-purple to-neon-magenta mx-auto rounded-full shadow-[0_0_15px_rgba(181,51,255,0.5)]" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {guidelines.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "rgba(168, 85, 247, 0.4)",
                                    boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)"
                                }}
                                style={{ willChange: "transform, opacity, box-shadow" }}
                                className="glass-card p-10 md:p-8 rounded-xl border border-purple-500/20 bg-white/5 backdrop-blur-md transition-all duration-300 flex flex-col items-start gap-4 group mx-auto md:mx-0 max-w-[90%] md:max-w-none"
                            >
                                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                    <Icon className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed font-light">
                                    {item.text}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
