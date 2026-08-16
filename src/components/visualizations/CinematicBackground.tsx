import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

// WebGL Plane with Dynamic 3D Texture Selection based on bgMode
const Dynamic3DModeTexturePlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  const bgMode = useThreatStore((s) => s.bgMode);

  // Pre-load all 4 3D background textures
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tArc = loader.load('/jarvis_arc_reactor_bg.jpg');
    const tBeam = loader.load('/ultrasonic_beamformer_bg.jpg');
    const tGlobe = loader.load('/satellite_globe_bg.jpg');
    const tCrystal = loader.load('/crystal_lattice_bg.jpg');

    [tArc, tBeam, tGlobe, tCrystal].forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
    });

    return {
      ARC_REACTOR: tArc,
      BEAMFORMER: tBeam,
      SATELLITE_GLOBE: tGlobe,
      CRYSTAL_LATTICE: tCrystal
    };
  }, []);

  const activeTex = textures[bgMode] || textures.ARC_REACTOR;

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uThreatLevel: { value: 0.0 },
        uTexture: { value: activeTex },
        uColorBase: { value: new THREE.Color('#08090D') },
        uColorBlue: { value: new THREE.Color('#38BDF8') },
        uColorEmerald: { value: new THREE.Color('#10B981') },
        uColorRose: { value: new THREE.Color('#F43F5E') }
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
        uniform vec3 uColorBlue;
        uniform vec3 uColorEmerald;
        uniform vec3 uColorRose;
        varying vec2 vUv;

        void main() {
          vec2 warpedUv = vUv;
          float time = uTime * 0.04;
          
          vec2 center = vec2(0.5) + uMouse * 0.05;
          float dist = distance(vUv, center);
          float energyPulse = sin(dist * 18.0 - time * 3.5) * 0.012;

          warpedUv.x += energyPulse + uMouse.x * 0.02;
          warpedUv.y += energyPulse + uMouse.y * 0.02;

          vec4 texColor = texture2D(uTexture, warpedUv);

          vec3 graded = mix(texColor.rgb, uColorBlue * texColor.r * 1.5, 0.30);
          graded += uColorEmerald * texColor.g * 0.20;

          // Threat State alert shift
          graded = mix(graded, uColorRose * texColor.r * 2.0, uThreatLevel * 0.60);

          float outerDist = distance(vUv, vec2(0.5));
          graded *= smoothstep(0.98, 0.2, outerDist);

          gl_FragColor = vec4(mix(uColorBase, graded, 0.90), 1.0);
        }
      `
    });
  }, [activeTex]);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uTexture.value = activeTex;

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

// 3D Interactive Particle Field
const InteractiveParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 850;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38BDF8'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#10B981'),
      new THREE.Color('#F8FAFC')
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
        <Dynamic3DModeTexturePlane />
        <InteractiveParticleField />
      </Canvas>
    </div>
  );
};
