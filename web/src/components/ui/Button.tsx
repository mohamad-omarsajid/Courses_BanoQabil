import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 border border-transparent font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-150 ease-[cubic-bezier(.2,.7,.2,1)]';

const dims: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-[18px] text-[14.5px]',
  lg: 'h-[52px] px-[22px] text-[15.5px]',
};

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-on shadow-1 hover:bg-primary-hover active:translate-y-px',
  secondary: 'bg-surface text-fg border-line-2 shadow-1 hover:border-fg-muted',
  ghost: 'text-fg-2 hover:bg-surface-2 hover:text-fg',
  accent: 'bg-accent text-white hover:bg-accent-hover',
  inverse: 'bg-fg text-bg hover:opacity-90',
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  href?: string;
  type?: 'button' | 'submit';
  className?: string;
  'aria-label'?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  href,
  type = 'button',
  className = '',
  onClick,
  ...rest
}: Props) {
  const round = pill ? 'rounded-full' : size === 'lg' ? 'rounded-lg' : 'rounded-md';
  const cls = [base, dims[size], round, variants[variant], className].filter(Boolean).join(' ');
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
