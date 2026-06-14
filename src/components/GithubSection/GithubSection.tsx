import React from 'react';
import styles from './GithubSection.module.css';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

export default async function GithubSection() {
  // Fetch repos directly from GitHub API
  // Fetch more (20) to ensure we have enough after filtering
  const res = await fetch('https://api.github.com/users/prasannab4362/repos?sort=pushed&per_page=20', {
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    // Handle error gracefully
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Latest Projects</h2>
          <p className={styles.subtitle}>Unable to load repositories at the moment.</p>
        </div>
      </section>
    );
  }

  const allRepos: Repo[] = await res.json();

  // Exclude repositories containing 'video', 'vlm', or 'car'
  const excludeKeywords = ['video', 'vlm', 'car'];
  const repos = allRepos
    .filter((repo) => {
      const name = repo.name.toLowerCase();
      const desc = (repo.description || '').toLowerCase();
      return !excludeKeywords.some((keyword) => name.includes(keyword) || desc.includes(keyword));
    })
    .slice(0, 6);

  return (
    <section className={styles.container} id="github-section">
      <div className={styles.content}>
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Open Source & Projects</h2>
          <p className={styles.subtitle}>Automatically updated with my latest GitHub contributions.</p>
        </div>
 
         {/* GitHub Streaks Banner */}
         <div className={styles.streakContainer}>
           <h3 className={styles.sectionHeading}>Contribution Streaks</h3>
           <div className={styles.streakWrapper}>
             <img 
               src="https://github-readme-streak-stats.herokuapp.com/?user=prasannab4362&theme=radical&hide_border=true&background=0d1117" 
               alt="GitHub Streak" 
               className={styles.streakImage}
             />
           </div>
         </div>
 
         {/* Repositories Grid */}
         <div className={styles.reposContainer}>
           <h3 className={styles.sectionHeading}>Latest Repositories</h3>
           <div className={styles.grid}>
             {repos.map((repo) => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.repoIcon}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  <h4 className={styles.repoName}>{repo.name}</h4>
                </div>
                
                <p className={styles.repoDesc}>
                  {repo.description || 'No description provided.'}
                </p>
                
                <div className={styles.cardFooter}>
                  {repo.language && (
                    <span className={styles.language}>
                      <span className={styles.langDot}></span>
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.stars}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
