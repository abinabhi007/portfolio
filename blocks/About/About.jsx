import styles from './About.module.scss';

const details = [
  { label: 'Role', value: 'Associate Software Engineer' },
  { label: 'Company', value: 'Skartio AI Cloud' },
  { label: 'Specialization', value: 'Full-Stack Development' },
  { label: 'Education', value: 'Computer Science' },
];

const expTags = ['React.js', 'Django', 'REST APIs', 'SaaS', 'E-Commerce'];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutGrid}>
        <div data-aos="fade-right">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel} data-aos="fade-up">About Me</div>
            <h2 className={styles.sectionTitle} data-aos="fade-up" style={{ '--aos-delay': '90ms' }}>
              Full-Stack Developer
              <br />
              at Heart
            </h2>
          </div>

          <p className={styles.aboutBio} data-aos="fade-up" style={{ '--aos-delay': '170ms' }}>
            I&apos;m an <strong>Associate Software Engineer at Skartio AI Cloud</strong>,
            passionate about building modern web applications that are both
            technically robust and delightful to use. I specialise in{' '}
            <strong>Python, Django, JavaScript, and React (Next.js)</strong> to
            create scalable backend systems and responsive user interfaces.
            <br /><br />
            With a background in <strong>Computer Science</strong> and hands-on
            experience in full-stack development, I enjoy solving real-world
            problems through clean code and efficient system design. I believe
            great software is built at the intersection of engineering discipline
            and design sensibility.
          </p>

          <div className={styles.aboutDetails}>
            {details.map(({ label, value }, index) => (
              <div key={label} data-aos="fade-up" style={{ '--aos-delay': `${220 + index * 70}ms` }}>
                <div className={styles.detailLabel}>{label}</div>
                <div className={styles.detailValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-left" style={{ '--aos-delay': '180ms' }}>
          <div className={styles.expCard}>
            <div className={styles.expCompany}>Skartio AI Cloud</div>
            <div className={styles.expRole}>Associate Software Engineer</div>
            <p className={styles.expDesc}>
              Contributing to SaaS-based e-commerce web applications. Building
              dynamic frontend components, integrating REST APIs, and
              implementing responsive UIs for modern online stores on the
              Skartio AI Cloud platform.
            </p>
            <div className={styles.expTags}>
              {expTags.map((tag, index) => (
                <span key={tag} className={styles.expTag} data-aos="fade-up" style={{ '--aos-delay': `${280 + index * 55}ms` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
