import { memo } from 'react';
import { ChromeScene } from './ChromeScene';

export const ParallaxBackground = memo(function ParallaxBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* 3D Chrome Background Scene */}
            <ChromeScene />

            {/* Subtle Grain Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Spotlight Floor Gradient (Lowered z-index to sit behind UI but in front of 3D objects if needed, or behind both) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--neon-purple)]/20 via-[var(--neon-blue)]/5 to-transparent z-10" />
        </div>
    );
});
