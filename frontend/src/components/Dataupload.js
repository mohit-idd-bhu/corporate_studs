import React, { useRef } from 'react';
import './Dataupload.css';
import { parseRules,parseConnections } from '../utils/parser';
import axios from 'axios';

function Dataupload() {

    const fileRef1 = useRef(null);
    const fileRef2 = useRef(null);

    const resetDatabaseHandler =(e)=>{
        axios.delete('http://localhost:8000/reset')
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
    }

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const file1=fileRef1.current.files[0];
        const file2=fileRef2.current.files[0];
        if (file1) {
            const text1 = await readFileAsync(file1);
            const data1 = parseRules(text1);
            try {
              const res1 = await axios.post('http://localhost:8000/service', data1);
              console.log(res1.data);
            } catch (err) {
              console.log(err);
            }
        }
        if (file2){
            const text2 = await readFileAsync(file2);
            const data2 = parseConnections(text2);
            try {
              const res2 = await axios.post('http://localhost:8000/connection', data2);
              console.log(res2.data);
            } catch (err) {
              console.log(err);
            }
        }
        fileRef1.current.value='';
        fileRef2.current.value='';
    }

    return ( 
        <form onSubmit={submitHandler}>
            <label>Rules Data File</label>
            <input type="file" ref={fileRef1}></input>
            <label>Connection Data File</label>
            <input type='file' ref={fileRef2}></input>
            <button type='submit'>Upload</button>
            <button onClick={resetDatabaseHandler}>Reset Database</button>
        </form>
     );
}

export default Dataupload;