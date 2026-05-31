import { useLang } from '../lib/i18n';

const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Responsive design',
  'Figma',
  'UI design',
  'UX basics',
  'Logos',
  'Posters',
  'Portfolios',
  'Git',
];

export default function Marquee() {
  const { t } = useLang();
  const row = [...skills, ...skills];
  return (
    <section className="border-y border-line bg-bg-soft py-7" aria-label={t('marquee.label')}>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: 'linear-gradient(90deg, var(--bg-soft), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: 'linear-gradient(270deg, var(--bg-soft), transparent)' }}
        />
        <ul className="marquee-track flex w-max items-center gap-3">
          {row.map((s, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-medium text-fg-2 shadow-1"
            >
              <span className="size-1.5 rounded-full bg-primary" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
