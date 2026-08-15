import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null!);
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const config = THREAT_STATE_CONFIGS[currentState];

  const particleCount = 2800;

  // Generate particle initial positions & velocities
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(config.colorHex);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 4.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      col[i * 3] = baseColor.r;
      col[i * 3 + 1] = baseColor.g;
      col[i * 3 + 2] = baseColor.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, [particleCount, config.colorHex]);

  // Continuous frame animation loop: always moving, even when idle
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const riskFactor = confidence / 100;
    const speed = 0.4 + riskFactor * 1.6;

    // Orbit & sinusoidal breathing movement
    const elapsedTime = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsedTime * 0.06 * speed;
    pointsRef.current.rotation.x = Math.sin(elapsedTime * 0.04) * 0.15 * speed;
    pointsRef.current.position.y = Math.sin(elapsedTime * 0.2) * 0.15;

    const targetColor = new THREE.Color(config.colorHex);
    const geo = pointsRef.current.geometry;
    const colorAttr = geo.attributes.color;

    // Smoothly interpolate colors to match active threat state
    if (colorAttr) {
      const array = colorAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += (targetColor.r - array[i * 3]) * 0.05;
        array[i * 3 + 1] += (targetColor.g - array[i * 3 + 1]) * 0.05;
        array[i * 3 + 2] += (targetColor.b - array[i * 3 + 2]) * 0.05;
      }
      colorAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export const ParticleField: React.FC = () => {
  const safeDemoMode = useThreatStore((s) => s.safeDemoMode);
  const currentState = useThreatStore((s) => s.currentState);
  const config = THREAT_STATE_CONFIGS[currentState];

  if (safeDemoMode) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-30 animate-pulse transition-colors duration-1000"
          style={{ backgroundColor: config.colorHex }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};
