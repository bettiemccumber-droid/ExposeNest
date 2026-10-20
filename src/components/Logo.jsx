import { Link } from 'react-router-dom'

/**
 * ExposeNest 标志。点击后返回首页落地页。
 */
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="ExposeNest, go to homepage">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <path d="M6.5 23c2 5 5.4 7.5 11.5 7.5S27.5 28 29.5 23" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 20c1.7 3.4 4 5.2 9 5.2s7.3-1.8 9-5.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M11.6 17.2c1.2 2.2 2.9 3.3 6.4 3.3s5.2-1.1 6.4-3.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="18" cy="13.2" r="2" fill="#c0562a" />
      </svg>
      <span>ExposeNest</span>
    </Link>
  )
}
