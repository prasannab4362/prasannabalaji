"use client";

import React, { useEffect, useRef, useState } from 'react';
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

  const [roleText, setRoleText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);

  const words = ["Python Developer", "AI & ML Engineer", "VLM Product Builder", "Agentic AI Builder", "GenAI Engineer"];

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

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setRoleText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setTypeSpeed(100);

        if (charIndex + 1 === currentWord.length) {
          setTypeSpeed(1500); // pause at the end
          setIsDeleting(true);
        }
      } else {
        setRoleText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setTypeSpeed(50);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
          setTypeSpeed(500); // pause before next word
        }
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, typeSpeed]);

  return (
    <section className={styles.container} ref={containerRef} id="home">
      {/* 3D WebGL Particle Constellation Layer */}
      <div className={styles.webglLayer}>
        <CinematicLayer />
      </div>

      <div className={styles.vignette}></div>

      {/* Main Hero Card */}
      <div className={styles.overlay}>
        <div className={styles.heroCard}>
          <div className={styles.tagline} ref={taglineRef}>
            <span className={styles.pulseDot}></span> Available for Work
          </div>
          
          <h1 className={styles.name}>
            <span ref={firstNameRef} className={styles.firstName}>PRASANNA</span>
            <span ref={lastNameRef} className={styles.lastName}>B</span>
          </h1>

          <div className={styles.typewriterContainer}>
            <span className={styles.typewriterText}>{roleText}</span>
            <span className={styles.typewriterCursor}></span>
          </div>

          <p className={styles.subtitle} ref={subtitleRef}>
            Python Developer at Creative Bees with prior Robotics Engineer experience at Robomatic, 
            building full-stack, mobile, IoT, VLM/OCR, Agentic AI, and production-ready Python workflows.
          </p>

          <div className={styles.ctaGroup} ref={buttonsRef}>
            <Link href="/projects" className={styles.primaryBtn}>
              Explore My Work <span className={styles.arrow}>→</span>
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div ref={socialsRef} className={styles.socials}>
        <a href="https://github.com/prasannab4362" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </a>
        <a href="https://www.linkedin.com/in/prasanna-balaji18/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
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
