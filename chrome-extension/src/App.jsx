import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ConfettiExplosion from "react-confetti-explosion";
import { Box, Modal, Typography, Button } from "@mui/material";
import Confetti from "react-confetti";
import "./App.css";

export default function TimerPage() {
  const [secondsTotal, setSecondsTotal] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [breakSecondsTotal, setBreakSecondsTotal] = useState(5);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(5);
  const [timer, setTimer] = useState();
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [isbreak, setIsbreak] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

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
      setSecondsTotal(secondsTotal - 60);
    } else return;
  };

  const addSessionTime = () => {
    setSecondsLeft(secondsLeft + 60);
    setSecondsTotal(secondsTotal + 60);
  };

  const minusBreakTime = () => {
    if (breakSecondsLeft >= 61) {
      setBreakSecondsLeft(breakSecondsLeft - 60);
      setBreakSecondsTotal(breakSecondsTotal - 60);
    } else return;
  };

  const addBreakTime = () => {
    setBreakSecondsLeft(breakSecondsLeft + 60);
    setBreakSecondsTotal(breakSecondsTotal + 60);
  };

  const resetTimer = () => {
    if (!isbreak) {
      setSecondsLeft(3);
    } else setBreakSecondsLeft(3);
  };

  const start = () => {
    setIsExploding(false);
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

  function renderTime() {
    return !isbreak ? (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eae9e5",
          width: "90%",
          height: "90%",
          textAlign: "center",
          overflow: "none",
          borderRadius: "50%",
          fontSize: "4rem",
          fontWeight: "bold",
        }}
      >
        {timeConverter(secondsLeft)}
      </h1>
    ) : (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eae9e5",
          width: "90%",
          height: "90%",
          textAlign: "center",
          overflow: "none",
          borderRadius: "50%",
          fontSize: "4rem",
          fontWeight: "bold",
        }}
      >
        {timeConverter(breakSecondsLeft)}
      </h1>
    );
  }

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsExploding(true);
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
      setOpen(true);
      setIsExploding(true);
    }
  }, [breakSecondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="timer-page">
      {isExploding && <ConfettiExplosion width={200} />}
      {open && <Confetti width={"300vw"} height={"300vh"} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You completed your session!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Study some more?
            </Typography>
            <br />
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Again
            </Button>
          </>
        </Box>
      </Modal>
      <div className="clock">
        <div className="timer">
          <div className="progress-radial step-0 session">
            <CountdownCircleTimer
              key={timer}
              isPlaying={running}
              duration={!isbreak ? secondsTotal : breakSecondsTotal}
              colors={isbreak ? ["#ff2522"] : ["#00a0b0"]}
              size={200}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
        <div className="session-info">
          <div className="session-count"></div>
        </div>
        <div className="settings">
          <div className="time-session">
            <h6>session time</h6>
            <div className="change-time-buttons">
              <button className="minus" onClick={minusSessionTime}>
                -
              </button>
              <button className="plus" onClick={addSessionTime}>
                +
              </button>
            </div>
          </div>
          <div className="time-break">
            <h6>break time</h6>
            <div className="change-time-buttons">
              <button className="minus" onClick={minusBreakTime}>
                -
              </button>
              <button className="plus" onClick={addBreakTime}>
                +
              </button>
            </div>
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
      {isExploding && <ConfettiExplosion width={200} />}
    </div>
  );
}
