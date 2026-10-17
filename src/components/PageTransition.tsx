import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Smooth page transition wrapper with direction-aware slide + fade + scale
 * for that premium SPA feel.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, scale: 0.99, filter: 'blur(4px)' }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 26,
          mass: 0.5,
          filter: { type: 'tween', duration: 0.25, ease: 'easeOut' },
        }}
        style={{ willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
