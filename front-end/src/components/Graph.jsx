import React from "react";
import { useEffect } from "react";
import "./Graph.css";
import Chart from "chart.js/auto";

const Graph = (props) => {
  useEffect(() => {
    let chartLocation = document.getElementById(`graph${props.graphNum}`);
    const myChart = new Chart(chartLocation, {
      type: "bar",
      data: {
        labels: props.data.map((row) => row[props.time]),
        datasets: [
          {
            label: props.title,
            data: props.data.map((row) => row.distance),
            order: 1,
          },
          {
            label: props.subTitle,
            data: props.data.map((row) => row.count),
            type: "line",
            order: 0,
          },
        ],
      },
    });

    // when component unmounts // prevents console error of already used chart canvas
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="graph-container">
      <canvas id={`${props.graphNum}`}></canvas>
    </div>
  );
};

export default Graph;
