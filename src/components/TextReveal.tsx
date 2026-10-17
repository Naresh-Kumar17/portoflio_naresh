import { motion, type Variants } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  /** 'word' splits by word, 'char' by character */
  splitBy?: 'word' | 'char';
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.035,
      delayChildren: delay / 1000,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 40,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 16,
      mass: 0.5,
      filter: { type: 'tween', duration: 0.3, ease: 'easeOut' },
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 14,
      mass: 0.4,
    },
  },
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Premium text reveal animation that splits text into words or characters
 * and animates each with staggered spring physics for cinematic reveals.
 */
export function TextReveal({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  splitBy = 'word',
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motionTags[Tag] || motion.span;
  const pieces = splitBy === 'word' ? text.split(' ') : text.split('');
  const variants = splitBy === 'word' ? wordVariants : charVariants;

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      custom={delay}
      style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0.3em' : 0, perspective: 600 }}
    >
      {pieces.map((piece, i) => (
        <motion.span
          key={`${piece}-${i}`}
          variants={variants}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {piece}
          {splitBy === 'char' && piece === ' ' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}
