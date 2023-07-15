import React, { useState, useEffect } from "react";
import axios from "axios";

function TimerComponent() {
  const [roomId, setRoomId] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [timerId, setTimerId] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [timerCompleted, setTimerCompleted] = useState(false);

  useEffect(() => {
    const fetchTimerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5003/api/timer/${timerId}`
        );
        const { timeRemaining, completed } = response.data;

        if (completed) {
          setTimerCompleted(true);
        } else {
          setTimeRemaining(timeRemaining);
          startCountdown();
        }
      } catch (error) {
        console.error("Error fetching timer data:", error);
      }
    };

    if (timerId) {
      fetchTimerData();
    }
  }, [timerId]);

  const startTimer = async () => {
    if (roomId.trim() === "" || minutes <= 0) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5003/api/timer", {
        roomId,
        minutes,
      });
      const { timerId } = response.data;

      setTimerId(timerId);
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        if (
          prevTimeRemaining.minutes === 0 &&
          prevTimeRemaining.seconds === 0
        ) {
          clearInterval(interval);
          setTimerCompleted(true);
          return prevTimeRemaining;
        }

        const newSeconds = prevTimeRemaining.seconds - 1;
        const newMinutes = prevTimeRemaining.minutes - (newSeconds < 0 ? 1 : 0);

        return {
          minutes: newMinutes < 0 ? 0 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);
  };

  return (
    <div>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room ID"
      />
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        placeholder="Duration (in minutes)"
      />
      <button onClick={startTimer} disabled={timerId || timerCompleted}>
        Start Timer
      </button>
      {timerCompleted ? (
        <p>Timer Completed!</p>
      ) : (
        timerId && (
          <p>
            Time Remaining:{" "}
            {timeRemaining &&
            timeRemaining.minutes !== undefined &&
            timeRemaining.seconds !== undefined
              ? `${timeRemaining.minutes
                  .toString()
                  .padStart(2, "0")}:${timeRemaining.seconds
                  .toString()
                  .padStart(2, "0")}`
              : ""}
          </p>
        )
      )}
    </div>
  );
}

export default TimerComponent;
