"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './VideoIntro.module.css';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import CinematicLayer from '../CinematicLayer/CinematicLayer';
import Link from 'next/link';

export default function VideoIntro() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(true);
  
  // GSAP animation refs
  const taglineRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide sound hint after a few seconds
    const hintTimeout = setTimeout(() => {
      setShowSoundHint(false);
    }, 6000);

    // Trigger text animations immediately regardless of video load
    const tl = gsap.timeline();
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 })
      .to(firstNameRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7")
      .to(lastNameRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7")
      .to(scrollRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")
      .to(socialsRef.current, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.8");

    // Fallback to ensure video shows even if events don't fire
    const videoTimeout = setTimeout(() => {
      setVideosLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(hintTimeout);
      clearTimeout(videoTimeout);
    };
  }, []);

  const handleVideoLoaded = () => {
    setVideosLoaded(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      bgVideoRef.current?.pause();
      fgVideoRef.current?.pause();
    } else {
      bgVideoRef.current?.play();
      fgVideoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (fgVideoRef.current) {
      fgVideoRef.current.muted = !isMuted;
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = true; // Always keep BG muted
    }
    setIsMuted(!isMuted);
    setShowSoundHint(false); // Hide hint once they interact
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.container}>
      {/* Background Ambient Video */}
      <div className={styles.bgVideoWrapper}>
        <video 
          ref={bgVideoRef}
          className={`${styles.bgVideo} ${videosLoaded ? styles.loaded : ''}`}
          src="/videos/hero.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          onLoadedData={handleVideoLoaded}
        />
      </div>

      <div className={styles.cinematicGradient}></div>

      {/* Three.js Particle Layer */}
      <div className={styles.cinematicLayerContainer}>
        <CinematicLayer />
      </div>

      {/* Foreground Video */}
      <div className={styles.fgVideoWrapper}>
        <video 
          ref={fgVideoRef}
          className={`${styles.fgVideo} ${videosLoaded ? styles.loaded : ''}`}
          src="/videos/hero.mp4"
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline
        />
      </div>

      {/* Content Overlay */}
      <div className={styles.overlay}>
        <div className={styles.textContent}>
          <div className={styles.tagline} ref={taglineRef}>
            AI ENGINEER & DEVELOPER
          </div>
          <h1 className={styles.name}>
            <span ref={firstNameRef} className={styles.firstName}>PRASANNA</span>
            <span ref={lastNameRef} className={styles.lastName}>BALAJI</span>
          </h1>
          <p className={styles.subtitle} ref={subtitleRef}>
            Architecting autonomous agents and deploying intelligent,<br/>
            multi-modal LLM pipelines. Bringing generative AI ideas from<br/>
            zero to production.
          </p>
        </div>
      </div>

      {/* Social Links & Badge */}
      <div ref={socialsRef} className={styles.socials}>
        <Link href="https://github.com/prasannab4362" target="_blank" className={styles.socialLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </Link>
        <div className={styles.linkedinBadgeWrapper}>
          <div 
            className="badge-base LI-profile-badge" 
            data-locale="en_US" 
            data-size="medium" 
            data-theme="dark" 
            data-type="VERTICAL" 
            data-vanity="prasannabalaji18" 
            data-version="v1"
          >
            <a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/prasannabalaji18?trk=profile-badge">
              Prasanna B
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`${styles.soundHint} ${!showSoundHint ? styles.hidden : ''}`}>
        Tap for sound
      </div>
      
      <div className={styles.controls}>
        <button onClick={togglePlay} className={styles.glassButton} aria-label={isPlaying ? "Pause Video" : "Play Video"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={toggleMute} className={styles.glassButton} aria-label={isMuted ? "Unmute Video" : "Mute Video"}>
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator} onClick={scrollToNext}>
        <span className={styles.scrollText}>Discover</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollLineInner}></div>
        </div>
      </div>
    </section>
  );
}
