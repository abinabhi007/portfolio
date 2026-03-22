import styles from './Skills.module.scss';

const skillGroups = [
  {
    icon: '💻',
    title: 'Programming Languages',
    items: ['Python', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    icon: '⚙️',
    title: 'Frameworks & Libraries',
    items: ['Django', 'React.js', 'Next.js', 'Bootstrap'],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    items: ['MySQL', 'MongoDB'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Technologies',
    items: ['Git & GitHub', 'REST APIs', 'Postman', 'Responsive Web Design'],
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
            <div className={styles.skillGroupIcon}>{group.icon}</div>
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
