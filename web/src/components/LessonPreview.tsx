import { useState } from 'react';
import { Clock, Lightbulb, MessageCircle, CircleCheck } from 'lucide-react';
import { useLang } from '../lib/i18n';

const codeHtml = `<span style="color:#6b8a82">&lt;!-- our very first button --&gt;</span>
<span style="color:#ff7eb6">&lt;button</span> <span style="color:#79c0ff">class</span>=<span style="color:#a3e6a0">"primary"</span>
        <span style="color:#79c0ff">onclick</span>=<span style="color:#a3e6a0">"alert('hello!')"</span><span style="color:#ff7eb6">&gt;</span>
  Tap me
<span style="color:#ff7eb6">&lt;/button&gt;</span>`;

export default function LessonPreview() {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-3 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-fg-muted">{t('lesson.chapter')}</p>
          <h3 className="mt-1 font-display text-[20px] font-semibold tracking-tight">{t('lesson.title')}</h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-fg-2">
          <Clock size={13} strokeWidth={2} />
          {t('lesson.minutes')}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[12px] text-fg-muted">
        <span className="font-medium text-fg-2">{done ? '4 of 6 done' : t('lesson.progress')}</span>
        <span className="inline-block size-[3px] rounded-full bg-fg-soft" />
        <span>{t('lesson.today')}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: done ? '66%' : '50%' }}
        />
      </div>

      <p className="mt-5 text-[14.5px] leading-relaxed text-fg-2">{t('lesson.body')}</p>

      <div
        className="scroll-thin mt-4 overflow-hidden rounded-xl border border-white/10 text-[12.5px] shadow-2"
        style={{ background: '#0d1117', fontFamily: 'var(--font-mono)', color: '#e6edf3' }}
      >
        <div
          className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2 text-[11px]"
          style={{ background: '#11161d', color: '#9aa4b2' }}
        >
          <span className="flex gap-1.5">
            <i className="size-2.5 rounded-full" style={{ background: '#ff6058' }} />
            <i className="size-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
            <i className="size-2.5 rounded-full" style={{ background: '#27c93f' }} />
          </span>
          <span className="ml-1">button.html · HTML</span>
        </div>
        <pre className="scroll-thin overflow-x-auto px-4 py-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: codeHtml }} />
      </div>

      <div
        className="mt-4 grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border p-3.5"
        style={{
          background: 'color-mix(in oklab, var(--primary) 6%, var(--surface))',
          borderColor: 'color-mix(in oklab, var(--primary) 22%, transparent)',
        }}
      >
        <span
          className="grid size-8 place-items-center rounded-full text-primary-deep dark:text-primary"
          style={{ background: 'color-mix(in oklab, var(--primary) 14%, transparent)' }}
        >
          <Lightbulb size={16} strokeWidth={1.9} />
        </span>
        <div>
          <h4 className="font-display text-[14px] font-semibold">{t('lesson.tip.t')}</h4>
          <p className="mt-0.5 text-[13.5px] leading-snug text-fg-2">{t('lesson.tip.b')}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border border-line bg-surface-2 p-3.5">
        <span
          className="grid size-8 place-items-center rounded-full text-primary-deep dark:text-primary"
          style={{ background: 'color-mix(in oklab, var(--primary) 14%, transparent)' }}
        >
          <MessageCircle size={16} strokeWidth={1.9} />
        </span>
        <div>
          <h4 className="text-[14px] font-semibold">{t('lesson.note.t')}</h4>
          <p className="text-[13.5px] leading-snug text-fg-2">{t('lesson.note.b')}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setDone((d) => !d)}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-[18px] text-[14.5px] font-semibold text-primary-on shadow-1 transition-colors hover:bg-primary-hover"
        >
          <CircleCheck size={17} strokeWidth={2} />
          {t('lesson.complete')}
        </button>
        <span className="text-[13px] text-fg-muted">{done ? '✓' : t('lesson.notdone')}</span>
      </div>
    </div>
  );
}
