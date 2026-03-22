'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';

const navItems = ['about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.dataset.theme || 'light';
  });

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const handleScroll = () => {
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className={styles.navbar}>
      <Link href="#" className={styles.navLogo} onClick={closeMenu}>
        Abin
      </Link>

      <div className={styles.navControls}>
        <button
          type="button"
          className={`${styles.themeToggle} ${theme === 'dark' ? styles.isDark : ''}`}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className={`${styles.toggleSideIcon} ${styles.toggleSun}`} aria-hidden="true">
            <i className="bi bi-sun-fill" />
          </span>
          <span className={`${styles.toggleSideIcon} ${styles.toggleMoon}`} aria-hidden="true">
            <i className="bi bi-moon-stars-fill" />
          </span>
          <span className={styles.toggleIcon} aria-hidden="true">
            <i className={`bi ${theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`} />
          </span>
        </button>

        <button
          type="button"
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.navActions} ${isMenuOpen ? styles.navActionsOpen : ''}`} id="mobile-navigation">
        <ul className={styles.navLinks}>
          {navItems.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? styles.active : ''}
                onClick={closeMenu}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
