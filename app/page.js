'use client'
import React, { useRef, useState, useEffect } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState('0.000');
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    return (timeInSeconds % 60).toFixed(3);
  };

  const startTimer = () => {
    if (!running) {
      startTime.current = Date.now() - parseFloat(currentTime) * 1000;
      intervalRef.current = setInterval(updateTimer, 10);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };

  const updateTimer = () => {
    const updatedTime = (Date.now() - startTime.current) / 1000;
    setCurrentTime(formatTime(updatedTime));
  };

  const lapTimer = () => {
    if (running) {
      const currentLapTime = formatTime((Date.now() - startTime.current) / 1000);
      setLaps([...laps, currentLapTime]);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentTime('0.000');
    setLaps([]);
    setRunning(false);
    startTime.current = 0;
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{currentTime}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>START</button>
          <button className="stop-btn" onClick={stopTimer}>STOP</button>
          <button className="lap-btn" onClick={lapTimer}>LAP</button>
          <button className="reset-btn" onClick={resetTimer}>RESET</button>
        </section>
      </section>
      <section className='lap-section' style={{ display: laps.length > 0 ? 'block' : 'none' }}>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>{lap}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
