import { useEffect, useRef, useState } from "react";

/**
 * Animated counter hook — counts from 0 to `target` over `duration` ms.
 * Returns the current displayed value.
 */
export function useAnimatedCounter(
  target: number,
  duration = 1200,
  decimals = 0,
): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number>(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }

    start.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setValue(
        decimals > 0
          ? parseFloat(current.toFixed(decimals))
          : Math.round(current),
      );

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, decimals]);

  return value;
}
