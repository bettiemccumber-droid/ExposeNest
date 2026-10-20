/**
 * 站点导航、分类与社交媒体入口。
 * 社交链接指向各平台首页，点击后在新标签页打开。
 */
export const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

/** @type {{ name: string, href: string, label: string }[]} */
export const SOCIAL_LINKS = [
  { name: 'X', href: 'https://x.com', label: 'ExposeNest on X' },
  { name: 'Instagram', href: 'https://www.instagram.com', label: 'ExposeNest on Instagram' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com', label: 'ExposeNest on LinkedIn' },
  { name: 'YouTube', href: 'https://www.youtube.com', label: 'ExposeNest on YouTube' },
  { name: 'GitHub', href: 'https://github.com', label: 'ExposeNest on GitHub' },
]

/** @type {{ name: string, blurb: string }[]} */
export const CATEGORIES = [
  {
    name: 'Product Reviews',
    blurb: 'Objects that stayed after the return window closed.',
  },
  {
    name: 'Platform Picks',
    blurb: 'Software we file real work in, and the tools we left.',
  },
  {
    name: 'Buying Guides',
    blurb: 'Short lists for small rooms, train days, and tight counters.',
  },
  {
    name: 'Field Notes',
    blurb: 'Longer essays from weeks of use, not an afternoon unboxing.',
  },
]

/** 博客列表每页文章数。 */
export const PAGE_SIZE = 6

/** @type {{ step: string, title: string, text: string }[]} */
export const METHOD_STEPS = [
  {
    step: '01',
    title: 'Use it on ordinary days',
    text: 'A review starts after the novelty wears off: commutes, late editing, a Tuesday morning.',
  },
  {
    step: '02',
    title: 'Photograph the real thing',
    text: 'Pictures on this desk match the object in the note, not a brochure render.',
  },
  {
    step: '03',
    title: 'Name what we would buy again',
    text: 'Every piece ends with a verdict: keep it, skip it, or buy it only for a specific job.',
  },
]
