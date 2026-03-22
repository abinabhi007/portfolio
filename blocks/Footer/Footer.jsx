import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Designed &amp; built by <span>Abin HN</span> · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
