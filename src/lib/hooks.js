import { useEffect, useState } from 'react'

/**
 * 页面滚动超过阈值后返回 true，用于页头和返回顶部按钮。
 * @param {number} [threshold=24]
 * @returns {boolean}
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/**
 * 设置浏览器标签标题。
 * @param {string} title
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}

/**
 * 计算当前阅读进度百分比，供文章页顶部进度条使用。
 * @returns {number}
 */
export function useReadingProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const next = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setValue(Math.max(0, Math.min(100, next)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return value
}
