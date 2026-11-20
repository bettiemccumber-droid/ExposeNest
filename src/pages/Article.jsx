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
 * 把接口文章收成详情页可用的结构。
 * @param {object} post
 */
function fromPublished(post) {
  const minutes = typeof post.readTime === 'number' ? post.readTime : Number(post.readTime) || 1
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    category: post.category || 'Product Review',
    date: post.date,
    readTime: String(post.readTime).includes('min') ? String(post.readTime) : `${minutes} min`,
    author: post.author || 'ExposeNest Desk',
    image: post.image || '',
    imageAlt: post.title,
    bodyHtml: post.bodyHtml || '',
    productSlug: '',
  }
}

/**
 * 博客文章详情：本地块文章与 AffilliAds 发布文章共用同一版式。
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
      setRemote(post ? fromPublished(post) : null)
      setChecked(true)
    })
    return () => {
      cancel = true
    }
  }, [local, slug])

  const article = local || remote
  usePageTitle(article ? `${article.title} · ExposeNest` : checked ? 'Story not found · ExposeNest' : 'ExposeNest')

  if (!local && !checked) {
    return (
      <div className="wrap story-loading" aria-busy="true">
        <p className="eyebrow">Loading</p>
        <p>Opening the note…</p>
      </div>
    )
  }

  if (!article) return <NotFound />

  const product = article.productSlug ? getProduct(article.productSlug) : undefined
  const related = relatedArticles(article.slug, article.category)
  const cover = article.image || '/images/hero.jpg'
  const isHtml = Boolean(article.bodyHtml)

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className="story-stage" style={{ backgroundImage: `url("${cover}")` }}>
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
          {article.excerpt ? <p className="story-dek">{article.excerpt}</p> : null}
          {isHtml ? (
            <div className="prose prose--html" dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
          ) : (
            <Prose blocks={article.content} />
          )}
        </div>
      </article>
      {related.length ? (
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
      ) : null}
    </>
  )
}
