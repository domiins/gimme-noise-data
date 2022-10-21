import Image from 'next/image'

import styles from '../styles/Footer.module.css'

export const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://inovacie.bratislava.sk/climathon/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by Climathon
      <span className={styles.logo}>
        <Image src="https://inovacie.bratislava.sk/wp-content/uploads/2022/07/tiger-svg.svg" alt="Climathon Logo" width={30} height={45} />
      </span>
    </a>
  </footer>
)
