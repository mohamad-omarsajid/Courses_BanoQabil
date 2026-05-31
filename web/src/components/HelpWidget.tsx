import { MessageCircle, LifeBuoy } from 'lucide-react';
import { useLang } from '../lib/i18n';

export default function HelpWidget() {
  const { t } = useLang();
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-2 sm:p-6">
      <div>
        <span
          className="grid size-11 place-items-center rounded-xl text-primary-deep dark:text-primary"
          style={{ background: 'color-mix(in oklab, var(--primary) 13%, transparent)' }}
        >
          <LifeBuoy size={22} strokeWidth={1.85} />
        </span>
        <h3 className="mt-4 font-display text-[19px] font-semibold tracking-tight">{t('help.title')}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">{t('help.body')}</p>
      </div>
      <a
        href="mailto:hello@banoqabilsahiwal.org?subject=Bano%20Qabil%20course%20help"
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-[18px] text-[14.5px] font-semibold text-primary-on shadow-1 transition-colors hover:bg-primary-hover"
      >
        <MessageCircle size={16} strokeWidth={2} />
        {t('help.cta')}
      </a>
    </div>
  );
}
