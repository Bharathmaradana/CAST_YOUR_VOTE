import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const ApexChart_1 = () => {
  const [series, setSeries] = useState([
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ]);
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
          const newSeries = [
            {
              data: [],
            },
          ];
          const newLabels = [];

          for (let i = 0; i < res.data.exists.represents.length; i++) {
            newSeries[0].data.push(res.data.exists.represents[i].count);
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
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels.length ? labels : [],
    },
  };

  return (
    <div id="chart" style={{ width: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        width={350}
      />
    </div>
  );
};

export default ApexChart_1;
