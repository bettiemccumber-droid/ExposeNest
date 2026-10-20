import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/hooks'

/**
 * 未找到页面时的提示。
 */
export function NotFound() {
  usePageTitle('Page not found · ExposeNest')

  return (
    <div className="wrap" style={{ padding: '4rem 0 5rem' }}>
      <p className="eyebrow">404</p>
      <h1 className="story__title">That page is not on the desk.</h1>
      <p className="lead" style={{ margin: '0.8rem 0 1.2rem' }}>The link may be old. The journal and the product bench are both still here.</p>
      <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
        <Link className="btn btn--ink" to="/">Back home</Link>
        <Link className="btn btn--line" to="/blog">Read the blog</Link>
      </div>
    </div>
  )
}
