import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Animated number counter that activates when scrolled into view.
 * Uses easeOut for a fast start that decelerates — feels premium.
 */
export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(() => (reducedMotion ? end : 0));

  useEffect(() => {
    if (!isInView || reducedMotion) {
      return;
    }

    let startTime: number;
    let animId: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, end, duration, reducedMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
