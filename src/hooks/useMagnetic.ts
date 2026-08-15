import { useRef, useEffect } from 'react';

export function useMagnetic<T extends HTMLElement>(strength: number = 0.3) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Magnetic radius boundary check
      const radius = Math.max(rect.width, rect.height) * 1.5;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < radius) {
        const moveX = distanceX * strength;
        const moveY = distanceY * strength;
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
      } else {
        el.style.transform = `translate3d(0px, 0px, 0px)`;
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = `translate3d(0px, 0px, 0px)`;
    };

    el.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
