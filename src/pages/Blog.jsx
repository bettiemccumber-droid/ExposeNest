import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { CATEGORIES, PAGE_SIZE } from '../data/site'
import { articles } from '../data/articles'
import { filterArticles } from '../lib/content'
import { fetchPublishedList } from '../lib/published'
import { usePageTitle } from '../lib/hooks'

/**
 * 博客列表：分类、搜索、分页，默认按日期由新到旧。
 */
export function Blog() {
  usePageTitle('Blog · ExposeNest')
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'All'
  const query = searchParams.get('q') || ''
  const sort = searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest'
  const page = Math.max(1, Number(searchParams.get('page') || 1))

  const [extra, setExtra] = useState([])
  useEffect(() => {
    fetchPublishedList().then((posts) => {
      setExtra(posts.filter((post) => post?.slug).map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || '',
        category: post.category || 'Reviews',
        date: post.date,
        readTime: `${post.readTime || 1} min`,
        image: post.image || '',
        imageAlt: post.title,
        author: post.author || 'ExposeNest',
        tags: Array.isArray(post.keywords) ? post.keywords : [],
        content: [],
      })))
    })
  }, [])
  const filtered = useMemo(
    () => {
      const known = new Set(articles.map((item) => item.slug))
      const remote = extra.filter((item) => !known.has(item.slug))
      return filterArticles({ category, query, sort, source: [...remote, ...articles] })
    },
    [category, query, sort, extra],
  )
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  useEffect(() => {
    if (page > pageCount) {
      update({ page: pageCount })
    }
  }, [page, pageCount])

  useEffect(() => {
    if (current > 1) {
      document.getElementById('blog-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [current])

  /**
   * 合并筛选条件并写回地址栏。未传 page 时回到第一页。
   * @param {{ category?: string, q?: string, sort?: string, page?: number }} patch
   */
  function update(patch) {
    const nextCategory = patch.category ?? category
    const nextQuery = patch.q ?? query
    const nextSort = patch.sort ?? sort
    const nextPage = patch.page ?? 1
    const params = new URLSearchParams()
    if (nextCategory && nextCategory !== 'All') params.set('category', nextCategory)
    if (nextQuery) params.set('q', nextQuery)
    if (nextSort === 'oldest') params.set('sort', 'oldest')
    if (nextPage > 1) params.set('page', String(nextPage))
    setSearchParams(params, { replace: true })
  }

  const chips = ['All', ...CATEGORIES.map((item) => item.name)]
  const filtersActive = category !== 'All' || query || sort === 'oldest'

  const [feature, ...rows] = visible

  return (
    <div className="wrap journal" style={{ paddingBottom: '4rem' }}>
      <header className="journal-head">
        <p className="eyebrow">Journal</p>
        <h1>Stories, not a grid.</h1>
        <p className="lead">Reviews, platform picks, and buying guides. The first result is the feature. The rest sit in a list, newest first unless you switch the order.</p>
      </header>

      <div className="journal-bar" id="blog-top">
        <div className="tabs" role="group" aria-label="Filter by category">
          {chips.map((name) => (
            <button
              key={name}
              type="button"
              className={category === name ? 'is-active' : ''}
              aria-pressed={category === name}
              onClick={() => update({ category: name, page: 1 })}
            >
              {name}
            </button>
          ))}
        </div>
        <form className="line-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="blog-search">Search articles</label>
          <input
            id="blog-search"
            type="search"
            value={query}
            placeholder="Search the journal"
            onChange={(event) => update({ q: event.target.value, page: 1 })}
          />
        </form>
        <div className="sort-toggle" role="group" aria-label="Sort by date">
          <button type="button" className={sort === 'newest' ? 'is-on' : ''} onClick={() => update({ sort: 'newest', page: 1 })}>
            Newest
          </button>
          <button type="button" className={sort === 'oldest' ? 'is-on' : ''} onClick={() => update({ sort: 'oldest', page: 1 })}>
            Oldest
          </button>
        </div>
      </div>

      <p className="results">
        {filtered.length === 0
          ? 'No stories match.'
          : `Showing ${start + 1}–${start + visible.length} of ${filtered.length}`}
        {filtersActive ? (
          <button type="button" className="text-link" style={{ marginLeft: '0.8rem' }} onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}>
            Clear
          </button>
        ) : null}
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>Nothing under that search.</h2>
          <p className="note">Try a product, a platform, or clear the filters.</p>
        </div>
      ) : (
        <div className="journal-list">
          {feature ? <ArticleCard article={feature} layout="feature" /> : null}
          {rows.map((article) => (
            <ArticleCard key={article.slug} article={article} layout="row" />
          ))}
        </div>
      )}

      {pageCount > 1 ? (
        <nav className="pager-text" aria-label="Pagination">
          <button type="button" disabled={current === 1} onClick={() => update({ page: current - 1 })}>
            Previous
          </button>
          <span>Page {current} of {pageCount}</span>
          <button type="button" disabled={current === pageCount} onClick={() => update({ page: current + 1 })}>
            Next
          </button>
        </nav>
      ) : null}
    </div>
  )
}
