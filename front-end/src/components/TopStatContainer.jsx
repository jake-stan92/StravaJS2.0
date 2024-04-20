import React from "react";
import TopStat from "./TopStat";
import countSVG from "../assets/images/list-ol.svg";
import lightningSVG from "..//assets/images/lightning-charge.svg";
import measureSVG from "../assets/images/rulers.svg";
import runnerSVG from "../assets/images/running-man.svg";

import "./TopStatContainer.css";

import { getAvgDistance, getAvgSpeed, getTotalDistance } from "./helpers";

const TopStatContainer = (props) => {
  const avgDistance = getAvgDistance(props.activities);
  const avgSpeed = getAvgSpeed(props.activities);
  const totalDistance = getTotalDistance(props.activities);
  return (
    <div className="top-stat-collection">
      <TopStat
        loadingState={props.loadingState}
        id={"total-runs-stat"}
        img={countSVG}
        title={`${props.currentlyDisplaying} This Year:`}
        figure={props.activities.length}
      />

      <TopStat
        loadingState={props.loadingState}
        id={"avg-run-distance-stat"}
        img={runnerSVG}
        title={"Total Distance:"}
        figure={`${totalDistance}km`}
      />
      <TopStat
        loadingState={props.loadingState}
        id={"last5-avg-distance-stat"}
        img={measureSVG}
        title={"Last 5 avg distance:"}
        figure={`${avgDistance}km`}
      />
      <TopStat
        loadingState={props.loadingState}
        id={"last5-avg-speed-stat"}
        img={lightningSVG}
        title={"Last 5 avg speed:"}
        figure={`${avgSpeed}km/h`}
      />
    </div>
  );
};

export default TopStatContainer;
