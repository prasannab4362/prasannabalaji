"use client";

import React, { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';
import gsap from 'gsap';
import Link from 'next/link';
import CinematicLayer from '../CinematicLayer/CinematicLayer';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Timeline for elegant text reveal
    const tl = gsap.timeline();
    
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 })
      .to(firstNameRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(lastNameRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(socialsRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
  }, []);

  return (
    <section className={styles.container} ref={containerRef}>
      {/* 3D WebGL Particle Constellation Layer */}
      <div className={styles.webglLayer}>
        <CinematicLayer />
      </div>

      <div className={styles.vignette}></div>

      {/* Main Hero Card */}
      <div className={styles.overlay}>
        <div className={styles.heroCard}>
          <div className={styles.tagline} ref={taglineRef}>
            AI ENGINEER & AUTOMATION ARCHITECT
          </div>
          
          <h1 className={styles.name}>
            <span ref={firstNameRef} className={styles.firstName}>PRASANNA</span>
            <span ref={lastNameRef} className={styles.lastName}>BALAJI</span>
          </h1>

          <p className={styles.subtitle} ref={subtitleRef}>
            I orchestrate autonomous AI agents, deploy secure, multi-modal LLM pipelines, 
            and engineer end-to-end automation engines that turn cognitive capabilities 
            into production assets.
          </p>

          <div className={styles.ctaGroup} ref={buttonsRef}>
            <Link href="/about" className={styles.primaryBtn}>
              Read My Story <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Let's Collaborate
            </Link>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div ref={socialsRef} className={styles.socials}>
        <a href="https://github.com/prasannab4362" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </a>
        <a href="https://in.linkedin.com/in/prasannabalaji18" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </div>

      {/* Floating Scroll Indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll to Navigate</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollLineInner}></div>
        </div>
      </div>
    </section>
  );
}
