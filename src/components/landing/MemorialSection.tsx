import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';

export function MemorialSection() {
    return (
        <section className="py-12 md:py-32 px-6 relative overflow-hidden bg-black/40">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group max-w-sm mx-auto md:max-w-none w-full"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative aspect-[16/9] md:aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <picture>
                                <source media="(max-width: 767px)" srcSet="/abhijit-mobile.jpg" />
                                <source media="(min-width: 768px)" srcSet="/abhijit.jpg" />
                                <img
                                    src="/abhijit.jpg"
                                    alt="Abhijit Menon – IT Student of SOE"
                                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                />
                            </picture>
                            {/* Scanning line effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/5 to-transparent h-1/2 w-full -translate-y-full animate-[scan_4s_linear_infinite] pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-6 md:p-14 border-white/10 hover:border-sky-400/30 transition-all duration-500 bg-black/60 backdrop-blur-xl">
                            <div className="mb-4 md:mb-8">
                                <span className="text-sky-400 font-mono text-sm tracking-[0.6em] uppercase mb-2 md:mb-4 block opacity-80">In Memoriam</span>
                                <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4 md:mb-8 leading-none">
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
