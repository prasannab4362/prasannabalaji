"use client";

import React from 'react';
import styles from './SkillsMarquee.module.css';

const skillsList = [
  "Python", "AI Agents", "VLM", "LangChain", "FAISS", "TensorFlow", "Stable Diffusion", 
  "OpenCV", "Flutter", "Next.js", "Qwen3", "Voice AI", "WhatsApp Bot", "RAG", "IoT / ESP32", 
  "Docker", "Gemini API", "PyTorch"
];

const categories = [
  {
    title: "Agentic AI & LLM Systems",
    skills: ["AI Agents", "LangChain", "LangGraph", "RAG", "FAISS", "Prompt Engineering", "Tool-Use", "LLM Orchestration"]
  },
  {
    title: "Generative AI & Foundation Models",
    skills: ["Stable Diffusion", "Qwen 2.5 VL", "Gemma 4", "Gemini", "Ollama", "LM Studio", "FireRedOCR", "VLM", "Hugging Face"]
  },
  {
    title: "Computer Vision & NLP",
    skills: ["OpenCV", "spaCy", "Transformers", "OCR", "Face Recognition", "Liveness Detection", "Image Processing"]
  },
  {
    title: "Tools & Infrastructure",
    skills: ["Python", "Streamlit", "Docker", "Git/GitHub", "FFmpeg", "WATI (WhatsApp)", "Google Calendar API", "REST APIs"]
  }
];

export default function SkillsMarquee() {
  return (
    <section className={styles.container} id="skills">
      
      {/* Infinite Marquee */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {/* Double the list to make it seamless */}
          {[...skillsList, ...skillsList].map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Categorized Grid */}
      <div className={styles.categories}>
        {categories.map((cat, i) => (
          <div key={i} className={styles.category}>
            <h3 className={styles.catTitle}>{cat.title}</h3>
            <div className={styles.tags}>
              {cat.skills.map((skill, j) => (
                <span key={j} className={styles.tag}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
