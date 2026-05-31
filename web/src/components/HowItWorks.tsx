import { UserPlus, Play, MessageCircle, Award } from 'lucide-react';
import { useLang, type Key } from '../lib/i18n';
import Reveal from './bits/Reveal';
import SplitText from './bits/SplitText';

const steps: { n: string; icon: typeof UserPlus; title: Key; body: Key }[] = [
  { n: '01', icon: UserPlus, title: 'how.s1.t', body: 'how.s1.b' },
  { n: '02', icon: Play, title: 'how.s2.t', body: 'how.s2.b' },
  { n: '03', icon: MessageCircle, title: 'how.s3.t', body: 'how.s3.b' },
  { n: '04', icon: Award, title: 'how.s4.t', body: 'how.s4.b' },
];

export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how" className="scroll-mt-20 border-y border-line bg-bg-soft">
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <Reveal as="p" className="font-mono text-[12px] uppercase tracking-[0.06em] text-fg-muted">
            {t('how.kicker')}
          </Reveal>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
            <SplitText as="span" onScroll text={t('how.h2')} />
          </h2>
          <Reveal as="p" delay={0.1} className="mt-4 text-[16.5px] leading-relaxed text-fg-2 text-pretty">
            {t('how.lead')}
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-2">
              <span className="pointer-events-none absolute -right-2 -top-3 font-display text-[68px] font-bold leading-none text-[color-mix(in_oklab,var(--fg)_5%,transparent)]">
                {s.n}
              </span>
              <span className="relative grid size-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--primary)_13%,transparent)] text-primary-deep dark:text-primary">
                <s.icon size={20} strokeWidth={1.85} />
              </span>
              <h3 className="relative mt-5 font-display text-[19px] font-semibold tracking-tight">{t(s.title)}</h3>
              <p className="relative mt-2 text-[14.5px] leading-relaxed text-fg-2">{t(s.body)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
