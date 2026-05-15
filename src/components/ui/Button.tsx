import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type ButtonAsLink = CommonProps & {
  as: 'link'
  to: string
} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? 'primary'
  const className = [
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200',
    '[&>svg]:shrink-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    variant === 'primary' &&
      'bg-primary text-white shadow-sm hover:bg-primaryDark active:bg-ink',
    variant === 'secondary' &&
      'bg-white text-primaryDark shadow-sm ring-1 ring-black/5 hover:bg-muted/60 active:bg-muted/80',
    variant === 'ghost' &&
      'border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white active:bg-white/15',
    props.className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if ('as' in props && props.as === 'link') {
    const { as: _as, variant: _variant, className: _c, children, to, ...rest } =
      props
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _variant, className: _c, children, ...rest } = props
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}

