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
                        <GlassCard className="p-5 md:p-14 border-white/5 hover:border-sky-400/20 transition-all duration-500">
                            <div className="mb-3 md:mb-6">
                                <span className="text-sky-400 font-mono text-[9px] md:text-xs tracking-[0.5em] uppercase mb-1 md:mb-4 block">In Memoriam</span>
                                <h2 className="text-xl md:text-5xl font-black text-white tracking-tighter uppercase mb-3 md:mb-6 leading-none">
                                    IN MEMORY OF <br />
                                    <span className="chrome-text-center-radiant text-2xl md:text-6xl">ABHIJIT MENON</span>
                                </h2>
                            </div>
                            <div className="space-y-3 md:space-y-6 text-white/70 text-xs md:text-lg leading-relaxed font-light">
                                <p>
                                    Abhijit Menon was a visionary IT student of SOE, known for his passion for science, technology, and original ideas. He inspired those around him to think unconventionally and approach problems with creativity.
                                </p>
                                <p>
                                    His curiosity knew no bounds, and he was always eager to push the limits of knowledge. Abhijit believed that innovation was not just about finding solutions but about asking the right questions.
                                </p>
                                <p>
                                    His enthusiasm and intellect made a lasting impact on his peers and mentors alike. Though he is no longer with us, his spirit of discovery and relentless pursuit of knowledge will continue to inspire future generations. His brilliance, originality, and love for learning will always be remembered.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
