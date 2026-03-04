import type { ReactNode } from 'react';
import { ParallaxBackground } from '../components/background/ParallaxBackground';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="relative min-h-screen w-full bg-[#000000] text-white selection:bg-fuchsia-500/30 selection:text-white font-sans flex flex-col">
            <ParallaxBackground />
            <main className="relative z-10 w-full flex-grow flex flex-col">
                {children}
            </main>
        </div>
    );
}
