import { ParallaxBackground } from '../components/background/ParallaxBackground';
import { ChromeScene } from '../components/background/ChromeScene';
import CustomCursor from '../components/ui/CustomCursor';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-neon-purple/30 overflow-x-hidden">
            <CustomCursor />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ChromeScene />
                <ParallaxBackground />
            </div>

            {/* Film Grain Polish */}
            <div className="film-grain" />

            <main className="relative z-10 w-full flex-grow flex flex-col">
                {children}
            </main>
        </div>
    );
}
