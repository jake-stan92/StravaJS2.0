import React from "react";
import { useEffect } from "react";
import "./Graph.css";
import Chart from "chart.js/auto";
import { getWeekNum } from "../components/helpers.js";
import LoadingIcon from "../assets/images/gears-spinner.svg";

const Graph = (props) => {
  useEffect(() => {
    let currentWeekNum = getWeekNum(new Date());
    let chartLocation = document.getElementById(`graph${props.graphNum}`);
    if (props.lineGraph) {
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
              backgroundColor: "#fc5200",
            },
            {
              label: "Total Runs",
              data: props.data.map((row) => row.count),
              type: "line",
              order: 0,
              yAxisID: "y1",
              borderWidth: 2, // change line width here
              backgroundColor: "black",
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
      return () => {
        myChart.destroy();
      };
    } else {
      const myChart = new Chart(chartLocation, {
        type: "bar",
        data: {
          labels: props.data.map((row) => row[props.time]),
          datasets: [
            {
              label: `${props.title} - Week${currentWeekNum}`,
              data: props.data.map((row) => row.distance),
              order: 1,
              yAxisID: "y",
              backgroundColor: "#fc5200",
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
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
    // when component unmounts // prevents console error of already used chart canvas
  }, [props.state]);

  return (
    <div className="graph-container">
      {!props.loadingState ? (
        <canvas id={`graph${props.graphNum}`}></canvas>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            fill="#FC5200"
            stroke="#FC5200"
            strokeWidth="12"
            r="15"
            cx="40"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2.2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle
            fill="#FC5200"
            stroke="#FC5200"
            strokeWidth="12"
            r="15"
            cx="100"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2.2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle
            fill="#FC5200"
            stroke="#FC5200"
            strokeWidth="12"
            r="15"
            cx="160"
            cy="100"
          >
            <animate
              attributeName="opacity"
              calcMode="spline"
              dur="2.2"
              values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      )}
    </div>
  );
};

export default Graph;
