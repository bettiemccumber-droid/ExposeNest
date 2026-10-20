import { useEffect, useRef, useState } from 'react'

/**
 * 元素进入视口后淡入上移。
 * @param {{ children: import('react').ReactNode, className?: string, delay?: number }} props
 */
export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const classes = `reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
