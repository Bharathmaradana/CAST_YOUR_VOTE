import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ApexChart = () => {
  const [series, setSeries] = useState([20, 20]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("roomid")) {
      axios
        .post(
          "http://localhost:5003/enterroom/" +
            localStorage.getItem("roomid") +
            "/" +
            localStorage.getItem("userid")
        )
        .then((res) => {
          const newSeries = [20, 20];
          const newLabels = [];

          for (let i = 0; i < res.data.exists.represents.length; i++) {
            newSeries.push(res.data.exists.represents[i].count);
            newLabels.push(res.data.exists.represents[i].name);
          }

          setSeries(newSeries);
          setLabels(newLabels);

          localStorage.series = JSON.stringify(newSeries);
          localStorage.labels = JSON.stringify(newLabels);

          console.log(newLabels);
        });
    }
  }, []);

  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series ? series : [20, 20]}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default ApexChart;
