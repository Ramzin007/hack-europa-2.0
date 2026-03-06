import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { cn } from '../../lib/utils';

// Using Omit avoids prop clashes with motion.div while still allowing full standard div attributes
interface GlassCardProps extends Omit<ComponentPropsWithoutRef<typeof motion.div>, "children"> {
    children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 400, damping: 30, bounce: 0 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.12), transparent 40%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        mouseX.set(px);
        mouseY.set(py);

        const pctX = px / rect.width - 0.5;
        const pctY = py / rect.height - 0.5;
        x.set(pctX);
        y.set(pctY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "glass-card rounded-3xl p-8 relative overflow-hidden will-change-transform z-10 group",
                className
            )}
            {...props}
        >
            {/* Dynamic Border Glow */}
            <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background }}
            />
            
            {/* Internal Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] grid-pattern pointer-events-none" />

            <div
                className="relative z-10 w-full h-full"
                style={{ transform: "translateZ(40px)" }}
            >
                {children}
            </div>

            {/* Premium Highlight Border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10 group-hover:border-white/20 transition-colors duration-500" />
        </motion.div>
    );
}
