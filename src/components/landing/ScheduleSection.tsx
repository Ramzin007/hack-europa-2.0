import { motion } from 'framer-motion';
import { memo } from 'react';
import { GlassCard } from '../ui/GlassCard';

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
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`flex w-full mb-8 md:mb-16 flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center relative gap-4 md:gap-0`}
        >
            <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start'} px-4 md:px-16`}>
                <GlassCard className="p-8 w-full max-w-md group relative border-white/5 hover:border-sky-400/30 transition-all duration-500">
                    {/* Terminal Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-400/50 rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-400/50 rounded-tr-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-400/50 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-400/50 rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sky-400 font-mono text-sm font-bold tracking-[0.3em] uppercase opacity-80">
                                [{time}]
                            </span>
                            <div className="h-[1px] flex-grow bg-white/5 group-hover:bg-sky-400/20 transition-colors" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-sky-300 transition-colors">
                            {title}
                        </h3>
                        
                        {description && (
                            <p className="text-white/60 text-sm leading-relaxed font-normal border-l-2 border-white/5 pl-4 group-hover:border-sky-400/20 transition-colors">
                                {description}
                            </p>
                        )}
                    </div>
                </GlassCard>
            </div>

            {/* Center Node / Vertical Connector */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="w-3 h-3 rounded-full bg-white border-4 border-black shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
                />
                <div className="absolute w-8 h-8 rounded-full border border-white/10 animate-ping opacity-20" />
            </div>

            <div className="w-full md:w-1/2" />
        </motion.div>
    );
});

const SCHEDULE_DATA = [
    { time: "08:00 AM", title: "INIT_SEQUENCE", description: "Registration desks open. Arrival of participants and badge collections." },
    { time: "12:00 PM", title: "REFUELING", description: "Lunch serves. Networking opportunities with mentors and peers." },
    { time: "04:00 PM", title: "CORE_SUBMISSION", description: "All code must be committed. Final project uploads to the portal." },
    { time: "04:00 PM - 05:30 PM", title: "EVALUATION_ROUND", description: "Jury review and project demonstrations." },
    { time: "06:00 PM", title: "EXCELLENCE_AWARDS", description: "Closing ceremony and prize distribution for the top innovators." },
];

export function ScheduleSection() {
    return (
        <section className="py-16 md:py-32 px-6 relative overflow-hidden bg-black/50">
            {/* Background scanline effect for this section */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

            <div className="max-w-6xl mx-auto relative">
                <div className="text-center mb-16 md:mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1 border border-sky-400/30 rounded text-[10px] font-mono tracking-[0.5em] text-sky-400 uppercase bg-sky-400/5"
                    >
                        mission_timeline
                    </motion.div>
                    <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter uppercase mb-4">
                        EVENTS_<span className="chrome-text-center-radiant">LOG</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Line - HUD Style */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

                    <div className="flex flex-col relative z-10">
                        {SCHEDULE_DATA.map((item, i) => (
                            <ScheduleItem key={item.title} {...item} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
