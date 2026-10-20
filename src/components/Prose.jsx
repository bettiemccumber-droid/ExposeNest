/**
 * 渲染文章正文块。只输出已知结构，不解析 HTML。
 * @param {{ blocks: Array<{ type: string, text?: string, items?: string[], src?: string, alt?: string, caption?: string, label?: string }> }} props
 */
export function Prose({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'h2') return <h2 key={key}>{block.text}</h2>
        if (block.type === 'p') return <p key={key}>{block.text}</p>
        if (block.type === 'ul') {
          return (
            <ul key={key}>
              {block.items?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )
        }
        if (block.type === 'ol') {
          return (
            <ol key={key}>
              {block.items?.map((item) => <li key={item}>{item}</li>)}
            </ol>
          )
        }
        if (block.type === 'quote') {
          return <blockquote key={key} className="quote">{block.text}</blockquote>
        }
        if (block.type === 'figure') {
          return (
            <figure key={key}>
              <img src={block.src} alt={block.alt || ''} loading="lazy" />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          )
        }
        if (block.type === 'verdict') {
          return (
            <aside key={key} className="verdict">
              <strong>{block.label}</strong>
              <p>{block.text}</p>
            </aside>
          )
        }
        return null
      })}
    </div>
  )
}
