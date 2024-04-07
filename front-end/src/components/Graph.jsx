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
            yAxisID: "y",
          },
          {
            label: props.subTitle,
            data: props.data.map((row) => row.count),
            type: "line",
            order: 0,
            yAxisID: "y1",
            borderWidth: 2, // change line width here
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false, // only want 1 set of grid lines
            },
          },
        },
      },
    });

    // when component unmounts // prevents console error of already used chart canvas
    return () => {
      myChart.destroy();
    };
  }, [props.state]);

  return (
    <div className="graph-container">
      <canvas id={`graph${props.graphNum}`}></canvas>
    </div>
  );
};

export default Graph;
