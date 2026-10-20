import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackToTop } from './BackToTop'
import { Footer } from './Footer'
import { Header } from './Header'
import { SocialWidget } from './SocialWidget'

/**
 * 全站框架：页头、页脚、社交侧栏和返回顶部。
 */
export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <SocialWidget tone="rail" title="" />
      <main id="main" className={`page${isHome ? ' page--home' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
