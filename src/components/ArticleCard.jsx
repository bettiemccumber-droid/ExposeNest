import { Link } from 'react-router-dom'
import { formatDate } from '../lib/format'

/**
 * 文章入口。layout 决定版式：feature 为大图横幅，row 为横条，card 为竖卡片。
 * @param {{ layout?: 'card' | 'feature' | 'row', article: { slug: string, title: string, excerpt: string, category: string, date: string, readTime: string, image: string, imageAlt: string } }} props
 */
export function ArticleCard({ article, layout = 'card' }) {
  const meta = `${formatDate(article.date)} · ${article.readTime}`

  if (layout === 'feature') {
    return (
      <article className="feature-story">
        <Link to={`/blog/${article.slug}`}>
          <img src={article.image} alt={article.imageAlt} />
          <div>
            <p className="eyebrow">{article.category}</p>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <span className="text-link">{meta}</span>
          </div>
        </Link>
      </article>
    )
  }

  if (layout === 'row') {
    return (
      <article className="story-row">
        <Link to={`/blog/${article.slug}`}>
          <img src={article.image} alt={article.imageAlt} />
          <div>
            <p className="eyebrow">{article.category}</p>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </div>
          <time>{meta}</time>
        </Link>
      </article>
    )
  }

  return (
    <article className="card">
      <Link to={`/blog/${article.slug}`} className="card__link">
        <div className="card__media">
          <img src={article.image} alt={article.imageAlt} loading="lazy" />
        </div>
        <div className="card__body">
          <p className="eyebrow">{article.category}</p>
          <h3>{article.title}</h3>
          <p className="card__excerpt">{article.excerpt}</p>
          <p className="meta">{formatDate(article.date)} · {article.readTime}</p>
        </div>
      </Link>
    </article>
  )
}
