"use client";

import React, { useEffect, useRef } from 'react';
import styles from './Certifications.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    name: "Data Analysis using Python",
    issuer: "NIELIT",
    date: "June–July 2024"
  },
  {
    name: "Data Analytics using R",
    issuer: "Vani Analytics",
    date: "October 2023"
  },
  {
    name: "Google Data Analytics",
    issuer: "Coursera",
    date: "April 2023"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.' + styles.certItem) as HTMLElement[];
    
    items.forEach((item, i) => {
      gsap.fromTo(item, 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.container} id="certifications" ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Certifications</h2>
        <div className={styles.list}>
          {certs.map((cert, idx) => (
            <div key={idx} className={styles.certItem}>
              <div className={styles.certInfo}>
                <Award size={32} className={styles.icon} />
                <div>
                  <h3 className={styles.certName}>{cert.name}</h3>
                  <div className={styles.certIssuer}>{cert.issuer}</div>
                </div>
              </div>
              <div className={styles.certDate}>{cert.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
