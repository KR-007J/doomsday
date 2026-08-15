import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

function ConstellationField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const config = THREAT_STATE_CONFIGS[currentState];

  // Sparse, deliberate constellation particle count (800 points max)
  const particleCount = 800;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(config.colorHex);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.0 + Math.random() * 4.0;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      col[i * 3] = baseColor.r * 0.6;
      col[i * 3 + 1] = baseColor.g * 0.6;
      col[i * 3 + 2] = baseColor.b * 0.6;
    }

    return { positions: pos, colors: col };
  }, [particleCount, config.colorHex]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const riskFactor = confidence / 100;
    // Calmer in SAFE, active in THREAT LOGGED
    const speed = 0.15 + riskFactor * 0.8;

    const elapsedTime = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsedTime * 0.03 * speed;
    pointsRef.current.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08 * speed;

    const targetColor = new THREE.Color(config.colorHex);
    const geo = pointsRef.current.geometry;
    const colorAttr = geo.attributes.color;

    if (colorAttr) {
      const array = colorAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += (targetColor.r * 0.6 - array[i * 3]) * 0.05;
        array[i * 3 + 1] += (targetColor.g * 0.6 - array[i * 3 + 1]) * 0.05;
        array[i * 3 + 2] += (targetColor.b * 0.6 - array[i * 3 + 2]) * 0.05;
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.4}
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

  // FPS Guardrail or reduced motion check
  if (safeDemoMode) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080A]">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-15 transition-colors duration-1000"
          style={{ backgroundColor: config.colorHex }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-50 transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <ConstellationField />
      </Canvas>
    </div>
  );
};
