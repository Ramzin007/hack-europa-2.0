import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

// Using Omit avoids prop clashes with motion.div while still allowing full standard div attributes
interface GlassCardProps extends Omit<ComponentPropsWithoutRef<typeof motion.div>, "children"> {
    children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 400, damping: 30, bounce: 0 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const pctX = (e.clientX - rect.left) / rect.width - 0.5;
        const pctY = (e.clientY - rect.top) / rect.height - 0.5;
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
                "glass-card rounded-3xl p-8 relative will-change-transform z-10 transition-shadow duration-500 hover:shadow-[0_0_20px_rgba(181,51,255,0.15)]",
                className
            )}
            {...props}
        >
            <div
                className="relative z-10 w-full h-full"
                style={{ transform: "translateZ(30px)" }}
            >
                {children}
            </div>

            {/* Soft inner glow */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 opacity-50 mix-blend-overlay" />
        </motion.div>
    );
}
