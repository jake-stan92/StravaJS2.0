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
  (async function () {
    const data = [
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

    let chartLocation = document.getElementById("graph1");
    if (chartLocation) {
      new Chart(chartLocation, {
        type: "bar",
        data: {
          labels: data.map((row) => row.month),
          datasets: [
            {
              label: "Year To Date",
              data: data.map((row) => row.count),
            },
          ],
        },
      });
    }
  })();

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
