import { useState, useEffect, useRef } from 'react';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export function useFps() {
  const [fps, setFps] = useState<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const lowFpsCountRef = useRef<number>(0);

  const toggleSafeDemoMode = useThreatStore((s) => s.toggleSafeDemoMode);
  const safeDemoMode = useThreatStore((s) => s.safeDemoMode);

  useEffect(() => {
    let animationFrameId: number;

    const measure = () => {
      frameCountRef.current++;
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);

        // Auto FPS Guardrail: if FPS < 30 for 3 seconds, auto fallback to Safe Demo Mode
        if (currentFps < 30 && !safeDemoMode) {
          lowFpsCountRef.current++;
          if (lowFpsCountRef.current >= 3) {
            console.warn('[FPS Guardrail] Framerate dropped below 30fps. Activating Safe Demo Mode CSS fallback.');
            toggleSafeDemoMode(true);
          }
        } else {
          lowFpsCountRef.current = 0;
        }

        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameId = requestAnimationFrame(measure);
    };

    animationFrameId = requestAnimationFrame(measure);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [safeDemoMode, toggleSafeDemoMode]);

  return fps;
}
