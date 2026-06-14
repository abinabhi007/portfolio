import styles from './Skills.module.scss';

const skillGroups = [
  {
    icon: 'code',
    title: 'Programming Languages',
    items: ['Python', 'Node.js', 'JavaScript', 'HTML5', , 'TypeScript'],
  },
  {
    icon: 'layers',
    title: 'Frameworks & Libraries',
    items: ['Django', 'Express', 'React.js', 'Next.js', 'Bootstrap'],
  },
  {
    icon: 'database',
    title: 'Databases',
    items: ['MySQL', 'MongoDB'],
  },
  {
    icon: 'construction',
    title: 'Tools & Technologies',
    items: ['Git & GitHub', 'REST APIs', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionLabel} data-aos="fade-up">Skills</div>
        <h2 className={styles.sectionTitle} data-aos="fade-up" style={{ '--aos-delay': '90ms' }}>
          Tools of the Trade
        </h2>
      </div>

      <div className={styles.skillsGrid}>
        {skillGroups.map((group, index) => (
          <div
            key={group.title}
            className={styles.skillGroup}
            data-aos="fade-up"
            style={{ '--aos-delay': `${120 + index * 90}ms` }}
          >
            <div className={styles.skillGroupIcon}>
              <span className="material-symbols-outlined">{group.icon}</span>
            </div>
            <div className={styles.skillGroupTitle}>{group.title}</div>
            <ul className={styles.skillList}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
