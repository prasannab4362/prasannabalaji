"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ExperienceTimeline.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Python Developer",
    company: "Creative Bees",
    location: "Coimbatore, Tamil Nadu, India",
    date: "Aug 2025 – Present",
    responsibilities: [
      "Designing, developing, testing, and deploying scalable Python-based applications for business and AI product workflows.",
      "Building and maintaining RESTful APIs, microservices, and backend integrations that support reliable product features.",
      "Working on AI-enabled automation ideas including VLM/OCR extraction, CRM-ready workflows, and intelligent assistant features.",
      "Collaborating across planning, implementation, debugging, and deployment so application features move cleanly from prototype to use."
    ],
    tags: ["Python", "REST APIs", "Microservices", "Backend Development", "Next.js", "Flutter", "Agentic AI", "VLM"]
  },
  {
    role: "Robotics Engineer",
    company: "Robomatic",
    location: "Coimbatore, Tamil Nadu, India",
    date: "Jun 2023 – Aug 2025",
    responsibilities: [
      "Trained 150+ students in software testing, debugging, quality assurance, Python, R, and software development fundamentals.",
      "Conducted hands-on workshops in Python, R, NLP, TensorFlow, Arduino programming, IoT, and applied AI/ML concepts for student learning programs.",
      "Supported robotics, embedded systems, and AI learning sessions by translating technical topics into practical demos and classroom-ready workflows.",
      "Guided learners through project implementation, model experimentation, code debugging, and presentation of working prototypes."
    ],
    tags: ["Python", "R", "NLP", "TensorFlow", "Arduino", "ESP32", "Arduino Uno R3", "IoT", "PCB", "Software Testing", "Debugging", "Quality Assurance"]
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
        { scale: 0, backgroundColor: "rgba(168, 85, 247, 0.1)", borderColor: "rgba(255, 255, 255, 0.1)" },
        { scale: 1, backgroundColor: "#a855f7", borderColor: "#a855f7", duration: 0.4, ease: "back.out(1.8)" }
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

                <div className={styles.tagsContainer}>
                  {exp.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
