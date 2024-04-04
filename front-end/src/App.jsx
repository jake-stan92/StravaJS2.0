import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";

import { getLast5 } from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";

function App() {
  const [runs, setRuns] = useState([]);
  const [last5, setLast5] = useState([]);
  // const [activities, setActivities] = useState([]);
  // const [loadingState, setLoadingState] = useState(false);

  // const getRuns = async () => {
  //   const response = await fetch("http://localhost:3000/");
  //   const data = await response.json();
  //   setRuns(data.payload);
  // };

  useEffect(() => {
    // if runs is empty, populate runs else filter data
    if (runs.length === 0) {
      const getRuns = async () => {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        setRuns(data.payload);
      };
      getRuns();
    } else {
      setLast5(getLast5(runs));
    }
    return () => {};
  }, [runs]);

  // graph testing // function calls itself in this format

  const yearlyData = [
    { month: "Jan", count: 10, distance: 48 },
    { month: "Feb", count: 14, distance: 65 },
    { month: "Mar", count: 5, distance: 20 },
    { month: "Apr", count: 15, distance: 60 },
    { month: "May", count: 2, distance: 10 },
    { month: "Jun", count: 19, distance: 72 },
    { month: "Jul", count: 12, distance: 30 },
    { month: "Aug", count: 6, distance: 29 },
    { month: "Sep", count: 20, distance: 85 },
    { month: "Oct", count: 17, distance: 67 },
    { month: "Nov", count: 8, distance: 32 },
    { month: "Dec", count: 1, distance: 11 },
  ];

  const monthlyData = [
    { week: 1, count: 4, distance: 20 },
    { week: 2, count: 2, distance: 12 },
    { week: 3, count: 6, distance: 29 },
    { week: 4, count: 3, distance: 14 },
  ];

  const weeklyData = [
    { day: "Mon", count: 1, distance: 5 },
    { day: "Tue", count: 0, distance: 0 },
    { day: "Wed", count: 1, distance: 8 },
    { day: "Thu", count: 0, distance: 0 },
    { day: "Fri", count: 0, distance: 0 },
    { day: "Sat", count: 1, distance: 10 },
    { day: "Sun", count: 1, distance: 5 },
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
              <Graph
                data={yearlyData}
                graphNum={1}
                time={"month"}
                title={"Monthly Total (km)"}
                subTitle={"Total Runs"}
              />
            </canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph2">
              <Graph
                data={monthlyData}
                graphNum={2}
                time={"week"}
                title={"Weekly Total (km)"}
                subTitle={"Total Runs"}
              />
            </canvas>
          </div>
          <div className="graph-container">
            <canvas id="graph3">
              <Graph
                data={weeklyData}
                graphNum={3}
                time={"day"}
                title={"Daily Total (km)"}
                subTitle={"Total Runs"}
              />
            </canvas>
          </div>
        </div>

        <div className="bottom-stat-collection">
          <Last5RunsTable data={last5} />
        </div>

        {/* <p>{athletes.length >= 1 ? `${athletes[0].distance}` : "Loading..."}</p> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
