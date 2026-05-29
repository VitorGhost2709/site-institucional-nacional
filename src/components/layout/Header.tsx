import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { site } from '../../site/content'
import { Button } from '../ui/Button'

import logo from '../../assets/nacional/logonacionalazul.png'

type NavItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string }[] }

function isWithChildren(item: NavItem): item is Extract<NavItem, { children: any }> {
  return 'children' in item
}

const navLinkBase =
  'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200'
const navLinkIdle = 'text-primaryDark/80 hover:bg-muted/80 hover:text-ink'
const navLinkActive = 'bg-primary/10 text-ink ring-1 ring-primary/15'

export function Header() {
  const location = useLocation()
  const nav = useMemo(() => site.nav as unknown as NavItem[], [])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [instOpen, setInstOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    setInstOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8edf3] bg-[#f9f8f3] text-ink shadow-[0_8px_30px_-22px_rgba(7,31,61,0.18)]">
      <div className="n-container">
        <div className="flex h-[4.25rem] items-center justify-between gap-4 sm:h-[4.75rem]">
          <Link to="/" className="flex items-center rounded-xl py-1 transition-opacity hover:opacity-90">
            <img
              src={logo}
              alt="Nacional Distribuidora"
              className="h-11 w-auto sm:h-12"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              if (isWithChildren(item)) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setInstOpen((v) => !v)}
                      className={[
                        'inline-flex items-center gap-2',
                        navLinkBase,
                        navLinkIdle,
                        instOpen ? navLinkActive : '',
                      ].join(' ')}
                      aria-expanded={instOpen}
                      aria-haspopup="menu"
                    >
                      {item.label} <ChevronDown className="h-4 w-4" />
                    </button>
                    {instOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 mt-3 w-64 overflow-hidden rounded-2xl border border-muted bg-white shadow-[0_22px_45px_-28px_rgba(7,31,61,0.25)]"
                      >
                        <div className="p-2">
                          {item.children.map((c) => (
                            <NavLink
                              key={c.to}
                              to={c.to}
                              className={({ isActive }) =>
                                [
                                  'block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-200',
                                  isActive
                                    ? 'bg-primary/10 text-ink'
                                    : 'text-primaryDark/80 hover:bg-muted/70 hover:text-ink',
                                ].join(' ')
                              }
                            >
                              {c.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [navLinkBase, isActive ? navLinkActive : navLinkIdle].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              as="link"
              to="/contato"
              variant="primary"
              className="rounded-full px-5 py-2.5 shadow-sm"
            >
              Entrar em contato
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-primaryDark transition-colors hover:bg-muted/80 hover:text-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e8edf3] bg-[#f9f8f3] lg:hidden">
          <div className="n-container py-4">
            <div className="flex flex-col gap-1">
              {nav.map((item) => {
                if (isWithChildren(item)) {
                  return (
                    <details
                      key={item.label}
                      className="rounded-2xl border border-muted bg-white"
                    >
                      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-extrabold text-ink">
                        <span className="inline-flex items-center gap-2">
                          {item.label} <ChevronDown className="h-4 w-4 text-primaryDark/60" />
                        </span>
                      </summary>
                      <div className="px-2 pb-2">
                        {item.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              [
                                'block rounded-xl px-3 py-2 text-sm font-semibold transition-colors duration-200',
                                isActive
                                  ? 'bg-primary/10 text-ink'
                                  : 'text-primaryDark/80 hover:bg-muted/70 hover:text-ink',
                              ].join(' ')
                            }
                          >
                            {c.label}
                          </NavLink>
                        ))}
                      </div>
                    </details>
                  )
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'rounded-2xl px-4 py-3 text-sm font-extrabold transition-colors duration-200',
                        isActive
                          ? 'bg-primary/10 text-ink ring-1 ring-primary/15'
                          : 'border border-muted bg-white text-primaryDark hover:bg-muted/60',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              })}

              <div className="pt-2">
                <Button
                  as="link"
                  to="/contato"
                  variant="primary"
                  className="w-full rounded-full py-3"
                >
                  Entrar em contato
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
