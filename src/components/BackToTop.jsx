import { Icon } from './Icons'
import { useScrolled } from '../lib/hooks'

/**
 * 滚动一段距离后出现的返回顶部按钮。
 */
export function BackToTop() {
  const visible = useScrolled(420)

  /**
   * 平滑滚回页面顶部。
   */
  function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button type="button" className={`to-top${visible ? ' is-on' : ''}`} onClick={scrollUp} aria-label="Back to top">
      <Icon name="up" />
    </button>
  )
}
