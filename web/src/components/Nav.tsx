import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, UserPlus, LogIn } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { useLang, type Key } from '../lib/i18n';
import Button from './ui/Button';

const links: { key: Key; href: string }[] = [
  { key: 'nav.courses', href: '#courses' },
  { key: 'nav.how', href: '#how' },
  { key: 'nav.why', href: '#why' },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the dark hero (not scrolled, menu closed) the bar is transparent with
  // light text; once scrolled it becomes a frosted bar with normal text.
  const overHero = !scrolled && !open;
  const headerCls = overHero
    ? 'border-transparent bg-transparent'
    : 'border-line bg-bg/80 backdrop-blur-md';
  const linkCls = overHero
    ? 'text-white/85 hover:bg-white/10 hover:text-white'
    : 'text-fg-2 hover:bg-surface-2 hover:text-fg';
  const iconCls = overHero
    ? 'text-white/85 hover:bg-white/10 hover:text-white'
    : 'text-fg-2 hover:bg-surface-2 hover:text-fg';
  const brandCls = overHero ? 'text-white' : 'text-fg';
  const logoShellCls = overHero
    ? 'bg-white/95 ring-white/25'
    : 'bg-white ring-line';
  const toggleBorder = overHero ? 'border-white/25' : 'border-line-2';

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${headerCls}`}>
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center gap-3 px-5 sm:px-8" aria-label="Primary">
        <a href="#top" className={`flex shrink-0 items-center gap-2 font-display text-[17px] font-bold tracking-tight ${brandCls}`}>
          <span className={`grid size-11 place-items-center rounded-xl p-1 shadow-2 ring-1 transition-colors duration-300 ${logoShellCls}`}>
            <img src="/logo.png" alt="Bano Qabil" className="h-full w-full object-contain" width={44} height={44} />
          </span>
          Courses
        </a>

        <div className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors ${linkCls}`}>
              {t(l.key)}
            </a>
          ))}
        </div>

        <div className="flex-1" />

        <div className={`flex overflow-hidden rounded-md border ${toggleBorder}`} role="group" aria-label="Language">
          {(['en', 'ru'] as const).map((l, i) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-label={l === 'en' ? 'English' : 'Roman Urdu'}
              className={`h-9 px-3 text-[13px] transition-colors ${i === 1 ? `border-l ${toggleBorder}` : ''} ${
                lang === l
                  ? overHero
                    ? 'bg-white/15 font-medium text-white'
                    : 'bg-surface-2 font-medium text-fg'
                  : overHero
                    ? 'text-white/70 hover:text-white'
                    : 'text-fg-muted hover:text-fg'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          className={`grid size-9 place-items-center rounded-md transition-colors ${iconCls}`}
          aria-label="Switch theme"
        >
          {theme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          {overHero ? (
            <>
              <a href="/frontend/" className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white">
                <LogIn size={16} strokeWidth={1.75} />
                {t('nav.signin')}
              </a>
              <a href="#courses" className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-teal-800 transition-transform hover:scale-[1.03]">
                <UserPlus size={16} strokeWidth={1.75} />
                {t('nav.start')}
              </a>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" href="/frontend/">
                <LogIn size={16} strokeWidth={1.75} />
                {t('nav.signin')}
              </Button>
              <Button variant="primary" size="sm" pill href="#courses">
                <UserPlus size={16} strokeWidth={1.75} />
                {t('nav.start')}
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`grid size-9 place-items-center rounded-md transition-colors lg:hidden ${iconCls}`}
          aria-label="Open menu"
          aria-expanded={open}
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-5 py-4 sm:px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {t(l.key)}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" size="md" href="/frontend/" className="flex-1">
                <LogIn size={16} strokeWidth={1.75} />
                {t('nav.signin')}
              </Button>
              <Button variant="primary" size="md" pill href="#courses" className="flex-1">
                <UserPlus size={16} strokeWidth={1.75} />
                {t('nav.start')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
