import { useEffect, useState } from "react";

export default function TimerPage() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState();
  const [running, setRunning] = useState(false);

  const timeConverter = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    return display;
  };

  const minusSessionTime = () => {
    setSecondsLeft(secondsLeft - 60);
  };

  const addSessionTime = () => {
    setSecondsLeft(secondsLeft + 60);
  };

  const resetTimer = () => {
    setSecondsLeft(25 * 60);
  };

  const start = () => {
    if (running === false) {
      const timer = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        if (secondsLeft === 0) {
          clearInterval(timer);
        }
      }, 1000);
      setTimer(timer);
      setRunning(true);
      document.querySelector(".time-start").textContent = "Pause";
    } else {
      setTimer(null);
      setRunning(false);
      document.querySelector(".time-start").textContent = "Start";
    }
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="timer-page">
      <div className="clock">
        <div className="timer">
          <div className="progress-radial step-0 session">
            <div className="main-display overlay">
              <h1>{timeConverter(secondsLeft)}</h1>
            </div>
          </div>
        </div>
        <div className="session-info">
          <div className="session-count"></div>
        </div>
        <div className="settings">
          <div className="time-session">
            <h6>session time</h6>
            <p className="time-session-display"></p>
            <button className="minus" onClick={minusSessionTime}>
              -
            </button>
            <button className="plus" onClick={addSessionTime}>
              +
            </button>
          </div>
          <div className="time-break">
            <h6>break time</h6>
            <p className="time-break-display"></p>
            <button className="minus">-</button>
            <button className="plus">+</button>
          </div>
        </div>
        <div className="controls">
          <button className="time-start" onClick={start}>
            Start
          </button>
          <button className="time-reset" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
