import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../data/site'
import { Logo } from './Logo'
import { SocialWidget } from './SocialWidget'

/**
 * 页脚：站点说明、导航，以及可跳转的社交图标。
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner footer__grid">
        <div>
          <Logo />
          <h2>Notes from a careful desk.</h2>
          <p className="note">Independent English-language reviews of products and platforms. We do not sell the gear we write about.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <SocialWidget tone="stack" title="Follow the desk" />
      </div>
      <div className="footer__inner">
        <p className="fineprint">© 2026 ExposeNest. Photographs via Unsplash, chosen to match each story.</p>
      </div>
    </footer>
  )
}
