import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useLang } from '../lib/i18n';

/**
 * Branded loading screen. A counter runs 0 to 100 (anime.js) while fonts and
 * the first paint settle, then the cover wipes upward and calls onDone so the
 * hero can play its reveal. Under reduced motion it finishes almost instantly.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counter = { v: 0 };

    const finish = () => {
      document.documentElement.classList.remove('is-loading');
      anime
        .timeline({
          easing: 'cubicBezier(.7,0,.3,1)',
          complete: () => {
            setGone(true);
            onDone();
          },
        })
        .add({ targets: '.pl-inner', opacity: [1, 0], translateY: [0, -24], duration: 420 })
        .add({ targets: rootRef.current, translateY: ['0%', '-100%'], duration: 680 }, '-=180');
    };

    if (reduce) {
      setPct(100);
      const id = window.setTimeout(finish, 250);
      return () => window.clearTimeout(id);
    }

    const anim = anime({
      targets: counter,
      v: 100,
      duration: 1700,
      easing: 'cubicBezier(.2,.7,.2,1)',
      update: () => {
        const val = Math.round(counter.v);
        setPct(val);
        if (barRef.current) barRef.current.style.transform = `scaleX(${val / 100})`;
      },
      complete: finish,
    });

    return () => anim.pause();
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <div className="pl-inner flex w-[min(86vw,420px)] flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-primary font-display text-[18px] font-bold text-primary-on shadow-2">
            B
          </span>
          <span className="font-display text-[20px] font-bold tracking-tight">
            Bano Qabil <span className="font-normal text-fg-muted">Sahiwal</span>
          </span>
        </div>

        <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg-muted">
          {t('load.tagline')}
        </p>

        <div className="mt-8 h-px w-full overflow-hidden bg-line-2">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-primary"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="mt-3 flex w-full items-baseline justify-between font-mono text-fg-2">
          <span className="text-[11px] uppercase tracking-[0.12em] text-fg-muted">loading</span>
          <span className="font-display text-[34px] font-semibold tabular-nums tracking-tight">
            {pct}
            <span className="text-[18px] text-fg-muted">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
