"use client";

import React, { useEffect, useRef } from 'react';
import styles from './FeaturedProjects.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Image as ImageIcon, Video, FileText, MessageSquare, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nami — Agentic AI Personal Assistant",
    desc: "Fully autonomous agent that reads and replies to emails, schedules and manages calendar events, and surfaces daily priorities — all through natural language commands.",
    tags: ["Python", "Gmail API", "Google Calendar", "LLM", "Tool-Use"],
    icon: <Bot size={48} />
  },
  {
    title: "Car Photo Studio AI Pipeline",
    desc: "Automated background replacement, lighting correction, and studio-finish pipeline for automotive photography; 80% faster than manual editing at 200+ images/day throughput.",
    tags: ["Stable Diffusion", "Qwen Image Edit", "Python", "ComfyUI"],
    icon: <ImageIcon size={48} />
  },
  {
    title: "AI Video Automation System",
    desc: "Fully automated video production pipeline — clip merging, TTS narration, music mixing, and enhancement — reducing turnaround from 3–4 hours to under 15 minutes.",
    tags: ["Python", "FFmpeg", "TTS", "Open-source LLMs"],
    icon: <Video size={48} />
  },
  {
    title: "VLM Invoice & Business Card Reader",
    desc: "Vision Language Model pipeline extracting structured data from invoices and business cards at 92%+ accuracy; outputs JSON for direct ERP/CRM integration.",
    tags: ["Qwen 2.5 VL", "FireRedOCR", "Python"],
    icon: <FileText size={48} />
  },
  {
    title: "WhatsApp AI Agent",
    desc: "AI-powered conversational agents with multi-turn flows, intent detection (+35%), webhook automation, and escalation logic for unresolved queries.",
    tags: ["WATI", "Webhooks", "Prompt Engineering", "NLP"],
    icon: <MessageSquare size={48} />
  },
  {
    title: "AI Legal Assistant",
    desc: "Domain-specific RAG chatbot grounded in IPC and Indian Constitution texts; every answer includes source citations — zero hallucination on in-domain queries.",
    tags: ["Gemini 1.5 Flash", "LangChain", "FAISS", "Streamlit"],
    icon: <Scale size={48} />
  }
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.' + styles.projectCard) as HTMLElement[];
    
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    });
  }, []);

  return (
    <section className={styles.container} id="featured-projects" ref={containerRef}>
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.grid}>
          {projects.map((proj, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.cardVisual}>
                <div className={styles.iconWrapper}>
                  {proj.icon}
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <p className={styles.projectDesc}>{proj.desc}</p>
                <div className={styles.tags}>
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.tag}>{tag}</span>
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
