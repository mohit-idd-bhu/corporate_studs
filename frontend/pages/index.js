import Head from "next/head";
import Footer from '../src/components/Footer/Footer';
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Visualiser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Welcome to TrustSec Visualiser</h1>

        <div className={styles.grid}>
          <a href="/add" className={styles.card}>
            <h3>Add Data</h3>
            <p>Add your input for the Visualization</p>
          </a>

          <a href="/main" className={styles.card}>
            <h3>See Visualization</h3>
            <p>See currently present data as Visualization.</p>
          </a>
        </div>
      </main>

      <Footer/>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
