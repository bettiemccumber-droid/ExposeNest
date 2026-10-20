import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../lib/content'
import { sortByDate } from '../lib/format'
import { usePageTitle } from '../lib/hooks'

/**
 * 产品目录。深色页眉、侧栏文字筛选，条目左右交替，不使用博客卡片。
 */
export function Products() {
  usePageTitle('Products · ExposeNest')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', ...new Set(products.map((product) => product.category))]

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      if (category !== 'All' && product.category !== category) return false
      if (!needle) return true
      return [product.name, product.summary, product.category, product.bestFor].join(' ').toLowerCase().includes(needle)
    })
    return sortByDate(filtered, 'newest')
  }, [category, query])

  return (
    <>
      <header className="ink-band">
        <div className="wrap ink-band__inner">
          <div>
            <p className="eyebrow">Catalog</p>
            <h1>The bench</h1>
            <p>Six photographed objects. Prices are ranges from the months we were testing, not a shop.</p>
          </div>
          <form className="line-search line-search--light" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="product-search">Search products</label>
            <input
              id="product-search"
              type="search"
              value={query}
              placeholder="Search by name or use"
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        </div>
      </header>

      <div className="wrap catalog">
        <nav className="menu-filter" aria-label="Filter products">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              className={category === name ? 'is-active' : ''}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </nav>

        {visible.length === 0 ? (
          <div className="empty">
            <h2>No product under that filter.</h2>
          </div>
        ) : (
          <div className="shelf">
            {visible.map((product, index) => (
              <article key={product.slug} className={`shelf-row${index % 2 ? ' is-flip' : ''}`}>
                <Link to={`/products/${product.slug}`} className="shelf-row__photo">
                  <img src={product.image} alt={product.imageAlt} />
                </Link>
                <div>
                  <p className="eyebrow">{String(index + 1).padStart(2, '0')} · {product.category}</p>
                  <h2><Link to={`/products/${product.slug}`}>{product.name}</Link></h2>
                  <p>{product.summary}</p>
                  <p className="shelf-row__price">{product.price}</p>
                  <Link className="text-link" to={`/products/${product.slug}`}>Open this object</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <p className="wrap note" style={{ paddingBottom: '3rem' }}>ExposeNest does not sell these products. Each page is a review and a buying note.</p>
    </>
  )
}
