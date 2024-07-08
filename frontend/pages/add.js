import React, { useRef, useState } from 'react';
import styles from '../styles/add.module.css';
import Footer from '../src/components/Footer/Footer';
import { connectionParser } from '../src/utils/connectionParser';
import { serviceParser } from '../src/utils/serviceParser';
import { useRouter } from 'next/router';
import {backendUrl} from '../config';

const TextFileUpload = () => {
  const serviceFileRef = useRef(null);
  const connectionFileRef = useRef(null);
  const router = useRouter();

  const postData = async (url,text) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
      });
      console.log(response);
    } catch (error) {
      console.error('Error posting data to API:', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if(serviceFileRef.current.files[0]==null||connectionFileRef.current.files[0]==null){
      alert("Upload Both Files");
      return;
    }
    try{
      const serviceFile = serviceFileRef.current.files[0];
      const connectionFile = connectionFileRef.current.files[0];
      const serviceFileText = await serviceParser(serviceFile);
      const connectionFileText = await connectionParser(connectionFile);
      console.log(serviceFileText,connectionFileText);
      await postData(`${backendUrl}/service/add`,serviceFileText);
      await postData(`${backendUrl}/connection/add`,connectionFileText);
      alert("Files Uploaded Succesfully");
      router.push('/main');
    }
    catch(e){
      console.error(e);
    }
    serviceFileRef.current.value=null;
    connectionFileRef.current.value=null;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h1 className={styles.heading}>Text File Upload</h1>
       
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            Service Data File:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={serviceFileRef}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.fileInputContainer}>
          <label className={styles.fileInputLabel}>
            Connection Data File:
          </label>
          <input
            type="file"
            accept=".txt"
            ref={connectionFileRef}
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
