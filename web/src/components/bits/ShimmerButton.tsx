import type { ReactNode } from 'react';

/**
 * Appealing primary CTA (React Bits / Magic UI style): a teal pill with a
 * slowly rotating shimmer ring, a soft glow, a sweeping highlight, and a lift
 * on hover. Pure CSS, no extra deps.
 */
export default function ShimmerButton({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex h-[58px] items-center justify-center overflow-hidden rounded-full p-[2px] transition-transform duration-300 hover:scale-[1.04] active:scale-[1.01] ${className}`}
      style={{ boxShadow: '0 14px 40px -10px rgba(15,171,149,0.65)' }}
    >
      {/* rotating shimmer ring */}
      <span
        aria-hidden="true"
        className="shimmer-ring absolute inset-[-150%]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #5fd9c5 70deg, transparent 130deg)',
        }}
      />
      {/* inner pill */}
      <span
        className="relative z-10 inline-flex h-full items-center gap-2.5 rounded-full px-8 text-[16px] font-semibold text-white"
        style={{ background: 'linear-gradient(180deg, #15c0a8 0%, #0a8a78 100%)' }}
      >
        {/* sweeping highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)',
            backgroundSize: '220% 100%',
            animation: 'shine 1.6s linear infinite',
          }}
        />
        {children}
      </span>
    </a>
  );
}
