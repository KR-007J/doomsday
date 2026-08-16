import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

const GoogleDeepMindAmbientField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  // Custom shader using Google DeepMind Ambient Slate & Trust Blue color psychology
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThreatLevel: { value: 0.0 },
        // Google Color Psychology Spectrum
        uColorBase: { value: new THREE.Color('#0B0F19') },        // Deep Slate Canvas
        uColorTrustBlue: { value: new THREE.Color('#1A73E8') },   // Google Trust Blue
        uColorEmerald: { value: new THREE.Color('#0F9D58') },     // Safe Emerald Green
        uColorCoral: { value: new THREE.Color('#EA4335') }        // Threat Coral Red
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
        uniform vec3 uColorTrustBlue;
        uniform vec3 uColorEmerald;
        uniform vec3 uColorCoral;
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
          vec2 st = vUv * 2.5;
          float time = uTime * 0.08;
          
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.05*time);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);

          float f = fbm(st+r);

          // Google Psychology Color Integration:
          // Default State: Soft Trust Blue ambient flow
          // Threat State: Shift to Amber/Coral Alert flow
          vec3 safeFlow = mix(uColorBase, uColorTrustBlue * 0.18, f * f * 2.0);
          vec3 threatFlow = mix(uColorBase, uColorCoral * 0.25, f * f * 2.5);
          
          vec3 finalColor = mix(safeFlow, threatFlow, uThreatLevel);
          
          // Subtle Google radial glow from top center
          float topGlow = smoothstep(1.0, 0.0, distance(vUv, vec2(0.5, 1.0)));
          finalColor += uColorTrustBlue * 0.06 * topGlow;
          
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
        <GoogleDeepMindAmbientField />
      </Canvas>
    </div>
  );
};
