import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ChromeObject } from './ChromeObject';
import { useRef, memo } from 'react';
import * as THREE from 'three';

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null);

    // High performance scroll listener - no React re-renders
    useFrame(() => {
        if (!groupRef.current) return;
        const scrollY = window.scrollY;
        // Subtle parallax shift
        groupRef.current.position.y = scrollY * 0.005;
        groupRef.current.rotation.y = scrollY * 0.0005;
    });

    return (
        <group ref={groupRef}>
            {/* Mid depth - Center Left */}
            <ChromeObject
                position={[-4, 2, -2]}
                scale={1.5}
                speed={1}
                distort={0.4}
                color="#a070ff"
            />

            {/* Far depth - Top Right */}
            <ChromeObject
                position={[5, 4, -5]}
                scale={1.2}
                speed={1.5}
                distort={0.5}
                color="#ff70d0"
            />

            {/* Near depth - Bottom Center */}
            <ChromeObject
                position={[0, -5, 0]}
                scale={2.2}
                speed={0.8}
                distort={0.3}
                color="#70e0ff"
            />
        </group>
    );
}

export const ChromeScene = memo(function ChromeScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                camera={{ position: [0, 0, 10], fov: 45 }}
            >
                <color attach="background" args={['#000000']} />

                {/* Lights */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#b533ff" />
                <spotLight position={[10, -10, 5]} angle={0.2} penumbra={1} intensity={0.5} color="#ff00ff" />

                <Environment preset="studio" />

                <SceneContent />
            </Canvas>
        </div>
    );
});
