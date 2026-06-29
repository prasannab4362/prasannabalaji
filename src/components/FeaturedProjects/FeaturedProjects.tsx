"use client";

import React, { useEffect, useRef } from 'react';
import styles from './FeaturedProjects.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Image as ImageIcon, Video, FileText, MessageSquare, Scale, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nami Agentic AI Assistant",
    desc: "Autonomous personal orchestrator reading/replying to emails and scheduling calendars via natural language commands, resolving daily scheduling latency.",
    tags: ["Python", "Gmail API", "Google Calendar", "LLMs", "Tool-Call"],
    icon: <Bot size={32} />
  },
  {
    title: "Car Studio AI Pipeline",
    desc: "Background segmentation, lighting matching, and studio retouching for vehicle photography. Cut processing latency by ~80% for 200+ images/day.",
    tags: ["Stable Diffusion", "Qwen Image", "Python", "ComfyUI"],
    icon: <ImageIcon size={32} />
  },
  {
    title: "AI Video Automation System",
    desc: "End-to-end Python script that merges clips, applies audio overlays, overlays AI-generated TTS scripts, and reduces turnaround time under 15 minutes.",
    tags: ["Python", "FFmpeg", "TTS", "Open-source LLMs"],
    icon: <Video size={32} />
  },
  {
    title: "VLM Invoice & Card Reader",
    desc: "Vision Language Model pipeline extracting structured details from invoices and business cards at 92%+ accuracy, outputting clean JSON payload.",
    tags: ["Qwen 2.5 VL", "FireRedOCR", "Python", "ERP Integration"],
    icon: <FileText size={32} />
  },
  {
    title: "WhatsApp Conversational Agent",
    desc: "Multi-turn conversational bot on WATI with integrated escalation routing, webhook synchronization, and +35% intent detection accuracy.",
    tags: ["WATI", "Webhooks", "Prompt Engineering", "NLP"],
    icon: <MessageSquare size={32} />
  },
  {
    title: "AI IPC Legal Assistant",
    desc: "Domain-specific RAG grounded in Indian Constitution and IPC code references, outputting strict source citations with zero hallucination.",
    tags: ["Gemini Flash", "LangChain", "FAISS", "Streamlit"],
    icon: <Scale size={32} />
  }
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.' + styles.projectCard) as HTMLElement[];
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className={styles.container} id="featured-projects" ref={containerRef}>
      <div className={styles.content}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>PORTFOLIO</span>
          <h2 className={styles.title}>Production-Grade Artifacts</h2>
          <p className={styles.subtitle}>
            Deploying cognitive models, automated processing loops, and domain-specific agents to solve actual business hurdles.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid} ref={gridRef}>
          {projects.map((proj, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  {proj.icon}
                </div>
                <span className={styles.cardArrow}>
                  <ArrowUpRight size={18} />
                </span>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <p className={styles.projectDesc}>{proj.desc}</p>
              </div>

              <div className={styles.cardFooter}>
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
