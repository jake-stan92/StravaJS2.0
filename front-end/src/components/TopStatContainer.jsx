import React from "react";
import TopStat from "./TopStat";
import countSVG from "../assets/images/list-ol.svg";
import lightningSVG from "..//assets/images/lightning-charge.svg";
import measureSVG from "../assets/images/rulers.svg";
import "./TopStatContainer.css";

const TopStatContainer = (props) => {
  return (
    <div className="top-stat-collection">
      <TopStat
        loadingState={props.loadingState}
        id={"total-runs-stat"}
        img={countSVG}
        title={"Runs This Year:"}
        figure={props.runs.length}
      />
      <TopStat
        loadingState={props.loadingState}
        id={"last5-avg-distance-stat"}
        img={measureSVG}
        title={"Last 5 avg distance:"}
        figure={`${props.last5AvgDistance}km`}
      />
      <TopStat
        loadingState={props.loadingState}
        id={"avg-run-distance-stat"}
        img={measureSVG}
        title={"Avf run dist all:"}
        figure={`${props.avgDistanceTotal}km`}
      />
      <TopStat
        loadingState={props.loadingState}
        id={"last5-avg-speed-stat"}
        img={lightningSVG}
        title={"Last 5 avg speed:"}
        figure={`${props.last5AvgSpeed}km/h`}
      />
    </div>
  );
};

export default TopStatContainer;
