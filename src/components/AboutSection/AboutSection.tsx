"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Clock, ShieldAlert, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const comparisonScenarios = [
  {
    title: "Personal Admin & Logistics",
    manual: {
      time: "2 hours / day",
      desc: "Reading emails, cross-referencing calendars, manually scheduling calls and tasks.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "2 seconds",
      desc: "Nami Agent autonomously parses inbox, summaries key notes, and maps events via Calendar API.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  },
  {
    title: "Video Content Creation",
    manual: {
      time: "3-4 hours / video",
      desc: "Clipping raw video assets, recording TTS voiceovers, mixing music tracks, adding assets manually.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "15 minutes",
      desc: "End-to-end Python pipeline merges clips, overlaying AI-generated narration and music instantly.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  },
  {
    title: "Image Post-Processing",
    manual: {
      time: "25 mins / photo",
      desc: "Importing car assets, isolating background, aligning layers, and manual lighting retouching.",
      icon: <ShieldAlert size={20} className={styles.alertIcon} />
    },
    automated: {
      time: "30 seconds",
      desc: "Stable Diffusion pipeline removes background, applies studio light, and outputs at scale.",
      icon: <Sparkles size={20} className={styles.sparkleIcon} />
    }
  }
];

const stats = [
  { value: "80%", label: "Retouching Time Saved" },
  { value: "70%", label: "Admin Overhead Cut" },
  { value: "35%", label: "WATI Intent Accuracy Gain" },
  { value: "92%+", label: "VLM OCR Field Accuracy" }
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Stagger fade-in for section header and stats
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
          <span className={styles.tagline}>THE MISSION</span>
          <h2 className={styles.title}>From Manual Friction to Agentic Autonomy</h2>
          <p className={styles.summary}>
            I am an <span className={styles.highlight}>AI Engineer</span> dedicated to dismantling repetitive operational bottlenecks. 
            By designing custom Generative AI agents, RAG engines, and machine vision pipelines, I bridge the gap between complex model capabilities and production impact.
          </p>
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
