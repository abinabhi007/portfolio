'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.scss';

const links = [
  { icon: 'bi bi-envelope', title: 'Email Me', sub: 'abinhn1@gmail.com', href: 'mailto:abinhn1@gmail.com' },
  { icon: 'bi bi-linkedin', title: 'LinkedIn', sub: 'linkedin.com/in/abinhn', href: 'https://www.linkedin.com/in/abin-hn/' },
  { icon: 'bi bi-github', title: 'GitHub', sub: 'github.com/abinabhi007', href: 'https://github.com/abinabhi007' },
];

export default function Contact() {
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;

    const scriptId = 'google-recaptcha-script';
    let script = document.getElementById(scriptId);

    const initializeRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current && widgetIdRef.current === null) {
        window.grecaptcha.ready(() => {
          try {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: siteKey,
              theme: 'dark',
              callback: (token) => {
                setRecaptchaToken(token);
                setErrorMessage('');
              },
              'expired-callback': () => {
                setRecaptchaToken('');
              },
              'error-callback': () => {
                setRecaptchaToken('');
              },
            });
          } catch (e) {
            console.error('Failed to render reCAPTCHA', e);
          }
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = initializeRecaptcha;
      document.body.appendChild(script);
    } else if (window.grecaptcha) {
      initializeRecaptcha();
    }

    return () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (siteKey && !recaptchaToken) {
      setErrorMessage('Please verify that you are not a robot.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
      recaptchaToken,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong while sending your inquiry.');
      }

      formRef.current?.reset();
      setSubmitted(true);
      setRecaptchaToken('');
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending your inquiry.'
      );
      setRecaptchaToken('');
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactGrid}>
        <div data-aos="fade-right">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel} data-aos="fade-up">Contact</div>
            <h2 className={styles.sectionTitle} data-aos="fade-up" style={{ '--aos-delay': '90ms' }}>
              Let&apos;s Work
              <br />
              Together
            </h2>
          </div>

          <p className={styles.contactText} data-aos="fade-up" style={{ '--aos-delay': '170ms' }}>
            Whether you have a project in mind, a question about my work, or just want to say hello,
            I&apos;d love to hear from you. I&apos;m always open to interesting conversations and new opportunities.
          </p>

          <div className={styles.contactLinks}>
            {links.map(({ icon, title, sub, href }, index) => (
              <a
                key={title}
                href={href}
                className={styles.contactLink}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-aos="fade-up"
                style={{ '--aos-delay': `${240 + index * 80}ms` }}
              >
                <div className={styles.linkIcon}>
                  <i className={icon} aria-hidden="true" />
                </div>
                <div className={styles.linkInfo}>
                  <span className={styles.linkTitle}>{title}</span>
                  <span className={styles.linkSub}>{sub}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.formCard} data-aos="fade-left" style={{ '--aos-delay': '220ms' }}>
          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <i className="bi bi-check-lg" />
              </div>
              <h3 className={styles.successTitle}>Message Sent</h3>
              <p className={styles.successText}>
                Thank you for reaching out! Your message was sent successfully. A confirmation email is on its way to your inbox, and I will get back to you shortly.
              </p>
              <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-name">Full Name</label>
                  <input
                    className={styles.input}
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-email">Email Address</label>
                  <input
                    className={styles.input}
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-service">Inquiry Type</label>
                  <select className={styles.input} id="contact-service" name="service">
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Freelance/Full-time Role">Freelance/Full-time Role</option>
                    <option value="Consulting/Mentorship">Consulting/Mentorship</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="contact-message">Your Message</label>
                  <textarea
                    className={styles.input}
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>

                {siteKey && (
                  <div className={styles.fieldGroup}>
                    <div ref={recaptchaRef} style={{ minHeight: '78px' }} />
                  </div>
                )}

                {errorMessage && (
                  <p className={styles.errorMessage} role="alert">
                    {errorMessage}
                  </p>
                )}

                <button className={styles.submitBtn} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <i className="bi bi-arrow-right ms-2" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
