import type { ReactNode } from 'react';

/**
 * React Bits style shiny text: a soft highlight sweeps across the letters.
 * Pure CSS so it costs nothing on the main thread.
 */
export default function ShinyText({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(110deg, currentColor 35%, color-mix(in oklab, var(--primary) 90%, #fff) 50%, currentColor 65%)',
        backgroundSize: '220% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </span>
  );
}
