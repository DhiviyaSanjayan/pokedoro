import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TimerPage() {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(3);
  const [timer, setTimer] = useState();
  const [running, setRunning] = useState(false);
  const [isbreak, setIsbreak] = useState(false);
  const [timerPokemon, setTimerPokemon] = useState({});
  const [nextPokemon, setNextpokemon] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon(id);
    fetchNextPokemon();
  }, [id, secondsLeft, breakSecondsLeft]);

  async function fetchPokemon(id) {
    try {
      const response = await fetch("../../pokemon.json");
      const dataArr = await response.json();
      const data = dataArr[id - 1];
      setTimerPokemon(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function fetchNextPokemon() {
    try {
      const response = await fetch("../../pokemon.json");
      const dataArr = await response.json();
      const nextPokemonName = timerPokemon.evolves_into;
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].name === nextPokemonName) {
          const nextPokemonObj = dataArr[i];
          nextPokemonName ? setNextpokemon(nextPokemonObj) : null;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  const timeConverter = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const display = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    return display;
  };

  const minusSessionTime = () => {
    if (secondsLeft >= 61) {
      setSecondsLeft(secondsLeft - 60);
    } else return;
  };

  const addSessionTime = () => {
    setSecondsLeft(secondsLeft + 60);
  };

  const minusBreakTime = () => {
    if (breakSecondsLeft >= 61) {
      setBreakSecondsLeft(breakSecondsLeft - 60);
    } else return;
  };

  const addBreakTime = () => {
    setBreakSecondsLeft(breakSecondsLeft + 60);
  };

  const resetTimer = () => {
    if (!isbreak) {
      setSecondsLeft(3);
    } else setBreakSecondsLeft(3);
  };

  const start = () => {
    if (running === false) {
      if (isbreak === false) {
        const timer = setInterval(() => {
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
          if (secondsLeft === 0) {
            clearInterval(timer);
            setIsbreak(true);
          }
        }, 1000);
        setTimer(timer);
        setRunning(true);
        document.querySelector(".time-start").textContent = "Pause";
      } else {
        const timer = setInterval(() => {
          setBreakSecondsLeft((breakSecondsLeft) => breakSecondsLeft - 1);
          if (breakSecondsLeft === 0) {
            clearInterval(timer);
            setIsbreak(false);
          }
        }, 1000);
        setTimer(timer);
        setRunning(true);
        document.querySelector(".time-start").textContent = "Pause";
      }
    } else {
      setTimer(null);
      setRunning(false);
      document.querySelector(".time-start").textContent = "Start";
    }
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      resetTimer();
      setRunning(false);
      setIsbreak(true);
      document.querySelector(".time-start").textContent = "Start";
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    if (breakSecondsLeft === 0) {
      resetTimer();
      setRunning(false);
      setIsbreak(false);
      document.querySelector(".time-start").textContent = "Start";
      clearInterval(timer);
      navigate(`/timer/${nextPokemon.id}`);
    }
  }, [breakSecondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="timer-page">
      <div className="clock">
        <div className="timer">
          <div
            className="progress-radial step-0 session"
            style={isbreak ? { backgroundColor: "#ff2522" } : null}
          >
            <div
              className="main-display overlay"
              style={isbreak ? { color: "#ff2522" } : null}
            >
              {!isbreak ? (
                <h1>{timeConverter(secondsLeft)}</h1>
              ) : (
                <h1>{timeConverter(breakSecondsLeft)}</h1>
              )}
            </div>
          </div>
          <div
            className="progress-radial step-0 session"
            style={isbreak ? { backgroundColor: "#ff2522" } : null}
          >
            <div className="main-display overlay">
              {timerPokemon.sprite ? (
                <img
                  src={timerPokemon.sprite}
                  alt={timerPokemon.name}
                  className="timer-image"
                  style={
                    !isbreak
                      ? secondsLeft % 2 === 0
                        ? { marginBottom: "5px" }
                        : null
                      : breakSecondsLeft % 2 === 0
                      ? { marginBottom: "5px" }
                      : null
                  }
                />
              ) : (
                "loading"
              )}
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
            <button className="minus" onClick={minusBreakTime}>
              -
            </button>
            <button className="plus" onClick={addBreakTime}>
              +
            </button>
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
