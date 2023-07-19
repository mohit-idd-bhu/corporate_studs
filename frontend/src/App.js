import React, { useRef } from 'react';
import './App.css';
import { parseRules,parseConnections } from './parser';
import axios from 'axios';

function App() {

    const fileRef1 = useRef(null);
    const fileRef2 = useRef(null);

    const submitHandler = (e)=>{
        e.preventDefault();
        const file1=fileRef1.current.files[0];
        const file2=fileRef2.current.files[0];
        if (file1) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const text = event.target.result;
              const data=parseRules(text);
            };
            reader.readAsText(file1);
        }
        if(file2){
            const reader = new FileReader();
            reader.onload = (event) => {
              const text = event.target.result;
              const data=parseConnections(text);
            };
            reader.readAsText(file2);
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
        </form>
     );
}

export default App;