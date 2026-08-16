import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

// Marvel J.A.R.V.I.S 4K HDR 3D Arc Reactor WebGL Shader
const MarvelJarvisArcReactorPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);

  // Load generated 4K HDR Marvel J.A.R.V.I.S Arc Reactor Texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/jarvis_arc_reactor_bg.jpg');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uThreatLevel: { value: 0.0 },
        uTexture: { value: texture },
        // Color grading tokens
        uColorBase: { value: new THREE.Color('#08090D') },
        uColorArcBlue: { value: new THREE.Color('#38BDF8') },
        uColorGold: { value: new THREE.Color('#F59E0B') },
        uColorUltronRed: { value: new THREE.Color('#F43F5E') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uThreatLevel;
        uniform sampler2D uTexture;
        uniform vec3 uColorBase;
        uniform vec3 uColorArcBlue;
        uniform vec3 uColorGold;
        uniform vec3 uColorUltronRed;
        varying vec2 vUv;

        void main() {
          // Dynamic UV perspective warping tracking mouse cursor
          vec2 warpedUv = vUv;
          float time = uTime * 0.04;
          
          // Subtle liquid energy pulse around center Arc Reactor
          vec2 center = vec2(0.5) + uMouse * 0.05;
          float dist = distance(vUv, center);
          float energyPulse = sin(dist * 20.0 - time * 4.0) * 0.015;

          warpedUv.x += energyPulse + uMouse.x * 0.02;
          warpedUv.y += energyPulse + uMouse.y * 0.02;

          vec4 texColor = texture2D(uTexture, warpedUv);

          // Marvel MCU Color Grading Enhancement
          vec3 graded = mix(texColor.rgb, uColorArcBlue * texColor.r * 1.6, 0.35);
          graded += uColorGold * texColor.g * 0.20;

          // Threat State Ultron Red Shift
          graded = mix(graded, uColorUltronRed * texColor.r * 2.2, uThreatLevel * 0.65);

          // Radial vignette
          float outerDist = distance(vUv, vec2(0.5));
          graded *= smoothstep(0.98, 0.2, outerDist);

          gl_FragColor = vec4(mix(uColorBase, graded, 0.90), 1.0);
        }
      `
    });
  }, [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      
      mat.uniforms.uMouse.value.x += (state.pointer.x - mat.uniforms.uMouse.value.x) * 0.06;
      mat.uniforms.uMouse.value.y += (state.pointer.y - mat.uniforms.uMouse.value.y) * 0.06;

      const targetThreat = currentState === 'THREAT_LOGGED' ? 1.0 : (currentState === 'ANALYZING' ? 0.3 : 0.0);
      mat.uniforms.uThreatLevel.value += (targetThreat - mat.uniforms.uThreatLevel.value) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[13, 7.5]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

// Interactive 3D Particle Field with Cursor Repulsion
const InteractiveParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 850;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38BDF8'), // Arc Blue
      new THREE.Color('#F59E0B'), // Gold
      new THREE.Color('#10B981'), // Emerald
      new THREE.Color('#F8FAFC')  // White Star
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, initPos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    const mouseX = state.pointer.x * 7;
    const mouseY = state.pointer.y * 4.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const px = posArr[idx];
      const py = posArr[idx + 1];
      const origX = initialPositions[idx];
      const origY = initialPositions[idx + 1];

      const dx = px - mouseX;
      const dy = py - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 2.4;

      if (dist < maxDist && dist > 0.01) {
        const force = (maxDist - dist) / maxDist;
        posArr[idx] += (dx / dist) * force * 0.14;
        posArr[idx + 1] += (dy / dist) * force * 0.14;
      } else {
        posArr[idx] += (origX - posArr[idx]) * 0.06;
        posArr[idx + 1] += (origY - posArr[idx + 1]) * 0.06;
      }

      posArr[idx + 1] += Math.sin(state.clock.elapsedTime * 1.5 + origX) * 0.0012;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        <MarvelJarvisArcReactorPlane />
        <InteractiveParticleField />
      </Canvas>
    </div>
  );
};
