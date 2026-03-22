import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText} data-aos="fade-right">
        <div className={styles.heroEyebrow} data-aos="fade-up" style={{ '--aos-delay': '80ms' }}>
          Associate Software Engineer
        </div>
        <h1 className={styles.heroName} data-aos="fade-up" style={{ '--aos-delay': '160ms' }}>
          Abin &nbsp;<em>HN.</em>
        </h1>
        <p className={styles.heroTagline} data-aos="fade-up" style={{ '--aos-delay': '240ms' }}>
          Building scalable web applications with clean code and modern UI,
          from backend systems to responsive interfaces.
        </p>
        <div className={styles.heroCta} data-aos="fade-up" style={{ '--aos-delay': '320ms' }}>
          <a href="#projects" className="btn-primary-custom">View Projects</a>
          <a href="#contact" className="btn-outline-custom">Get In Touch</a>
        </div>
      </div>

      <div className={styles.heroVisual} data-aos="zoom-in" style={{ '--aos-delay': '180ms' }}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatarBg} />
          <div className={styles.avatarInitials}>AH</div>

          <div className={styles.avatarCard} data-aos="fade-up" style={{ '--aos-delay': '360ms' }}>
            <div className={styles.cardDot} />
            <div>
              <div className={styles.cardLabel}>Open to Opportunities</div>
              <div className={styles.cardSub}>Full-Stack Development</div>
            </div>
          </div>

          <div className={styles.avatarCard2} data-aos="fade-left" style={{ '--aos-delay': '460ms' }}>
            <div className={styles.card2Title}>Core Stack</div>
            <div className={styles.stackPills}>
              {['Python', 'Django', 'React', 'Next.js'].map((t) => (
                <span key={t} className={styles.pill}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
