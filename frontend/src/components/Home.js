import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './Home.module.css';

function Home() {
    return ( 
        <div className={styles.body}>
            <Link to="/dataupload" className={styles.link}>Data Upload Portal</Link>
            <Link to="/dashboard" className={styles.link}>Visualisation Dashboard</Link>
        </div>
     );
}

export default Home;