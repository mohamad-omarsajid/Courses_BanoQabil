import type { ReactNode } from 'react';

/**
 * The emphasised flourish word in headlines. Sora, italic, teal (no script
 * face), per the project's design decision.
 */
export default function Flourish({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-display font-semibold italic text-teal-600 dark:text-teal-300 ${className}`}>
      {children}
    </span>
  );
}
