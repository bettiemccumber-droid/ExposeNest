import { useState } from 'react'
import { SocialWidget } from '../components/SocialWidget'
import { usePageTitle } from '../lib/hooks'

/**
 * 校验联系表单。
 * @param {{ name: string, email: string, subject: string, message: string }} values
 * @returns {Record<string, string>}
 */
function validate(values) {
  /** @type {Record<string, string>} */
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.subject.trim()) errors.subject = 'Add a subject.'
  if (values.message.trim().length < 12) errors.message = 'Write at least a sentence so we know what to test.'
  return errors
}

/**
 * 联系页。左侧是压暗的照片栏，右侧是下划线表单。
 */
export function Contact() {
  usePageTitle('Contact · ExposeNest')
  const [errors, setErrors] = useState(/** @type {Record<string, string>} */ ({}))
  const [done, setDone] = useState(/** @type {{ name: string, email: string, subject: string } | null} */ (null))

  /**
   * 提交前校验，通过后展示确认。
   * @param {import('react').FormEvent<HTMLFormElement>} event
   */
  function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: data.get('name')?.toString() || '',
      email: data.get('email')?.toString() || '',
      subject: data.get('subject')?.toString() || '',
      message: data.get('message')?.toString() || '',
    }
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setDone({ name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim() })
    form.reset()
  }

  return (
    <div className="contact-screen">
      <aside className="contact-aside">
        <p className="eyebrow">Contact</p>
        <h1>Send the desk a name, not a pitch.</h1>
        <p>A product, a platform, or a correction. The form checks the note in the browser and confirms it on the page.</p>
        <SocialWidget tone="text" title="" onDark />
      </aside>
      <div className="contact-main">
        {done ? (
          <div className="success" role="status">
            <p className="eyebrow">Received</p>
            <h2>Thank you, {done.name}.</h2>
            <p>Your note about “{done.subject}” is confirmed for {done.email}. This page stores it for the visit only. A mailbox is not connected, so nothing was emailed.</p>
            <button type="button" className="text-link" onClick={() => setDone(null)}>
              Send another
            </button>
          </div>
        ) : (
          <form className="form line-form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" />
              {errors.name ? <p className="error">{errors.name}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" />
              {errors.email ? <p className="error">{errors.email}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" />
              {errors.subject ? <p className="error">{errors.subject}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" />
              {errors.message ? <p className="error">{errors.message}</p> : null}
            </div>
            <button className="btn btn--solid" type="submit">Send the note</button>
          </form>
        )}
      </div>
    </div>
  )
}
