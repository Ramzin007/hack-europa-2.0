import { motion } from 'framer-motion';
import { Countdown } from './Countdown';
import { ChromeButton } from '../ui/ChromeButton';

interface EventSectionProps {
    onRegister: () => void;
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
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        HACK EUROPA 2.0
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-neon-blue tracking-[0.3em] uppercase">
                        14 March 2026
                    </p>
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
