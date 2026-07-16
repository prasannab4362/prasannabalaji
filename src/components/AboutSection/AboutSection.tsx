"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, Sparkles, Clock, ShieldAlert, Cpu, Brain, Eye, 
  MessageSquare, BarChart3, Laptop, MapPin, Mail, Phone, 
  Github, Linkedin, GraduationCap, Star, BookOpen 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const comparisonScenarios = [
  {
    title: "Personal Admin & Tasks",
    manual: {
      time: "2 hours / day",
      desc: "Manually checking emails, updating calendars, scheduling tasks, and copy-pasting code fragments.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "2 seconds",
      desc: "Nami Agent autonomously maps calendar requests, logs actions, and guides coding workflows.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  },
  {
    title: "Visiting Card CRM Entry",
    manual: {
      time: "3-5 mins / card",
      desc: "Manually typing name, email, phone, company, address and social links into a database.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "3 seconds",
      desc: "Buzz Card VLM pipeline parses name-card image data and exports CRM-ready contacts automatically.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  },
  {
    title: "Car Image Post-Processing",
    manual: {
      time: "25 mins / photo",
      desc: "Manually separating foreground layers, modifying colors, cleaning messy shadows, and adjusting lighting.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "30 seconds",
      desc: "Stable Diffusion pipeline applies prompt changes and studio backdrops with segmentation at scale.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  }
];

const stats = [
  { value: "57", label: "Public GitHub Repos" },
  { value: "2+ Yrs", label: "Industry Experience" },
  { value: "20+", label: "AI Tools & Frameworks" },
  { value: "3", label: "Certifications Earned" }
];

const expertise = [
  {
    icon: <Brain size={24} />,
    title: "Generative AI & LLMs",
    desc: "Building domain-specific chatbots and Q&A systems with LangChain, FAISS, Gemini API, and RAG pipelines."
  },
  {
    icon: <Eye size={24} />,
    title: "Computer Vision",
    desc: "Real-time image recognition, face detection, liveness detection, and object classification using OpenCV and TensorFlow."
  },
  {
    icon: <MessageSquare size={24} />,
    title: "NLP & Text Analytics",
    desc: "Text classification, NER, summarization, and document intelligence using spaCy, Transformers, and Hugging Face."
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Data Science & ML",
    desc: "End-to-end ML pipelines - EDA, feature engineering, model training, evaluation, and data visualization with Power BI."
  },
  {
    icon: <Laptop size={24} />,
    title: "Full Stack & Mobile",
    desc: "Building web and mobile products with Next.js, React, TypeScript, Flutter, iOS, Android, REST APIs, and backend integrations."
  },
  {
    icon: <Cpu size={24} />,
    title: "IoT & Hardware",
    desc: "Arduino programming, ESP32, Arduino Uno R3, sensor integration, IoT workflows, PCB concepts, and hardware prototyping."
  }
];

const interests = [
  "AI Research", "Open Source", "EdTech", "Robotics", 
  "Data Viz", "GenAI", "Problem Solving", "Mentoring", 
  "Mobile Apps", "IoT Hardware"
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // GSAP scroll trigger entries
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".about-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(statsRef.current?.children || [],
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.4"
    );

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section className={styles.container} id="about" ref={containerRef}>
      <div className={styles.content}>
        
        {/* Header Section */}
        <div className={`${styles.header} about-header`}>
          <span className={styles.tagline}>THE PERSON BEHIND THE CODE</span>
          <h2 className={styles.title}>Who I Am</h2>
          <p className={styles.summary}>
            I'm <span className={styles.highlight}>Prasanna B</span>, a Python Developer and AI/ML Engineer dedicated to building intelligent automation, vision-language applications, and full-stack software interfaces.
          </p>
        </div>

        {/* Resume Main Double-Column Layout */}
        <div className={styles.aboutLayout}>
          
          {/* Sidebar Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.profileAvatar}>PB</div>
            <h3 className={styles.profileName}>Prasanna B</h3>
            <p className={styles.profileTitle}>Python Developer | AI & ML Engineer</p>
            <div className={styles.profileTags}>
              <span className={styles.badge}>Python</span>
              <span className={styles.badge}>LangChain</span>
              <span className={styles.badge}>RAG</span>
              <span className={styles.badge}>TensorFlow</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.profileInfoList}>
              <div className={styles.infoItem}>
                <MapPin size={18} className={styles.infoIcon} />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className={styles.infoItem}>
                <Mail size={18} className={styles.infoIcon} />
                <a href="mailto:prasannamb4362@gmail.com">prasannamb4362@gmail.com</a>
              </div>
              <div className={styles.infoItem}>
                <Phone size={18} className={styles.infoIcon} />
                <a href="tel:+918610318934">+91 8610318934</a>
              </div>
              <div className={styles.infoItem}>
                <Github size={18} className={styles.infoIcon} />
                <a href="https://github.com/prasannab4362" target="_blank" rel="noopener noreferrer">github.com/prasannab4362</a>
              </div>
              <div className={styles.infoItem}>
                <Linkedin size={18} className={styles.infoIcon} />
                <a href="https://www.linkedin.com/in/prasanna-balaji18/" target="_blank" rel="noopener noreferrer">prasanna-balaji18</a>
              </div>
            </div>

            <div className={styles.divider}></div>
            <a href="mailto:prasannamb4362@gmail.com" className={styles.hireBtn}>
              <Star size={16} /> Hire Me
            </a>
          </div>

          {/* Main Bio / Details Column */}
          <div className={styles.bioColumn}>
            
            {/* Bio Section */}
            <div className={styles.bioSection}>
              <h3 className={styles.bioHeader}>Biography</h3>
              <p className={styles.bioText}>
                I'm a Python Developer at <strong>Creative Bees</strong> and former Robotics Engineer at <strong>Robomatic</strong>, building end-to-end intelligent systems. 
                From Next.js dashboards and Flutter mobile apps to IoT prototypes, VLM card readers, WhatsApp CRM bots, and image AI, I bridge the gap between software, hardware, and practical AI workflows.
              </p>
              <p className={styles.bioText}>
                My core stack includes Python, Next.js, Flutter, TensorFlow, LangChain, FAISS, VLM/OCR pipelines, Arduino programming, ESP32, Arduino Uno R3, PCB prototyping, and agentic AI tools. 
                I'm passionate about turning research into practical, deployable products.
              </p>
            </div>

            {/* Expertise Grid */}
            <div className={styles.bioSection}>
              <h3 className={styles.bioHeader}>Areas of Expertise</h3>
              <div className={styles.expertiseGrid}>
                {expertise.map((exp, idx) => (
                  <div key={idx} className={styles.expertiseCard}>
                    <div className={styles.expertiseIcon}>{exp.icon}</div>
                    <div className={styles.expertiseInfo}>
                      <h4 className={styles.expertiseTitle}>{exp.title}</h4>
                      <p className={styles.expertiseDesc}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Beyond the Code */}
            <div className={styles.bioSection}>
              <h3 className={styles.bioHeader}>Beyond the Code</h3>
              <div className={styles.interestsGrid}>
                {interests.map((interest, idx) => (
                  <div key={idx} className={styles.interestChip}>
                    <Sparkles size={12} className={styles.interestIcon} />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className={styles.bioSection}>
              <h3 className={styles.bioHeader}>Education</h3>
              <div className={styles.educationColumn}>
                
                {/* College */}
                <div className={styles.educationCard}>
                  <div className={styles.educationIcon}><GraduationCap size={24} /></div>
                  <div className={styles.educationInfo}>
                    <span className={styles.eduDate}>2019 - 2023</span>
                    <h4 className={styles.eduDegree}>Bachelor of Engineering - Computer Science & Engineering</h4>
                    <p className={styles.eduSchool}>Sathyabama Institute of Science and Technology, Chennai</p>
                    <div className={styles.eduMeta}>
                      <span className={styles.gpaBadge}>CGPA: 8.12 / 10</span>
                      <span className={styles.eduTag}>B.E. CSE</span>
                    </div>
                  </div>
                </div>

                {/* School */}
                <div className={styles.educationCard}>
                  <div className={styles.educationIcon}><BookOpen size={24} /></div>
                  <div className={styles.educationInfo}>
                    <span className={styles.eduDate}>2018 - 2019</span>
                    <h4 className={styles.eduDegree}>Higher Secondary Certificate (12th Grade)</h4>
                    <p className={styles.eduSchool}>Tamil Nadu State Board</p>
                    <div className={styles.eduMeta}>
                      <span className={styles.eduTag}>Mathematics & Science Stream</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Stats Showcase */}
        <div className={styles.statsGrid} ref={statsRef}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Comparison Dashboard */}
        <div className={styles.dashboardSection}>
          <h3 className={styles.sectionHeading}>
            <Cpu size={20} className={styles.headingIcon} />
            Interactive Impact Playground
          </h3>
          <p className={styles.sectionSubheading}>
            Select a business workflow below to compare standard execution against agentic solutions.
          </p>

          {/* Workflow Tabs */}
          <div className={styles.tabGroup}>
            {comparisonScenarios.map((scen, idx) => (
              <button 
                key={idx}
                className={`${styles.tabBtn} ${activeTab === idx ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {scen.title}
              </button>
            ))}
          </div>

          {/* Comparison Cards */}
          <div className={styles.comparisonGrid} ref={cardsRef}>
            {/* Manual Card */}
            <div className={styles.comparisonCard}>
              <div className={styles.cardTagManual}>
                <Clock size={14} />
                Legacy Process
              </div>
              <div className={styles.cardHeader}>
                {comparisonScenarios[activeTab].manual.icon}
                <span className={styles.timeVal}>{comparisonScenarios[activeTab].manual.time}</span>
              </div>
              <p className={styles.cardDesc}>
                {comparisonScenarios[activeTab].manual.desc}
              </p>
            </div>

            {/* Transition Arrow */}
            <div className={styles.arrowContainer}>
              <ArrowRight size={32} className={styles.transitionArrow} />
            </div>

            {/* Automated Card */}
            <div className={styles.comparisonCardAutomated}>
              <div className={styles.cardTagAutomated}>
                <Sparkles size={14} />
                Agentic Pipeline
              </div>
              <div className={styles.cardHeader}>
                {comparisonScenarios[activeTab].automated.icon}
                <span className={styles.timeValAutomated}>{comparisonScenarios[activeTab].automated.time}</span>
              </div>
              <p className={styles.cardDesc}>
                {comparisonScenarios[activeTab].automated.desc}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
