import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

// Common GLSL noise functions
const noiseGLSL = `
  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix( mix( random( i + vec2(0.0,0.0) ), random( i + vec2(1.0,0.0) ), u.x),
                  mix( random( i + vec2(0.0,1.0) ), random( i + vec2(1.0,1.0) ), u.x), u.y);
  }
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = .5;
      for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st);
          st *= 2.;
          amplitude *= .5;
      }
      return value;
  }
`;

// 3D Interactive Arc Reactor Assembly (Stark / Ultron MCU Professional Engine)
const InteractiveArcReactor3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const middleRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);

  const currentState = useThreatStore((s) => s.currentState);

  // Materials with dynamic color shift
  const [outerMat, middleMat, innerMat, coreMat] = useMemo(() => {
    const starkBlue = new THREE.Color('#38BDF8');
    const indigo = new THREE.Color('#6366F1');
    const gold = new THREE.Color('#F59E0B');

    const m1 = new THREE.MeshBasicMaterial({
      color: starkBlue,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const m2 = new THREE.MeshBasicMaterial({
      color: indigo,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const m3 = new THREE.MeshBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const m4 = new THREE.MeshBasicMaterial({
      color: starkBlue,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    return [m1, m2, m3, m4];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const isThreat = currentState === 'THREAT_LOGGED';
    const speedMult = isThreat ? 2.5 : 1.0;

    // Smooth 3D Perspective Tilt tracking mouse cursor
    if (groupRef.current) {
      const targetRotX = state.pointer.y * 0.4;
      const targetRotY = state.pointer.x * 0.6;

      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    }

    // Counter-rotating concentric rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.3 * speedMult;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -t * 0.5 * speedMult;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.8 * speedMult;
      const scalePulse = 1.0 + Math.sin(t * 4.0) * 0.05;
      innerRingRef.current.scale.set(scalePulse, scalePulse, scalePulse);
    }
    if (coreMeshRef.current) {
      const corePulse = 1.0 + Math.sin(t * 6.0) * 0.08;
      coreMeshRef.current.scale.set(corePulse, corePulse, corePulse);
    }

    // Color transition on threat trigger
    const targetColor = isThreat ? new THREE.Color('#F43F5E') : new THREE.Color('#38BDF8');
    outerMat.color.lerp(targetColor, 0.05);
    coreMat.color.lerp(targetColor, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Outer Ring 1 */}
      <mesh ref={outerRingRef} material={outerMat}>
        <torusGeometry args={[2.5, 0.04, 16, 100]} />
      </mesh>

      {/* Middle Ring 2 */}
      <mesh ref={middleRingRef} material={middleMat}>
        <torusGeometry args={[1.8, 0.05, 16, 80]} />
      </mesh>

      {/* Inner Ring 3 */}
      <mesh ref={innerRingRef} material={innerMat}>
        <torusGeometry args={[1.1, 0.06, 16, 60]} />
      </mesh>

      {/* Center Arc Energy Core */}
      <mesh ref={coreMeshRef} material={coreMat}>
        <sphereGeometry args={[0.45, 32, 32]} />
      </mesh>

      {/* 12 Radial Energy Node Spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0]}
            material={innerMat}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
          </mesh>
        );
      })}
    </group>
  );
};

// 3D Background Shader Plane for Page Depth
const BackgroundShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const location = useLocation();
  const path = location.pathname;
  const currentState = useThreatStore((s) => s.currentState);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uThreatLevel: { value: 0.0 },
        uPageMode: { value: 0 }, // 0: Story, 1: Matrix, 2: SOC, 3: Network, 4: Logs, 5: AttackLab
        uColorBase: { value: new THREE.Color('#08090D') },
        uColorBlue: { value: new THREE.Color('#38BDF8') },
        uColorIndigo: { value: new THREE.Color('#6366F1') },
        uColorEmerald: { value: new THREE.Color('#10B981') },
        uColorAmber: { value: new THREE.Color('#F59E0B') },
        uColorRose: { value: new THREE.Color('#F43F5E') }
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uThreatLevel;
        uniform int uPageMode;
        uniform vec3 uColorBase;
        uniform vec3 uColorBlue;
        uniform vec3 uColorIndigo;
        uniform vec3 uColorEmerald;
        uniform vec3 uColorAmber;
        uniform vec3 uColorRose;
        varying vec2 vUv;
        ${noiseGLSL}

        void main() {
          vec2 st = vUv;
          float time = uTime * 0.05;

          vec2 q = vec2(fbm(st * 2.0 + time + uMouse * 0.05), fbm(st * 2.0 + vec2(1.0)));
          vec2 r = vec2(fbm(st * 2.0 + 1.0*q + 0.1*time), fbm(st * 2.0 + 1.0*q + 0.08*time));
          float f = fbm(st * 2.0 + r);

          vec3 activeHue = uColorIndigo;
          if (uPageMode == 1) activeHue = uColorEmerald; // Matrix Green
          else if (uPageMode == 2) activeHue = uColorBlue; // SOC Blue
          else if (uPageMode == 3) activeHue = uColorBlue; // Network Scope
          else if (uPageMode == 4) activeHue = uColorIndigo; // Logs Stream
          else if (uPageMode == 5) activeHue = uColorAmber; // TX Lab Amber

          vec3 normalFlow = mix(uColorBase, activeHue * 0.22, f * f * 2.2);
          vec3 threatFlow = mix(uColorBase, uColorRose * 0.35, f * f * 2.5);

          vec3 finalColor = mix(normalFlow, threatFlow, uThreatLevel);

          // Radial vignette
          float dist = distance(vUv, vec2(0.5));
          finalColor *= smoothstep(0.95, 0.25, dist);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      mat.uniforms.uMouse.value.x += (state.pointer.x - mat.uniforms.uMouse.value.x) * 0.05;
      mat.uniforms.uMouse.value.y += (state.pointer.y - mat.uniforms.uMouse.value.y) * 0.05;

      const pageIdx = path === '/matrix' ? 1 : path === '/monitoring' ? 2 : path === '/network' ? 3 : path === '/logs' ? 4 : path === '/attack-lab' ? 5 : 0;
      mat.uniforms.uPageMode.value = pageIdx;

      const targetThreat = currentState === 'THREAT_LOGGED' ? 1.0 : (currentState === 'ANALYZING' ? 0.3 : 0.0);
      mat.uniforms.uThreatLevel.value += (targetThreat - mat.uniforms.uThreatLevel.value) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[14, 8]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

// 3D Particle Dispersion Field
const ParticlesLayer = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38BDF8'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#10B981'),
      new THREE.Color('#F59E0B'),
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
        <BackgroundShaderPlane />
        <InteractiveArcReactor3D />
        <ParticlesLayer />
      </Canvas>
    </div>
  );
};
