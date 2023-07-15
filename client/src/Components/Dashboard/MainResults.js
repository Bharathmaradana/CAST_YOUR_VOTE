import React from "react";
import ConfettiGenerator from "confetti-js";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./MainResults.css";

const MySwal = withReactContent(Swal);

function MainResults() {
  const [data, setdata] = useState("");
  React.useEffect(() => {
    const confettiSettings = { target: "my-canvas" };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    const data = {
      roomid: localStorage.getItem("token"),
    };
    axios.post("http://localhost:5003/results", data).then((res) => {
      console.log(res.data);
      setdata(res.data);
      console.log("nothing");
    });
    return () => confetti.clear();
  }, []); // add the var dependencies or not

  useEffect(() => {
    console.log("soemthing");
    const data = {
      roomid: localStorage.getItem("roomid"),
    };
    axios.post("http://localhost:5003/results", data).then((res) => {
      console.log(res.data);
      setdata(res.data);
      console.log("nothing");
    });
  }, []);
  const popup = () => {};
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="congo_1">
        <div className="congo">
          <div className="cong_2">
            <h1>Congratulations The Winner is :</h1>
            <p>
              <h1>{data.name} </h1>with votes of <h1>{data.count}</h1>
            </p>
          </div>
        </div>
      </div>
      <canvas id="my-canvas" style={{ height: "100%", width: "100%" }}></canvas>
    </div>
  );
}

export default MainResults;

// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// const LineGraph = () => {
//   const generateRandomData = () => {
//     const data = [];

//     // Generate random data
//     for (let i = 0; i < 10; i++) {
//       const randomValue = Math.floor(Math.random() * 100);
//       data.push({ time: `Time ${i}`, value: randomValue });
//     }

//     return data;
//   };

//   const data = generateRandomData();

//   return (
//     <LineChart width={500} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//       <CartesianGrid stroke="#ffffff" strokeDasharray="0" />
//       <XAxis dataKey="time" />
//       <YAxis domain={[0, 'dataMax + 10']} />
//       <Tooltip />
//       <Line type="monotone" dataKey="value" stroke="#8b0000" />
//     </LineChart>
//   );
// };

// export default LineGraph;
