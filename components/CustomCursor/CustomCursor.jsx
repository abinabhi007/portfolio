'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      ring.style.left = ringX.current + 'px';
      ring.style.top = ringY.current + 'px';
      requestAnimationFrame(animate);
    };

    const onEnter = () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      ring.style.width = '48px';
      ring.style.height = '48px';
    };

    const onLeave = () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      ring.style.width = '32px';
      ring.style.height = '32px';
    };

    document.addEventListener('mousemove', onMouseMove);

    const interactives = document.querySelectorAll('a, button');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, [isLargeScreen]);

  if (!isLargeScreen) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef} className={styles.cursorRing} />
    </>
  );
}
