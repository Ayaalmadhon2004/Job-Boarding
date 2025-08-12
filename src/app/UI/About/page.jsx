import styles from "./about.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <i className={`fa-solid fa-info-circle ${styles.icon}`}></i>
        <h2 className={styles.title}>About Job Boarding</h2>
        <p className={styles.text}>
          Job Boarding is your trusted platform to find the perfect job and connect with top employers worldwide.
          We strive to make job hunting easy, efficient, and enjoyable by providing a user-friendly interface
          and up-to-date job listings.
        </p>
        <p className={styles.text}>
          Our mission is to empower job seekers with the best tools and resources to succeed in their career path.
          Whether you're a fresh graduate or an experienced professional, Job Boarding offers tailored opportunities for all.
        </p>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <i className={`fa-solid fa-briefcase ${styles.featureIcon}`}></i>
            <h3 className={styles.featureTitle}>Wide Job Selection</h3>
            <p className={styles.featureDesc}>
              Thousands of job listings across various industries and locations updated daily.
            </p>
          </div>
          <div className={styles.featureCard}>
            <i className={`fa-solid fa-user-check ${styles.featureIcon}`}></i>
            <h3 className={styles.featureTitle}>Verified Employers</h3>
            <p className={styles.featureDesc}>
              We partner only with trusted companies to ensure genuine opportunities.
            </p>
          </div>
          <div className={styles.featureCard}>
            <i className={`fa-solid fa-rocket ${styles.featureIcon}`}></i>
            <h3 className={styles.featureTitle}>Easy Application</h3>
            <p className={styles.featureDesc}>
              Apply with just a few clicks and track your applications easily from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
