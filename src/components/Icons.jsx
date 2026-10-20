/**
 * 线性图标。name 对应社交平台或界面动作。
 * @param {{ name: string }} props
 */
export function Icon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'X') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14.7 3h2.4l-5.2 6L18.6 21h-4.3l-3.4-6.6L7 21H4.6l5.6-6.4L4.2 3h4.4l3 5.9L14.7 3Zm-.9 16.2h1.3L8.3 4.7H6.9l6.9 14.5Z" />
      </svg>
    )
  }

  if (name === 'Instagram') {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'LinkedIn') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6.7 9.2H4.2V19h2.5V9.2ZM5.4 4.6A1.5 1.5 0 1 0 5.5 7.6 1.5 1.5 0 0 0 5.4 4.6ZM19.8 19h-2.5v-5.2c0-1.5-.6-2.5-2-2.5a2.1 2.1 0 0 0-2 1.4c-.1.3-.1.7-.1 1.1V19H10.7s.1-8.7 0-9.8h2.5v1.4a2.7 2.7 0 0 1 2.4-1.3c1.8 0 3.2 1.2 3.2 3.8V19Z" />
      </svg>
    )
  }

  if (name === 'YouTube') {
    return (
      <svg {...common}>
        <rect x="3" y="6.5" width="18" height="11" rx="3" />
        <path d="M11 9.5v5l4.2-2.5L11 9.5Z" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'GitHub') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.4.1.6-.2.6-.4v-1.4c-2.4.5-2.9-1-2.9-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.3 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.2 8.2 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.8 8.8 0 0 0 12 3.2Z" />
      </svg>
    )
  }

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16.5 20 20.5" />
      </svg>
    )
  }

  if (name === 'menu') {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    )
  }

  if (name === 'close') {
    return (
      <svg {...common}>
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" />
    </svg>
  )
}
