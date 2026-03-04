import { motion } from 'framer-motion';
import { memo } from 'react';

interface ScheduleItemProps {
    time: string;
    title: string;
    description?: string;
    index: number;
}

const ScheduleItem = memo(({ time, title, description, index }: ScheduleItemProps) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`flex w-full mb-12 flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
        >
            <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start'} px-4 md:px-12`}>
                <div className="glass-card p-6 rounded-2xl border border-white/10 w-full max-w-sm hover:border-neon-purple/50 transition-colors duration-500">
                    <span className="text-neon-blue font-mono text-sm tracking-widest mb-2 block">{time}</span>
                    <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
                    {description && <p className="text-white/40 text-sm leading-relaxed">{description}</p>}
                </div>
            </div>

            {/* Center Node on desktop */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-neon-purple rounded-full shadow-[0_0_15px_rgba(181,51,255,0.8)] z-10" />

            <div className="w-full md:w-1/2" />
        </motion.div>
    );
});

const SCHEDULE_DATA = [
    { time: "09:00 AM", title: "Registration", description: "Badge pickup and team verification" },
    { time: "10:00 AM", title: "Opening Ceremony", description: "Introduction and theme reveal" },
    { time: "11:00 AM", title: "Hacking Begins", description: "Start building your projects" },
    { time: "07:00 PM", title: "Mentorship Round", description: "Feedback from industry experts" },
    { time: "Day 2 - 10:00 AM", title: "Final Presentation", description: "Pitching to the grand jury" },
    { time: "Day 2 - 01:00 PM", title: "Prize Distribution", description: "Celebrating the winners" },
];

export function ScheduleSection() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">TIMELINE</h2>
                    <div className="h-1 w-20 bg-neon-purple mx-auto" />
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-purple/50 via-neon-magenta/50 to-transparent hidden md:block" />

                    <div className="flex flex-col">
                        {SCHEDULE_DATA.map((item, i) => (
                            <ScheduleItem key={item.title} {...item} index={i} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
