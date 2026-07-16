"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './FeaturedProjects.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Bot, Image as ImageIcon, FileText, MessageSquare, Scale, 
  BookOpen, LineChart, TrendingUp, Briefcase, Award, ArrowUpRight, Mic, PhoneCall 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nami Agent - Calendar Bot & Dev AI Agent",
    desc: "An agentic AI assistant for calendar workflows and development support, designed as a testable foundation for user-facing automation.",
    tags: ["Python", "AI Agents", "Automation", "Workflow"],
    categories: ["agentic-ai", "genai"],
    icon: <Bot size={28} />,
    link: "https://github.com/prasannab4362/Nami_agent"
  },
  {
    title: "Buzz Card - VLM Visiting Card Reader",
    desc: "A mobile-first vision-language workflow for reading visiting cards, extracting contact data, and turning physical cards into CRM-ready records.",
    tags: ["VLM", "OCR", "Qwen3", "FireRedOCR", "Mobile AI"],
    categories: ["vlm", "computer-vision", "genai"],
    icon: <FileText size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "Stable Diffusion Car Image Studio",
    desc: "Image editing pipeline for automotive use cases: change car colors, clean messy photos, and generate studio-level vehicle presentation images.",
    tags: ["Stable Diffusion", "ControlNet", "YOLOv8", "OpenCV", "Python"],
    categories: ["image-ai", "genai", "computer-vision"],
    icon: <ImageIcon size={28} />,
    link: "https://github.com/prasannab4362/Car_front_Side_Detection"
  },
  {
    title: "Voice Cloning & Speech Synthesis",
    desc: "A voice AI workflow focused on speaker cloning, clean dataset preparation, and natural speech generation for product demos and assistants.",
    tags: ["TTS", "Voice Cloning", "Python", "Audio ML"],
    categories: ["voice-ai", "genai"],
    icon: <Mic size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "WhatsApp Bot CRM Automation",
    desc: "A conversational CRM workflow for capturing leads, answering first-level queries, updating customer records, and escalating qualified requests.",
    tags: ["WhatsApp API", "CRM", "Python", "Agentic AI"],
    categories: ["crm", "agentic-ai", "genai"],
    icon: <PhoneCall size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "Face Attendance with Anti-Spoofing",
    desc: "A production-grade real-time attendance system that leverages face recognition combined with CNN-based liveness detection to completely prevent spoof attacks.",
    tags: ["OpenCV", "TensorFlow", "CNN", "Streamlit", "Python"],
    categories: ["computer-vision", "ml"],
    icon: <Award size={28} />,
    link: "https://github.com/prasannab4362/Real_Time_Face_Anti-spoofing_Detection"
  },
  {
    title: "AI Legal Assistant (LLM + RAG)",
    desc: "An intelligent legal chatbot that answers complex IPC (Indian Penal Code) and Constitution of India queries with source-level document retrieval powered by RAG architecture.",
    tags: ["Gemini 1.5 Flash", "LangChain", "FAISS", "RAG", "Streamlit"],
    categories: ["genai", "nlp", "ml"],
    icon: <Scale size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "EduPDF Chatbot - Ask Your Lesson",
    desc: "A GenAI-powered personalized learning assistant that enables students to query textbooks, generate summaries, and create custom quizzes from uploaded PDF study materials.",
    tags: ["LangChain", "Gemini API", "Streamlit", "FAISS", "Python"],
    categories: ["genai", "nlp"],
    icon: <BookOpen size={28} />,
    link: "https://github.com/prasannab4362/EduPDF-Chatbot-Ask-Your-Lesson"
  },
  {
    title: "Housing Price Prediction ML Pipeline",
    desc: "A complete end-to-end ML regression pipeline to predict housing prices with advanced feature engineering, PCA-based dimensionality reduction, and thorough model comparison.",
    tags: ["Scikit-learn", "Pandas", "PCA", "Matplotlib", "Python"],
    categories: ["ml", "data-science"],
    icon: <LineChart size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "Stock Analysis Application",
    desc: "A data-driven stock analysis application with web scraping from Screener.in, ML-based pattern analysis, and interactive dashboards to enhance investor decision-making.",
    tags: ["Python", "Django", "Scikit-learn", "BeautifulSoup"],
    categories: ["ml", "data-science"],
    icon: <TrendingUp size={28} />,
    link: "https://github.com/prasannab4362"
  },
  {
    title: "Job Placement Prediction (R)",
    desc: "An R-based data science project using Naive Bayes classification to predict student job placement outcomes from academic and extracurricular features with 85% accuracy.",
    tags: ["R", "Naive Bayes", "ggplot2", "R Studio"],
    categories: ["ml", "data-science"],
    icon: <Briefcase size={28} />,
    link: "https://github.com/prasannab4362"
  }
];

const filters = [
  { id: "all", name: "All Projects" },
  { id: "agentic-ai", name: "Agentic AI" },
  { id: "vlm", name: "VLM" },
  { id: "image-ai", name: "Image AI" },
  { id: "voice-ai", name: "Voice AI" },
  { id: "crm", name: "CRM Bots" },
  { id: "computer-vision", name: "Computer Vision" },
  { id: "genai", name: "Generative AI" },
  { id: "nlp", name: "NLP" },
  { id: "ml", name: "Machine Learning" }
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.categories.includes(activeFilter));

  useEffect(() => {
    // ScrollTrigger initial animations
    const cards = gsap.utils.toArray('.' + styles.projectCard) as HTMLElement[];
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [activeFilter]);

  return (
    <section className={styles.container} id="featured-projects" ref={containerRef}>
      <div className={styles.content}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tagline}>PORTFOLIO</span>
          <h2 className={styles.title}>Featured AI & ML Projects</h2>
          <p className={styles.subtitle}>
            A showcase of production-ready AI products across agentic assistants, vision models, document intelligence, and data analytics.
          </p>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid} ref={gridRef}>
          {filteredProjects.map((proj, idx) => (
            <a 
              key={idx} 
              href={proj.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.projectCard}
            >
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
