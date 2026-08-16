import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

const Top10RefinedAmbientField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  // Custom WebGL shader inspired by Stripe & Linear ambient mesh gradients
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThreatLevel: { value: 0.0 },
        // Top 10 World-Class Palette: Midnight Slate, Electric Indigo, Organic Emerald, Rose Crimson
        uColorBase: { value: new THREE.Color('#08090D') },        
        uColorIndigo: { value: new THREE.Color('#6366F1') },      
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
        uniform float uThreatLevel;
        uniform vec3 uColorBase;
        uniform vec3 uColorIndigo;
        uniform vec3 uColorEmerald;
        uniform vec3 uColorRose;
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
          vec2 st = vUv * 2.0;
          float time = uTime * 0.05;
          
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.03*time);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.10*time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.08*time);

          float f = fbm(st+r);

          // Top 10 Ambient Integration:
          // Default State: Deep indigo & emerald silk ambient flow
          // Threat State: Shift to Rose Crimson flow
          vec3 safeFlow = mix(uColorBase, uColorIndigo * 0.25, f * f * 2.2);
          safeFlow += uColorEmerald * 0.05 * f;
          
          vec3 threatFlow = mix(uColorBase, uColorRose * 0.30, f * f * 2.5);
          
          vec3 finalColor = mix(safeFlow, threatFlow, uThreatLevel);
          
          // Subtle top radial spotlight (Linear/Apple gradient backdrop)
          float topGlow = smoothstep(1.0, 0.0, distance(vUv, vec2(0.5, 1.0)));
          finalColor += uColorIndigo * 0.10 * topGlow;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      
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

export const CinematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 90 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance' }}
      >
        <Top10RefinedAmbientField />
      </Canvas>
    </div>
  );
};
