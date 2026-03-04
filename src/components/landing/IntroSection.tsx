import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function IntroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transformations based on scroll
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const tracking = useTransform(scrollYProgress, [0, 1], ["0em", "0.5em"]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0]);

    return (
        <section
            ref={containerRef}
            className="h-[200vh] relative z-10" // Extra height for scroll transition
        >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* Massive translucent '2.0' behind */}
                <motion.div
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-[40vw] font-bold text-white/5 leading-none">2.0</span>
                </motion.div>

                <motion.div
                    style={{ scale, opacity, letterSpacing: tracking }}
                    className="flex flex-col items-center text-center z-10"
                >
                    <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-neon-purple mb-4 font-medium opacity-70">
                        SAIT Presents
                    </span>
                    <h1 className="text-6xl md:text-9xl font-black chrome-text leading-tight tracking-tighter">
                        HACK<br />EUROPA
                    </h1>
                    <div className="mt-8 flex flex-col items-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent mb-4"
                        />
                        <span className="text-lg md:text-2xl font-light text-white/40 tracking-[0.2em]">VERSION 2.0</span>
                    </div>
                </motion.div>

                {/* Ambient Floor Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-neon-purple/20 to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
