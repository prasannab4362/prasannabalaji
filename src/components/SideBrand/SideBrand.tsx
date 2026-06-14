"use client";

import React, { useEffect, useRef } from 'react';
import styles from './SideBrand.module.css';
import gsap from 'gsap';

export default function SideBrand() {
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in after initial hero load
    gsap.fromTo(brandRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 1, delay: 2, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={brandRef} className={styles.sideBrand}>
      <div className={styles.text}>
        Prasanna B <span>// AI & Automation Engineer</span>
      </div>
    </div>
  );
}
