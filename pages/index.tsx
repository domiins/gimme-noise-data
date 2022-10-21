import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';

import styles from '../styles/Home.module.css'

type HomeProps = {

}

const Home: NextPage<HomeProps> = () => (
  <div className={styles.container}>
    <Head>
      <title>Gimme Noise Data</title>
      <meta name="description" content="Give me the fucking best places in bjatiful city of Bratislava to measure noisy noise" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Gimme Noise Data</h1>

      <p className={styles.description}>
        Proposal of possible locations for the locations of noise measurement devices in <b>Bratislava</b> elaborated by <b>Climaphiles</b> team.
      </p>

      <Button variant="contained" size="large" className={styles.description}>Let&apos;s show the prototype</Button>

      <a href="https://github.com/domiins/gimme-noise-data" style={{display: 'flex'}}>
        <Image src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt="GitHub Logo" width={68} height={68}/>
        <h2>GitHub repo</h2>
      </a>       
    </main>

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
  </div>
)

export default Home
