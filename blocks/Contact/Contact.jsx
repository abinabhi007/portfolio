import styles from './Contact.module.scss';

const links = [
  { icon: 'bi bi-envelope', title: 'Email Me', sub: 'abinhn1@gmail.com', href: 'mailto:abinhn1@gmail.com' },
  { icon: 'bi bi-linkedin', title: 'LinkedIn', sub: 'linkedin.com/in/abinhn', href: 'https://www.linkedin.com/in/abin-hn/' },
  { icon: 'bi bi-github', title: 'GitHub', sub: 'github.com/abinabhi007', href: 'https://github.com/abinabhi007' },
];

export default function Contact() {
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

        <div className={styles.contactCta} data-aos="fade-left" style={{ '--aos-delay': '220ms' }}>
          <div className={styles.contactBigEmail}>abinhn1@gmail.com</div>
          <p className={styles.contactCtaText}>Drop me a line anytime.</p>
          <a href="mailto:abinhn1@gmail.com" className={styles.ctaBtn}>
            Say Hello <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
