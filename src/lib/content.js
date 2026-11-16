import { articles } from '../data/articles'
import { products } from '../data/products'
import { sortByDate } from './format'

/**
 * 拼出一篇文章的可搜索文本。
 * @param {{ title: string, excerpt: string, category: string, tags?: string[], content: Array<{ text?: string, items?: string[], caption?: string, label?: string }> }} article
 * @returns {string}
 */
export function articleSearchText(article) {
  const blocks = (article.content || []).flatMap((block) => {
    const parts = []
    if (block.text) parts.push(block.text)
    if (block.label) parts.push(block.label)
    if (block.caption) parts.push(block.caption)
    if (block.items) parts.push(...block.items)
    return parts
  })

  return [article.title, article.excerpt, article.category, ...(article.tags || []), ...blocks]
    .join(' ')
    .toLowerCase()
}

/**
 * 按分类、关键词和日期排序文章。默认由新到旧。
 * @param {{ category?: string, query?: string, sort?: string }} [options]
 */
export function filterArticles({ category = 'All', query = '', sort = 'newest', source } = {}) {
  const needle = query.trim().toLowerCase()
  const filtered = (source || articles).filter((article) => {
    if (category !== 'All' && article.category !== category) return false
    if (!needle) return true
    return articleSearchText(article).includes(needle)
  })
  return sortByDate(filtered, sort === 'oldest' ? 'oldest' : 'newest')
}

/**
 * 按 slug 查找文章。
 * @param {string} slug
 */
export function getArticle(slug) {
  return articles.find((article) => article.slug === slug)
}

/**
 * 按 slug 查找产品。
 * @param {string} slug
 */
export function getProduct(slug) {
  return products.find((product) => product.slug === slug)
}

/**
 * 同分类文章优先，不足时用其他最新文章补齐。
 * @param {string} slug
 * @param {string} category
 * @param {number} [count=3]
 */
export function relatedArticles(slug, category, count = 3) {
  const newest = sortByDate(articles, 'newest')
  const same = newest.filter((article) => article.slug !== slug && article.category === category)
  const rest = newest.filter((article) => article.slug !== slug && article.category !== category)
  return [...same, ...rest].slice(0, count)
}

/**
 * 统计某个分类下的文章数量。
 * @param {string} category
 * @returns {number}
 */
export function countInCategory(category) {
  return articles.filter((article) => article.category === category).length
}

export { articles, products }
