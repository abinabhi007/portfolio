import Link from 'next/link';
import styles from './Projects.module.scss';

const projects = [
  {
    icon: 'celebration',
    title: 'Loyal Events & Holidays',
    desc: 'A professional event management and tour planning platform. Features dynamic event listings, customized travel galleries, and contact/booking forms integrated with a Nodemailer backend.',
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Nodemailer'],
    link: "https://loyal-events.vercel.app/"
  },
  {
    icon: 'shopping_bag',
    title: 'SaaS E-Commerce Platform',
    desc: 'Contributed to building a scalable SaaS-based e-commerce platform on Skartio AI Cloud. Developed dynamic frontend components, integrated REST APIs, and built responsive UIs for online store management.',
    stack: ['React.js', 'Django', 'REST API', 'MySQL'],
    link:"https://skartio.com/apps/themestore/?stream=ECOMMERCE"
  },
  {
    icon: 'web',
    title: 'Full-Stack Web Application',
    desc: 'A full-stack web application built with Django backend and React frontend. Features user authentication, dynamic data rendering, and a clean responsive design optimised for all screen sizes.',
    stack: ['Django', 'React', 'Bootstrap', 'MongoDB'],
  },
  {
    icon: 'api',
    title: 'REST API Service',
    desc: 'Designed and implemented a RESTful API service with Django REST Framework. Includes token-based authentication, data serialisation, filtering endpoints, and full API documentation via Postman.',
    stack: ['Python', 'Django REST', 'Postman', 'MySQL'],
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
          const CardContent = (
            <div
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
              </div>
            </div>
          );

          return project.link ? (
            <Link
              href={project.link}
              target="_blank"
              key={project.title}
              style={{ textDecoration: 'none', color: 'inherit', cursor: 'none' }}
            >
              {CardContent}
            </Link>
          ) : (
            <div key={project.title} style={{ cursor: 'none' }}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
