import { Link } from 'react-router-dom'
import { SocialWidget } from '../components/SocialWidget'
import { METHOD_STEPS } from '../data/site'
import { usePageTitle } from '../lib/hooks'

/**
 * 关于页。整幅照片压标题，下面是双栏正文和纵向时间线。
 */
export function About() {
  usePageTitle('About · ExposeNest')

  return (
    <>
      <section
        className="stage"
        style={{ backgroundImage: "url('/images/about.jpg')" }}
        aria-label="About ExposeNest"
      >
        <div className="wrap stage__copy">
          <p className="eyebrow">About</p>
          <h1>A small desk for slow recommendations.</h1>
          <p>
            ExposeNest started as a refusal to publish first impressions. The journal is in English. The tests are dated. When we change our minds, the date changes with us.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap essay">
          <div>
            <p className="eyebrow">The room</p>
            <h2>We are not a showroom.</h2>
          </div>
          <div>
            <p>
              The corridor in the photograph is where comparisons get argued: wood, glass, too many chairs, daylight that makes a screen honest. Most of the writing still happens one floor away, on a window desk, with one camera left out on purpose.
            </p>
            <p>
              Stories run from February 2025 to February 2026. They cover keyboards, headphones, espresso, bags, lighting, cameras, and the platforms people actually file work in: Notion, Figma, newsletter tools, and project boards.
            </p>
            <figure className="essay__inset">
              <img src="/images/studio.jpg" alt="Two people marking notes beside laptops" />
              <figcaption>Notes start as a conversation, then survive as a page.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow">How a note gets made</p>
          <ol className="timeline">
            {METHOD_STEPS.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap about-end">
          <div>
            <h2>Find the desk elsewhere.</h2>
            <SocialWidget tone="text" title="" />
          </div>
          <Link className="btn btn--ink" to="/contact">Write a note</Link>
        </div>
      </section>
    </>
  )
}
