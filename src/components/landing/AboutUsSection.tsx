import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { ChromeButton } from '../ui/ChromeButton';

export function AboutAndMemorialSection() {
    return (
        <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-black/40">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-stretch">
                    {/* About SAIT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-8 md:p-12 h-full flex flex-col items-start border-white/10 hover:border-sky-400/20 transition-all duration-500 bg-black/40">
                            <h3 className="text-xl md:text-3xl font-black text-white mb-6 tracking-tighter uppercase">ABOUT SAIT</h3>
                            <div className="text-white/80 text-base md:text-lg leading-relaxed font-normal mb-8">
                                <p className="mb-4">
                                    Founded in 1995, the Department of IT at CUSAT is a dynamic hub of innovation. We provide holistic education in cutting-edge technologies, fostering a vibrant learning environment for future leaders.
                                </p>
                                <p>
                                    The <span className="font-bold text-sky-300">Student Association of IT (SAIT)</span> enhances student experience through workshops and projects, fostering collaboration in the ever-evolving field of IT.
                                </p>
                            </div>
                            <div className="mt-auto">
                                <ChromeButton
                                    onClick={() => window.open('https://sait-opal.vercel.app/', '_blank')}
                                    glowColor="purple"
                                    className="scale-90"
                                >
                                    EXPLORE SAIT
                                </ChromeButton>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* About Europa */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-8 md:p-12 h-full flex flex-col border-white/10 hover:border-sky-400/20 transition-all duration-500 bg-black/40">
                            <h3 className="text-xl md:text-3xl font-black text-white mb-6 tracking-tighter uppercase">ABOUT EUROPA</h3>
                            <div className="text-white/80 text-base md:text-lg leading-relaxed font-normal">
                                <p className="mb-4">
                                    Hack Europa is our flagship annual hackathon providing a platform for students to collaborate and build solutions. It brings together passionate developers to solve real-world problems.
                                </p>
                                <p>
                                    This year, <span className="text-sky-300 font-bold">Hack Europa 2.0</span> expands its reach inviting students from all disciplines, encouraging interdisciplinary collaboration and diverse ideas.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Memorial Photo Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative h-full aspect-[16/9] md:aspect-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <picture>
                                <source media="(max-width: 767px)" srcSet="/abhijit-mobile.jpg" />
                                <source media="(min-width: 768px)" srcSet="/abhijit.jpg" />
                                <img
                                    src="/abhijit.jpg"
                                    alt="Abhijit Menon – IT Student of SOE"
                                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                                />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/5 to-transparent h-1/2 w-full -translate-y-full animate-[scan_4s_linear_infinite] pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Memorial Tribute Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-8 md:p-12 h-full border-white/10 hover:border-sky-400/30 transition-all duration-500 bg-black/60 backdrop-blur-xl flex flex-col justify-center">
                            <div className="mb-6">
                                <span className="text-sky-400 font-mono text-sm tracking-[0.6em] uppercase mb-4 block opacity-80">In Memoriam</span>
                                <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                                    IN MEMORY OF <br />
                                    <span className="chrome-text-center-radiant text-7xl">ABHIJIT MENON</span>
                                </h2>
                            </div>
                            <div className="text-white/90 text-xl leading-relaxed font-light text-left">
                                <p>
                                    Abhijit Menon was a visionary IT student of SOE, known for his passion for science, technology, and original ideas. He inspired those around him to think creatively and approach problems in unconventional ways. His curiosity and enthusiasm for learning pushed him to constantly explore new ideas and challenge boundaries. Though he is no longer with us, his spirit of innovation and love for knowledge will continue to inspire future generations.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
