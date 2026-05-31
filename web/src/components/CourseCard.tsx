import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { ArrowRight, Sprout, Infinity as InfinityIcon, type LucideIcon } from 'lucide-react';
import { useLang } from '../lib/i18n';

type Props = {
  icon: LucideIcon;
  track: string;
  titleLead: string;
  flourish: string;
  tag: string;
  modules: string;
  bg: 'mesh' | 'dots';
  href: string;
  statusLabel?: string;
  ctaLabel?: string;
  delay?: number;
};

const backgrounds: Record<Props['bg'], string> = {
  mesh: `radial-gradient(60% 70% at 24% 22%, var(--t-300), transparent 60%),
         radial-gradient(60% 65% at 84% 74%, var(--c-400), transparent 60%),
         linear-gradient(135deg, var(--t-600), var(--t-800))`,
  dots: `radial-gradient(circle at 24% 28%, rgba(255,255,255,0.34) 0 7px, transparent 7.5px),
         radial-gradient(circle at 70% 66%, rgba(255,255,255,0.26) 0 12px, transparent 12.5px),
         radial-gradient(circle at 86% 26%, rgba(255,255,255,0.2) 0 16px, transparent 16.5px),
         linear-gradient(135deg, var(--t-700), #14302e)`,
};

export default function CourseCard({
  icon: Icon,
  track,
  titleLead,
  flourish,
  tag,
  modules,
  bg,
  href,
  statusLabel,
  ctaLabel,
  delay = 0,
}: Props) {
  const { t } = useLang();
  const meta = [modules, t('courses.meta.selfpaced'), t('courses.meta.free')];

  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${px}px ${py}px, color-mix(in oklab, var(--primary) 16%, transparent), transparent 72%)`;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={`${t('courses.card.explore')}: ${titleLead}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative isolate flex cursor-pointer flex-col overflow-hidden rounded-[26px] border border-line bg-surface text-fg no-underline shadow-3 transition-shadow hover:shadow-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      {/* gradient header with the course icon */}
      <div className="relative h-40 overflow-hidden sm:h-44" style={{ background: backgrounds[bg] }}>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.28))' }}
        />
        <div className="absolute right-5 top-5 flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/15 px-2.5 py-1 text-[11.5px] font-semibold text-white backdrop-blur">
            <InfinityIcon size={12} strokeWidth={2.2} />
            {t('courses.card.anytime')}
          </span>
        </div>
        <motion.div
          className="absolute -bottom-4 left-6 grid size-[68px] place-items-center rounded-2xl border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur"
          initial={{ rotate: -6 }}
          whileHover={{ rotate: 0, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        >
          <Icon size={34} strokeWidth={1.6} />
        </motion.div>
        <span className="absolute bottom-4 right-6 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-[11.5px] font-semibold text-white backdrop-blur">
          <Sprout size={12} strokeWidth={2.2} />
          {t('courses.card.beginners')}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6 pt-9">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{track}</div>
        {statusLabel && (
          <span className="mt-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-[color-mix(in_oklab,var(--primary)_10%,transparent)] px-2.5 py-1 text-[11.5px] font-semibold text-primary-deep dark:text-primary">
            {statusLabel}
          </span>
        )}
        <h3 className="mt-1.5 font-display text-[26px] font-semibold leading-tight tracking-tight">
          {titleLead} <span className="font-display font-semibold italic text-teal-600 dark:text-teal-300">{flourish}</span>
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-2">{tag}</p>

        <div className="mt-4 flex flex-wrap items-center gap-y-1.5 text-[12.5px] text-fg-muted">
          {meta.map((m, i) => (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-2.5 inline-block size-[3px] rounded-full bg-fg-soft" />}
              {m}
            </span>
          ))}
        </div>

        <span
          className="group/cta mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-on shadow-1 transition-colors group-hover:bg-primary-hover"
        >
          {ctaLabel || t('courses.card.explore')}
          <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
        </span>
      </div>
    </motion.a>
  );
}
