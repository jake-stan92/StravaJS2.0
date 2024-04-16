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
  getDailyTotal,
} from "./components/helpers.js";
import Last5RunsTable from "./components/Last5RunsTable.jsx";
import countSVG from "../src/assets/images/list-ol.svg";
import lightningSVG from "../src/assets/images/lightning-charge.svg";
import measureSVG from "../src/assets/images/rulers.svg";
import LoadingIcon from "./components/LoadingIcon.jsx";

function App() {
  const [runs, setRuns] = useState([]);
  const [last5, setLast5] = useState([]);
  const [last5AvgDistance, setLast5AverageDistance] = useState(0);
  const [last5AvgSpeed, setLast5AverageSpeed] = useState(0);
  const [avgDistanceTotal, setAvgDistanceTotal] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [dailyTotals, setDailytotals] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  // state is not a variable!! try to refactor with just runs as state and pass to other comps

  useEffect(() => {
    const populateRuns = async () => {
      setLoadingState(true);
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setLoadingState(false);
      const runData = data.payload;
      const last5Data = getLast5(runData);
      setRuns(runData);
      console.log(runData);
      setLast5(last5Data);
      setAvgDistanceTotal(getAvgDistance(runData));
      setMonthlyTotals(getMonthlyTotals(runData));
      setLast5AverageDistance(getAvgDistance(last5Data));
      setLast5AverageSpeed(getAvgSpeed(last5Data));
      setDailytotals(getDailyTotal(runData));
    };
    populateRuns();
    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <div className="top-stat-collection">
          {!loadingState ? (
            <div className="top-stat" id="total-runs-stat">
              <div className="stat-icon">
                <img src={countSVG}></img>
              </div>
              <div className="top-stat-content">
                <p>Runs this year:</p>
                <p className="stat-figure">{runs.length}</p>
              </div>
            </div>
          ) : (
            <div className="top-stat-loading">
              <LoadingIcon />
            </div>
          )}

          {!loadingState ? (
            <div className="top-stat" id="last5-avg-distance-stat">
              <div className="stat-icon">
                <img src={measureSVG}></img>
              </div>
              <div className="top-stat-content">
                <p>Last 5 avg distance:</p>
                <p className="stat-figure">{last5AvgDistance}km</p>
              </div>
            </div>
          ) : (
            <div className="top-stat-loading">
              <LoadingIcon />
            </div>
          )}

          {!loadingState ? (
            <div className="top-stat" id="avg-run-distance-stat">
              <div className="stat-icon">
                <img src={measureSVG}></img>
              </div>
              <div className="top-stat-content">
                <p>Avg run dist all:</p>
                <p className="stat-figure">{avgDistanceTotal}km</p>
              </div>
            </div>
          ) : (
            <div className="top-stat-loading">
              <LoadingIcon />
            </div>
          )}

          {!loadingState ? (
            <div className="top-stat" id="last5-avg-speed-stat">
              <div className="stat-icon">
                <img src={lightningSVG}></img>
              </div>
              <div className="top-stat-content">
                <p>Last 5 avg speed:</p>
                <p className="stat-figure">{last5AvgSpeed}km/h</p>
              </div>
            </div>
          ) : (
            <div className="top-stat-loading">
              <LoadingIcon />
            </div>
          )}
        </div>
        <div className="graph-collection">
          <Graph
            data={monthlyTotals}
            graphNum={1}
            time={"month"}
            title={"Monthly Total (km)"}
            lineGraph={true}
            state={monthlyTotals}
            loadingState={loadingState}
          />
          <Graph
            data={dailyTotals}
            graphNum={2}
            time={"day"}
            title={"Daily Total (km)"}
            lineGraph={false}
            state={dailyTotals}
            loadingState={loadingState}
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
          <Last5RunsTable data={last5} loadingState={loadingState} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
