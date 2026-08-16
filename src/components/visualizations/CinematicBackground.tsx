import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

// Google Gemini Multi-Color Aurora Mesh Shader
const GeminiAuroraMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uThreatLevel: { value: 0.0 },
        // Google Gemini Signature Aurora Palette
        uColorBase: { value: new THREE.Color('#08090D') },        // Midnight Space
        uColorGeminiBlue: { value: new THREE.Color('#4285F4') },  // Google Blue
        uColorGeminiViolet: { value: new THREE.Color('#9B51E0') },// Gemini Purple
        uColorGeminiCoral: { value: new THREE.Color('#FF6B6B') }, // Warm Coral
        uColorGeminiGreen: { value: new THREE.Color('#34A853') }  // Emerald Flow
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
        uniform vec3 uColorBase;
        uniform vec3 uColorGeminiBlue;
        uniform vec3 uColorGeminiViolet;
        uniform vec3 uColorGeminiCoral;
        uniform vec3 uColorGeminiGreen;
        varying vec2 vUv;
        
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

        void main() {
          vec2 st = vUv * 2.2;
          float time = uTime * 0.05;
          
          // Domain warping for Gemini liquid silk movement
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.04*time + uMouse * 0.1);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.12*time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.10*time);

          float f = fbm(st+r);

          // Gemini Aurora Gradient Synthesis:
          vec3 geminiFlow = mix(uColorBase, uColorGeminiBlue * 0.25, f * f * 2.2);
          geminiFlow = mix(geminiFlow, uColorGeminiViolet * 0.20, sin(time + f * 3.0) * 0.5 + 0.5);
          geminiFlow += uColorGeminiGreen * 0.05 * f;
          
          // Threat state alert warp
          vec3 threatFlow = mix(uColorBase, uColorGeminiCoral * 0.35, f * f * 2.5);
          
          vec3 finalColor = mix(geminiFlow, threatFlow, uThreatLevel);
          
          // Cursor interaction aura ring
          float mouseDist = distance(vUv, uMouse * 0.5 + 0.5);
          float mouseGlow = smoothstep(0.4, 0.0, mouseDist);
          finalColor += uColorGeminiBlue * 0.12 * mouseGlow;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly update cursor position uniform
      mat.uniforms.uMouse.value.x += (state.pointer.x - mat.uniforms.uMouse.value.x) * 0.08;
      mat.uniforms.uMouse.value.y += (state.pointer.y - mat.uniforms.uMouse.value.y) * 0.08;

      const targetThreat = currentState === 'THREAT_LOGGED' ? 1.0 : (currentState === 'ANALYZING' ? 0.3 : 0.0);
      mat.uniforms.uThreatLevel.value += (targetThreat - mat.uniforms.uThreatLevel.value) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

// Interactive 3D Particle Field with Cursor Repulsion Physics
const GeminiInteractiveParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 750;

  // Initialize original particle positions and velocity vectors
  const [positions, initialPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorOptions = [
      new THREE.Color('#4285F4'), // Gemini Blue
      new THREE.Color('#9B51E0'), // Gemini Violet
      new THREE.Color('#34A853'), // Emerald
      new THREE.Color('#F4B400'), // Amber
      new THREE.Color('#F8FAFC')  // White Star
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, initPos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;

    // Convert normalized mouse pointer to 3D space coordinates
    const mouseX = state.pointer.x * 6;
    const mouseY = state.pointer.y * 4;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      const px = posArr[idx];
      const py = posArr[idx + 1];

      const origX = initialPositions[idx];
      const origY = initialPositions[idx + 1];

      // Calculate distance between particle and mouse cursor
      const dx = px - mouseX;
      const dy = py - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulsion radius threshold (particles disperse when cursor gets close)
      const maxDist = 2.2;

      if (dist < maxDist && dist > 0.01) {
        const force = (maxDist - dist) / maxDist;
        const pushX = (dx / dist) * force * 0.12;
        const pushY = (dy / dist) * force * 0.12;

        posArr[idx] += pushX;
        posArr[idx + 1] += pushY;
      } else {
        // Smooth spring return to original position
        posArr[idx] += (origX - posArr[idx]) * 0.05;
        posArr[idx + 1] += (origY - posArr[idx + 1]) * 0.05;
      }

      // Gentle floating ambient wave motion
      posArr[idx + 1] += Math.sin(state.clock.elapsedTime + origX) * 0.0015;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.75}
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
        <GeminiAuroraMesh />
        <GeminiInteractiveParticles />
      </Canvas>
    </div>
  );
};
