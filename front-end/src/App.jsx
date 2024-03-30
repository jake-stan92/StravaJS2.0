import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Chart from "chart.js/auto";

function App() {
  const [athletes, setAthletes] = useState([]);
  // const [activities, setActivities] = useState([]);
  // const [loadingState, setLoadingState] = useState(false);

  const getAthletes = async () => {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    setAthletes(data.payload);
  };

  useEffect(() => {
    if (athletes.length === 0) {
      getAthletes();
    }
    return () => {};
  }, [athletes]);

  console.log(athletes);

  // graph testing // function calls itself in this format

  const yearlyData = [
    { month: "Jan", count: 10 },
    { month: "Feb", count: 14 },
    { month: "Mar", count: 5 },
    { month: "Apr", count: 15 },
    { month: "May", count: 2 },
    { month: "Jun", count: 19 },
    { month: "Jul", count: 12 },
    { month: "Aug", count: 6 },
    { month: "Sep", count: 20 },
    { month: "Oct", count: 17 },
    { month: "Nov", count: 8 },
    { month: "Dec", count: 1 },
  ];

  const monthlyData = [
    { day: 1, count: 1 },
    { day: 2, count: 1 },
    { day: 3, count: 0 },
    { day: 4, count: 0 },
    { day: 5, count: 1 },
    { day: 6, count: 0 },
    { day: 7, count: 1 },
    { day: 8, count: 0 },
    { day: 9, count: 0 },
    { day: 10, count: 1 },
    { day: 11, count: 1 },
    { day: 12, count: 1 },
    { day: 13, count: 1 },
    { day: 14, count: 0 },
    { day: 15, count: 0 },
  ];

  const weeklyData = [
    { day: "Mon", count: 1 },
    { day: "Tue", count: 0 },
    { day: "Wed", count: 1 },
    { day: "Thu", count: 0 },
    { day: "Fri", count: 0 },
    { day: "Sat", count: 1 },
    { day: "Sun", count: 1 },
  ];

  useEffect(() => {
    let chartLocation = document.getElementById("graph1");
    const myChart = new Chart(chartLocation, {
      type: "bar",
      data: {
        labels: yearlyData.map((row) => row.month),
        datasets: [
          {
            label: "Year To Date",
            data: yearlyData.map((row) => row.count),
          },
        ],
      },
    });

    // when component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  useEffect(() => {
    let chartLocation = document.getElementById("graph2");
    const myChart = new Chart(chartLocation, {
      type: "bar",
      data: {
        labels: monthlyData.map((row) => row.day),
        datasets: [
          {
            label: "Month To Date",
            data: monthlyData.map((row) => row.count),
          },
        ],
      },
    });

    // when component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  useEffect(() => {
    let chartLocation = document.getElementById("graph3");
    const myChart = new Chart(chartLocation, {
      type: "bar",
      data: {
        labels: weeklyData.map((row) => row.day),
        datasets: [
          {
            label: "Week To Date",
            data: weeklyData.map((row) => row.count),
          },
        ],
      },
    });

    // when component unmounts
    return () => {
      myChart.destroy();
    };
  }, []);

  // (async function () {
  //   const data = [
  //     { month: "Jan", count: 10 },
  //     { month: "Feb", count: 14 },
  //     { month: "Mar", count: 5 },
  //     { month: "Apr", count: 15 },
  //     { month: "May", count: 2 },
  //     { month: "Jun", count: 19 },
  //     { month: "Jul", count: 12 },
  //     { month: "Aug", count: 6 },
  //     { month: "Sep", count: 20 },
  //     { month: "Oct", count: 17 },
  //     { month: "Nov", count: 8 },
  //     { month: "Dec", count: 1 },
  //   ];

  //   let chartLocation = document.getElementById("graph1");
  //   if (chartLocation) {
  //     new Chart(chartLocation, {
  //       type: "bar",
  //       data: {
  //         labels: data.map((row) => row.month),
  //         datasets: [
  //           {
  //             label: "Year To Date",
  //             data: data.map((row) => row.count),
  //           },
  //         ],
  //       },
  //     });
  //   }
  //   chartLocation.destroy();
  // })();

  return (
    <>
      <Header />
      <div className="main">
        <div className="top-stat-collection">
          <div className="top-stat">stat</div>
          <div className="top-stat">stat</div>
          <div className="top-stat">stat</div>
          <div className="top-stat">stat</div>
        </div>
        <div className="graph-collection">
          <div className="graph-container">
            <canvas id="graph1"></canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph2"></canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph3"></canvas>
          </div>
        </div>
        <div className="bottom-stat-collection">
          <div className="bottom-stat" id="last5">
            bottom stat
          </div>
          <div className="bottom-stat">bottom stat</div>
        </div>

        {/* <p>{athletes.length >= 1 ? `${athletes[0].distance}` : "Loading..."}</p> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
