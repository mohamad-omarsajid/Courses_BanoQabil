import { Mail, Instagram, Youtube } from 'lucide-react';
import { useLang } from '../lib/i18n';

const links = [
  { label: 'Courses', href: '#courses' },
  { label: 'Front-End', href: '/frontend/' },
  { label: 'Design status', href: '/design/' },
  { label: 'Contact', href: 'mailto:hello@banoqabilsahiwal.org' },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <img src="/logo.png" alt="Bano Qabil Sahiwal" className="h-16 w-auto" width={160} height={160} />
            <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">{t('footer.about')}</p>
            <p className="mt-3 font-mono text-[12px] text-fg-soft">courses.banoqabilsahiwal.org</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2.5" aria-label="Footer">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[14px] font-medium text-fg-2 transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-fg-muted">{t('footer.made')}</p>
          <div className="flex items-center gap-2">
            {[
              { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/banoqabilsahiwal/' },
              { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@banoqabilsahiwal' },
              { label: 'Email', icon: Mail, href: 'mailto:hello@banoqabilsahiwal.org' },
            ].map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full border border-line text-fg-2 transition-colors hover:border-fg-muted hover:text-fg"
              >
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
