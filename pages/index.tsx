import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button';
import { Footer } from '../components/Footer';

import styles from '../styles/Home.module.css'

const Home: NextPage = () => (
  <div className="container">
    <Head>
      <title>Gimme Noise Data</title>
      <meta name="description" content="Give me the fucking best places in bjatiful city of Bratislava to measure noisy noise" />
    </Head>

    <main className="main">
      <h1 className={styles.title}>Gimme Noise Data</h1>

      <p className="description">
        Proposal of possible locations for the locations of noise measurement devices in <b>Bratislava</b> elaborated by <b>Climaphiles</b> team.
      </p>

      <Button href="/visualization" variant="contained" size="large" className="description">Let&apos;s show the prototype</Button>

      <a href="https://github.com/domiins/gimme-noise-data" style={{display: 'flex'}}>
        <Image src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt="GitHub Logo" width={68} height={68}/>
        <h2>GitHub repo</h2>
      </a>       
    </main>

    <Footer />
  </div>
)

export default Home
