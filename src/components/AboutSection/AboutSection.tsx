"use client";

import React, { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className={styles.container} id="about" ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.summary} ref={textRef}>
          <span className={styles.highlight}>AI Engineer</span> with 3 years of hands-on experience architecting and deploying intelligent systems across <span className={styles.highlight}>generative AI, agentic workflows, computer vision, and NLP.</span> Delivered 8+ production-grade AI solutions — including autonomous AI agents, multi-modal LLM pipelines, real-time computer vision systems, and end-to-end ML platforms — with measurable business impact (up to 80% reduction in manual effort, 35%+ accuracy improvements). 
          <br /><br />
          Deep expertise in <span className={styles.highlight}>LangChain, RAG architectures, open-source LLMs</span> (Qwen, Gemma, Ollama), Stable Diffusion, and agentic AI frameworks. Consistently delivers from zero to production: ideation, architecture, coding, and deployment.
        </p>
      </div>
    </section>
  );
}
