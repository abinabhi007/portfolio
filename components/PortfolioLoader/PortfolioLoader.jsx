'use client';

import { useEffect, useState } from 'react';
import styles from './PortfolioLoader.module.scss';

const MIN_DISPLAY_MS = 1400;

export default function PortfolioLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    function finishLoading() {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

      window.setTimeout(() => {
        setIsLeaving(true);
        document.body.dataset.loading = 'false';

        window.setTimeout(() => {
          setIsVisible(false);
        }, 650);
      }, delay);
    }

    document.body.dataset.loading = 'true';

    if (document.readyState === 'complete') {
      finishLoading();
      return undefined;
    }

    window.addEventListener('load', finishLoading, { once: true });
    return () => {
      window.removeEventListener('load', finishLoading);
      document.body.dataset.loading = 'false';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.loader} ${isLeaving ? styles.loaderExit : ''}`} aria-hidden="true">
      <div className={styles.ambientGlow} />
      <div className={styles.loaderInner}>
        <div className={styles.brandLockup}>
          <span className={styles.brandEyebrow}>Portfolio</span>
          <div className={styles.brandWordmark}>
            Abin <span>HN</span>
          </div>
          <p className={styles.brandSubline}>Engineering clean systems with a sharp visual edge.</p>
        </div>

        <div className={styles.loaderStage}>
          <div className={styles.orbitShell}>
            <div className={styles.orbitRing} />
            <div className={styles.orbitRingAlt} />
            <div className={styles.orbitCore}>AH</div>
          </div>

          <div className={styles.loaderBar}>
            <span className={styles.loaderTrack} />
          </div>

          <div className={styles.loaderDots}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
