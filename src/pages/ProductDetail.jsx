import { Link, useParams } from 'react-router-dom'
import { getArticle, getProduct, products } from '../lib/content'
import { formatDate } from '../lib/format'
import { usePageTitle } from '../lib/hooks'
import { NotFound } from './NotFound'

/**
 * 产品详情：图片、描述、要点，以及对应测评。
 */
export function ProductDetail() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  usePageTitle(product ? `${product.name} · ExposeNest` : 'Product not found · ExposeNest')

  if (!product) return <NotFound />

  const review = getArticle(product.reviewSlug)
  const others = products.filter((item) => item.slug !== product.slug).slice(0, 3)

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <figure className="plate">
        <img src={product.image} alt={product.imageAlt} />
      </figure>
      <div className="wrap sheet">
        <p className="crumb">
          <Link to="/products">Products</Link> / {product.category}
        </p>
        <div className="sheet__top">
          <div>
            <h1>{product.name}</h1>
            <p className="lead">{product.summary}</p>
          </div>
          <p className="sheet__price">
            {product.price}
            <span>Noted {formatDate(product.date)}</span>
          </p>
        </div>
        {review ? <Link className="text-link" to={`/blog/${review.slug}`}>Read the full review</Link> : null}
        <table className="spec-table">
          <caption className="sr-only">Specifications</caption>
          <tbody>
            {product.specs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="wrap sheet-body">
        <div>
          <h2>Why it is on the bench</h2>
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {product.gallery?.map((shot) => (
            <img key={shot.src} className="sheet-body__shot" src={shot.src} alt={shot.alt} />
          ))}
        </div>
        <aside>
          <h2>Worth knowing</h2>
          <ol>
            {product.highlights.map((item) => <li key={item}>{item}</li>)}
          </ol>
          <p className="sheet-note"><strong>Best for. </strong>{product.bestFor}</p>
        </aside>
      </section>

      <section className="wrap">
        <h2 className="read-next__title">Also on the bench</h2>
        <ol className="also">
          {others.map((item) => (
            <li key={item.slug}>
              <Link to={`/products/${item.slug}`}>
                <img src={item.image} alt="" />
                <span>{item.category}</span>
                <strong>{item.name}</strong>
                <em>{item.price}</em>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
