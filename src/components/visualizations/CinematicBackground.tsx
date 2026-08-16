import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

const GodLevelFluidField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  // Custom shader for an ultra-premium, dark, fluid WebGL simulation
  // Designed to look like expensive physical glass/fluid rather than a glowing neon screen.
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThreatLevel: { value: 0.0 },
        // Claude Code / Anthropic highly muted colors
        uColorBase: { value: new THREE.Color('#0A0A0C') }, // Deep obsidian
        uColorSafeFlow: { value: new THREE.Color('#141816') }, // Almost imperceptible sage/gray tint
        uColorThreatFlow: { value: new THREE.Color('#1F1414') } // Almost imperceptible warm/crimson tint
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
        uniform vec3 uColorSafeFlow;
        uniform vec3 uColorThreatFlow;
        varying vec2 vUv;
        
        // Classic FBM noise for silky, liquid-like fluid motion
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
            float frequency = 0.;
            for (int i = 0; i < 6; i++) {
                value += amplitude * noise(st);
                st *= 2.;
                amplitude *= .5;
            }
            return value;
        }

        void main() {
          vec2 st = vUv * 3.0; // Scale
          
          // Domain warping for liquid silk effect
          vec2 q = vec2(0.);
          q.x = fbm( st + 0.00*uTime);
          q.y = fbm( st + vec2(1.0));

          vec2 r = vec2(0.);
          r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime );
          r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime);

          float f = fbm(st+r);

          // Blend colors based on threat state
          vec3 flowColor = mix(uColorSafeFlow, uColorThreatFlow, uThreatLevel);
          
          // Mix base and flow based on the warped noise
          vec3 finalColor = mix(uColorBase, flowColor, clamp((f*f)*4.0, 0.0, 1.0));
          
          // Extremely subtle vignette to draw focus to center panels
          float dist = distance(vUv, vec2(0.5));
          finalColor = mix(finalColor, vec3(0.02, 0.02, 0.03), dist * 0.8);
          
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
      mat.uniforms.uThreatLevel.value += (targetThreat - mat.uniforms.uThreatLevel.value) * 0.02;
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
        dpr={[1, 2]} // High DPI for smooth silk edges
        gl={{ powerPreference: 'high-performance' }}
      >
        <GodLevelFluidField />
      </Canvas>
    </div>
  );
};
