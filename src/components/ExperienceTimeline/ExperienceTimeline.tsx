"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ExperienceTimeline.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Python Developer — AI & Agentic AI",
    company: "Creative Bees",
    location: "Coimbatore",
    date: "Aug 2025 – Present",
    responsibilities: [
      "Architected Nami, a production agentic AI assistant integrating Gmail and Calendar APIs to summarize emails, schedule meetings, and manage logs — reducing daily admin overhead by ~70%.",
      "Engineered an automated Stable Diffusion image editing pipeline for raw automotive photos, reducing retouching cycle times by ~80% and processing 200+ images daily.",
      "Built a command-line AI Video automation compiler (Python + FFmpeg) merging raw clips with TTS narration and audio tracks in under 15 minutes.",
      "Deployed Vision Language Model (VLM) pipelines (Qwen 2.5 VL + FireRedOCR) for invoice digitisation, achieving 92%+ field accuracy.",
      "Designed WhatsApp AI Agents on WATI, boosting customer intent detection accuracy by 35% using structured multi-turn conversation logic."
    ]
  },
  {
    role: "Robotics & AI/ML Engineer",
    company: "ROBOMATIIC (CADD Technologies)",
    location: "Coimbatore",
    date: "Jun 2023 – Jul 2025",
    responsibilities: [
      "Delivered 4+ AI/ML EdTech applications, directing specifications, model evaluation, and client demonstrations.",
      "Built a CNN face attendance register with integrated liveness classification (OpenCV + TensorFlow) to prevent spoofing for 500+ users.",
      "Architected EduMentor, a GenAI platform using LangChain + Gemini APIs for automated quiz generation and textbook summarisation.",
      "Mentored junior engineers on Git workflows, data pre-processing, and model evaluation parameters."
    ]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 1. Line draw animation on scroll
    gsap.fromTo(lineProgressRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.timeline}`,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true
        }
      }
    );

    // 2. Fade/Slide in each timeline card and activate dot on scroll
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const card = item.querySelector('.' + styles.timelineCard);
      const dot = item.querySelector('.' + styles.timelineDot);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
        }
      });

      tl.fromTo(dot,
        { scale: 0, backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(255, 255, 255, 0.1)" },
        { scale: 1, backgroundColor: "#10b981", borderColor: "#10b981", duration: 0.4, ease: "back.out(1.8)" }
      );

      tl.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.25"
      );
    });
  }, []);

  return (
    <section className={styles.container} id="experience" ref={containerRef}>
      <div className={styles.content}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>CHRONOLOGY</span>
          <h2 className={styles.title}>Professional Roadmap</h2>
          <p className={styles.subtitle}>
            A journey focused on engineering intelligence, automating high-friction workloads, and training production ML pipelines.
          </p>
        </div>

        {/* Timeline Container */}
        <div className={styles.timeline}>
          {/* Background Track Line */}
          <div className={styles.timelineLineTrack}></div>
          
          {/* Animated Active Line */}
          <div className={styles.timelineLineProgress} ref={lineProgressRef}></div>

          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
            >
              {/* Central Timeline Node */}
              <div className={styles.timelineDot}></div>

              {/* Responsive Card */}
              <div className={styles.timelineCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.roleInfo}>
                    <Briefcase size={18} className={styles.roleIcon} />
                    <h3 className={styles.role}>{exp.role}</h3>
                  </div>
                  <div className={styles.metaInfo}>
                    <span className={styles.companyName}>{exp.company}</span>
                    <div className={styles.metaRow}>
                      <span className={styles.metaItem}>
                        <Calendar size={13} />
                        {exp.date}
                      </span>
                      <span className={styles.metaItem}>
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className={styles.responsibilities}>
                  {exp.responsibilities.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
