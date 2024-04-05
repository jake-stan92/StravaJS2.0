import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";

import {
  getLast5,
  getAvgDistance,
  getAvgSpeed,
  getMonthlyTotals,
} from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";

function App() {
  const [runs, setRuns] = useState([]);
  const [last5, setLast5] = useState([]);
  const [last5AvgDistance, setLast5AverageDistance] = useState(0);
  const [last5AvgSpeed, setLast5AverageSpeed] = useState(0);
  const [avgDistanceTotal, setAvgDistanceTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);

  useEffect(() => {
    const populateRuns = async () => {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      const runData = data.payload;
      const last5Data = getLast5(runData);
      setRuns(runData);
      setLast5(last5Data);
      setAvgDistanceTotal(getAvgDistance(runData));
      setMonthlyTotals(getMonthlyTotals(runData));
      setLast5AverageDistance(getAvgDistance(last5Data));
      setLast5AverageSpeed(getAvgSpeed(last5Data));
    };
    populateRuns();
    return () => {};
  }, []);

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
          <div className="top-stat" id="total-runs-stat">
            <p>Total Runs this year{runs.length}</p>
          </div>
          <div className="top-stat" id="last5-avg-distance-stat">
            <p>Last 5 avg distance {last5AvgDistance}km</p>
          </div>
          <div className="top-stat" id="avg-run-distance-stat">
            <p>average run dist all {avgDistanceTotal}km</p>
          </div>
          <div className="top-stat" id="last5-avg-speed-statt">
            <p>last 5 avg speed {last5AvgSpeed}km/h</p>
          </div>
        </div>
        <div className="graph-collection">
          <Graph
            data={monthlyTotals}
            graphNum={1}
            time={"month"}
            title={"Monthly Total (km)"}
            subTitle={"Total Runs"}
            state={monthlyTotals}
          />
        </div>

        {/* <div className="graph-collection">
          <div className="graph-container">
            <canvas id="graph1">
              
            </canvas>
          </div> */}
        {/* <div className="graph-container">
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
          </div> */}
        <div className="bottom-stat-collection">
          <Last5RunsTable data={last5} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
