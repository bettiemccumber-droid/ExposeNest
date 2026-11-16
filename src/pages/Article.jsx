import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Prose } from '../components/Prose'
import { SocialWidget } from '../components/SocialWidget'
import { getArticle, getProduct, relatedArticles } from '../lib/content'
import { formatDate } from '../lib/format'
import { usePageTitle, useReadingProgress } from '../lib/hooks'
import { fetchPublishedArticle } from '../lib/published'
import { NotFound } from './NotFound'

/**
 * 博客文章详情，含正文、关联产品和推荐阅读。
 */
export function ArticlePage() {
  const { slug = '' } = useParams()
  const local = getArticle(slug)
  const [remote, setRemote] = useState(null)
  const [checked, setChecked] = useState(Boolean(local))
  const progress = useReadingProgress()

  useEffect(() => {
    if (local) return undefined
    let cancel = false
    fetchPublishedArticle(slug).then((post) => {
      if (cancel) return
      setRemote(post)
      setChecked(true)
    })
    return () => {
      cancel = true
    }
  }, [local, slug])

  usePageTitle(local ? `${local.title} · ExposeNest` : remote ? `${remote.title} · ExposeNest` : 'Story not found · ExposeNest')

  if (!local && !checked) return null
  if (!local && remote) {
    return (
      <article className="wrap story-frame">
        <div className="story">
          <h1>{remote.title}</h1>
          <p className="story-dek">{remote.excerpt}</p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: remote.bodyHtml || '' }} />
        </div>
      </article>
    )
  }
  const article = local
  if (!article) return <NotFound />

  const product = article.productSlug ? getProduct(article.productSlug) : undefined
  const related = relatedArticles(article.slug, article.category)

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className="story-stage" style={{ backgroundImage: `url(${article.image})` }}>
        <div className="wrap story-stage__copy">
          <p className="crumb">
            <Link to="/blog">Blog</Link> / {article.category}
          </p>
          <h1>{article.title}</h1>
        </div>
      </header>
      <article className="wrap story-frame">
        <aside className="story-side">
          <dl className="story-facts">
            <div>
              <dt>Published</dt>
              <dd>{formatDate(article.date)}</dd>
            </div>
            <div>
              <dt>Reading</dt>
              <dd>{article.readTime}</dd>
            </div>
            <div>
              <dt>Desk</dt>
              <dd>{article.author}</dd>
            </div>
          </dl>
          {product ? (
            <Link className="story-object" to={`/products/${product.slug}`}>
              <img src={product.image} alt={product.imageAlt} />
              <span>The object</span>
              <strong>{product.name}</strong>
              <em>{product.price}</em>
            </Link>
          ) : null}
          <SocialWidget tone="stack" title="Elsewhere" />
        </aside>
        <div className="story">
          <p className="story-dek">{article.excerpt}</p>
          <Prose blocks={article.content} />
        </div>
      </article>
      <section className="story-more">
        <div className="wrap">
          <h2 className="read-next__title">Keep reading</h2>
          <ul className="read-next">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/blog/${item.slug}`}>
                  <img src={item.image} alt="" />
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <em>{formatDate(item.date)}</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
