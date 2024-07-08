import React, { useRef, useState } from 'react';
import styles from '../styles/add.module.css';
import Footer from '../src/components/Footer/Footer';
import { ruleParser } from '../src/utils/ruleParser';
import { roleParser } from '../src/utils/roleParser';

const TextFileUpload = () => {
  const rulesRef = useRef(null);
  const rolesRef = useRef(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if(rulesRef.current.files[0]==null||rolesRef.current.files[0]==null){
      alert("Upload Both Files");
      return;
    }
    try{
      const rulesFile = rulesRef.current.files[0];
      const rolesFile = rolesRef.current.files[0];
      const rulesFileText = await ruleParser(rulesFile);
      const rolesFileText = await roleParser(rolesFile);
      console.log(rulesFileText,rolesFileText);
      //Add API Routes
    }
    catch(e){
      console.error(e);
    }
    rulesRef.current.value=null;
    rolesRef.current.value=null;
  };

  // const postData = async (url,text) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(text)
  //     });

  //     if (response.ok) {
  //       console.log('Data successfully posted to API.');
  //     } else {
  //       console.error('Failed to post data to API.');
  //     }
  //   } catch (error) {
  //     console.error('Error posting data to API:', error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h1 className={styles.heading}>Text File Upload</h1>
       
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            Rules File:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={rulesRef}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            Roles File:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={rolesRef}
            className={styles.fileInput}
          />
        </div>
        <input type="submit" value="Submit" className={styles.submitButton} />
      </form>
      <Footer/>
    </div>
  );
};

export default TextFileUpload;
