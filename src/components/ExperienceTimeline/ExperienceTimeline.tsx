"use client";

import React, { useEffect, useRef } from 'react';
import styles from './ExperienceTimeline.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Python Developer — AI & Agentic AI",
    company: "Creative Bees · Coimbatore",
    date: "Aug 2025 – Present",
    responsibilities: [
      "Architected and deployed Nami, a production personal agentic AI assistant integrating Gmail and Google Calendar APIs — autonomously summarises emails, schedules meetings, and manages tasks via natural language, reducing daily admin overhead by ~70%.",
      "Engineered a Stable Diffusion + Qwen image editing pipeline that converts raw car photographs into professional studio-quality images; cut manual retouching time by ~80% and scaled output to 200+ images per day.",
      "Built an end-to-end AI Video Automation system (Python + FFmpeg) that merges 4–5 raw clips, injects AI generated TTS voiceovers, adds background music, and applies video enhancements — reducing production time from 3–4 hours to under 15 minutes per video.",
      "Deployed Vision Language Model (VLM) pipelines using Qwen 2.5 VL and FireRedOCR for automated invoice data extraction and business card digitization, achieving 92%+ field-extraction accuracy with JSON output for ERP/CRM integration.",
      "Designed and deployed WhatsApp AI Agents on the WATI platform — improved intent detection accuracy by 35% through advanced prompt engineering; built webhook-driven automation for multi-turn conversations and escalation logic."
    ]
  },
  {
    role: "Robotics & AI/ML Engineer",
    company: "ROBOMATIIC — A Division of CADD Technologies · Coimbatore",
    date: "Jun 2023 – Jul 2025",
    responsibilities: [
      "Led end-to-end delivery of 4+ AI/ML products for EdTech clients — owning requirements, architecture, development, and live demonstrations.",
      "Delivered a Smart Face-Based Attendance System with real-time CNN-based liveness detection (OpenCV + TensorFlow) — eliminated attendance fraud and automated reporting for 500+ students.",
      "Architected EduMentor, a GenAI-powered RAG platform for textbook Q&A, chapter summarisation, and auto quiz generation (LangChain + Gemini API + Streamlit).",
      "Mentored 3 junior engineers on ML engineering best practices, data preprocessing pipelines, model evaluation, and Git-based collaborative workflows."
    ]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.' + styles.timelineItem) as HTMLElement[];
    
    items.forEach((item) => {
      gsap.fromTo(item, 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.container} id="experience" ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <h3 className={styles.role}>{exp.role}</h3>
              <div className={styles.company}>{exp.company}</div>
              <div className={styles.date}>{exp.date}</div>
              <ul className={styles.responsibilities}>
                {exp.responsibilities.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
