import React from 'react';
import styles from '../Footer/Footer.module.css';

function Footer() {
    return ( 
    <footer className={styles['footer']}>
        Developed by team{" "}
        <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
          {" "}
          {" Corporate Studs"}
        </span>
    </footer>
     );
}

export default Footer;