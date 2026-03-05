import { useEffect, type ReactNode } from 'react';
import { ParallaxBackground } from '../components/background/ParallaxBackground';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#000000] text-white selection:bg-fuchsia-500/30 selection:text-white font-sans flex flex-col">
            <ParallaxBackground />

            {/* Film Grain Polish */}
            <div className="film-grain" />

            <main className="relative z-10 w-full flex-grow flex flex-col">
                {children}
            </main>
        </div>
    );
}
