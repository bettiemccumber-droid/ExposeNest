import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../data/site'
import { useScrolled } from '../lib/hooks'
import { Icon } from './Icons'
import { Logo } from './Logo'

/**
 * 固定页头。标志返回首页；首页未滚动时叠在主视觉上。
 */
export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const scrolled = useScrolled(20)
  const [open, setOpen] = useState(false)
  const staged = pathname === '/' || pathname === '/about' || /^\/blog\/.+/.test(pathname)
  const overlay = staged && !scrolled && !open

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    /**
     * 按 Esc 关闭移动端菜单。
     * @param {KeyboardEvent} event
     */
    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /**
   * 把页头搜索提交到博客列表。
   * @param {import('react').FormEvent<HTMLFormElement>} event
   */
  function onSearch(event) {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get('q')?.toString().trim() || ''
    setOpen(false)
    navigate(value ? `/blog?q=${encodeURIComponent(value)}` : '/blog')
  }

  return (
    <>
    <header className={`header ${overlay ? 'header--overlay' : 'header--solid'}`}>
      <div className="header__inner">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <form className="search" role="search" onSubmit={onSearch}>
            <label className="sr-only" htmlFor="header-search">Search the blog</label>
            <input id="header-search" name="q" type="search" placeholder="Search notes" />
            <button type="submit" aria-label="Search">
              <Icon name="search" />
            </button>
          </form>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
    <div id="mobile-nav" className={`nav-panel${open ? ' is-open' : ''}`} hidden={!open}>
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>
          {item.label}
        </NavLink>
      ))}
      <form className="search search--wide" role="search" onSubmit={onSearch}>
        <label className="sr-only" htmlFor="mobile-search">Search the blog</label>
        <input id="mobile-search" name="q" type="search" placeholder="Search notes" />
        <button type="submit" aria-label="Search">
          <Icon name="search" />
        </button>
      </form>
    </div>
    </>
  )
}
