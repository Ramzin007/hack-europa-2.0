import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { ChromeObject } from './ChromeObject';
import { useRef, memo, useState, useEffect } from 'react';
import * as THREE from 'three';

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = scrollY / vh;

        const obj = groupRef.current.children[0];
        if (!obj) return;

        let targetX = 0;
        let targetY = 0;
        let targetZ = -5;
        let targetScale = 2;

        const m = isMobile ? 0.6 : 1;

        if (progress < 1) {
            // Intro: Centered, large
            targetX = 0;
            targetY = 0;
            targetZ = -3;
            targetScale = 2.5 * m;
        } else if (progress < 2) {
            // Event Section: Move top right
            const p = progress - 1;
            targetX = THREE.MathUtils.lerp(0, 4 * m, p);
            targetY = THREE.MathUtils.lerp(0, 2 * m, p);
            targetZ = THREE.MathUtils.lerp(-3, -6, p);
            targetScale = THREE.MathUtils.lerp(2.5 * m, 1.5 * m, p);
        } else if (progress < 3) {
            // About Us: Move left
            const p = progress - 2;
            targetX = THREE.MathUtils.lerp(4 * m, -4 * m, p);
            targetY = THREE.MathUtils.lerp(2 * m, 0, p);
            targetZ = THREE.MathUtils.lerp(-6, -4, p);
            targetScale = THREE.MathUtils.lerp(1.5 * m, 1.8 * m, p);
        } else if (progress < 4) {
            // Schedule: Move bottom right
            const p = progress - 3;
            targetX = THREE.MathUtils.lerp(-4 * m, 3 * m, p);
            targetY = THREE.MathUtils.lerp(0, -2 * m, p);
            targetZ = THREE.MathUtils.lerp(-4, -6, p);
            targetScale = THREE.MathUtils.lerp(1.8 * m, 1.3 * m, p);
        } else {
            // Final CTA: Back to center, very large
            const p = Math.min((progress - 4) * 2, 1);
            targetX = THREE.MathUtils.lerp(3 * m, 0, p);
            targetY = THREE.MathUtils.lerp(-2 * m, 0, p);
            targetZ = THREE.MathUtils.lerp(-6, -2, p);
            targetScale = THREE.MathUtils.lerp(1.3 * m, 3.0 * m, p);
        }

        // Smoothly interpolate current position towards target position
        obj.position.x = THREE.MathUtils.lerp(obj.position.x, targetX, 0.05);
        obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetY, 0.05);
        obj.position.z = THREE.MathUtils.lerp(obj.position.z, targetZ, 0.05);

        // Scale
        obj.scale.setScalar(THREE.MathUtils.lerp(obj.scale.x, targetScale, 0.05));
    });

    return (
        <group ref={groupRef}>
            <ChromeObject
                type="coil"
                position={[0, 0, -5]}
                scale={2}
                speed={0.15}
                color="#b533ff"
                rotationSpeed={0.2}
            />
        </group>
    );
}

export const ChromeScene = memo(function ChromeScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true
                }}
                camera={{ position: [0, 0, 15], fov: 40 }}
            >
                <color attach="background" args={['#000000']} />

                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                <spotLight position={[-20, 10, -10]} angle={0.5} penumbra={1} intensity={2} color="#ff00ff" />
                <spotLight position={[20, -10, -10]} angle={0.5} penumbra={1} intensity={2} color="#00e5ff" />
                <spotLight position={[0, -20, 5]} angle={0.5} penumbra={1} intensity={1} color="#b533ff" />

                <Environment preset="night" />

                <SceneContent />
            </Canvas>
        </div>
    );
});
