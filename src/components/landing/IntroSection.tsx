import { motion, useScroll, useTransform, useSpring, type MotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChromeButton } from '../ui/ChromeButton';
import { cn } from '../../lib/utils';

function FallingLetter({ char, progress, index, className }: { char: string, progress: MotionValue<number>, index: number, className?: string }) {
    // Letter no longer falls or rotates on scroll as per user request
    const letterOpacity = useTransform(progress, [Math.min(0.2, index * 0.02), 0.8], [1, 0]);

    return (
        <motion.span
            style={{
                opacity: letterOpacity,
                display: 'inline-block'
            }}
            className={cn("text-[clamp(3.5rem,15vw,9rem)] font-black leading-none tracking-[-0.07em]", className || "chrome-text-center-radiant")}
        >
            {char}
        </motion.span>
    );
}

export function IntroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        if (!isUnlocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isUnlocked]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const handleExplore = () => {
        setIsUnlocked(true);
        setTimeout(() => {
            if (containerRef.current) {
                // Scroll to the end of Section 1 to land exactly at Section 2
                window.scrollTo({
                    top: containerRef.current.offsetHeight,
                    behavior: 'smooth'
                });
            }
        }, 10);
    };

    // Smooth scroll progress to eliminate jitter
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const opacity = useTransform(smoothProgress, [0.4, 0.9], [1, 0]);
    const bgOpacity = useTransform(smoothProgress, [0.2, 0.8], [1, 0]);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 2.5]);
    const mainScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
    const mainY = useTransform(smoothProgress, [0, 1], [0, -60]);
    const blurEffect = useTransform(smoothProgress, [0.4, 0.9], ["blur(0px)", "blur(12px)"]);

    return (
        <section
            ref={containerRef}
            className="h-[115vh] relative z-20"
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* massive '2.0' backdrop - Holographic Glass Style */}
                <motion.div
                    style={{
                        opacity: bgOpacity,
                        scale: bgScale,
                        filter: blurEffect,
                        willChange: "transform, opacity, filter"
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-20 md:translate-y-0"
                >
                    <div className="relative flex items-center justify-center">
                        {/* 1. Frosted Glass Body */}
                        <span className="text-[35vw] md:text-[25vw] font-black leading-none select-none tracking-tighter
                            text-white/20 backdrop-blur-[20px] bg-clip-text
                            drop-shadow-[0_0_120px_rgba(255,255,255,0.2)]
                        ">
                            2.0
                        </span>

                        {/* 2. Holographic Refractive Core */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[35vw] md:text-[25vw] font-black leading-none select-none tracking-tighter
                                bg-gradient-to-tr from-cyan-400/40 via-magenta-500/30 to-lavender-400/40 bg-clip-text text-transparent
                                mix-blend-screen opacity-100 animate-[holographic-sweep_8s_ease_infinite] bg-[length:200%_200%]
                                drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]
                            ">
                                2.0
                            </span>
                        </div>

                        {/* 3. Razor-thin Edge Highlights */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[35vw] md:text-[25vw] font-black leading-none select-none tracking-tighter
                                bg-gradient-to-br from-white/40 via-transparent to-white/20 bg-clip-text text-transparent
                                drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mix-blend-overlay
                            ">
                                2.0
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    style={{
                        opacity,
                        scale: mainScale,
                        y: mainY,
                        filter: blurEffect,
                        willChange: "transform, opacity, filter"
                    }}
                    className="relative flex flex-col items-center text-center z-10 px-4 -translate-y-20 md:translate-y-0"
                >
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="mb-32 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white/95">
                            HOSTED BY SAIT
                        </span>
                    </motion.div>

                    <div className="flex flex-col items-center select-none relative">
                        {/* HACK EUROPA in one major line */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 overflow-visible mb-4">
                            <div className="flex gap-2 md:gap-4">
                                {"HACK".split("").map((char, i) => (
                                    <FallingLetter key={`h-${i}`} char={char} progress={smoothProgress} index={i} className="chrome-text-center-radiant" />
                                ))}
                            </div>
                            <div className="flex gap-2 md:gap-4">
                                {"EUROPA".split("").map((char, i) => (
                                    <FallingLetter key={`e-${i}`} char={char} progress={smoothProgress} index={i + 4} className="chrome-text-center-radiant" />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Atmospheric Floor Glow - Mixing into S2 */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0.4, 1], [1, 0.4]) }}
                    className="absolute bottom-[-2px] left-0 right-0 h-[70vh] bg-gradient-to-t from-sky-400/30 to-transparent pointer-events-none"
                />

                {/* Explore Button / Scroll Indicator */}
                <div className="absolute bottom-36 md:bottom-20 left-1/2 -translate-x-1/2 z-50">
                    <AnimatePresence mode="wait">
                        {!isUnlocked ? (
                            <motion.div
                                key="explore-btn"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <ChromeButton
                                    onClick={handleExplore}
                                    glowColor="purple"
                                    className="scale-90 md:scale-100 hover:shadow-[0_0_40px_rgba(181,51,255,0.4)]"
                                >
                                    EXPLORE
                                </ChromeButton>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="scroll-indicator"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/70 font-bold whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                    Scroll to Begin
                                </span>
                                <div className="w-[1px] h-20 bg-gradient-to-b from-white/80 via-white/20 to-transparent relative overflow-hidden">
                                    <motion.div
                                        animate={{ y: [-40, 80] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-0 left-0 w-full h-10 bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
