import React, { useEffect } from 'react';
import { useState } from "react";
import string from "./string";
import "./App.css";


const random=Math.floor(Math.random() * (23 - 0) + 0);

const App=()=>{
  const [valWpm,setValWpm]=useState(0);
  const [accuracy,setAccuracy]=useState(0);
  const [wrong,setWrong]=useState(0);
  const [count, setCount]=useState(0);
  const [color,changeColor]=useState("w");



  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);



  const checkString=(val)=>{
    let text=val.target.value;
    if(string[random].slice(0,text.length)===text)
    {
      changeColor("w");
      setCount(count+1);
    }
    else{
      changeColor("r");
      setWrong(wrong+1);
    }
    stopWatch(text);   
  }

  const stopWatch=(text)=>{
    if(string[random]===text)
    {
      setRunning(false);
      wpm();
      document.getElementById('text').value = "";
      setTime(0);
    }
    else
    {
      setRunning(true);
    }
  }

  let min=("0" + Math.floor((time / 60000) % 60)).slice(-2);
  let sec=("0" + Math.floor((time / 1000) % 60)).slice(-2);

  const wpm=()=>{
    setValWpm(Math.floor(count/5));
    var l=string[random].length;
    var cal=Math.round(((l-wrong)/l)*100);
    setAccuracy(cal);
  }

  
  return <>
    <div className='main'>

        <h1 className='head'>Typing Tutor</h1>
        <div className='content'>
          <label for="input" id='question'>{string[random]}</label>
          <input type="text" onChange={checkString}  name="input" id='text' className={color} placeholder="START TYPING"/>
        </div>

        <div className='result'>
          <label id='wpm'>Wpm: {valWpm}  </label>
          <label id='accu'>Accuracy: {accuracy}%</label>
        </div>

        <div className="stopwatch">
          <div className="numbers">
            <span>{min}:</span>
            <span>{sec}</span>
          </div>
        </div>

    </div>
  </>
};
export default App;