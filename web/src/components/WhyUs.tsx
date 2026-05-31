import { Gift, HeartHandshake, Languages } from 'lucide-react';
import { useLang, type Key } from '../lib/i18n';
import LessonPreview from './LessonPreview';
import HelpWidget from './HelpWidget';
import Flourish from './ui/Flourish';
import Reveal from './bits/Reveal';
import SplitText from './bits/SplitText';

const cards: { icon: typeof Gift; tint: 'teal' | 'coral'; title: Key; body: Key }[] = [
  { icon: Gift, tint: 'teal', title: 'why.c1.t', body: 'why.c1.b' },
  { icon: HeartHandshake, tint: 'coral', title: 'why.c2.t', body: 'why.c2.b' },
  { icon: Languages, tint: 'teal', title: 'why.c3.t', body: 'why.c3.b' },
];

export default function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" className="mx-auto max-w-[1240px] scroll-mt-20 px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-2xl">
        <Reveal as="p" className="font-mono text-[12px] uppercase tracking-[0.06em] text-fg-muted">
          {t('why.kicker')}
        </Reveal>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
          <SplitText as="span" onScroll text={t('why.h2a')} />{' '}
          <Flourish>{t('why.h2flourish')}</Flourish> {t('why.h2b')}
        </h2>
        <Reveal as="p" delay={0.1} className="mt-4 text-[16.5px] leading-relaxed text-fg-2 text-pretty">
          {t('why.lead')}
        </Reveal>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 0.1} className="rounded-2xl border border-line bg-surface p-6 shadow-2">
            <span
              className={`grid size-11 place-items-center rounded-xl ${
                c.tint === 'coral' ? 'text-accent-hover' : 'text-primary-deep dark:text-primary'
              }`}
              style={{
                background:
                  c.tint === 'coral'
                    ? 'color-mix(in oklab, var(--accent) 12%, transparent)'
                    : 'color-mix(in oklab, var(--primary) 12%, transparent)',
              }}
            >
              <c.icon size={22} strokeWidth={1.85} />
            </span>
            <h3 className="mt-4 font-display text-[20px] font-semibold tracking-tight">{t(c.title)}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{t(c.body)}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8 rounded-3xl border border-line bg-bg-soft p-5 sm:p-7">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{t('lesson.intro')}</p>
        <div className="grid items-start gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <LessonPreview />
          <HelpWidget />
        </div>
      </Reveal>
    </section>
  );
}
