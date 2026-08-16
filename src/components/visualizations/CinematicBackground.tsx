import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

const MinimalTopographyField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentState = useThreatStore((s) => s.currentState);
  
  // Custom shader for an elegant, minimalist monochromatic topography
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uThreatLevel: { value: 0.0 },
        uColorSafe: { value: new THREE.Color('#2A2A2D') }, // Hairline color
        uColorThreat: { value: new THREE.Color('#9E4D4D') } // Desaturated brick red
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
        uniform vec3 uColorSafe;
        uniform vec3 uColorThreat;
        varying vec2 vUv;
        
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
          i = mod289(i);
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
          // Slow, deliberate motion
          float time = uTime * 0.05;
          
          // Generate sweeping topographic lines
          float noise = snoise(vUv * 4.0 + time);
          noise += snoise(vUv * 8.0 - time * 1.5) * 0.5;
          
          // Create contour lines (modulo creates repeating bands)
          float contour = fract(noise * 8.0);
          // Make lines thin and sharp
          float line = smoothstep(0.0, 0.05, contour) - smoothstep(0.05, 0.1, contour);
          
          // Determine color based on threat
          vec3 baseColor = mix(uColorSafe, uColorThreat, uThreatLevel);
          
          // Subtle radial fade at edges
          float dist = distance(vUv, vec2(0.5));
          float vignette = smoothstep(0.8, 0.2, dist);
          
          gl_FragColor = vec4(baseColor * line * vignette * 0.5, 1.0);
        }
      `
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Interpolate threat level uniform smoothly
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
        dpr={[1, 2]}
        gl={{ powerPreference: 'low-power' }} // Efficiency over performance for this minimal background
      >
        <MinimalTopographyField />
      </Canvas>
      {/* We already have a CSS background grid, but this retains the z-index foundation */}
    </div>
  );
};
