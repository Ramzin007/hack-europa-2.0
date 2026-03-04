import { motion } from 'framer-motion';
import { ChromeButton } from '../ui/ChromeButton';

interface FinalCTASectionProps {
    onRegister: () => void;
}

export function FinalCTASection({ onRegister }: FinalCTASectionProps) {
    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-t from-neon-purple/10 to-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center z-10 px-6"
            >
                <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase">
                    HACK EUROPA 2.0 <br />
                    <span className="chrome-text">AWAITS</span>
                </h2>

                <div className="flex flex-col items-center gap-8">
                    <ChromeButton
                        onClick={onRegister}
                        className="scale-125"
                    >
                        REGISTER NOW
                    </ChromeButton>
                    <p className="text-white/30 uppercase tracking-[0.5em] text-xs font-medium animate-pulse">
                        Step into the future
                    </p>
                </div>
            </motion.div>

            {/* Subtle light pulse background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-radial-gradient from-neon-purple/10 via-transparent to-transparent pointer-events-none"
            />
        </section>
    );
}
