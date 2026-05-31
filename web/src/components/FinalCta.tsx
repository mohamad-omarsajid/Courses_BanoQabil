import { ArrowRight, BookOpen, Mail } from 'lucide-react';
import { useLang } from '../lib/i18n';
import Flourish from './ui/Flourish';
import Reveal from './bits/Reveal';

export default function FinalCta() {
  const { t } = useLang();

  return (
    <section id="start" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:py-24">
      <Reveal
        className="relative isolate mx-auto max-w-[1100px] overflow-hidden rounded-3xl px-6 py-14 text-center text-white shadow-4 sm:px-10 lg:py-20"
      >
        <div
          className="absolute inset-0 -z-20"
          style={{
            background:
              'radial-gradient(60% 90% at 15% 8%, color-mix(in oklab, var(--t-400) 42%, transparent), transparent 60%), radial-gradient(55% 85% at 92% 88%, color-mix(in oklab, var(--t-300) 24%, transparent), transparent 60%), linear-gradient(135deg, var(--t-800), var(--t-950))',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
            maskImage: 'radial-gradient(75% 75% at 50% 30%, #000, transparent 90%)',
          }}
        />

        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">{t('cta.kicker')}</p>
        <h2 className="mx-auto mt-3 max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-balance">
          {t('cta.h2a')} <span className="font-display font-semibold italic text-teal-200">{t('cta.h2flourish')}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-white/85 text-pretty">{t('cta.body')}</p>

        <div className="mx-auto mt-8 flex max-w-[520px] flex-col items-stretch justify-center gap-2.5 sm:flex-row">
          <a
            href="/frontend/"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[14.5px] font-semibold text-teal-700 shadow-2 transition-transform hover:scale-[1.02] active:scale-100"
          >
            <BookOpen size={16} strokeWidth={2} />
            {t('cta.submit')}
          </a>
          <a
            href="mailto:hello@banoqabilsahiwal.org?subject=Bano%20Qabil%20course%20question"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 text-[14.5px] font-semibold text-white shadow-2 transition-colors hover:bg-white/15"
          >
            <Mail size={16} strokeWidth={2} />
            Contact
          </a>
        </div>

        <p className="mt-4 text-[13px] text-white/60">{t('cta.fineprint')}</p>

        <div className="mt-7">
          <a
            href="#courses"
            className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
          >
            {t('cta.secondary')}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
