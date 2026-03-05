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

            {/* Spotlight Floor Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-r from-[#4169e1]/30 via-[#8a2be2]/30 to-[#ff1493]/30 z-10 fade-to-top" style={{ maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }} />
        </div>
    );
});
