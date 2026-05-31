import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** start the reveal on scroll-in rather than immediately */
  onScroll?: boolean;
  /** split by 'word' (default) or 'char' */
  by?: 'word' | 'char';
  as?: 'span' | 'h1' | 'h2' | 'h3';
  /** when false, stay hidden and do not animate yet (used to wait for preloader) */
  play?: boolean;
};

/**
 * React Bits style split-text reveal. Each unit rises and fades in with a
 * gentle stagger. Falls back to plain visible text under reduced motion.
 */
export default function SplitText({
  text,
  className = '',
  delay = 0,
  onScroll = false,
  by = 'word',
  as = 'span',
  play = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { autoAlpha: 1 });
      el.querySelectorAll<HTMLElement>('[data-unit]').forEach((u) => gsap.set(u, { yPercent: 0, opacity: 1 }));
      return;
    }
    if (!play) return;

    const units = el.querySelectorAll<HTMLElement>('[data-unit]');
    gsap.set(el, { autoAlpha: 1 });

    // Explicit fromTo (not from) so the target stays opacity 1 even if React
    // StrictMode mounts the effect twice and an earlier tween left units at 0.
    const tween = gsap.fromTo(
      units,
      { yPercent: 120, opacity: 0, rotate: by === 'char' ? 0 : 1 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: by === 'char' ? 0.022 : 0.06,
        delay,
        scrollTrigger: onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, delay, onScroll, by, play]);

  const units = by === 'char' ? Array.from(text) : text.split(' ');
  const Tag = as as any;

  return (
    <Tag ref={ref as any} className={className} style={{ visibility: 'hidden' }} aria-label={text}>
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span data-unit style={{ display: 'inline-block', willChange: 'transform' }}>
            {u === ' ' ? ' ' : u}
          </span>
          {by === 'word' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
