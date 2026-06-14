"use client";

import React, { useEffect, useRef } from 'react';
import styles from './SkillsMarquee.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsList = [
  "Next.js", "Python", "Three.js", "LangChain", "RAG Systems", "React", "Docker", "Stable Diffusion",
  "OpenCV", "TensorFlow", "PyTorch", "TypeScript", "Node.js", "LangGraph", "Ollama", "ESP32 / IoT",
  "FAISS", "GSAP Animations", "Tailwind CSS", "Gemini API", "AI Agents", "VLM / Multimodal"
];

const categories = [
  {
    title: "AI Engineering & Orchestration",
    description: "Building autonomous agents and intelligent RAG workflows.",
    skills: ["AI Agents", "LangChain", "LangGraph", "FAISS", "RAG Systems", "Vector Databases", "Prompt Engineering", "LLM Orchestration"]
  },
  {
    title: "Deep Learning & CV",
    description: "Training, fine-tuning, and running advanced model pipelines.",
    skills: ["TensorFlow", "PyTorch", "Stable Diffusion", "OpenCV", "VLM / Multimodal", "Qwen VL", "Gemma", "Ollama", "Face Recognition"]
  },
  {
    title: "Web Architecture & Creative Dev",
    description: "Crafting beautiful, high-performance web experiences.",
    skills: ["Next.js", "React", "Three.js", "Node.js", "TypeScript", "JavaScript", "GSAP Animations", "CSS Modules", "Tailwind CSS", "WebGL"]
  },
  {
    title: "DevOps & Hardware Integration",
    description: "Containerizing services and connecting IoT endpoints.",
    skills: ["Docker", "Git / GitHub", "ESP32 / IoT", "Microcontrollers", "REST APIs", "PostgreSQL", "Linux Systems", "Vercel / CI-CD"]
  }
];

export default function SkillsMarquee() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation for cards
    gsap.fromTo(cardsRef.current,
      { 
        opacity: 0, 
        y: 60, 
        rotateX: 10,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.categories}`,
          start: "top 85%",
        }
      }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate 3D tilt degree based on mouse position relative to card center
    const angleX = (yc - y) / 10; 
    const angleY = (x - xc) / 10; 

    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
      borderColor: "rgba(16, 185, 129, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      borderColor: "rgba(16, 185, 129, 0.1)",
      duration: 0.5,
      ease: "power3.out"
    });
  };

  return (
    <section className={styles.container} id="skills" ref={containerRef}>
      
      <div className={`${styles.header} skills-header`}>
        <span className={styles.tagline}>TECHNOLOGY ARSENAL</span>
        <h1 className={styles.title}>Frameworks & Tooling</h1>
        <p className={styles.subtitle}>
          Architecting from multi-modal LLM frameworks and computer vision models to modern, scalable full-stack web systems.
        </p>
      </div>

      {/* Infinite Marquee with emerald neon style */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {/* Double the list to make it seamless */}
          {[...skillsList, ...skillsList].map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Categorized 3D Tilt Grid */}
      <div className={styles.categories}>
        {categories.map((cat, i) => (
          <div 
            key={i} 
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className={styles.category}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <p className={styles.catDesc}>{cat.description}</p>
            </div>
            
            <div className={styles.tags}>
              {cat.skills.map((skill, j) => (
                <span key={j} className={styles.tag}>
                  <span className={styles.tagDot}></span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
