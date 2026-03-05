import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { ChromeButton } from '../ui/ChromeButton';

export function AboutUsSection() {
    return (
        <section className="min-h-screen py-32 px-6 flex items-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <GlassCard className="p-10 md:p-16 h-full flex flex-col items-start border-neon-purple/20">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">ABOUT SAIT</h2>
                        <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
                            Founded in 1995, the Department of Information Technology at Cochin University of Science and Technology is a dynamic hub of innovation. Our dedicated faculty explores user-centric interfaces, cybersecurity, and artificial intelligence, pushing the boundaries of IT. Committed to excellence, we provide a holistic education in cutting-edge technologies. The <span className="font-bold text-[#e2d5f8] drop-shadow-[0_0_10px_rgba(226,213,248,0.4)]">Student Association of IT (SAIT)</span> enhances student experience through workshops, magazines, and tech projects, fostering collaboration and creating a vibrant learning environment in the ever-evolving field of Information Technology.
                        </p>
                        <ChromeButton
                            onClick={() => window.open('https://sait-opal.vercel.app/', '_blank')}
                            className="scale-90 origin-left"
                            glowColor="purple"
                        >
                            VISIT SAIT
                        </ChromeButton>
                    </GlassCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <GlassCard className="p-10 md:p-16 h-full flex flex-col justify-center border-neon-blue/20">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">ABOUT HACK EUROPA</h2>
                        <div className="text-white/60 text-lg leading-relaxed font-light">
                            <p className="mb-6">
                                Hack Europa is an annual hackathon organized by the Students Association of Information Technology at the School of Engineering, CUSAT. It provides a platform for students to collaborate, innovate, and build technology-driven solutions to real-world problems.
                            </p>
                            <p className="mb-6">
                                Since its inception in 2025, Hack Europa has grown into a recognized event that brings together passionate developers, designers, and problem solvers.
                            </p>
                            <p>
                                This year, Hack Europa 2.0 expands its reach by inviting students from all disciplines and colleges, encouraging interdisciplinary collaboration and diverse ideas.
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
