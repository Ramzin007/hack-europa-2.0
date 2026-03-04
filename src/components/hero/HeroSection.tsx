import { motion, useScroll, useTransform } from 'framer-motion';
import { ChromeButton } from '../ui/ChromeButton';

interface HeroSectionProps {
    onNavigateRegistration: () => void;
}

export function HeroSection({ onNavigateRegistration }: HeroSectionProps) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 100]);
    const yBgText = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityBgText = useTransform(scrollY, [0, 300], [0.05, 0]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full">
            {/* Background massive "2.0" */}
            <motion.div
                style={{ y: yBgText, opacity: opacityBgText }}
                className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[40vw] font-black leading-none text-white tracking-tighter select-none pointer-events-none will-change-transform z-0"
            >
                2.0
            </motion.div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm md:text-base uppercase tracking-[0.3em] text-white/50 mb-6 font-medium"
                >
                    SAIT presents
                </motion.p>

                <motion.h1
                    style={{ y: yText }}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1, delay: 0.4, type: 'spring', damping: 20 }}
                    className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none mb-4 chrome-text pb-2 uppercase"
                >
                    HACK EUROPA 2.0
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-xl md:text-2xl text-white/80 font-light tracking-wide mb-12"
                >
                    Coming March 2026
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-6 items-center"
                >
                    <ChromeButton glowColor="purple" onClick={onNavigateRegistration}>
                        REGISTER NOW
                    </ChromeButton>

                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="text-white/40 hover:text-white transition-colors text-sm tracking-[0.3em] uppercase hover:underline underline-offset-8"
                    >
                        Explore Terminal
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
