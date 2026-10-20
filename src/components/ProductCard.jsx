import { Link } from 'react-router-dom'

/**
 * 产品入口。film 是横向胶片格，card 是竖卡片。
 * @param {{ layout?: 'card' | 'film', product: { slug: string, name: string, category: string, price: string, summary: string, image: string, imageAlt: string } }} props
 */
export function ProductCard({ product, layout = 'card' }) {
  if (layout === 'film') {
    return (
      <article className="film-card">
        <Link to={`/products/${product.slug}`}>
          <img src={product.image} alt={product.imageAlt} />
          <p>{product.category}</p>
          <h3>{product.name}</h3>
          <span>{product.price}</span>
        </Link>
      </article>
    )
  }

  return (
    <article className="card">
      <Link to={`/products/${product.slug}`} className="card__link">
        <div className="card__media">
          <img src={product.image} alt={product.imageAlt} loading="lazy" />
        </div>
        <div className="card__body">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="card__excerpt">{product.summary}</p>
          <p className="meta">{product.price}</p>
        </div>
      </Link>
    </article>
  )
}
