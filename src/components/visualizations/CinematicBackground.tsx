import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

const FluidEnergyField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  // Custom shader for cinematic liquid energy background
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#00FF9D') }, // Safe Green
        uColor2: { value: new THREE.Color('#004422') },
        uThreatLevel: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uThreatLevel;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i); // Avoid truncation effects in permutation
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          // Dynamic scale based on threat
          float scale = 3.0 + (uThreatLevel * 2.0);
          
          // Layered noise for fluid effect
          float n1 = snoise(vUv * scale + uTime * 0.2);
          float n2 = snoise(vUv * (scale * 2.0) - uTime * 0.3);
          float n3 = snoise(vUv * (scale * 4.0) + uTime * 0.1);
          
          float totalNoise = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
          
          // Map noise to color gradient
          float mixVal = smoothstep(-1.0, 1.0, totalNoise);
          
          // Determine target colors based on threat level
          vec3 safeCol1 = vec3(0.0, 1.0, 0.61);    // #00FF9D
          vec3 safeCol2 = vec3(0.0, 0.2, 0.1);     // Dark emerald
          
          vec3 threatCol1 = vec3(1.0, 0.16, 0.16); // #FF2A2A
          vec3 threatCol2 = vec3(0.4, 0.0, 0.0);   // Dark crimson
          
          vec3 col1 = mix(safeCol1, threatCol1, uThreatLevel);
          vec3 col2 = mix(safeCol2, threatCol2, uThreatLevel);
          
          vec3 finalColor = mix(col2, col1, mixVal);
          
          // Add a dark vignette
          float dist = distance(vUv, vec2(0.5));
          float vignette = smoothstep(0.8, 0.2, dist);
          
          gl_FragColor = vec4(finalColor * vignette * 0.6, 1.0);
        }
      `
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smoothly interpolate threat level uniform
      const targetThreat = currentState === 'THREAT_LOGGED' ? 1.0 : (currentState === 'ANALYZING' ? 0.4 : 0.0);
      mat.uniforms.uThreatLevel.value += (targetThreat - mat.uniforms.uThreatLevel.value) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-canvas overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }}
        dpr={[1, 2]} // Optimize for high DPI
        gl={{ powerPreference: 'high-performance' }}
      >
        <FluidEnergyField />
      </Canvas>
      {/* Subtle overlay grid to retain the technical feel over the fluid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay" />
    </div>
  );
};
