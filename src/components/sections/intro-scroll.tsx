"use client";
import { ContainerScroll } from "../ui/container-text-scroll";

const IntroScroll = () => {
    return (
        <div className="flex flex-col overflow-hidden bg-black relative">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl md:text-[6rem] font-bold text-white leading-none tracking-tighter mb-8 relative z-20">
                            <span className="chrome-text uppercase font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                HACK EUROPA
                            </span>
                            <br />
                            <span className="text-6xl md:text-[8rem] font-black uppercase text-white drop-shadow-[0_0_20px_rgba(181,51,255,0.5)]">
                                2.0
                            </span>
                        </h1>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10">
                            <span className="text-[30vw] md:text-[25vw] font-black text-white/[0.03] leading-none">
                                2.0
                            </span>
                        </div>
                    </>
                }
            >
                <div className="h-full w-full relative">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1964"
                        alt="Hack Europa"
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(181,51,255,0.2)]" />
                </div>
            </ContainerScroll>
        </div>
    );
};

export default IntroScroll;
