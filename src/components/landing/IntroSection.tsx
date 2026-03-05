import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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
            className={cn("text-6xl md:text-9xl font-black leading-none tracking-tighter", className || "chrome-text-center-radiant")}
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
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }, 10);
    };

    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0]);
    const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="h-[105vh] relative z-20"
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* massive '2.0' backdrop - Liquid Crystal (Iridescent) Style */}
                <motion.div
                    style={{ opacity: bgOpacity, scale: bgScale }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                >
                    <div className="relative flex items-center justify-center">
                        <span className="text-[35vw] md:text-[25vw] font-black leading-none select-none tracking-tighter
                            bg-gradient-to-br from-cyan-400/40 via-white/20 to-purple-600/40 bg-clip-text text-transparent
                            drop-shadow-[0_0_80px_rgba(192,132,252,0.3)] blur-[0.5px]
                        ">
                            2.0
                        </span>
                        {/* Iridescent Refractive Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[35vw] md:text-[25vw] font-black leading-none select-none tracking-tighter
                                bg-gradient-to-tr from-magenta-500/30 via-cyan-400/20 to-purple-500/30 bg-clip-text text-transparent
                                backdrop-blur-[12px] mix-blend-screen opacity-90
                            ">
                                2.0
                            </span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="relative flex flex-col items-center text-center z-10 px-4"
                >
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="mb-16 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white/80">
                            HOSTED BY THE SAIT
                        </span>
                    </motion.div>

                    <div className="flex flex-col items-center select-none relative">
                        {/* HACK EUROPA in one major line */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 overflow-visible mb-4">
                            <div className="flex gap-2 md:gap-4">
                                {"HACK".split("").map((char, i) => (
                                    <FallingLetter key={`h-${i}`} char={char} progress={scrollYProgress} index={i} className="chrome-text-center-radiant" />
                                ))}
                            </div>
                            <div className="flex gap-2 md:gap-4">
                                {"EUROPA".split("").map((char, i) => (
                                    <FallingLetter key={`e-${i}`} char={char} progress={scrollYProgress} index={i + 4} className="chrome-text-center-radiant" />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Ambient Floor Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-sky-400/20 to-transparent pointer-events-none" />

                {/* Explore Button */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <ChromeButton
                            onClick={handleExplore}
                            glowColor="blue"
                            className="scale-90 md:scale-100 hover:shadow-[0_0_40px_rgba(14,165,233,0.4)]"
                        >
                            EXPLORE
                        </ChromeButton>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
