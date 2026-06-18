import Link from 'next/link';
import styles from './Projects.module.scss';

const projects = [
  {
    icon: 'sports_soccer',
    title: 'Dreamcup',
    desc: 'Full-stack fantasy football platform featuring JWT authentication, fantasy team management, captain/vice-captain selection, live World Cup data integration, leaderboards, and real-time match tracking.',
    stack: ['Next.js', 'Node.js', 'JWT Auth', 'Express.js', 'MongoDB', 'football-data.org API'],
    link: 'https://dreamcup.vercel.app',
    github: 'https://github.com/abinabhi007/DreamCup'
  },
  {
    icon: 'shopping_bag',
    title: 'SaaS E-Commerce Platform',
    desc: 'Contributed to building a scalable SaaS-based e-commerce platform on Skartio AI Cloud. Developed dynamic frontend components, integrated REST APIs, and built responsive UIs for online store management.',
    stack: ['Next.js', 'Redux Toolkit', 'REST API', 'Sass', 'Bootstrap'],
    link: "https://skartio.com/apps/themestore/?stream=ECOMMERCE",
    github: ''
  },
  {
    icon: 'redeem',
    title: 'Loyal Events & Holidays',
    desc: 'A professional event management and tour planning platform. Features dynamic event listings, customized travel galleries, and contact/booking forms integrated with a Nodemailer backend.',
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Nodemailer'],
    link: "https://loyal-events.vercel.app/",
    github: 'https://github.com/abinabhi007/loyal-events'
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel} data-aos="fade-up">Projects</div>
        <h2 className={styles.sectionTitle} data-aos="fade-up" style={{ '--aos-delay': '90ms' }}>
          Things I&apos;ve Built
        </h2>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project, index) => {
          return (
            <div
              key={project.title}
              className={styles.projectCard}
              data-aos="reveal"
              style={{ '--aos-delay': `${120 + index * 110}ms` }}
            >
              <div className={styles.projectImg}>
                <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 'inherit' }}>
                  {project.icon}
                </span>
              </div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.desc}</p>
                <div className={styles.projectStack}>
                  {project.stack.map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={styles.stackTag}
                      data-aos="fade-up"
                      style={{ '--aos-delay': `${230 + index * 110 + tagIndex * 45}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {project.github && (
                    <Link href={project.github} target="_blank" className={styles.linkBtn} style={{ cursor: 'none' }}>
                      <i className="bi bi-github"></i> Source
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link} target="_blank" className={styles.linkBtn} style={{ cursor: 'none' }}>
                      <i className="bi bi-box-arrow-up-right"></i> Live
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
