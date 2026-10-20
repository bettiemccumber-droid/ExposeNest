import { Link } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { ProductCard } from '../components/ProductCard'
import { CATEGORIES, METHOD_STEPS } from '../data/site'
import { countInCategory, filterArticles, products } from '../lib/content'
import { usePageTitle } from '../lib/hooks'

/**
 * 首页落地页。分区用目录、横幅、胶片和步骤，避免整页同一套卡片。
 */
export function Home() {
  usePageTitle('ExposeNest — Product reviews and platform notes')
  const latest = filterArticles({ sort: 'newest' })
  const lead = latest[0]
  const side = latest.slice(1, 3)

  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="wrap">
          <div className="hero__copy">
            <p className="eyebrow">Independent reviews</p>
            <h1>Clear eyes on the things worth keeping.</h1>
            <p className="hero__lede">
              ExposeNest is an English-language desk for product reviews, platform recommendations, and buying guides. The notes run from February 2025 through February 2026, written after ordinary use.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--light" to="/blog">Read the blog</Link>
              <Link className="text-link text-link--light" to="/products">Browse the bench</Link>
            </div>
            <p className="hero__stats">
              <span>10 stories</span>
              <span>6 products</span>
              <span>Newest first</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap index-block">
          <div>
            <p className="eyebrow">Sections</p>
            <h2>Four kinds of note</h2>
          </div>
          <ol className="index-list">
            {CATEGORIES.map((category, index) => (
              <li key={category.name}>
                <Link to={`/blog?category=${encodeURIComponent(category.name)}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{category.name}</strong>
                  <em>{category.blurb}</em>
                  <b>{countInCategory(category.name)}</b>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Journal</p>
              <h2>The newest note, then two more</h2>
            </div>
            <Link className="text-link" to="/blog">All stories</Link>
          </div>
          <div className="home-stories">
            {lead ? <ArticleCard article={lead} layout="feature" /> : null}
            <div>
              {side.map((article) => (
                <ArticleCard key={article.slug} article={article} layout="row" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="film-band">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">The bench</p>
              <h2>Six objects, one strip</h2>
            </div>
            <Link className="text-link" to="/products">Open the catalog</Link>
          </div>
          <div className="film">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} layout="film" />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap method">
          <p className="eyebrow">Method</p>
          <ol>
            {METHOD_STEPS.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap close-band">
          <p>A small desk, not a showroom. We name what we would buy again.</p>
          <div>
            <Link className="text-link" to="/about">About the desk</Link>
            <Link className="btn btn--ink" to="/contact">Write to us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
