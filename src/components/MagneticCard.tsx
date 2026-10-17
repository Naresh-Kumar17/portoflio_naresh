import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';
import './MagneticCard.css';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  tiltIntensity?: number;
}

export function MagneticCard({
  children,
  className = '',
  onClick,
  tiltIntensity = 10,
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * tiltIntensity;

    setRotation({ x: rotateX, y: rotateY });
    setSpotlightPos({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      className={`magnetic-card ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
      }}
      whileTap={{ scale: 0.985 }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 22,
        mass: 0.6,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="magnetic-card__spotlight"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34, 211, 238, 0.14), rgba(139, 92, 246, 0.08) 35%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="magnetic-card__content">
        {children}
      </div>
    </motion.div>
  );
}
