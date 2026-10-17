import { profile } from '../data/profile';
import './Monogram.css';

interface MonogramProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

/**
 * Geometric monogram inspired by data points and connected nodes.
 * Uses the initials from the profile configuration.
 */
export function Monogram({ size = 40, className = '', variant = 'default' }: MonogramProps) {
  const initials = profile.initials;

  return (
    <div
      className={`monogram monogram--${variant} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${profile.name} monogram`}
      role="img"
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mono-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--violet-500)" />
            <stop offset="100%" stopColor="var(--cyan-400)" />
          </linearGradient>
          <linearGradient id="mono-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--violet-400)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--cyan-400)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Background hexagonal shape */}
        <polygon
          points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
          fill="url(#mono-grad-subtle)"
          stroke="url(#mono-grad)"
          strokeWidth="2"
          className="monogram__shape"
        />

        {/* Connected data nodes */}
        <circle cx="30" cy="35" r="3" fill="url(#mono-grad)" className="monogram__node" />
        <circle cx="70" cy="35" r="3" fill="url(#mono-grad)" className="monogram__node" />
        <circle cx="50" cy="70" r="3" fill="url(#mono-grad)" className="monogram__node" />
        <circle cx="50" cy="30" r="2" fill="url(#mono-grad)" opacity="0.5" />

        {/* Connection lines */}
        <line x1="30" y1="35" x2="70" y2="35" stroke="url(#mono-grad)" strokeWidth="0.8" opacity="0.4" />
        <line x1="30" y1="35" x2="50" y2="70" stroke="url(#mono-grad)" strokeWidth="0.8" opacity="0.4" />
        <line x1="70" y1="35" x2="50" y2="70" stroke="url(#mono-grad)" strokeWidth="0.8" opacity="0.4" />

        {/* Initials */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          dominantBaseline="central"
          fill="url(#mono-grad)"
          fontFamily="var(--font-display)"
          fontSize="24"
          fontWeight="700"
          className="monogram__text"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
