import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';

export function StatsSection() {
    const stats = [
        { label: 'TEAMS JOINED', value: '42+', icon: <Trophy className="text-[var(--neon-purple)]" /> },
        { label: 'HACKERS REGISTERED', value: '150+', icon: <Users className="text-[var(--neon-blue)]" /> },
    ];

    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-12">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="mb-4 transform transition-transform group-hover:scale-110 duration-500">
                            {stat.icon}
                        </div>
                        <h3 className="text-5xl md:text-7xl font-black chrome-text tracking-tighter mb-2">
                            {stat.value}
                        </h3>
                        <p className="text-sm md:text-base tracking-[0.4em] text-white/40 font-medium">
                            {stat.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
