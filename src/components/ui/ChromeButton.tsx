import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ChromeButtonProps extends Omit<ComponentPropsWithoutRef<typeof motion.button>, "children"> {
    children: ReactNode;
    glowColor?: 'purple' | 'magenta' | 'blue';
}

export function ChromeButton({ children, className, glowColor = 'purple', ...props }: ChromeButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        // Magnetic pull (max 15px)
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const glowClass = {
        purple: 'shadow-[0_0_30px_rgba(181,51,255,0.4)]',
        magenta: 'shadow-[0_0_30px_rgba(255,0,255,0.4)]',
        blue: 'shadow-[0_0_30px_rgba(0,229,255,0.4)]',
    }[glowColor];

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative rounded-full px-10 py-5 font-bold tracking-[0.2em] font-sans overflow-hidden transition-all duration-300",
                "bg-gradient-to-br from-[#121216] to-[#0a0a0c] border border-white/20",
                glowClass,
                "group will-change-transform z-20 cursor-pointer block",
                className
            )}
            {...props}
        >
            <span className="relative z-10 chrome-text text-lg group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-500">
                {children}
            </span>

            {/* Chrome Ripple Sweep */}
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[chrome-sweep_1.5s_ease-in-out_infinite]" />
        </motion.button>
    );
}
