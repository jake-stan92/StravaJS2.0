import React from "react";
import "./Graph.css";
import Chart from "chart.js/auto";

const Graph = (props) => {
  let chartLocation = document.getElementById(`graph${props.graphNum}`);
  //   if (chartLocation) {

  //   }
  new Chart(chartLocation, {
    type: "bar",
    options: {},
    data: {
      labels: props.data.map((row) => row.month),
      datasets: [
        {
          label: "Year To Date",
          data: props.data.map((row) => row.count),
        },
      ],
    },
  });

  return (
    <div className="graph-container">
      <canvas id={`${props.graphNum}`}></canvas>
    </div>
  );
};

export default Graph;
