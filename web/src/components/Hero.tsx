import Snowfall from 'react-snowfall';
import { Sparkles } from 'lucide-react';
import { useLang } from '../lib/i18n';
import { useReducedMotion } from '../lib/useReducedMotion';
import SplitText from './bits/SplitText';
import Magnetic from './bits/Magnetic';
import ShimmerButton from './bits/ShimmerButton';

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cool winter backdrop (hero keeps its own palette in both themes) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 75% at 50% -12%, #1a5f68 0%, transparent 58%), radial-gradient(80% 50% at 80% 8%, rgba(56,211,191,0.28), transparent 60%), linear-gradient(180deg, #0a2e36 0%, #0c3a42 48%, #0e453f 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2"
        style={{ background: 'radial-gradient(60% 100% at 50% 120%, rgba(143,233,255,0.18), transparent 70%)' }}
      />

      {/* Snow overlay */}
      {!reduce && ready && (
        <Snowfall
          snowflakeCount={95}
          color="#eaf7ff"
          radius={[0.6, 2.4]}
          speed={[0.4, 1.1]}
          wind={[-0.3, 0.6]}
          style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }}
        />
      )}

      {/* Heading + one button, centered */}
      <div className="relative z-10 flex w-full max-w-[900px] flex-col items-center px-5 pb-16 text-center sm:px-8">
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-white text-balance">
          <SplitText as="span" text={t('hero.h1a')} play={ready} delay={0.1} />{' '}
          <SplitText as="span" text={t('hero.h1flourish')} className="italic text-teal-300" play={ready} delay={0.24} />{' '}
          <SplitText as="span" text={t('hero.h1b')} play={ready} delay={0.38} />
        </h1>

        <div
          className="mt-10"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'none' : 'translateY(14px)',
            transition: 'opacity .7s .7s var(--ease-brand), transform .7s .7s var(--ease-brand)',
          }}
        >
          <Magnetic strength={0.35}>
            <ShimmerButton href="#courses">
              <Sparkles size={18} strokeWidth={2} />
              {t('hero.cta1')}
            </ShimmerButton>
          </Magnetic>
        </div>
      </div>

      {/* bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-28"
        style={{ background: 'linear-gradient(180deg, transparent, color-mix(in oklab, var(--bg) 92%, transparent))' }}
      />
    </section>
  );
}
