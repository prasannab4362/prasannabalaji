"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brand}>
        <img src="/logo.jpg" alt="Logo" className={styles.logo} />
        <div className={styles.brandText}>
          <span className={styles.name}>Prasanna B</span>
          <span className={styles.title}>AI and Automation</span>
        </div>
      </Link>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
