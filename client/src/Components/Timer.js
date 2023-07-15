import React from "react";
import { useEffect, useState } from "react";
import "../Components/Dashboard/dashcss.css";
import axios from 'axios'
const Timer = (props) => {
    console.log(props.initialMinute);
  const { initialMinute , initialSeconds  } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
useEffect(() => {
   axios
     .post(
       "http://localhost:5003/room/timer/" +
         localStorage.getItem("roomid") +
         "/" +
         minutes
     )
     .then((res) => {
       console.log(res);
     });
},[seconds])
  return (
    <div className="timer_1">
      {" "}
  
      <div className="timer" style={{ color: "red", zIndex: "100" }}>

        {minutes === 0 && seconds === 0 ? null : (
          <h1>
            {" "}
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Timer;
