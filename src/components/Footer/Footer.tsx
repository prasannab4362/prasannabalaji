"use client";

import React from 'react';
import styles from './Footer.module.css';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Let's Build <span>Intelligent Systems</span>
        </h2>
        
        <div className={styles.contactGrid}>
          {/* Email */}
          <a href="mailto:prasannamb4362@gmail.com" className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Mail size={24} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>prasannamb4362@gmail.com</span>
            </div>
          </a>

          {/* Phone */}
          <a href="tel:+918610318934" className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <Phone size={24} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>+91 8610318934</span>
            </div>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/prasannab" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <div className={styles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.label}>LinkedIn</span>
              <span className={styles.value}>Connect with me</span>
            </div>
          </a>
        </div>

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Prasanna B | AI and Automation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
