import { motion } from 'motion/react';
import { Code2, Palette, Award, BarChart3, MessageCircle, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { useLang, type Key } from '../lib/i18n';
import CourseCard from './CourseCard';
import Flourish from './ui/Flourish';
import Reveal from './bits/Reveal';
import SplitText from './bits/SplitText';

const perks: { icon: typeof Award; key: Key }[] = [
  { icon: Award, key: 'perk.cert' },
  { icon: BarChart3, key: 'perk.streak' },
  { icon: MessageCircle, key: 'perk.whatsapp' },
  { icon: Sparkles, key: 'perk.showcase' },
];

export default function Courses() {
  const { t } = useLang();
  return (
    <section id="courses" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-2xl">
        <Reveal as="p" className="font-mono text-[12px] uppercase tracking-[0.06em] text-fg-muted">
          {t('courses.kicker')}
        </Reveal>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
          <SplitText as="span" onScroll text={t('courses.h2a')} />{' '}
          <Flourish>{t('courses.h2flourish')}</Flourish>
          {t('courses.h2b')}
        </h2>
        <Reveal as="p" delay={0.1} className="mt-4 text-[16.5px] leading-relaxed text-fg-2 text-pretty">
          {t('courses.lead')}
        </Reveal>
      </div>

      {/* Bento: two course cards + a future-courses tile */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <CourseCard
          icon={Code2}
          track={t('courses.c1.track')}
          titleLead={t('courses.c1.lead')}
          flourish={t('courses.c1.flourish')}
          tag={t('courses.c1.tag')}
          modules={t('courses.c1.modules')}
          bg="mesh"
          href="/frontend/"
        />
        <CourseCard
          icon={Palette}
          track={t('courses.c2.track')}
          titleLead={t('courses.c2.lead')}
          flourish={t('courses.c2.flourish')}
          tag={t('courses.c2.tag')}
          modules={t('courses.c2.modules')}
          bg="dots"
          href="/design/"
          statusLabel={t('courses.c2.status')}
          ctaLabel={t('courses.card.preview')}
          delay={0.1}
        />

        {/* More courses coming (future-proof, not tied to the two) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-dashed border-line-2 bg-surface-2/50 p-7"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
            style={{ background: 'color-mix(in oklab, var(--primary) 40%, transparent)' }}
          />
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--primary)_12%,transparent)] text-primary-deep dark:text-primary">
              <Plus size={24} strokeWidth={2} />
            </span>
            <h3 className="mt-5 font-display text-[22px] font-semibold tracking-tight">{t('courses.more.title')}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{t('courses.more.body')}</p>
          </div>
          <a
            href="mailto:hello@banoqabilsahiwal.org?subject=Course%20suggestion"
            className="group/cta mt-6 inline-flex items-center gap-2 self-start text-[14px] font-semibold text-primary-deep dark:text-primary"
          >
            {t('courses.more.cta')}
            <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Perks strip */}
      <Reveal
        as="ul"
        delay={0.1}
        className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-2 sm:grid-cols-4"
      >
        {perks.map((p, i) => (
          <li
            key={i}
            className={[
              'flex items-center gap-2.5 px-5 py-4 text-[13.5px] font-medium text-fg-2',
              i % 2 === 1 ? 'border-l border-line' : '',
              i >= 2 ? 'border-t border-line sm:border-t-0' : '',
              i % 4 !== 0 ? 'sm:border-l' : '',
            ].join(' ')}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color-mix(in_oklab,var(--primary)_12%,transparent)] text-primary-deep dark:text-primary">
              <p.icon size={16} strokeWidth={1.9} />
            </span>
            {t(p.key)}
          </li>
        ))}
      </Reveal>
    </section>
  );
}
