import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { ChromeButton } from '../ui/ChromeButton';

export function AboutUsSection() {
    return (
        <section className="min-h-screen py-32 px-6 flex items-center relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-10 md:p-16 h-full flex flex-col items-start border-white/5 hover:border-sky-400/20 transition-all duration-500">
                            <h3 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tighter uppercase">ABOUT SAIT</h3>
                            <div className="text-white/80 text-lg leading-relaxed font-normal mb-10">
                                <p className="mb-6">
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

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <GlassCard className="p-10 md:p-16 h-full flex flex-col border-white/5 hover:border-sky-400/20 transition-all duration-500">
                            <h3 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tighter uppercase">ABOUT EUROPA</h3>
                            <div className="text-white/80 text-lg leading-relaxed font-normal">
                                <p className="mb-6">
                                    Hack Europa is our flagship annual hackathon providing a platform for students to collaborate and build solutions. It brings together passionate developers to solve real-world problems.
                                </p>
                                <p>
                                    This year, <span className="text-sky-300 font-bold">Hack Europa 2.0</span> expands its reach inviting students from all disciplines, encouraging interdisciplinary collaboration and diverse ideas.
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
