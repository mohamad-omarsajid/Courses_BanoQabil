import { useEffect, useRef, type ReactNode, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
};

/**
 * Generic scroll reveal: rises and fades in once when it enters the viewport.
 * Used for cards, paragraphs, and section headers. Reduced motion shows the
 * content immediately.
 */
export default function Reveal({ children, className = '', delay = 0, y = 28, as }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as || 'div') as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y]);

  return (
    <Tag ref={ref as any} className={className} data-anim="hide">
      {children}
    </Tag>
  );
}
