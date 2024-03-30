import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Chart from "chart.js/auto";
import Graph from "./components/Graph";

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
    { week: 1, count: 4 },
    { week: 2, count: 2 },
    { week: 3, count: 6 },
    { week: 4, count: 3 },
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
            <canvas id="graph1">
              <Graph data={yearlyData} graphNum={1} />
            </canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph2">
              <Graph data={monthlyData} graphNum={2} />
            </canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph3">
              <Graph data={weeklyData} graphNum={3} />
            </canvas>
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
