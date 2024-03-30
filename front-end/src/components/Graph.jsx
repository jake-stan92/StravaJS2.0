import React from "react";
import { useEffect } from "react";
import "./Graph.css";
import Chart from "chart.js/auto";

const Graph = (props) => {
  let identifier = "";
  let chartLabel = "";
  if (props.graphNum === 1) {
    identifier = "month";
    chartLabel = "Year To Date";
  }
  if (props.graphNum === 2) {
    identifier = "week";
    chartLabel = "Month To Date";
  }
  if (props.graphNum === 3) {
    identifier = "day";
    chartLabel = "Week To Date";
  }
  useEffect(() => {
    let chartLocation = document.getElementById(`graph${props.graphNum}`);
    const myChart = new Chart(chartLocation, {
      type: "bar",
      data: {
        labels: props.data.map((row) => row[identifier]),
        datasets: [
          {
            label: chartLabel,
            data: props.data.map((row) => row.count),
          },
        ],
      },
    });

    // when component unmounts // prevents console error of already useed chart canvas
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
