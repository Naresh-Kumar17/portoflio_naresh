import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useReducedMotion } from '../hooks/useAnimations';
import './CursorGlow.css';

/**
 * Premium interactive cursor glow that follows the mouse with spring physics
 * and responds to interactive elements with morphing effects.
 */
export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reducedMotion) return;

    // Only show on non-touch devices
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [role="tab"], [role="button"], input, textarea, select, .magnetic-card, .project-card, .roadmap-card, .home-skill-chip, .skill-item, .timeline__item, .projects-pill, .status-btn');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [reducedMotion, cursorX, cursorY, isVisible]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className={`cursor-glow ${isHovering ? 'cursor-glow--hover' : ''} ${isClicking ? 'cursor-glow--click' : ''}`}
      style={{
        x,
        y,
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <div className="cursor-glow__inner" />
      <div className="cursor-glow__ring" />
    </motion.div>
  );
}
