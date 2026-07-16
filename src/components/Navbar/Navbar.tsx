"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "About", id: "about", path: "/about" },
    { name: "Skills", id: "skills", path: "/skills" },
    { name: "Experience", id: "experience", path: "/experience" },
    { name: "Projects", id: "projects", path: "/projects" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      // If we are on subpages, just use pathname to determine active link
      const current = navLinks.find(link => pathname === link.path);
      if (current) {
        setActiveSection(current.id);
      }
      return;
    }

    // Scrollspy Intersection Observer setup for homepage
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-20% 0px -60% 0px", // focus area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sectionIds = ["home", "about", "skills", "experience", "projects", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash cleanly
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}>
        <img src="/logo.jpg" alt="Logo" className={styles.logo} />
        <div className={styles.brandText}>
          <span className={styles.name}>Prasanna B</span>
          <span className={styles.title}>AI and Automation</span>
        </div>
      </Link>
      
      {/* Desktop Links */}
      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={pathname === "/" ? `#${link.id}` : link.path}
            onClick={(e) => handleLinkClick(e, link.id)}
            className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggler */}
      <button 
        className={styles.menuToggle} 
        onClick={() => setIsOpen(!isOpen)} 
        aria-label="Toggle Menu"
      >
        <span className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}></span>
      </button>

      {/* Mobile Links Overlay */}
      <div className={`${styles.mobileLinks} ${isOpen ? styles.mobileLinksOpen : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={pathname === "/" ? `#${link.id}` : link.path}
            onClick={(e) => handleLinkClick(e, link.id)}
            className={`${styles.mobileLink} ${activeSection === link.id ? styles.activeMobile : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
