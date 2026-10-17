import type { ReactNode, CSSProperties } from 'react';
import { motion, type Variants } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';

type RevealVariant = 'fade' | 'slide' | 'scale' | 'flip' | 'blur' | 'elastic' | 'rotate' | 'drop';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  variant?: RevealVariant;
  /** Stagger children with this delay between each */
  staggerChildren?: number;
  /** Distance of the initial offset (px) */
  distance?: number;
  /** Duration override in seconds */
  duration?: number;
  /** Whether to keep animating each time it enters viewport */
  once?: boolean;
}

/**
 * Premium scroll-reveal wrapper with multiple animation variants,
 * stagger support, and spring physics for natural motion.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = '',
  style,
  direction = 'up',
  variant = 'fade',
  staggerChildren,
  distance = 40,
  duration,
  once = true,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  // Build variant-specific initial/animate states
  const getVariantProps = (): { initial: Record<string, any>; animate: Record<string, any>; transition: Record<string, any> } => {
    const baseTransition = {
      type: 'spring' as const,
      stiffness: 120,
      damping: 18,
      mass: 0.6,
      delay: delay / 1000,
    };

    switch (variant) {
      case 'slide':
        return {
          initial: { opacity: 0, x: offset.x, y: offset.y },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { ...baseTransition, stiffness: 100, damping: 15 },
        };

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8, x: offset.x * 0.3, y: offset.y * 0.3 },
          animate: { opacity: 1, scale: 1, x: 0, y: 0 },
          transition: { ...baseTransition, stiffness: 150, damping: 20 },
        };

      case 'flip':
        return {
          initial: {
            opacity: 0,
            rotateX: direction === 'up' || direction === 'down' ? 25 : 0,
            rotateY: direction === 'left' || direction === 'right' ? 25 : 0,
            y: offset.y * 0.6,
            x: offset.x * 0.6,
            scale: 0.92,
          },
          animate: { opacity: 1, rotateX: 0, rotateY: 0, y: 0, x: 0, scale: 1 },
          transition: { ...baseTransition, stiffness: 90, damping: 14, mass: 0.7 },
        };

      case 'blur':
        return {
          initial: { opacity: 0, filter: 'blur(12px)', y: offset.y * 0.5, x: offset.x * 0.5, scale: 0.95 },
          animate: { opacity: 1, filter: 'blur(0px)', y: 0, x: 0, scale: 1 },
          transition: {
            ...baseTransition,
            filter: { type: 'tween', duration: duration ?? 0.6, ease: [0.16, 1, 0.3, 1] },
          },
        };

      case 'elastic':
        return {
          initial: { opacity: 0, scale: 0.5, y: offset.y },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { type: 'spring', stiffness: 200, damping: 10, mass: 0.5, delay: delay / 1000 },
        };

      case 'rotate':
        return {
          initial: { opacity: 0, rotate: direction === 'left' ? -12 : 12, y: offset.y, scale: 0.9 },
          animate: { opacity: 1, rotate: 0, y: 0, scale: 1 },
          transition: { ...baseTransition, stiffness: 100, damping: 16 },
        };

      case 'drop':
        return {
          initial: { opacity: 0, y: -60, scale: 0.85 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { type: 'spring', stiffness: 180, damping: 14, mass: 0.8, delay: delay / 1000 },
        };

      case 'fade':
      default:
        return {
          initial: { opacity: 0, x: offset.x, y: offset.y, scale: 0.96 },
          animate: { opacity: 1, x: 0, y: 0, scale: 1 },
          transition: baseTransition,
        };
    }
  };

  const { initial, animate, transition } = getVariantProps();

  // If staggerChildren is set, use a container variant
  if (staggerChildren) {
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerChildren / 1000,
          delayChildren: delay / 1000,
        },
      },
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-30px' }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: '-30px' }}
      transition={transition}
      className={className}
      style={{ ...style, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wrap individual children for use inside a staggered ScrollReveal parent.
 */
export function StaggerItem({
  children,
  className = '',
  style,
  direction = 'up',
  distance = 30,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset, scale: 0.95 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 120,
            damping: 16,
            mass: 0.6,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
