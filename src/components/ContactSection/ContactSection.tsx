"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';
import gsap from 'gsap';
import { Mail, Phone, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. GSAP entrance animations
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    tl.fromTo(cardGridRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
    tl.fromTo(badgeRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
      "-=0.2"
    );

    // 2. Load / Re-render LinkedIn Badge
    if (typeof window !== 'undefined') {
      const initLinkedIn = () => {
        if ((window as any).LIRenderAll) {
          (window as any).LIRenderAll();
        } else {
          // If script is not loaded, wait and try again or load it
          const id = 'linkedin-profile-script';
          if (!document.getElementById(id)) {
            const script = document.createElement('script');
            script.id = id;
            script.src = 'https://platform.linkedin.com/badges/js/profile.js';
            script.async = true;
            script.defer = true;
            script.type = 'text/javascript';
            script.onload = () => {
              if ((window as any).LIRenderAll) (window as any).LIRenderAll();
            };
            document.body.appendChild(script);
          }
        }
      };

      // Slight delay to ensure DOM is fully resolved
      const timer = setTimeout(initLinkedIn, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>CONNECT WITH ME</span>
          <h1 className={styles.title}>Let's Build Something <span className={styles.gradientText}>Intelligent</span></h1>
          <p className={styles.subtitle}>
            Have a project, job opening, or collaboration proposal in mind? Reach out and let's turn agentic AI concepts into production realities.
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Direct Contacts */}
          <div className={styles.contactDetails} ref={cardGridRef}>
            <a href="mailto:prasannamb4362@gmail.com" className={styles.card}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Direct Email</span>
                <span className={styles.cardValue}>prasannamb4362@gmail.com</span>
                <span className={styles.actionText}>Send an email <ExternalLink size={14} className={styles.inlineIcon} /></span>
              </div>
            </a>

            <a href="tel:+918610318934" className={styles.card}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Mobile Number</span>
                <span className={styles.cardValue}>+91 8610318934</span>
                <span className={styles.actionText}>Call or message <ExternalLink size={14} className={styles.inlineIcon} /></span>
              </div>
            </a>

            <div className={styles.infoBox}>
              <h3>Availability & Logistics</h3>
              <p>Based in Coimbatore, Tamil Nadu, India. Open to remote opportunities worldwide and hybrid/on-site arrangements.</p>
              <div className={styles.locationBadge}>
                <span className={styles.pulseDot}></span> Coimbatore, India
              </div>
            </div>
          </div>

          {/* LinkedIn Profile Badge */}
          <div className={styles.badgeContainer} ref={badgeRef}>
            <div className={styles.badgeWrapper}>
              <h3 className={styles.badgeTitle}>LinkedIn Profile</h3>
              
              <div className={styles.badgePlaceholder}>
                <div 
                  className="badge-base LI-profile-badge" 
                  data-locale="en_US" 
                  data-size="medium" 
                  data-theme="dark" 
                  data-type="VERTICAL" 
                  data-vanity="prasannabalaji18" 
                  data-version="v1"
                >
                  <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/prasannabalaji18?trk=profile-badge">
                    Prasanna B
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
