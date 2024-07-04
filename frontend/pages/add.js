import React, { useRef, useState } from 'react';
import styles from '../styles/add.module.css';
import Footer from '../src/components/Footer/Footer';

const TextFileUpload = () => {
  const fileRef1 = useRef(null);
  const fileRef2 = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const file1 = fileRef1.current.files[0];
    const file2 = fileRef2.current.files[0];
    console.log(file1);
    console.log(file2);
    // postData("http://localhost:8000/upload",parseTextFile2(file2.content))
    fileRef1.current.value=null;
    fileRef2.current.value=null;
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
            File 1:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={fileRef1}
            onChange={(e)=> setFile1(e.target.files[0])}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            File 2:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={fileRef2}
            onChange={(e)=> setFile2(e.target.files[0])}
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
