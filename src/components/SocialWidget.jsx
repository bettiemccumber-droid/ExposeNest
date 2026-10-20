import { SOCIAL_LINKS } from '../data/site'
import { Icon } from './Icons'

/**
 * 带外链的社交媒体图标组件。
 * @param {{ tone?: 'row' | 'stack' | 'rail' | 'text', title?: string, onDark?: boolean }} props
 */
export function SocialWidget({ tone = 'row', title = 'Follow the desk', onDark = false }) {
  const links = SOCIAL_LINKS.map((item) => (
    <a key={item.name} href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.label} title={item.label}>
      <Icon name={item.name} />
    </a>
  ))

  if (tone === 'text') {
    return (
      <ul className={`social-text${onDark ? ' social-text--light' : ''}`}>
        {SOCIAL_LINKS.map((item) => (
          <li key={item.name}>
            <a href={item.href} target="_blank" rel="noreferrer noopener">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  if (tone === 'rail') {
    return (
      <nav className="social-rail" aria-label="Social media">
        {links}
      </nav>
    )
  }

  return (
    <div className={`social social--${tone}${onDark ? ' social--on-dark' : ''}`}>
      {title ? <p>{title}</p> : null}
      <div className="social__links">{links}</div>
    </div>
  )
}
