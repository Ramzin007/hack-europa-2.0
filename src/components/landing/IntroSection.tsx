import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';

function FallingLetter({ char, progress, index }: { char: string, progress: MotionValue<number>, index: number }) {
    // Stable random values for each letter
    const { x, rot, d } = useMemo(() => ({
        x: (Math.random() - 0.5) * 600, // Random horizontal drift
        rot: (Math.random() - 0.5) * 360, // Random rotation tumbling
        d: 500 + Math.random() * 500 // Random drop distance
    }), []);

    // Transformation based on scroll progress
    // Letters start falling after a slight delay (offset based on index)
    const start = Math.min(0.2, index * 0.02);
    const end = 1;

    const translateX = useTransform(progress, [start, end], [0, x]);
    const translateY = useTransform(progress, [start, end], [0, d]);
    const rotate = useTransform(progress, [start, end], [0, rot]);
    const letterOpacity = useTransform(progress, [start, 0.8], [1, 0]);

    return (
        <motion.span
            style={{
                x: translateX,
                y: translateY,
                rotate,
                opacity: letterOpacity,
                display: 'inline-block'
            }}
            className="text-6xl md:text-9xl font-black chrome-text leading-none tracking-tighter"
        >
            {char}
        </motion.span>
    );
}

export function IntroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transformations based on scroll
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
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
                    style={{ opacity }}
                    className="flex flex-col items-center text-center z-10"
                >
                    <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-neon-purple mb-8 font-medium opacity-70">
                        SAIT Presents
                    </span>

                    <div className="flex flex-col items-center select-none">
                        {/* HACK */}
                        <div className="flex gap-2 md:gap-4 overflow-visible mb-2">
                            {"HACK".split("").map((char, i) => (
                                <FallingLetter key={`h-${i}`} char={char} progress={scrollYProgress} index={i} />
                            ))}
                        </div>
                        {/* EUROPA */}
                        <div className="flex gap-2 md:gap-4 overflow-visible">
                            {"EUROPA".split("").map((char, i) => (
                                <FallingLetter key={`e-${i}`} char={char} progress={scrollYProgress} index={i + 4} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center">
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
